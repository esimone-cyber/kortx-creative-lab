/* Excel (.xlsx) to plain text for the AI: every sheet as rows of cells joined with " | ".
   An .xlsx is a zip; xl/sharedStrings.xml holds the text, xl/worksheets/sheetN.xml the cells. */
async function entries(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength), out = {};
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('Not a valid Excel file');
  let p = dv.getUint32(eocd + 16, true); const n = dv.getUint16(eocd + 10, true);
  for (let k = 0; k < n; k++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(buf.subarray(p + 46, p + 46 + nl));
    out[name] = { method, csize, off };
    p += 46 + nl + xl + cl;
  }
  return out;
}
async function read(buf, e) {
  if (!e) return '';
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const start = e.off + 30 + dv.getUint16(e.off + 26, true) + dv.getUint16(e.off + 28, true);
  const data = buf.subarray(start, start + e.csize);
  return e.method === 0 ? new TextDecoder().decode(data) : await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
}
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
export async function xlsxText(file) {
  const buf = new Uint8Array(await file.arrayBuffer()), ents = await entries(buf);
  const ss = [], ssXml = await read(buf, ents['xl/sharedStrings.xml']);
  (ssXml.match(/<si>[\s\S]*?<\/si>/g) || []).forEach(si => ss.push(unesc((si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || []).map(t => t.replace(/<[^>]+>/g, '')).join(''))));
  const wb = await read(buf, ents['xl/workbook.xml']);
  const names = (wb.match(/<sheet [^>]*name="([^"]*)"/g) || []).map(x => unesc(x.match(/name="([^"]*)"/)[1]));
  const sheets = Object.keys(ents).filter(k => /^xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  let out = '';
  for (let i = 0; i < sheets.length; i++) {
    const xml = await read(buf, ents[sheets[i]]), rows = [];
    (xml.match(/<row[\s\S]*?<\/row>/g) || []).forEach(r => {
      const cells = (r.match(/<c [^>]*?(?:\/>|>[\s\S]*?<\/c>)/g) || []).map(c => {
        const t = (c.match(/ t="([^"]+)"/) || [])[1], v = (c.match(/<v>([\s\S]*?)<\/v>/) || [])[1], is = (c.match(/<is>[\s\S]*?<\/is>/) || [])[0];
        if (t === 's' && v != null) return ss[+v] || '';
        if (t === 'inlineStr' && is) return unesc(is.replace(/<[^>]+>/g, ''));
        return v != null ? unesc(v) : '';
      });
      if (cells.some(x => String(x).trim())) rows.push(cells.join(' | '));
    });
    out += 'SHEET: ' + (names[i] || 'Sheet ' + (i + 1)) + '\n' + rows.slice(0, 2000).join('\n') + '\n\n';
  }
  return out.trim();
}
export const isXlsx = f => /\.xlsx$/i.test(f.name) || /spreadsheetml/.test(f.type || '');
