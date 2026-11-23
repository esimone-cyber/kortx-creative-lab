/* KORTX Proposal schema (master-v1): the contract between the Proposal Builder, the AI writer
   and `Proposal Master Template.dc.html`. The block catalog is read from the master data file,
   so adding or retiring a block there updates the prompt, the review list and QA together.
   House rules come from the kortx-proposal-microsite skill (v2: skills/kortx-proposal-builder). */
import master from './proposal-vadmv-master.js';
import { LOVABLE_GUIDE, relevantPages } from './lovable-learnings.js';

export const TEMPLATE_ID = 'master-v1';
export const DRAFT_KEY = 'kx-proposal-draft';

export const BLOCKS = [];
master.tabs.forEach(t => t.sections.forEach(s => BLOCKS.push({
  id: s.id, tab: t.key, tabLabel: t.label, type: s.type || 'narrative', nav: s.nav,
  use: (s.tpl && s.tpl.use) || 'Optional', when: (s.tpl && s.tpl.when) || ''
})));
export const TABS = master.tabs.map(t => ({ key: t.key, label: t.label, sub: t.sub }));
export const CORE_IDS = BLOCKS.filter(b => b.use === 'Core').map(b => b.id);
/* Tabs the strategist chose in Page Details (null or empty = all). Unchosen tabs are dropped
   from the page, the prompt and QA. */
export const tabKeys = picks => (Array.isArray(picks) && picks.length ? TABS.map(t => t.key).filter(k => picks.includes(k)) : TABS.map(t => t.key));
/* "Other": one custom tab the strategist names on Step 1. Always last; holds only custom x- sections. */
export const OTHER_KEY = 'other';
export const isOtherKey = k => /^other(-\d+)?$/.test(String(k || ''));
export function applyTabs(cfg, picks) { if (!cfg) return cfg; const keep = tabKeys(picks); return Object.assign({}, cfg, { tabs: cfg.tabs.filter(t => keep.includes(t.key) || isOtherKey(t.key)), tabPicks: keep }); }

/* Interactive blocks (Dynamic selector, Multi-Ad Scrubber, Drag and Drop ad builder): rebuilt around
   the creatives the strategist selects. Shared data lives in interactive-blocks.js. */
import { IX_BLOCKS, IX_SPEC, TRIGGERS, MOCKS, mockFmt, mockList, mockFmts, shapeIx, fillEmpty, adUnit, withPresets, presetFor } from './interactive-blocks.js';
export { IX_BLOCKS, TRIGGERS, MOCKS, mockFmt, mockList, mockFmts, shapeIx, fillEmpty, adUnit, presetFor };
/* The ads an interactive block is built from: the selected creatives in the mock's format. */
export const ixAdsFor = (units, mock) => { const f = mockFmts(mock); return (units || []).filter(u => f.includes(u.fmt)); };
/* Format argument for syncInteractive: one format, or both when both mocks are on. */
export const ixFmtArg = mock => { const f = mockFmts(mock); return f.length > 1 ? f : f[0]; };
export const INTERACTIVE = IX_BLOCKS;
const IX_IDS = IX_BLOCKS.map(x => x.id);
const ixByKey = k => IX_BLOCKS.find(x => x.key === k);
const ixById = id => IX_BLOCKS.find(x => x.id === String(id || '').replace(/--wide$/, ''));
/* Which picks survive the ad count (the scrubber needs 2+ ads). */
export const ixAllowed = (picks, nAds) => (picks || []).filter(k => { const b = ixByKey(k); return b && nAds >= b.min; });

/* Copy limits per field. [max chars] or [min count, max count] for arrays. Mirrors the
   data-spec tags on the template; QA enforces them. */
export const LIMITS = {
  common: { eyebrow: 40, headline: 60, intro: 280, narrative: 320, takeaway: 440, takeawayLabel: 24, note: 360 },
  summary: { count: [4, 5], k: 16, t: 110 },
  facts: { count: [2, 4], label: 24, value: 12, note: 80 },
  cases: { count: [2, 4], metric: 12, metricLabel: 50, title: 50, body: 220 },
  items: { count: [2, 5], title: 40, body: 240 },
  details: { count: [3, 6], k: 28, v: 320 },
  lists: { count: [1, 4], title: 60, itemCount: [1, 8], t: 240 },
  steps: { count: [2, 5], each: 28 },
  personas: { count: [2, 3] },
  alloc: { count: [2, 4], note: 220 },
  funnel: { count: [2, 3], role: 100 },
  platforms: { count: [1, 6], tag: 18, name: 28, bullet: 100 },
  approach: { count: [3, 4], b: 36, t: 120 },
  publishers: { count: [3, 10] },
  layers: { count: [2, 4], title: 44, body: 120 },
  callouts: { count: [3, 6], k: 28, v: 110 },
  timeline: { count: [5, 5], title: 28, when: 18, body: 380 },
  pills: { count: [3, 4], each: 32 }
};

const strip = s => { const o = Object.assign({}, s); delete o.tpl; return o; };
const firstOfType = {};
BLOCKS.forEach(b => { if (!firstOfType[b.type]) firstOfType[b.type] = b.id; });
const findSec = id => { for (const t of master.tabs) for (const s of t.sections) if (s.id === id) return s; return null; };
/* One worked example per section type, from the VA DMV master. */
export function examples() {
  return Object.keys(firstOfType).map(type => { const s = strip(findSec(firstOfType[type])); if (type === 'creative') delete s.dayparts; return s; });
}

export const HOUSE_RULES = `PAGE LOOK (fixed, never change): every proposal page renders on the Creative Playground background: #000509 ground with the drifting cyan, violet and magenta glows, the slow star field and the faint 88px grid. Never suggest or write a different background, theme, color or font per brand; only the brand logos and ads change.
CENTERED LAYOUT: the page headline block (eyebrow, h1, lede), every section header (eyebrow, h2 and any buttons under it), helper notes under lists, and the footer sign-off are centered. Content grids, lists, cards and forms stay full-width.

HOUSE STYLE (non-negotiable)
- No em dashes, no en dashes, no double hyphens, no hyphens used as connective punctuation. Rewrite the sentence. Ranges use "to".
- No tilde as an approximation. Write "about" or "roughly".
- Never name the DSP (e.g. The Trade Desk). Write "our platform".
- Never surface internal vendor names.
- Write "geo-targeted", never "geo-fenced".
- No rates, CPMs or fee percentages anywhere in client copy. The plan table has no Rate column.
- Concise, declarative prose. No "in today's fast-paced landscape", no tricolon padding, no sentence that could open any proposal for any client.
- Frame the plan by what it does, not what it lacks.
- Headlines sentence case. Card titles Title Case. Eyebrows are written normally; the page uppercases them.
- One KPI per tactic.
- Never fabricate statistics. Every figure comes from the intake, a cited public source (add it to "note"), or is labeled a KORTX projection with the caveat: historical benchmarks across more than $300M in managed media, with estimated variance of 10% to 15%.`;

/* Containers the AI composes custom sections from. Every page keeps the same hero, tab nav,
   section head (eyebrow, headline, intro), reveal motion and closing; only the containers change. */
