/* Interactive blocks: shared data for the Builder (Step 2 editors), the proposal skill
   (schema + prompts) and the Interactive Blocks DC that renders them on the proposal.
   Each block is rebuilt around the creatives the strategist selected. */

export const IX_BLOCKS = [
  { key: 'dynamic', id: 'ixDynamic', label: 'Dynamic selector', sub: 'One trigger, one ad per condition, glowing changed elements.', img: 'assets/builder/interactive-dynamic.png', imgVideo: 'assets/builder/interactive-dynamic-video.png', min: 1 },
  { key: 'scrubber', id: 'ixScrubber', label: 'Multi-ad scrubber', sub: 'Scrub through the selected ads with a note on each.', img: 'assets/builder/interactive-playful.png', imgVideo: 'assets/builder/interactive-scrubber-video.png', min: 2 },
  { key: 'builder', id: 'ixBuilder', label: 'Drag and drop ad builder', sub: 'Build the unit from six elements, then remix into the selected ads.', img: 'assets/builder/interactive-remix.png', imgVideo: 'assets/builder/interactive-builder-video.png', min: 1 }
];

/* Signals in scope (PRD): temperature, time of day, dates, ZIP codes, languages. */
export const TRIGGERS = [
  { id: 'temperature', label: 'Temperature', presets: ['Below 40°F', '40°F to 70°F', 'Above 70°F', 'Rain or snow', 'Clear skies'] },
  { id: 'time', label: 'Time of Day', presets: ['Morning', 'Midday', 'Evening', 'Late night', 'Weekend'] },
  { id: 'dates', label: 'Dates', presets: ['Launch week', 'Holiday weekend', 'Final week', 'Weekdays', 'Weekends'] },
  { id: 'zip', label: 'ZIP Code', presets: ['Urban ZIPs', 'Suburban ZIPs', 'Rural ZIPs', 'Near a location', 'Out of market'] },
  { id: 'language', label: 'Language', presets: ['English', 'Spanish', 'Vietnamese', 'Korean', 'Chinese'] }
];

/* Changeable ad elements and where their glowing rectangle sits on a 300×600 (percent). */
/* box = 300×600 position, wbox = 1920×1080 position, [x, y, w, h] in percent. Strategists can move
   and resize any of them per ad in Step 2 (variant.boxes[id]). */
export const GLOW = [
  { id: 'logo', label: 'Logo', box: [22, 3, 56, 9], wbox: [3, 5, 18, 12] },
  { id: 'headline', label: 'Headline', box: [5, 13, 90, 14], wbox: [4, 58, 52, 18] },
  { id: 'image', label: 'Image', box: [18, 30, 64, 36], wbox: [50, 8, 46, 70] },
  { id: 'video', label: 'Video', box: [6, 28, 88, 30], wbox: [2, 3, 96, 94] },
  { id: 'body', label: 'Body copy', box: [8, 68, 84, 11], wbox: [4, 77, 48, 10] },
  { id: 'cta', label: 'CTA', box: [22, 82, 56, 10], wbox: [70, 80, 26, 12] },
  { id: 'background', label: 'BG Color', box: [1, 1, 98, 98], wbox: [1, 1, 98, 98] }
];
export function glowBox(id, fmt, custom) {
  if (custom && Array.isArray(custom[id]) && custom[id].length === 4) return custom[id];
  const g = GLOW.find(x => x.id === id); return g ? (fmt === 'wide' ? g.wbox : g.box) : null;
}

/* Mock type picked in Page Details: which ad format the interactive blocks are built for. */
export const MOCKS = [
  { id: 'rich', label: 'Rich media mock', fmt: 'vertical', note: '300 × 600 rich media' },
  { id: 'video', label: 'Video mock', fmt: 'wide', note: '1920 × 1080 video and CTV' }
];
export const mockFmt = id => (MOCKS.find(m => m.id === (Array.isArray(id) ? id[0] : id)) || MOCKS[0]).fmt;
/* Both mocks can be on at once: the list of mock ids, and the ad formats they cover. */
export const mockList = m => { const a = (Array.isArray(m) ? m : String(m || 'rich').split(',')).filter(x => MOCKS.some(o => o.id === x)); return a.length ? MOCKS.map(o => o.id).filter(id => a.includes(id)) : ['rich']; };
export const mockFmts = m => mockList(m).map(id => MOCKS.find(o => o.id === id).fmt);

export const BUILD_TILES = [
  { key: 'logo', label: 'Logo' }, { key: 'headline', label: 'Headline' }, { key: 'body', label: 'Body Copy' },
  { key: 'bg', label: 'BG Image / Texture' }, { key: 'cta', label: 'CTA Button' }, { key: 'video', label: 'Video Player' }
];

