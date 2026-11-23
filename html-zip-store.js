/* HTML5 zip creatives for the Creative Database.
   The zip lives in Supabase Storage (cached in IndexedDB); the row only
   carries its key. Previews unpack into blob URLs; Export HTML inlines every
   asset as a data URI so the result is one self-contained file. */

let jszipP;
function loadJSZip() {
  if (window.JSZip) return Promise.resolve(window.JSZip);
  return jszipP || (jszipP = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/jszip@3.10.1/dist/jszip.min.js';
    s.onload = () => res(window.JSZip);
    s.onerror = () => { jszipP = null; rej(new Error('Could not load the zip reader')); };
    document.head.appendChild(s);
  }));
}

const DB = 'kortx.creative.zips', ST = 'zips';
function idb() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(ST);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
/* Zips upload to the shared library so every visitor sees them; IndexedDB is
   just a local cache in front of it. */
export async function putZip(key, blob) {
  const cloud = await import('./creative-cloud.js');
  await cloud.uploadZip(key, blob);
  return cacheZip(key, blob);
}
async function cacheZip(key, blob) {
  const db = await idb();
  return new Promise((res, rej) => {
    const tx = db.transaction(ST, 'readwrite');
    tx.objectStore(ST).put(blob, key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
export async function getZip(key) {
  let local = null;
  try {
    const db = await idb();
    local = await new Promise((res, rej) => {
      const q = db.transaction(ST).objectStore(ST).get(key);
      q.onsuccess = () => res(q.result || null);
      q.onerror = () => rej(q.error);
    });
  } catch (e) { /* private mode etc. */ }
  if (local) return local;
  const cloud = await import('./creative-cloud.js');
  const blob = await cloud.downloadZip(key);
  if (blob) cacheZip(key, blob).catch(() => {});
  return blob;
}

const MIME = { html: 'text/html', htm: 'text/html', css: 'text/css', js: 'text/javascript', mjs: 'text/javascript',
  json: 'application/json', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
  svg: 'image/svg+xml', webp: 'image/webp', avif: 'image/avif', mp4: 'video/mp4', webm: 'video/webm',
  mp3: 'audio/mpeg', wav: 'audio/wav', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf' };
const ext = n => (n.split('.').pop() || '').toLowerCase();
const isText = n => /^(html?|css|m?js|json|svg)$/.test(ext(n));
const dirOf = n => n.slice(0, n.lastIndexOf('/') + 1);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function relPath(fromDir, to) {
  const a = fromDir.split('/').filter(Boolean), b = to.split('/');
  let i = 0;
  while (i < a.length && i < b.length - 1 && a[i] === b[i]) i++;
  return '../'.repeat(a.length - i) + b.slice(i).join('/');
}

async function openZip(blob) {
  const JSZip = await loadJSZip();
  const zip = await JSZip.loadAsync(blob);
  const files = Object.values(zip.files).filter(f => !f.dir && !/(^|\/)(__MACOSX\/|\.)/.test(f.name));
  const pages = files.filter(f => /\.html?$/i.test(f.name)).sort((a, b) =>
    (a.name.split('/').length - b.name.split('/').length) ||
    (/index\.html?$/i.test(b.name) - /index\.html?$/i.test(a.name)));
  if (!pages.length) throw new Error('No HTML file found in that zip');
  return { files, entry: pages[0] };
}

function readSize(html) {
  const m = html.match(/<meta[^>]+ad\.size[^>]*>/i);
  if (m) {
    const w = m[0].match(/width\s*=\s*(\d+)/i), h = m[0].match(/height\s*=\s*(\d+)/i);
    if (w && h) return { w: +w[1], h: +h[1] };
  }
  return null;
}

export async function inspectZip(file) {
  const { entry } = await openZip(file);
  const html = await entry.async('string');
  const size = readSize(html);
  return { entry: entry.name, w: size ? size.w : 0, h: size ? size.h : 0 };
}

const toDataUrl = blob => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });

/* Rewrites every in-zip reference to a URL for that file. Binary assets first,
   then CSS/JS/SVG (which may point at them), the entry page last. */
async function build(blob, mode) {
  const { files, entry } = await openZip(blob);
  const urls = {};
  const make = async (name, data) => {
    const b = new Blob([data], { type: MIME[ext(name)] || 'application/octet-stream' });
    return mode === 'data' ? toDataUrl(b) : URL.createObjectURL(b);
  };
  const rewrite = (text, name) => {
    const dir = dirOf(name);
    Object.keys(urls).sort((a, b) => b.length - a.length).forEach(target => {
      const rel = relPath(dir, target);
      const re = new RegExp('(["\'(=\\s,])(\\./)?' + esc(rel) + '(?=["\')\\s?#,])', 'g');
      text = text.replace(re, (_, pre) => pre + urls[target]);
    });
    return text;
  };
  for (const f of files) if (!isText(f.name)) urls[f.name] = await make(f.name, await f.async('uint8array'));
  const order = ['css', 'svg', 'json', 'js', 'mjs'];
  for (const kind of order) for (const f of files) {
    if (f === entry || ext(f.name) !== kind) continue;
    urls[f.name] = await make(f.name, rewrite(await f.async('string'), f.name));
  }
  return rewrite(await entry.async('string'), entry.name);
}

/* Self-contained HTML (assets as data URIs) — works in other windows, where blob: URLs don't resolve. */
const inlineCache = {};
export function inlineHtml(key) {
  return inlineCache[key] || (inlineCache[key] = getZip(key).then(blob => { if (!blob) throw new Error('Zip not found in the library'); return build(blob, 'data'); }).catch(e => { delete inlineCache[key]; throw e; }));
}

const cache = {};
export function previewUrl(key) {
  return cache[key] || (cache[key] = getZip(key).then(async blob => {
    if (!blob) throw new Error('Zip not found in the library');
    const html = await build(blob, 'blob');
    return URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  }).catch(e => { delete cache[key]; throw e; }));
}

/* Hands back the original zip, byte for byte, with its assets exactly as uploaded. */
export async function exportHtml(key, filename) {
  const blob = await getZip(key);
  if (!blob) throw new Error('Zip not found in the library');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([blob], { type: 'application/zip' }));
  a.download = (filename || 'creative').replace(/\.zip$/i, '').replace(/[^\w.-]+/g, '-') + '.zip';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
