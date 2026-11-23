/* ------------------------------------------------------------------
   BEST OF CREATIVE SERVICES — DATABASE LAYER

   This file is the seed. The page itself is the system of record: rows
   added or imported in the UI persist to localStorage, and Export JSON
   hands the whole set back so it can be baked in here permanently.

   Verticals and components are imported from the gallery's data layer,
   so both pages always speak the same taxonomy.
-------------------------------------------------------------------*/

import { VERTICALS, COMPONENTS, CAMPAIGN_GOALS } from './creative-data.js';

export { VERTICALS, COMPONENTS, CAMPAIGN_GOALS };

/* The PRD's five Creative Type categories. Retired labels are still accepted on
   the way in (see PRODUCT_ALIASES) so older workbook pastes keep importing. */
export const PRODUCTS = ['Rich Media', 'Banners', 'Interactive Video', 'CTV',
  'AI Video Production'];

/* Both previews load the Captivate share page and show only the creative's
   rectangle inside it — the share page draws its own chrome and centres the
   unit, so a crop is the only way to get a clean thumbnail. Re-measure these
   numbers if Captivate changes its layout.
   inset stays 0: the crop is already sized to the scaled unit. */
/* These are the SAME calibration the Creative Labs uses (CAPTIVATE_CROP in
   creative-data.js), measured by hand in the crop calibrator against the live
   share page and converted: crop.x = -offsetX / scale, crop.w = slotW / scale.
     vertical  — scale 1.0029, offset -499,-111
     cinematic — scale 2.3892, offset -474,-700
   Both formats load the page at ONE viewport, 1200 × 1000, so the share page's
   internal layout is deterministic. If these two ever disagree with the Lab's,
   the previews go off-centre — change them together. */
export const FORMATS = {
  vertical: { label: '300 × 600',   view: { w: 1200, h: 1000 }, crop: { x: 498, y: 111, w: 299, h: 598 }, inset: 0 },
  wide:     { label: '1920 × 1080', view: { w: 1200, h: 1000 }, crop: { x: 198, y: 293, w: 804, h: 452 }, inset: 0 }
};

/* The crop actually rendered, after the inset bite. */
export function cropRect(fmt) {
  const i = fmt.inset || 0;
  return { x: fmt.crop.x + i, y: fmt.crop.y + i, w: fmt.crop.w - i * 2, h: fmt.crop.h - i * 2 };
}

/* Bumped when the seed changes materially: a stored copy of an older seed must
   not shadow the corrected one. Older keys are left in place, not deleted. */
/* Ad Type as typed in the workbook, mapped onto the product list. */
const PRODUCT_ALIASES = {
  display: 'Banners', banner: 'Banners', banners: 'Banners', 'display ads': 'Banners',
  'rich media': 'Rich Media', 'interactive video': 'Interactive Video',
  olv: 'OLV', 'online video': 'OLV', ctv: 'CTV', 'connected tv': 'CTV',
  'ai video': 'AI Video', 'pause ad': 'Pause Ads', 'pause ads': 'Pause Ads',
  'social skin': 'Social Skins', 'social skins': 'Social Skins', dooh: 'DOOH',
  'pip ctv': 'CTV', 'dynamic ctv': 'CTV', 'ctv pip': 'CTV',
  /* Retired Creative Types folded onto the PRD five. */
  olv: 'Interactive Video', 'online video': 'Interactive Video',
  'pause ad': 'CTV', 'pause ads': 'CTV',
  'social skins': 'Rich Media', 'social skin': 'Rich Media',
  dooh: 'Banners', 'ai video': 'AI Video Production', ai: 'AI Video Production'
};
export function normalizeProduct(raw) {
  const k = String(raw || '').trim().toLowerCase();
  if (!k) return 'Rich Media';
  return PRODUCT_ALIASES[k] || PRODUCTS.find(p => p.toLowerCase() === k) || 'Rich Media';
}

/* Format follows the ad product, not a per-row setting: 300 × 600 for the
   display products, 1920 × 1080 for everything else. */
const VERTICAL_PRODUCTS = ['Rich Media', 'Banners'];
export function formatFor(product) {
  return VERTICAL_PRODUCTS.indexOf(String(product || '').trim()) > -1 ? 'vertical' : 'wide';
}

export const STORAGE_KEY = 'kortx.creative.db.v5';

