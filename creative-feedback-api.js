/* KORTX Creative Feedback — campaign review pages built from a Captivate/Celtra share link.
   Table: creative_reviews (supabase/migrations/2026-11-04_creative_reviews.sql).
   Clients open ?review=<id>&as=client without signing in; reads/writes go through the cf_get / cf_save RPCs.
   If the table or RPCs are not deployed yet, everything falls back to this browser's localStorage. */
import { client, SUPABASE_URL, SUPABASE_ANON_KEY } from './creative-cloud.js';

const LS = 'kx-creative-reviews';
const readLocal = () => { try { return JSON.parse(localStorage.getItem(LS) || '{}'); } catch (e) { return {}; } };
const writeLocal = all => { try { localStorage.setItem(LS, JSON.stringify(all)); } catch (e) {} };
export const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));

/* Captivate share link, shareablePreview link or a bare ID → { kind, id, src } */
export function parseCreativeRef(raw) {
  const s = String(raw || '').trim(); if (!s) return null;
  let m = s.match(/shareablePreview\/([a-z0-9]+)/i); if (m) return { kind: 'captivate', id: m[1] };
  m = s.match(/(?:ads|preview)\.celtra\.com\/(?:preview\/)?([a-f0-9]{8})/i); if (m) return { kind: 'celtra', id: m[1] };
  if (/^https?:\/\//i.test(s)) return { kind: 'url', id: s };
  if (/^[a-f0-9]{8}$/i.test(s)) return { kind: 'celtra', id: s.toLowerCase() };
  if (/^[a-z0-9]{4,8}$/i.test(s)) return { kind: 'captivate', id: s };
  return null;
}

/* Celtra hub JSON (Network › creatives?… › Response) → creatives with real names and sizes. */
export function parseCeltraJson(text) {
  let j; try { j = JSON.parse(String(text || '').trim()); } catch (e) { return null; }
  const arr = Array.isArray(j) ? j : (j && (j.creatives || j.data || j.items)) || (j && j.id ? [j] : []);
  const list = (arr || []).filter(c => c && /^[a-f0-9]{8}$/i.test(c.id || '')).map(c => {
    const u = c.units || {}, unit = u.banner || u[Object.keys(u)[0]] || {}, lay = (unit.layouts || [])[0] || {}, sz = lay.unitSize || lay.designTimeSize || {};
    const m = String(c.name || '').match(/(\d{2,4})\s*[x×]\s*(\d{2,4})/);
    return { kind: 'celtra', id: c.id, name: c.name || c.id, w: +sz.width || (m ? +m[1] : 300), h: +sz.height || (m ? +m[2] : 600), thumb: c.thumbnailUrl || '' };
  });
  if (!list.length) return null;
  const strip = n => n.replace(/^\s*\d{2,4}\s*[x×]\s*\d{2,4}\s*[_\-–·]*\s*/i, '').trim();
  const names = list.map(c => strip(c.name)), title = names.every(n => n && n === names[0]) ? names[0] : '';
  return { title, creatives: list };
}

/* Captivate explorer link (where a /share/ link lands):
   /explorer/<ids>?creatives=<ids in size order>&sizes=320x50,300x250,… → creatives. */
export function parseExplorerUrl(raw) {
  let u; try { u = new URL(String(raw || '').trim()); } catch (e) { return null; }
  const m = u.pathname.match(/\/explorer\/([a-f0-9,]{8,})/i); if (!m) return null;
  const ids = (u.searchParams.get('creatives') || m[1]).split(',').filter(x => /^[a-f0-9]{8}$/i.test(x));
  const sizes = (u.searchParams.get('sizes') || '').split(',');
  if (!ids.length) return null;
  return { creatives: ids.map((id, i) => { const s = (sizes[i] || '').match(/(\d+)x(\d+)/); const w = s ? +s[1] : 300, h = s ? +s[2] : 600; return { kind: 'celtra', id, name: w + ' × ' + h, w, h }; }) };
}

/* AI import: the creative-share function reads the share page and returns every ad in it. */
export async function importShare(url) {
  let token = SUPABASE_ANON_KEY;
  try { const sb = await client(); const { data } = await sb.auth.getSession(); if (data.session) token = data.session.access_token; } catch (e) {}
  let r;
  try { r = await fetch(SUPABASE_URL + '/functions/v1/creative-share', { method: 'POST', headers: { Authorization: 'Bearer ' + token, apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) }); }
  catch (e) { throw Object.assign(new Error('Could not reach the import service.'), { code: 'offline' }); }
  if (r.status === 404) throw Object.assign(new Error('The creative-share function is not deployed yet.'), { code: 'not-deployed' });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || 'Import failed (' + r.status + ')');
  return j; /* { title, brand, creatives: [{ id, kind, name, w, h }] } */
}

