/* ------------------------------------------------------------------
   KORTX Creative Gallery — DATA LAYER
   The only file that knows where creative metadata comes from.
   Swap SOURCE.url to a published Google Sheet CSV (File > Share >
   Publish to web > CSV) or any endpoint returning the same columns,
   and the gallery updates with no UI changes.
   Columns: ID | Active | Brand | Campaign | Creative Type | Vertical |
            Components | Creative ID | Description | Featured | Sort Order

   Creative ID is the Celtra creative hash (the "dc3bbed9" in a preview tag).
   A row may instead carry a Preview URL (a Captivate shareablePreview link),
   which falls back to the cropped-share-page path below.
-------------------------------------------------------------------*/

export const SOURCE = {
  url: null,            // e.g. 'https://docs.google.com/.../pub?output=csv'
  delimiter: null       // auto-detected: ',' or '|'
};

/* The verticals KORTX publishes, taken from the Creative Examples workbook tabs
   (format and campaign-type tabs excluded). Every one shows as a filter pill
   whether or not the current sheet has a row for it. */
export const VERTICALS = [
  'Agriculture',
  'Automotive',
  'B2B',
  'Consumer Services',
  'CPG',
  'Dining and QSR',
  'Education',
  'Financial Services',
  'Government & Non-Profit',
  'Healthcare',
  'Home Services',
  'Hospitality & Entertainment',
  'Lottery',
  'Pharma/Biotech',
  'Retail',
  'Senior Living',
  'Sports',
  'Tech & Telecom',
  'Travel & Tourism'
];

/* The interactive components KORTX builds. Canonical, alphabetical, and shown
   in full whether or not the current sheet has a creative using each one. */
export const COMPONENTS = [
  '3D', '360 Video', 'App Download', 'Audio', 'Carousel', 'Color Picker',
  'Countdown', 'Custom Animation', 'Custom Code', 'Drag and Drop', 'Dynamic',
  'Flip Card', 'Form Fill', 'GIF', 'Image Sequencer', 'Interactive Games',
  'Inventory', 'Maps', 'Nearby', 'Overlay', 'Pop Up Window', 'QR Code', 'Quiz',
  'Scratch Off', 'Scrolling Disclaimers', 'Slider', 'Tap to Call', 'Trigger',
  'Video', 'Weather FX'
];

/* Presentation formats — the only two the system supports. */
export const FORMATS = {
  vertical:   { w: 300,  h: 600,  label: '300 × 600', ratio: '300 / 600' },
  cinematic:  { w: 1920, h: 1080, label: '1920 × 1080', ratio: '1920 / 1080' }
};

