/* KORTX Mock Builder — design-file import.
   Turns Illustrator (.ai, PDF-compatible), PDF, Photoshop (.psd), SVG and Figma (.fig, preview only) uploads into
   an artboard size + one transparent PNG per layer with its exact position, so the builder can rebuild the
   design faithfully and animate the real layers instead of inventing a new design. */

export const DESIGN_RE = /\.(ai|pdf|psd|psb|svg|fig|indd|idml|eps)$/i;
export const isDesign = name => DESIGN_RE.test(name || '');
export const kindOf = name => ((name || '').match(DESIGN_RE) || [])[1]?.toLowerCase() || '';

const slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 28) || 'layer';
const sizeIn = name => { const m = String(name || '').match(/(\d{2,4})\s*[x×]\s*(\d{2,4})/i); return m ? [+m[1], +m[2]] : null; };
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; };
const toBlob = c => new Promise(r => c.toBlob(b => r(b), 'image/png'));

/* Crop a full-artboard render to its painted pixels. Returns null for an empty layer. */
function cropAlpha(c, scale) {
  const ctx = c.getContext('2d'), { width: W, height: H } = c, d = ctx.getImageData(0, 0, W, H).data;
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 6) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < 0) return null;
  const out = canvas(x1 - x0 + 1, y1 - y0 + 1); out.getContext('2d').drawImage(c, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
  return { canvas: out, x: x0 / scale, y: y0 / scale, w: out.width / scale, h: out.height / scale };
}

/* Split one layer into its separate objects (tickets, headline lines, logo…) by painted-pixel islands at 1x.
   Returns null when the layer is one object or a texture of many small pieces (e.g. a border of lights). */
function splitParts(c, scale) {
  const W = c.width, H = c.height, d = c.getContext('2d').getImageData(0, 0, W, H).data;
  const gw = Math.ceil(W / scale), gh = Math.ceil(H / scale), on = new Uint8Array(gw * gh);
  for (let y = 0; y < H; y++) { const gy = Math.floor(y / scale) * gw; for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 20) on[gy + Math.floor(x / scale)] = 1; }
  const R = 3, dil = new Uint8Array(gw * gh);
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) if (on[y * gw + x]) for (let yy = Math.max(0, y - R); yy <= Math.min(gh - 1, y + R); yy++) for (let xx = Math.max(0, x - R); xx <= Math.min(gw - 1, x + R); xx++) dil[yy * gw + xx] = 1;
  const lab = new Int32Array(gw * gh).fill(-1), comps = [], q = new Int32Array(gw * gh);
  for (let i = 0; i < gw * gh; i++) {
    if (!dil[i] || lab[i] >= 0) continue;
    const id = comps.length, cp = { id, n: 0, x0: 1e9, y0: 1e9, x1: -1, y1: -1 }; let h = 0, t = 0; q[t++] = i; lab[i] = id;
    while (h < t) { const j = q[h++], x = j % gw, y = (j / gw) | 0; if (on[j]) { cp.n++; if (x < cp.x0) cp.x0 = x; if (x > cp.x1) cp.x1 = x; if (y < cp.y0) cp.y0 = y; if (y > cp.y1) cp.y1 = y; }
      if (x > 0 && dil[j - 1] && lab[j - 1] < 0) { lab[j - 1] = id; q[t++] = j - 1; } if (x < gw - 1 && dil[j + 1] && lab[j + 1] < 0) { lab[j + 1] = id; q[t++] = j + 1; }
      if (y > 0 && dil[j - gw] && lab[j - gw] < 0) { lab[j - gw] = id; q[t++] = j - gw; } if (y < gh - 1 && dil[j + gw] && lab[j + gw] < 0) { lab[j + gw] = id; q[t++] = j + gw; } }
    if (cp.n) comps.push(cp); else comps.push(null);
  }
  const real = comps.filter(Boolean), big = real.filter(c => c.n >= 60), tiny = real.filter(c => c.n < 60);
  if (big.length < 2 || big.length > 16 || tiny.length > 40) return null;
  const owner = new Map(); big.forEach(b => owner.set(b.id, b));
  tiny.forEach(s => { const cx = (s.x0 + s.x1) / 2, cy = (s.y0 + s.y1) / 2; let best = big[0], bd = 1e18; big.forEach(b => { const dx = Math.max(b.x0 - cx, 0, cx - b.x1), dy = Math.max(b.y0 - cy, 0, cy - b.y1), dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = b; } }); owner.set(s.id, best); best.x0 = Math.min(best.x0, s.x0); best.y0 = Math.min(best.y0, s.y0); best.x1 = Math.max(best.x1, s.x1); best.y1 = Math.max(best.y1, s.y1); });
  big.sort((a, b) => (a.y0 - b.y0) || (a.x0 - b.x0));
  return big.map(b => {
    const px0 = Math.floor(b.x0 * scale), py0 = Math.floor(b.y0 * scale), pw = Math.min(W, Math.ceil((b.x1 + 1) * scale)) - px0, ph = Math.min(H, Math.ceil((b.y1 + 1) * scale)) - py0;
    const out = canvas(pw, ph), ox = out.getContext('2d'), img = c.getContext('2d').getImageData(px0, py0, pw, ph);
    for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) { const gi = Math.floor((py0 + y) / scale) * gw + Math.floor((px0 + x) / scale), l = lab[gi]; if (l < 0 || owner.get(l) !== b) img.data[(y * pw + x) * 4 + 3] = 0; }
    ox.putImageData(img, 0, 0);
    return { canvas: out, x: px0 / scale, y: py0 / scale, w: pw / scale, h: ph / scale };
  });
}

