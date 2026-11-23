/* KORTX Campaign Brief Intake: the form definition, shared by the Brief List read-only view.
   The public intake page was removed 2026-10-26; this copy is now the source of truth for reading existing briefs. */
const YN = ['Yes', 'No', 'Not sure'];
const GOALS = ['Awareness', 'Engagement', 'Product Discovery', 'Store Visits', 'Commerce', 'Lead Generation'];
const TACTICS = ['Display', 'Online Video / Preroll', 'Rich Media', 'Interactive Video', 'CTV', 'AI Video Production', 'Audio', 'Native', 'DOOH', 'Paid Social', 'Performance Max'];
const KPIS = ['Reach / Delivery', 'Viewability', 'Video Completion Rate', 'CTR', 'Site Visits', 'Leads', 'Conversions', 'ROAS', 'Foot Traffic'];

// t: text | email | url | area | dates | choice | multi
const SECTIONS = [
  { key: 'contact', title: 'Your Details', lede: 'Who we should follow up with about this brief.', core: [
    { key: 'contactName', label: 'Your Name', t: 'text', req: true, ph: 'First and last name' },
    { key: 'contactEmail', label: 'Email', t: 'email', req: true, ph: 'name@company.com' },
    { key: 'contactPhone', label: 'Phone', t: 'text', ph: 'Optional' },
    { key: 'contactRole', label: 'Title or Role', t: 'text', ph: 'Optional' }
  ] },
  { key: 'campaign', title: 'Campaign & Audience', lede: 'The brand, the budget, and who the campaign needs to reach.', core: [
    { key: 'advertiser', label: 'Advertiser Name', t: 'text', req: true },
    { key: 'agency', label: 'Agency Name', t: 'text', ph: 'If an agency is involved' },
    { key: 'campaignName', label: 'Campaign Name', t: 'text' },
    { key: 'objective', label: 'Campaign Objective', t: 'multi', req: true, opts: GOALS, help: 'Pick every goal that applies.', wide: true },
    { key: 'objectiveNotes', label: 'Objective Details', t: 'area', wide: true, ph: 'What should this campaign achieve, and why now?' },
    { key: 'budget', label: 'Total Campaign Budget', t: 'text', req: true, ph: '$' },
    { key: 'pricing', label: 'Rate/Pricing Requirement', t: 'text', ph: 'e.g. CPM cap, fixed rate, none' },
    { key: 'flight', label: 'Flight Dates', t: 'dates', req: true },
    { key: 'flighting', label: 'Flighting Schedule', t: 'choice', opts: ['Continuous', 'Pulsed', 'Front-Loaded', 'Not sure'], wide: true },
    { key: 'seller', label: 'Seller Name & Email', t: 'text', ph: 'Your KORTX contact, e.g. Sam Wilson, sam@kortx.io' },
    { key: 'audience', label: 'Target Audience', t: 'area', ph: 'Ages, interests, life stage, customer types' },
    { key: 'geo', label: 'Geo-Targeting', t: 'area', ph: 'National, states, DMAs, counties, ZIP codes, radius' },
    { key: 'crm', label: 'CRM / 1P Data Available?', t: 'choice', opts: YN },
    { key: 'pixel', label: 'Pixel / Tag Placement?', t: 'choice', opts: YN }
  ], more: [
    { key: 'advertiserUrl', label: 'Advertiser URL', t: 'url', ph: 'https://' },
    { key: 'vertical', label: 'Advertiser Vertical', t: 'text', ph: 'e.g. Healthcare, QSR, Government' },
    { key: 'dealType', label: 'Deal Type', t: 'choice', opts: ['Open Exchange', 'PMP', 'Programmatic Guaranteed', 'Not sure'], wide: true },
    { key: 'idealCustomer', label: 'Ideal Customer', t: 'area' },
    { key: 'restrictions', label: 'Hard Audience Targeting Restrictions?', t: 'area', ph: 'Anyone we must or must not reach' }
  ] },
  { key: 'kpi', title: 'KPIs, Conversions & Attribution', lede: 'How you will judge success, and what we can track.', core: [
    { key: 'primaryKpi', label: 'Primary Campaign KPI', t: 'multi', opts: KPIS, wide: true },
    { key: 'kpiTarget', label: 'Target KPI Value', t: 'text', ph: 'e.g. 70% viewability, $40 CPA' },
    { key: 'conversions', label: 'Conversion Events', t: 'area', help: 'What counts as a conversion, if anything.' }
  ], more: [
    { key: 'monthlyVolume', label: 'Expected Monthly Volume', t: 'text', ph: 'Leads, sales, or visits per month' },
    { key: 'tracking', label: 'Primary Tracking Method', t: 'text', ph: 'e.g. GA4, pixel, CRM' },
    { key: 'callTracking', label: 'Call Tracking', t: 'choice', opts: YN },
    { key: 'offline', label: 'Offline Conversion Imports', t: 'choice', opts: YN },
    { key: 'attribution', label: 'Attribution Model & Windows', t: 'text', ph: 'e.g. last touch, 30-day click' },
    { key: 'customAttr', label: 'Custom CRM/EMR/POS Attribution', t: 'area' }
  ] },
  { key: 'reporting', title: 'Reporting & Verification', lede: 'Where results live and who verifies them.', core: [
    { key: 'sourceTruth', label: 'Reporting Source of Truth', t: 'text', ph: 'e.g. KORTX Kampus, GA4, your ad server' },
    { key: 'adServer', label: '3P Ad Server', t: 'text', ph: 'e.g. CM360, none' },
    { key: 'verification', label: 'Any 3rd Party Verification?', t: 'choice', opts: YN, help: 'e.g. IAS, DoubleVerify' }
  ], more: [
    { key: 'reportExpect', label: 'Report Examples / Expectations', t: 'area', ph: 'Cadence, format, metrics you need to see' },
    { key: 'brandSafety', label: 'Brand Safety / Verification', t: 'choice', opts: YN },
    { key: 'footTraffic', label: 'Foot Traffic Measurement', t: 'choice', opts: YN },
    { key: 'brandLift', label: 'Brand Lift Study', t: 'choice', opts: YN },
    { key: 'reachFreq', label: 'Reach/Frequency Measurement', t: 'choice', opts: YN },
    { key: 'otherMeasure', label: 'Other 3P Measurement', t: 'text' }
  ] },
  { key: 'programmatic', title: 'Programmatic', lede: 'The channels you want to run and how the budget should move.', core: [
    { key: 'tactics', label: 'Tactics', t: 'multi', opts: TACTICS, wide: true, help: 'Pick every channel you want considered.' },
    { key: 'tacticBudgets', label: 'Budget by Tactic', t: 'area', wide: true, ph: 'Budget, CPM and impressions per tactic, e.g. Display $20K at $5.50 CPM; Snapchat $10K gross' },
    { key: 'addedValue', label: 'Added Value (AV)', t: 'area' },
    { key: 'curated', label: 'Using a Curated Package?', t: 'choice', opts: YN },
    { key: 'targeting', label: 'Targeting Approach', t: 'text', ph: '1P data, 3P data, contextual, modeled' },
    { key: 'budgetSplits', label: 'Hard Budget Splits?', t: 'choice', opts: YN },
    { key: 'freqCaps', label: 'Frequency Caps', t: 'text', ph: 'e.g. 3/day, 15/week' },
    { key: 'geoIsolation', label: 'Geo Budget Isolation', t: 'choice', opts: YN }
  ], more: [
    { key: 'dataPrefs', label: '3P Data Preferences', t: 'text' },
    { key: 'exclusions', label: 'Audience Exclusions', t: 'area' },
    { key: 'displaySizes', label: 'Display Sizes', t: 'text', ph: 'e.g. 300x250, 728x90, 300x600' },
    { key: 'videoAssets', label: 'Video Assets', t: 'text', ph: 'Lengths available, e.g. :06, :15, :30' },
    { key: 'richMedia', label: 'Rich Media / Interactive', t: 'area' },
    { key: 'dayparting', label: 'Dayparting / Time Zones', t: 'text' }
  ] },
  { key: 'context', title: 'Additional Context', lede: 'Anything else the strategy team should know.', core: [
    { key: 'notes', label: 'Additional Notes', t: 'area', wide: true, ph: 'Creative in development, past results, competitors, deadlines' }
  ] }
];
const ALL = SECTIONS.flatMap(s => [...s.core, ...(s.more || [])].map(f => Object.assign({ section: s.title }, f)));
const REQ = ALL.filter(f => f.req);
const fmtD = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : '';
const answerOf = (f, v) => {
  if (f.t === 'dates') return v.flightStart || v.flightEnd ? fmtD(v.flightStart) + ' – ' + fmtD(v.flightEnd) : '';
  const x = v[f.key];
  return Array.isArray(x) ? x.join(', ') : (x || '').trim();
};
const has = (f, v) => f.t === 'dates' ? !!(v.flightStart && v.flightEnd && v.flightEnd >= v.flightStart) : f.t === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v[f.key] || '').trim()) : !!answerOf(f, v);
// A step is complete when every required field in it is filled; steps with no required fields need at least one answer.
const stepDone = (sec, v) => { const fs = [...sec.core, ...(sec.more || [])], req = fs.filter(f => f.req); return req.length ? req.every(f => has(f, v)) : fs.some(f => has(f, v)); };


const SNAPSHOT = [['Advertiser', ['advertiser']], ['Agency', ['agency']], ['Total Budget', ['budget']], ['Flight Dates', ['flight']], ['Primary KPI', ['primaryKpi']], ['Tactics', ['tactics']], ['Geography', ['geo']], ['Landing Page / Pixel', ['advertiserUrl', 'pixel']]];
export { SECTIONS, ALL, SNAPSHOT, answerOf, fmtD };