export const CONTAINERS = [
  ['summary', 'Labeled stat or fact tiles. Numbers or short claims that lead.', '[{"k":"Budget","t":"$250,000 across four channels."}]', '3 to 5'],
  ['facts', 'Big-number tiles. One figure each.', '[{"label":"Reach","value":"4.2M","note":"Adults 25 to 54."}]', '2 to 4'],
  ['chart', 'Animated chart. bar = ranking or comparison, line = trend over time (up to 3 series), donut = parts of a whole.', '{"kind":"bar|line|donut","title":"","unit":"%|$|","labels":["Q1","Q2"],"series":[{"name":"","values":[12,18]}],"data":[{"label":"","value":40}]}', 'bar/donut use data (2 to 8); line uses labels + series'],
  ['map', 'US market map. Use for markets, DMAs, states or regions.', '{"title":"","markets":[{"state":"VA","label":"Richmond DMA","value":"38%","tone":"core|heavy|inc"}]}', '1 to 20 markets, state = USPS code'],
  ['alloc', 'Budget or channel mix bars. pct totals 100.', '[{"name":"CTV","pct":40,"note":""}]', '2 to 5'],
  ['timeline', 'Phases or milestones in order.', '[{"when":"Week 1","title":"Launch","body":"","on":true}]', '3 to 6'],
  ['flight', 'Flight plan grid: channels by week or month.', '{"cols":["Jan","Feb","Mar"],"rows":[{"name":"CTV","bars":[{"from":0,"to":2,"tone":"core|heavy|inc|mark","label":"$40K"}]}]}', 'cols 3 to 12, rows up to 10'],
  ['funnel', 'Funnel stages with the channels that serve them.', '[{"stage":"Awareness","channels":["CTV"],"role":""}]', '2 to 4'],
  ['steps', 'A short process, left to right.', '["Plan","Launch","Optimize","Report"]', '3 to 5, under 28 chars each'],
  ['tables', 'Comparison or plan table.', '[{"title":"","cols":["Option","Reach","Best for"],"grid":"1fr 1fr 1.4fr","rows":[["A","2M","Awareness"]]}]', '1 or 2 tables, up to 8 rows'],
  ['items', 'Cards: title + one supporting sentence. Use for pillars, tactics, audiences. Set the section field "coded": true (or a tone per card: cyan, violet, magenta, lime, amber, teal) when the source colour codes the cards, e.g. the KORTX Audience Engine trio. Put any source in "src", never inside body.', '[{"title":"","body":"","tone":"cyan","src":""}]', '3 is the default'],
  ['cases', 'Proof: results as headlines.', '[{"client":"","metric":"6.6x ROAS","metricLabel":"","title":"","body":""}]', '2 to 4, real KORTX results only'],
  ['lists', 'Labeled bullet groups.', '[{"title":"","items":[{"b":"Label:","t":"Sentence."}]}]', '1 to 3 groups'],
  ['details', 'Tabbed detail panel. v is one paragraph, OR an array of cards when the tab lists several points (each macro trend, consumer trend, opportunity or challenge becomes its own card with its source).', '[{"k":"Macro trends","v":[{"title":"Older cars","body":"Average vehicle age hit 12.8 years.","src":"S&P Global Mobility"}]}]', '3 to 6 tabs; 2 to 6 cards per tab'],
  ['layers', 'Stacked audience or data layers.', '[{"k":"First-Party","title":"","body":""}]', '2 to 4'],
  ['checklist', 'Audit or status checks: what was observed, missing or at risk.', '{"title":"","rows":[{"label":"Paid Social","status":"ok|no|warn","note":"Observed"}]}', '3 to 10 rows'],
  ['findings', 'Take-home statement: the three-part "What we found / What this could mean / How we would improve" panel, bold and colour coded, with an evidence chip. Use whenever the source has that triad (any order or wording) or any finding, implication, action set; it is the section key message, never drop it.', '{"title":"The take-home","found":"","mean":"","improve":"","evidence":"Verified","labels":["What we found","What this could mean","How we\'d improve"]}', 'all three parts, source wording word for word'],
  ['competitors', 'Competitor cards: one card per company with HQ, a Disclosed or Modeled chip, 2 to 6 stat tiles (Locations, Est. advertising, Est. digital, Stores added, …), a one line note and the source. Mark the client brand with self true.', '[{"name":"Discount Tire","hq":"Scottsdale","conf":"Modeled","self":false,"stats":[{"k":"Locations","v":"1,279"},{"k":"Est. advertising","v":"$32M to $58M"},{"k":"Est. digital","v":"$19M to $35M"}],"note":"Opened 45 stores in 2025, also owns Tire Rack.","src":"MTD 100, 2026"}]', '2 to 8; every fact from the source card'],
  ['mix', 'Stacked 100% share bars, one colourful bar per row (competitor, market, audience) split by channel, with legend, badge and note. Use for any "digital mix", channel split or share-of-spend table.', '{"title":"Digital mix","caption":"Share of digital spend by channel","badge":"Modeled · directional","channels":["Paid Search","Paid Social","Cross-Platform Display","Rich Media","Online Video","OTT/CTV","Streaming Audio","DOOH"],"rows":[{"label":"Discount Tire","values":[30,18,12,4,12,14,5,5]}],"note":""}', 'channels 2 to 10, rows 1 to 10, values in channel order'],
  ['score', 'Quality score: an animated gauge for the total plus one bar per category, the score ("12 of 25") and level on the right, a dashed KORTX ceiling behind each bar, and a finding per category shown on click. Use for any scored audit or readiness score.', '{"title":"KORTX Digital Advertising Quality Score","stamp":"Verified from public research · October 2026","total":56,"max":100,"tier":"Emerging","ceiling":85,"ceilingTier":"Strong","note":"","categories":[{"label":"Paid Media Presence","value":12,"max":25,"ceiling":22,"level":"","finding":""}]}', '3 to 6 categories; level optional (Limited, Emerging, Established, Strong; computed from the share when empty)'],
  ['widget', 'Custom interactive, built 1:1 when a source widget has no KORTX block (a calculator, quiz, configurator, timeline slider, hotspot image, flip cards, sortable list, anything). Write it as one self-contained HTML fragment: inline <style> and <script>, no external libraries, no network calls. KORTX look only: transparent background, Inter, white text, cards #070B15 with 1px rgba(255,255,255,.08) hairlines and 12 to 16px radius, cyan #00CCFF accent, violet #6D5EF0 second, lime #BEF264 tiny accents; pill buttons that lift 2px with a violet glow on hover; motion 200 to 600ms cubic-bezier(.16,1,.3,1), fade plus 12px rise, no bounce. Same behavior, steps, labels and copy as the source. House style rules apply to visible copy only, never to code. Fluid width (no fixed widths over 100%), stacks on phones, 14px minimum text, 44px tap targets.', '{"title":"","html":"<div>…</div><style>…</style><script>…</script>","height":480,"note":""}', 'one per section; height = expected px height on desktop'],
  ['process', 'Process explorer: clickable steps, one detail panel. Use to explain how something works, step by step.', '{"title":"","steps":[{"title":"Intelligence","body":"","points":[""]}]}', '3 to 7 steps, points 0 to 4'],
  ['builder', 'Drag and drop diagram: the viewer drags stages into order, then sees the full process. Use for a KORTX process the client should learn.', '{"title":"","prompt":"","stages":[{"title":"Plan","body":""}]}', '3 to 6 stages, written in the correct order'],
  ['benefits', 'Benefit cards with an image each (use uploaded image URLs; leave image empty for the KORTX glow tile). Use for what a service or creative offers.', '[{"title":"","body":"","tag":"","image":""}]', '4 to 6'],
  ['rings', 'Circle graph: animated percentage rings. Use for 1 to 4 shares, rates or scores out of 100. Optional ringsTitle.', '[{"label":"","value":72,"display":"72%","note":""}]', '1 to 4'],
  ['explore', 'Interactive chart: columns over time or categories, a metric switcher and a hover readout. Use when the same labels have 2+ metrics.', '{"title":"","unit":"","labels":["Wk 1","Wk 2"],"metrics":[{"name":"Impressions","values":[1200,1800],"unit":"","note":""}]}', 'labels 2 to 12, metrics 1 to 4'],
  ['orbit', 'Circle menu: items around a hub; selecting one shows its detail. Use for an ecosystem, a set of signals or capabilities around one idea.', '{"center":"KORTX","title":"","items":[{"label":"","title":"","body":""}]}', '3 to 8 items'],
  ['compare', 'Before and after toggle. Use for "today vs with KORTX" or two options.', '{"title":"","a":{"label":"Today","points":[""]},"b":{"label":"With KORTX","points":[""]}}', '3 to 6 points per side']
];
export const COMPOSE_RULES = `TABS ARE YOURS TO DECIDE: the strategist no longer picks tabs. Choose the tab set that best organises the material: the source's own tabs when it has them, otherwise 3 to 6 tabs named for what they hold (catalog keys and labels when they fit, custom {"key":"other","label":…} tabs otherwise). Skip any tab the material does not support.
RECREATE MODE (any uploaded HTML page): the generated page is the same page in KORTX form. Keep every brand, tab, sub-tab, section, heading, card, list item, figure and item set from the source, in the same order, with the source wording kept word for word (only fix dashes and the house-style rules). One KORTX section per source section; never merge, summarize, skip or reorder, and never add sections the source does not have beyond the hero, tab nav and closing. Replace each source widget with the closest KORTX container (gauge → score, rings → rings, carousel → personas or process, steps → process, toggles → compare, charts → chart or explore, accordion → details, ad sliders → the Multi-Ad Scrubber). When no KORTX container reproduces a source widget 1:1 (same controls, states and behavior), build it as a "widget" container instead: recreate its interaction exactly in the KORTX look. Never drop an interaction or flatten it into static copy. The FIT AND DEVICES limits give way to completeness here: split a long source section into consecutive sections rather than cutting copy.
SUB-TABS: a "SUB-SECTION SET" inside a TAB is a row of sub-tabs in the source. Keep it as sub-tabs: give every section that belongs to one sub-section "sub":"<sub-section label word for word>", in the source order, so the page shows the same sub-tab row (e.g. Audience → Audience Engine · Personas · Data strategy · Taxonomies). Never flatten sub-tabs into one long tab and never rename them.
SOURCE STRUCTURE WINS: when an attached source shows "SOURCE STRUCTURE" (its own tab names, or several brands each with its own tab set), mirror that information architecture exactly. Use custom tabs {"key":"other","label":"<source tab name>"}, {"key":"other-2",…} … in the source's order, and put catalog blocks (personas, taxonomies, dashboard…) or custom x- sections inside them with "tab":"<that key>". Several brands → reply {"meta":{shared hero},"brands":[{"name":"<brand>","meta":{"client":"<brand>"},"tabs":[…same tab labels…]}, …]} with every brand's own content; never merge brands or drop one. Tab labels and brand names come from the source, word for word.
FIT AND DEVICES: every section must read on one screen (about 900px tall on desktop). Keep card copy inside the limits, at most 4 cards per row and 6 per section, persona groups at most 4 rows each; split anything longer into two sections. Write so the page simplifies cleanly on tablet and phone: short labels, one idea per card, no tables wider than 5 columns.
PAGE STRUCTURE (identical on every page, never change): the hero (from meta), the tab nav (catalog tab keys and labels in catalog order, or the source's own tabs as above), every section head (eyebrow, headline, intro), the reveal motion and the closing. Only the containers inside sections change.

COMPOSING SECTIONS
- Uploaded files are the main input; the prompt steers. The material can be anything a seller wants to show a client (proposal, recap, case study, POV, market research, capabilities, comparison), not only a media plan. When it is not a media plan, skip catalog blocks that do not fit and compose custom sections instead.
- Visualize first: every figure, date, place, share, trend or comparison in the material becomes a chart, facts, map, timeline, flight, alloc, funnel or table. Prose-only sections are the exception.
- Work from whatever you were given: a prompt only, files only, or both. Uploaded Word, PDF and text files are the source of truth. An uploaded HTML page is content to restyle: keep its message, facts and order, rebuild it in these containers, never copy its colors, fonts or layout.
- Inside each tab, write the sections the material supports. Use a catalog block when its rule fits. Otherwise write a custom section: id "x-<short-slug>", type "composed", nav, eyebrow, headline, intro, then ONE or TWO containers from the CONTAINER LIBRARY, plus optional takeaway/takeawayLabel and note.
- Pick the container that shows the information best: figures lead as summary or facts tiles; trends over time are a line chart; parts of a whole are a donut or alloc; rankings are a bar chart; dates and phases are a timeline or flight; processes are steps or funnel; options side by side are tables; places are a map; audiences use the persona catalog block or items; proof is cases.
- Vary the rhythm: never the same container in two sections in a row. Prefer visual containers (chart, map, facts, timeline, funnel, alloc) over prose wherever the data allows.
- Never chart or map numbers you were not given. With no figures, use items, steps, lists or timeline.
- Skip a tab entirely when the material has nothing for it. The overview tab always has at least one section.
- Core catalog blocks are the default spine for a full media proposal; include one only when the material supports it.

COMMON INTAKE PATTERNS (KORTX Intelligence reads, audits, proofs of concept)
- Competitor profiles (one heading per competitor) → items, one card per competitor, or details tabs when each has a paragraph.
- Audits and tracking checks ("Observed / Not observable", ✓ lists) → checklist with ok / no / warn.
- Stepped methods ("Step 1 · Anchor", "Step 2 · Scale") → timeline, the step label in "when".
- Spend, share, store counts or ranked figures → chart bar (or facts for 2 to 4 headline numbers).
- Audience personas → the persona catalog block; taxonomy paths ("Lifestage › Family › Parents") → lists.
- Targeting and data tables (Category | Tactic | Detail) → tables; channel projections (impressions, clicks, CTR, spend) → dashboard, or tables plus a bar chart.
- The KORTX Audience Engine trio (Everything runs at once · Measured nightly · Winners earn more) → items, kept word for word.
- Dynamic creative rules or state maps (often an Excel sheet: state, trigger, headline, CTA) → tables of the states plus a map when the rules are geographic; describe the trigger logic in steps.
- Embedded ad units in an uploaded page are the brand's creative: point to them from the Creative tab; never rewrite ads as copy.
- Next steps → steps; thank-you lines go in the closing.
VISUALIZE CONTAINERS (interactive, for explainers and custom pages a seller builds to show anything)
- How a process works (phases, workflow, onboarding, "how we build it") → process; when the client should learn the order themselves → builder (drag and drop).
- What a service or creative offers (4 to 6 benefits, formats or capabilities, with or without images) → benefits; pass uploaded image URLs in "image".
- Percent shares, rates or scores out of 100 → rings (circle graph); trends with more than one metric over the same labels → explore (interactive chart).
- An ecosystem, a set of signals (temperature, time of day, dates, ZIP codes, languages) or services around one idea → orbit (circle menu).
- Today vs with KORTX, old way vs new way, option A vs B → compare.
- Use at most one interactive visualize container per section and never the same one in two sections in a row.

KORTX INTELLIGENCE READS (the house format sellers upload most: "KORTX Intelligence: <Brand> Digital Read / Audit / Growth Read", Dynamic Ads proofs of concept)
- Structure: mirror the SOURCE STRUCTURE markers. VIEW = a brand (own tab set) or a "Creative" view beside one brand (make it that brand's last tab). TAB = a page tab, same label. SUB-SECTION = one section inside that tab, in order. ITEM SET = one card, persona or variant per option, never dropped.
- Cover and "Reader's guide" (Verified · Inferred · Assumed) → meta (title "KORTX Intelligence", accent = the read name, client, agency) and each figure's confidence chip; never a section of its own.
- Market read (3 to 4 headline numbers with a source each) → facts, source in each note.
- Quality Score (a total plus 4 to 5 scored categories like "Paid Media Presence 12/25") → the score container: total, max, tier, ceiling and ceilingTier exactly as the source gives them, one category per scored row (label without the number, value, max, ceiling when the source shows one, finding = that category's detail line). Never invent a ceiling or tier the source did not give.
- Media mix audit, ordering or store path, tracking check (✓ / Observed / Not observable) → checklist; a numbered path → steps.
- Industry audit quads (Macro trends · Consumer trends · Opportunities · Challenges) → details, one tab each, and each tab's points as an array of cards (one card per trend, its source in src), never one run-on paragraph.
- "What we found / What this could mean / How we'd improve" (with "Evidence: …") → the findings container, every time it appears, word for word. It is the take-home of its section.
- Sources: every "Source: …" goes in that card's or stat's src field, never inside the sentence.
- Competitive set (one card per competitor: name, HQ, store count, ad spend, digital spend, Disclosed or Modeled, source) → the competitors container with every figure as a stat tile, client brand first with self true; "How we model undisclosed spend" Step 1 · 2 · 3 → timeline; "Digital mix" channel shares per competitor → the mix container (one stacked bar per competitor, the source's channel list and badge); "Disclosed / Modeled" labels → the confidence chip.
- "What this means for <brand>" (three bold lines) → items, word for word.
- Audience tab: Audience Engine trio → items word for word with "coded": true; Personas → the persona catalog block (each persona's fields grouped as Messaging · Media · Behavior · Psychographics, at most 4 rows per group); Data strategy (first-party, lookalikes, taxonomies; site actions like Page view · Button click · Form fill · Sign-up) → lists plus steps; Taxonomies per persona → lists, segment paths verbatim.
- Strategy / Media plan: budget shares → alloc (pct totals 100) or the plan table; "How the flight runs" phases → timeline or flight; "Measurement in Kampus" (KPIs, primary vs secondary site actions, nightly reporting) → facts plus checklist; illustrative figures keep their "Illustrative" label in the note.
- Creative view or tab: "What we build" formats (Rich Media and Banners · Video (OLV and CTV) · Dynamic Variants · Interactive Video · Social Display) → items; brand mocks and any embedded ads → the creative block (the Builder places the selected ads); Social Boost or AI video production → items or steps; never rewrite an ad as copy.
- Dynamic Ads proof of concept: Template · Data Feed · Rules · Reporting → items (four cards); Objective · Primary KPI · Rider/Customer benefit → facts; data source, creative, logic, delivery, reporting lines → lists; state logic (the attached Excel state map, or "Potential State Logic") → tables of conditions to creative states, plus the Dynamic selector interactive block when it is selected; the feed-condition ITEM SET (e.g. Always-On · Red Line: Delays …) → one row per state, kept word for word; "Proven in Market" → takeaway; roadmap → steps; "Thank You" → closing.
- Single scrolling pages ([SECTION] chapters, no tabs): group chapters into 3 to 6 tabs in order (e.g. Overview · Proof of Concept · Creative · Next Steps), chapter names as tab labels.`;
export function containerGuide() { return CONTAINERS.map(([k, use, shape, count]) => `- ${k}: ${use} Shape: ${shape}. Count: ${count}.`).join('\n'); }

