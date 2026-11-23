/* KORTX Mock Builder pipeline helpers: asset manifest, visual inputs, versioned brief, rendered checks.
   Used by Mock Builder.dc.html. No network calls of its own. */

/* ---------- asset roles ---------- */
export function classify(a) {
  const n = (a.file || a.url || '').toLowerCase(), hint = a.hint || '', w = a.w || 0, h = a.h || 0, ar = w && h ? w / h : 1;
  if (a.kind === 'generated') return 'artwork';
  if (a.kind === 'template') return 'template';
  if (hint === 'logo' || /logo|wordmark|brandmark/.test(n + ' ' + (a.alt || '').toLowerCase())) return 'logo';
  if (hint === 'icon' || /favicon|apple-touch-icon|sprite|icon/.test(n) || (w && h && Math.max(w, h) <= 96)) return 'icon';
  if (hint === 'social') return 'social';
  if (a.product || hint === 'product') return 'product';
  if (a.kind === 'upload') return 'upload';
  if (w && w < 200 && h < 200) return 'icon';
  return ar > 1.6 ? 'lifestyle' : 'product';
}
export const CREATIVE_ROLES = ['product', 'lifestyle', 'artwork', 'upload'];
export const isCreative = a => CREATIVE_ROLES.includes(a.role) && !(a.role === 'upload' && !/\.(png|jpe?g|webp|gif)$/i.test(a.file || ''));
const slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32) || 'image';
export const fileFor = (i, base, mime) => 'web-' + String(i).padStart(2, '0') + '-' + slug(base) + '.' + ((mime || '').split('/')[1] || 'png').replace('svg+xml', 'svg').replace('jpeg', 'jpg').replace('x-icon', 'ico');

/* Pick which scanned images are worth downloading: brand logo, product photography first, then lifestyle; skip icons and tiny images. */
export function pickDownloads(catalog, ev, max) {
  const imgs = (catalog && catalog.images) || [], prods = (catalog && catalog.products) || [];
  const byKey = {}; prods.forEach(p => { byKey[p.key] = p; });
  const seen = new Set(), out = [];
  const push = (x, role) => { const k = (x.url || '').split('?')[0]; if (!k || seen.has(k)) return; seen.add(k); out.push(Object.assign({}, x, { roleHint: role })); };
  const logo = ((ev && ev.logos) || []).find(l => /logo/i.test(l) && !/promo|campaign|banner/i.test(l)); if (logo) push({ url: logo, hint: 'logo', alt: 'Logo' }, 'logo');
  imgs.filter(i => i.product).forEach(i => push(Object.assign({}, i, { productName: (byKey[i.product] || {}).name }), 'product'));
  prods.filter(p => p.image).forEach(p => push({ url: p.image, alt: p.name, product: p.key, productName: p.name, hint: 'product', page: p.source }, 'product'));
  imgs.filter(i => !i.product && !['logo', 'icon', 'social'].includes(i.hint) && (!i.w || i.w >= 300)).forEach(i => push(i, ''));
  if (ev && ev.ogImage) push({ url: ev.ogImage, hint: 'social', alt: 'Social sharing image' }, 'social');
  return out.slice(0, max);
}

