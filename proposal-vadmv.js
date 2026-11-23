/* Proposal content configuration — Virginia DMV · Distracted Driving.
   Copy sourced from the KORTX Workspace proposal (VA DMV × TwoTango).
   Same schema as proposal-sheetz.js, plus: meta.titleAccent, meta.pills,
   meta.heroCtas, meta.heroMedia, section.summary / steps / timeline /
   fullbleed / takeawayLabel, persona.keyFields, list item { pre, b }.
   Confidence keys: v = Verified · i = Inferred · a = Assumed · u = Unknown. */

const SOURCES = {
  dmv: { label: 'Virginia DMV and VDOT distracted driving reporting, CY2024', date: '2024' },
  hso: { label: 'Virginia DMV Highway Safety Office Distracted Driving Toolkit', date: '2024' },
  poll: { label: 'DRIVE SMART Virginia driver poll', date: '' },
  plan: { label: 'KORTX media plan', date: 'FY26' }
};

const GENZ = 'The Always-On Commuter (Gen Z)';
const MILL = 'The Multitasking Parent (Millennial)';
const HI = { pill: 'High', tone: 'high' }, MOD = { pill: 'Mod', tone: 'mod' };

export default {
  meta: {
    client: 'Virginia DMV',
    clientLogo: '',
    agency: 'TwoTango',
    type: 'Media Proposal',
    concept: 'Prepared for TwoTango',
    title: 'Virginia DMV',
    titleAccent: 'Distracted Driving',
    support: 'A statewide awareness campaign built to reach Virginia drivers 20 to 49 where attention actually lives, with generation-specific creative, two clearly defined driver personas, and a single measured KPI on every tactic.',
    pills: ['Nov 2 to Dec 6, 2026', '$85,000 Total Investment', 'VA Statewide', '4 Channels · 2 Core Audiences'],
    heroCtas: [
      { label: 'See the Recommendation', tab: 'recommend', sec: '', primary: true },
      { label: 'Jump to the Media Plan', tab: 'recommend', sec: 'plan' }
    ],
    /* Brand stage at the top of the page. type: 'slot' (drag-and-drop image),
       'image' (src) or 'html' (src of a same-origin HTML file, e.g. a live unit). */
    heroMedia: { type: 'slot', placeholder: 'Drop a Virginia DMV key visual, or point heroMedia at an HTML file' },
    preparedFor: 'TwoTango · Virginia DMV',
    preparedBy: 'KORTX Strategy & Media',
    date: 'FY26 Media Proposal',
    period: 'Nov 2 to Dec 6, 2026'
  },
  sources: SOURCES,
  seller: {
    name: 'Eric Simone', title: 'Lead Designer · KORTX', email: 'esimone@kortx.io', phone: '248-841-5434',
    headshot: 'assets/team/eric-simone.jpg', headshotFrame: { z: .55, x: 0, y: 0, w: 1125, h: 1500 },
    eyebrow: 'Precision. Attention. Prevention.',
    cta: 'Let’s Build the Campaign', ctaHref: 'mailto:esimone@kortx.io?subject=Virginia%20DMV%20Distracted%20Driving',
    headline: 'Phone down. Eyes up.',
    contactCopy: 'Virginians already agree that distracted driving is dangerous. This campaign is built to interrupt the habit anyway, with creative cut to the format each generation actually watches, and one honest metric on every tactic carrying the proof.'
  },

  tabs: [
    { key: 'found', label: 'What We Found', sub: 'The problem, the Virginia market, and the two drivers this campaign is built around.', sections: [
      { id: 'overview', nav: 'Overview', eyebrow: 'Overview', type: 'narrative',
        headline: 'What are we solving for?',
        intro: 'Virginia DMV is not solving an awareness problem. Virginians already know distracted driving is dangerous. The gap is between what they believe and what they do behind the wheel, and it is widest among the exact drivers this campaign is built to reach.',
        facts: [
          { label: 'Impressions', value: '8.7M', note: 'Total impressions, including added value.', c: 'v', cl: 'Media plan', src: 'plan' },
          { label: 'Added value', value: '185,000', note: 'Delivered as bonus display impressions.', c: 'v', cl: 'Media plan', src: 'plan' },
          { label: 'Channels', value: '4', note: 'Each carrying one primary KPI.', c: 'v', cl: 'Media plan', src: 'plan' },
          { label: 'Days in flight', value: '35', note: 'Continuous, even pacing.', c: 'v', cl: 'Media plan', src: 'plan' }
        ],
        details: [
          { k: 'A behavior campaign', v: 'KORTX solves for that by treating this as a behavior campaign rather than an information campaign. We build to two generations with genuinely different media diets, we run creative cut to the format each platform rewards, and we hold every tactic to a single honest engagement signal rather than a stack of them.', c: 'v', cl: 'Strategy' },
          { k: 'One signal per tactic', v: 'Video is measured on completion rate, Snapchat on awareness and reach, and everything else on click-through rate. These are in-flight engagement signals, measured natively and reported in real time through Kampus.', c: 'v', cl: 'Strategy' },
          { k: 'The flight lands on purpose', v: 'November 2 through December 6 covers Thanksgiving travel and the front edge of the holiday driving season, when road volume, night driving, and phone activity all climb at once.', c: 'v', cl: 'Strategy' }
        ],
        takeawayLabel: 'The strategic tension',
        takeaway: 'A DRIVE SMART Virginia poll found 83% of Virginians consider using a phone without hands-free mode extremely or very dangerous. In the same poll, 66% admitted to driving distracted recently. Persuasion is not the job. Interruption is.' },

      { id: 'market', nav: 'Market Analysis', eyebrow: 'KORTX Intelligence', type: 'narrative',
        headline: 'Virginia market analysis',
        intro: 'The public record on distracted driving in Virginia points to a specific audience, a specific set of geographies, and a specific creative problem. All three shaped this plan.',
        facts: [
          { label: 'Crashes', value: '18,688', note: 'Attributed to a distracted driver in Virginia in 2024.', c: 'v', src: 'dmv' },
          { label: 'Lives lost', value: '73', note: 'In those crashes in 2024.', c: 'v', src: 'dmv' },
          { label: 'Injuries', value: '10,222', note: 'Attributed to distracted driving in 2024.', c: 'v', src: 'dmv' },
          { label: 'Most involved', value: '21 to 35', note: 'Age band DMV Highway Safety identifies as most frequently involved.', c: 'v', src: 'hso' }
        ],
        lists: [
          { title: 'Market Trends', items: [
            { b: 'The law is settled, the habit is not.', t: 'Virginia has been a hands-free state since January 1, 2021 under Va. Code 46.2-818.2, a primary offense carrying a $125 fine on a first violation. Legal awareness is high and compliance still lags.' },
            { b: 'Distraction has outgrown texting.', t: 'DMV reports the leading distraction type is eyes off the road, which covers navigation, music, rideshare apps, and passengers, not just messaging. Creative that only says "do not text" misses most of the behavior.' },
            { b: 'Seasonal risk is real.', t: 'The November and December window carries Thanksgiving travel, earlier sunsets, and peak delivery and rideshare volume. Exposure per mile goes up right as the campaign runs.' },
            { b: 'Public sector creative gets tuned out fast.', t: 'Safety messaging competes with entertainment for the same attention. Format-native execution matters more than message volume.' }
          ] },
          { title: 'Audience Trends', items: [
            { b: 'Belief and behavior are decoupled.', t: 'Most Virginians rate phone use while driving as dangerous and do it anyway. The creative job is to close that gap, not to re-argue the danger.' },
            { b: 'Two generations, two media diets.', t: 'Gen Z lives in vertical, sound-on, short-form and in live environments like Twitch. Millennials sit in longer-form video, display and news environments. One creative set cannot serve both.' },
            { b: 'The car is treated as private space.', t: 'Younger drivers describe the vehicle as one of the few places they are alone with a phone. Messaging that reads as surveillance or scolding is rejected quickly.' },
            { b: 'A growing group is paid to look at the phone.', t: 'Rideshare and delivery drivers face a direct conflict between income and attention. They are underserved by generic safety messaging and folded into the Always-On Commuter (Gen Z) persona, where their exposure per mile is highest.' }
          ] }
        ],
        takeawayLabel: 'Geography note',
        takeaway: 'This is a statewide buy. Delivery runs across all of Virginia and the algorithm is free to find the audience wherever it sits, which protects both scale and efficiency across a 35-day flight. The 12 counties and cities named in the brief are handled at the reporting layer instead, so DMV can see delivery, reach, CTR and VCR broken out for any of them without fragmenting the buy or stranding budget in low-density inventory.',
        note: 'Sources: Virginia DMV and VDOT distracted driving reporting for calendar year 2024; Virginia DMV Highway Safety Office Distracted Driving Toolkit; DRIVE SMART Virginia driver poll. KORTX Intelligence performance projections are based on historical benchmarks across more than $300M in managed media, with estimated variance of 10% to 15%.' },

      { id: 'drivers', nav: 'Two Drivers', eyebrow: 'KORTX Intelligence', type: 'narrative',
        headline: 'Two drivers, not one demo.',
        intro: 'A 20 to 49 age band is a media buy, not an audience. Before a single impression is bought we define who is actually behind the wheel, what pulls their eyes off the road, where their attention already lives, and the one message most likely to interrupt the habit.',
        narrative: 'The brief splits this campaign at Gen Z and Millennial, so the strategy does too, and those two definitions drive the creative, the channel weighting and the reporting cuts.',
        steps: ['Define the drivers', 'Map them to channels', 'Activate against both'] },

      { id: 'personas', nav: 'Personas', eyebrow: 'Audience Personas', type: 'personas',
        headline: 'Who is actually holding the phone',
        intro: 'Two personas, one for each generation named in the brief. Each carries its own distraction trigger, its own platform set and its own creative direction, and each is measurable separately in Kampus.',
        personas: [
          { name: GENZ, time: 'Ages 20 to 29', demo: 'A20-29 / $35k-70k HHI', message: 'The Message Can Wait. The Crash Won’t.',
            groups: [
              { title: 'Messaging Theme', quote: '“The Message Can Wait. The Crash Won’t.”', rows: [
                ['Hook', 'The phone is an extension of the hand, and the drive is treated as dead time between notifications.'],
                ['Tone', 'Direct, peer level, unsentimental, zero lecture.'],
                ['CTA', '“Phone Down. Eyes Up.”'] ] },
              { title: 'Media Consumption', rows: [
                ['Platforms', 'Snapchat, Twitch, YouTube, TikTok, StockX, Discord.'],
                ['Devices', 'Mobile first almost exclusively, desktop secondary for gaming and streaming.'],
                ['Streaming', 'Heavy, sound-on, short-form through the day and live streaming in the evening.'],
                ['Behaviors', 'Checks notifications at red lights, texts heavily and replies in transit, runs navigation and music from the phone, and in a growing share of cases drives rideshare or delivery where the phone is the job.'] ] },
              { title: 'Behavioral Traits', rows: [
                ['Occasion', 'The daily commute, evening and late night shifts, weekend runs, the November and December delivery surge.'],
                ['Engagement', 'Fast-hook vertical video, creator-native tone, consequence framed honestly without moralizing.'],
                ['Funnel stage', 'Upper funnel attitude and behavior shift, highest exposure per mile of the two personas.'],
                ['Triggers', 'Peer proof, a near miss story, a stat that lands in under three seconds, the cost of one bad second on a paid trip.'] ] },
              { title: 'Psychographics', rows: [
                ['Values', 'Autonomy, authenticity, staying in control.'],
                ['Aspirations', 'Be the person friends actually trust behind the wheel.'],
                ['Personality', 'Confident, distractible, still early in their driving life, allergic to being talked down to.'],
                ['Geography', 'Concentrated in Northern Virginia, Richmond and Hampton Roads, reached through a statewide buy.'] ] }
            ],
            formats: [
              { icon: 'snap', name: 'Snapchat', body: ':06 and :15 vertical, sound-on, native to the feed. The single strongest format fit for this persona, measured on awareness and reach.' },
              { icon: 'rich', name: 'Custom Rich Media', body: 'Interactive unit that rewards participation instead of asserting the risk, measured on CTR.' },
              { icon: 'video', name: 'Online Video', body: ':06 and :15 cuts, where the hook has to land before the skip.' },
              { icon: 'display', name: 'Cross-Platform Display', body: 'Twitch, StockX and gaming environments carrying frequency where demo targeting alone will not reach.' }
            ] },
          { name: MILL, time: 'Ages 30 to 49', demo: 'A30-49 / $75k-140k HHI', message: 'They Are Watching How You Drive.',
            groups: [
              { title: 'Messaging Theme', quote: '“They Are Watching How You Drive.”', rows: [
                ['Hook', 'The distraction is not entertainment, it is logistics, and the passengers in the back seat are learning from it. The oldest of them is nearly old enough to drive.'],
                ['Tone', 'Warm, non-judgmental, mirror-holding rather than finger-pointing.'],
                ['CTA', '“Set It Before You Drive.”'] ] },
              { title: 'Media Consumption', rows: [
                ['Platforms', 'Facebook, Instagram, YouTube, navigation and traffic apps, local news and weather, connected TV.'],
                ['Devices', 'Mobile and desktop through the day, connected TV in the evening after bedtime. Drives the family vehicle, usually a minivan or mid-size SUV.'],
                ['Streaming', 'High, evening weighted, longer-form video over short-form.'],
                ['Behaviors', 'Coordinates pickups and schedules from the car, runs kids between practices, games and after-school activities, answers work messages at lights, checks navigation and traffic on every trip, uses hands-free and still reaches for the screen.'] ] },
              { title: 'Behavioral Traits', rows: [
                ['Occasion', 'School, daycare and after-school sports runs, long two-lane commutes, and the November and December holiday driving stretch.'],
                ['Engagement', 'Family framing, modeling behavior for kids, one specific habit they can adopt today.'],
                ['Funnel stage', 'Upper to mid funnel, high receptivity, acts on concrete behavioral prompts.'],
                ['Triggers', 'A teenager in the house about to start driving, the realization a child is watching, a near miss with kids in the car, a simple pre-drive routine.'] ] },
              { title: 'Psychographics', rows: [
                ['Values', 'Responsibility, safety, common sense, setting an example.'],
                ['Aspirations', 'Be the parent their kids copy on purpose.'],
                ['Personality', 'Overextended across work and home, well-intentioned, quietly guilty about it.'],
                ['Geography', 'Spread across the metros and rural Virginia alike, reached through a statewide buy.'] ] }
            ],
            formats: [
              { icon: 'rich', name: 'Custom Rich Media', body: 'Calculator-style interactive units over-index with this group. Rational framing does the persuasion work.' },
              { icon: 'video', name: 'Online Video', body: ':15 and :30 cuts. This group will finish a longer story if the opening earns it, which protects VCR.' },
              { icon: 'display', name: 'Cross-Platform Display', body: 'Frequency across news, lifestyle and Virginia local publishers, including the rural counties.' },
              { icon: 'snap', name: 'Snapchat', body: 'Extension only. Real but limited scale in the upper end of this age band.' }
            ] }
        ] },

      { id: 'mapping', nav: 'Channel Mapping', eyebrow: 'Persona → Channel Mapping', type: 'table',
        headline: 'Which channel for which driver',
        intro: 'Channels are grouped by the job they do in an awareness-only plan, then scored on fit against each persona. This is what drives the budget split that follows.',
        tables: [{
          cols: ['Channel', GENZ, MILL], grid: '1.2fr 1fr 1fr',
          rows: [
            ['Custom Rich Media', HI, HI],
            ['Online Video (Preroll)', HI, HI],
            ['Cross-Platform Display', MOD, HI],
            ['Snapchat', HI, MOD]
          ] }],
        takeaway: 'Custom Rich Media and Online Video score high against both personas, which is why they carry the two largest shares of the budget. Snapchat concentrates on the Always-On Commuter (Gen Z), where vertical sound-on video is the native format. Cross-Platform Display works hardest against the Multitasking Parent (Millennial) and doubles as the statewide frequency backbone.' }
    ] },

    { key: 'recommend', label: 'What We Recommend', sub: 'The plan, how we find each driver, the creative, and how success is measured.', sections: [
      { id: 'plan', nav: 'Recommendation', eyebrow: 'Media Plan Strategy', type: 'table',
        headline: 'The recommendation',
        intro: 'Four channels, two personas, one statewide flight and one primary KPI per tactic.',
        summary: [
          { k: 'Objective', t: 'Statewide awareness of distracted driving as preventable, with no valid exceptions' },
          { k: 'Audience', t: 'Drivers A20 to 49. Gen Z 20 to 29, Millennial 30 to 49' },
          { k: 'Flight', t: '11/2/2026 to 12/6/2026, 35 days, even pacing' },
          { k: 'Budget', t: '$85,000 total, plus added value' },
          { k: 'Geography', t: 'Virginia statewide, with county and city level reporting' }
        ],
        tables: [{
          title: 'Channel summary',
          cols: ['Tactic', 'Targeting groups', 'Rate', 'Budget', 'Est. impressions', 'Primary KPI'],
          grid: '1.1fr 1.7fr .7fr .7fr .9fr 1fr',
          rows: [
            ['Custom Rich Media', 'Both personas · Third-party', '$9.00 CPM', '$35,000', '3,888,889', { pill: 'CTR', tone: 'high' }],
            ['Online Video (Preroll)', 'Both personas · Third-party', '$19.50 CPM', '$20,000', '1,025,641', { pill: 'VCR', tone: 'high' }],
            ['Cross-Platform Display', 'Both personas · Third-party', '$5.50 CPM', '$20,000', '3,636,364', { pill: 'CTR', tone: 'high' }],
            ['Snapchat (Paid Social)', 'Both personas · Third-party', '25%', '$10,000', 'n/a', { pill: 'Awareness (Reach)', tone: 'high' }],
            ['Added Value Display', 'Follows top-performing group · Third-party', 'n/a', 'Bonus', '185,000', { pill: 'Delivery', tone: 'wait' }],
            ['Total', '2 personas, third-party segments', '', '$85,000', '8,735,894', { pill: 'CTR, VCR, Reach, Delivery', tone: 'ok' }]
          ],
          note: 'All tactics run VA Statewide, 11/2/26 to 12/6/26.'
        }] },

      { id: 'targeting', nav: 'Targeting', eyebrow: 'Audience & Data Strategy', type: 'lists',
        headline: 'How we find them.',
        intro: 'With no CRM, no first-party data and no pixel in scope, third-party segments are the entire targeting strategy. There is nothing to model from, which puts all the weight on choosing the right segments up front and pruning them hard in flight.',
        details: [
          { k: 'Built per persona', v: 'Each persona is assembled from a stack of third-party demographic, behavioral, interest and intent segments, with a hard age gate so Gen Z and Millennial creative never crosses over.', c: 'v', cl: 'Methodology' },
          { k: 'Statewide delivery', v: 'Delivery is Virginia statewide with no geo fences and no isolated budgets.', c: 'v', cl: 'Methodology' },
          { k: 'Situational signals', v: 'The strongest segments here are situational rather than attitudinal, long commutes, high annual mileage, rideshare and delivery app use, and school run patterns, because those identify the drivers whose exposure per week is highest.', c: 'v', cl: 'Methodology' },
          { k: 'Scale without a seed', v: 'With no first-party seed to model from, scale comes from combining segments broadly at launch and pruning the ones that underdeliver as the flight progresses.', c: 'v', cl: 'Methodology' }
        ],
        lists: [
          { title: GENZ, items: [
            { pre: 'Consumer › General Consumer › ', b: 'Gen Z Audience' },
            { pre: 'United States › Automotive › Ownership › Life Stage › ', b: 'Young Drivers (<22)' },
            { pre: 'Adsquare Data › US › Interests › Travel › ', b: 'Daily Commuters' },
            { pre: 'Consumer › General Consumer › ', b: 'Rideshare App Users' },
            { pre: 'Consumer › Media › ', b: 'Twitch Esports Viewers - Precision' },
            { pre: '20/20Audiences › 19 › Likely to Purchase › Retail › Recommerce & Resale › ', b: 'StockX' },
            { pre: 'AudienceMix › Consumer Survey Data › Telco › Wireless or Phone › Use › ', b: 'Text Messenger Heavy' }
          ] },
          { title: MILL, items: [
            { pre: 'Data Alliance › Interest › Page Level › United States (USA) › Lifestyle & Living › Generations › ', b: 'Millennials' },
            { pre: 'Generational › Millennials › ', b: 'Millennial Parents' },
            { pre: 'Lifestyle › Lifestage › Family › ', b: 'Working Parents' },
            { pre: 'Lifestyle › Lifestage › ', b: 'After-School Activities & Sports Parents' },
            { pre: 'Compact Information Systems (by Deep Sync) › Demographic › Family Composition › Parents › ', b: 'Likely New Drivers' },
            { pre: 'NIQ Dstillery Auto › Automotive › Current Vehicle Owners › ', b: 'MiniVan Current Owners' },
            { pre: 'United States › App Usage › App Categories › Maps & Navigation › ', b: 'Real-time Transit / Transportation Info' }
          ] }
        ],
        note: 'No first-party, CRM or pixel data is in scope for this campaign, so all targeting is third-party.' },

      { id: 'creative', nav: 'Creative', eyebrow: 'Creative That Captivates', type: 'creative',
        headline: 'Real units. Live and interactive.',
        intro: 'These are not mockups. They are live KORTX Captivate rich media units, built in-house.',
        callout: { title: 'Every unit here is real, live creative KORTX has shipped.', body: 'Rich media is built in-house, with ideation, production and hosting included in the tactic. The DMV unit will be produced in the campaign’s own creative once assets are delivered, with generational copy and imagery split across the two personas.', cta: 'Request Creative in Your Brand', href: 'mailto:esimone@kortx.io?subject=Virginia%20DMV%20creative' },
        dayparts: [
          { key: 'speeding', name: 'Rich Media · 300×600', time: 'Live Rich Media', img: 'assets/proposals/vadmv/unit-speeding.jpg', live: 'https://captivate.kortx.io/shareablePreview/i91f9', headline: 'Speeding Catches Up With You', concept: 'A statewide traffic-safety unit: bold headline, real consequence imagery and a single Learn More action.' },
          { key: 'tonight', name: 'Rich Media · 300×600', time: 'Live Rich Media', img: 'assets/proposals/vadmv/unit-tonight.jpg', live: 'https://captivate.kortx.io/shareablePreview/qb5c21', headline: 'Have Fun Tonight. Be Here Tomorrow.', concept: 'A message-thread unit that meets the viewer inside the conversation they are already having, then lands the safety line.' }
        ] },

      { id: 'measurement', nav: 'Measurement', eyebrow: 'Measurement & Kampus', type: 'cards',
        headline: 'How success is measured',
        intro: 'Implement, optimize, report. Every tactic is attributable from day one and visible in Kampus while there is still flight left to act on.',
        items: [
          { title: 'Implement', badge: '01', body: 'Every tactic is built as a discrete reporting entity before launch, with Gen Z and Millennial split beneath it, so CTR, VCR and reach are attributable from day one. No pixel or conversion tag is in scope.', meta: [['Output', 'Tactic level reporting structure']] },
          { title: 'Optimize', badge: '02', body: 'Pacing is reviewed continuously through the flight. Third-party segments that underdeliver against their tactic KPI are cut and budget shifts to the top performers, with the added value weight directed to the strongest performer.', meta: [['Output', 'Continuous in-flight optimization']] },
          { title: 'Report', badge: '03', body: 'Every channel reports into Kampus with impressions, clicks, CTR, VCR and reach and frequency, broken out by county and city on request, plus a full KORTX performance report at the close of flight.', meta: [['Output', 'Real-time dashboard, native R&F']] }
        ] },

      { id: 'kampus', nav: 'Kampus', eyebrow: 'Campaign Command Center', type: 'fullbleed',
        headline: 'One source of truth, in real time',
        intro: 'Kampus is where Virginia DMV and TwoTango monitor delivery and track CTR, VCR and reach by channel while there is still flight left to act on.',
        chips: ['Real-time performance', 'Channel breakouts', 'County and city reporting'],
        image: 'assets/proposals/vadmv/kampus-report.jpg',
        imageAlt: 'Kampus campaign report for Virginia DMV FY26 Distracted Driving, channel detail view',
        note: 'Illustrative Kampus view using full-flight projections. Kampus is the reporting source of truth for this campaign, with no third-party ad server or third-party verification in scope.' },

      { id: 'next', nav: 'Next Steps', eyebrow: 'Next Steps', type: 'timeline',
        headline: 'How do we make this happen?',
        intro: 'Five steps from alignment to launch on November 2.',
        timeline: [
          { title: 'Proposal alignment', when: 'Now', body: 'Confirm the channel mix, the added value form, and whether click-throughs route to an existing DMV resource page.' },
          { title: 'Signed insertion order', when: 'Oct 5', body: 'Provided by KORTX or TwoTango. Target October 5 to protect the creative production window.' },
          { title: 'Kickoff call', when: 'Week of Oct 12', body: 'Week of October 12, at least 3 weeks before launch. Budgets, flighting, taxonomy sign-off, geo reporting cuts, creative production, trafficking, and reporting cadence.' },
          { title: 'Key deadlines', when: 'Oct 19 to Oct 28', body: 'Client provides all creative by October 19, at least 2 weeks prior to launch, with KORTX review inside 24 hours. Rich media desktop mockups follow within 4 business days and revisions inside 48 hours of feedback. Custom creative production, trafficking and QA complete by October 28, at least 5 days prior. No Axon or CRM implementation is required for this campaign.' },
          { title: 'Campaign launch', when: 'Nov 2', body: 'KORTX launches on November 2, 2026 and manages, optimizes and reports through December 6.', on: true }
        ] }
    ] }
  ]
};