export const PREFLIGHT = `PRE-FLIGHT CHECKS (media plans only; for other material leave "flags" empty unless something is missing or contradictory. Report each in "flags" before writing)
1. Is each KPI measurable with what is in scope? CTR needs a click destination; conversion metrics need a pixel.
2. Do the stated targeting sources exist? Modeled or lookalike audiences need a first-party seed. With no CRM and no pixel the plan is third-party only; never write "modeled" into it.
3. Does the arithmetic close? Channel budgets sum to the total. impressions = budget / rate * 1000 (rates stay internal). Percentage-fee tactics show "n/a" impressions and sit outside the total.
4. Every client-mandated inclusion and exclusion is present somewhere that survives. Any departure from the intake is flagged, never silent.
Flag levels: "risk" (blocks or changes the plan), "note" (worth telling the client), "ok" (confirmed).`;

export function buildProposalPrompt(i) {
  const catalog = BLOCKS.map(b => `- ${b.id} | tab: ${b.tab} | type: ${b.type} | ${b.use} | include when: ${b.when}`).join('\n');
  const lim = JSON.stringify(LIMITS);
  const creatives = (i.creatives || []).map(c => `- ${c.brand}: ${c.name || ''} (${c.product}; ${c.vertical || ''}; goals: ${(c.goals || []).join(', ')})`).join('\n');
  const assets = (i.assets || []).map(x => `- ${x.name} (${x.kind})`).join('\n');
  return `You are a KORTX media strategist writing a client proposal landing page. The page design is fixed; you only write its data. Inputs are CONTENT ONLY: an attached HTML page, deck or PDF tells you what to say (facts, numbers, offers, names), never how the page looks. Ignore its layout, section order, colors, fonts and components; choose blocks from the catalog that fit the content and write fresh copy inside each block's limits, so every page has the same KORTX look with content tailored to this client.

${HOUSE_RULES}

${PREFLIGHT}

${COMPOSE_RULES}

${LOVABLE_GUIDE}

BLOCK CATALOG (id | tab | type | Core/Optional/Conditional | rule)
${catalog}

CONTAINER LIBRARY (fields for custom "x-" sections)
${containerGuide()}

COPY LIMITS (chars, or [min, max] counts). Stay inside them so every proposal lays out the same:
${lim}

SPECIAL BLOCKS
- creative: write eyebrow, headline, intro and callout { title, body } only. The Builder fills the units from the selected creatives.
- dashboard: rows[{ channel, imps, ctr, vcr?, spend }] must reconcile with the plan table (same channels, same impressions, same spend). Use null for metrics a channel does not report. Clicks and totals are computed by the page.
- plan: columns exactly ["Tactic", "Targeting groups", "Budget", "Est. impressions", "Primary KPI"], last row is the Total. KPI cells are { "pill": "CTR", "tone": "high" }.
- personas: 2 or 3, parallel names with the generation in parentheses and ages only in "time"/"demo". Four groups (Messaging Theme with quote, Media Consumption, Behavioral Traits, Psychographics), four formats with icon snap | rich | video | display.

OUTPUT: reply with ONLY one JSON code block:
{"flags":[{"level":"risk|note|ok","text":""}],
 "meta":{"client":"","agency":"","type":"Media Proposal","concept":"Prepared for <agency>","title":"<client>","titleAccent":"<campaign>","support":"","pills":["<flight>","<budget> Total Investment","<geo>","<n> Channels · <n> Core Audiences"],"preparedFor":"","preparedBy":"KORTX Strategy & Media","date":"","period":"","galleryVertical":"<one of the Creative Playground verticals>"},
 "closing":{"eyebrow":"<campaign line, under 40 chars>","copy":"<one paragraph restating the strategy, under 260 chars>"},
 "tabs":[{"key":"<tab key from the catalog>","sections":[{ "id":"<block id>", "type":"<block type>", "nav":"<short nav label>", "eyebrow":"", "headline":"", "intro":"", ...type fields }]}]}

WORKED EXAMPLES (Virginia DMV, one per type). Match these shapes exactly:
${JSON.stringify(examples())}

BRIEF
Agency: ${i.agency || 'none'}
Brand: ${i.brand}
Brand URL: ${i.brandUrl || 'none'}
Selected creatives:
${creatives || '- none'}
Attached files (read them if you can see them):
${assets || '- none'}
Strategist brief, intake or RFP text:
"""${String(i.brief || '').slice(0, 30000)}"""${(() => { const r = relevantPages(i); return r ? '\n\n' + r : ''; })()}`;
}

