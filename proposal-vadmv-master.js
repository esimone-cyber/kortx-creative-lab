/* VA DMV: MASTER PROPOSAL TEMPLATE.
   Every section a KORTX proposal can carry (from the Proposal Deck Master, Acadia / Pit Boss and
   Texas CASA decks), written for Virginia DMV. Proposals built by the skill keep this exact schema
   and drop the sections they don't need. Never re-theme, re-order within a tab, or invent new types.

   PER-PAGE SLOTS the Builder swaps: meta.heroMedia, meta.clientLogo, meta.clientLogoPlate,
   meta.galleryVertical, creative.dayparts[].img/live, any section.anatomy.img / adSlot.
   Each section's `tpl` = { use: 'Core' | 'Optional' | 'Conditional', when, src }, shown on the
   page only in Template mode, and the rule the skill follows when deciding whether to include it. */
import base from './proposal-vadmv.js';

const all = {};
base.tabs.forEach(t => t.sections.forEach(s => { all[s.id] = s; }));
const reuse = (id, tpl, extra) => Object.assign({}, all[id], extra || {}, { tpl });

const GENZ = 'The Always-On Commuter (Gen Z)';
const MILL = 'The Multitasking Parent (Millennial)';
const OK = { pill: 'Met', tone: 'ok' }, INC = { pill: 'Incremental', tone: 'wait' };