/* ---------- visual inputs: individual images + labelled contact sheets ---------- */
const loadImg = src => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => no(new Error('image')); i.src = src; });
export async function thumb(src, max, q) {
  const img = await loadImg(src), k = Math.min(1, (max || 768) / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
  const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', q || .82);
}
export async function contactSheet(entries, urlOf, title) {
  const cols = 4, rows = Math.ceil(entries.length / cols), tw = 250, th = 210, lab = 40, W = cols * tw, H = rows * (th + lab) + 36;
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.fillStyle = '#111'; x.font = '600 18px Arial'; x.fillText(title, 10, 24);
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i], cx = (i % cols) * tw, cy = 36 + Math.floor(i / cols) * (th + lab);
    x.fillStyle = '#f2f2f2'; x.fillRect(cx + 6, cy + 4, tw - 12, th - 8);
    try { const img = await loadImg(urlOf(e)), k = Math.min((tw - 16) / img.naturalWidth, (th - 12) / img.naturalHeight); const w = img.naturalWidth * k, h = img.naturalHeight * k; x.drawImage(img, cx + (tw - w) / 2, cy + (th - h) / 2, w, h); } catch (err) { x.fillStyle = '#c00'; x.font = '14px Arial'; x.fillText('could not load', cx + 14, cy + th / 2); }
    x.fillStyle = '#111'; x.font = '700 14px Arial'; x.fillText(e.id + ' · ' + e.role, cx + 8, cy + th + 14);
    x.font = '12px Arial'; x.fillText(String(e.file).slice(0, 34), cx + 8, cy + th + 31);
  }
  return c.toDataURL('image/jpeg', .8);
}
/* Bounded image inputs for one call. Never silently drops: everything not attached is returned in `omitted`. */
export async function visualInputs(manifest, urlOf, o) {
  const max = o.max || 12, out = [], labels = [], omitted = [];
  const add = (url, label) => { if (out.length >= max) return false; out.push(url); labels.push(label); return true; };
  for (const r of o.refs || []) add(r.url, 'KORTX component reference ' + r.name + ' (pattern only, not this brand)');
  const want = new Set(o.focus || []);
  const focus = manifest.filter(a => want.has(a.file)), rest = manifest.filter(a => !want.has(a.file) && (isCreative(a) || a.role === 'logo'));
  for (const a of focus.slice(0, o.maxFocus || 6)) { try { if (!add(await thumb(urlOf(a), 768), a.id + ' ' + a.file + ' (' + a.role + ')')) omitted.push(a.file); } catch (e) { omitted.push(a.file + ' (unreadable)'); } }
  focus.slice(o.maxFocus || 6).forEach(a => rest.unshift(a));
  for (let i = 0; i < rest.length; i += 16) {
    const chunk = rest.slice(i, i + 16), ids = chunk.map(a => a.id).join(', ');
    const sheet = await contactSheet(chunk, urlOf, 'Asset contact sheet: ' + chunk[0].id + '–' + chunk[chunk.length - 1].id).catch(() => null);
    if (!sheet || !add(sheet, 'Contact sheet of ' + ids + ' (labels are manifest IDs)')) chunk.forEach(a => omitted.push(a.file));
  }
  return { images: out, labels, omitted };
}