export function parseProposal(text) {
  const t = String(text || '');
  const fenced = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : (t.match(/\{[\s\S]*\}/) || [''])[0];
  let out;
  try { out = JSON.parse(raw); } catch (e) { throw new Error('The reply is not valid JSON. Ask the AI to reply with only the JSON block, then paste again.'); }
  if (!out || !Array.isArray(out.tabs)) throw new Error('No "tabs" found. Make sure you pasted the whole reply.');
  return normalize(out);
}

/* Known catalog blocks keep their catalog tab and type; custom "x-" sections (AI-composed from
   CONTAINERS) keep the tab they were written under. Order inside a tab follows the AI. */
export const isCustom = id => /^x-[\w-]+$/.test(String(id || ''));
const CONTAINER_KEYS = CONTAINERS.map(c => c[0]);
/* Multi-brand pages: {"brands":[{"name","meta"?,"tabs":[…]}]} — each brand normalized on its own; the top level carries brand 1. */
export function normalize(out) {
  if (out && Array.isArray(out.brands) && out.brands.filter(b => b && Array.isArray(b.tabs)).length > 1) {
    const brands = out.brands.filter(b => b && Array.isArray(b.tabs)).map((b, i) => { const n = normalizeOne(Object.assign({}, out, { tabs: b.tabs, brands: undefined })); return { name: String(b.name || 'Brand ' + (i + 1)).slice(0, 40), meta: b.meta || null, tabs: n.tabs, unknown: n.unknown }; });
    const first = normalizeOne(Object.assign({}, out, { tabs: out.brands[0].tabs, brands: undefined }));
    return Object.assign(first, { brands: brands.map(({ unknown, ...b }) => b), unknown: [].concat(...brands.map(b => b.unknown)) });
  }
  return normalizeOne(out);
}
function normalizeOne(out) {
  const seen = {}, order = [];
  out.tabs.forEach(t => (t.sections || []).forEach(s => { if (!s || !s.id) return; if (!seen[s.id]) order.push(s.id); seen[s.id] = { s, tab: t.key }; }));
  const tabs = TABS.map(t => ({ key: t.key, label: t.label, sub: t.sub, sections: order.map(id => {
    const b = BLOCKS.find(x => x.id === id), hit = seen[id];
    if (b) return b.tab === t.key && !isOtherKey(hit.s.tab || hit.tab) ? Object.assign({}, hit.s, { id: b.id, type: b.type, nav: hit.s.nav || b.nav }) : null;
    if (isCustom(id) && (hit.s.tab || hit.tab) === t.key && CONTAINER_KEYS.some(k => hit.s[k] != null)) return Object.assign({}, hit.s, { type: 'composed', nav: hit.s.nav || hit.s.eyebrow || 'Section' });
    return null;
  }).filter(Boolean) })).concat((() => {
    /* Custom tabs the strategist named ("other", "other-2", …), in the order written. */
    const keys = []; order.forEach(id => { const k = seen[id].s.tab || seen[id].tab; if (isOtherKey(k) && !keys.includes(k)) keys.push(k); });
    out.tabs.forEach(t => { if (t && isOtherKey(t.key) && !keys.includes(t.key)) keys.push(t.key); });
    return keys.map(key => {
      const ot = out.tabs.find(t => t && t.key === key && t.label);
      /* Custom tabs (the source's own tab names) hold custom x- sections AND any catalog block written under them. */
      const secs = order.filter(id => (seen[id].s.tab || seen[id].tab) === key).map(id => { const s = seen[id].s, cb = BLOCKS.find(x => x.id === id);
        if (cb) return Object.assign({}, s, { id: cb.id, type: cb.type, nav: s.nav || cb.nav });
        return isCustom(id) && CONTAINER_KEYS.some(k => s[k] != null) ? Object.assign({}, s, { type: 'composed', nav: s.nav || s.eyebrow || 'Section' }) : null; }).filter(Boolean);
      const label = (ot && ot.label) || (out.otherLabels && out.otherLabels[key]) || (key === OTHER_KEY && out.otherLabel) || 'Other';
      return { key, label: String(label).slice(0, 32), sub: (ot && ot.sub) || '', sections: secs };
    });
  })()).filter(t => t.sections.length);
  return { flags: Array.isArray(out.flags) ? out.flags : [], meta: out.meta || {}, closing: out.closing || null, tabs, unknown: order.filter(id => !BLOCKS.some(b => b.id === id) && !isCustom(id)) };
}

