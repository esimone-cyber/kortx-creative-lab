/* Reads an uploaded HTML page for CONTENT ONLY and returns a structured outline for the AI.
   It keeps the page's information architecture (views or brands, tabs, sub-sections, switchable
   variants) so the generated KORTX page can mirror it, but drops every visual choice (colors, fonts,
   layout, classes). Embedded ads (iframes) are counted, never copied as text.

   How structure is found (generic, no site-specific class names):
   - A SWITCH is a group of 2+ sibling buttons sharing one data-* attribute (data-b, data-t, data-p…)
     whose values each point at a content element: same attribute on a non-button, or an id equal to /
     ending in "-<value>". Nested switches become levels: VIEW → TAB → SUB-SECTION → ITEM.
   - Pages with no switches fall back to their <section>s (data-screen-label or first heading). */

const BLOCK = /^(ADDRESS|ARTICLE|ASIDE|BLOCKQUOTE|DD|DIV|DL|DT|FIELDSET|FIGCAPTION|FIGURE|FOOTER|FORM|H[1-6]|HEADER|LI|MAIN|NAV|OL|P|PRE|SECTION|TABLE|TBODY|THEAD|TR|TD|TH|UL|BUTTON)$/;
const SKIP = /^(SCRIPT|STYLE|NOSCRIPT|SVG|TEMPLATE|IFRAME|IMG|VIDEO|CANVAS|PICTURE|SOURCE)$/;
const NAVTXT = /^(next|back|←|→|‹|›|prev|☾|☼|⇩|download pdf|dark|light|open the|now viewing)/i;
const clean = s => String(s || '').replace(/\s+/g, ' ').trim();
const own = el => clean([...el.childNodes].map(n => n.nodeType === 3 ? n.textContent : (n.nodeType === 1 && !BLOCK.test(n.tagName) && !SKIP.test(n.tagName) ? n.textContent : ' ')).join(' '));
const esc = v => (typeof CSS !== 'undefined' && CSS.escape) ? CSS.escape(v) : String(v).replace(/["\\]/g, '\\$&');

function labelOf(btn) { const h = btn.querySelector('h1,h2,h3,h4,strong,b'); return clean((h || btn).textContent).slice(0, 60); }

/* Every switch on the page: { el (button parent), attr, items: [{ value, label, target }] }. */
function findSwitches(doc) {
  const out = [], seen = new Set();
  doc.querySelectorAll('button, [role="tab"], a[data-t], a[data-b]').forEach(b => {
    const p = b.parentElement; if (!p || seen.has(p)) return; seen.add(p);
    const kids = [...p.children].filter(c => c.tagName === 'BUTTON' || c.getAttribute('role') === 'tab' || c.tagName === 'A');
    if (kids.length < 2 || kids.length > 12) return;
    const names = [...kids[0].attributes].map(a => a.name).filter(n => /^data-/.test(n) && n !== 'data-focusable');
    for (const attr of names) {
      const vals = kids.map(k => k.getAttribute(attr));
      if (vals.some(v => !v) || new Set(vals).size !== vals.length) continue;
      const labels = kids.map(labelOf);
      /* Pager rows ("← Audit", "Next: Audience →") are navigation, not structure. */
      if (labels.some(l => /^(←|‹|next\b|back\b|prev)|→|↑/i.test(l))) continue;
      /* Resolve targets in the smallest ancestor that holds all of them, so repeated brand blocks with the same ids each map to their own panels. */
      const find = (scope, v) => { const q = sel => [...scope.querySelectorAll(sel)].find(t => !t.contains(p) && !p.contains(t) && t.tagName !== 'BUTTON' && t.tagName !== 'A'); return q('[' + attr + '="' + esc(v) + '"]') || q('[id="' + esc(v) + '"]') || q('[id="p-' + esc(v) + '"]') || q('[id="b-' + esc(v) + '"]') || q('[id$="-' + esc(v) + '"]'); };
      let scope = p.parentElement, items = null;
      while (scope) { const tr = vals.map(v => find(scope, v)); if (tr.every(Boolean)) { items = kids.map((k, i) => ({ value: vals[i], label: labels[i], target: tr[i] })); break; } scope = scope.parentElement; }
      const rich = t => clean(t.textContent).length > 40 || !!t.querySelector('iframe, img, video');
      if (items && items.every(x => rich(x.target))) { out.push({ el: p, attr, items }); break; }
    }
  });
  /* Several groups can drive the same targets (a header switch and big brand tiles): keep the first. */
  const uniq = []; out.forEach(s => { if (!uniq.some(u => u.items.every((x, i) => s.items[i] && s.items[i].target === x.target))) uniq.push(s); });
  return uniq;
}

/* Reading-order text of one region, skipping sub-regions handled elsewhere and switch button rows. */
function regionText(root, skip) {
  const parts = [];
  const walk = el => {
    for (const c of el.children) {
      if (SKIP.test(c.tagName) || skip.has(c)) continue;
      if (c.tagName === 'TABLE') { const rows = [...c.querySelectorAll('tr')].map(r => [...r.children].map(x => clean(x.textContent)).join(' | ')); if (rows.length) parts.push('TABLE:\n' + rows.join('\n')); continue; }
      if (/^H[1-6]$/.test(c.tagName)) { const x = clean(c.textContent); if (x) parts.push('#'.repeat(+c.tagName[1]) + ' ' + x); continue; }
      if (!BLOCK.test(c.tagName)) continue;
      /* Script-driven pickers (personas, feed states, ad sizes): name the set so each option becomes a card, persona or variant. */
      const btns = [...c.children].filter(k => k.tagName === 'BUTTON');
      if (btns.length >= 2 && btns.length === [...c.children].filter(k => BLOCK.test(k.tagName)).length) { const ls = btns.map(labelOf).filter(l => l && !NAVTXT.test(l) && !/^(←|‹)|→|↑|▶/.test(l)); if (ls.length >= 2) parts.push('[ITEM SET' + (c.getAttribute('aria-label') ? ' · ' + clean(c.getAttribute('aria-label')) : '') + ': ' + ls.join(' · ') + ']'); continue; }
      const lab = c.getAttribute && c.getAttribute('data-screen-label');
      if (lab && c.tagName === 'SECTION') parts.push('[SECTION: ' + clean(lab) + ']');
      const x = own(c);
      if (x && x.length > 1 && !(c.tagName === 'BUTTON' && NAVTXT.test(x))) parts.push(x);
      walk(c);
    }
  };
  walk(root);
  return parts.filter((p, i) => p !== parts[i - 1]).join('\n');
}

const LEVEL = ['VIEW', 'TAB', 'SUB-SECTION', 'ITEM'];

export function htmlOutline(html) {
  const d = new DOMParser().parseFromString(html, 'text/html');
  const ads = [...d.querySelectorAll('iframe')].map(f => { const w = f.getAttribute('width') || ((f.getAttribute('style') || '').match(/width:\s*(\d+)px/) || [])[1] || '', h = f.getAttribute('height') || ((f.getAttribute('style') || '').match(/height:\s*(\d+)px/) || [])[1] || ''; return (w && h ? w + 'x' + h : 'ad') + (f.getAttribute('title') ? ' (' + f.getAttribute('title') + ')' : ''); });
  const title = clean(d.title);
  const sw = findSwitches(d);
  const swEls = new Set(sw.map(s => s.el));
  /* A switch belongs to the nearest region that contains all of its targets. */
  const childSwitches = region => sw.filter(s => s.items.every(x => region.contains(x.target)) && s.items.every(x => x.target !== region) && !sw.some(o => o !== s && o.items.some(x => x.target !== region && region.contains(x.target) && s.items.every(y => x.target.contains(y.target)))));
  const tree = []; let topViews = [], topTabs = [];
  const emit = (region, depth) => {
    const subs = childSwitches(region).filter(s => !s.items.some(x => x.target === region));
    const skip = new Set([...swEls]); subs.forEach(s => s.items.forEach(x => skip.add(x.target)));
    const own = regionText(region, skip); if (own) tree.push(own);
    subs.forEach(s => {
      /* A top-level set is VIEWS only when its targets hold their own tab sets; otherwise it is the page's tabs. */
      const nested = s.items.some(x => childSwitches(x.target).length), lv = depth === 0 && !nested ? 1 : depth;
      if (depth === 0 && nested) topViews = s.items.map(x => x.label);
      if (depth === 0 && !nested) topTabs = s.items.map(x => x.label);
      const L = LEVEL[lv] || 'ITEM', bar = '='.repeat(Math.max(1, 3 - lv));
      tree.push('\n[' + L + ' SET: ' + s.items.map(x => x.label.replace(/\s*[↓↑→]$/, '')).join(' · ') + ']');
      s.items.forEach(x => { tree.push('\n' + bar + ' ' + L + ': ' + x.label.replace(/\s*[↓↑→]$/, '') + ' ' + bar); emit(x.target, lv + 1); });
    });
  };
  d.querySelectorAll('script,style,noscript,template').forEach(n => n.remove());
  emit(d.body, 0);
  const tabsOf = sw.filter(s => !sw.some(o => o !== s && o.items.some(x => s.items.every(y => x.target.contains(y.target)))) );
  const head = sw.length
    ? 'SOURCE STRUCTURE (mirror it): ' + (topViews.length ? 'top-level views: ' + topViews.join(' · ') + '. ' : topTabs.length ? 'one page, tabs: ' + topTabs.map(x => x.replace(/\s*[↓↑→]$/, '')).join(' · ') + '. ' : '') + 'Levels below are marked VIEW → TAB → SUB-SECTION → ITEM. Each VIEW that is a different brand becomes its own brand with its own tabs; a VIEW like "Creative" next to one brand becomes that brand\'s last tab. TABs become page tabs with the same labels, in order. SUB-SECTIONs are sub-tabs inside that tab: keep them as sub-tabs (every section of a sub-section gets "sub":"<its label word for word>"). ITEM sets (personas, feed states, variants) become one card, persona or variant each.\n'
    : (d.querySelectorAll('section[data-screen-label], section h2').length > 2 ? 'SOURCE STRUCTURE: one scrolling page; each [SECTION] marker is a chapter. Group chapters into 3 to 6 tabs in their order, using the chapter names as tab labels.\n' : '');
  if (!topViews.length && topTabs.length) { /* fold the single-page wording */ }
  return { title, text: (title ? 'TITLE: ' + title + '\n' : '') + head + tree.join('\n'), ads, brands: topViews.length || 1, tabs: topViews.length ? topViews : topTabs };
}

/* Recreate mode helpers: every heading in source order (for the coverage check) and the interactive widgets the source uses, each mapped to the KORTX container that replaces it. */
export function htmlHeadings(html) {
  const d = typeof html === 'string' ? new DOMParser().parseFromString(html, 'text/html') : html, seen = new Set(), out = [];
  d.querySelectorAll('h1, h2, h3').forEach(h => { if (h.closest('nav, footer, button, script, style, template, iframe')) return; const t = clean(h.textContent).slice(0, 90); const k = t.toLowerCase(); if (t.length < 3 || seen.has(k)) return; seen.add(k); out.push(t); });
  return out.slice(0, 120);
}
export function htmlWidgets(html) {
  const d = typeof html === 'string' ? new DOMParser().parseFromString(html, 'text/html') : html, w = [];
  const n = s => d.querySelectorAll(s).length;
  const rings = [...d.querySelectorAll('svg circle[stroke-dasharray]')].length;
  if (rings) w.push('score gauge or progress ring (' + rings + ' arc' + (rings > 1 ? 's' : '') + ') → "score" when it is a total "of 100" with categories, otherwise "rings"');
  if (n('input[type=range], [role=slider]')) w.push('slider or scrubber → "explore" for data, the Multi-Ad Scrubber for ads');
  const arrows = [...d.querySelectorAll('button')].filter(b => /^[‹›<>←→]$/.test(clean(b.textContent))).length;
  if (arrows) w.push('carousel with arrows (' + arrows + ' buttons) → personas catalog block for personas, otherwise "process"');
  if (n('details, [class*=accordion], [aria-expanded]')) w.push('accordion or expandable rows → "details"');
  const stepBtns = [...d.querySelectorAll('[class*=step] button, button[data-s]')].length;
  if (stepBtns) w.push('clickable steps (' + stepBtns + ') → "process" (or "builder" when the viewer should put them in order)');
  if (n('canvas, svg rect, [class*=chart], [class*=bar]')) w.push('charts or bars → "chart" or "explore", same numbers');
  const segs = [...d.querySelectorAll('[class*=seg], [class*=toggle], [role=tablist]')].filter(e => { const b = [...e.querySelectorAll('button')]; return b.length === 2 && !b.some(x => x.hasAttribute('data-b') || /theme|print/i.test(x.getAttribute('onclick') || '')); }).length;
  if (segs) w.push('two-option toggle → "compare"');
  if (n('[class*=map], svg[class*=map]')) w.push('map → "map"');
  const other = n('[draggable=true], input:not([type=hidden]):not([type=range]), select, textarea, [onclick]:not(button), [class*=flip], [class*=hotspot], [class*=quiz], [class*=calc]');
  if (other) w.push('other interactive elements (' + other + ': inputs, drag, flip, hotspots, quizzes or calculators) → "widget", rebuilt 1:1');
  w.push('anything above that a KORTX container cannot match exactly (same controls, states and behavior) → "widget", rebuilt 1:1 in the KORTX look');
  return w;
}