let pdfP;
const pdfjs = () => pdfP || (pdfP = import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/build/pdf.min.mjs').then(m => { m.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs'; return m; }));

/* Illustrator (.ai saved with "Create PDF Compatible File", the default) and PDF: each page is an artboard;
   each Illustrator layer is a PDF optional-content group, rendered alone onto a transparent canvas. */
async function fromPdf(buf, name) {
  const lib = await pdfjs();
  const doc = await lib.getDocument({ data: new Uint8Array(buf), isEvalSupported: false }).promise;
  const boards = [];
  for (let p = 1; p <= Math.min(doc.numPages, 8); p++) {
    const page = await doc.getPage(p), vp1 = page.getViewport({ scale: 1 });
    const hint = sizeIn(name), w = Math.round(vp1.width), h = Math.round(vp1.height);
    const scale = Math.min(3, Math.max(2, 1200 / Math.max(w, h)));
    const vp = page.getViewport({ scale });
    const render = async cfg => { const c = canvas(vp.width, vp.height); await page.render({ canvasContext: c.getContext('2d'), viewport: vp, background: 'rgba(0,0,0,0)', optionalContentConfigPromise: cfg ? Promise.resolve(cfg) : undefined }).promise; return c; };
    const flatC = await render(null);
    const layers = [];
    const occ = await doc.getOptionalContentConfig().catch(() => null);
    const groups = occ ? Object.entries(occ.getGroups() || {}) : [];
    if (groups.length > 1) {
      const order = (occ.getOrder && occ.getOrder()) || groups.map(([id]) => id);
      const ids = (Array.isArray(order) ? order.flat(4) : []).filter(id => typeof id === 'string' && occ.getGroup(id));
      const list = ids.length ? ids : groups.map(([id]) => id);
      for (const id of list) {
        const g = occ.getGroup(id); if (!g || g.visible === false) continue;
        const cfg = await doc.getOptionalContentConfig();
        list.forEach(o => cfg.setVisibility(o, o === id));
        const cr = cropAlpha(await render(cfg), scale); if (!cr) continue;
        layers.push({ name: g.name || 'Layer', ...cr });
      }
      /* PDF order lists top layer first in Illustrator; paint bottom → top. */
      layers.reverse();
    }
    boards.push({ w: hint && hint[0] / hint[1] === w / h ? hint[0] : w, h: hint && hint[0] / hint[1] === w / h ? hint[1] : h, flat: flatC, scale, layers, layered: layers.length > 1 });
  }
  return boards;
}