/* Final page config for the Master Template: drops switched-off blocks, fills the creative
   deck from the selected creatives, and attaches the seller footer. */
/* Interactive blocks follow the Step 2 picks exactly: unpicked ones drop, picked ones Claude
   skipped are filled from the master. Content priority per field: strategist (Step 2 text boxes)
   over Claude's section.ix over the empty shape. ads = adUnit() list of the selected creatives. */
/* perKey (optional): { [blockKey]: ['vertical'|'wide', ...] } so rich media and video picks are independent. */
export function syncInteractive(cfg, picks, ixForm, ads, fmt, perKey) {
  if (!cfg || !Array.isArray(picks)) return cfg;
  ads = ads || []; ixForm = ixForm || {};
  const fl = Array.isArray(fmt) ? fmt : null;
  const ok = ixAllowed(picks, ads.length);
  const want = IX_BLOCKS.filter(x => ok.includes(x.key)).map(x => x.id);
  let tabs = cfg.tabs.map(t => Object.assign({}, t, { sections: t.sections.filter(s => !/--wide$/.test(s.id) && (!IX_IDS.includes(s.id) || want.includes(s.id))) }));
  const missing = want.filter(id => !tabs.some(t => t.sections.some(s => s.id === id)));
  if (missing.length) {
    let ct = tabs.find(t => t.key === 'creative');
    if (!ct) { const T = TABS.find(t => t.key === 'creative'); ct = { key: T.key, label: T.label, sub: T.sub, sections: [] }; tabs.push(ct); }
    missing.forEach(id => { const s = strip(findSec(id)); s.ix = {}; s.takeawayLabel = 'For ' + ((cfg.meta && cfg.meta.client) || 'your brand'); ct.sections.push(s); });
    const order = BLOCKS.map(b => b.id);
    ct.sections.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    tabs.sort((a, b) => TABS.findIndex(t => t.key === a.key) - TABS.findIndex(t => t.key === b.key));
  }
  tabs = tabs.map(t => Object.assign({}, t, { sections: t.sections.flatMap(s => {
    const b = ixById(s.id); if (!b) return [s];
    const f = ixForm[b.key] || {};
    const build = (A, F, id, suffix) => {
      let ix = fillEmpty(shapeIx(b.key, f, A), shapeIx(b.key, s.ix || {}, A));
      if (!f.trigger && s.ix && s.ix.trigger) ix = shapeIx(b.key, Object.assign({}, ix, { trigger: s.ix.trigger }), A);
      if (b.key === 'dynamic') ix = withPresets(ix);
      return Object.assign({}, s, { id, nav: suffix ? (s.nav || b.label) + suffix : s.nav, interactive: b.key, ix, ixAds: A, ixFormat: F || (A.length && A.every(a => a.fmt === 'wide') ? 'wide' : 'vertical'), headline: f.headline || s.headline, intro: f.intro || s.intro });
    };
    const pk = perKey && Array.isArray(perKey[b.key]) && perKey[b.key].length ? perKey[b.key] : null;
    if (pk) {
      if (pk.length === 1) { const A = ads.filter(a => a.fmt === pk[0]); return [build(A.length ? A : ads, pk[0], s.id, '')]; }
      return pk.map(F => ({ F, A: ads.filter(a => a.fmt === F) })).map(g => build(g.A.length ? g.A : ads, g.F, g.F === 'wide' ? s.id + '--wide' : s.id, g.F === 'wide' ? ' · Video' : ' · Rich Media'));
    }
    if (!fl || fl.length < 2) return [build(ads, fl ? fl[0] : fmt, s.id, '')];
    /* Both mocks: one block per format, the video copy right after the rich media one. */
    return fl.map(F => ({ F, A: ads.filter(a => a.fmt === F) })).filter(g => g.A.length >= (b.min || 1))
      .map(g => build(g.A, g.F, g.F === 'wide' ? s.id + '--wide' : s.id, g.F === 'wide' ? ' · Video' : ' · Rich Media'));
  }) }));
  return Object.assign({}, cfg, { tabs: tabs.filter(t => t.sections.length) });
}

/* After Claude writes or updates the proposal: copy its interactive text into the Step 2 boxes
   wherever the strategist left them empty. */
export function harvestIx(cfg, ixForm, picks, ads) {
  const out = Object.assign({}, ixForm || {});
  (cfg && cfg.tabs || []).forEach(t => t.sections.forEach(s => {
    const b = ixById(s.id); if (!b || !(picks || []).includes(b.key)) return;
    const cur = shapeIx(b.key, out[b.key] || {}, ads || []);
    const ai = shapeIx(b.key, Object.assign({}, s.ix || {}, { headline: s.headline || '', intro: s.intro || '' }), ads || []);
    out[b.key] = fillEmpty(Object.assign({}, cur, { trigger: (out[b.key] && out[b.key].trigger) || ai.trigger }), ai);
  }));
  return out;
}

/* One-block auto-fill: the Step 2 "Auto-fill with AI" button. Reply is one JSON object. */
export function ixAutofillPrompt(key, i, current) {
  const b = ixByKey(key), ads = (i.ads || []).map(a => `- ad "${a.key}": ${a.brand} · ${a.name} (${a.product || ''}; ${a.fmt === 'wide' ? '1920x1080' : '300x600'})`).join('\n');
  return `You write copy for one interactive block on a KORTX proposal landing page.
${HOUSE_RULES}

${IX_SPEC}

BLOCK: ${b.id} (${b.label})
Client: ${i.brand || 'not set'} · Agency: ${i.agency || 'not set'} · Brand URL: ${i.brandUrl || 'not set'}
Selected ads (one row per ad, same order):
${ads || '- none'}
${i.briefText ? '\nCAMPAIGN BRIEF:\n' + String(i.briefText).slice(0, 30000) : ''}

CURRENT VALUES (keep every non-empty value exactly; fill only the empty ones):
${JSON.stringify(current)}

Reply with ONE \`\`\`json code block and nothing else: {"headline":"section headline <= 60","intro":"section intro <= 280", ...the ${b.id} fields above}. Keep the "ad" keys exactly.`;
}

/* Pages built before their creatives exist may lack the ad deck: put the master's deck back on the Creative tab. */
export function ensureCreativeDeck(cfg) {
  if (!cfg || cfg.tabs.some(t => t.sections.some(s => s.id === 'creative'))) return cfg;
  const tabs = cfg.tabs.slice(); let i = tabs.findIndex(t => t.key === 'creative');
  if (i < 0) { const T = TABS.find(t => t.key === 'creative'); tabs.push({ key: T.key, label: T.label, sub: T.sub, sections: [] }); i = tabs.length - 1; }
  tabs[i] = Object.assign({}, tabs[i], { sections: [strip(findSec('creative'))].concat(tabs[i].sections) });
  tabs.sort((a, b) => TABS.findIndex(t => t.key === a.key) - TABS.findIndex(t => t.key === b.key));
  return Object.assign({}, cfg, { tabs });
}

