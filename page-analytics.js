/* KORTX page analytics.
   startTracking() runs on published pages (/p/<slug>) only; it never runs in the Builder preview,
   drafts or the PDF print. Events go straight to Supabase table page_events (see
   supabase/migrations/2026-11-05_page_analytics.sql). Nothing personal is collected unless the
   share link names the recipient (?v=Jane%20Doe) — that label is how "who opened it" is known.

   What is recorded
   - view      once per page load; leave = seconds on page when the tab closes or hides
   - tab       each tab opened (label)
   - ad_view   an ad (any iframe/figure in a section, named by its title) at least half on screen for 1s, once per load
   - ad_click  a click into that ad (focus moves into its frame) or on its card
   - interact  first click inside each interactive block
   - cta       clicks on links and buttons in the seller close */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './creative-cloud.js';

export const deviceOf = w => (w || window.innerWidth) < 700 ? 'mobile' : (w || window.innerWidth) < 1100 ? 'tablet' : 'desktop';

function visitorId() {
  try { let v = localStorage.getItem('kx-visitor'); if (!v) { v = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)).slice(0, 36); localStorage.setItem('kx-visitor', v); } return v; }
  catch (e) { return 'anon-' + Math.random().toString(16).slice(2, 10); }
}
function viewerLabel() {
  const q = new URLSearchParams(location.search).get('v');
  try { if (q) { localStorage.setItem('kx-viewer', q.slice(0, 120)); return q.slice(0, 120); } return localStorage.getItem('kx-viewer') || null; } catch (e) { return q || null; }
}

export function startTracking({ pageId }) {
  if (!pageId || window.__kxTrack) return; window.__kxTrack = true;
  const visitor = visitorId(), viewer = viewerLabel(), device = deviceOf(), t0 = Date.now();
  const send = (kind, target, extra) => {
    const row = Object.assign({ page_id: pageId, kind, target: target ? String(target).slice(0, 200) : null, visitor, viewer, device, referrer: document.referrer ? document.referrer.slice(0, 300) : null }, extra || {});
    try { fetch(SUPABASE_URL + '/rest/v1/page_events', { method: 'POST', keepalive: true, headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) }).catch(() => {}); } catch (e) {}
  };
  send('view', document.title);
  let left = false; const leave = () => { if (left) return; left = true; send('leave', null, { seconds: Math.round((Date.now() - t0) / 1000) }); };
  addEventListener('pagehide', leave); document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') leave(); });

  /* Tabs */
  document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[role="tab"][data-tab]'); if (t) send('tab', (t.textContent || t.dataset.tab).trim()); }, true);
  /* Interactive blocks: first click in each */
  const touched = new Set();
  document.addEventListener('pointerdown', e => { const s = e.target.closest && e.target.closest('section[data-kind="interactive"]'); if (s && !touched.has(s.id)) { touched.add(s.id); send('interact', s.getAttribute('aria-label') || s.id); } }, true);
  /* Seller close CTAs */
  document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('[data-block="Seller close"] a, [data-block="Seller close"] button'); if (a) send('cta', (a.textContent || '').trim().slice(0, 80)); }, true);

  /* Ads */
  const adName = el => (el.getAttribute('title') || el.getAttribute('aria-label') || '').replace(/\s+key visual$/i, '').trim();
  const isAd = el => el.closest('section') && !el.closest('[data-hero-media], [data-gallery-frame], [data-block="Similar verticals gallery"], [data-page-head]');
  const seen = new Set(), timers = new WeakMap();
  const io = new IntersectionObserver(es => es.forEach(en => {
    const el = en.target, n = adName(el); if (!n) return;
    if (en.intersectionRatio >= .5) { if (!seen.has(n) && !timers.get(el)) timers.set(el, setTimeout(() => { if (!seen.has(n)) { seen.add(n); send('ad_view', n); } }, 1000)); }
    else { clearTimeout(timers.get(el)); timers.delete(el); }
  }), { threshold: [0, .5, 1] });
  const watched = new WeakSet();
  const scan = () => document.querySelectorAll('section iframe[title], section figure[data-deck-card][aria-label]').forEach(el => { if (!watched.has(el) && isAd(el)) { watched.add(el); io.observe(el); } });
  scan(); setInterval(scan, 1500);
  /* A click into an ad iframe moves focus into it: the page blurs while the iframe is active. */
  let lastClick = 0;
  addEventListener('blur', () => setTimeout(() => { const a = document.activeElement; if (a && a.tagName === 'IFRAME' && isAd(a) && Date.now() - lastClick > 600) { lastClick = Date.now(); send('ad_click', adName(a)); a.blur && setTimeout(() => window.focus(), 0); } }, 0));
  document.addEventListener('click', e => { const f = e.target.closest && e.target.closest('section figure[data-deck-card][aria-label]'); if (f && isAd(f)) send('ad_click', adName(f)); }, true);
}

