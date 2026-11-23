/* ------------------------------------------------------------------
   INSIGHTS — Orkin Digital Advertising Audit content.
   One entry per tab; tabs with sub-tabs carry a `subs` array. Every
   section is a list of typed blocks the page renders generically, so
   adding a section is a data edit rather than a markup edit.

   Block types: prose · stats · score · numbered · rows · panels ·
                table · note · cards · display · personas · concepts
-------------------------------------------------------------------*/

export const CLIENT = {
  eyebrow: 'Digital Advertising Audit · Discovery',
  title: 'Digital Advertising Audit:',
  titleAccent: 'Executive Snapshot',
  brand: 'Orkin',
  meta: '|  Home Services · Pest Control  |  Prepared July 10, 2026',
  guide: "This Digital Advertising Audit is a strategic, directional assessment by KORTX, meant to inform decisions and a partnership conversation, not to guarantee performance. Findings are labeled Verified (observed and sourced), Inferred (reasoned from indirect signals), or Assumed (industry benchmark). Sources include KORTX Intelligence, KORTX benchmarks across $300M+ in managed media, public ad-tracking data, social profiles, and Orkin's public digital footprint. Anything we could not verify is listed under Access and Validation Requirements. Part 2 of this document adds a KORTX Intelligence competitive briefing on Orkin's pest-control competitive set. Confidential."
};

export const FOOTER = {
  head: 'KORTX.IO | CONFIDENTIAL',
  body: 'KORTX is a digital marketing and data strategy firm specializing in audience-centric solutions that drive business outcomes for brands and agencies. Inc. 5000, Great Place to Work, Black LUMAscape, NMSDC-certified.',
  legal: 'All projections are estimates with plus or minus 10 to 15 percent variance and are not a performance guarantee. Competitive activity is approximate and directional except where sourced directly from disclosed reporting. Pest seasonality reflects published Florida and Gulf pest-control guidance. No personal data was collected during this research.'
};