export function assemble(cfg, opts = {}) {
  if (cfg && Array.isArray(cfg.brands) && cfg.brands.length > 1) {
    /* Each brand runs through the same pipeline; brand 1 also uses the top-level (synced) tabs. */
    const one = (tabs, i) => assembleOne(Object.assign({}, cfg, { tabs, brands: undefined }), i === 0 ? opts : Object.assign({}, opts, { interactive: [] }));
    const top = assembleOne(Object.assign({}, cfg, { brands: undefined }), opts);
    return Object.assign(top, { brands: cfg.brands.map((b, i) => ({ name: b.name, meta: b.meta || undefined, tabs: i === 0 ? top.tabs : one(b.tabs, i).tabs })) });
  }
  return assembleOne(cfg, opts);
}
function assembleOne(cfg, { creatives = [], seller = null, off = {}, interactive = null, ixForm = null, mock = 'rich', tabPicks = null, ixFmts = null } = {}) {
  cfg = applyTabs(cfg, tabPicks);
  cfg = syncInteractive(cfg, interactive, ixForm, ixAdsFor(creatives.map(adUnit), mock), ixFmtArg(mock), ixFmts);
  const tabs = cfg.tabs.map(t => Object.assign({}, t, { sections: t.sections.filter(s => !off[s.id]).map(s => {
    if (s.type !== 'creative') return s;
    /* fmt sizes the deck card (300×600 or 1920×1080); kind picks the preview: Celtra renders the bare ad, Captivate is cropped from its share page. */
    return Object.assign({}, s, { dayparts: creatives.map(c => { if (c.source === 'html') { const wide = c.format === 'wide'; return { key: c.key || c.id, fmt: wide ? 'wide' : 'vertical', kind: 'html', html: c.html || '', url: c.url || '', w: c.w || 0, h: c.h || 0, name: (c.product || 'Mock') + ' · ' + (c.w && c.h ? c.w + '×' + c.h : (wide ? '1920×1080' : '300×600')), time: c.brand, img: '', live: '', headline: c.name || c.brand, concept: c.bestFor || '' }; } const wide = c.format === 'wide', celtra = !!c.celtraId && c.source !== 'zip', zip = c.source === 'zip' && !!c.zipKey; return { key: c.id, fmt: wide ? 'wide' : 'vertical', kind: zip ? 'zip' : celtra ? 'celtra' : 'captivate', zipKey: zip ? c.zipKey : '', celtraId: c.celtraId || '', capId: (celtra || zip) ? '' : c.id, name: c.product + (wide ? ' · 1920×1080' : ' · 300×600'), time: c.brand, img: c.thumb || '', live: (celtra || zip) ? '' : 'https://captivate.kortx.io/shareablePreview/' + c.id, headline: c.name || c.brand, concept: c.bestFor || '' }; }) });
  }) })).filter(t => t.sections.length);
  const close = cfg.closing || {};
  const sel = Object.assign({}, seller || {}, close.eyebrow ? { eyebrow: close.eyebrow } : {}, close.copy ? { contactCopy: close.copy } : {});
  return { template: TEMPLATE_ID, meta: cfg.meta, tabs, seller: Object.keys(sel).length ? sel : undefined };
}

/* ---------- QA: the qa_check.py rules plus schema, limits and arithmetic ---------- */
/* Taxonomy items ({ pre, b }) are platform segment names, reproduced exactly, so house punctuation rules skip them. */
const textOf = v => v && typeof v === 'object' && !Array.isArray(v) && 'pre' in v ? textOf(v.t || '') : typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(textOf) : v && typeof v === 'object' ? Object.keys(v).filter(k => !['id', 'type', 'tone', 'kind', 'icon', 'img', 'slot', 'src', 'live', 'key', 'ratio', 'grid', 'start', 'image'].includes(k)).flatMap(k => textOf(v[k])) : [];
const money = v => { const m = String(v || '').match(/\$([\d,]+)/); return m ? Number(m[1].replace(/,/g, '')) : null; };
const intval = v => { const m = String(v || '').replace(/,/g, '').match(/^\d+$/); return m ? Number(m[0]) : null; };