/* ---------- versioned brief ---------- */
export function newBrief(form, idea, extra) { return Object.assign({ v: 1, createdAt: new Date().toISOString(), idea, form, plan: null, planApproved: false, changes: [] }, extra || {}); }
export function withChange(brief, stage, text) { return Object.assign({}, brief, { v: (brief.v || 1) + 1, changes: (brief.changes || []).concat({ stage, text, at: new Date().toISOString() }) }); }
export function hash(s) { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
export function normPlan(p, manifest) {
  if (!p || !Array.isArray(p.slides) || !p.slides.length) return null;
  const files = new Set((manifest || []).map(a => a.file));
  const slides = p.slides.slice(0, 12).map((s, i) => ({ title: String(s.title || 'Slide ' + (i + 1)).slice(0, 60), headline: String(s.headline || '').slice(0, 120), body: String(s.body || '').slice(0, 240), cta: String(s.cta || '').slice(0, 30), asset: s.asset && files.has(s.asset) ? s.asset : (s.asset ? null : null), assetWanted: s.asset || null, destination: String(s.destination || '').slice(0, 300), source: s.source || 'demo' }));
  return { mode: p.mode === 'exact' ? 'exact' : 'new', concept: String(p.concept || '').slice(0, 300), interaction: String(p.interaction || '').slice(0, 200), reuse: !!p.reuse, mandatoryCopy: (p.mandatoryCopy || []).map(String).slice(0, 10), slides, coverage: String(p.coverage || '').slice(0, 400) };
}

/* ---------- rendered checks (DOM in a sandboxed iframe; no screenshot review) ---------- */
const VAL = '(' + (function () {
  function name(i) { return i.getAttribute('data-kx-asset') || (i.getAttribute('src') || '').split('?')[0].split('/').pop().slice(0, 60); }
  function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function shown(el) { var r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; var n = el, o = 1; while (n && n.nodeType === 1) { var cs = getComputedStyle(n); if (cs.display === 'none' || cs.visibility === 'hidden') return false; o *= parseFloat(cs.opacity); n = n.parentElement; } return o > 0.2; }
  function own(el) { for (var c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 3 && c.nodeValue.trim()) return true; return false; }
  function bgs(el) { var out = []; [el].concat([].slice.call(el.querySelectorAll('*'))).forEach(function (n) { var b = getComputedStyle(n).backgroundImage; if (b && b !== 'none' && /url\(/.test(b)) out.push(b.slice(0, 120)); }); return out; }
  function active(nodes) { var best = null, bo = 0; nodes.forEach(function (n) { if (!shown(n)) return; var o = 1, m = n; while (m && m.nodeType === 1) { o *= parseFloat(getComputedStyle(m).opacity); m = m.parentElement; } var r = n.getBoundingClientRect(); if (r.right <= 0 || r.left >= innerWidth) return; if (o > bo) { bo = o; best = n; } }); return best; }
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  addEventListener('message', async function (e) {
    var o = e.data; if (!o || o.kx !== 'val') return;
    var res = { checks: [], slides: [] }; function ck(id, ok, label, detail) { res.checks.push({ id: id, ok: !!ok, label: label, detail: detail || '' }); }
    try {
      var M = window.mock; if (M && M.ready) await Promise.race([M.ready, wait(6000)]);
      [].forEach.call(document.images, function (i) { i.loading = 'eager'; });
      await Promise.all([].map.call(document.images, function (i) { return i.complete ? 0 : new Promise(function (r) { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); setTimeout(r, 5000); }); }));
      await wait(300);
      var bad = [].filter.call(document.images, function (i) { return !i.naturalWidth; }).map(name);
      ck('images', !bad.length, 'Images load', bad.length ? bad.length + ' failed: ' + bad.join(', ') : document.images.length + ' loaded');
      if (o.anim) {
        var okT = M && typeof M.seek === 'function' && isFinite(M.durationMs) && M.durationMs > 0;
        ck('timeline', okT, 'Timeline controls (window.mock)', okT ? 'durationMs ' + M.durationMs : 'window.mock.seek or durationMs missing');
        if (okT) { try { await Promise.race([M.seek(isFinite(M.finalFrameTimeMs) ? M.finalFrameTimeMs : M.durationMs), wait(4000)]); await wait(120); var vis = [].filter.call(document.body.querySelectorAll('*'), function (n) { return shown(n) && (own(n) || (n.tagName === 'IMG' && n.naturalWidth) || /^(svg|CANVAS|VIDEO)$/.test(n.tagName) || (getComputedStyle(n).backgroundImage || 'none') !== 'none'); }).length; ck('final', vis > 0, 'Final frame renders content', vis + ' visible elements'); } catch (x) { ck('final', false, 'Final frame shows copy', x.message); } }
        ck('clicktag', typeof window.clickTag === 'string' && window.clickTag.length > 0 && window.clickTag !== '#', 'Click-through set (clickTag)', String(window.clickTag || 'missing'));
      }
      var nodes = [].slice.call(document.querySelectorAll('[data-kx-slide]')), want = o.slides || 0;
      if (want > 1 || nodes.length > 1) {
        ck('slidecount', nodes.length >= want, 'All planned slides in the HTML', nodes.length + ' of ' + want);
        var S = M && M.slides, canGo = !!(S && typeof S.go === 'function');
        ck('slidenav', canGo, 'Slide navigation (window.mock.slides.go)', canGo ? '' : 'missing, so slides cannot be reviewed or checked one by one');
        for (var i = 0; i < Math.max(want, nodes.length); i++) {
          var el = null;
          if (canGo) { try { await Promise.race([S.go(i), wait(1500)]); } catch (x) {} await wait(160); el = active(nodes); } else el = nodes[i] || null;
          res.slides.push({ i: i, shown: el ? el.getAttribute('data-kx-slide') : null, text: el ? norm(el.innerText || el.textContent).slice(0, 400) : '', imgs: el ? [].map.call(el.querySelectorAll('img'), name) : [], bg: el ? bgs(el) : [], href: el ? (el.getAttribute('data-kx-href') || ((el.querySelector('a[href]') || {}).href) || '') : '' });
        }
        if (canGo) { try { await S.go(0); } catch (x) {} }
      }
      var over = [];
      [].forEach.call(document.body.querySelectorAll('h1,h2,h3,h4,h5,p,span,a,button,li,div,strong,em,small,label'), function (el) {
        if (!own(el) || !shown(el)) return; var r = el.getBoundingClientRect(), cs = getComputedStyle(el), t = norm(el.textContent).slice(0, 28);
        var p = el.closest('[data-kx-slide]'); if (p && !shown(p)) return;
        if (r.right > innerWidth + 1 || r.bottom > innerHeight + 1 || r.left < -1 || r.top < -1) over.push('"' + t + '" runs off the canvas');
        else if ((cs.overflow === 'hidden' || cs.textOverflow === 'ellipsis' || cs.webkitLineClamp !== 'none' && cs.webkitLineClamp) && (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2)) over.push('"' + t + '" is clipped');
      });
      ck('fit', !over.length, 'Text fits', over.slice(0, 4).join('; '));
    } catch (x) { res.error = x.message; }
    parent.postMessage({ kx: 'valres', res: res }, '*');
  });
  parent.postMessage({ kx: 'valready' }, '*');
}).toString() + ')()';

function runVal(html, w, h, o) {
  const doc = /<\/body>/i.test(html) ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, '<script>' + VAL + '<\/script></body>') : html + '<script>' + VAL + '<\/script>';
  return new Promise(resolve => {
    const f = document.createElement('iframe'); f.setAttribute('sandbox', 'allow-scripts'); f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    f.style.cssText = 'position:fixed;left:-30000px;top:0;border:0;width:' + w + 'px;height:' + h + 'px;';
    const done = r => { window.removeEventListener('message', on); clearTimeout(to); f.remove(); resolve(r); };
    const on = e => { if (e.source !== f.contentWindow || !e.data) return; if (e.data.kx === 'valready') f.contentWindow.postMessage(Object.assign({ kx: 'val' }, o), '*'); else if (e.data.kx === 'valres') done(e.data.res); };
    const to = setTimeout(() => done({ checks: [{ id: 'run', ok: false, label: 'Checks ran', detail: 'the ad did not respond within 25 s' }], slides: [] }), 25000);
    window.addEventListener('message', on); f.srcdoc = doc; document.body.appendChild(f);
  });
}
const lc = s => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
const normUrl = u => String(u || '').replace(/[#?].*$/, '').replace(/\/$/, '').toLowerCase();
/* Plan-aware checks. Distinct content is judged per concept: a feature carousel (plan.reuse) may reuse an image but not its copy. */
export async function validate(prepared, raw, w, h, o) {
  const plan = o.plan, want = plan ? plan.slides.length : 0;
  const r = await runVal(prepared, w, h, { anim: !!o.anim, slides: want });
  const checks = r.checks.slice();
  if (r.error) checks.push({ id: 'run', ok: false, label: 'Checks ran', detail: r.error });
  if (plan && want > 1 && r.slides.length) {
    const sig = s => lc(s.text) + '|' + s.imgs.join(',') + '|' + s.bg.join(',');
    const dup = []; for (let i = 0; i < r.slides.length; i++) for (let j = i + 1; j < r.slides.length; j++) if (sig(r.slides[i]) === sig(r.slides[j])) dup.push((i + 1) + '=' + (j + 1));
    checks.push({ id: 'distinct', ok: !dup.length, label: 'Slides have different content', detail: dup.length ? 'identical slides: ' + dup.join(', ') : '' });
    const miss = [], img = [], nav = [], dest = [];
    plan.slides.forEach((p, i) => {
      const s = r.slides[i]; if (!s) { miss.push(i + 1); return; }
      const head = lc(p.headline).slice(0, 18); if (head && !lc(s.text).includes(head)) miss.push((i + 1) + ' (“' + p.headline.slice(0, 30) + '”)');
      if (p.asset && !plan.reuse && !s.imgs.includes(p.asset) && !s.bg.some(b => b.includes(p.asset)) && !(s.imgs.length === 0 && s.bg.length)) img.push((i + 1) + ' (' + p.asset + ')');
      if (s.shown != null && String(s.shown) !== String(i)) nav.push((i + 1) + '→ showed ' + (+s.shown + 1));
      if (o.anim && p.destination && s.href && normUrl(s.href) !== normUrl(p.destination)) dest.push((i + 1));
    });
    checks.push({ id: 'plancopy', ok: !miss.length, label: 'Each slide shows its planned copy', detail: miss.length ? 'slides ' + miss.join(', ') : '' });
    if (!plan.reuse) checks.push({ id: 'planimg', ok: !img.length, label: 'Each slide uses its planned image', detail: img.length ? 'slides ' + img.join(', ') : '' });
    if (r.slides.some(s => s.shown != null)) checks.push({ id: 'navmatch', ok: !nav.length, label: 'Navigation shows the right slide', detail: nav.join('; ') });
    if (o.anim) checks.push({ id: 'dest', ok: !dest.length, label: 'Each slide links to its destination', detail: dest.length ? 'slides ' + dest.join(', ') + ' (data-kx-href differs from the plan)' : '' });
  }
  const refd = a => raw.includes('asset://' + a) || raw.includes('asset://' + encodeURIComponent(a)) || raw.includes('data-kx-asset="' + a + '"');
  if (plan) { const used = [...new Set(plan.slides.map(s => s.asset).filter(Boolean))], absent = used.filter(a => !refd(a)); checks.push({ id: 'assets', ok: !absent.length, label: 'Planned assets referenced', detail: absent.length ? absent.join(', ') : '' }); }
  (plan && plan.mandatoryCopy || []).forEach((t, k) => { const ok = r.slides.some(s => lc(s.text).includes(lc(t).slice(0, 24))) || lc(raw.replace(/<[^>]+>/g, ' ')).includes(lc(t).slice(0, 24)); checks.push({ id: 'mand' + k, ok, label: 'Mandatory copy present', detail: ok ? '' : '“' + t.slice(0, 40) + '”' }); });
  const failed = checks.filter(c => !c.ok);
  return { at: new Date().toISOString(), method: 'DOM checks in a sandboxed render (no screenshot review)', checks, slides: r.slides, passed: checks.length - failed.length, total: checks.length, errors: failed.map(c => c.label + (c.detail ? ': ' + c.detail : '')) };
}

/* Shows one planned slide for the review strip: uses window.mock.slides.go when present, else isolates [data-kx-slide=i] with CSS. */
const SLIDE_FN = (function (i) {
  function css() { var s = document.createElement('style'); s.textContent = '[data-kx-slide]:not([data-kx-slide="' + i + '"]){display:none!important}[data-kx-slide="' + i + '"]{display:block!important;opacity:1!important;visibility:visible!important;transform:none!important}'; document.head.appendChild(s); }
  function go() { var M = window.mock; try { if (M && M.slides && typeof M.slides.go === 'function') Promise.resolve(M.slides.go(i)).catch(css); else css(); } catch (e) { css(); } }
  var M = window.mock; Promise.race([(M && M.ready) || Promise.resolve(), new Promise(function (r) { setTimeout(r, 2500); })]).then(function () { setTimeout(go, 150); });
}).toString();
export function withSlide(html, i) { const js = '<script>(' + SLIDE_FN + ')(' + (i | 0) + ')<\/script>'; return /<\/body>/i.test(html) ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, js + '</body>') : html + js; }