export const TABS = [
  {
    id: 'overview', label: 'Overview', tone: 'cyan',
    section: {
      eyebrow: 'Executive Snapshot',
      title: 'The category leader, under-served by its own programmatic layer',
      lede: 'Orkin owns pest control in brand and broadcast. The opportunity is not more awareness. It is converting the demand Orkin already generates into booked quotes through sequenced, audience-driven, dynamically personalized programmatic.',
      blocks: [
        { type: 'score', total: 68, ceiling: 88, nowLabel: 'Developing', ceilingLabel: 'Strong',
          dims: [
            { name: 'Brand and creative strength', now: 18, max: 20, to: 19,
              note: 'National campaign presence and category-defining brand equity. The Orkin name does heavy lifting in every auction.' },
            { name: 'Programmatic sophistication', now: 11, max: 25, to: 22,
              note: 'Prior managed service ran display, native, and online video as straight line-item buys with static creative and no sequential messaging. This is the single largest lever.' },
            { name: 'Audience and data strategy', now: 13, max: 25, to: 22,
              note: 'No confirmed CRM-seeded lookalike modeling or weather and swarm signal triggering in the prior program. Rich first-party lead data appears underused for activation.' },
            { name: 'Measurement and conversion', now: 14, max: 20, to: 15,
              note: 'Get a Quote is a clean conversion event and the base tag can be placed. The gap is closed-loop tie-back from impression to booked quote.' },
            { name: 'Website and CRO', now: 12, max: 10, to: 10,
              note: 'Orkin.com converts well with clear quote paths and click-to-call. Landing experience is a strength to build on, not a fix.' }
          ],
          foot: 'Quality Score reflects a category leader with strong brand, national creative, and a heritage of programmatic activity, held back on the paid programmatic side by what we can verify. The 88 ceiling is what a sequenced, audience-driven, dynamically personalized KORTX program is built to reach. Priced at proposal stage.' },
        { type: 'numbered', label: 'What matters most', items: [
          "Orkin owns the pest-control category in brand and broadcast, but the programmatic layer it ran previously, display, native, and online video bought as straight line items with static creative and no sequential messaging, leaves qualified Get a Quote demand on the table. The opportunity is not more awareness. It is converting the awareness Orkin already generates into booked quotes through sequenced, audience-driven, dynamically personalized programmatic.",
          "Pest demand is a timing business. Leads spike 50 to 100 percent after heavy rain and swarm events, the season concentrates March through September, and the Southeast and Gulf run hot year-round. A media program that reads season, geo, and weather signal and serves the right pest callout with the nearest Orkin branch attached is how a national brand wins local conversion moments. Orkin's prior program did not flex to those triggers. A KORTX program is built to.",
          "This is a Balanced-posture audit built ahead of account access. Verified findings are stated plainly, inferences are labeled, and everything we could not confirm from public research or seller history is listed under Access and Validation Requirements as the concrete ask that turns this directional read into a verified baseline. The illustrative investment discussed reflects an incremental programmatic layer sized to the opportunity Horizon Next raised, priced to the KORTX 2026 Rate Card at proposal stage."
        ] }
      ]
    }
  },

  {
    id: 'audit', label: 'Audit', tone: 'cyan',
    subs: [
      {
        id: 'industry', label: 'Industry',
        eyebrow: 'Industry · Section 1',
        title: 'A timing business in a growing, non-cyclical category',
        lede: 'US pest control is a large, steadily growing category where demand is triggered by weather, season, and geography rather than economic cycles. That makes signal-reading media, not flat always-on spend, the winning posture.',
        blocks: [
          { type: 'prose', split: true, paras: [
            'The US pest-control industry is estimated at roughly $26 billion in 2025 and growing in the mid-single digits, with residential accounting for the large majority of revenue and recurring plans driving retention. Demand is not evenly distributed across the year or the map. Leads spike sharply after heavy rain and swarm events, the national season concentrates March through September, and the Southeast and Gulf states run hot essentially year-round.',
            'For a national brand, the strategic implication is clear. The advertiser who reads season, geo, and weather signal and shows up first with the right pest and the nearest branch wins the local conversion moment. This is a category where a smarter media engine beats a bigger flat budget.'
          ], stats: [
            { value: '~$26B', label: 'US pest control market, 2025 (industry estimate)' },
            { value: '50–100%', label: 'Lead spike after heavy rain and swarm events' },
            { value: 'Mar–Sep', label: 'National peak season, with SE and Gulf year-round' }
          ] }
        ]
      },
      {
        id: 'audience', label: 'Audience',
        eyebrow: 'Audience · Section 2',
        title: 'Two residential buying moments, one commercial decision-maker',
        lede: "Orkin's demand splits cleanly into an active-problem homeowner searching in the moment, a preventive homeowner buying ahead of the season, and a commercial facilities buyer purchasing on compliance and continuity. Each needs a different signal and a different creative approach.",
        blocks: [
          { type: 'rows', label: 'Primary audience segments', items: [
            { text: 'Triggered homeowner: saw a pest or heard of a neighborhood swarm, searching now', badge: 'High intent', tone: 'cyan' },
            { text: 'Preventive homeowner: buys seasonal protection before problems start', badge: 'Mid funnel', tone: 'violet' },
            { text: 'Commercial buyer: facilities, food service, property management, compliance-driven', badge: 'Secondary', tone: 'red' }
          ] },
          { type: 'note', label: 'How to read this', text: 'Residential is the primary opportunity and the focus of the illustrative plan. Commercial is a real but secondary line, best reached with its own creative and a longer consideration window. All three personas are grounded in vertical benchmarks and should be validated against Orkin first-party lead data post-engagement.' }
        ]
      },
      {
        id: 'personas', label: 'Personas',
        eyebrow: 'Personas · Section 3',
        title: 'Three personas, three signals, three creative jobs',
        lede: 'Swipe through the audience. Two residential buying moments and one commercial decision-maker, each color-coded to how KORTX would activate against it.',
        blocks: [
          { type: 'personas', items: [
            { tone: 'cyan', kicker: 'Residential · Active Problem', name: 'Trigger-Moment Tara',
              demo: 'A30-55 · homeowner · $75K-$150K HHI · suburban, skews SE and Gulf',
              facts: [
                { label: 'Behavioral', text: 'Sees a pest or hears about a neighborhood swarm, immediately searches exterminator near me, scans local reviews and response time before requesting a quote.' },
                { label: 'Online habits', text: 'Mobile-first search, Google reviews, local Facebook groups, weather and local-news apps.' },
                { label: 'Psychographics', text: 'Urgency and trust-driven. Wants a credible national name that shows up locally and fast, reassured by nearest-branch proximity.' },
                { label: 'Media consumption', text: 'Search (high), rich media retargeting (high), local news and weather adjacency (medium), CTV and OLV (medium, pending verification).' }
              ],
              job: 'The pest you just saw, handled by the Orkin Pro at your nearest branch, today.' },
            { tone: 'violet', kicker: 'Residential · Preventive', name: 'Season-Ahead Sam',
              demo: 'A35-64 · homeowner · $90K+ HHI · suburban, high property value',
              facts: [
                { label: 'Behavioral', text: 'Buys protection before the problem arrives. Renews annual plans, responds to seasonal reminders and neighborhood risk framing.' },
                { label: 'Online habits', text: 'Streaming-heavy, home and garden content, email offers, weather apps for seasonal cues.' },
                { label: 'Psychographics', text: 'Risk-averse and maintenance-minded. Values a recurring plan and a technician who knows the property.' },
                { label: 'Media consumption', text: 'CTV and OLV (high), dynamic display (high), search (low until a trigger fires).' }
              ],
              job: 'Mouse season is coming to your city. Get ahead of it with a plan, not a panic call.' },
            { tone: 'red', kicker: 'Commercial · Compliance', name: 'Facilities Buyer Frank',
              demo: 'Facilities, food service, and property management decision-makers',
              facts: [
                { label: 'Behavioral', text: 'Purchases on compliance, audit readiness, and service continuity. Longer consideration window with procurement involvement.' },
                { label: 'Online habits', text: 'Trade publications, LinkedIn, vendor comparison and RFP research.' },
                { label: 'Psychographics', text: 'Accountability-driven. Needs documentation, national coverage, and a single point of contact across sites.' },
                { label: 'Media consumption', text: 'B2B display and video, search on commercial terms, trade adjacency.' }
              ],
              job: 'One national contract, documented service at every site you are responsible for.' }
          ] },
          { type: 'note', label: 'Validation note', text: 'All three personas are grounded in vertical benchmarks and KORTX category experience. Each should be validated against Orkin first-party lead data at account access, which is where modeled audiences get their seed.' }
        ]
      },
      {
        id: 'data', label: 'Data Partners',
        eyebrow: 'Data Partners · Section 4',
        title: 'Rich first-party lead data, underused for activation',
        lede: 'Orkin generates a large volume of high-quality lead and customer data through its quote and booking flow. The gap is not data availability. It is putting that data to work as the seed for modeled audiences and closed-loop measurement.',
        blocks: [
          { type: 'panels', items: [
            { tone: 'lime', label: 'Strength', text: 'First-party quote and customer records are a strong lookalike seed. Modeled audiences built from converters, then activated across display and video, are how a national brand scales local intent efficiently.' },
            { tone: 'amber', label: 'Opportunity', text: 'Prior program shows no confirmed CRM-seeded modeling or suppression of existing customers. Onboarding first-party data for activation and suppression is a fast, high-impact early win, subject to a compliant clean-room or match path confirmed at account access.' },
            { tone: 'violet', label: 'To validate', text: 'Confirm data availability, match rate, and the compliant onboarding path. Listed in full under Access and Validation Requirements.' }
          ] }
        ]
      },
      {
        id: 'mediamix', label: 'Media Mix',
        eyebrow: 'Media Mix · Section 5',
        title: 'Strong channels, likely run flat',
        lede: 'The findings suggest the prior managed service may have run the right channels without the mechanics that make them work. The question is not which channels were used, it is whether they were bought as static line items with limited sequencing, dynamic creative, or signal triggering. We would confirm this at account access.',
        blocks: [
          { type: 'table',
            cols: ['Channel', 'Prior state', 'KORTX improvement', 'Basis'],
            rows: [
              ['Cross-platform display', 'Static line-item buy', 'Dynamic units keyed to pest, season, geo, and nearest branch', 'verified'],
              ['Online video', 'Straight line-item OLV', 'Interactive OLV with in-unit quote path and branch locator', 'verified'],
              ['Rich media', 'Not confirmed in prior program', 'Captivate rich media for the trigger moment', 'inferred'],
              ['CTV and OTT', 'Handled by Horizon, coverage unconfirmed', 'Coordinate rather than duplicate, pending verification', 'assumed'],
              ['Search and paid social', "Run by Horizon's separate team", 'Outside programmatic scope, the programmatic layer complements rather than overlaps', 'assumed']
            ],
            foot: 'Whether Horizon already runs CTV and OTT for Orkin is an open item to confirm at account access so the programmatic layer coordinates rather than duplicates.' }
        ]
      }
    ]
  },

  {
    id: 'strategy', label: 'Strategy', tone: 'violet',
    subs: [
      {
        id: 'thesis', label: 'Shoulder-Season Thesis',
        eyebrow: 'Strategy · The Test',
        title: 'A Florida shoulder-season test: win the moments competitors stop buying',
        lede: 'The recommended proof point is a focused Florida test across the October to March shoulder season. It is where the category myth (that pest demand sleeps in the off-season) is most wrong, and where a signal-driven program can capture demand at a lower cost while national competitors pull back.',
        blocks: [
          { type: 'prose', paras: [
            "Conventional pest media heavies up March through September and pulls back after summer. In Florida that is a mistake. The state's mild winters mean pests never go dormant, they move indoors, so demand does not disappear in the off-season, it changes shape. That combination, real and shifting demand plus competitors reducing pressure, is exactly the auction environment where dynamic, signal-driven creative outperforms flat spend."
          ] },
          { type: 'rows', label: 'What is actually active in Florida, October to March', items: [
            { text: 'Rodents: roof rats, Norway rats, and house mice move indoors as nights cool', badge: 'Fall to winter peak', tone: 'red' },
            { text: 'Cockroaches: German roaches thrive indoors year-round, palmetto bugs seek warmth', badge: 'Year-round', tone: 'red' },
            { text: 'Ants: ghost, white-footed, Caribbean crazy, carpenter, and fire ants more prevalent in fall', badge: 'Fall forward', tone: 'red' },
            { text: 'Subterranean termites: swarm season begins January, ramps toward spring', badge: 'Jan onward', tone: 'violet' },
            { text: 'Bed bugs: holiday travel drives a winter uptick', badge: 'Nov to Jan', tone: 'violet' }
          ] },
          { type: 'note', label: 'Why this is the right test', text: "The shoulder season isolates the exact capability Orkin's prior program lacked: reading which indoor pest is driving demand this month in this Florida market, and serving the matching creative with the nearest branch. It is a contained, measurable proof of the win-local-at-scale engine in the Win Theme section, run in a single market before scaling nationally into the March-to-September peak." },
          { type: 'display', label: 'The strategic focus', items: [
            { word: 'Dynamic Display', tone: 'red', text: 'The workhorse. Units flex by month to the pest actually driving Florida demand, keyed to geo and nearest branch, with the shortest path to Get a Quote and click-to-call.' },
            { word: 'Interactive OLV', tone: 'cyan', text: 'The engagement layer. In-unit branch locator and quote path turn a video view into a booked-quote action without leaving the player.' }
          ] }
        ]
      },
      {
        id: 'plan', label: 'Illustrative Plan',
        eyebrow: 'Strategy · Illustrative Plan',
        title: 'A contained Florida test, sized to prove the thesis',
        lede: 'This is a directional shape for the shoulder-season test, not a quote. It layers an incremental programmatic test onto the existing program, weighted to rich media and interactive OLV, sized to produce a clean read against Get a Quote conversions. All pricing is set at proposal stage.',
        blocks: [
          { type: 'table',
            cols: ['Tactic', 'Role in the test', 'Relative weight'],
            rows: [
              ['Rich media', 'Primary conversion driver, pest and branch keyed', 'Lead weight'],
              ['Interactive OLV', 'Engagement and in-unit quote path', 'Strong support']
            ],
            emphasizeLast: true },
          { type: 'note', label: 'How to read this plan', text: 'The test runs October through March in a defined set of Florida markets, weighted toward rich media and interactive OLV, and measured against Get a Quote conversions with a clean pre-period baseline. It is an incremental layer on the existing program, sized to produce a decision-grade read before national scale-up into peak season. Budget, market list, and rate detail are finalized at proposal stage against the KORTX 2026 Rate Card.' }
        ]
      }
    ]
  },

  {
    id: 'measurement', label: 'Measurement', tone: 'violet',
    section: {
      eyebrow: 'Measurement',
      title: 'One clean conversion, measured to a decision-grade read',
      lede: 'Get a Quote is a clean conversion event and the base tag can be placed from day one. The upgrade is tying impressions through to booked visits so the Florida shoulder-season test produces a true read, not a form-fill proxy.',
      blocks: [
        { type: 'panels', items: [
          { tone: 'lime', label: 'Confirmed KPIs', text: 'Unique Reach is the primary KPI, CPA on the Get a Quote action the secondary. Media is planned and read against both.' },
          { tone: 'amber', label: 'Close the loop', text: 'Connecting quote submissions to booked-quote outcomes is what lets us report a true CPA. Needs a data path confirmed at account access.' },
          { tone: 'cyan', label: 'Test design', text: 'A defined Florida market set with a pre-period baseline gives a clean before-and-after read.' }
        ] },
        { type: 'table', label: 'Performance benchmarks',
          cols: ['Metric', 'Vertical benchmark', 'Basis'],
          rows: [
            ['Unique Reach', 'Primary KPI, deduplicated reach across the market footprint', 'confirmed'],
            ['CPA (cost per Get a Quote)', 'Secondary KPI, $45 to $110 depending on market and season', 'confirmed'],
            ['Display and rich media CTR', '0.08 to 0.15 percent prospecting, higher on retargeting', 'assumed'],
            ['Video completion rate (VCR)', '90 to 96 percent on CTV, 70 to 85 percent on OLV', 'assumed'],
            ['Seasonal lead lift', '50 to 100 percent spike after rain and swarm events', 'verified']
          ],
          foot: "Directional benchmarks. Orkin's verified data replaces every figure here at account access." },
        { type: 'cards', label: 'Access and validation', lede: 'What we need to move from directional to verified at account access:', items: [
          { title: 'Prior program detail', text: 'Historical channel mix, flighting, and creative to validate the static line-item finding.' },
          { title: 'First-party data path', text: 'Availability, match rate, and a compliant onboarding path for CRM-seeded modeling and suppression.' },
          { title: 'CTV and OTT coverage', text: 'Whether Horizon already runs CTV and OTT so the programmatic layer coordinates rather than duplicates.' },
          { title: 'Conversion loop', text: 'The data path to tie quote submissions to booked-quote outcomes for closed-loop optimization.' }
        ] }
      ]
    }
  },

  {
    id: 'mocks', label: 'Creative Mocks', tone: 'red',
    section: {
      eyebrow: 'Creative Mocks',
      title: 'Live interactive units, plus localized rich media storyboards',
      lede: 'Two live, clickable units lead the section: an interactive video and a 300x600 Captivate rich media unit. Beneath them, the storyboards show how a single Orkin unit flexes by market, pest, and season with the nearest branch attached.',
      blocks: [
        { type: 'units', items: [
          { label: 'Interactive clickable video · Live unit', id: '6qof21', format: 'cinematic',
            caption: 'Interactive video lets a viewer tap objects in the frame to jump straight to a quote path, turning a watch into a booked action without leaving the player.' },
          { label: 'Captivate rich media · 300x600 unit', id: '2k5se', format: 'vertical',
            caption: 'The 300x600 unit carries a branch locator, the pest callout for the market, and the shortest path to Get a Quote.' }
        ] },
        { type: 'concepts', head: 'Orkin localized rich media · 300x600 concepts',
          hero: { kicker: 'KORTX rich media × Horizon partnership', title: 'Local relevance. National trust.',
            text: "Localized 300×600 rich media combines Orkin's national brand trust with timely pest relevance and a dynamic local layer that routes every response to the right branch." },
          items: [
            { kicker: 'Concept 1A', title: 'Brand-first. Locally resolved.',
              text: "Orkin's people and service fleet lead the story. A KORTX-managed ZIP lookup then resolves the correct branch, number, address, and city-specific call to action within a consistent national brand system.",
              frames: [
                { market: 'Auburn Hills, MI · Branch #547', flag: "America's #1 in pest control", headline: 'Protect the home you love.', cta: 'Explore the story → meet your local team', caption: '300 × 600 · Branded DCO overlay' },
                { market: 'Naperville, IL · Branch #312', flag: "America's #1 in pest control", headline: 'Protect the home you love.', cta: 'Explore the story → meet your local team', caption: '300 × 600 · Branded DCO overlay' }
              ],
              steps: [
                { title: 'Earn attention with real brand equity', text: 'Authentic Orkin technician and service photography establishes trust immediately.' },
                { title: 'Resolve the local team', text: 'ZIP determines the branch, phone, service address, and city-specific CTA.' }
              ],
              tags: ['National trust', 'ZIP → branch', 'Local routing', 'Scalable system'] },
            { kicker: 'Concept 1B', title: 'Make the risk local.',
              text: 'The same localization engine adds a seasonal hook and a concise proof sequence. The result feels specific to the household before Orkin closes with a recognizable local expert.',
              frames: [
                { market: 'Auburn Hills, MI', flag: 'Cooler nights are here', headline: 'Mouse season is coming to Auburn Hills.', cta: 'Explore the story → see what happens inside', caption: '300 × 600 · Seasonal conditions + local close' }
              ],
              steps: [
                { title: 'Geo + season hook', text: '"Mouse season is coming to [City]" makes the opening immediately relevant.' },
                { title: 'Build consequence', text: 'Fast, visual facts explain multiplication, wiring damage, and pantry exposure.' },
                { title: 'Close with the local team', text: 'Authentic technician photography and a branch-routed CTA turn concern into action.' }
              ],
              tags: ['Seasonal DCO', 'Local copy', 'Brand close', 'Intent signals'] },
            { kicker: 'Concept 2', title: 'One system. Different pest moments.',
              text: 'Creative logic changes the pest, seasonal message, imagery, and CTA by market. Midwest mouse pressure and Southern cicada emergence become distinct stories inside one repeatable framework.',
              frames: [
                { market: 'Naperville, IL · Fall', flag: 'Midwest · Fall', headline: 'Mouse season is here in Naperville.', cta: 'Explore the story → see the hidden risk', caption: 'Mouse prevention' },
                { market: 'Nashville, TN · Spring', flag: 'South · Spring', headline: 'The cicadas are coming to Nashville.', cta: 'Explore the story → protect young trees', caption: 'Cicada protection' }
              ],
              steps: [
                { title: 'Swap the pest moment', text: 'Market and season determine the opening image, message, and evidence.' },
                { title: 'Build the proof sequence', text: 'A second pest fact adds useful context without relying on video playback.' },
                { title: 'Route the response', text: 'Every CTA resolves to the correct branch and can seed retargeting audiences.' }
              ],
              tags: ['Pest × season', 'Fact sequence', 'Dynamic CTA', 'Scalable system'] }
          ],
          foot: 'KORTX × Horizon × Orkin. Localized rich-media opportunities designed to connect national brand trust with timely pest relevance and branch-level action. Branch details illustrate how the experience can resolve locally.',
          note: 'Storyboards are directional creative concepts for the shoulder-season test. Final units, copy, and localized data are confirmed at production.' }
      ]
    }
  },

  {
    id: 'wintheme', label: 'Win Theme', tone: 'cyan',
    subs: [
      {
        id: 'winlocal', label: 'Win Local At Scale',
        eyebrow: 'Our Point Of View',
        title: 'A managed-service partnership built to win locally, at national scale.',
        statement: 'Orkin is a national brand that only earns revenue one service area at a time. A national buy optimizes to the blended average. We optimize the map, market by market.',
        lede: 'The engine below wins locally and scales systemwide: deep local demand, audience, and competitive knowledge operationalized centrally so brand, market, and service-area precision drive cost-per-lead across all 400+ markets. For pest brands with budgets we can move across the full footprint, this approach routinely holds cost-per-acquisition under $150.',
        blocks: [
          { type: 'cards', numbered: true, items: [
            { title: 'Market research and audience ID', text: 'A local demand picture per market: who converts, seasonality, competitive density, homeowner versus renter, property age, and pest-risk signals.' },
            { title: 'Audience framework', text: 'Personalized audience plans built locally and deployed at scale across market, region, and national. Local detail, centralized intelligence.' },
            { title: 'Site tagging and Kampus', text: 'Full-funnel measurement tied to form submits, so every impression is accountable to a lead, not just a delivery number.' },
            { title: 'Real-time reallocation', text: 'Move spend across markets as demand and efficiency shift. Fund what is converting now, pull back from what is saturated.' }
          ] },
          { type: 'note', label: 'Why it fits Orkin', text: 'The existing program buys national and optimizes to an average. Layering this engine on top makes the local level of the buy actually perform, without disrupting what already runs. We would prove it in one market first: the Florida shoulder-season test in the Strategy section is a contained, measurable pilot of this exact engine before scaling across all 400+ markets.' }
        ]
      },
      {
        id: 'reallocation', label: 'Reallocation',
        eyebrow: 'Win Theme · Reallocation',
        title: 'Budget follows demand, not the calendar',
        lede: 'A national buy locks weight to a plan set months earlier. Pest demand does not respect that plan. Reallocation is the mechanic that turns a fixed budget into a responsive one.',
        blocks: [
          { type: 'panels', items: [
            { tone: 'cyan', label: 'What moves', text: 'Spend shifts across markets, tactics, and creative variants on a weekly cadence, driven by cost-per-lead and lead volume rather than by planned flighting.' },
            { tone: 'lime', label: 'What triggers it', text: 'Rain and swarm events, seasonal pest transitions, competitive pressure in the auction, and market-level CPA drift against target.' },
            { tone: 'amber', label: 'What it protects', text: 'Saturated markets stop absorbing budget that is no longer converting, and markets showing live demand get funded inside the week rather than the next cycle.' }
          ] },
          { type: 'note', label: 'How to read this', text: 'Reallocation depends on lead-level reporting being live, which is why site tagging and the conversion loop are listed as access requirements. Without the closed loop, budget can only be moved on delivery metrics, which is what a flat program already does.' }
        ]
      },
      {
        id: 'path', label: 'Path Forward',
        eyebrow: 'Win Theme · Path Forward',
        title: 'From directional read to verified baseline to scaled program',
        lede: 'This audit is a directional assessment built ahead of account access. The path forward moves it to verified, proves the thesis in one contained market, then scales into peak season.',
        blocks: [
          { type: 'cards', numbered: true, items: [
            { title: 'Account access and validation', text: 'Work the Access and Validation Requirements list: prior program detail, first-party data path, CTV and OTT coverage, and the conversion loop. Every directional figure in this document is replaced with verified data.' },
            { title: 'Stand up measurement', text: 'Place the base tag, tie Get a Quote through to booked outcomes, and establish a clean pre-period baseline in the Florida market set.' },
            { title: 'Run the shoulder-season test', text: 'October through March in defined Florida markets, weighted to rich media and interactive OLV, read against Get a Quote conversions.' },
            { title: 'Scale into peak', text: 'Carry the proven engine into the March-to-September national season across the full 400+ market footprint.' }
          ] },
          { type: 'note', label: 'What we need from Orkin', text: 'Account access is the gating step. Everything after it is execution on a plan already shaped in this document, priced to the KORTX 2026 Rate Card at proposal stage.' }
        ]
      },
      {
        id: 'reporting', label: 'Reporting',
        eyebrow: 'Win Theme · Reporting',
        title: 'Live pacing and outcomes, not a monthly recap',
        lede: 'Live dashboards track pacing, outcomes, and KPIs as campaigns run, not weeks after they end. Reporting is built so a market-level decision can be made in the same week the signal appears.',
        blocks: [
          { type: 'cards', items: [
            { title: 'Kampus dashboard', text: 'Full-funnel view tied to form submits, with market, tactic, and creative breakouts available on demand rather than on request.' },
            { title: 'Weekly pacing read', text: 'Delivery against plan, cost-per-lead by market, and the reallocation decisions made that week with the reasoning attached.' },
            { title: 'Test read-out', text: 'Pre-period baseline against test period for the Florida market set, reported against Get a Quote conversions and Unique Reach.' }
          ] },
          { type: 'note', label: 'Reporting discipline', text: 'Every figure reported ties to a defined KPI in the Measurement section. Where a number is directional rather than verified, it is labeled, the same convention this audit uses.' }
        ]
      }
    ]
  },

  {
    id: 'part2', label: 'Part 2 · Competitive Intelligence', tone: 'violet',
    subs: [
      {
        id: 'compset', label: 'Competitive Set',
        eyebrow: 'Competitive Intelligence · Section 1',
        title: 'A scaled national field where nobody has fully solved localized, triggered creative',
        lede: 'The white space is not more reach. It is the right pest, the right branch, at the right moment.',
        blocks: [
          { type: 'prose', paras: [
            "Orkin's national peers, Terminix (Rentokil) and, at commercial scale, Ecolab, compete on brand, route density, and acquisition. Digital-forward operators such as Aptive Environmental and strong regionals like Massey Services compete aggressively on local paid search, reviews, and door-level acquisition. Across the publicly observable field, messaging is dominated by generic protection-and-expertise claims and offer-led search. What is largely missing is creative that flexes to the individual homeowner's pest, season, geo, and nearest branch. That is the strategic opening for Orkin: use its brand advantage as the top of a sequenced program and win the local conversion moment competitors treat as a flat search buy."
          ] },
          { type: 'table', label: 'Channel presence matrix',
            cols: ['Channel', 'Orkin', 'Terminix (Rentokil)', 'Aptive Environmental', 'Massey Services'],
            rows: [
              ['Paid Search', 'Active', 'Active', 'Heavy', 'Active'],
              ['Paid Social', 'Active', 'Active', 'Active', 'Light'],
              ['National TV / Video', 'Active', 'Active', 'Light', 'Minimal'],
              ['Programmatic Display', 'Unverified', 'Unverified', 'Unverified', 'Unverified'],
              ['CTV / OTT', 'Unverified', 'Unverified', 'Unverified', 'Unverified'],
              ['Digital Audio', 'Unverified', 'Unverified', 'Unverified', 'Unverified'],
              ['Dynamic / Localized Creative', 'Untapped', 'Untapped', 'Light', 'Untapped']
            ] }
        ]
      },
      {
        id: 'spend', label: 'Spend Intel',
        eyebrow: 'Competitive Intelligence · Section 2',
        title: 'National brand weight above, local search knife-fight below',
        lede: 'Competitive activity is approximate and directional except where sourced directly from disclosed reporting. The shape of the field is clear even where the exact figures are not.',
        blocks: [
          { type: 'panels', items: [
            { tone: 'cyan', label: 'National tier', text: 'Orkin and Terminix carry sustained national TV and video presence. Brand weight at the top of the funnel is table stakes in this category, and Orkin holds the stronger position.' },
            { tone: 'amber', label: 'Local tier', text: 'Aptive Environmental runs heavy paid search and door-level acquisition. Massey Services competes hard in its regional footprint on search and reviews. Cost pressure in local auctions comes from here, not from the national tier.' },
            { tone: 'violet', label: 'Unverified layer', text: 'Programmatic display, CTV/OTT, and digital audio activity across the set is not publicly observable. Treat the matrix as directional and validate against disclosed reporting where available.' }
          ] },
          { type: 'note', label: 'Why this matters for the plan', text: 'Because the competitive spend concentrates in search and national video, the programmatic layer is where Orkin can buy attention at a lower effective cost, particularly in the shoulder season when the national tier reduces pressure.' }
        ]
      },
      {
        id: 'messaging', label: 'Messaging',
        eyebrow: 'Competitive Intelligence · Section 3',
        title: 'Everyone claims protection and expertise. Nobody names your pest.',
        lede: 'Across the publicly observable field, messaging clusters into a small number of interchangeable claims. That sameness is the opening.',
        blocks: [
          { type: 'rows', label: 'What the field is saying', items: [
            { text: 'Generic protection claims: protect your home, protect your family', badge: 'Universal', tone: 'red' },
            { text: 'Expertise and heritage: trained technicians, decades in business', badge: 'Universal', tone: 'red' },
            { text: 'Offer-led search copy: free inspection, first month discount', badge: 'Heavy', tone: 'red' },
            { text: 'Reviews and social proof: ratings, neighborhood recommendations', badge: 'Local tier', tone: 'violet' },
            { text: 'Named pest, named season, named city, nearest branch', badge: 'Largely absent', tone: 'lime' }
          ] },
          { type: 'note', label: 'The strategic read', text: 'Orkin already owns the trust claim through brand and broadcast. Repeating it in programmatic spends budget on a message the category has saturated. Naming the pest actually driving demand in that market this month, with the nearest branch attached, is the message no competitor is executing at scale.' }
        ]
      },
      {
        id: 'whitespace', label: 'White Space',
        eyebrow: 'Competitive Intelligence · Section 4',
        title: 'The opening: localized, triggered, sequenced creative',
        lede: 'The white space is not a channel nobody is buying. It is a capability nobody in the set has fully built.',
        blocks: [
          { type: 'cards', numbered: true, items: [
            { title: 'Signal-triggered creative', text: 'Weather and swarm events drive 50 to 100 percent lead spikes. No competitor in the observable set is confirmed to flex creative to those triggers.' },
            { title: 'Pest-level personalization', text: 'The field advertises pest control. The opening is advertising the roof rat moving indoors in this Florida market in November.' },
            { title: 'Branch-level resolution', text: 'A national brand that resolves to the nearest branch, phone, and address in-unit converts the local moment competitors send to a generic landing page.' },
            { title: 'Shoulder-season presence', text: 'The national tier reduces pressure October through March while Florida demand persists indoors. That is bought attention at a discount.' }
          ] },
          { type: 'note', label: 'How this connects', text: 'These four are exactly what the Florida shoulder-season test in the Strategy section is designed to prove, in one contained market, before scaling nationally.' }
        ]
      }
    ]
  }
];

/* Basis badge palette, so a row names a basis rather than repeating colours. */
export const BASIS = {
  verified: { rgb: '52,211,153', label: 'Verified' },
  confirmed: { rgb: '52,211,153', label: 'Confirmed' },
  inferred: { rgb: '0,204,255', label: 'Inferred' },
  assumed: { rgb: '250,204,21', label: 'Assumed' }
};

export const TONES = {
  cyan: '0,204,255',
  violet: '138,124,248',
  lime: '190,242,100',
  amber: '250,204,21',
  red: '239,68,68'
};