export function qa(cfg, off = {}) {
  const out = [], add = (level, block, msg) => out.push({ level, block, msg });
  const secs = []; cfg.tabs.forEach(t => t.sections.forEach(s => { if (!off[s.id]) secs.push(s); }));
  const ids = secs.map(s => s.id);
  const keepTabs = tabKeys(cfg.tabPicks);
  const ownTabs = cfg.tabs.length && cfg.tabs.every(t => isOtherKey(t.key));
  if (!ownTabs) CORE_IDS.forEach(id => { const b = BLOCKS.find(x => x.id === id); if (keepTabs.includes(b.tab) && !ids.includes(id)) add('fail', id, 'Core block missing.'); });
  (cfg.unknown || []).forEach(id => add('warn', id, 'Unknown block id was dropped.'));

  const all = [['meta', cfg.meta]].concat(secs.map(s => [s.id, s]));
  all.forEach(([id, obj]) => {
    const txt = textOf(obj).join('  ');
    const rules = [[/\u2014/, 'Em dash'], [/\u2013/, 'En dash'], [/~/, 'Tilde as approximation'], [/(^|\s)--(\s|$)/, 'Double hyphen'], [/\s-\s/, 'Hyphen used as punctuation'],
      [/\bTrade Desk\b/i, 'DSP named in copy. Use "our platform"'], [/geo-?fenc/i, '"Geo-fenced". House style is "geo-targeted"'], [/\bCPMs?\b/, 'CPM in client copy'], [/\d+%\s*(management\s*)?fee/i, 'Fee percentage in client copy']];
    rules.forEach(([re, label]) => { const m = txt.match(re); if (m) add('fail', id, label + ': "…' + txt.slice(Math.max(0, m.index - 30), m.index + 30).trim() + '…"'); });
    if (/fast-paced|leverage synerg|best-in-class/i.test(txt)) add('warn', id, 'Filler phrase. Rewrite with a specific claim.');
  });
  const everything = all.map(([, o]) => textOf(o).join(' ')).join(' ');
  if (/\bmodel(ed|ing|led)\b/i.test(everything) && /no (first-party|1P|CRM|pixel)/i.test(everything)) add('warn', 'audience', 'Copy claims modeled audiences while also stating no first-party data. Modeling needs a seed.');

  const len = (id, field, v, max) => { if (typeof v === 'string' && v.length > max) add('warn', id, field + ' is ' + v.length + ' chars (limit ' + max + ').'); };
  const cnt = (id, field, arr, [a, b]) => { if (Array.isArray(arr) && (arr.length < a || arr.length > b)) add('warn', id, field + ' has ' + arr.length + ' (expected ' + (a === b ? a : a + ' to ' + b) + ').'); };
  const L = LIMITS;
  cnt('meta', 'Hero pills', cfg.meta && cfg.meta.pills, L.pills.count);
  secs.forEach(s => {
    Object.keys(L.common).forEach(k => len(s.id, k, s[k], L.common[k]));
    if (s.summary) { cnt(s.id, 'Summary cards', s.summary, L.summary.count); s.summary.forEach(x => { len(s.id, 'Summary k', x.k, L.summary.k); len(s.id, 'Summary t', x.t, L.summary.t); }); }
    if (s.facts) { cnt(s.id, 'Stat cards', s.facts, L.facts.count); s.facts.forEach(x => { len(s.id, 'Stat value', x.value, L.facts.value); len(s.id, 'Stat note', x.note, L.facts.note); }); }
    if (s.cases) { cnt(s.id, 'Case cards', s.cases, L.cases.count); s.cases.forEach(x => { len(s.id, 'Case metric', x.metric, L.cases.metric); len(s.id, 'Case body', x.body, L.cases.body); }); }
    if (s.items) { cnt(s.id, 'Cards', s.items, L.items.count); s.items.forEach(x => { len(s.id, 'Card title', x.title, L.items.title); len(s.id, 'Card body', x.body, L.items.body); }); }
    if (s.details) { cnt(s.id, 'Detail tabs', s.details, L.details.count); s.details.forEach(x => len(s.id, 'Detail text', x.v, L.details.v)); }
    if (s.lists) { cnt(s.id, 'List cards', s.lists, L.lists.count); s.lists.forEach(l => { cnt(s.id, 'List "' + l.title + '" items', l.items, L.lists.itemCount); (l.items || []).forEach(x => len(s.id, 'List item', x.t, L.lists.t)); }); }
    if (s.steps) { cnt(s.id, 'Steps', s.steps, L.steps.count); s.steps.forEach(x => len(s.id, 'Step', x, L.steps.each)); }
    if (s.personas) cnt(s.id, 'Personas', s.personas, L.personas.count);
    if (s.alloc) { cnt(s.id, 'Allocation rows', s.alloc, L.alloc.count); const sum = s.alloc.reduce((a, x) => a + (+x.pct || 0), 0); if (sum !== 100) add('fail', s.id, 'Allocation totals ' + sum + '%, not 100%.'); }
    if (s.subAlloc) { const sum = s.subAlloc.reduce((a, x) => a + (+x.pct || 0), 0); if (sum !== 100) add('fail', s.id, 'Sub-allocation totals ' + sum + '%, not 100%.'); }
    if (s.funnel) { cnt(s.id, 'Funnel stages', s.funnel, L.funnel.count); s.funnel.forEach(x => len(s.id, 'Funnel role', x.role, L.funnel.role)); }
    if (s.platforms) { cnt(s.id, 'Platform cards', s.platforms, L.platforms.count); s.platforms.forEach(p => { len(s.id, 'Platform tag', p.tag, L.platforms.tag); (p.bullets || []).forEach(b => len(s.id, 'Platform bullet', b, L.platforms.bullet)); }); }
    if (s.approach) cnt(s.id, 'Approach items', s.approach, L.approach.count);
    if (s.layers) cnt(s.id, 'Data-source tiles', s.layers, L.layers.count);
    if (s.anatomy) cnt(s.id, 'Callouts', s.anatomy.callouts, L.callouts.count);
    if (s.timeline) { cnt(s.id, 'Timeline steps', s.timeline, L.timeline.count); s.timeline.forEach(x => len(s.id, 'Timeline body', x.body, L.timeline.body)); }
  });

  /* Arithmetic: the plan table closes, and the dashboard and hero agree with it. */
  const plan = secs.find(s => s.id === 'plan'), t = plan && plan.tables && plan.tables[0];
  if (t && t.rows && t.rows.length > 1) {
    const bi = t.cols.findIndex(c => /budget/i.test(c)), ii = t.cols.findIndex(c => /impression/i.test(c));
    if (t.cols.some(c => /rate|cpm/i.test(c))) add('fail', 'plan', 'Rate column in the client plan table. Rates stay internal.');
    const body = t.rows.slice(0, -1), total = t.rows[t.rows.length - 1];
    if (bi >= 0) { const sum = body.reduce((a, r) => a + (money(r[bi]) || 0), 0), tot = money(total[bi]); if (tot != null && sum !== tot) add('fail', 'plan', 'Channel budgets sum to $' + sum.toLocaleString() + ' but the total says $' + tot.toLocaleString() + '.'); }
    if (ii >= 0) { const sum = body.reduce((a, r) => a + (intval(r[ii]) || 0), 0), tot = intval(total[ii]); if (tot != null && sum !== tot) add('fail', 'plan', 'Impressions sum to ' + sum.toLocaleString() + ' but the total says ' + tot.toLocaleString() + '.'); }
    const dash = secs.find(s => s.type === 'dashboard');
    if (dash && dash.dashboard && bi >= 0) { const ds = dash.dashboard.rows.reduce((a, r) => a + (r.spend || 0), 0), tot = money(total[bi]); if (tot != null && ds !== tot) add('fail', dash.id, 'Dashboard spend $' + ds.toLocaleString() + ' does not match the plan total $' + tot.toLocaleString() + '.'); }
    if (dash && dash.dashboard && ii >= 0) { const di = dash.dashboard.rows.reduce((a, r) => a + (r.imps || 0), 0), tot = intval(total[ii]); if (tot != null && di !== tot) add('fail', dash.id, 'Dashboard impressions ' + di.toLocaleString() + ' do not match the plan total ' + tot.toLocaleString() + '.'); }
  }
  const ord = { fail: 0, warn: 1 };
  return out.sort((a, b) => ord[a.level] - ord[b.level]);
}

/* Offline demo: the Virginia DMV master, run through the same normalize path. */
export function demoConfig() {
  return normalize({ flags: [{ level: 'note', text: 'Demo output: the Virginia DMV master example, not written from your brief.' }], meta: Object.assign({}, master.meta), closing: { eyebrow: master.seller.eyebrow, copy: master.seller.contactCopy }, tabs: master.tabs });
}

/* ---------- Conversational mode (Company API chat in the Builder) ---------- */
export const CHAT_PROTOCOL = `CONVERSATION PROTOCOL
You are chatting with a KORTX strategist inside the Proposal Builder. Their messages may include the intake, RFP, media plan or brief as attached PDFs or images, or as text extracted from a Word file. A brief uploaded in Page Details appears under CAMPAIGN BRIEF in the Builder context; treat it as the intake. When a complete brief is present, write the proposal on the first request without asking again for what it already answers.
1. When asked to write the page, write it from whatever exists: a prompt alone, files alone, or both. Do not stop to ask for missing details; leave out what you were not given and list the gaps as "note" flags. Ask a question instead of writing only when there is nothing at all to build from.
2. When you have enough, reply with ONE short line (under 120 characters), then ONE \`\`\`json code block containing the full proposal object (flags, meta, closing, tabs) exactly as specified above.
3. After a proposal exists, the CURRENT PROPOSAL below is the source of truth (the strategist may have edited it by hand). For change requests and comments (a message starting "Comment on" is always a change request: never answer it with a question) reply with ONE short line (under 120 characters) saying what changed, then ONE \`\`\`json block shaped {"update":{"sections":[ full replacement section objects, each with its id and type; a new custom section also carries "tab": "<tab key>" ],"remove":[ block ids ],"meta":{ only changed fields },"closing":{ only changed fields },"flags":[ only if they changed ]}}. Send only what changed.
4. Questions about the plan get a one or two line plain-language answer and no JSON.
5. Plain text only outside code blocks: short paragraphs and simple numbered or dashed lists. No markdown headings, tables or bold.`;

export function chatSystemStatic() {
  const catalog = BLOCKS.map(b => `- ${b.id} | tab: ${b.tab} | type: ${b.type} | ${b.use} | include when: ${b.when}`).join('\n');
  return `You are a KORTX strategist and information designer. Sales and strategy teams give you whatever they have (proposals, decks, recaps, research, data, an HTML page, images, or just a prompt) and you turn it into an interactive, animated KORTX landing page for a client. The page design is fixed; you only write its data. Inputs are CONTENT ONLY: an attached HTML page, deck or PDF tells you what to say (facts, numbers, offers, names), never how the page looks. Ignore its layout, section order, colors, fonts and components; choose blocks from the catalog that fit the content and write fresh copy inside each block's limits, so every page has the same KORTX look with content tailored to this client.

${HOUSE_RULES}

${PREFLIGHT}

${COMPOSE_RULES}

${LOVABLE_GUIDE}

BLOCK CATALOG (id | tab | type | Core/Optional/Conditional | rule)
${catalog}

CONTAINER LIBRARY (fields for custom "x-" sections)
${containerGuide()}

COPY LIMITS (chars, or [min, max] counts):
${JSON.stringify(LIMITS)}

SPECIAL BLOCKS
- creative: write eyebrow, headline, intro and callout { title, body } only. The Builder fills the units from the selected creatives.
- dashboard: rows[{ channel, imps, ctr, vcr?, spend }] reconcile with the plan table. Use null for metrics a channel does not report.
- plan: columns exactly ["Tactic", "Targeting groups", "Budget", "Est. impressions", "Primary KPI"], last row Total, KPI cells { "pill": "CTR", "tone": "high" }. No rate column.
- personas: 2 or 3, parallel names, generation in parentheses, ages only in time/demo. Four groups and four formats (icon snap | rich | video | display).
- interactive (ixDynamic, ixScrubber, ixBuilder): interactive blocks rebuilt around the strategist's selected ads (listed with their keys in the Builder context). Include EXACTLY the ones listed under "Interactive blocks selected", never others. Write eyebrow, headline, intro, takeaway (how this brand would use the capability in this plan) with takeawayLabel "For <client>", and the "ix" object below. The strategist's Step 2 values (STRATEGIST INTERACTIVE TEXT) are kept verbatim; fill only empty fields. Signals in scope for the Dynamic selector: temperature, time of day, dates, ZIP codes, languages; use the trigger the strategist picked.
${IX_SPEC}

FULL PROPOSAL OBJECT
{"flags":[{"level":"risk|note|ok","text":""}],"meta":{"client":"","agency":"","type":"Media Proposal","concept":"Prepared for <agency>","title":"<client>","titleAccent":"<campaign>","support":"","pills":["","","",""],"preparedFor":"","preparedBy":"KORTX Strategy & Media","date":"","period":"","galleryVertical":""},"closing":{"eyebrow":"","copy":""},"tabs":[{"key":"<tab key>","sections":[{"id":"","type":"","nav":"","eyebrow":"","headline":"","intro":"", "...type fields":""}]}]}

WORKED EXAMPLES (Virginia DMV, one per type):
${JSON.stringify(examples())}

${CHAT_PROTOCOL}`;
}