/* ---------- reading (owner / admin) ---------- */
export async function loadEvents(pageId) {
  const { client } = await import('./creative-cloud.js');
  const sb = await client();
  const { data, error } = await sb.from('page_events').select('kind,target,visitor,viewer,device,seconds,referrer,created_at').eq('page_id', pageId).order('created_at', { ascending: false }).limit(10000);
  if (error) throw error;
  return data || [];
}

/* Totals, visitors, devices, tabs and per-ad views / clicks / CTR from raw events. */
export function summarize(ev) {
  const views = ev.filter(e => e.kind === 'view'), leaves = ev.filter(e => e.kind === 'leave' && e.seconds > 0 && e.seconds < 4 * 3600);
  const by = (list, key) => { const m = {}; list.forEach(e => { const k = key(e) || '—'; m[k] = (m[k] || 0) + 1; }); return m; };
  const visitors = {}; ev.forEach(e => { const v = visitors[e.visitor] = visitors[e.visitor] || { visitor: e.visitor, viewer: null, views: 0, first: e.created_at, last: e.created_at, devices: new Set(), seconds: 0, ads: 0, clicks: 0 };
    if (e.viewer) v.viewer = e.viewer; if (e.kind === 'view') v.views++; if (e.kind === 'leave') v.seconds += e.seconds || 0; if (e.kind === 'ad_view') v.ads++; if (e.kind === 'ad_click') v.clicks++;
    if (e.device) v.devices.add(e.device); if (e.created_at < v.first) v.first = e.created_at; if (e.created_at > v.last) v.last = e.created_at; });
  const ads = {}; ev.forEach(e => { if (e.kind !== 'ad_view' && e.kind !== 'ad_click') return; const a = ads[e.target] = ads[e.target] || { name: e.target, views: 0, clicks: 0, viewers: new Set() }; if (e.kind === 'ad_view') { a.views++; a.viewers.add(e.visitor); } else a.clicks++; });
  return {
    views: views.length, visitors: Object.keys(visitors).length,
    avgSeconds: leaves.length ? Math.round(leaves.reduce((a, e) => a + e.seconds, 0) / leaves.length) : 0,
    devices: by(views, e => e.device), tabs: by(ev.filter(e => e.kind === 'tab'), e => e.target), interactions: by(ev.filter(e => e.kind === 'interact'), e => e.target), ctas: by(ev.filter(e => e.kind === 'cta'), e => e.target),
    people: Object.values(visitors).filter(v => v.views).sort((a, b) => b.last.localeCompare(a.last)).map(v => Object.assign(v, { devices: [...v.devices] })),
    ads: Object.values(ads).map(a => Object.assign(a, { viewers: a.viewers.size, ctr: a.views ? a.clicks / a.views : 0 })).sort((a, b) => b.views - a.views),
    last: ev[0] ? ev[0].created_at : null
  };
}