/* A selected creative row (Builder) → the unit the blocks render. */
export function adUnit(c) {
  /* Ads lifted from an uploaded page or file (source "html"): their own markup at its native size, in the KORTX frame. */
  if (c.source === 'html') { const wide = c.format === 'wide'; return { key: String(c.key || c.id), fmt: wide ? 'wide' : 'vertical', kind: 'html', html: c.html || '', url: c.url || '', w: c.w || (wide ? 1920 : 300), h: c.h || (wide ? 1080 : 600), img: c.thumb || '', brand: c.brand || '', name: c.name || 'Ad', product: c.product || '' }; }
  const wide = c.format === 'wide', celtra = !!c.celtraId && c.source !== 'zip', zip = c.source === 'zip' && !!c.zipKey;
  return { key: String(c.key || c.id), fmt: wide ? 'wide' : 'vertical', kind: zip ? 'zip' : celtra ? 'celtra' : (c.id ? 'captivate' : 'image'), zipKey: zip ? c.zipKey : '', zipUrl: c.zipUrl || '',
    celtraId: c.celtraId || '', capId: celtra ? '' : (c.id || ''), img: c.thumb || '', brand: c.brand || '', name: c.name || c.product || 'Ad', product: c.product || '' };
}

/* Iframe src + box for a unit in a W×H slot. celtraDoc comes from creative-data.js. */
export function unitFrame(u, W, H, celtraDoc) {
  const base = { position: 'absolute', top: 0, left: 0, border: 0, background: '#050A16', transformOrigin: 'top left', pointerEvents: 'none' };
  if (!u) return { src: '', box: base };
  if (u.kind === 'html') {
    const nw = u.w || (u.fmt === 'wide' ? 1920 : 300), nh = u.h || (u.fmt === 'wide' ? 1080 : 600), s = Math.min(W / nw, H / nh);
    return { src: u.url || (u.html ? 'data:text/html;charset=utf-8,' + encodeURIComponent(u.html) : ''), box: Object.assign(base, { width: nw, height: nh, left: Math.max(0, (W - nw * s) / 2).toFixed(1) + 'px', transform: 'scale(' + s.toFixed(4) + ')', background: '#fff' }) };
  }
  if (u.kind === 'zip') {
    const nw = u.fmt === 'wide' ? 1920 : 300, nh = u.fmt === 'wide' ? 1080 : 600, s = Math.min(W / nw, H / nh);
    return { src: u.zipUrl || '', box: Object.assign(base, { width: nw, height: nh, transform: 'scale(' + s.toFixed(4) + ')' }) };
  }
  if (u.kind === 'celtra' && u.celtraId) {
    const nw = u.fmt === 'wide' ? 1920 : 300, nh = u.fmt === 'wide' ? 1080 : 600, s = Math.min(W / nw, H / nh);
    return { src: celtraDoc ? 'data:text/html;charset=utf-8,' + encodeURIComponent(celtraDoc(u.celtraId, nw, nh)) : '', box: Object.assign(base, { width: nw, height: nh, transform: 'scale(' + s.toFixed(4) + ')', background: '#fff' }) };
  }
  if (u.kind === 'captivate' && u.capId) {
    if (u.fmt === 'wide') { const c = { x: 198, y: 293, w: 804 }, s = W / c.w; return { src: 'https://captivate.kortx.io/shareablePreview/' + u.capId, box: Object.assign(base, { width: 1200, height: 1000, transform: 'translate(' + (-c.x * s).toFixed(1) + 'px,' + (-c.y * s).toFixed(1) + 'px) scale(' + s.toFixed(4) + ')' }) }; }
    const s = W / 300; return { src: 'https://captivate.kortx.io/shareablePreview/' + u.capId + '/frame?desktopPreviewFrame=1', box: Object.assign(base, { top: (-52 * s).toFixed(1) + 'px', width: 300, height: 652, transform: 'scale(' + s.toFixed(4) + ')' }) };
  }
  return { src: '', box: base };
}

const presetsFor = t => (TRIGGERS.find(x => x.id === t) || TRIGGERS[0]).presets;