/* Ad markup and unit lists are rebuilt by the Builder: never resent to the AI. */
const stripHeavy = s => { if (!s || typeof s !== 'object') return s; const o = Object.assign({}, s); if (o.ixAds) o.ixAds = o.ixAds.map(a => a.key); if (o.dayparts) delete o.dayparts; return o; };
export function chatContext(i, cfg, off) {
  const creatives = (i.creatives || []).map(c => `- ${c.brand}: ${c.name || ''} (${c.product}; ${c.vertical || ''}; goals: ${(c.goals || []).join(', ')})`).join('\n');
  let t = `BUILDER CONTEXT
Tabs to include: ${tabKeys(i.tabs).map(k => TABS.find(t => t.key === k).label + ' (' + k + ')').join(', ')}${(() => { const list = (Array.isArray(i.otherTabs) ? i.otherTabs : (i.otherTab ? [i.otherTab] : [])).map(x => String(x || '').trim()).filter(Boolean); return list.length ? ', plus ' + list.length + ' custom tab' + (list.length > 1 ? 's' : '') + ' at the end, in this order: ' + list.map((l, n) => '{"key":"' + (n ? 'other-' + (n + 1) : 'other') + '","label":"' + l.replace(/"/g, "'").slice(0, 32) + '"}').join(', ') + '. Each custom tab holds only custom x- sections about its topic' : ''; })()}. Write blocks ONLY for these tabs, Core blocks included; leave every other tab out of the JSON entirely. EXCEPTION: when an attached source has a SOURCE STRUCTURE, mirror its tabs (and brands) instead of this list.
Agency: ${i.agency || 'not set'}
Brand: ${i.brand || 'not set'}
Page title: ${i.title ? i.title + ' (use it verbatim as meta.title; leave meta.titleAccent empty)' : 'not set'}
Brand URL: ${i.brandUrl || 'not set'}
Selected creatives:
${creatives || '- none yet'}
Interactive blocks selected: ${(i.interactive || []).length ? IX_BLOCKS.filter(x => i.interactive.includes(x.key)).map(x => x.id + ' (' + x.label + ')').join(', ') : 'none (do not include any interactive block)'}
Mock type: ${(MOCKS.find(m => m.id === i.mock) || MOCKS[0]).label} (${(MOCKS.find(m => m.id === i.mock) || MOCKS[0]).note}); interactive blocks are built for this format only.
Ads for the interactive blocks (key: brand · name · format):
${(i.ads || []).map(a => `- ${a.key}: ${a.brand} · ${a.name} · ${a.fmt === 'wide' ? '1920x1080' : '300x600'}`).join('\n') || '- none'}${(i.interactive || []).length ? '\nSTRATEGIST INTERACTIVE TEXT (keep non-empty values verbatim):\n' + JSON.stringify(i.ixForm || {}) : ''}`;
  if (i.briefText) t += `\n\nCAMPAIGN BRIEF (uploaded file: ${i.briefName || 'brief'}):\n${String(i.briefText).slice(0, 60000)}`;
  else if (i.briefName) t += `\n\nCAMPAIGN BRIEF: ${i.briefName} is attached to the conversation as a PDF.`;
  if (cfg) {
    const offIds = Object.keys(off || {}).filter(k => off[k]);
    t += `\n\nCURRENT PROPOSAL (source of truth${offIds.length ? '; switched off by the strategist: ' + offIds.join(', ') : ''}):\n` + JSON.stringify(Object.assign({ flags: cfg.flags, meta: cfg.meta, closing: cfg.closing, tabs: cfg.tabs.map(tb => ({ key: tb.key, label: tb.label, sections: tb.sections.map(stripHeavy) })) }, Array.isArray(cfg.brands) && cfg.brands.length > 1 ? { brands: cfg.brands.map((b, i) => ({ name: b.name, tabs: i === 0 ? '(same as tabs above)' : b.tabs.map(tb => ({ key: tb.key, label: tb.label, sections: tb.sections.map(stripHeavy) })) })), brandNote: 'Multi-brand page: an update edits ONE brand; add "brand":"<brand name>" to the update object (default brand 1).' } : {}));
  } else { t += '\n\nNo proposal has been written yet.'; const r = relevantPages(i); if (r) t += '\n\n' + r; }
  return t;
}

/* Long JSON replies are not resent in the history; the system prompt carries the current version. */
export function squashForHistory(text) {
  return String(text || '').replace(/```(?:json)?[\s\S]*?(```|$)/gi, '[JSON delivered. The current version is in the system prompt.]');
}

/* Splits a reply into display text and a parsed JSON payload (if any). */
export function readReply(text) {
  const t = String(text || '');
  const i = t.search(/```(?:json)?/i);
  if (i < 0) return { display: t.trim(), json: null, partial: false };
  const display = t.slice(0, i).trim();
  const m = t.slice(i).match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (!m) return { display, json: null, partial: true };
  try { return { display, json: JSON.parse(m[1]), partial: false, after: t.slice(i + m[0].length).trim() }; }
  catch (e) { return { display, json: null, partial: false, error: 'The JSON in this reply did not parse.' }; }
}

/* Applies an {update} reply to the current config. */
export function applyUpdate(cfg, up) {
  if (cfg && Array.isArray(cfg.brands) && cfg.brands.length > 1) {
    /* "brand": name or 1-based index; default brand 1. */
    const want = up.brand, bi = Math.max(0, typeof want === 'number' ? want - 1 : cfg.brands.findIndex(b => String(b.name).toLowerCase() === String(want || '').toLowerCase()));
    const b = cfg.brands[bi] || cfg.brands[0], r = applyUpdateOne(Object.assign({}, cfg, { tabs: bi === 0 ? cfg.tabs : b.tabs, brands: undefined }), up);
    const brands = cfg.brands.map((x, i) => i === bi ? Object.assign({}, x, { tabs: r.config.tabs }) : x);
    return { config: Object.assign({}, bi === 0 ? r.config : Object.assign({}, cfg, { meta: r.config.meta, closing: r.config.closing, flags: r.config.flags }), { brands }), changed: r.changed.map(c => (bi ? b.name + ' · ' : '') + c) };
  }
  return applyUpdateOne(cfg, up);
}
function applyUpdateOne(cfg, up) {
  const byId = {};
  cfg.tabs.forEach(t => t.sections.forEach(s => { byId[s.id] = Object.assign({ tab: t.key }, s); }));
  (up.remove || []).forEach(id => { delete byId[id]; });
  /* "--wide" copies (video version of an interactive block) edit their base block. */
  (up.sections || []).forEach(s => { if (!s || !s.id) return; const id = String(s.id).replace(/--wide$/, ''); if (BLOCKS.some(b => b.id === id) || isCustom(id) || byId[id]) byId[id] = Object.assign({}, byId[id] || {}, s, { id }); });
  const otherLabels = {}; cfg.tabs.forEach(t => { if (isOtherKey(t.key)) otherLabels[t.key] = t.label; });
  const next = normalize({ otherLabels, flags: up.flags || cfg.flags, meta: Object.assign({}, cfg.meta, up.meta || {}), closing: Object.assign({}, cfg.closing || {}, up.closing || {}), tabs: [{ key: 'all', sections: Object.values(byId) }] });
  return { config: next, changed: (up.sections || []).map(s => s.id).concat((up.remove || []).map(id => '−' + id)) };
}