/* Accepts a full share URL or a bare id. */
export function parseCreativeId(input) {
  const s = String(input || '').trim();
  const m = s.match(/shareablePreview\/([A-Za-z0-9_-]+)/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{4,}$/.test(s) ? s : '';
}

export function shareUrl(id) {
  return 'https://captivate.kortx.io/shareablePreview/' + id;
}

/* The sheet's component wording, mapped onto the canonical set. */
const COMPONENT_ALIASES = {
  'clickable pop ups': ['Pop Up Window'],
  'clickable pop up': ['Pop Up Window'],
  'pop ups': ['Pop Up Window'],
  'clickable video': ['Video', 'Overlay'],
  'click to call': ['Tap to Call'],
  'gamification': ['Interactive Games'],
  '3d carousel': ['3D', 'Carousel'],
  '3d tilt': ['3D'],
  '360 video': ['360 Video'],
  'dynamic': ['Dynamic'],
  'weather fx': ['Weather FX'],
  'custom animation': ['Custom Animation'],
  'custom code': ['Custom Code'],
  'form fill': ['Form Fill'],
  'scratch off': ['Scratch Off'],
  'flip card': ['Flip Card'],
  'tap to call': ['Tap to Call'],
  'image sequencer': ['Image Sequencer'],
  'scrolling disclaimers': ['Scrolling Disclaimers'],
  'app download': ['App Download'],
  'colour picker': ['Color Picker'],
  'color picker': ['Color Picker'],
  'drag and drop': ['Drag and Drop'],
  'interactive games': ['Interactive Games'],
  'pop up window': ['Pop Up Window'],
  'qr code': ['QR Code'],
  'store locator': ['Nearby'],
  'product feed': ['Inventory'],
  /* Names that describe the asset or the tab, not an interactive component. */
  'ai video': ['Video'],
  'ai generated': ['Video'],
  'automotive': [],
  'display': [],
  'rich media': []
};

export function normalizeComponents(raw) {
  const parts = String(raw || '').split(/[,/]/).map(s => s.trim())
    /* Size counts and other stray numerics appear in this column; drop them. */
    .filter(s => s && !/^\d+$/.test(s));
  const out = [];
  for (const p of parts) {
    const key = p.toLowerCase();
    const mapped = COMPONENT_ALIASES[key];
    const names = mapped || [COMPONENTS.find(c => c.toLowerCase() === key) || p];
    for (const n of names) if (n && !out.includes(n)) out.push(n);
  }
  return out;
}

/* ---------------- campaign goals ----------------
   The workbooks never recorded an objective, so a row's goals are inferred from
   what the creative actually does: its interactive components first, then its
   ad product, with the vertical's usual objective as a backstop. Admin-set
   goals always win — an explicit `goals` array passes through untouched. */
const GOAL_BY_COMPONENT = {
  'Maps': ['Store Visits'], 'Nearby': ['Store Visits'], 'QR Code': ['Store Visits', 'Commerce'],
  'Form Fill': ['Lead Generation'], 'Tap to Call': ['Lead Generation'], 'App Download': ['Lead Generation'],
  'Inventory': ['Product Discovery'], 'Carousel': ['Product Discovery'], 'Color Picker': ['Product Discovery'],
  'Slider': ['Product Discovery'], 'Flip Card': ['Product Discovery'], '3D': ['Product Discovery'],
  '360 Video': ['Product Discovery'], 'Image Sequencer': ['Product Discovery'],
  /* Engagement is reserved for components a person actually plays with, so the
     pill discriminates instead of matching almost everything. */
  'Interactive Games': ['Engagement'], 'Quiz': ['Engagement'], 'Scratch Off': ['Engagement'],
  'Drag and Drop': ['Engagement'], 'Countdown': ['Commerce'],
  'Pop Up Window': ['Product Discovery'], 'Overlay': ['Awareness'],
  'Dynamic': ['Awareness'], 'Trigger': ['Awareness'], 'Weather FX': ['Awareness'],
  'Custom Animation': ['Awareness'], 'Video': ['Awareness'],
  'Audio': ['Awareness'], 'GIF': ['Awareness']
};
/* The product is a backstop only — a whole product class does not share one
   objective, so Rich Media deliberately has no default and lets its components
   and vertical decide. */
const GOAL_BY_PRODUCT = {
  'CTV': ['Awareness'], 'AI Video Production': ['Awareness'],
  'Interactive Video': ['Awareness'], 'Banners': ['Awareness']
};
const GOAL_BY_VERTICAL = {
  'Retail': ['Commerce'], 'CPG': ['Commerce'], 'Dining and QSR': ['Store Visits'],
  'Automotive': ['Product Discovery'], 'Home Services': ['Lead Generation'],
  'Consumer Services': ['Lead Generation'], 'Education': ['Lead Generation'],
  'Financial Services': ['Lead Generation'], 'Healthcare': ['Store Visits'],
  'Senior Living': ['Lead Generation'], 'B2B': ['Lead Generation'],
  'Travel & Tourism': ['Commerce'], 'Hospitality & Entertainment': ['Commerce'],
  'Sports': ['Engagement'], 'Lottery': ['Engagement'], 'Agriculture': ['Lead Generation'],
  'Pharma/Biotech': ['Awareness'], 'Tech & Telecom': ['Lead Generation'],
  'Government & Non-Profit': ['Awareness']
};

export function inferGoals(product, components, vertical) {
  const out = [];
  const add = list => { for (const g of list || []) if (g && out.indexOf(g) === -1) out.push(g); };
  for (const c of components || []) add(GOAL_BY_COMPONENT[c]);
  add(GOAL_BY_PRODUCT[product]);
  add(GOAL_BY_VERTICAL[vertical]);
  if (!out.length) out.push('Awareness');
  /* Three is the brand's number, and a row claiming every objective claims none. */
  return out.slice(0, 3);
}

let seq = 0;
export function makeRow(r) {
  const product = normalizeProduct(r.product);
  const components = r.components || [];
  const vertical = r.vertical || '';
  return {
    key: r.key || ((typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : 'r' + (++seq) + '-' + Math.random().toString(36).slice(2, 7)),
    id: r.id || '',
    name: r.name || '',
    brand: r.brand || '',
    product,
    vertical,
    /* A creative can live in several verticals; the first is its primary. */
    verticals: (() => {
      const vs = (r.verticals || []).filter(Boolean);
      if (!vertical) return vs;
      return [vertical].concat(vs.filter(v => v !== vertical && v !== (r.verticals || [])[0]));
    })(),
    inGallery: r.inGallery !== false,
    components,
    goals: (r.goals && r.goals.length) ? r.goals : inferGoals(product, components, vertical),
    knownFor: r.knownFor || '',
    bestFor: r.bestFor || '',
    measure: r.measure || '',
    format: formatFor(product),
    mobileId: r.mobileId || '',
    source: r.source === 'zip' ? 'zip' : 'link',
    zipKey: r.zipKey || '', zipName: r.zipName || '',
    zipW: r.zipW || 0, zipH: r.zipH || 0,
    /* Per-ad framing nudge (share-page px) for units Captivate places off the usual spot. */
    cropDX: Number(r.cropDX) || 0, cropDY: Number(r.cropDY) || 0, cropDW: Number(r.cropDW) || 0,
    /* Optional Celtra creative ID: when set, previews render the bare ad instead of cropping the share page. */
    celtraId: String(r.celtraId || '').trim()
  };
}

/* Paste one tab, or every tab at once.

   Column order is read from a header row whenever one appears, so tabs whose
   columns differ still land correctly, and repeated headers mid-paste are
   handled rather than imported as rows.

   A line that carries no share URL but names a vertical becomes a section
   marker: every row after it inherits that vertical. That is what makes a
   single paste of the whole workbook work — type or paste the tab name above
   each block, or let the picker below supply one fallback for the lot.
-------------------------------------------------------------------*/

const DEFAULT_COLS = { brand: 0, product: 1, components: 2, knownFor: 3 };

function headerMap(cells) {
  const map = {};
  cells.forEach((c, i) => {
    const k = c.toLowerCase().replace(/[^a-z]/g, '');
    if (k === 'brand' || k === 'advertiser') map.brand = i;
    else if (k === 'adtype' || k === 'adproduct' || k === 'product') map.product = i;
    else if (k === 'components' || k === 'component') map.components = i;
    else if (k.indexOf('knownfor') === 0 || k === 'notes' || k === 'description') map.knownFor = i;
    else if (k.indexOf('campaigngoal') === 0 || k === 'goals' || k === 'goal' || k === 'objective' || k === 'objectives') map.goals = i;
  });
  return (map.brand !== undefined && (map.product !== undefined || map.components !== undefined))
    ? Object.assign({}, DEFAULT_COLS, map) : null;
}

function asVertical(name) {
  const k = String(name || '').toLowerCase().replace(/[^a-z]/g, '');
  if (!k) return '';
  const hit = VERTICALS.find(v => v.toLowerCase().replace(/[^a-z]/g, '') === k);
  if (hit) return hit;
  /* Tolerate the workbook's tab wording where it differs from ours. */
  const aliases = {
    restaurantsdining: 'Dining and QSR', qsr: 'Dining and QSR', dining: 'Dining and QSR',
    finance: 'Financial Services', financialservices: 'Financial Services',
    healthcarepharma: 'Healthcare', healthcareandpharma: 'Healthcare',
    lotterygaming: 'Lottery', lotteryandgaming: 'Lottery',
    travelhospitality: 'Travel & Tourism', travelandhospitality: 'Travel & Tourism',
    travel: 'Travel & Tourism', travelandtourism: 'Travel & Tourism',
    technologycommunications: 'Tech & Telecom', techtelecom: 'Tech & Telecom',
    mediaentertainment: 'Hospitality & Entertainment', governmentnonprofit: 'Government & Non-Profit',
    pharmabiotech: 'Pharma/Biotech', pharma: 'Pharma/Biotech',
    homeconstructionimprovements: 'Home Services', homeservices: 'Home Services',
    consumerservices: 'Consumer Services', seniorliving: 'Senior Living',
    pharmabiotech: 'Pharma/Biotech', hospitalityentertainment: 'Hospitality & Entertainment',
    education: 'Education', agriculture: 'Agriculture', automotive: 'Automotive',
    retail: 'Retail', sports: 'Sports', cpg: 'CPG', b2b: 'B2B'
  };
  return aliases[k] || '';
}

/* Free text from a Campaign Goals cell onto the canonical six. */
export function normalizeGoals(raw) {
  const parts = String(raw || '').split(/[,/|]/).map(s => s.trim()).filter(Boolean);
  const out = [];
  for (const p of parts) {
    const hit = CAMPAIGN_GOALS.find(g => g.toLowerCase() === p.toLowerCase());
    if (hit && out.indexOf(hit) === -1) out.push(hit);
  }
  return out;
}

export function parsePaste(text, fallbackVertical) {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const rows = [];
  const seen = {};
  let cols = DEFAULT_COLS;
  let vertical = fallbackVertical || '';

  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = (line.indexOf('\t') > -1 ? line.split('\t') : splitCsv(line)).map(c => c.trim());
    const filled = cells.filter(Boolean);
    if (!filled.length) continue;

    const header = headerMap(cells);
    if (header) { cols = header; continue; }

    const links = cells.filter(c => /shareablePreview/.test(c));
    if (!links.length) {
      /* No creative on this line — treat a lone cell as a tab/section name. */
      if (filled.length <= 2) {
        const v = asVertical(filled[0]);
        if (v) vertical = v;
      }
      continue;
    }

    const id = parseCreativeId(links[0]);
    if (!id || seen[id]) continue;
    seen[id] = true;

    const product = cells[cols.product] || 'Rich Media';
    rows.push(makeRow({
      brand: cells[cols.brand] || '',
      product,
      components: normalizeComponents(cells[cols.components]),
      goals: normalizeGoals(cells[cols.goals]),
      knownFor: cells[cols.knownFor] || '',
      id,
      mobileId: links[1] ? parseCreativeId(links[1]) : '',
      vertical: vertical || fallbackVertical || ''
    }));
  }
  return rows;
}

function splitCsv(line) {
  const out = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { q = !q; }
    else if (c === ',' && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

/* ---------------- seed ----------------
   Generated from the per-vertical workbooks: [Brand, Ad Type, Components,
   Creative ID]. Ad Type and Components are normalized on the way in, so the
   workbooks' own wording ("rich Media", "Display", "PIP CTV") maps onto the
   product and component lists without editing the sheets. Rows whose Desktop
   Link carried no shareablePreview id are omitted — a row with no creative
   cannot render a preview.
   The "Known for" column is intentionally dropped. */
const TABS = {
  'Agriculture': [
    ['BASF', 'RIch Media', 'Carousel', 'a89pu'],
    ['CLS', 'Rich Media', 'Video', 'mpdha'],
    ['CLS', 'Rich Media', 'Video', 'iiau01']
  ],
  'Automotive': [
    ['Chevy', 'Interactive Video', 'Form Fill', 'rsdx41'],
    ['Lincoln', 'Rich Media', 'Video, Custom Animation, Weather FX', 'uh9vu'],
    ['Lincoln', 'Rich Media', 'Carousel, Video', 'be7xl'],
    ['Lincoln', 'Rich Media', 'Video, Clickable Pop Ups', 'a2lb71'],
    ['Mazda', 'Rich Media', 'Dynamic, Video', 'ohvpf'],
    ['Chevy', 'Rich Media', 'Video, Carousel', 'oxljz'],
    ['Ford', 'Rich Media', 'Custom Animation', 'kaz6b'],
    ['Honda', 'Rich Media', 'Custom Animation, Weather FX, Video', 'gf58n'],
    ['Ford', 'Rich Media', 'Custom Animation', 'ck95b'],
    ['Honda', 'Rich Media', 'Video', 'cs87h'],
    ['Vita', 'Rich Media', 'Expandable', 'wbx8d'],
    ['Polestar', 'Rich Media', 'Custom Animation', 'g09j8'],
    ['Polestar', 'Rich Media', 'Custom Animation, Nearby, Video', 'cpfhc1'],
    ['Kia', 'Rich Media', 'Dynamic, Inventory', 'lbpjg1'],
    ['Kia', 'Interactive Video', 'Dynamic, Inventory', 'vd6tj'],
    ['Hyundai', 'AI Video', 'Automotive', 'ian251']
  ],
  'B2B': [
    ['CLS', 'Rich Media', 'Video', 'iiau01'],
    ['Digi International', 'Rich Media', 'Carousel', 'c31ns'],
    ['BCBS', 'Rich Media', 'Carousel', 'ojgnz'],
    ['BCBS', 'Rich Media', 'Carousel', 'az6ho'],
    ['Western Windows', 'Rich Media', 'Carousel', 'k4hxj1']
  ],
  'CPG': [
    ['Publix', 'Rich Media', 'Maps, Carousel', '1r1fh'],
    ['Godiva', 'Rich Media', 'Maps, Carousel', 'klog01'],
    ['Charlotte\'s Web', 'Rich Media', 'Maps, Carousel', 'kdshe'],
    ['Kate Somerville', 'Rich Media', 'Carousel', '0bhy91'],
    ['Nescae', 'Rich Media', 'Weather FX', 'gm23d1'],
    ['Butcher Box', 'Rich Media', 'Carousel, Custom Animation', '5qxj21'],
    ['Circle K', 'Rich Media', 'Dynamic', '3cdti1'],
    ['Nature Sweet', 'Rich Media', 'Carousel', 'c3hhs'],
    ['Mountain Dew', 'Rich Media', 'Custom Animation', '3uv3n1'],
    ['Dum Dum', 'Rich Media', 'Maps', '4dml11'],
    ['Bush\'s Beans', 'Rich Media', 'Carousel, Custom Animation', 'zznw01'],
    ['Chinet', 'rich Media', 'Video, Carousel', 's7rka'],
    ['Pepsi', 'RIch Media', 'Custom Animation, Weather FX, Video', 'hp5we'],
    ['Christie Cookie', 'OLV', 'Carousel', 'viy8h'],
    ['Christie Cookie', 'Display', '24', 'nkh521'],
    ['Hudsonville', 'CTV', 'QR Code, Overlay', 'qc5nm1'],
    ['The ordinary', 'CTV', 'QR Code, AI video', 'k1ybm1']
  ],
  'Consumer Services': [
    ['TVA', 'Rich Media', 'Carousel', '8b8gd1'],
    ['TVA', 'Rich Media', 'Carousel, Video', '87jrg'],
    ['TVA', 'Rich Media', 'Quiz', '875ll'],
    ['Entergy', 'Rich Media', 'Clickable Pop Ups', 'uojqn'],
    ['Entergy', 'Rich Media', 'Carousel', 'qlpdg1'],
    ['Instacart', 'Rich Media', 'Gamification', '0enqd1'],
    ['Factor Meals', 'Rich Media', 'Carousel', '2cy6s'],
    ['Dallas Fit', 'Rich Media', 'Dynamic', 'lfw2n'],
    ['Hertz Car Rental', 'Rich Media', '6', 'fqqpf1']
  ],
  'Dining and QSR': [
    ['McDonald\'s', 'Rich Media', '3D Carousel, App Download', 'o238j1'],
    ['Dairy Queen', 'Rich Media', 'Maps, App Download', 'idlic'],
    ['Dairy Queen', 'Rich Media', 'Maps, Carousel, App Download', 'g5d2v'],
    ['Red Robin', 'Rich Media', 'Maps', '4wdkx'],
    ['Papa Johns', 'Rich Media', 'Maps, Carousel', 'kg88f'],
    ['Perkins', 'Rich Media', 'Dynamic, Nearby', 'kk1c9'],
    ['Wendy\'s', 'Rich Media', 'Carousel, Maps', 'x3ivb'],
    ['Keeper\'s Heart Whiskey', 'Rich Media', 'Carousel, Maps, Clickable Pop Ups', 'sm8je1'],
    ['Mendocino Farms', 'Rich Media', 'Carousel, Maps', 'hncyp'],
    ['Checkers', 'Rich Media', 'Carousel, Maps', 'l65nb'],
    ['Church\'s Chicken', 'Rich Media', 'Maps, Clickable Pop Ups', 'xvmbj'],
    ['Griffin Claw Brewing', 'Rich Media', 'Custom Animation, Carousel', 'kkunj'],
    ['Tropical Smoothie', 'Interactive Video', 'QR Code', 'j2vw7'],
    ['Panera Bread', 'CTV', 'Overlay', 'xw6yq'],
    ['Dunkin Donuts', 'PIP CTV', 'PIP', '8vvin1'],
    ['McDonald\'s', 'Rich Media', 'Clickable Pop Ups', 'mo8cl'],
    ['McDonald\'s', 'Rich Media', 'Scroll to reveal', 'yhl8b1'],
    ['McDonald\'s', 'Rich Media', 'Video, Carousel', 'e2gws'],
    ['McDonald\'s', 'Rich Media', 'Custom Animation, Carousel', 'ctbzu'],
    ['McDonald\'s', 'Rich Media', '3D Carousel, Nearby', '4vgzl'],
    ['McDonald\'s', 'Rich Media', 'Carousel', 's6dgi1'],
    ['McDonald\'s', 'Rich Media', 'Custom Animation', 'm4yga1'],
    ['The Catfish Institute', 'Rich Media', 'Video, Clickable Pop Ups', 'qf3mk1'],
    ['Arby\'s', 'Rich Media', 'Custom Animation', '18vfd'],
    ['Arby\'s', 'Rich Media', 'Custom Animation, Clickable Pop Ups, Gamification', 'l0wnh'],
    ['Arby\'s', 'Rich Media', 'Dynamic, App Download', 'zl77d'],
    ['Ellianos Coffee', 'Rich Media', 'Maps, Nearby', 'p6ugg'],
    ['Sonny\'s BBQ', 'Rich Media', 'Carousel, Nearby', 'pff391'],
    ['Sonny\'s BBQ', 'OLV', 'Nearby', 'j4rvc'],
    ['Raising Cane', 'OLV', 'Gamification', '2zpbl']
  ],
  'Education': [
    ['Walsh College', 'Display', 'Banner', '4kdcd'],
    ['Arapahoe County College', 'Rich Media', 'Carousel', 'vtmg71'],
    ['University of Nebraska', 'Rich Media', 'Dynamic, Carousel', 'ko1p61'],
    ['Greater Atlanta Christian School', 'Rich Media', 'Flip Card, Carousel, Clickable Pop Ups', 'j7kw71'],
    ['CCS', 'Interactive Video', 'Clickable Pop Ups', 'fbx8y'],
    ['Quinnipiac University', 'Rich Media', 'Carousel', 'ojsub'],
    ['Accounting +', 'Rich Media', 'Custom Animation, Carousel', 'ejvca1'],
    ['Oakland Community College', 'Rich Media', 'Countdown', '1hql8'],
    ['DOD Civilian Careers', 'Rich Media', 'Carousel', 'hmtta1'],
    ['Rio Hondu College', 'Rich Media', 'Custom Animation, Maps, Clickable Pop Ups', '5z7ci1']
  ],
  'Financial Services': [
    ['First Financial Bank', 'Rich Media', 'Video, Maps', 'ycbza'],
    ['LGE Credit Union', 'Rich Media', 'Video, Maps', 'fp5th'],
    ['Certified Financial Planner', 'Rich Media', 'Custom Animation', '7r5vb'],
    ['First National Bank', 'Rich Media', 'Carousel', 'kgddu'],
    ['Paychex', 'Rich Media', 'Clickable Pop Ups', 'sqcb91'],
    ['Certified Financial Planner', 'Interactive Video', 'Clickable Pop Ups', 'mkafa'],
    ['Certified Financial Planner', 'Interactive Video', 'Clickable Pop Ups', '2h477'],
    ['BankPlus', 'Rich Media', 'Custom Animation, Maps', 'bz31h1'],
    ['Waco Bank', 'Rich Media', 'Carousel, Maps', 'hpxyj'],
    ['Waco Bank', 'Rich Media', 'Carousel, Nearby', 'hh58a1'],
    ['Coinflip', 'Rich Media', 'Carousel, Weather FX, Maps', 'oxj1w']
  ],
  'Government & Non-Profit': [
    ['Shift Idaho', 'Rich Media', 'Custom Animation', '3dvea'],
    ['National Parks Conservation Association', 'Rich Media', 'Clickable Pop Ups', '3gk9c1'],
    ['NHTSA', 'Interactive Video', 'Clickable Pop Ups', 'kuj9d1'],
    ['NHTSA', 'Rich Media', 'Custom Animation', 'i91f9'],
    ['American Cancer Society', 'Rich Media', 'Video, Carousel', 'nmo9h1'],
    ['Kidsave', 'Display', 'Banner', 'c5zuu'],
    ['Achievement Centers', 'Display', 'Carousel', 'otl49'],
    ['NHTSA', 'Interactive Video', 'Dynamic, Overlay', 'id0kb'],
    ['NHTSA', 'Rich Media', 'Custom Animation, Dynamic', 'qb5c21']
  ],
  'Healthcare': [
    ['Sidecar Health', 'Rich Media', 'Video', 'ozbqg'],
    ['University Hospital', 'Rich Media', 'Carousel, Clickable Pop Ups', 'xjpli'],
    ['Archwell', 'Interactive Video', 'Nearby', 'opew61'],
    ['Highmark Health', 'Interactive Video', 'Form Fill', 'ciyn41'],
    ['Ohio Medical Mutual', 'Interactive Video', 'Tap to Call', 'u7du61'],
    ['Childrens Hospital of Colorado', 'Rich Media', 'Countdown', 'x5uhn'],
    ['Summit Health Dental', 'Interactive Video', 'Nearby', 'lhgn51']
  ],
  'Home Services': [
    ['Cabinets to Go', 'Rich Media', 'Clickable Pop Ups', 'nxl5t'],
    ['Cabinets to Go', 'Rich Media', 'Video, Carousel', '486dg'],
    ['Cabinets to Go', 'Rich Media', 'Drag and Drop', '7h8uj'],
    ['ServPro', 'Rich Media', 'Video', 'f367j1'],
    ['Bielinski Homes', 'Rich Media', 'Carousel, Maps', '016fe1'],
    ['Southwind Flooring', 'Rich Media', 'Carousel, Maps', '4s3hp'],
    ['Meritage Homes', 'Rich Media', 'Carousel, Maps', 'tmd8y'],
    ['ServPro', 'Interactive Video', 'Carousel, Flip Card', '8k8411'],
    ['ServPro', 'Interactive Video', 'Scratch Off, Carousel', '4pzjo'],
    ['HorsePower Brands (Champion)', 'Rich Media', 'Dynamic', 'wbq751'],
    ['MI Windows', 'Rich Media', 'Carousel', 'mqwc61'],
    ['PGT Windows', 'Rich Media', 'AI video, Image stitcher', 'a5gf21'],
    ['Milgard Windows', 'Rich Media', 'Carousel, Weather FX', '2vay11']
  ],
  'Hospitality & Entertainment': [
    ['Holiday Senior Living', 'Rich Media', 'Dynamic, Carousel', '0f3r7'],
    ['Atria Senior Living', 'Rich Media', 'Video, Dynamic, Carousel', 'eekmg1'],
    ['Coterie Senior Living', 'Rich Media', 'Carousel, Flip Card', 'flndt'],
    ['Hard Rock Hotel Tampa', 'Rich Media', 'Video, Carousel', 'a244w'],
    ['Hard Rock Hotel Tampa', 'Rich Media', 'Video, Carousel, Maps', 'np1de'],
    ['Arizona Office of Tourism', 'Rich Media', 'Video, Carousel', 'rrtlw'],
    ['Hard Rock Hotel Tampa', 'Rich Media', 'Video, Dynamic', 'wiilm1'],
    ['Pure Michigan', 'Rich Media', 'Quiz', 'bzubj'],
    ['Kennedy Space Center', 'Rich Media', '3D Tilt', 'nohd9'],
    ['Kennedy Space Center', 'Rich Media', '3D Carousel', '2dksy'],
    ['Georgia Aquarium', 'Rich Media', 'Maps', 'zqicw'],
    ['South Walton Floriday', 'Rich Media', 'Custom Animation, Carousel', '8og2r'],
    ['Visit Starkville', 'Rich Media', 'Video, Carousel', 'fjglb1'],
    ['Travel Texas', 'Rich Media', 'Custom Animation, Video, Clickable Pop Ups', 'd1bbb1'],
    ['Tennessee', 'Rich media', 'Custom animation, carousel', 'si0te'],
    ['Florida Space Coast', 'Rich media', 'AI Image, Weather FX', 'gfmjr'],
    ['Hard Rock Brighton Bay', 'Rich media', 'AI image, carousel, maps', 'u00qi'],
    ['Hard Rock Tampa NFL', 'Rich media', 'Ai Image, Dynamic', '0rtjy'],
    ['Pandora', 'RIch Media', 'Video', '7pp7h'],
    ['HBO Max', 'Interactive Video', 'Custom Animation', 'nb8581'],
    ['Sirius XM', 'Interactive Video', 'Clickable Pop Ups', '3s6qm1'],
    ['HBO Max', 'RIch Media', 'Custom Animation', 'nguex'],
    ['Stub Hub', 'RIch Media', 'Custom Aniamation, Dynamic', 'nmfte'],
    ['Semihole Casino Coconut Creek', 'Rich media', 'Carousel, Custom Animation', 'c6rjk']
  ],
  'Lottery': [
    ['Kentucky Lottery', 'Rich Media', 'Weather FX, Jackpot, Dynamic, Video', 'avmoa'],
    ['Ohio Lottery', 'Rich Media', 'Carousel, Video, Maps, App Download', 'qb9md1'],
    ['Deleware Lottery', 'Rich Media', 'Scratch Off, Carousel, App Download', 'asn5q'],
    ['Florida Lottery', 'Rich Media', 'Dynamic, Jackpot, Maps', '8eeq41'],
    ['Kentucky Lottery', 'Rich Media', 'Nearby', '8uwwe1'],
    ['Nebraska', 'Rich Media', 'Dynamic, Jackpot', 'cxg8n'],
    ['Georgia Lottery', 'Rich Media', 'Gamification', 'av1a41'],
    ['Georgia Lottery', 'Rich Media', 'Gamification', '2cqn31'],
    ['Georgia Lottery', 'Rich Media', 'Gamification', 'wfeth'],
    ['Washington Lottery', 'Interactive Video', 'Dynamic', 'o972j1'],
    ['Michigan Lottery', 'Interactive Video', 'Carousel, App Download', 'mf47d1'],
    ['Kentucky Lottery', 'Rich Media', 'Dynamic, Jackpot', 'wz9051'],
    ['Kentucky Lottery', 'Rich Media', 'Video, Custom Animation, Countdown', 'pvq4b1'],
    ['Kentucky Lottery', 'Rich Media', 'Custom Animation, Weather FX', 'zqgpf1'],
    ['Kentucky Lottery', 'Rich Media', 'Custom Animation, Second Chance, Weather FX', '1b5d8'],
    ['Kentucky Lottery', 'CTV', 'Dynamic, Jackpot', 'jmqhn1'],
    ['Kentucky Lottery', 'Rich Media', 'Custom Animation, Switch', 'm0l5n1'],
    ['Arizona Lottery', 'Rich Media', 'Maps, Dynamic, Jackpot', 'd5ywo'],
    ['Deleware Lottery', 'Rich Media', 'Custom Animation', 'rqlvi'],
    ['Georgia Lottery', 'Rich Media', 'Gamification', '60nq11'],
    ['South Carolina Education Lottery', 'Rich Media', 'Custom Animation', '3trna1'],
    ['South Carolina Education Lottery', 'CTV', 'QR Code', '5nlgd'],
    ['Nebraska Lottery', 'Rich Media', 'Custom Animation, Maps', '38t4t'],
    ['CT Lottery', 'Rich Media', 'Dynamic, Jackpot, Countdown', 'pxsg01'],
    ['Paradises Florida Sports Coast', 'Rich media', 'Gamification', 'dpukz'],
    ['Paradises Florida Sports Coast', 'Rich media', 'Gamification', '5re6f1'],
    ['Maryland Lottery', 'Rich media', 'Custom Animation, Weather FX, Second Chance', '1h1sv'],
    ['Semihole Casino Coconut Creek', 'Rich media', 'Carousel, Custom Animation', 'c6rjk'],
    ['Idaho Lottery', 'Rich media', 'Trigger, Dynamic', 'wtvj71'],
    ['Wisconsin Lottey', 'Rich Media', 'Maps, Custom Animation', 'krppw'],
    ['Kentucky Lottery', 'Rich Media', 'Countdown', 'k7qd8'],
    ['Michigan Lottery', 'Rich Media', 'Custom Animation', 'wddmy'],
    ['CT Lottery', 'Rich Media', 'Custom Animation', 'wx23y'],
    ['CT Lottery', 'Rich Media', 'Custom Animation, Maps', '49jgb'],
    ['Virginia Lottery', 'Rich Media', 'Dynamic, Countdown, RSS feed', 'm7fim']
  ],
  'Pharma/Biotech': [
    ['Boston Scientifics', 'Rich Media', 'Scroll Disclaimers, Video', 'bz4cn1'],
    ['ED Cure', 'Rich Media', 'Scroll Disclaimers, Video, Maps', 'ky0v61'],
    ['ED Cure', 'Rich Media', 'Scroll Disclaimers, Video, Form Fill', 'fevm9'],
    ['CUVITRO', 'Rich Media', 'Scroll Disclaimers', 'bcjek']
  ],
  'Retail': [
    ['Toro', 'Rich Media', 'Video', 'kiqyo'],
    ['Bad Boy Mowers', 'Rich Media', 'Carousel, Video', 'k62b21'],
    ['Home Depot', 'Rich Media', 'Clickable Pop Ups', 'ubfkf1'],
    ['Aarons Rental', 'Rich Media', 'Video, Carousel', 'hh6zf1'],
    ['BDS', 'Display', 'Banner', '03wi31'],
    ['BDS', 'Rich Media', 'Clickable Pop Ups, Video', 'kry4g1'],
    ['Milanote', 'Rich Media', 'Slider', 'usr2a'],
    ['Sweetwater', 'Rich Media', 'Custom Animation', 'ruq841'],
    ['Uplift desk', 'Rich Media', 'Clickable Video', 'zlwe9'],
    ['Walmart', 'Rich Media', 'Carousel', 'arxz11'],
    ['Target', 'Rich Media', 'Carousel, Video', 'anfsg'],
    ['Cuup', 'Rich Media', 'Flip Card, Color Picker', 'd6g38'],
    ['Ecco', 'Rich Media', 'Carousel, Maps', 'c46x61'],
    ['Kate Sommerville', 'Rich Media', 'Carousel', '0bhy91'],
    ['TJ Maxx', 'Rich Media', 'GIF, Carousel', 'kqycz'],
    ['ibotta', 'Rich Media', 'App Download', '4mqap'],
    ['The North Face', 'Rich Media', 'Carousel, Maps, Dynamic', '429hz'],
    ['Shinola', 'Interactive Video', 'Overlay', 'jy9uo'],
    ['Gozney', 'Interactive Video', 'Carousel', 'fnckg'],
    ['Adidas', 'Interactive Video', 'Color Picker', 'bkvya'],
    ['Can-am', 'Interactive Video', 'Clickable Pop Ups', 'fztzm'],
    ['NFM', 'Rich Media', 'Countdown', 'st5eq'],
    ['Nebraska Furniture Mart', 'Dynamic CTV', 'QR Code', '6lomt'],
    ['Nordstrom', 'CTV', 'QR Code, Carousel', '0b6ic'],
    ['Capri Blue', 'Rich Media', 'Carousel, Inventory', 'px8sd1']
  ],
  'Senior Living': [
    ['Coterie', 'Rich Media', '360 Video, Pop Up Window', 'a300b'],
    ['Atria', 'Rich Media', 'Video, Flip Card', 'qfyhl1'],
    ['Coterie', 'Rich Media', 'Video', 'mo4v71'],
    ['Atria', '', 'Video, Flip Card', 'i5ps8']
  ],
  'Sports': [
    ['Stub Hub', 'RIch Media', 'Custom Animation, Dynamic', 'nmfte'],
    ['ESPN +', 'Rich Media', 'Custom Animation, Carousel', 'e83ag1'],
    ['Little Ceasars Arena', 'Rich Media', 'Weather FX', '49yby'],
    ['Pepsi', 'RIch Media', 'Custom Animation, Carousel', 'umjkx']
  ],
  'Tech & Telecom': [
    ['Bark Mobile', 'Rich Media', 'Weather FX, Clickable Pop Ups', 'akp5w'],
    ['Xfinity', 'Rich Media', 'Video, Coutndown', '8l2781'],
    ['Bark Mobile', 'Interactive Video', '9', 'lpill'],
    ['Carolina Wireless', 'Rich Media', 'Carousel, Maps', '2hefj']
  ]
};

/* Tourism-board creatives the workbook filed under Hospitality & Entertainment.
   Re-homed on the way in, so stored copies are corrected too. */
const TRAVEL_IDS = ['rrtlw', 'bzubj', '8og2r', 'fjglb1', 'd1bbb1', 'si0te', 'gfmjr'];
function rehome(r) {
  if (TRAVEL_IDS.indexOf(r.id) > -1 && r.vertical === 'Hospitality & Entertainment') {
    return Object.assign({}, r, { vertical: 'Travel & Tourism', goals: null });
  }
  return r;
}

export const SEED = Object.entries(TABS).flatMap(([vertical, rows]) =>
  rows.map(r => makeRow(rehome({
    brand: r[0], product: r[1], components: normalizeComponents(r[2]),
    id: r[3], vertical
  }))));

/* The shared Supabase library is the system of record. A local copy is kept
   only so the page paints instantly and still opens if the network is down. */
export const CLOUD_CACHE_KEY = 'kortx.creative.db.cloud';

export async function loadRemote() {
  const cloud = await import('./creative-cloud.js');
  const rows = (await cloud.fetchCreatives()).map(r => makeRow(r));
  try { localStorage.setItem(CLOUD_CACHE_KEY, JSON.stringify(rows)); } catch (e) { /* quota */ }
  return rows;
}

export async function saveRemote(rows) {
  const cloud = await import('./creative-cloud.js');
  await cloud.saveAll(rows);
}

export function load() {
  try {
    const cached = localStorage.getItem(CLOUD_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length) return parsed.map(r => makeRow(r));
    }
  } catch (e) { /* fall through */ }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed.map(r => makeRow(rehome(r)));
    }
  } catch (e) { /* fall through to seed */ }
  return SEED.slice();
}

export function save(rows) {
  try { localStorage.setItem(CLOUD_CACHE_KEY, JSON.stringify(rows)); } catch (e) { /* quota */ }
}

export function applyFilters(rows, { q, vertical, product, components }) {
  const needle = (q || '').trim().toLowerCase();
  return rows.filter(r => {
    if (vertical && (r.verticals && r.verticals.length ? r.verticals : [r.vertical]).indexOf(vertical) === -1) return false;
    if (product && r.product !== product) return false;
    if (components.length && !components.every(c => r.components.includes(c))) return false;
    if (needle) {
      const hay = [r.brand, r.name, r.zipName, r.id, r.celtraId, r.mobileId, r.knownFor, (r.components || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
      if (hay.indexOf(needle) === -1) return false;
    }
    return true;
  });
}