let psdP;
const agPsd = () => psdP || (psdP = import('https://esm.sh/ag-psd@20.2.0'));
async function fromPsd(buf, name) {
  const { readPsd } = await agPsd();
  const psd = readPsd(buf, { skipThumbnail: true, useImageData: false });
  const layers = [];
  const walk = (list, path) => (list || []).forEach(l => {
    if (l.hidden) return;
    if (l.children) return walk(l.children, path.concat(l.name || 'Group'));
    if (!l.canvas || !l.canvas.width) return;
    layers.push({ name: path.concat(l.name || 'Layer').join(' / '), canvas: l.canvas, x: l.left || 0, y: l.top || 0, w: l.canvas.width, h: l.canvas.height, opacity: l.opacity == null ? 1 : l.opacity });
  });
  walk(psd.children, []);
  const flat = psd.canvas || (() => { const c = canvas(psd.width, psd.height), x = c.getContext('2d'); layers.forEach(l => { x.globalAlpha = l.opacity; x.drawImage(l.canvas, l.x, l.y); }); return c; })();
  return [{ w: psd.width, h: psd.height, flat, scale: 1, layers, layered: layers.length > 1 }];
}

async function svgImg(text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }));
  try { const i = new Image(); i.src = url; await i.decode(); return i; } finally { setTimeout(() => URL.revokeObjectURL(url), 2000); }
}
async function fromSvg(buf, name) {
  const text = new TextDecoder().decode(buf), doc = new DOMParser().parseFromString(text, 'image/svg+xml'), root = doc.documentElement;
  const vb = (root.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
  const w = Math.round(parseFloat(root.getAttribute('width')) || vb[2] || 300), h = Math.round(parseFloat(root.getAttribute('height')) || vb[3] || 250), scale = 2;
  const draw = async t => { const c = canvas(w * scale, h * scale), i = await svgImg(t); c.getContext('2d').drawImage(i, 0, 0, c.width, c.height); return c; };
  const flat = await draw(text);
  const kids = Array.from(root.children).filter(n => !/^(defs|style|title|desc|metadata)$/i.test(n.tagName));
  const layers = [];
  if (kids.length > 1) for (const k of kids) {
    const one = root.cloneNode(false); Array.from(root.children).filter(n => /^(defs|style)$/i.test(n.tagName)).forEach(n => one.appendChild(n.cloneNode(true))); one.appendChild(k.cloneNode(true));
    if (!one.getAttribute('width')) { one.setAttribute('width', w); one.setAttribute('height', h); }
    const cr = cropAlpha(await draw(new XMLSerializer().serializeToString(one)), scale); if (!cr) continue;
    layers.push({ name: k.getAttribute('id') || k.getAttribute('inkscape:label') || k.getAttribute('data-name') || k.tagName, ...cr });
  }
  return [{ w, h, flat, scale, layers, layered: layers.length > 1 }];
}

/* .fig is Figma's private binary format; only the embedded preview is readable, so it imports flat. */
async function fromFig(buf, name, JSZip) {
  if (!JSZip) throw new Error('fig');
  const z = await JSZip.loadAsync(buf), th = z.file('thumbnail.png');
  if (!th) throw new Error('fig');
  const b = await th.async('blob'), bmp = await createImageBitmap(b), c = canvas(bmp.width, bmp.height); c.getContext('2d').drawImage(bmp, 0, 0);
  const hint = sizeIn(name);
  return [{ w: hint ? hint[0] : bmp.width, h: hint ? hint[1] : bmp.height, flat: c, scale: hint ? bmp.width / hint[0] : 1, layers: [], layered: false, previewOnly: true }];
}

export const HELP = {
  ai: 'Save it from Illustrator with “Create PDF Compatible File” on (the default), or export a layered PDF or SVG.',
  eps: 'Export it from Illustrator as a layered PDF or SVG instead.',
  indd: 'InDesign files can’t be read in the browser. Export a PDF with “Create Acrobat Layers” on, then upload that.',
  idml: 'Export a PDF with “Create Acrobat Layers” on from InDesign, then upload that.',
  fig: 'Figma files only expose a flat preview. For layer animation, export each frame from Figma as SVG (or PDF) and upload that.'
};

/* Returns { file, kind, boards: [{ w, h, flatName, flatBlob, layers: [{ name, file, blob, x, y, w, h }], layered, previewOnly }] } */
export async function importDesign(blob, name, opt = {}) {
  const kind = kindOf(name), buf = await blob.arrayBuffer();
  if (kind === 'indd' || kind === 'idml' || kind === 'eps') throw Object.assign(new Error(HELP[kind]), { help: true });
  let boards;
  try {
    if (kind === 'ai' || kind === 'pdf') boards = await fromPdf(buf, name);
    else if (kind === 'psd' || kind === 'psb') boards = await fromPsd(buf, name);
    else if (kind === 'svg') boards = await fromSvg(buf, name);
    else if (kind === 'fig') boards = await fromFig(buf, name, opt.JSZip);
  } catch (e) { throw Object.assign(new Error((HELP[kind] ? 'Couldn’t read ' + name + '. ' + HELP[kind] : 'Couldn’t read ' + name + '.')), { help: true, cause: e }); }
  const base = slug(name.replace(DESIGN_RE, ''));
  const out = [];
  for (let b = 0; b < boards.length; b++) {
    const bd = boards[b], tag = base + (boards.length > 1 ? '-ab' + (b + 1) : '');
    const flatName = 'design-' + tag + '-flat.png', flatBlob = await toBlob(bd.flat);
    const layers = [], r1 = v => Math.round(v * 10) / 10;
    for (let i = 0; i < bd.layers.length; i++) {
      const l = bd.layers[i], stem = 'design-' + tag + '-L' + String(i + 1).padStart(2, '0') + '-' + slug(l.name);
      const ls = l.canvas.width / Math.max(1, l.w), sp = splitParts(l.canvas, ls);
      const parts = [];
      if (sp) for (let k = 0; k < sp.length; k++) { const p = sp[k]; parts.push({ name: l.name + ' · part ' + (k + 1), file: stem + '-p' + (k + 1) + '.png', blob: await toBlob(p.canvas), x: r1(l.x + p.x), y: r1(l.y + p.y), w: r1(p.w), h: r1(p.h) }); }
      layers.push({ name: l.name, file: stem + '.png', blob: parts.length ? null : await toBlob(l.canvas), x: r1(l.x), y: r1(l.y), w: r1(l.w), h: r1(l.h), opacity: l.opacity == null ? 1 : l.opacity, parts });
    }
    /* Reference map for the model: the flat design with a 50px coordinate grid and numbered boxes for every layer and part. */
    const mc = canvas(bd.w * 2, bd.h * 2), mx = mc.getContext('2d'); mx.drawImage(bd.flat, 0, 0, mc.width, mc.height);
    mx.strokeStyle = 'rgba(255,255,255,.35)'; mx.lineWidth = 1; mx.font = '600 14px sans-serif'; mx.fillStyle = 'rgba(255,255,255,.8)';
    for (let gx = 50; gx < bd.w; gx += 50) { mx.beginPath(); mx.moveTo(gx * 2, 0); mx.lineTo(gx * 2, mc.height); mx.stroke(); mx.fillText(String(gx), gx * 2 + 3, 14); }
    for (let gy = 50; gy < bd.h; gy += 50) { mx.beginPath(); mx.moveTo(0, gy * 2); mx.lineTo(mc.width, gy * 2); mx.stroke(); mx.fillText(String(gy), 3, gy * 2 - 3); }
    let n = 0; mx.lineWidth = 2; mx.font = '700 16px sans-serif';
    layers.forEach((l, i) => (l.parts.length ? l.parts.map((p, k) => [p, '#layer-' + (i + 1) + '-' + (k + 1)]) : [[l, '#layer-' + (i + 1)]]).forEach(([b, id]) => { n++; mx.strokeStyle = ['#00CCFF', '#FF3DF0', '#BEF264', '#FFB020'][n % 4]; mx.strokeRect(b.x * 2, b.y * 2, b.w * 2, b.h * 2); const tw = mx.measureText(id).width + 8; mx.fillStyle = 'rgba(0,0,0,.75)'; mx.fillRect(b.x * 2, b.y * 2, tw, 20); mx.fillStyle = '#fff'; mx.fillText(id, b.x * 2 + 4, b.y * 2 + 15); }));
    const mapName = 'design-' + tag + '-map.png', mapBlob = await toBlob(mc);
    out.push({ w: bd.w, h: bd.h, flatName, flatBlob, mapName, mapBlob, layers, layered: bd.layered, previewOnly: !!bd.previewOnly, source: name, tag });
  }
  return { file: name, kind, boards: out };
}

/* Deterministic still: the artboard rebuilt from its own layers at their exact positions (bottom → top). No AI redesign. */
export function stillFromBoard(bd, opt = {}) {
  const q = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const els = bd.layered && bd.layers.length
    ? bd.layers.map((l, i) => (l.parts && l.parts.length)
      ? '<div class="kx-g" id="layer-' + (i + 1) + '" data-kx-layer="' + q(l.name) + '" style="z-index:' + (i + 1) + (l.opacity < 1 ? ';opacity:' + l.opacity : '') + '">\n' + l.parts.map((p, k) => '  <img class="kx-l" id="layer-' + (i + 1) + '-' + (k + 1) + '" data-kx-part="' + q(p.name) + '" alt="" src="asset://' + p.file + '" style="left:' + p.x + 'px;top:' + p.y + 'px;width:' + p.w + 'px;height:' + p.h + 'px">').join('\n') + '\n</div>'
      : '<img class="kx-l" id="layer-' + (i + 1) + '" data-kx-layer="' + q(l.name) + '" alt="" src="asset://' + l.file + '" style="left:' + l.x + 'px;top:' + l.y + 'px;width:' + l.w + 'px;height:' + l.h + 'px;z-index:' + (i + 1) + (l.opacity < 1 ? ';opacity:' + l.opacity : '') + '">').join('\n')
    : '<img class="kx-l" id="layer-1" data-kx-layer="Artwork" alt="" src="asset://' + bd.flatName + '" style="left:0;top:0;width:' + bd.w + 'px;height:' + bd.h + 'px">';
  const dur = (opt.duration || 15) * 1000;
  return '<!doctype html>\n<html><head><meta charset="utf-8"><meta name="ad.size" content="width=' + bd.w + ',height=' + bd.h + '">\n<meta name="kx-source" content="' + q(bd.source) + '">\n<style>html,body{margin:0;width:' + bd.w + 'px;height:' + bd.h + 'px;overflow:hidden}body{position:relative;cursor:pointer}.kx-l{position:absolute;display:block;max-width:none;user-select:none;-webkit-user-drag:none}.kx-g{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}</style></head>\n<body>\n' + els + '\n<script id="kx-runtime">var clickTag = window.clickTag || ' + JSON.stringify(opt.dest || '#') + ';document.body.addEventListener("click",function(){window.open(window.clickTag||clickTag,"_blank")});\n/* Capture API for CSS-keyframe ads: every CSS animation runs on one document timeline, so seek() just sets it. */\n(function(){var D=' + dur + ';function all(){return document.getAnimations?document.getAnimations():[]}window.mock={ready:(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){return Promise.all([].map.call(document.images,function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r})}))}),durationMs:D,finalFrameTimeMs:Math.max(0,D-500),seek:function(ms){all().forEach(function(a){a.pause();a.currentTime=ms});return new Promise(function(r){requestAnimationFrame(function(){r()})})},reset:function(){all().forEach(function(a){a.currentTime=0;a.play()})},setDemoMode:function(){}};})();<\/script>\n</body></html>';
}

/* Prompt block that pins the model to the uploaded layers. */
export function layerBrief(bd) {
  const L = ['DESIGN-FILE MODE (the user uploaded a finished design: ' + bd.source + ', artboard ' + bd.w + 'x' + bd.h + ').',
    'The still you receive IS that design, rebuilt from its own layers. Do NOT redesign, restyle, recolour, re-crop, rewrite copy, add new imagery or add new elements. Keep every <img data-kx-layer> with its exact src, left, top, width, height and stacking order in the final composed frame.',
    'Your job is motion only: animate each layer (entrances, builds, subtle loops, CTA emphasis) so the ad ends on exactly the original composition and holds it, then loops. Use transforms and opacity on the existing layer elements; you may wrap a layer in a div for motion, never change its final geometry.',
    'If the user asked to animate "all layers", every listed layer must move at least once.',
    'Layers split into parts (#layer-N-K) are the separate objects in that layer (e.g. each ticket, each headline line); animate them individually: staggered entrances from their own directions, then subtle idle loops.',
    'To loop-animate something INSIDE an object (an icon, ornament, symbol or sparkle within a ticket), overlay a cropped copy above it: a div at that detail\'s box (find it on the attached design map; grid lines every 50px) with background-image: url(asset://<that part or layer file>), background-size: <part w>px <part h>px, background-position: -(detailX - partX)px -(detailY - partY)px. Animate the overlay (pulse, glow via filter: brightness, small rock, twinkle) while the original stays put underneath. Add small sparkle shapes in CSS only where the user asked for sparkles.',
    'Lights, borders and other many-piece textures stay one layer: flash them with filter: brightness() keyframes on a loop.',
    'Keep the whole ad light: reuse these PNGs, never inline base64 images.',
    'HOW TO WRITE IT (this is the approved KORTX style for design-file ads): keep the still\'s HTML and its #kx-runtime script exactly; add classes to the existing layer/part elements and write the motion as pure CSS @keyframes in one <style> block. No animation JavaScript, no libraries. Use transform-origin:center on moving pieces. Proven recipe:',
    '  headline: 1.1s cubic-bezier(.16,1,.3,1) .15s both, from opacity 0, translateY(-30px) scale(.65) rotate(-5deg), overshoot to translateY(3px) scale(1.035) rotate(1deg) at 70%, settle to none.',
    '  tickets / cards / products: 1.2s cubic-bezier(.16,1,.3,1) both, each from below (translate(var(--dx),110px) rotate(var(--rot)) scale(.7), opacity 0) with its own --dx/--rot and a 0.12–0.2s stagger.',
    '  CTA: .6s ease-out 1.8s both, from opacity 0 scale(.9); hover filter: brightness(1.15).',
    '  lights / bulbs / borders: flash on a loop after the build, e.g. 2.4s ease-in-out 2.2s infinite, keyframes 0%,35%,100% {filter:brightness(1.15)} 48%,75% {filter:brightness(.25)}.',
    '  details inside objects (via cropped overlays): gentle rock 5s ease-in-out infinite (rotate ±5deg), glow pulse 2.8–3.2s infinite (brightness 1→1.35, scale 1→1.035 at 30%), twinkle 2.8s infinite (opacity 0→.95, scale .3→1.3, rotate 30deg at 30%), offset the delays so they don\'t pulse in sync.',
    '  Everything ends on the exact original composition; infinite loops only on lights and details. Add @media (prefers-reduced-motion: reduce) { animation: none } for every animated class.',
    'Reply with one short sentence describing the motion, then the full document.'];
  if (bd.layered) L.push('Layers, bottom to top (id · name · x,y · w×h):\n' + bd.layers.map((l, i) => '#layer-' + (i + 1) + ' · ' + l.name + ' · ' + l.x + ',' + l.y + ' · ' + l.w + '×' + l.h + (l.parts && l.parts.length ? '\n' + l.parts.map((p, k) => '   #layer-' + (i + 1) + '-' + (k + 1) + ' · part ' + (k + 1) + ' · ' + p.x + ',' + p.y + ' · ' + p.w + '×' + p.h + ' · file ' + p.file).join('\n') : ' · file ' + l.file)).join('\n'));
  else L.push('This file came in flat (no separate layers' + (bd.previewOnly ? '; Figma preview only' : '') + '). Animate the single artwork with camera-style motion (scale, pan, light sweep) and keep it unaltered; do not paint new copy over it.');
  return L.join('\n');
}

/* Export budget: re-encode images step by step until index.html + assets stay under the limit uncompressed (ad servers check the unzipped size). */
export async function shrinkImage(blob, level) {
  if (!level || !blob || !/^image\/(png|jpe?g|webp)$/.test(blob.type) || blob.size < 120000) return blob;
  const bmp = await createImageBitmap(blob), f = [1, .8, .66, .5][Math.min(level, 3)];
  const c = canvas(Math.max(1, Math.round(bmp.width * f)), Math.max(1, Math.round(bmp.height * f))), x = c.getContext('2d'); x.drawImage(bmp, 0, 0, c.width, c.height);
  const d = x.getImageData(0, 0, c.width, c.height).data; let opaque = true; for (let i = 3; i < d.length; i += 4 * 7) if (d[i] < 250) { opaque = false; break; }
  const type = opaque ? 'image/jpeg' : level >= 3 ? 'image/webp' : 'image/png', qv = [1, .9, .84, .78][Math.min(level, 3)];
  const out = await new Promise(r => c.toBlob(b => r(b), type, qv));
  return out && out.size < blob.size ? out : blob;
}
