/* VA DMV proposal, five-tab layout.
   PER-PAGE TEMPLATE SLOTS (the Proposal Builder swaps only these):
     meta.heroMedia      { type: 'html' | 'image' | 'slot', src } — the top visual
     meta.clientLogo     path/URL to the client's logo
     meta.clientLogoPlate true when the logo is dark: sits on the glowing KORTX plate
     meta.galleryVertical Playground vertical preselected in the Creative tab's gallery
   Everything else (colors, type, layout) stays KORTX Creative Ecosystem. Reuses every section from
   proposal-vadmv.js and regroups them into the Creative Labs narrative:
   Intelligence → Media → Audience → Creative → Measurement. */
import base from './proposal-vadmv.js';

const all = {};
base.tabs.forEach(t => t.sections.forEach(s => { all[s.id] = s; }));
const pick = ids => ids.map(id => all[id]).filter(Boolean);

const tabs = [
  { key: 'media', label: 'Media Recommendation', sub: 'Four channels, one statewide flight, and one primary KPI per tactic, plus the path to launch.', sections: pick(['plan', 'mapping', 'next']) },
  { key: 'creative', label: 'Creative', sub: 'Real, live KORTX Captivate units, built in-house and split by generation.', sections: pick(['creative']) },
  { key: 'intelligence', label: 'KORTX Intelligence', sub: 'The problem, the Virginia market, and what the public record says about who is behind the wheel.', sections: pick(['overview', 'market']) },
  { key: 'audience', label: 'Audience & Data Strategy', sub: 'Two drivers, not one demo, and the third-party segments that find each of them.', sections: pick(['drivers', 'personas', 'targeting']) },
  { key: 'kampus', label: 'Kampus Reporting', sub: 'Implement, optimize and report, with every tactic visible in real time.', sections: pick(['measurement', 'kampus']) }
];

// Section CTAs that pointed at the old two-tab keys
const fix = (o) => { if (!o || !o.sec) return o; const t = tabs.find(x => x.sections.some(s => s.id === o.sec)); return t ? Object.assign({}, o, { tab: t.key }) : o; };
tabs.forEach(t => t.sections = t.sections.map(s => s.cta ? Object.assign({}, s, { cta: fix(s.cta) }) : s));

export default Object.assign({}, base, {
  meta: Object.assign({}, base.meta, {
    heroMedia: { type: 'html', src: 'assets/proposals/vadmv/hero.html' },
    clientLogo: 'assets/proposals/vadmv/logo.png',
    clientLogoPlate: true,
    galleryVertical: 'Government & Non-Profit',
    galleryTitle: 'View creatives from similar verticals',
    heroCtas: [
      { label: 'See the Recommendation', tab: 'media', sec: 'plan', primary: true },
      { label: 'Meet the Drivers', tab: 'audience', sec: 'drivers' }
    ]
  }),
  tabs
});