export function newReview({ url, title, brand, agency, creatives }) {
  const now = new Date().toISOString();
  return { id: uid(), url: url || '', title: title || 'Untitled campaign', brand: brand || '', agency: agency || '', created_at: now, updated_at: now,
    creatives: (creatives || []).map((c, i) => ({ key: uid(), kind: c.kind || 'captivate', id: c.id, name: c.name || ('Creative ' + (i + 1)), w: +c.w || 300, h: +c.h || 600,
      status: 'review', version: 1, pins: [], log: [] })),
    overall: [] };
}

export async function getReview(id) {
  try { const sb = await client(); const { data, error } = await sb.rpc('cf_get', { rid: id }); if (!error && data) return Object.assign({}, data, { _cloud: true }); } catch (e) {}
  const r = readLocal()[id]; return r ? Object.assign({}, r, { _cloud: false }) : null;
}

export async function saveReview(review) {
  const r = Object.assign({}, review, { updated_at: new Date().toISOString() }); delete r._cloud;
  const all = readLocal(); all[r.id] = r; writeLocal(all);
  try { const sb = await client(); const { error } = await sb.rpc('cf_save', { rid: r.id, doc: r }); if (!error) return true; } catch (e) {}
  return false;
}

export async function listReviews() {
  const local = Object.values(readLocal());
  try {
    const sb = await client(); const { data: s } = await sb.auth.getSession();
    if (s.session) { const { data, error } = await sb.from('creative_reviews').select('id, doc, created_by, updated_at').order('updated_at', { ascending: false }).limit(50); if (!error && data) { const ids = new Set(data.map(d => d.id)); return data.map(d => Object.assign({}, d.doc, { _by: d.created_by })).concat(local.filter(l => !ids.has(l.id))); } }
  } catch (e) {}
  return local.sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
}

/* Client notifications: the review-notify function emails everyone on review.clientEmails (read server-side). Returns the count sent. */
export async function notifyClients(id, event, note, to) {
  const sb = await client(); const { data } = await sb.auth.getSession(); const token = data && data.session && data.session.access_token;
  if (!token) throw new Error('Sign in to email clients.');
  let r; try { r = await fetch(SUPABASE_URL + '/functions/v1/review-notify', { method: 'POST', headers: { Authorization: 'Bearer ' + token, apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ reviewId: id, event, note: String(note || '').slice(0, 600), origin: location.origin, to: to || undefined }) }); }
  catch (e) { throw new Error('Could not reach the email service.'); }
  if (r.status === 404) throw new Error('Email isn’t set up yet: deploy the review-notify function.');
  const j = await r.json().catch(() => ({})); if (!r.ok || j.error) throw new Error(j.error || 'Email failed (' + r.status + ')');
  return j.sent || 0;
}

/* Shared files: what clients uploaded through the review's upload link (team only). */
export async function listUploads(reviewId) { const sb = await client(); const { data, error } = await sb.from('review_uploads').select('id, name, path, size, mime, uploader, uploaded_at').eq('review_id', reviewId).order('uploaded_at', { ascending: false }); if (error) throw error; return data || []; }
export async function uploadFileUrl(path) { const sb = await client(); const { data, error } = await sb.storage.from('client-uploads').createSignedUrl(path, 3600, { download: false }); if (error) throw error; return data.signedUrl; }