/* Empty-but-shaped content for a block, one row per selected ad. Existing rows are kept by ad key. */
export function shapeIx(key, cur, ads) {
  cur = cur || {}; ads = ads || [];
  /* Rows match by ad key; rows whose key the AI got wrong fall back to their position, so no copy is lost. Field-name variants are folded in. */
  const alias = r => r && typeof r === 'object' ? Object.assign({}, r, { concept: r.concept || r.idea || '', why: r.why || r.whyUseful || r.why_useful || r.useful || '', measure: r.measure || r.measurable || r.kpi || r.measurement || '' }) : r;
  const byAd = (list) => { const m = {}; (list || []).forEach(r => { if (r && r.ad) m[r.ad] = alias(r); }); const ok = ads.filter(a => m[a.key]).length; if (ok < ads.length) (list || []).forEach((r, i) => { if (ads[i] && !m[ads[i].key] && r && typeof r === 'object' && !(r.ad && ads.some(a => a.key === r.ad))) m[ads[i].key] = alias(r); }); return m; };
  if (key === 'dynamic') {
    const trigger = cur.trigger || 'temperature', p = presetsFor(trigger), m = byAd(cur.variants);
    return { headline: cur.headline || '', intro: cur.intro || '', trigger,
      variants: ads.map((a, i) => Object.assign({ ad: a.key, value: '', changed: '', why: '', measure: '', glow: ['headline', 'image'], boxes: {} }, m[a.key] || {}, { ad: a.key })) };
  }
  if (key === 'scrubber') {
    const m = byAd(cur.items);
    return { headline: cur.headline || '', intro: cur.intro || '',
      items: ads.map(a => Object.assign({ ad: a.key, eyebrow: '', title: '', sub: '', instruction: '', concept: '', why: '', measure: '' }, m[a.key] || {}, { ad: a.key })) };
  }
  const m = byAd(cur.layouts);
  return { headline: cur.headline || '', intro: cur.intro || '', eyebrow: cur.eyebrow || '', title: cur.title || '', body: cur.body || '', buildLabel: cur.buildLabel || '', buildNote: cur.buildNote || '',
    layouts: ads.map((a, i) => Object.assign({ ad: a.key, name: 'Layout ' + (i + 1) }, m[a.key] || {}, { ad: a.key })) };
}

/* Empty trigger values fall back to the trigger's presets (shown as placeholders in the Builder). */
export function withPresets(ix) {
  if (!ix || !ix.variants) return ix;
  const p = presetsFor(ix.trigger);
  return Object.assign({}, ix, { variants: ix.variants.map((v, i) => v.value ? v : Object.assign({}, v, { value: p[i] || ('Condition ' + (i + 1)) })) });
}
export const presetFor = (t, i) => presetsFor(t)[i] || ('Condition ' + (i + 1));

/* Fills empty strings in `base` from `src` (deep, rows matched by ad key). */
export function fillEmpty(base, src) {
  if (!src || typeof src !== 'object') return base;
  const out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
  Object.keys(out).forEach(k => {
    const v = out[k], s = src[k];
    if (Array.isArray(v) && Array.isArray(s)) out[k] = v.map((row, i) => { const m = row && row.ad ? s.find(r => r && r.ad === row.ad) || s[i] : s[i]; return row && typeof row === 'object' ? fillEmpty(row, m) : row; });
    else if (v && typeof v === 'object' && !Array.isArray(v)) out[k] = fillEmpty(v, s);
    else if ((v === '' || v == null) && typeof s === 'string' && s.trim()) out[k] = s;
  });
  return out;
}

/* What the AI may write for each block (also the chat spec). */
export const IX_SPEC = `INTERACTIVE BLOCK CONTENT ("ix" object on the section; rows follow the selected ads, matched by "ad" key)
- ixDynamic (Dynamic selector): {"trigger":"temperature|time|dates|zip|language","variants":[{"ad":"<ad key>","value":"trigger value that serves this ad, e.g. Below 40°F","changed":"What changed, one sentence, <= 140 chars","why":"Why it matters for the brand, <= 180","measure":"What is measurable, <= 180","glow":["headline","image","logo","video","body","cta","background"]}]}. One dropdown only, one option per ad. "glow" lists the elements that differ between the ads (they get a glowing rectangle).
- ixScrubber (Multi-Ad Scrubber, 2+ ads): {"items":[{"ad":"","eyebrow":"ALL CAPS label, <= 32","title":"<= 70","sub":"<= 160","instruction":"how to interact with this ad, <= 120","concept":"what the unit does, <= 180","why":"Why it's useful, <= 180","measure":"Measurable, <= 180"}]}. concept, why and measure are REQUIRED on every item and must describe that specific ad.
- ixBuilder (Drag and Drop ad builder): {"eyebrow":"<= 32","title":"<= 80","body":"<= 260","buildLabel":"<= 32","buildNote":"<= 140","layouts":[{"ad":"","name":"layout name, <= 24"}]}
Write every field from what the actual ads are (brand, product, offer, format). Never describe the KORTX demo brands.`;
