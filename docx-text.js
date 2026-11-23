/* Plain text from a .docx (Word) file, in the browser, no library.
   A .docx is a zip; word/document.xml holds the body. Table cells are joined with " | "
   so intake sheets keep their label | value | source rows. */
export async function docxText(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  const dv = new DataView(buf.buffer);
  let eocd = buf.length - 22;
  while (eocd >= 0 && dv.getUint32(eocd, true) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('Not a Word file');
  const n = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  for (let i = 0; i < n; i++) {
    const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true);
    const nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(buf.subarray(p + 46, p + 46 + nl));
    if (name === 'word/document.xml') {
      const start = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true);
      const data = buf.subarray(start, start + csize);
      const xml = method === 0 ? new TextDecoder().decode(data)
        : await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
      return xml.replace(/<w:tab\/>/g, '\t').replace(/<w:br\/>/g, '\n').replace(/<\/w:tc>/g, ' | ').replace(/<\/w:tr>/g, '\n').replace(/<\/w:p>/g, '\n')
        .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
        .replace(/ \| \n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    }
    p += 46 + nl + el + cl;
  }
  throw new Error('No document body found in this Word file');
}
export const isDocx = f => /\.docx$/i.test(f.name) || /officedocument\.wordprocessingml/.test(f.type || '');