const tabs = [
  { key: 'overview', label: 'Overview', sub: 'The summary, the problem and the proof.', sections: [
    { id: 'exec', nav: 'Executive Summary', eyebrow: 'Overview', type: 'narrative',
      tpl: { use: 'Core', when: 'Every proposal. Five labeled bullets max, one per strategic pillar.', src: 'Acadia p.2' },
      headline: 'Executive summary',
      intro: 'KORTX recommends a statewide upper-funnel plan that interrupts the phone habit for Virginia drivers 20 to 49, with creative split by generation and one honest KPI per tactic.',
      lists: [{ title: 'The plan at a glance', items: [
        { b: 'Flighting:', t: 'Nov 2 to Dec 6, 2026, continuous and evenly paced across Thanksgiving travel and the front edge of holiday driving.' },
        { b: 'Creative formats:', t: 'Custom Rich Media and Online Video carry the message, Snapchat meets Gen Z in vertical sound-on video, and display holds statewide frequency.' },
        { b: 'Audience strategy:', t: 'Two personas, the Always-On Commuter and the Multitasking Parent, each built from third-party segments with a hard age gate between them.' },
        { b: 'Geography:', t: 'One statewide buy with county and city reporting for the 12 markets named in the brief.' },
        { b: 'Incremental option:', t: 'OTT/CTV, Programmatic Audio and Paid Search add $40,000 of reach across the Thanksgiving heavy-up.' }
      ] }] },
    reuse('overview', { use: 'Core', when: 'Every proposal. Problem, tension, how KORTX solves it.', src: 'Master p.2 · CASA p.2' }),
    { id: 'cases', nav: 'Case Studies', eyebrow: 'Case Studies', type: 'cases',
      tpl: { use: 'Optional', when: 'When comparable KORTX results exist. Two to four cards, result first.', src: 'Acadia p.22 · CASA p.3-5' },
      headline: 'Proof from comparable KORTX work',
      intro: 'Awareness that has to change behavior, measured honestly. These campaigns used the same formats and the same reporting discipline this plan relies on.',
      cases: [
        { client: 'Nebraska Furniture Mart', metric: '9.8x ROAS', metricLabel: '$30.88MM attributed online sales', title: 'Multi-market, measured cross-device', body: 'CTV extended with online video across four markets. 54% of conversions came on desktop after a mobile ad exposure, the handoff most attribution models miss.', tags: ['CTV', 'Online Video', 'Device Graph'] },
        { client: 'Multinational QSR', metric: '326,000', metricLabel: 'In-store visits, 156% above prior campaigns', title: 'Locator creative, proven by foot traffic', body: 'Cross-platform display and rich media with a dynamic store locator, plus a foot traffic study. Cost per visit fell 60% to $0.47.', tags: ['Rich Media', 'Display', 'Foot Traffic'] },
        { client: 'Cabinets To Go', metric: '8,000+', metricLabel: 'Conversions from interactive units', title: 'Rich media as the conversion format', body: 'Drag-and-drop product interaction made the range explorable inside the ad, so the story was told in the impression.', tags: ['Rich Media', 'Drag and Drop'] },
        { client: 'National Home Builder', metric: '$16', metricLabel: 'Cost per site action vs. $25 goal', title: 'Top performer out of 15 vendors', body: 'Custom audience segments against lifestyle and competitor content across four brands and 27 markets. Now a multi-year engagement.', tags: ['Custom Audiences', 'Display'] }
      ],
      facts: [
        { label: 'Client retention', value: '81%', note: 'Year over year.' },
        { label: 'Average client tenure', value: '4.5 yrs', note: 'Across KORTX accounts.' }
      ] },
    { id: 'howItWorks', nav: 'How It Works', eyebrow: 'How It Works', type: 'composed',
      tpl: { use: 'Optional', when: 'Explainers and process pages. One step per phase; click through.', src: 'Visualize containers' },
      headline: 'How a KORTX campaign comes together',
      intro: 'Six steps, one thread. Each step feeds the next, and every one is visible in Kampus.',
      process: { title: 'Intelligence to measurement', steps: [
        { title: 'Intelligence', body: 'We read the market, the category and the competitive set before a dollar is planned.', points: ['Market and audience trends', 'Competitive spend read', 'Opportunities ranked'] },
        { title: 'Audience', body: 'Personas become addressable segments built from first-party, contextual and third-party data.', points: ['Personas mapped to data', 'Lookalikes from site actions'] },
        { title: 'Context', body: 'Signals decide when and where the message runs: weather, time of day, dates, ZIP codes and language.', points: ['Live signal triggers', 'Brand-safe placements'] },
        { title: 'Creative', body: 'Rich media, video and dynamic variants are built for each persona and each signal.', points: ['Dynamic variants', 'Interactive formats'] },
        { title: 'Media', body: 'Every tactic has one job and one KPI, paced across the flight.', points: ['Full-funnel plan', 'Flighted to key dates'] },
        { title: 'Measurement', body: 'Live dashboards track pacing, outcomes and KPIs as campaigns run, not weeks after they end.', points: ['Nightly reporting in Kampus', 'Winners earn more budget'] }
      ] } }
  ] },

  { key: 'intelligence', label: 'KORTX Intelligence', sub: 'The opportunity, the market, and who is actually behind the wheel.', sections: [
    { id: 'opportunities', nav: 'Opportunities', eyebrow: 'KORTX Intelligence', type: 'summary',
      tpl: { use: 'Optional', when: 'Pitch-led proposals. Exactly four cards: Initiative, Concept, How, Outcome.', src: 'Master p.4' },
      headline: 'Virginia DMV opportunities',
      intro: 'One initiative, one idea, one way to bring it to life, and the outcome we hold ourselves to.',
      summary: [
        { k: 'Initiative', t: 'Make the phone-down choice automatic for Virginia’s highest-risk drivers.' },
        { k: 'Concept', t: '“Phone Down. Eyes Up.” Interrupt the habit before the drive, not after the crash.' },
        { k: 'How', t: 'Generation-split creative across rich media, video, display and Snapchat, timed to holiday travel.' },
        { k: 'Outcome', t: 'Statewide reach among drivers 20 to 49, with engagement visible by persona, county and channel.' }
      ] },
    reuse('market', { use: 'Core', when: 'Every proposal. Four verified stats, market and audience trends, sources cited.', src: 'Master p.5' }),
    { id: 'industry', nav: 'Industry Analysis', eyebrow: 'Industry / Market Analysis', type: 'lists',
      tpl: { use: 'Optional', when: 'When the vertical needs context. Four quadrants, three bullets each, plus a summary.', src: 'Master p.5' },
      headline: 'The four forces on this campaign',
      intro: 'Challenges, consumer trends, macro trends and opportunities, read for what they mean to a public-safety message in a crowded attention market.',
      lists: [
        { title: 'Challenges', items: [
          { b: 'Message fatigue.', t: 'Safety PSAs compete with entertainment for the same seconds, and familiar warnings get tuned out fast.' },
          { b: 'Belief without behavior.', t: '83% call handheld phone use dangerous, 66% admit doing it recently.' },
          { b: 'Platform review.', t: 'Some platforms treat government safety messaging as a social-issue category, which adds authorization steps before launch.' } ] },
        { title: 'Consumer Trends', items: [
          { b: 'The phone is the dashboard.', t: 'Navigation, music and rideshare apps keep eyes on the screen even without a text.' },
          { b: 'Paid to look.', t: 'Gig drivers face a direct trade-off between income and attention.' },
          { b: 'The car as private space.', t: 'Younger drivers reject messaging that reads as surveillance.' } ] },
        { title: 'Macro Trends', items: [
          { b: 'Hands-free since 2021.', t: 'Va. Code 46.2-818.2 made handheld use a primary offense with a $125 first fine.' },
          { b: 'Holiday road volume.', t: 'Thanksgiving travel, earlier sunsets and peak delivery all land in the flight.' },
          { b: 'Attention moved to streaming.', t: 'Short-form, ad-supported streaming and live environments now hold the 20 to 49 audience.' } ] },
        { title: 'Opportunities', items: [
          { b: 'Format-native creative.', t: 'Vertical for Gen Z, longer-form for parents, one message each.' },
          { b: 'Interaction over assertion.', t: 'Rich media that asks the driver to participate beats a static warning.' },
          { b: 'County-level proof.', t: 'Reporting cuts for the 12 brief markets, without fragmenting the buy.' } ] }
      ],
      takeawayLabel: 'Brand summary & actions',
      takeaway: 'DMV does not need more Virginians to agree. It needs a message that lands inside the moment of temptation, cut for each generation, and reported honestly enough to know which one worked.' },
    reuse('drivers', { use: 'Optional', when: 'Bridge into personas when the brief names a broad demo.', src: 'VA DMV v2' }),
    reuse('personas', { use: 'Core', when: 'Every proposal. One card per persona, two or three personas.', src: 'Master p.6, p.8' }),
    { id: 'personaSummary', nav: 'Persona Summary', eyebrow: 'Audience Persona Summary', type: 'lists',
      tpl: { use: 'Optional', when: 'When personas are dense. One short paragraph per lens, per persona.', src: 'Master p.7' },
      headline: 'Each driver in four lines',
      intro: 'The short version of each persona: how they behave, what they value, where they spend attention, and what that means for the plan.',
      lists: [
        { title: GENZ + ' · A20-29', items: [
          { b: 'Behavioral.', t: 'Checks notifications at red lights and treats the drive as dead time between messages.' },
          { b: 'Psychographics.', t: 'Values autonomy and authenticity. Rejects anything that sounds like a lecture.' },
          { b: 'Online habits.', t: 'Vertical, sound-on, short-form all day, live streaming at night.' },
          { b: 'Strategic guidance.', t: 'Snapchat and fast-hook video lead. Peer tone, consequence told plainly.' } ] },
        { title: MILL + ' · A30-49', items: [
          { b: 'Behavioral.', t: 'Runs logistics from the driver’s seat: pickups, schedules, work messages.' },
          { b: 'Psychographics.', t: 'Responsible, overextended, quietly guilty about the habit.' },
          { b: 'Online habits.', t: 'Facebook, YouTube, local news and connected TV after bedtime.' },
          { b: 'Strategic guidance.', t: 'Rich media and longer video lead. Family framing, one habit to adopt today.' } ] }
      ] },
    reuse('mapping', { use: 'Core', when: 'Every proposal with personas. High / Mod / Low per channel, plus a takeaway.', src: 'Master p.9' }),
    { id: 'video', nav: 'Video Consumption', eyebrow: 'Video Consumption', type: 'allocation',
      tpl: { use: 'Conditional', when: 'Only when video is 30%+ of the plan. Channel shares total 100%; social sub-breakdown optional.', src: 'Master p.10-11' },
      headline: 'Where Virginia drivers 20 to 49 watch',
      intro: 'How this audience splits its video time, which is how video dollars should split too. Linear TV is excluded from this analysis.',
      alloc: [
        { name: 'OTT/CTV', pct: 38, note: 'Ad-supported streaming is the dominant evening screen for both personas, with live sports and FAST channels over-indexing among men 20 to 34.' },
        { name: 'Social Media Video', pct: 34, note: 'Vertical, sound-on video is where Gen Z spends the most daily minutes, and where a three-second hook decides everything.' },
        { name: 'YouTube', pct: 28, note: 'Bridges both generations: short-form Shorts for Gen Z, longer stories that parents will finish if the opening earns it.' }
      ],
      subAllocTitle: 'Social media video, sub-breakdown',
      subAlloc: [{ name: 'TikTok', pct: 28 }, { name: 'Snapchat', pct: 26 }, { name: 'Instagram Reels', pct: 24 }, { name: 'Facebook Watch', pct: 17 }, { name: 'LinkedIn', pct: 5 }],
      note: 'Illustrative shares for the template. KORTX Intelligence generates final allocations from Nielsen, Pew and MRI-Simmons research for each proposal.' },
    { id: 'qualityScore', nav: 'Quality Score', eyebrow: 'Digital Advertising Audit', type: 'composed',
      tpl: { use: 'Optional', when: 'Audits and reads with a scored total and scored categories.', src: 'KORTX Intelligence reads' },
      headline: 'Where the program stands today',
      intro: 'Scored only on what is publicly observable. Select a category to see the finding behind it.',
      score: { title: 'KORTX Digital Advertising Quality Score', stamp: 'Illustrative for the template', total: 56, max: 100, tier: 'Emerging', ceiling: 85, ceilingTier: 'Strong',
        categories: [
          { label: 'Paid Media Presence', value: 12, max: 25, ceiling: 22, finding: 'Paid social is visible; search, CTV and display are not observable from outside.' },
          { label: 'Creative Quality and Variety', value: 14, max: 20, ceiling: 18, finding: 'Strong brand assets, but one message runs for every audience.' },
          { label: 'Website and Conversion Readiness', value: 11, max: 20, ceiling: 16, finding: 'The path works on mobile; the key action sits three taps deep.' },
          { label: 'Audience Strategy', value: 8, max: 15, ceiling: 13, finding: 'No persona-level targeting is visible in market.' },
          { label: 'Measurement and Attribution', value: 11, max: 20, ceiling: 16, finding: 'Site tags are present; offline outcomes are not connected.' }
        ] } },
    { id: 'competitiveSet', nav: 'Competitive Set', eyebrow: 'Competitive Set', type: 'composed',
      tpl: { use: 'Optional', when: 'Audits and reads with competitors, their spend and digital mix.', src: 'KORTX Intelligence reads' },
      headline: 'Who else is competing for attention',
      intro: 'Illustrative competitors for the template. Spend is disclosed where filings allow and modeled where they do not.',
      competitors: [
        { name: 'Your brand', hq: 'Richmond, Virginia', conf: 'Disclosed', self: true, stats: [{ k: 'Locations', v: '75' }, { k: 'Est. advertising', v: '$4M' }], note: 'Statewide service network.', src: 'Illustrative' },
        { name: 'Competitor A', hq: 'Arlington, Virginia', conf: 'Modeled', stats: [{ k: 'Locations', v: '210' }, { k: 'Est. advertising', v: '$9M to $16M' }, { k: 'Est. digital', v: '$5M to $10M' }], note: 'Value focused, heavy in search.', src: 'Illustrative' },
        { name: 'Competitor B', hq: 'Norfolk, Virginia', conf: 'Modeled', stats: [{ k: 'Locations', v: '140' }, { k: 'Est. advertising', v: '$6M to $11M' }, { k: 'Est. digital', v: '$3M to $6M' }], note: 'Fast growing across the coast.', src: 'Illustrative' }
      ],
      mix: { title: 'Digital mix', caption: 'Share of digital spend by channel', badge: 'Modeled · directional', channels: ['Paid Search', 'Paid Social', 'Cross-Platform Display', 'Rich Media', 'Online Video', 'OTT/CTV', 'Streaming Audio', 'DOOH'],
        rows: [{ label: 'Competitor A', values: [30, 18, 12, 4, 12, 14, 5, 5] }, { label: 'Competitor B', values: [42, 24, 12, 4, 8, 4, 3, 3] }], note: 'Illustrative for the template. Modeled from business model, category benchmarks and observable activity.' },
      findings: { found: 'Competitors lean on search and social; programmatic video and CTV are thin across the set.', mean: 'The channels that reach drivers before they search are open territory.', improve: 'Add OTT/CTV, Online Video and Rich Media geo-targeted around each location.', evidence: 'Illustrative' } },
    { id: 'beforeAfter', nav: 'With KORTX', eyebrow: 'What Changes', type: 'composed',
      tpl: { use: 'Optional', when: 'When the story is a before and after, or two options side by side.', src: 'Visualize containers' },
      headline: 'What changes with KORTX',
      intro: 'Toggle between the plan as it runs today and the plan KORTX recommends.',
      compare: { title: 'Today vs with KORTX', a: { label: 'Today', points: ['One message for every audience.', 'Reporting arrives after the flight ends.', 'Budget split by habit, not results.', 'Creative refreshed once a quarter.'] },
        b: { label: 'With KORTX', points: ['A message for each persona and signal.', 'Live dashboards while the campaign runs.', 'Budget moves to what is working, nightly.', 'Dynamic variants refresh themselves.'] } } }
  ] },

  { key: 'media', label: 'Media Recommendation', sub: 'The funnel, the plan, the flight and every channel in it.', sections: [
    { id: 'funnel', nav: 'Full-Funnel', eyebrow: 'Media Recommendation', type: 'funnel',
      tpl: { use: 'Core', when: 'Every proposal. Only the stages the plan actually buys.', src: 'Master p.13 · Acadia p.7' },
      headline: 'A funnel built for awareness',
      intro: 'Every channel has one job. Reach builds the message, interaction deepens it, and search catches the drivers who go looking.',
      funnel: [
        { stage: 'Awareness', channels: ['Snapchat', 'Online Video', 'OTT/CTV (Inc.)', 'Programmatic Audio (Inc.)'], role: 'Put the message in front of every driver 20 to 49, statewide.' },
        { stage: 'Consideration', channels: ['Custom Rich Media', 'Cross-Platform Display'], role: 'Make the driver interact with the risk, not just see it.' },
        { stage: 'Action', channels: ['Paid Search (Inc.)'], role: 'Route hands-free law and fine searches to DMV resources.' }
      ] },
    { id: 'details', nav: 'Campaign Details', eyebrow: 'Campaign Details', type: 'summary',
      tpl: { use: 'Core', when: 'Every proposal. Objective, Audience, Flight, Budget. Add tier cards when offering options.', src: 'Master p.16 · Acadia p.8-9 · CASA p.10' },
      headline: 'FY26 Distracted Driving',
      intro: 'The four facts every stakeholder needs, plus the incremental option.',
      summary: [
        { k: 'Objective', t: 'Statewide awareness that distracted driving is preventable' },
        { k: 'Audience', t: 'The Always-On Commuter, the Multitasking Parent' },
        { k: 'Flight', t: '11/2/26 to 12/6/26 · Thanksgiving heavy-up 11/16 to 12/6' },
        { k: 'Budget', t: '$85,000 base · $125,000 with incremental' }
      ],
      items: [
        { badge: 'Base', title: '$85,000', body: 'Custom Rich Media, Online Video, Cross-Platform Display and Snapchat, statewide for 35 days.', c: 'v', cl: 'Recommended', meta: [['Est. impressions', '8,735,894'], ['Added value', '185,000 bonus display impressions']] },
        { badge: 'Incremental', title: '$125,000', body: 'Adds OTT/CTV across the Thanksgiving heavy-up, Programmatic Audio for commute hours, and Paid Search for intent capture.', c: 'a', cl: 'Optional', meta: [['Adds', 'OTT/CTV $25,000 · Audio $10,000 · Search $5,000'], ['Why', 'Big-screen reach and the commute itself']] }
      ],
      note: 'Added value: estimated $5,000 across bonus impressions, rich media creation for both personas, and QA.' },
    reuse('plan', { use: 'Core', when: 'Every proposal. One row per tactic: targeting, budget, impressions, one KPI. No rate column in client copy.', src: 'VA DMV v2' }, {
      tables: [{
        title: 'Channel summary',
        cols: ['Tactic', 'Targeting groups', 'Budget', 'Est. impressions', 'Primary KPI'],
        grid: '1.2fr 1.8fr .8fr 1fr 1.1fr',
        rows: [
          ['Custom Rich Media', 'Both personas · Third-party', '$35,000', '3,888,889', { pill: 'CTR', tone: 'high' }],
          ['Online Video (Preroll)', 'Both personas · Third-party', '$20,000', '1,025,641', { pill: 'VCR', tone: 'high' }],
          ['Cross-Platform Display', 'Both personas · Third-party', '$20,000', '3,636,364', { pill: 'CTR', tone: 'high' }],
          ['Snapchat (Paid Social)', 'Both personas · Third-party', '$10,000', 'n/a', { pill: 'Awareness (Reach)', tone: 'high' }],
          ['Added Value Display', 'Follows top performer · Third-party', 'Bonus', '185,000', { pill: 'Delivery', tone: 'wait' }],
          ['Total', '2 personas, third-party segments', '$85,000', '8,735,894', { pill: 'CTR, VCR, Reach, Delivery', tone: 'ok' }]
        ],
        note: 'All tactics run VA statewide, 11/2/26 to 12/6/26. Snapchat is a managed service billed on gross; impressions are reported in platform once live and sit outside the impression total.'
      }]
    }),
    { id: 'approach', nav: 'Strategic Approach', eyebrow: 'KORTX Strategic Approach', type: 'platforms',
      tpl: { use: 'Core', when: 'Every proposal. One card per budgeted tactic: budget, three bullets.', src: 'Master p.14' },
      headline: 'What every dollar is doing',
      intro: 'Each tactic, its budget, and the role it plays in the plan.',
      platforms: [
        { tag: '$35,000', name: 'Custom Rich Media', bullets: ['Interactive units that make the driver participate in the risk, not just read it.', 'Generation-split copy and imagery under one build.', 'The plan’s engagement engine, optimized to CTR.'] },
        { tag: '$20,000', name: 'Online Video', bullets: [':06 and :15 for Gen Z, :15 and :30 for parents.', 'Pre-roll on brand-safe, ad-supported environments.', 'Optimized to completion rate.'] },
        { tag: '$20,000', name: 'Cross-Platform Display', bullets: ['Statewide frequency backbone across news, lifestyle and gaming.', 'Reaches rural counties demo targeting alone can miss.', 'Optimized to CTR, with added value riding the top group.'] },
        { tag: '$10,000', name: 'Snapchat', bullets: ['Vertical, sound-on video native to the Gen Z feed.', 'The strongest format fit for the Always-On Commuter.', 'Measured on awareness and reach.'] }
      ],
      takeawayLabel: 'Summary',
      takeaway: 'Four channels, each with one job and one KPI, so DMV knows exactly which part of the plan moved the number.' },
    { id: 'tactics', nav: 'Tactic Roles', eyebrow: 'KORTX Strategic Approach', type: 'table',
      tpl: { use: 'Optional', when: 'Plans with 5+ tactics. Funnel stage, KPI, audience strategy and a reason why per tactic.', src: 'Master p.15' },
      headline: 'Why each tactic is in the plan',
      intro: 'Funnel stage, KPI and the reason each tactic earns its place.',
      tables: [{ cols: ['Tactic', 'Funnel stage', 'KPI', 'Audience strategy', 'Our reason why'], grid: '1fr .8fr .7fr 1.1fr 2fr', rows: [
        ['Snapchat', 'Awareness', 'Reach', 'Gen Z persona', 'Native vertical video where Gen Z spends the most daily minutes.'],
        ['Online Video', 'Awareness', 'VCR', 'Both personas', 'Sight, sound and motion with a hook built for each generation.'],
        ['OTT/CTV', 'Awareness', 'VCR', 'Both personas', 'Big-screen reach during live sports and holiday streaming.'],
        ['Programmatic Audio', 'Awareness', 'LTR', 'Both personas', 'Reaches the driver during the commute itself, ears only, eyes on the road.'],
        ['Custom Rich Media', 'Consideration', 'CTR', 'Both personas', 'Interaction makes the risk personal rather than abstract.'],
        ['Cross-Platform Display', 'Consideration', 'CTR', 'Both personas', 'Steady statewide frequency that reinforces every other touchpoint.'],
        ['Paid Search', 'Action', 'Clicks', 'Keyword targeting', 'Catches drivers searching the hands-free law and routes them to DMV.']
      ], note: 'OTT/CTV, Programmatic Audio and Paid Search run in the incremental tier only.' }] },
    { id: 'flight', nav: 'Flighting', eyebrow: 'Flighting Flowchart', type: 'flight',
      tpl: { use: 'Core', when: 'Every proposal. Weeks or months as columns, one row per tactic, key dates marked.', src: 'Acadia p.10' },
      headline: 'Five weeks, one heavy-up',
      intro: 'Base tactics run the full flight. Incremental weight lands across Thanksgiving, when road volume peaks.',
      flight: {
        cols: ['Nov 2', 'Nov 9', 'Nov 16', 'Nov 23', 'Nov 30'],
        rows: [
          { name: 'Custom Rich Media', bars: [{ from: 0, to: 4, tone: 'core', label: '$35,000' }] },
          { name: 'Online Video', bars: [{ from: 0, to: 4, tone: 'core', label: '$20,000' }] },
          { name: 'Cross-Platform Display', bars: [{ from: 0, to: 4, tone: 'core', label: '$20,000' }] },
          { name: 'Snapchat', bars: [{ from: 0, to: 4, tone: 'core', label: '$10,000' }] },
          { name: 'Added Value Display', bars: [{ from: 2, to: 4, tone: 'heavy', label: 'Bonus 185K' }] },
          { name: 'OTT/CTV', bars: [{ from: 2, to: 4, tone: 'inc', label: 'Incremental · $25,000' }] },
          { name: 'Programmatic Audio', bars: [{ from: 0, to: 4, tone: 'inc', label: 'Incremental · $10,000' }] },
          { name: 'Paid Search', bars: [{ from: 0, to: 4, tone: 'inc', label: 'Incremental · $5,000' }] },
          { name: 'Key dates', bars: [{ from: 3, to: 3, tone: 'mark', label: 'Thanksgiving 11/26' }, { from: 4, to: 4, tone: 'mark', label: 'Flight ends 12/6' }] }
        ]
      } },
    { id: 'reach', nav: 'Reach & Scale', eyebrow: 'Reach & Scale', type: 'narrative',
      tpl: { use: 'Optional', when: 'When scale is a selling point. Three or four reach stats by tactic.', src: 'Acadia p.11' },
      headline: 'Enough scale to reach the whole state',
      intro: 'Estimated impressions by tactic across the 35-day base flight.',
      facts: [
        { label: 'Custom Rich Media', value: '3,888,889', note: 'Est. impressions across the full flight.' },
        { label: 'Cross-Platform Display', value: '3,636,364', note: 'Est. impressions across the full flight.' },
        { label: 'Online Video', value: '1,025,641', note: 'Est. impressions across the full flight.' },
        { label: 'Total', value: '8.7M', note: 'Including 185,000 added value.' }
      ] },
    { id: 'search', nav: 'Paid Search', eyebrow: 'Paid Search', type: 'platforms',
      tpl: { use: 'Conditional', when: 'Only when search is in the plan. Approach + one card per engine + keyword themes.', src: 'Master p.17-18, p.20-21' },
      headline: 'Catch the drivers who go looking',
      intro: 'When a driver searches the hands-free law or a fine, DMV should be the first answer.',
      approachTitle: 'Our Approach',
      approach: [
        { b: 'Capture high-intent demand:', t: 'Prioritize searches about the law, fines and safe phone setup.' },
        { b: 'Align messaging to need:', t: 'Match ad copy and the DMV landing page to each search.' },
        { b: 'Optimize toward qualified actions:', t: 'Refine keywords and bids toward resource visits.' },
        { b: 'Build a scalable foundation:', t: 'Search-term learnings inform future DMV campaigns.' }
      ],
      platforms: [
        { tag: 'Search leader', name: 'Google Ads', bullets: ['Search, Maps and partner inventory.', 'Text ads with sitelinks to the toolkit and the law.', 'Full control over match types and messaging.'] },
        { tag: 'Incremental reach', name: 'Microsoft Advertising', bullets: ['Bing, Yahoo and partners for incremental demand.', 'Often lower-cost clicks.', 'Skews toward older, desktop-heavy commuters.'] }
      ],
      publishersLabel: 'Example keyword themes',
      publishers: ['virginia hands free law', 'phone while driving fine va', 'distracted driving virginia', 'set up do not disturb while driving', 'texting and driving ticket'] },
    { id: 'social', nav: 'Paid Social', eyebrow: 'Paid Social', type: 'platforms',
      tpl: { use: 'Conditional', when: 'Only when social is in the plan. One card per platform used.', src: 'Master p.19, p.22-23' },
      headline: 'Social, platform by platform',
      intro: 'Snapchat leads in the base plan. The others are shown for scale if DMV extends social.',
      approachTitle: 'Our Approach',
      approach: [
        { b: 'Goal first:', t: 'Objective set to reach and video views before anything is built.' },
        { b: 'Audience strategy:', t: 'Age-gated persona targeting, Gen Z and Millennial never cross.' },
        { b: 'Creative alignment:', t: 'Vertical, sound-on, hook inside three seconds.' },
        { b: 'Ongoing optimization:', t: 'Placement and creative performance reviewed continuously.' }
      ],
      platforms: [
        { tag: 'In plan', name: 'Snapchat', bullets: ['Dominates reach among 13 to 34.', 'Full-screen vertical Snap Ads demand attention.', 'Measured on awareness and reach.'] },
        { tag: 'Extension', name: 'Meta', bullets: ['Feed, Reels and Stories reach the Multitasking Parent.', 'Social-issue authorization may apply to DMV.', 'Strong for longer family-framed video.'] },
        { tag: 'Extension', name: 'TikTok', bullets: ['For You Page reaches by interest, not followers.', 'Creator-style hooks outperform polished spots.', 'Strong Gen Z discovery.'] },
        { tag: 'Extension', name: 'YouTube', bullets: ['Lean-in viewing, skippable and non-skippable.', 'Shorts for Gen Z, in-stream for parents.', 'Bridges both personas.'] }
      ] },
    { id: 'ctv', nav: 'OTT/CTV', eyebrow: 'OTT/CTV · Incremental', type: 'platforms',
      tpl: { use: 'Conditional', when: 'When CTV is in the plan. Add the publisher list and a spot frame.', src: 'Master p.24-25 · Acadia p.15 · CASA p.13' },
      headline: 'Big-screen reach across Thanksgiving',
      intro: 'OTT/CTV adds weight from November 16, when holiday travel and live football streaming both peak. KORTX manages every step, from planning to reporting.',
      approachTitle: 'Key Advantages',
      approach: [
        { b: 'End-to-end support:', t: 'Research, planning, activation and measurement through KORTX managed service.' },
        { b: 'Reaching men:', t: 'Live sports and FAST channels put DMV in front of men 20 to 34 at scale.' },
        { b: 'Brand safe by design:', t: 'News and political content excluded, with frequency caps.' },
        { b: 'Transparent reporting:', t: 'Reach, frequency and completion visible in Kampus.' }
      ],
      platforms: [
        { tag: 'Inventory', name: 'Live Sports', bullets: ['NFL Thanksgiving and college football weekends.', 'Highest co-viewing of the flight.'] },
        { tag: 'Inventory', name: 'FAST Channels', bullets: ['Free ad-supported streaming at efficient prices.', 'Strong with younger, cord-free households.'] }
      ],
      publishersLabel: 'Example publishers from brand-safe open inventory',
      publishers: ['Hulu', 'Peacock', 'Paramount+', 'Roku', 'Pluto TV', 'Tubi', 'Fox Sports', 'Samsung TV Plus'],
      adSlot: { id: 'vadmv-ctv-spot', ratio: '16 / 9', placeholder: 'Drop a :15 / :30 CTV spot frame' } },
    { id: 'audio', nav: 'Programmatic Audio', eyebrow: 'Programmatic Audio · Incremental', type: 'platforms',
      tpl: { use: 'Conditional', when: 'When audio is in the plan. Inventory categories + example sources.', src: 'Master p.26' },
      headline: 'Reach drivers while they drive',
      intro: 'Audio is the one channel that reaches the driver during the commute without asking for their eyes.',
      approachTitle: 'Our Approach',
      approach: [
        { b: 'Programmatic audio:', t: 'Music, talk, live sports and podcasts across every device.' },
        { b: 'Audience-first targeting:', t: 'The same persona segments, applied to listeners.' },
        { b: 'Commute dayparting:', t: 'Weighted to 6 to 9 AM and 4 to 7 PM.' },
        { b: 'Transparent reporting:', t: 'Listen-through rate in Kampus.' }
      ],
      platforms: [
        { tag: 'Category', name: 'Music Streaming', bullets: ['Where Gen Z listens in the car.'] },
        { tag: 'Category', name: 'Podcasts', bullets: ['Long commutes, high attention.'] },
        { tag: 'Category', name: 'Live Sports & Talk', bullets: ['Holiday football on the drive home.'] }
      ],
      publishersLabel: 'Example audio inventory sources',
      publishers: ['Spotify', 'iHeartRadio', 'Pandora', 'SoundCloud', 'Audacy'] },
    { id: 'safety', nav: 'Brand Safety', eyebrow: 'Brand Safety', type: 'lists',
      tpl: { use: 'Optional', when: 'Government, healthcare, finance, or any RFP that asks.', src: 'Acadia p.12' },
      headline: 'Only the most suitable environments',
      intro: 'A multi-layered framework: pre-bid protection, human oversight and custom exclusions, so DMV never appears next to content it would not choose.',
      lists: [{ title: 'Our commitment to brand safety', items: [
        { t: 'Full transparency and placement-level reporting, with dashboard access.' },
        { t: 'News and political content excluded across every tactic.' },
        { t: 'Negative keyword targeting to block explicit content.' },
        { t: 'Allow list and block list support with no limits on domains, apps or channels.' },
        { t: 'Written confirmation of GDPR and CCPA compliance.' },
        { t: 'Frequency caps to avoid fatigue and complaints.' },
        { t: 'AdChoices icon and a visible close button on every high-impact unit.' },
        { t: 'No placements with public comment boxes next to the ad.' }
      ] }] },
    { id: 'pathBuilder', nav: 'Build the Plan', eyebrow: 'How We Launch', type: 'composed',
      tpl: { use: 'Optional', when: 'When the client should learn a KORTX process hands on. Stages written in the correct order.', src: 'Visualize containers' },
      headline: 'Put the launch in order',
      intro: 'Drag the five stages into the order KORTX runs them. Tap a card on a phone.',
      builder: { title: 'Launch sequence', stages: [
        { title: 'Plan', body: 'Objective, audience, flight and one KPI per tactic.' },
        { title: 'Build', body: 'Segments, creative variants and tracking set up and tested.' },
        { title: 'Launch', body: 'Every tactic goes live on the same day, verified.' },
        { title: 'Optimize', body: 'Nightly reads move budget to the winners.' },
        { title: 'Report', body: 'Kampus shows outcomes as they happen.' }
      ] } }
  ] },

  { key: 'audience', label: 'Audience & Data Strategy', sub: 'How we find each driver, and what we could add with first-party data.', sections: [
    { id: 'method', sub: 'Targeting', nav: 'Methodology', eyebrow: 'Audience & Data Strategy', type: 'layers',
      tpl: { use: 'Core', when: 'Every proposal. One tile per data source in play; phase-two sources marked.', src: 'Master p.28-29 · Acadia p.18 · CASA p.16' },
      headline: 'Targeting methodology',
      intro: 'Third-party segments carry the base plan. First-party and modeled audiences join the moment DMV places a pixel.',
      layers: [
        { kind: '3p', k: 'Third-Party', title: GENZ, body: 'Young drivers, daily commuters, rideshare app users and heavy texters.' },
        { kind: '3p', k: 'Third-Party', title: MILL, body: 'Working parents, after-school sports parents and minivan owners.' },
        { kind: '1p', k: 'First-Party · Phase 2', title: 'Site Visitors', body: 'Visitors to DMV distracted-driving pages, retargeted with the next message.' },
        { kind: 'model', k: 'Modeled · Phase 2', title: 'Lookalikes', body: 'New drivers who resemble the most engaged visitors.' }
      ] },
    Object.assign(reuse('targeting', { use: 'Core', when: 'Every proposal. Example taxonomies per persona, full path with the segment name bolded.', src: 'Master p.30-32 · Acadia p.19' }), { sub: 'Targeting' }),
    { id: 'geo', sub: 'Targeting', nav: 'Geo-Targeting', eyebrow: 'Geo-Targeting Methodology', type: 'narrative',
      tpl: { use: 'Conditional', when: 'When geography shapes the buy (retail footprint, priority markets, ZIP lists).', src: 'Acadia p.17' },
      headline: 'Statewide delivery, local proof',
      intro: 'The buy stays statewide for scale. The 12 markets named in the brief get their own reporting cuts.',
      steps: ['Define the audience', 'Index all 133 localities', 'Flag the 12 brief markets', 'Report county by county'],
      facts: [
        { label: 'Localities covered', value: '133', note: 'Every Virginia county and independent city.' },
        { label: 'Priority markets', value: '12', note: 'Named in the brief, broken out in Kampus.' },
        { label: 'Isolated budgets', value: '0', note: 'No stranded spend in low-density inventory.' }
      ] },
    { id: 'firstparty', sub: 'First-party data', nav: 'First-Party', eyebrow: 'First-Party Targeting · Phase 2', type: 'narrative',
      tpl: { use: 'Conditional', when: 'When a pixel or GTM access is possible. Show the event ladder.', src: 'Master p.33 · Acadia p.20 · CASA p.18' },
      headline: 'What a DMV pixel would unlock',
      intro: 'Not in the base plan. If DMV places the KORTX tag on its distracted-driving pages through Google Tag Manager, the campaign can learn as it runs.',
      steps: ['Page View', 'Toolkit Click', 'Pledge Signup', 'Share'],
      lists: [{ title: 'Process summary', items: [
        { t: 'DMV places the KORTX tag through Google Tag Manager.' },
        { t: 'The tag records page views, toolkit clicks and pledge signups.' },
        { t: 'Visitors are grouped by how far they went.' },
        { t: 'Media re-engages the curious, suppresses those who pledged, and models lookalikes.' }
      ] }] },
    { id: 'conversion', sub: 'First-party data', nav: 'Conversion Points', eyebrow: 'First-Party Data & Conversion Strategy', type: 'narrative',
      tpl: { use: 'Conditional', when: 'Lead-gen or site-action goals. Conversion points + CPA benchmark ranges.', src: 'Master p.34' },
      headline: 'The actions worth counting',
      intro: 'If the campaign moves beyond awareness, these are the site actions closest to a changed habit.',
      lists: [{ title: 'Key online conversion points', items: [
        { b: 'Pledge signup', t: 'on a paid-media landing page.' },
        { b: 'Toolkit download', t: 'on the Highway Safety Office page.' },
        { b: 'Hands-free law page view', t: 'with 30+ seconds of engagement.' }
      ] }],
      tables: [{ title: 'Typical benchmarks', cols: ['Site action', 'Cost per action range'], grid: '2fr 1fr', rows: [
        ['Pledge signup', '$18 to $32'], ['Toolkit download', '$12 to $24'], ['Engaged law page view', '$3 to $7'], ['Blended primary site actions', '$8 to $16']
      ], note: 'Template placeholder ranges. Replace with KORTX benchmark data for the vertical. Actual costs vary by budget, targeting and conditions.' }] },
    { id: 'crm', sub: 'First-party data', nav: 'CRM Activation', eyebrow: 'Activating CRM Data', type: 'narrative',
      tpl: { use: 'Conditional', when: 'When the client has a CRM list of 10k+ records it may legally use.', src: 'Master p.35' },
      headline: 'CRM activation, with limits',
      intro: 'KORTX onboards CRM lists securely through LiveRamp. For DMV, driver records are protected under the federal Driver’s Privacy Protection Act, so activation is limited to opt-in lists such as safety newsletter subscribers.',
      steps: ['Onboard', 'Match', 'Activate'],
      facts: [
        { label: 'Minimum records', value: '10,000', note: 'Required for a usable match.' },
        { label: 'Steps to activate', value: '3', note: 'Onboard, match and activate. Pricing confirmed at kickoff.' }
      ] },
    { id: 'signalsHub', sub: 'Signals', nav: 'Signals', eyebrow: 'Signals', type: 'composed',
      tpl: { use: 'Optional', when: 'Dynamic creative or an ecosystem around one idea. Three to eight items.', src: 'Visualize containers' },
      headline: 'The signals that change the creative',
      intro: 'Select a signal to see how it changes the message a driver sees.',
      orbit: { center: 'Dynamic creative', title: 'Signal', items: [
        { label: 'Temperature', title: 'Temperature', body: 'Rain, snow or heat switches the headline to the risk on the road that day.' },
        { label: 'Time of day', title: 'Time of day', body: 'Commute hours get the short, direct message; evenings get the longer story.' },
        { label: 'Dates', title: 'Key dates', body: 'Holiday travel weekends carry a countdown and the heaviest weight.' },
        { label: 'ZIP codes', title: 'ZIP codes', body: 'Local road names and county stats make the message feel close to home.' },
        { label: 'Languages', title: 'Languages', body: 'Spanish-language variants run where the audience prefers them.' }
      ] } }
  ] },

  { key: 'creative', label: 'Creative', sub: 'Live units, how they work, and how they get made.', sections: [
    reuse('creative', { use: 'Core', when: 'Every proposal. Only the brand’s own ads print.', src: 'VA DMV v2' }),
    { id: 'anatomy', nav: 'Rich Media', eyebrow: 'Custom Rich Media', type: 'anatomy',
      tpl: { use: 'Core', when: 'When rich media is in the plan. One annotated unit, four to six callouts.', src: 'Master p.37 · Acadia p.13 · CASA p.11' },
      headline: 'What every part of the unit does',
      intro: 'Hover a callout to find it on the unit.',
      anatomy: { img: 'assets/proposals/vadmv/unit-speeding.jpg', slot: 'vadmv-anatomy-rm', ratio: '300 / 600', width: 300, placeholder: 'Drop a 300×600 rich media unit',
        callouts: [
          { k: 'Prominent headline', v: 'One line the driver can read in under two seconds.', x: 50, y: 12 },
          { k: 'Consequence imagery', v: 'Real stakes, shown plainly. Swappable per persona.', x: 50, y: 42 },
          { k: 'Interactive tray', v: 'Flip card, carousel or drag and drop, so the driver participates.', x: 50, y: 66 },
          { k: 'Branding', v: 'DMV and Highway Safety Office lockup, always visible.', x: 50, y: 82 },
          { k: 'CTA', v: '“Phone Down. Eyes Up.” to the DMV resource page.', x: 50, y: 92 }
        ] } },
    { id: 'olv', nav: 'Interactive Video', eyebrow: 'Interactive Online Video', type: 'narrative',
      tpl: { use: 'Optional', when: 'When OLV is in the plan. Six functionality options as tabs.', src: 'Master p.41 · Acadia p.14' },
      headline: 'Six ways to make video interactive',
      intro: 'KORTX creative production is included as added value. Serving options include 1P (MP4) and 3P (VAST).',
      details: [
        { k: 'Overlay', v: 'A headline and CTA layered over the spot, so the message survives sound-off viewing.' },
        { k: 'Carousel', v: 'Three habits to adopt, one per card: set navigation, silence notifications, phone in the glovebox.' },
        { k: 'Borders', v: 'A branded frame that holds the DMV lockup for the full length of the spot.' },
        { k: 'QR / Shoppable', v: 'A QR code that opens the pledge or the do-not-disturb setup guide.' },
        { k: 'Hotspots', v: 'Tap the phone, the mirror or the passenger to see what each distraction costs.' },
        { k: 'Form', v: 'A one-field pledge captured inside the unit, no landing page needed.' }
      ] },
    { id: 'pip', nav: 'Interactive CTV', eyebrow: 'Interactive CTV · Picture-in-Picture', type: 'anatomy',
      tpl: { use: 'Conditional', when: 'When interactive CTV or clickable OLV is in the plan.', src: 'Master p.38-39' },
      headline: 'Picture-in-picture during live sports',
      intro: 'Video skins built at no charge by KORTX. Serving options include 1P (MP4) and 3P (VAST).',
      anatomy: { slot: 'vadmv-anatomy-pip', ratio: '16 / 9', width: 560, placeholder: 'Drop a picture-in-picture CTV frame',
        callouts: [
          { k: 'Live broadcast', v: 'The game keeps playing, so the viewer never leaves.', x: 36, y: 40 },
          { k: 'DMV spot', v: 'The :15 runs in a framed window beside the action.', x: 80, y: 32 },
          { k: 'QR code', v: 'Opens the do-not-disturb setup guide on the viewer’s phone.', x: 84, y: 76 },
          { k: 'Branded skin', v: 'Holds the message for the full ad break.', x: 40, y: 88 }
        ] } },
    { id: 'ixDynamic', nav: 'Dynamic Selector', eyebrow: 'Dynamic Selector', type: 'interactive', interactive: 'dynamic',
      tpl: { use: 'Conditional', when: 'Only when the strategist selects the Dynamic selector in Step 2. One trigger dropdown, one option per selected ad, glowing rectangles on the elements that change.', src: 'Creative Playground' },
      headline: 'Change the conditions. See the creative respond.',
      intro: 'Pick a condition and watch the unit change. Each option serves the ad built for that moment, with the changed elements outlined.',
      takeawayLabel: 'For Virginia DMV',
      takeaway: 'Commute dayparts swap the headline and visual, so the message lands when drivers are most likely to reach for a phone.',
      ix: { trigger: 'time', variants: [
        { ad: 'ad1', value: 'Morning', changed: 'The morning unit leads with the commute and a coffee cup visual.', why: 'Morning commutes are when drivers check messages most, so the reminder meets the habit.', measure: 'Viewability and completion rate for the morning version.', glow: ['headline', 'image'] },
        { ad: 'ad2', value: 'Evening', changed: 'The evening unit swaps to a darker scene and a headline about getting home.', why: 'Evening drives carry fatigue and dinner plans, a second peak for distraction.', measure: 'Viewability and completion rate for the evening version.', glow: ['headline', 'image', 'background'] }
      ] } },
    { id: 'ixScrubber', nav: 'Multi-Ad Scrubber', eyebrow: 'Multi-Ad Scrubber', type: 'interactive', interactive: 'scrubber',
      tpl: { use: 'Conditional', when: 'Only when the strategist selects the Multi-Ad Scrubber in Step 2 and selected two or more ads. One note per ad.', src: 'Creative Playground' },
      headline: 'Explore your custom branded mockups.',
      intro: 'Scrub through the multiple ads to explore the reasoning behind the mockups.',
      takeawayLabel: 'For Virginia DMV',
      takeaway: 'Each unit gives drivers something to do, and every completed interaction reports as engagement in Kampus.',
      ix: { items: [
        { ad: 'ad1', eyebrow: 'Interactive Rich Media', title: 'Swipe to put the phone down.', sub: 'A swipe gesture turns the safety message into an action.', instruction: 'Swipe the phone off the screen to reveal the message.', concept: 'A swipe mirrors the behavior the campaign asks for.', why: 'Doing the action makes the message stick.', measure: 'Swipe starts, completed swipes and time in unit.' },
        { ad: 'ad2', eyebrow: 'Interactive Rich Media', title: 'Tap to see the real cost.', sub: 'A tap reveals the fine for handheld use in Virginia.', instruction: 'Tap the card to flip it.', concept: 'A flip card pairs the habit with its consequence.', why: 'A concrete number lands harder than a warning.', measure: 'Taps, flips and clicks to the DMV page.' }
      ] } },
    { id: 'ixBuilder', nav: 'Drag and Drop Ad Builder', eyebrow: 'Drag and Drop Ad Builder', type: 'interactive', interactive: 'builder',
      tpl: { use: 'Conditional', when: 'Only when the strategist selects the Drag and Drop ad builder in Step 2. Build from six elements, then Remix cycles the selected ads.', src: 'Creative Playground' },
      headline: 'Play with your brand elements.',
      intro: 'Explore the elements of your branded mockups and the reasoning behind the creative choices.',
      takeawayLabel: 'For Virginia DMV',
      takeaway: 'We build every DMV unit from one asset kit and shift delivery to the layout with the strongest completion rate.',
      ix: { eyebrow: 'Drag, drop and remix', title: 'See how one asset kit becomes every DMV unit.', body: 'Assemble six creative elements, then remix them into the finished ads. KORTX tests layouts in flight and keeps the one that performs.', buildLabel: 'Build it, then compare.', buildNote: 'Drag all six elements onto the ad. Once the build is complete, press Remix to cycle through the ads.', layouts: [{ ad: 'ad1', name: 'Morning commute' }, { ad: 'ad2', name: 'Evening drive' }] } },
    { id: 'services', nav: 'Creative Services', eyebrow: 'KORTX Creative Services', type: 'table',
      tpl: { use: 'Optional', when: 'When KORTX produces creative. Timeline + asset requirements.', src: 'CASA p.23' },
      headline: 'How the creative gets made',
      intro: 'In-house production, on a timeline built back from launch.',
      tables: [
        { title: 'Production timeline', cols: ['Step', 'Timing'], grid: '1fr 3fr', rows: [
          ['Kick-off call', 'Week of Oct 12, at least 3 weeks before launch, once the IO is signed.'],
          ['Asset delivery', 'DMV provides creative assets by Oct 19.'],
          ['Asset review', 'KORTX reviews within 24 hours and requests anything missing.'],
          ['Production', 'Desktop mockups within 4 business days, then mobile and animation.'],
          ['Revisions', 'Within 48 hours of feedback. Tags implemented at this stage.'],
          ['Creative audit', 'Up to 48 hours of final QA before launch.'],
          ['Final delivery', 'All units and links delivered by Oct 28.']
        ] },
        { title: 'Creative asset requirements', cols: ['Asset', 'Spec'], grid: '1fr 3fr', rows: [
          ['PSD layouts', '300x600 and 300x250 for rich media · 1920x1080 for video · 300x600, 300x250, 160x600, 728x90, 320x50 for banners.'],
          ['Raw images', 'SVG logos, PNG images.'],
          ['Raw video', '1920x1080, :15, :30 or :60. .MOV or .MP4 (H.264).'],
          ['Font files', 'TTF, OTF or WOFF.'],
          ['Brand guidelines', 'Colors, copy and layout rules.'],
          ['Links', 'Destination URLs and UTM trackers.']
        ] }
      ] },
    { id: 'creativeBenefits', nav: 'What We Build', eyebrow: 'Creative Services', type: 'composed',
      tpl: { use: 'Optional', when: 'Benefits or capability pages. Four to six cards; drop in images when you have them.', src: 'Visualize containers' },
      headline: 'What KORTX creative services build',
      intro: 'Every format is built in house, tested before launch and measured in Kampus.',
      benefits: [
        { tag: 'Rich Media', title: 'Rich Media', body: 'Swipe, drag, scratch and spin units that earn attention instead of renting it.' },
        { tag: 'Banners', title: 'Banners', body: 'Full display sets sized for every placement, built from one master.' },
        { tag: 'Interactive Video', title: 'Interactive Video', body: 'Video that viewers can tap, choose and explore inside the player.' },
        { tag: 'CTV', title: 'CTV', body: 'Big-screen spots cut for streaming, with QR and companion options.' },
        { tag: 'AI Video', title: 'AI Video Production', body: 'Fast, on-brand video variants produced from your existing assets.' },
        { tag: 'Dynamic', title: 'Dynamic Creative', body: 'Messages that change with weather, time, dates, ZIP codes and language.' }
      ] }
  ] },

  { key: 'kampus', label: 'Transparent Metrics', sub: 'How success is measured, reported and tested, and how we launch.', sections: [
    reuse('measurement', { use: 'Core', when: 'Every proposal. Implement, Optimize, Report.', src: 'VA DMV v2' }),
    { id: 'kampus', nav: 'Kampus', eyebrow: 'Campaign Command Center', type: 'dashboard',
      tpl: { use: 'Core', when: 'Every proposal. Channel rows only; every figure reconciles with the plan table.', src: 'Master p.46 · microsite skill' },
      headline: 'One source of truth, in real time',
      intro: 'Kampus is where Virginia DMV and TwoTango monitor delivery and track CTR, VCR and reach by channel while there is still flight left to act on.',
      dashboard: {
        client: 'Virginia DMV', campaign: 'FY26 Distracted Driving', days: 35, start: '2026-11-02',
        axis: ['Nov 2', 'Nov 7', 'Nov 12', 'Nov 17', 'Nov 22', 'Nov 27', 'Dec 2', 'Dec 6'],
        rows: [
          { channel: 'Custom Rich Media', imps: 3888889, ctr: 0.35, spend: 35000 },
          { channel: 'Cross-Platform Display', imps: 3636364, ctr: 0.15, spend: 20000 },
          { channel: 'Online Video (Preroll)', imps: 1025641, ctr: 0.15, vcr: 72.4, spend: 20000 },
          { channel: 'Snapchat', spend: 10000 },
          { channel: 'Added Value Display', imps: 185000, ctr: 0.10, spend: 0 }
        ]
      },
      note: 'Illustrative Kampus view using full-flight projections. Clicks are impressions times projected CTR; Snapchat reach reports in platform. Kampus is the reporting source of truth for this campaign.' },
    { id: 'report', nav: 'Performance Report', eyebrow: 'Telling the Whole Story', type: 'anatomy',
      tpl: { use: 'Optional', when: 'Most proposals. Swap in a sample report page.', src: 'Master p.47 · CASA p.21' },
      headline: 'The custom KORTX Performance Report',
      intro: 'Campaign metrics don’t tell the whole story. At the close of flight, DMV receives a custom report that does.',
      anatomy: { slot: 'vadmv-report', ratio: '4 / 3', width: 520, placeholder: 'Drop a sample Performance Report page',
        callouts: [
          { k: 'Reach and frequency', v: 'Deduplicated, by channel and persona.', x: 24, y: 24 },
          { k: 'County breakouts', v: 'Delivery and engagement for all 12 brief markets.', x: 72, y: 30 },
          { k: 'Creative learnings', v: 'Which hook and which persona cut won.', x: 30, y: 72 },
          { k: 'Recommendations', v: 'What to keep, cut and test in the next flight.', x: 74, y: 76 }
        ] } },
    { id: 'testing', nav: 'Testing', eyebrow: 'Testing Thought-Starters', type: 'cards',
      tpl: { use: 'Optional', when: 'When the client cares about incrementality. Scoped separately from the media.', src: 'Acadia p.23' },
      headline: 'Ways to prove it worked',
      intro: 'Designed separately from the media in this proposal. Each can be scoped at kickoff.',
      items: [
        { badge: '01', title: 'Geo holdout', body: 'Hold a few comparable counties out of the buy and compare distracted-driving citations and crash reports.', meta: [['Requires', 'County-level crash or citation data']] },
        { badge: '02', title: 'Search demand', body: 'Compare searches for the hands-free law in exposed and holdout counties.', meta: [['Requires', 'Search volume by locality']] },
        { badge: '03', title: 'Brand lift', body: 'In-flight survey of exposed drivers vs. a control on attitude and intended behavior.', meta: [['Requires', 'Survey partner, minimum reach']] },
        { badge: '04', title: 'A/B creative', body: 'Rotate hooks within each persona to learn which message interrupts best.', meta: [['Requires', 'Two or more creative variants']] },
        { badge: '05', title: 'Incremental reach', body: 'Measure overlap with DMV’s existing paid media.', meta: [['Requires', 'Shared reporting from other vendors']] }
      ] },
    { id: 'rfp', nav: 'RFP Requirements', eyebrow: 'RFP Requirements', type: 'table',
      tpl: { use: 'Conditional', when: 'RFP responses only. One row per requirement, status pill.', src: 'CASA p.14' },
      headline: 'How we meet the brief',
      intro: 'Every requirement in the TwoTango brief, and where this plan answers it.',
      tables: [{ cols: ['Requirement', 'How KORTX meets it', 'Status'], grid: '1.2fr 2.2fr .6fr', rows: [
        ['Statewide reach, A20-49', 'Statewide buy, two age-gated personas.', OK],
        ['Gen Z and Millennial creative', 'Generation-split copy and imagery on every tactic.', OK],
        ['Reporting for 12 named markets', 'County and city cuts in Kampus.', OK],
        ['One KPI per tactic', 'CTR, VCR or reach, set before launch.', OK],
        ['Brand safety', 'News and political exclusions, frequency caps, placement reporting.', OK],
        ['Launch by Nov 2', 'Timeline built back from Nov 2.', OK],
        ['Big-screen reach', 'OTT/CTV available in the incremental tier.', INC]
      ] }] },
    { id: 'kpiRings', nav: 'KPI Snapshot', eyebrow: 'KPI Snapshot', type: 'composed',
      tpl: { use: 'Optional', when: 'Shares, rates or scores out of 100. One to four rings.', src: 'Visualize containers' },
      headline: 'The rates we hold the plan to',
      intro: 'Illustrative targets for the template. Final targets come from the plan.',
      ringsTitle: 'Illustrative targets',
      rings: [
        { label: 'Video completion', value: 78, display: '78%', note: 'Online video, full flight.' },
        { label: 'Viewability', value: 70, display: '70%', note: 'Display and rich media.' },
        { label: 'Brand-safe delivery', value: 99, display: '99%', note: 'Verified placements.' }
      ] },
    { id: 'reachCalc', nav: 'Reach Calculator', eyebrow: 'Try It', type: 'composed',
      tpl: { use: 'Optional', when: 'Built automatically when a source widget has no KORTX block (calculators, quizzes, configurators, hotspots).', src: 'Custom interactive' },
      headline: 'Move the budget, see the reach',
      intro: 'A custom interactive built in the KORTX look. Illustrative math for the template.',
      widget: { title: 'Illustrative reach calculator', height: 300, html: '<div class="w"><label for="b">Monthly budget</label><output id="o">$50,000</output><input id="b" type="range" min="10000" max="250000" step="5000" value="50000"><div class="g"><div class="c"><span>Impressions</span><b id="i">0</b></div><div class="c"><span>Households</span><b id="h">0</b></div><div class="c"><span>Avg. frequency</span><b id="f">0</b></div></div></div><style>.w{display:flex;flex-direction:column;gap:14px;padding:4px}label{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#33D6FF;text-align:center}output{text-align:center;font-size:40px;font-weight:800;letter-spacing:-.04em}input{width:100%;accent-color:#00CCFF;height:44px}.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}.c{display:flex;flex-direction:column;gap:6px;padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:#070B15;transition:transform 200ms cubic-bezier(.16,1,.3,1)}.c:hover{transform:translateY(-2px);box-shadow:0 0 28px rgba(109,94,240,.35)}.c span{font-size:13px;color:rgba(255,255,255,.7)}.c b{font-size:26px;font-variant-numeric:tabular-nums}</style><script>var b=document.getElementById("b");function f(n){return n>=1e6?(n/1e6).toFixed(1)+"M":Math.round(n/1e3)+"K"}function u(){var v=+b.value,imp=v/12*1000,hh=Math.min(imp/4.2,2.4e6);document.getElementById("o").textContent="$"+v.toLocaleString("en-US");document.getElementById("i").textContent=f(imp);document.getElementById("h").textContent=f(hh);document.getElementById("f").textContent=(imp/hh).toFixed(1)}b.addEventListener("input",u);u();</script>' } },
    { id: 'pacingChart', nav: 'Pacing', eyebrow: 'Pacing', type: 'composed',
      tpl: { use: 'Optional', when: 'Two or more metrics over the same weeks or categories.', src: 'Visualize containers' },
      headline: 'Pacing, week by week',
      intro: 'Switch metrics and hover any week to read the number.',
      explore: { title: 'Illustrative pacing', labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5'], note: 'Illustrative figures for the template.', metrics: [
        { name: 'Impressions', values: [1400000, 1650000, 1700000, 2300000, 1650000] },
        { name: 'Clicks', values: [2100, 2600, 2750, 3900, 2500] },
        { name: 'Engagement rate', unit: '%', values: [1.8, 2.1, 2.2, 2.9, 2.3] }
      ] } },
    reuse('next', { use: 'Core', when: 'Every proposal. Five steps, launch highlighted.', src: 'Master p.48' })
  ] }
];

export default Object.assign({}, base, {
  meta: Object.assign({}, base.meta, {
    heroMedia: { type: 'html', src: 'assets/proposals/vadmv/hero.html' },
    clientLogo: 'assets/proposals/vadmv/logo.png',
    clientLogoPlate: true,
    galleryVertical: 'Government & Non-Profit',
    galleryTitle: 'View creatives from similar verticals',
    heroCtas: [
      { label: 'See the Recommendation', tab: 'media', sec: 'plan', primary: true },
      { label: 'Meet the Drivers', tab: 'intelligence', sec: 'drivers' }
    ]
  }),
  tabs
});
