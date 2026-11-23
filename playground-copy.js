/* Team edits to Creative Playground copy (Simplified Creative Database › Playground ads).
   Rows live in Supabase `playground_copy` (id, data jsonb). playground-config.js stays the
   default; anything saved here overrides it on load. */
export const SECTIONS = [
  { id: 'occ', title: 'Creative for every occasion', fields: [['title', 'Recommendation headline'], ['why', 'Why it fits'], ['measure', 'What is measured']] },
  { id: 'dco', title: 'Dynamic creative in action', fields: [['changed', 'What changed'], ['why', 'Why it matters'], ['measure', 'What is measurable']] },
  { id: 'play', title: 'Explore interactions with a purpose', fields: [['eyebrow', 'Eyebrow'], ['title', 'Headline'], ['sub', 'Sub line'], ['panel', 'Instruction'], ['changed', 'Concept'], ['why', 'Why it’s useful'], ['metric', 'Measurable']] }
];

/* Delivered HTML builds behind each Dynamic creative signal value (mirrors dcoVals in Creative Playground). */
const DCO_FRAMES = {
  'Below 40°F': 'assets/work/dco/below-40/index.html', '40–70°F': 'assets/work/dco/40-70/index.html', 'Above 70°F': 'assets/work/dco/above-70/index.html',
  '6:00am-10:00am': 'assets/work/dco/before-work/index.html', '10:01am-3:00pm': 'assets/work/dco/lunchtime/index.html', '3:01pm-6:00pm': 'assets/work/dco/after-work/index.html',
  'July 15th-August 24th': 'assets/work/dco/back-to-school/index.html', 'Sept. 6th-Sept. 13th': 'assets/work/dco/labor-day/index.html', 'Dec. 15th-Dec. 25th': 'assets/work/dco/christmas/index.html',
  '48307': 'assets/work/dco/zip-48307/index.html', '48326': 'assets/work/dco/zip-48326/index.html',
  'Current Jackpot': 'assets/work/dco/jackpot/index.html', 'Next Draw': 'assets/work/dco/next-draw/index.html'
};

/* Flatten the config into editable cards: { id, section, label, frame, values } */
export function cardsFrom(cfg) {
  const out = [];
  (cfg.OCCASIONS || []).forEach(o => out.push({ id: 'occ:' + o.key, section: 'occ', label: o.label, frame: o.frame || '', values: { title: (o.rec || {}).title || '', why: (o.rec || {}).why || '', measure: (o.rec || {}).measure || '' } }));
  Object.entries(cfg.DCO_NOTES || {}).forEach(([k, v]) => out.push({ id: 'dco:' + k, section: 'dco', label: k.replace('|', ' · '), frame: DCO_FRAMES[k.split('|').slice(1).join('|')] || '', values: { changed: v[0] || '', why: v[1] || '', measure: v[2] || '' } }));
  (cfg.PLAY_EXAMPLES || []).forEach(p => out.push({ id: 'play:' + p.id, section: 'play', label: p.eyebrow || p.id, frame: p.frame || '', values: { eyebrow: p.eyebrow || '', title: p.title || '', sub: p.sub || '', panel: (p.panel || {}).note || '', changed: (p.note || {}).changed || '', why: (p.note || {}).why || '', metric: (p.note || {}).metric || '' } }));
  return out;
}

export async function fetchCopy() {
  const cloud = await import('./creative-cloud.js');
  const sb = await cloud.client();
  const { data, error } = await sb.from('playground_copy').select('*');
  if (error) throw error;
  return data || [];
}

export async function saveCopy(rows) {
  const cloud = await import('./creative-cloud.js');
  const sb = await cloud.client();
  let { data, error } = await sb.from('playground_copy').upsert(rows, { onConflict: 'id' }).select('id, updated_at, updated_by');
  if (error) throw error;
  return data || [];
}

/* Mutates the loaded config in place. Returns how many overrides applied. */
export async function applyCopy(cfg) {
  let rows = [];
  try { rows = await fetchCopy(); } catch (e) { return 0; }
  let n = 0;
  for (const r of rows) {
    const d = r.data || {}, [sec, ...rest] = String(r.id).split(':'), key = rest.join(':');
    if (sec === 'occ') { const o = (cfg.OCCASIONS || []).find(x => x.key === key); if (o) { o.rec = Object.assign({}, o.rec, pick(d, ['title', 'why', 'measure'])); n++; } }
    else if (sec === 'dco') { const cur = (cfg.DCO_NOTES || {})[key]; if (cur) { cfg.DCO_NOTES[key] = [d.changed ?? cur[0], d.why ?? cur[1], d.measure ?? cur[2]]; n++; } }
    else if (sec === 'play') { const p = (cfg.PLAY_EXAMPLES || []).find(x => x.id === key); if (p) {
      Object.assign(p, pick(d, ['eyebrow', 'title', 'sub']));
      if (d.panel != null) p.panel = Object.assign({}, p.panel, { note: d.panel });
      p.note = Object.assign({}, p.note, pick(d, ['changed', 'why', 'metric'])); n++; } }
  }
  return n;
}
function pick(o, ks) { const r = {}; ks.forEach(k => { if (o[k] != null && o[k] !== '') r[k] = o[k]; }); return r; }