/* --- Celtra preview tag ---------------------------------------------------
   The Celtra preview script renders the creative at its own native size with no
   surrounding page, so a creative ID needs no cropping and no calibration: the
   ad IS the document. Each preview runs in its own sandboxed srcdoc iframe so
   the injected script can never touch the gallery.
-------------------------------------------------------------------------- */
export function celtraDoc(creativeId, w, h) {
  const params = {
    clickUrl: '', expandDirection: 'undefined', preferredClickThroughWindow: 'new',
    clickEvent: 'advertiser', externalAdServer: 'Custom',
    tagVersion: 'html-standard-7', purpose: 'preview'
  };
  return '<!DOCTYPE html><html><head><meta charset="utf-8">' +
    '<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}' +
    '.celtra-ad-v3{width:' + w + 'px;height:' + h + 'px}</style></head><body>' +
    '<div class="celtra-ad-v3"><img src="data:image/png,celtra" style="display:none" onerror="' +
    '(function(img){var params=' + JSON.stringify(params).replace(/"/g, '&quot;') + ';' +
    'var req=document.createElement(&quot;script&quot;);' +
    'req.id=params.scriptId=&quot;celtra-script-&quot;+(window.celtraScriptIndex=(window.celtraScriptIndex||0)+1);' +
    'params.clientTimestamp=new Date/1000;' +
    'params.clientTimeZoneOffsetInMinutes=new Date().getTimezoneOffset();' +
    'params.hostPageLoadId=window.celtraHostPageLoadId=window.celtraHostPageLoadId||(Math.random()+&quot;&quot;).slice(2);' +
    'var qs=&quot;&quot;;for(var k in params){qs+=&quot;&amp;&quot;+encodeURIComponent(k)+&quot;=&quot;+encodeURIComponent(params[k]);}' +
    'req.src=&quot;https://ads.celtra.com/' + creativeId + '/preview.js?&quot;+qs;' +
    'img.parentNode.insertBefore(req,img.nextSibling);})(this);' +
    '"></div></body></html>';
}

/* --- Captivate share-page calibration (legacy Preview URL rows) -------------------------------------
   A shareablePreview URL is not a bare ad: the page draws its own ~40px KORTX
   toolbar and centres the creative inside the rest of the viewport (the 300×600
   units additionally render a mock publisher page around the unit).

   So each format loads the share page at a FIXED viewport — making its internal
   layout deterministic — and the gallery shows only the rectangle the creative
   occupies inside it, scaled up to fill the card. Re-measure with a pixel ruler
   and change these four numbers if Captivate changes its chrome.
     view : the iframe's own viewport, in CSS px
     crop : { x, y, w, h } of the creative inside that viewport
   A row may override the format default with a Crop column ("x,y,w,h") — needed
   because each creative sits differently inside the mock publisher page.
-------------------------------------------------------------------------- */
export const CAPTIVATE_CROP = {
  /* Measured by hand in the crop calibrator against real units on the LIVE
     share page, then converted: crop.x = -offsetX / scale, crop.w = slotW / scale.
     vertical  — scale 1.0029, offset -499,-111
     cinematic — scale 2.3892, offset -474,-700 */
  vertical:  { view: { w: 1200, h: 1000 }, crop: { x: 498, y: 111, w: 299, h: 598 } },
  cinematic: { view: { w: 1200, h: 1000 }, crop: { x: 198, y: 293, w: 804, h: 452 } }
};

/* The one place a Captivate preview id becomes a URL. CAPTIVATE_CROP above was
   calibrated against this exact URL shape — the plain live share page — so
   changing it invalidates those numbers. */
export const captivateFrame = id =>
  'https://captivate.kortx.io/shareablePreview/' + id;

/* Creative type registry: canonical name, aliases, format, icon path.
   The five names are the PRD's Creative Type taxonomy and are the only ones the
   gallery offers. Retired labels (OLV, Pause Ads, Social Skins, DOOH) survive as
   aliases so existing sheet and database rows keep resolving. */
export const CREATIVE_TYPES = [
  { name: 'Rich Media', aliases: ['rich media', 'richmedia', 'social skins', 'social skin'], format: 'vertical', icon: 'Sparkles' },
  { name: 'Banners', aliases: ['banner', 'banners', 'display', 'display ads', 'dooh'], format: 'vertical', icon: 'PanelTop' },
  { name: 'Interactive Video', aliases: ['interactive video', 'interactivevideo', 'olv', 'online video'], format: 'cinematic', icon: 'MonitorPlay' },
  { name: 'CTV', aliases: ['ctv', 'connected tv', 'pause ad', 'pause ads'], format: 'cinematic', icon: 'Tv' },
  { name: 'AI Video Production', aliases: ['ai video production', 'ai video', 'ai'], format: 'cinematic', icon: 'Video' }
];

/* Campaign goals — the objectives a buyer arrives with. A creative may serve
   several, so this facet is OR'd like Vertical rather than AND'd. */
export const CAMPAIGN_GOALS = [
  'Awareness', 'Engagement', 'Product Discovery', 'Store Visits', 'Commerce', 'Lead Generation'
];

/* Icon names resolve against Lucide 0.454.0, the design system's sanctioned set. */
export const ALL_TYPES_ICON = 'LayoutGrid';

/* ---------------- mock spreadsheet (pipe-delimited, header row) ---------------- */
const V300 = captivateFrame('2k5se');
const V1080 = captivateFrame('6qof21');
const V300B = captivateFrame('wpyud');
const C1 = '3cf03512';   // Celtra creative ID — the durable way to reference a preview

const MOCK_CSV = [
  'ID|Active|Brand|Campaign|Creative Type|Vertical|Components|Campaign Goals|Preview URL|Creative ID|Description|Featured|Sort Order|Crop',
  `001|TRUE|Dairy Queen|Cheeseburger Lovers|Rich Media|Dining and QSR|Carousel, Maps, Nearby|Store Visits, Engagement||${C1}|Interactive rich media experience that pairs a swipeable menu carousel with a live store locator.|TRUE|1`,
  `002|TRUE|Indiana University|Apply In Minutes|CTV|Education|Video, Dynamic|Lead Generation, Awareness|${V1080}||Connected TV spot with dynamic end-card messaging by enrollment stage.|TRUE|2`,
  `003|TRUE|Toyota|Tundra Trail Ready|Rich Media|Automotive|Carousel, Inventory, Dynamic|Product Discovery, Store Visits||${C1}|Trim-level product feed served against regional inventory.|FALSE|3`,
  `004|TRUE|Delta|Window Seat Weekends|Rich Media|Travel & Tourism|Slider, Custom Animation, Form Fill|Commerce, Engagement||${C1}|Route-aware fare unit with an animated destination reveal.|FALSE|4`,
  `005|TRUE|Entergy|Powering Progress|CTV|B2B|Video, Custom Animation|Awareness|${V1080}||Brand film cut for streaming inventory across regulated markets.|FALSE|5`,
  `006|TRUE|Servpro|Ready For Anything|Interactive Video|Consumer Services|Video, Maps|Store Visits, Lead Generation|${V1080}||Online video with an interactive franchise finder overlay.|FALSE|6`,
  `007|TRUE|WeatherTech|All-Weather Fit|Banners|Automotive|Custom Animation, Inventory|Product Discovery, Commerce||${C1}|Vehicle-matched product banners built from the live catalog.|FALSE|7`,
  `008|TRUE|First Horizon|Move Money Faster|Banners|Financial Services|Custom Animation, Dynamic|Lead Generation||${C1}|Offer-driven display sequenced by account type.|FALSE|8`,
  `009|TRUE|Cabinets To Go|Kitchen Refresh Event|Banners|Retail|Carousel, QR Code|Store Visits, Commerce||${C1}|Promotional display with QR handoff to in-store pricing.|FALSE|9`,
  `010|TRUE|AT&T|Fiber Everywhere|CTV|Hospitality & Entertainment|Overlay, QR Code|Lead Generation, Engagement|${V1080}||Pause-state takeover with address-level availability lookup.|FALSE|10`,
  `011|TRUE|Cedar Point|Ride The Off-Season|CTV|Hospitality & Entertainment|Interactive Games, Scratch Off|Engagement, Commerce|${V1080}||Pause ad that turns a season-pass offer into a spin-to-reveal.|FALSE|11`,
  `012|TRUE|Nature's Own|Everyday Fresh|AI Video Production|CPG|Video, Trigger|Awareness, Product Discovery|${V1080}||Generative video variants produced per retailer and daypart.|FALSE|12`,
  `013|TRUE|Beaumont Health|Care Close By|Interactive Video|Healthcare|Video, Nearby|Store Visits, Awareness|${V1080}||Service-line video routed to the nearest care location.|FALSE|13`,
  `014|TRUE|McDonald's|Late Night Cravings|Rich Media|Dining and QSR|Countdown, Dynamic|Store Visits, Engagement||${C1}|Daypart-aware unit that swaps offers after 9pm.|FALSE|14`,
  `015|TRUE|Servpro|Storm Response|Banners|B2B|Custom Animation, Dynamic|Lead Generation, Awareness||${C1}|Weather-triggered display sequenced by market.|FALSE|15`,
  '016|FALSE|Archived Client|Retired Campaign|Banners|Retail|Animation|Awareness|||Inactive row — proves Active=FALSE is filtered out.|FALSE|14'
].join('\n');

/* ---------------- parsing + normalization ---------------- */

function splitRows(text) {
  return text.replace(/\r/g, '').split('\n').filter(l => l.trim().length);
}

function detectDelimiter(headerLine) {
  return headerLine.split('|').length > headerLine.split(',').length ? '|' : ',';
}

/* Minimal RFC-4180-ish field split (handles quoted commas). */
function splitFields(line, d) {
  const out = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { q = (q && line[i + 1] === '"') ? (cur += '"', i++, true) : !q; }
    else if (c === d && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out.map(s => s.trim());
}

const key = s => s.toLowerCase().replace(/[^a-z]/g, '');
const bool = v => /^(true|yes|1|y)$/i.test(String(v || '').trim());

function resolveType(raw) {
  const k = String(raw || '').trim().toLowerCase();
  return CREATIVE_TYPES.find(t => t.aliases.includes(k))
      || CREATIVE_TYPES.find(t => t.name.toLowerCase() === k)
      || null;
}

function normalizeRow(obj, i) {
  const get = n => obj[key(n)] ?? '';
  const type = resolveType(get('Creative Type'));
  if (!type) return null;
  const cal = CAPTIVATE_CROP[type.format];
  const parts = get('Crop').split(',').map(n => parseFloat(n)).filter(n => !isNaN(n));
  const crop = parts.length === 4
    ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] }
    : cal.crop;
  const fmt = FORMATS[type.format];
  const url = get('Preview URL');
  const celtraId = get('Creative ID').replace(/^.*\/(\w+)\/preview\.js.*$/, '$1').trim();
  return {
    id: get('ID') || `row-${i}`,
    active: bool(get('Active')),
    brand: get('Brand'),
    campaign: get('Campaign'),
    type: type.name,
    typeIcon: type.icon,
    vertical: get('Vertical') || 'Other',
    components: get('Components').split(',').map(s => s.trim()).filter(Boolean),
    goals: get('Campaign Goals').split(',').map(s => s.trim()).filter(Boolean),
    url,
    celtraId,
    /* A creative ID renders the bare ad; a URL falls back to the cropped page. */
    mode: celtraId ? 'celtra' : (/^https?:\/\//i.test(url) ? 'captivate' : 'none'),
    hasPreview: !!celtraId || /^https?:\/\//i.test(url),
    description: get('Description'),
    featured: bool(get('Featured')),
    sort: Number(get('Sort Order')) || i + 1,
    format: type.format,
    view: cal.view,
    crop,
    nativeW: fmt.w,
    nativeH: fmt.h,
    ratio: fmt.ratio,
    sizeLabel: fmt.label
  };
}

export function parseSheet(text) {
  const lines = splitRows(text);
  const d = SOURCE.delimiter || detectDelimiter(lines[0]);
  const head = splitFields(lines[0], d).map(key);
  return lines.slice(1)
    .map((line, i) => {
      const cells = splitFields(line, d);
      const obj = {};
      head.forEach((h, j) => { obj[h] = cells[j] ?? ''; });
      return normalizeRow(obj, i);
    })
    .filter(r => r && r.active)
    .sort((a, b) => a.sort - b.sort);
}

/* The single call the presentation layer makes. */
/* Map one database row onto the gallery's row shape. The database stores a
   Captivate shareablePreview id, so these render through the cropped-share-page
   path rather than a Celtra tag. */
function fromDb(r, i) {
  const type = resolveType(r.product) || CREATIVE_TYPES[0];
  const cal = CAPTIVATE_CROP[type.format];
  const fmt = FORMATS[type.format];
  return {
    id: r.key || 'db-' + i,
    active: true,
    brand: r.brand,
    campaign: r.name || '',
    type: type.name,
    typeIcon: type.icon,
    vertical: r.vertical || 'Other',
    verticals: (r.verticals && r.verticals.length) ? r.verticals : [r.vertical || 'Other'],
    components: r.components || [],
    goals: r.goals || [],
    bestFor: r.bestFor || '',
    measure: r.measure || '',
    url: captivateFrame(r.id),
    celtraId: r.celtraId || '',
    mode: r.celtraId ? 'celtra' : 'captivate',
    hasPreview: !!(r.id || r.celtraId),
    description: '',
    featured: false,
    sort: i + 1,
    format: type.format,
    view: cal.view,
    crop: bleed((r.cropDX || r.cropDY || r.cropDW) ? (() => { const c0 = cal.crop, w = Math.max(40, c0.w + (r.cropDW || 0)), h = c0.h * w / c0.w; return Object.assign({}, c0, { x: c0.x + (r.cropDX || 0) - (w - c0.w) / 2, y: c0.y + (r.cropDY || 0) - (h - c0.h) / 2, w, h }); })() : cal.crop),
    nativeW: fmt.w,
    nativeH: fmt.h,
    ratio: fmt.ratio,
    sizeLabel: fmt.label
  };
}

/* The gallery and the database are one dataset: the landing page reads the same
   rows the Best of Creative Services Database maintains, so anything added or
   edited there shows up here. A published-sheet URL still wins if one is set. */
/* Edge bleed: crop 2 share-page px inside every edge (aspect kept), so a sub-pixel
       offset never shows the share page's white margin once the ad is scaled up large. */
export const bleed = (c, px = 2) => { if (!c || !c.w) return c; const w = Math.max(40, c.w - px * 2), h = c.h * w / c.w; return Object.assign({}, c, { x: c.x + (c.w - w) / 2, y: c.y + (c.h - h) / 2, w, h }); };

export async function loadCreatives(onUpdate) {
  if (SOURCE.url) {
    try {
      const res = await fetch(SOURCE.url, { cache: 'no-store' });
      if (res.ok) return parseSheet(await res.text());
    } catch (e) { /* fall through to the database */ }
  }
  try {
    const db = await import('./creative-db.js');
    let rows;
    try { rows = await db.loadRemote(); } catch (e) { rows = db.load(); }
    if (rows && rows.length) {
      const live = rows.filter(r => r.id && r.inGallery !== false);
      const out = live.map(fromDb);
      /* Uploaded HTML5 zips play from their own unpacked copy, shown whole — no share-page crop. */
      const zips = live.map((r, i) => [r, out[i]]).filter(([r]) => r.source === 'zip' && r.zipKey);
      /* Unpacking runs in the background so the gallery paints straight away. */
      zips.forEach(([, g]) => { g.hasPreview = false; });
      if (zips.length) {
        import('./html-zip-store.js').then(store => Promise.all(zips.map(async ([r, g]) => {
          try {
            const w = r.zipW || g.nativeW, h = r.zipH || g.nativeH;
            g.url = await store.previewUrl(r.zipKey);
            g.view = { w, h }; g.crop = { x: 0, y: 0, w, h };
            g.nativeW = w; g.nativeH = h; g.ratio = w + ' / ' + h;
            g.hasPreview = true;
          } catch (e) { g.hasPreview = false; }
        }))).then(() => { if (onUpdate) onUpdate(); }).catch(() => {});
      }
      return out;
    }
  } catch (e) { /* fall through to the bundled sample */ }
  return parseSheet(MOCK_CSV);
}

/* Facets are derived from the data, never hard-coded. */
export function deriveFacets(rows) {
  const types = CREATIVE_TYPES.filter(t => rows.some(r => r.type === t.name));
  return { verticals: VERTICALS.slice(), components: COMPONENTS.slice(), goals: CAMPAIGN_GOALS.slice(), types };
}


/* All three facets are multi-select and empty means "no constraint". Verticals
   are OR'd (a creative has exactly one) and so are campaign goals (a creative
   can serve several, and a buyer picking two objectives wants either).
   Components are AND'd: every picked component must be present. */
export function applyFilters(rows, { type, verticals, components, goals, featuredFirst }) {
  const verts = verticals || [];
  const gs = goals || [];
  const out = rows.filter(r =>
    (type === 'All Creative' || r.type === type) &&
    (!verts.length || verts.some(v => (r.verticals || [r.vertical]).includes(v))) &&
    (!gs.length || gs.some(g => (r.goals || []).includes(g))) &&
    (!components.length || components.every(c => r.components.includes(c))));
  return featuredFirst
    ? out.sort((a, b) => (b.featured - a.featured) || (a.sort - b.sort))
    : out;
}


/* ------------------------------------------------------------------
   DYNAMIC CREATIVE FEED
   Mirrors "Dynamic Sheet.xlsx": ten condition columns, then the value
   columns the creative renders. One row per rule; an empty condition
   cell is a wildcard.

   Two local additions to the sheet, both worth adopting:
     BG Pattern  — dots | grid | diagonal | rings | waves. Colour alone
                   can't show that a background is authored per row.
     Domain      — so the click-out reads as a real destination.

   The row set is generated per VERTICAL from a compact voice pack, so the
   demo brand matches whatever vertical is selected in the gallery above.
-------------------------------------------------------------------*/

export const DCO_CONDITION_COLS = ['Temperatures', 'Dates', 'Time of Day', 'Day of week',
  'Ad Name', 'Country', 'State', 'City', 'Zip', 'Language'];

export const DCO_VALUE_COLS = ['Headline', 'Headline 2', 'Body copy', 'Video URL',
  'Hero Image URL', 'Carousel Image 1 URL', 'Carousel Image 2 URL', 'Carousel Image 3 URL',
  'Landing Page', 'BG Color', 'BG Color 2', 'Shape Color', 'Shape Color 2',
  'Font', 'Font 1', 'CTA', 'Report Label', 'BG Pattern', 'Proximity Note'];

export const DCO_CONTROLS = [
  { col: 'Temperatures', label: 'Temperature', icon: 'Thermometer',
    options: ['Below 40°F', '40–70°F', 'Above 70°F'] },
  { col: 'Time of Day', label: 'Time of Day', icon: 'Clock',
    options: ['6:00am-10:00am', '10:01am-3:00pm', '3:01pm-6:00pm'] },
  /* Back to School / Labor Day / Christmas are calendar moments, so they live in
     the Dates column rather than Day of week — the sheet's own semantics. */
  { col: 'Dates', label: 'Dates', icon: 'CalendarRange',
    options: ['July 15th-August 24th', 'Sept. 6th-Sept. 13th', 'Dec. 15th-Dec. 25th'] },
  { col: 'Zip', label: 'Zip Code', icon: 'Navigation',
    options: ['48307', '48326'] },
  { col: 'RSS Feed', label: 'RSS Feed & Language', icon: 'Rss',
    options: ['Current Jackpot', 'Next Draw', 'English', 'Korean'] }
];

export const DCO_PLACEMENTS = [
  { id: 'adA', adName: 'AD_300x600_MI', slotLabel: 'Detroit, MI', dot: '#00CCFF',
    pin: { Country: 'US', State: 'MI', City: 'Detroit' } },
  { id: 'adB', adName: 'AD_300x600_IL', slotLabel: 'Chicago, IL', dot: '#8A7CF8',
    pin: { Country: 'US', State: 'IL', City: 'Chicago' } }
];

/* One demo brand for the whole section. Coffee and bagels exercise every
   condition naturally — temperature, daypart, calendar, zip — so the rules read
   as real merchandising rather than filler. */
export const DCO_KIT = {
  brand: 'MIDWEST', category: 'Coffee & Bagel', domain: 'MWCoffee&Bagel',
  mark: 'M', asset: 'mwc'
};

/* {city} is filled per placement at render, so one shared rule produces copy
   that reads as local in both markets. */
const SHAPES = [
  { c: { 'Ad Name': 'AD_300x600_MI', Country: 'US', State: 'MI', Language: 'EN' },
    v: k => ['Fresh coffee and hot bagels daily', 'Baked before sunrise, every day in {city}',
      k.asset + '-loop.mp4', k.asset + '-hero.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#00CCFF', '#6D5EF0', 'Order Now', 'MI_base', 'dots'] },
  { c: { 'Ad Name': 'AD_300x600_IL', Country: 'US', State: 'IL', Language: 'EN' },
    v: k => ['Fresh coffee and hot bagels daily', 'Baked before sunrise, every day in {city}',
      k.asset + '-loop.mp4', k.asset + '-hero.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#00CCFF', '#6D5EF0', 'Order Now', 'IL_base', 'dots'] },

  /* Temperature — relief from the weather, framed by the food. */
  { c: { Temperatures: 'Below 40°F', Country: 'US', Language: 'EN' },
    v: k => ['Warm up from the inside out this morning', 'Bringing {city} in from the cold, one bagel at a time',
      k.asset + '-cold.mp4', k.asset + '-cold.jpg', '/{city}/Shop', '#04080F', '#1A0F2C', '#D67DF0', '#6D5EF0', 'Order Something Hot', 'US_cold', 'diagonal'] },
  { c: { Temperatures: '40–70°F', Country: 'US', Language: 'EN' },
    v: k => ['Crisp air outside, hot coffee in hand', 'Sweater weather goes down easy in {city}',
      k.asset + '-mild.mp4', k.asset + '-mild.jpg', '/{city}/Shop', '#04080F', '#0B1A16', '#BEF264', '#00CCFF', 'Grab A Warm One', 'US_mild', 'grid'] },
  { c: { Temperatures: 'Above 70°F', Country: 'US', Language: 'EN' },
    v: k => ['Iced cold brew, built for the heat', 'Cold brew is moving fast across {city} today',
      k.asset + '-hot.mp4', k.asset + '-hot.jpg', '/{city}/Shop', '#04080F', '#08202C', '#00CCFF', '#00CCFF', 'Order Iced', 'US_hot', 'waves'] },

  /* Time of day — the three commutes. */
  { c: { 'Time of Day': '6:00am-10:00am', Country: 'US', Language: 'EN' },
    v: k => ['Breakfast handled before your 9am shift', 'Order ahead and skip the {city} morning line',
      k.asset + '-morning.mp4', k.asset + '-morning.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#00CCFF', '#6D5EF0', 'Order Ahead', 'US_am', 'waves'] },
  { c: { 'Time of Day': '10:01am-3:00pm', Country: 'US', Language: 'EN' },
    v: k => ['A lunch that beats sitting at the desk again', 'Hot sandwiches ready in ten minutes across {city}',
      k.asset + '-lunch.mp4', k.asset + '-lunch.jpg', '/{city}/Shop', '#04080F', '#0A1F2E', '#BEF264', '#00CCFF', 'Order Lunch', 'US_noon', 'grid'] },
  { c: { 'Time of Day': '3:01pm-6:00pm', Country: 'US', Language: 'EN' },
    v: k => ['Bring home some family favorites on your drive home', 'Doors are always open on your {city} commute',
      k.asset + '-evening.mp4', k.asset + '-evening.jpg', '/{city}/Shop', '#04080F', '#0E1020', '#8A7CF8', '#6D5EF0', 'Order For Pickup', 'US_pm', 'dots'] },

  /* Calendar moments. */
  { c: { Dates: 'July 15th-August 24th', Country: 'US', Language: 'EN' },
    v: k => ['Back to school means back to deliciousness', 'Fueling {city} students and staff all semester',
      k.asset + '-school.mp4', k.asset + '-school.jpg', '/{city}/Shop', '#04080F', '#0B1A16', '#BEF264', '#00CCFF', 'Order Now', 'US_bts', 'grid'] },
  { c: { Dates: 'Sept. 6th-Sept. 13th', Country: 'US', Language: 'EN' },
    v: k => ["Kick back and relax with a tasty treat, you've earned it", 'Open and ready to serve all weekend in {city}',
      k.asset + '-laborday.mp4', k.asset + '-laborday.jpg', '/{city}/Shop', '#04080F', '#0A1F2E', '#00CCFF', '#BEF264', 'Order Treat Now', 'US_labor', 'waves'] },
  { c: { Dates: 'Dec. 15th-Dec. 25th', Country: 'US', Language: 'EN' },
    v: k => ['Enjoy the holidays with our season favorites', 'Holiday boxes, ready for {city} pickup',
      k.asset + '-holiday.mp4', k.asset + '-holiday.jpg', '/{city}/Shop', '#04080F', '#210E1A', '#D67DF0', '#BEF264', 'Pick Up Your Holiday Box', 'US_holiday', 'rings'] },

  /* Zip — the most local layer, English and Spanish for every one. */
  { c: { Zip: '48307', Country: 'US', State: 'MI', Language: 'EN' },
    n: 'Tap to see it on the map',
    v: k => ['Hot bagels five minutes from your desk downtown', 'Campus Martius pickup, hot off the board',
      k.asset + '-downtown.mp4', k.asset + '-downtown.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#BEF264', '#00CCFF', 'Order For Pickup', 'MI_48226', 'grid'] },
  { c: { Zip: '48307', Country: 'US', State: 'MI', Language: 'ES' },
    n: 'Toca para verlo en el mapa',
    v: k => ['Bagels calientes a cinco minutos del centro', 'Recoge en Campus Martius, recién hecho',
      k.asset + '-downtown-es.mp4', k.asset + '-downtown.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#BEF264', '#00CCFF', 'Ordena Y Recoge', 'ES_48226', 'grid'] },
  { c: { Zip: '48326', Country: 'US', State: 'MI', Language: 'EN' },
    n: '1.4 miles away',
    v: k => ['Fresh sandwiches at your door in 30 minutes', 'From grill to your door in Midtown tonight',
      k.asset + '-midtown.mp4', k.asset + '-midtown.jpg', '/{city}/Shop', '#04080F', '#0E1226', '#8A7CF8', '#00CCFF', 'Grab Dinner Tonight', 'MI_48201', 'diagonal'] },
  { c: { Zip: '48326', Country: 'US', State: 'MI', Language: 'ES' },
    n: 'A 1.4 millas de ti',
    v: k => ['Sándwiches frescos en tu puerta en 30 minutos', 'De la plancha a tu puerta en Midtown esta noche',
      k.asset + '-midtown-es.mp4', k.asset + '-midtown.jpg', '/{city}/Shop', '#04080F', '#0E1226', '#8A7CF8', '#00CCFF', 'Cena Esta Noche', 'ES_48201', 'diagonal'] },
  { c: { Zip: '60601', Country: 'US', State: 'IL', Language: 'EN' },
    n: '218 S Wabash Ave, Chicago',
    v: k => ['Hot bagels five minutes from your desk in the Loop', 'Millennium Park pickup, hot off the board',
      k.asset + '-loop-chi.mp4', k.asset + '-loop-chi.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#BEF264', '#00CCFF', 'Order For Pickup', 'IL_60601', 'grid'] },
  { c: { Zip: '60601', Country: 'US', State: 'IL', Language: 'ES' },
    n: '218 S Wabash Ave, Chicago',
    v: k => ['Bagels calientes a cinco minutos del Loop', 'Recoge en Millennium Park, recién hecho',
      k.asset + '-loop-chi-es.mp4', k.asset + '-loop-chi.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#BEF264', '#00CCFF', 'Ordena Y Recoge', 'ES_60601', 'grid'] },
  { c: { Zip: '60614', Country: 'US', State: 'IL', Language: 'EN' },
    n: '2.1 miles away',
    v: k => ['Fresh sandwiches at your door in 30 minutes', 'From grill to your door in Lincoln Park tonight',
      k.asset + '-lincoln.mp4', k.asset + '-lincoln.jpg', '/{city}/Shop', '#04080F', '#0E1226', '#8A7CF8', '#00CCFF', 'Grab Dinner Tonight', 'IL_60614', 'diagonal'] },
  { c: { Zip: '60614', Country: 'US', State: 'IL', Language: 'ES' },
    n: 'A 2.1 millas de ti',
    v: k => ['Sándwiches frescos en tu puerta en 30 minutos', 'De la plancha a tu puerta en Lincoln Park esta noche',
      k.asset + '-lincoln-es.mp4', k.asset + '-lincoln.jpg', '/{city}/Shop', '#04080F', '#0E1226', '#8A7CF8', '#00CCFF', 'Cena Esta Noche', 'ES_60614', 'diagonal'] },

  /* Spanish fallbacks for the non-zip layers. */
  { c: { Country: 'US', Language: 'ES' },
    v: k => ['Café fresco y bagels calientes', 'Horneados antes del amanecer en {city}',
      k.asset + '-loop-es.mp4', k.asset + '-hero.jpg', '/{city}/Shop', '#04080F', '#0A1424', '#00CCFF', '#6D5EF0', 'Ordena Ahora', 'ES_base', 'dots'] },
  { c: { Temperatures: 'Below 40°F', Country: 'US', Language: 'ES' },
    v: k => ['Un calor que se siente por dentro', 'Sacando a {city} del frío, un bagel a la vez',
      k.asset + '-cold-es.mp4', k.asset + '-cold.jpg', '/{city}/Shop', '#04080F', '#1A0F2C', '#D67DF0', '#6D5EF0', 'Pide Algo Caliente', 'ES_cold', 'diagonal'] },
  { c: { Temperatures: 'Above 70°F', Country: 'US', Language: 'ES' },
    v: k => ['Bien frío, hecho para el calor de hoy', 'El cold brew vuela hoy en {city}',
      k.asset + '-hot-es.mp4', k.asset + '-hot.jpg', '/{city}/Shop', '#04080F', '#08202C', '#00CCFF', '#00CCFF', 'Ordena Frío', 'ES_hot', 'waves'] }
];

const COLS = DCO_CONDITION_COLS.concat(DCO_VALUE_COLS);

/* Build the sheet's rows. */
export function buildRows() {
  const kit = DCO_KIT;
  return SHAPES.map((s, i) => {
    const v = s.v(kit);
    const row = { _i: i };
    COLS.forEach(c => { row[c] = ''; });
    Object.keys(s.c).forEach(c => { row[c] = s.c[c]; });
    const [headline, body, video, hero, landing, bg, bg2, shape, shape2, cta, report, pattern] = v;
    Object.assign(row, {
      'Headline': headline, 'Headline 2': '', 'Body copy': body,
      'Video URL': video, 'Hero Image URL': hero,
      'Carousel Image 1 URL': kit.asset + '-c1.jpg',
      'Carousel Image 2 URL': kit.asset + '-c2.jpg',
      'Carousel Image 3 URL': kit.asset + '-c3.jpg',
      'Landing Page': landing, 'BG Color': bg, 'BG Color 2': bg2,
      'Shape Color': shape, 'Shape Color 2': shape2,
      'Font': 'Inter', 'Font 1': 'Inter', 'CTA': cta,
      'Report Label': report, 'BG Pattern': pattern,
      'Proximity Note': s.n || ''
    });
    return row;
  });
}

export function kitFor() { return DCO_KIT; }

/* Weighted specificity: a live signal must outrank a placement's standing geo,
   otherwise a per-placement default would always beat a real trigger. */
const DCO_WEIGHTS = {
  'Temperatures': 10, 'Dates': 10, 'Time of Day': 10, 'Day of week': 10, 'Zip': 10,
  'Language': 4, 'City': 3, 'State': 2, 'Ad Name': 2, 'Country': 1
};

export function resolveFeed(request, rows) {
  let best = null, bestScore = -1, bestHits = 0;
  for (const row of rows) {
    let score = 0, hits = 0, ok = true;
    for (const c of DCO_CONDITION_COLS) {
      const want = row[c];
      if (!want) continue;
      const have = request[c];
      if (!have) { ok = false; break; }
      if (String(have) !== String(want)) { ok = false; break; }
      score += DCO_WEIGHTS[c] || 1;
      hits++;
    }
    if (ok && score > bestScore) { best = row; bestScore = score; bestHits = hits; }
  }
  return { row: best || rows[0], score: bestScore, hits: bestHits };
}

/* BG Pattern → a real CSS background, so each row's canvas is visibly authored. */
export function patternCss(pattern, shape) {
  const c = (a) => shape + a;
  switch (pattern) {
    case 'grid':
      return { backgroundImage: 'linear-gradient(' + c('1f') + ' 1px, transparent 1px), linear-gradient(90deg, ' + c('1f') + ' 1px, transparent 1px)', backgroundSize: '18px 18px' };
    case 'diagonal':
      return { backgroundImage: 'repeating-linear-gradient(135deg, ' + c('1a') + ' 0 2px, transparent 2px 12px)', backgroundSize: 'auto' };
    case 'rings':
      return { backgroundImage: 'repeating-radial-gradient(circle at 50% 32%, ' + c('24') + ' 0 1px, transparent 1px 16px)', backgroundSize: 'auto' };
    case 'waves':
      return { backgroundImage: 'repeating-radial-gradient(circle at 50% 120%, ' + c('1f') + ' 0 1px, transparent 1px 22px)', backgroundSize: 'auto' };
    default:
      return { backgroundImage: 'radial-gradient(' + c('26') + ' 1px, transparent 1px)', backgroundSize: '12px 12px' };
  }
}
