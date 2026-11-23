/* Proposal content configuration — Sheetz (illustrative sample).
   Swap this one file to build a proposal for another client; the page
   (Example Proposal 2.dc.html) only renders what is here.
   Confidence keys: v = Verified · i = Inferred · a = Assumed · u = Unknown.
   Optional `cl` overrides the chip label for mixed confidence. */

const SOURCES = {
  bw: { label: 'Supplied before-work ZIP (Sheetz-before-work-300x600-coffee-updated(2).zip)', date: 'Reviewed Sep 29, 2026', url: '' },
  lt: { label: 'Supplied lunchtime ZIP (Sheetz-lunchtime-300x600-new-images(2).zip)', date: 'Reviewed Sep 29, 2026', url: '' },
  aw: { label: 'Supplied after-work ZIP (Sheetz-after-work-300x600-new-images(2).zip)', date: 'Reviewed Sep 29, 2026', url: '' },
  code: { label: 'Supplied ad code (all three packages)', date: 'Reviewed Sep 29, 2026', url: '' }
};

const APPROVED_MARKETS = 'Approved pilot store areas.';

export default {
  meta: {
    client: 'Sheetz',
    clientLogo: 'assets/work/dco/before-work/assets/logo.svg',
    agency: '[Agency name]',
    type: 'Creative Intelligence & Growth Strategy',
    concept: 'Own the Everyday Stop',
    title: 'Different moments. One go-to stop.',
    support: 'From the first coffee to the last snack run, make Sheetz part of the daily routine with creative that changes with the moment.',
    descriptor: 'Convenience retail, food, beverages, and everyday essentials.',
    preparedFor: 'Sheetz Marketing Team',
    preparedBy: 'KORTX Strategy & Creative',
    date: 'September 29, 2026',
    version: 'Illustrative proposal · V1',
    period: 'Proposed eight-week pilot; launch date to be confirmed.',
    confidential: 'Prepared for discussion. Campaign recommendations require client validation.',
    challenge: 'Give people a relevant reason to choose Sheetz during everyday food and beverage decisions—and a clear reason to download the app.',
    purpose: 'Explore how three daypart-based creative experiences could support a focused campaign across selected Sheetz markets. This proposal connects the supplied creative to working audience hypotheses, media recommendations, and a measurement plan.',
    confidence: 'Verified means supported by the supplied assets or confirmed client information. Inferred means an interpretation of that evidence. Assumed means a working hypothesis. Unknown means additional information is required.',
    overview: [
      { k: 'What we found', t: 'The supplied ads already tell three distinct stories: before work, lunchtime, and after work.', c: 'v' },
      { k: 'The opportunity', t: 'Connect each story to an appropriate time and context while maintaining one recognizable brand experience.', c: 'i' },
      { k: 'The recommendation', t: 'Test daypart-based rich media against a consistent control, then use validated engagement and app activity to guide the next phase.', c: 'a' }
    ]
  },
  sources: SOURCES,
  methodology: 'Creative observations are based on the three supplied Sheetz HTML ad packages. Audience profiles, campaign recommendations, and timelines are illustrative. No live media results, customer research, approved budget, or connected reporting data were supplied.',
  scope: 'Final activation depends on approved scope, product availability, delivery settings, measurement access, and client sign-off.',
  closing: 'Make the everyday stop feel right for the moment.',
  seller: {
    name: 'Eric Simone', title: 'Lead Designer · KORTX', email: 'esimone@kortx.io', phone: '248-841-5434',
    headshot: 'assets/team/eric-simone.jpg', headshotFrame: { z: .55, x: 0, y: 0, w: 1125, h: 1500 }, cta: 'Request a Concept', ctaHref: 'mailto:esimone@kortx.io?subject=Sheetz%20pilot',
    headline: 'Let’s build a concept around your goals.',
    contactCopy: 'Share your campaign objective. We’ll help shape a creative direction for your brand.'
  },

  tabs: [
    { key: 'found', label: 'What We Found', sections: [
      { id: 'snapshot', nav: 'Brand Snapshot', eyebrow: 'The business opportunity', type: 'narrative',
        headline: 'One brand. Several reasons to stop.',
        intro: 'The supplied creative positions Sheetz around three everyday occasions. Breakfast and coffee start the day, lunch products answer a midday need, and snacks support the transition into downtime.',
        narrative: 'This proposal builds on those occasions to make the message more relevant when it appears. The creative changes by moment, while the Sheetz identity and app-download action remain consistent.',
        facts: [
          { label: 'Morning assortment', value: '3', note: 'Breakfast sandwiches, coffee, and 5-hour ENERGY bottles appear in the before-work creative.', c: 'v', src: 'bw' },
          { label: 'Lunch assortment', value: '3', note: 'Hot dogs, nachos, and a pizza slice appear in the lunchtime creative.', c: 'v', src: 'lt' },
          { label: 'Evening assortment', value: '3', note: 'Beer, snacks, and an ice cream cone appear in the after-work creative.', c: 'v', src: 'aw' },
          { label: 'Shared destination', value: '1', note: 'All three examples use “Download App” and link to the Sheetz Apple App Store listing.', c: 'v', src: 'code' }
        ],
        details: [
          { k: 'Business model and purchase path', v: 'Working campaign assumption: encourage everyday retail purchases by making relevant products easier to consider, with app adoption as the proposed measurable acquisition objective.', c: 'a' },
          { k: 'Differentiation to explore', v: 'Product variety across the day, presented through one consistent brand experience. Broader competitive differentiation requires research and client input.', c: 'i' },
          { k: 'Geographic footprint', v: 'Pilot markets and eligible store areas will be selected with the Sheetz team. No store count or market coverage is assumed.', c: 'u' },
          { k: 'Proposed business objectives', v: 'Acquire new app users, build consideration for featured products, and understand which daypart messages generate meaningful response.', c: 'a' },
          { k: 'Seasonality and purchase windows', v: 'Start with recurring daily occasions. Add seasonal products or promotional periods after availability and campaign priorities are confirmed.', c: 'a' },
          { k: 'Known constraints', v: 'Budget, account performance, store eligibility, app measurement, and product availability have not been supplied. The displayed “3 miles away” message is fixed sample copy.', c: 'u' }
        ],
        takeaway: 'The creative foundation exists. The next step is connecting it to a defined audience, delivery plan, and measurable action.' },

      { id: 'current', nav: 'Current Activity', eyebrow: 'What we can confirm', type: 'table',
        headline: 'A clear creative foundation. Performance still to validate.',
        intro: 'The supplied files show how the proposed experiences work. They do not establish whether these assets are running in market or how they perform.',
        tables: [{
          cols: ['Channel or touchpoint', 'Activity status', 'What we observed', 'Performance evidence', 'Opportunity or open question'],
          grid: '1fr 1.1fr 1.5fr 1.1fr 1.5fr',
          rows: [
            ['Display / rich media', { pill: 'Creative supplied; activation awaiting confirmation', tone: 'wait' }, 'Three 300×600 HTML ads with rotating products, navigation dots, and swipe interaction', 'No delivery or engagement reporting supplied', 'Does daypart alignment improve response against a consistent control?'],
            ['App acquisition destination', { pill: 'Destination confirmed in supplied code', tone: 'ok' }, 'Each example links to the Sheetz Apple App Store listing', 'No install or post-install reporting supplied', 'Can campaign activity be connected to first opens and downstream actions?'],
            ['Paid social', { pill: 'Not observable without account access', tone: 'none' }, 'No account review included', 'Not supplied', 'Could approved daypart concepts extend into social formats?'],
            ['Paid search', { pill: 'Not observable without account access', tone: 'none' }, 'No search activity reviewed', 'Not supplied', 'How should this pilot complement existing demand capture?'],
            ['Owned app / CRM', { pill: 'Awaiting client confirmation', tone: 'wait' }, 'No lifecycle activity reviewed', 'Not supplied', 'Can acquisition and existing-user messaging be coordinated?']
          ],
          note: 'Source: Supplied HTML assets reviewed September 29, 2026. Account-level activity and reporting periods remain unknown.'
        }],
        items: [
          { title: 'One recognizable system', badge: 'Observed strength', body: 'Consistent branding and CTA treatment connect the three dayparts.', c: 'v', src: 'code' },
          { title: 'Multiple products in one placement', badge: 'Observed strength', body: 'Each carousel introduces three product choices without requiring separate ad units.', c: 'v', src: 'code' },
          { title: 'A direct next step', badge: 'Observed strength', body: '“Download App” provides one consistent action across the examples.', c: 'v', src: 'code' }
        ],
        lists: [
          { title: 'What We Need to Validate', items: [
            { t: 'Existing media activity and campaign overlap.', c: 'u' },
            { t: 'Historical creative and acquisition performance.', c: 'u' },
            { t: 'App-install and post-install measurement availability.', c: 'u' },
            { t: 'Product availability by participating market.', c: 'u' },
            { t: 'The strongest approved reason to download the app.', c: 'u' }
          ] }
        ],
        takeaway: 'Treat these strengths as reasons to test—not evidence of proven performance.' },

      { id: 'competition', nav: 'Competitive Context', eyebrow: 'The choice around the occasion', type: 'table',
        headline: 'Compete for the moment, not just the category.',
        intro: 'For this sample proposal, the competitive framework centers on alternatives a customer might consider for the same occasion. These are illustrative competitive roles, not findings from an audited competitor campaign.',
        tables: [{
          cols: ['Alternative', 'Competitive role', 'Customer decision to investigate', 'Implication for Sheetz'],
          grid: '1fr 1fr 1.4fr 1.6fr',
          rows: [
            ['Other convenience retailers', 'Direct competitor', 'Which stop fits my route and immediate needs?', 'Connect the featured products to a clear occasion and confirmed location context.'],
            ['Coffee shops', 'Substitute for the morning occasion', 'Where should I get my morning drink or breakfast?', 'Give breakfast and coffee a prominent role in the morning message.'],
            ['Quick-service restaurants', 'Substitute for lunch', 'What can I get during my break?', 'Make lunch choices easy to recognize and compare.'],
            ['Grocery and snack retailers', 'Substitute for the evening occasion', 'Where should I pick up something for later?', 'Show relevant snack variety with a simple next step.']
          ],
          note: 'Confidence: Assumed · Illustrative competitive framework. Named competitor profiles, asset examples, websites, and source dates should be added only after research.'
        }],
        details: [
          { k: 'Where alternatives converge', v: 'Working hypothesis: convenience, product appeal, and value may influence several of these decisions.', c: 'a' },
          { k: 'Where Sheetz could differentiate', v: 'Test a connected story across multiple daily occasions, supported by the actual products and app benefits approved for the campaign.', c: 'a' },
          { k: 'What remains unknown', v: 'Competitor media activity, promotional intensity, creative performance, and overlap within proposed pilot markets.', c: 'u' },
          { k: 'Opportunity worth testing', v: 'Does a message tied to the current occasion create a stronger response than one general message used throughout the day?', c: 'a' }
        ] },

      { id: 'insights', nav: 'Creative & Customer Insights', eyebrow: 'From product variety to personal relevance', type: 'table',
        headline: 'The product changes. The everyday need stays simple.',
        intro: 'Each supplied ad answers a different version of the same question: “What sounds right for this part of my day?”',
        tables: [{
          title: 'Existing creative review',
          cols: ['Asset', 'Main message and products', 'Observable strength', 'Question to resolve', 'Potential improvement'],
          grid: '.8fr 1.4fr 1.2fr 1.3fr 1.3fr',
          rows: [
            ['Before Work', '“RISE. FUEL. GO.” Breakfast, coffee, and energy products', 'A direct morning theme with several product options', 'What approved app benefit supports the download request?', 'Connect the morning occasion to a specific, verified app benefit.'],
            ['Lunchtime', '“FUEL UP. LUNCH ON.” Hot dogs, nachos, and pizza', 'Recognizable lunch choices in a browsable carousel', 'Which products are available across the selected markets?', 'Align the assortment with participating locations.'],
            ['After Work', '“CLOCK OUT. SNACK ON.” Beer, snacks, and ice cream', 'A distinct transition from work to downtime', 'Which assortment is appropriate for each planned audience and market?', 'Prepare an approved assortment and alternate version where needed.']
          ],
          note: 'All examples: 300×600 HTML rich media · CTA: Download App · Status: Supplied illustrative example · Verified performance: Not supplied.'
        }],
        items: [
          { title: 'The morning decision', badge: 'Customer insight', body: 'Need: Find a practical start to the day.', meta: [['Trigger', 'Preparing for work or heading out.'], ['Possible barrier', 'An extra stop or unclear product relevance.'], ['Decision criteria to validate', 'Convenience, preferred products, and value.'], ['Message implication', 'Lead with breakfast and coffee; make the next action easy to understand.']], c: 'a' },
          { title: 'The lunch decision', badge: 'Customer insight', body: 'Need: Find something appealing during a break.', meta: [['Trigger', 'A midday meal decision.'], ['Possible barrier', 'Too many choices or uncertainty about what is available.'], ['Decision criteria to validate', 'Product appeal, convenience, and fit with the occasion.'], ['Message implication', 'Show a small, recognizable selection instead of a broad brand message.']], c: 'a' },
          { title: 'The after-work decision', badge: 'Customer insight', body: 'Need: Pick up something enjoyable for downtime.', meta: [['Trigger', 'Finishing work or planning the evening.'], ['Possible barrier', 'No immediate reason to change an established routine.'], ['Decision criteria to validate', 'Relevant assortment and ease of purchase.'], ['Message implication', 'Make the snack occasion tangible through product-led creative.']], c: 'a' }
        ],
        note: 'Evidence basis: Working customer hypotheses inspired by the supplied creative; no customer study was supplied.',
        takeaway: 'Use the occasion to make the products relevant. Use an approved app benefit to make the CTA compelling.' },

      { id: 'opportunities', nav: 'Opportunities', eyebrow: 'Where to focus first', type: 'cards',
        headline: 'Turn three executions into one testable strategy.',
        intro: 'Three priorities connect what we found to what we recommend next.',
        items: [
          { title: 'Match the message to the moment', badge: 'Priority: High', body: 'Three distinct daypart variations are already supplied.', c: 'v', cl: 'Verified assets · Assumed benefit',
            meta: [['Why it matters', 'The assets provide a practical foundation for testing time-based relevance.'], ['Potential benefit', 'Better alignment between the message and the viewing occasion.'], ['Direction', 'Compare daypart delivery with a consistent control.'], ['Validation needed', 'Delivery capability, time-zone handling, and test design.']],
            link: { label: 'Strategic Direction and Dynamic Creative', tab: 'recommend', sec: 'strategy' } },
          { title: 'Strengthen the reason to download', badge: 'Priority: High', body: 'Every example uses the same app-download CTA.', c: 'i',
            meta: [['Why it matters', 'Product interest does not automatically explain the value of installing an app.'], ['Potential benefit', 'A clearer connection between interest and action.'], ['Direction', 'Add a client-approved app benefit to supporting campaign messaging.'], ['Validation needed', 'Approved app features, offers, and destination experience.']],
            link: { label: 'Creative Recommendations', tab: 'recommend', sec: 'creative' } },
          { title: 'Establish the measurement path', badge: 'Priority: High', body: 'No campaign reporting or app attribution setup was supplied.', c: 'u', cl: 'Unknown readiness',
            meta: [['Why it matters', 'Ad clicks alone cannot establish app acquisition or revenue.'], ['Potential benefit', 'A defensible view of campaign contribution.'], ['Direction', 'Validate tracking before activation.'], ['Validation needed', 'Platform access, event availability, and reporting ownership.']],
            link: { label: 'Measurement & Reporting', tab: 'recommend', sec: 'measurement' } }
        ],
        cta: { label: 'Explore the Recommended Strategy', tab: 'recommend', sec: 'strategy' } },

      { id: 'research', nav: 'Research Notes', eyebrow: 'Optional research modules', type: 'cards',
        headline: 'What we reviewed, and what comes next.',
        intro: 'Numeric audit scoring, competitor spend estimates, and additional retail analysis stay hidden until supporting evidence is available.',
        items: [
          { title: 'Make the next step match the promise.', badge: 'Conversion path', body: 'The supplied examples send users to an Apple App Store listing. Confirm the approved destination for each device and whether the arrival experience reinforces the products and app benefit shown in the ad.', meta: [['Status', 'Destination confirmed in code; end-to-end conversion experience not audited.']], c: 'v', cl: 'Verified destination', src: 'code' },
          { title: 'Start where the campaign can deliver consistently.', badge: 'Geographic and seasonal', body: 'Select pilot markets using confirmed store coverage, product availability, business priorities, and measurable campaign scale. Add seasonal variations when the relevant dates and assortments are approved.', meta: [['Status', 'Pending client inputs.']], c: 'u' },
          { title: 'Research methodology', badge: 'Methodology', body: 'This illustrative proposal draws from the three supplied HTML ad packages. Asset copy, dimensions, destinations, and interaction logic were reviewed. No paid-media accounts, customer research, sales data, or competitor campaign reports were supplied.', c: 'v', cl: 'Supplied assets only' }
        ] }
    ] },

    { key: 'recommend', label: 'What We Recommend', sections: [
      { id: 'strategy', nav: 'Strategy', eyebrow: 'Own the Everyday Stop', type: 'cards',
        headline: 'Show up with a reason that fits right now.',
        intro: 'Use daypart-based creative to connect Sheetz products to everyday occasions, then give interested customers a clear, approved reason to download the app.',
        details: [
          { k: 'Primary business objective', v: 'Acquire new app users within selected pilot markets.', c: 'a' },
          { k: 'Primary desired action', v: 'A measured first app open following installation, subject to attribution availability.', c: 'a' },
          { k: 'Supporting objectives', v: 'Build product consideration, identify responsive creative themes, and understand which messages support downstream app activity.', c: 'a' },
          { k: 'Relationship to current activity', v: 'Position the pilot as a focused addition to the existing plan. Confirm channel overlap and ownership before deciding whether it replaces any current investment.', c: 'u' },
          { k: 'Dependencies', v: 'Approved markets, budget, product assortment, app messaging, tracking access, and delivery rules.', c: 'u' }
        ],
        items: [
          { title: 'Lead with the occasion.', badge: 'Priority 1', body: 'Build on the three supplied daypart stories.', meta: [['Connects to', 'Match the message to the moment']], c: 'v', cl: 'Verified assets' },
          { title: 'Clarify the app benefit.', badge: 'Priority 2', body: 'Connect the shared CTA to an approved customer value proposition.', meta: [['Connects to', 'Strengthen the reason to download']], c: 'i' },
          { title: 'Keep the initial channel plan focused.', badge: 'Priority 3', body: 'Establish a rich media test before expanding into additional formats.', meta: [['Connects to', 'Match the message to the moment']], c: 'a' },
          { title: 'Measure beyond the click.', badge: 'Priority 4', body: 'Connect creative response to app events wherever measurement permits.', meta: [['Connects to', 'Establish the measurement path']], c: 'u' }
        ] },

      { id: 'personas', nav: 'Audiences', eyebrow: 'Three occasions to understand', type: 'personas',
        headline: 'Build around needs, not invented demographics.',
        intro: 'These illustrative personas represent situations the creative could address. They are not validated customer segments, and one person may move between all three.',
        personas: [
          { name: 'The Morning Starter', time: 'Before Work', desc: 'Someone preparing for the day who wants a relevant breakfast or beverage option.', message: 'Rise. Fuel. Go.', funnel: 'Consideration', c: 'a', cl: 'Assumed persona · Verified creative alignment',
            fields: [['Business priority', 'Morning product consideration and app acquisition.'], ['Core need', 'A straightforward start to the day.'], ['Trigger', 'Leaving home or beginning the workday.'], ['Possible frustration', 'An extra decision in a busy routine.'], ['Decision criteria', 'Relevant products, convenience, and clear value.'], ['Geography', APPROVED_MARKETS], ['Behavioral hypothesis', 'May respond to messages connected to an established morning routine.'], ['Motivation', 'Get ready and get moving.'], ['Media and device hypothesis', 'Mobile placements in relevant morning contexts; validate reach and inventory.'], ['Supporting proof', 'The supplied breakfast, coffee, and energy-product creative.'], ['Creative job', 'Make the morning assortment easy to recognize.'], ['Recommended format', 'Daypart-based rich media.'], ['Desired action', 'Download and open the app.']] },
          { name: 'The Lunch Break Decider', time: 'Lunchtime', desc: 'Someone deciding what to eat during the middle of the day.', message: 'Fuel Up. Lunch On.', funnel: 'Consideration', c: 'a', cl: 'Assumed persona · Verified creative alignment',
            fields: [['Business priority', 'Midday product consideration and app acquisition.'], ['Core need', 'An appealing lunch choice.'], ['Trigger', 'Approaching a meal break.'], ['Possible frustration', 'Choice overload or uncertainty about available options.'], ['Decision criteria', 'Product appeal, convenience, and fit with the break.'], ['Geography', APPROVED_MARKETS], ['Behavioral hypothesis', 'May respond to a focused selection of recognizable food choices.'], ['Motivation', 'Make the break worthwhile.'], ['Media and device hypothesis', 'Mobile food and everyday-interest contexts; validate availability.'], ['Supporting proof', 'The supplied hot dog, nacho, and pizza creative.'], ['Creative job', 'Help the viewer discover a product that fits the occasion.'], ['Recommended format', 'Product-carousel rich media.'], ['Desired action', 'Download and open the app.']] },
          { name: 'The After-Work Unwinder', time: 'After Work', desc: 'Someone shifting from work into personal time.', message: 'Clock Out. Snack On.', funnel: 'Consideration', c: 'a', cl: 'Assumed persona · Verified creative alignment',
            fields: [['Business priority', 'Evening product consideration and app acquisition.'], ['Core need', 'Something enjoyable for downtime.'], ['Trigger', 'Finishing work or planning the evening.'], ['Possible frustration', 'An established routine with little reason to try a different stop.'], ['Decision criteria', 'Relevant assortment and convenience.'], ['Geography', APPROVED_MARKETS], ['Behavioral hypothesis', 'May respond to product-led messages associated with a small everyday treat.'], ['Motivation', 'Switch off and enjoy the evening.'], ['Media and device hypothesis', 'Mobile leisure contexts; validate audience and inventory.'], ['Supporting proof', 'The supplied snack and ice cream creative, with final assortment subject to approval.'], ['Creative job', 'Connect the products to a recognizable downtime occasion.'], ['Recommended format', 'Evening rich media.'], ['Desired action', 'Download and open the app.']] }
        ] },

      { id: 'targeting', nav: 'Activation', eyebrow: 'Turn occasions into delivery rules', type: 'table',
        headline: 'Start with context. Add audience data where it helps.',
        intro: 'Begin with approved geography, contextual relevance, and daypart scheduling. Introduce first-party or retargeting audiences only when access, eligibility, and scale are confirmed.',
        tables: [
          { cols: ['Audience approach', 'Related persona', 'Qualifying signal and source', 'Timing / geography', 'Requirements and status'],
            grid: '1fr 1fr 1.4fr 1.2fr 1.4fr',
            rows: [
              ['Morning context', 'Morning Starter', 'Relevant page context plus delivery time', 'Approved markets; morning window', { pill: 'Inventory and scheduling validation required', tone: 'wait' }],
              ['Lunch context', 'Lunch Break Decider', 'Relevant food or everyday-interest context plus delivery time', 'Approved markets; midday window', { pill: 'Inventory and scheduling validation required', tone: 'wait' }],
              ['Evening context', 'After-Work Unwinder', 'Relevant leisure context plus delivery time', 'Approved markets; approved evening window', { pill: 'Assortment and delivery validation required', tone: 'wait' }],
              ['Eligible site visitors', 'Multiple personas', 'Consented first-party website activity', 'Approved markets and recency window', { pill: 'Requires tagging, eligible volume, and approval', tone: 'none' }],
              ['Existing app-user suppression', 'Multiple personas', 'Approved first-party app audience', 'Where reliable matching is available', { pill: 'Requires onboarding and platform support', tone: 'none' }]
            ],
            note: 'These are proposed approaches, not confirmed purchasable audience segments.' },
          { title: 'Activation mapping',
            cols: ['Persona', 'Approach', 'Message', 'Channel / format', 'Desired action'],
            grid: '1.1fr 1.2fr 1fr 1fr .9fr',
            rows: [
              ['Morning Starter', 'Context + geography + time', 'Rise. Fuel. Go.', 'Rich media carousel', 'App first open'],
              ['Lunch Break Decider', 'Context + geography + time', 'Fuel Up. Lunch On.', 'Rich media carousel', 'App first open'],
              ['After-Work Unwinder', 'Context + geography + time', 'Clock Out. Snack On.', 'Rich media carousel', 'App first open']
            ] }
        ],
        details: [
          { k: 'Exclusions', v: 'Exclude areas outside approved coverage and any placements or audiences incompatible with the approved assortment. Suppress existing app users from acquisition activity where reliable, permitted matching exists.', c: 'a' },
          { k: 'Readiness', v: 'Contextual and geographic planning can begin with the supplied creative. Launch requires approved settings and trafficking QA. Retargeting and app-user suppression require additional data setup.', c: 'i' }
        ] },

      { id: 'channels', nav: 'Media Strategy', eyebrow: 'Give each channel a clear job', type: 'table',
        headline: 'Focus the launch. Expand with evidence.',
        intro: 'Start where the creative already works, then add channels once results justify them.',
        tables: [{
          cols: ['Tactic', 'Funnel role', 'Objective and audience', 'Creative approach', 'Evaluation metric', 'Phase'],
          grid: '1.1fr .9fr 1.4fr 1.2fr 1.2fr .9fr',
          rows: [
            ['Contextual rich media prospecting', 'Awareness / consideration', 'Introduce relevant products to the three occasion-based audiences', 'Daypart-based 300×600 carousels', 'Viewability, user-initiated engagement, click-through rate', { pill: 'Initial pilot', tone: 'ok' }],
            ['Eligible display retargeting', 'Consideration / conversion', 'Re-engage approved first-party audiences', 'Reinforce an approved app benefit', 'Attributed first opens and acquisition cost, if available', { pill: 'Conditional pilot addition', tone: 'wait' }],
            ['Paid social adaptation', 'Awareness / consideration', 'Extend promising messages into a separately validated audience plan', 'Adapt approved daypart concepts to platform-native formats', 'Platform diagnostics and attributable app activity', { pill: 'Later test', tone: 'none' }],
            ['Owned app messaging', 'Retention', 'Support repeat activity among existing users', 'Client-approved occasion-based messages', 'Relevant app actions, if available', { pill: 'Client-led expansion', tone: 'none' }]
          ] }],
        details: [
          { k: 'Why rich media leads', v: 'The supplied assets already support product exploration and three distinct occasions, making rich media the most direct place to test the concept.', c: 'i' },
          { k: 'How channels work together', v: 'Prospecting introduces the occasion. Eligible follow-up activity reinforces the app benefit. Owned communications can support existing users through a separate retention objective.', c: 'a' },
          { k: 'Ownership', v: 'Proposed roles: KORTX for media and creative coordination; Sheetz for brand approvals, app access, and owned-channel alignment. Final responsibilities to be confirmed.', c: 'u' }
        ] },

      { id: 'creative', nav: 'Creative', eyebrow: 'See the strategy in action', type: 'creative',
        headline: 'Three moments. Three reasons to stop.',
        intro: 'Explore the supplied Sheetz creative by daypart. Each example changes the headline and product assortment while retaining a consistent brand identity and “Download App” action.',
        selectorLabel: 'Choose a moment',
        hint: 'Use the dots or swipe to explore products.',
        previewStatus: 'Interactive sample',
        fallback: 'This preview is unavailable. Open the standalone example to explore the creative.',
        fallbackCta: 'Open Creative Preview',
        dayparts: [
          { key: 'before-work', name: 'Before Work', time: '5:00–10:59 a.m.', src: 'assets/work/dco/before-work/index.html', headline: 'Rise. Fuel. Go.', tag: 'BEFORE WORK', products: 'Breakfast sandwiches, coffee, 5-hour ENERGY', label: 'Sheetz_Before work',
            changes: [
              { el: 'Time of Day Graphic', now: 'BEFORE WORK', why: 'Names the moment, so the ad reads as meant for right now.', measure: 'Every impression is labeled Sheetz_Before work, so results read by daypart.' },
              { el: 'Headline', now: 'Rise. Fuel. Go.', why: 'Speaks to the start of the day instead of a general brand line.', measure: 'Download App clicks for the morning headline versus the control.' },
              { el: 'Product carousel', now: 'Breakfast sandwiches, coffee, 5-hour ENERGY', why: 'Leads with what people actually want before work.', measure: 'User-initiated product_navigation events by product.' }
            ],
            persona: 'The Morning Starter', message: 'Big flavor. Early start.',
            concept: 'One Sheetz ad layout that changes its tag, headline and products with the time of day, so every viewer sees the version that fits their moment.',
            changed: 'Start the story with breakfast sandwiches, coffee, and energy products.', why: 'The assortment and headline create a recognizable morning occasion.', metric: 'User-initiated product navigation, CTA clicks, and attributed app events where available.',
            spec: [['Campaign objective', 'Morning product consideration and app acquisition.'], ['Format', '300×600 HTML rich media.'], ['Interaction', 'Browse products using navigation dots or swipe gestures; products also rotate automatically.'], ['CTA', 'Download App.'], ['Status', 'Supplied illustrative example.'], ['Asset', 'Sheetz-before-work-300x600-coffee-updated(2).zip']] },
          { key: 'lunchtime', name: 'Lunchtime', time: '11:00 a.m.–3:59 p.m.', src: 'assets/work/dco/lunchtime/index.html', headline: 'Fuel Up. Lunch On.', tag: 'LUNCHTIME', products: 'Hot dogs, nachos, pizza', label: 'Sheetz_Lunchtime',
            changes: [
              { el: 'Time of Day Graphic', now: 'LUNCHTIME', why: 'Signals that this ad is about the lunch decision.', measure: 'Every impression is labeled Sheetz_Lunchtime, so results read by daypart.' },
              { el: 'Headline', now: 'Fuel Up. Lunch On.', why: 'Turns the break into the reason to stop.', measure: 'Download App clicks for the lunch headline versus the control.' },
              { el: 'Product carousel', now: 'Hot dogs, nachos, pizza', why: 'A small, recognizable lunch selection is easier to choose from.', measure: 'User-initiated product_navigation events by product.' }
            ],
            persona: 'The Lunch Break Decider', message: 'Your lunch break starts here.',
            concept: 'One Sheetz ad layout that changes its tag, headline and products with the time of day, so every viewer sees the version that fits their moment.',
            changed: 'Present hot dogs, nachos, and pizza as a focused set of lunchtime choices.', why: 'The execution puts recognizable food choices at the center of the decision.', metric: 'User-initiated product navigation, CTA clicks, and attributed app events where available.',
            spec: [['Campaign objective', 'Midday product consideration and app acquisition.'], ['Format', '300×600 HTML rich media.'], ['Interaction', 'Browse the three-product carousel using dots or swipe gestures.'], ['CTA', 'Download App.'], ['Status', 'Supplied illustrative example.'], ['Asset', 'Sheetz-lunchtime-300x600-new-images(2).zip']] },
          { key: 'after-work', name: 'After Work', time: '4:00 p.m.–4:59 a.m.', src: 'assets/work/dco/after-work/index.html', headline: 'Clock Out. Snack On.', tag: 'AFTER WORK', products: 'Beer, snacks, ice cream', label: 'Sheetz_After work',
            changes: [
              { el: 'Time of Day Graphic', now: 'AFTER WORK', why: 'Marks the shift from work to downtime.', measure: 'Every impression is labeled Sheetz_After work, so results read by daypart.' },
              { el: 'Headline', now: 'Clock Out. Snack On.', why: 'Frames the stop as a small reward on the way home.', measure: 'Download App clicks for the evening headline versus the control.' },
              { el: 'Product carousel', now: 'Beer, snacks, ice cream', why: 'Shows the treats that fit the evening occasion.', measure: 'User-initiated product_navigation events by product.' }
            ],
            persona: 'The After-Work Unwinder', message: 'Good picks for your downtime.',
            concept: 'One Sheetz ad layout that changes its tag, headline and products with the time of day, so every viewer sees the version that fits their moment.',
            changed: 'Connect the end of the workday to snacks and downtime through the supplied product assortment.', why: 'The headline establishes a different occasion while keeping the campaign visually connected.', metric: 'User-initiated product navigation, CTA clicks, and attributed app events where available.',
            spec: [['Campaign objective', 'Evening product consideration and app acquisition.'], ['Format', '300×600 HTML rich media.'], ['Interaction', 'Browse the product carousel using dots or swipe gestures.'], ['CTA', 'Download App.'], ['Status', 'Supplied illustrative example; final assortment requires approval.'], ['Asset', 'Sheetz-after-work-300x600-new-images(2).zip']] }
        ],
        dynamic: {
          headline: 'Change the conditions. See the creative respond.',
          copy: 'Select a time of day to see how the headline and featured products change around the occasion.',
          table: { cols: ['Signal', 'Illustrative rule', 'What changes', 'Example'], grid: '.8fr 1.1fr 2fr .9fr',
            rows: [
              ['Time of day', '5:00–10:59 a.m.', 'Daypart label, headline, introduction, and product assortment', 'Before Work'],
              ['Time of day', '11:00 a.m.–3:59 p.m.', 'Daypart label, headline, introduction, and product assortment', 'Lunchtime'],
              ['Time of day', '4:00 p.m.–4:59 a.m.', 'Daypart label, headline, introduction, and product assortment', 'After Work']
            ] },
          details: [
            ['What changed', 'The occasion, headline, and products update. The brand identity and app-download CTA stay consistent.'],
            ['Expected benefit', 'Test whether an occasion-based message generates a stronger response than a general message.'],
            ['Implementation note', 'These windows reflect the supplied code’s optional automatic mode, which uses the viewer’s device clock. Each ZIP defaults to its assigned daypart. The presentation selector demonstrates variations; it does not prove live campaign scheduling.'],
            ['Data dependency', 'Time-based delivery requires an approved time source and scheduling setup. No external feed is required for the supplied clock-based logic.'],
            ['Location note', '“3 miles away to the nearest location” is fixed demonstration text. It is not calculated from the viewer’s location.'],
            ['Proposed fallback', 'If the time signal is unavailable, serve an approved general-purpose variation. That fallback asset is not included in the supplied files.']
          ]
        } },

      { id: 'flighting', nav: 'Timeline', eyebrow: 'A phased pilot', type: 'cards',
        headline: 'Confirm the setup. Launch the test. Learn what earns the next step.',
        intro: 'Timing is illustrative and begins after approvals and setup are complete.',
        items: [
          { title: 'Align and prepare', badge: 'Prelaunch', body: 'Confirm the business goal, markets, assortment, app benefit, and measurement plan.', c: 'a',
            meta: [['Timing', 'Before the pilot begins.'], ['Channels', 'Trafficking and setup only.'], ['Creative', 'Three approved variations, control creative, and required fallback assets.'], ['Audience activity', 'Validate targeting availability and any eligible first-party setup.'], ['Dependencies', 'Client approvals and platform access.'], ['Proposed owners', 'Sheetz marketing, KORTX strategy, media, and creative teams.'], ['Decision gate', 'Creative, delivery, and tracking pass QA.']] },
          { title: 'Launch and establish a baseline', badge: 'Weeks 1–2', body: 'Verify delivery and collect initial response data.', c: 'a',
            meta: [['Channels', 'Approved rich media placements.'], ['Creative', 'Daypart variations and control.'], ['Audience activity', 'Monitor approved targeting and audience scale.'], ['Dependencies', 'Successful prelaunch QA.'], ['Proposed owner', 'KORTX media team.'], ['Decision gate', 'Delivery and measurement are stable enough to evaluate.']] },
          { title: 'Evaluate and optimize', badge: 'Weeks 3–6', body: 'Identify meaningful differences by creative, daypart, and placement.', c: 'a',
            meta: [['Channels', 'Continue the approved pilot; introduce eligible follow-up activity only if ready.'], ['Creative', 'Controlled adjustments based on sufficient evidence.'], ['Audience activity', 'Refine eligible audiences without undermining the test.'], ['Dependencies', 'Adequate data and consistent reporting.'], ['Proposed owners', 'KORTX media and creative teams.'], ['Decision gate', 'Evidence supports maintaining, revising, or reallocating activity.']] },
          { title: 'Recommend the next phase', badge: 'Weeks 7–8', body: 'Summarize findings and decide whether to expand, refine, or repeat the test.', c: 'a',
            meta: [['Creative', 'Document promising messages and unresolved questions.'], ['Audience activity', 'Identify potential expansion areas.'], ['Dependencies', 'Final reporting and client review.'], ['Proposed owners', 'KORTX strategy and Sheetz marketing.'], ['Decision gate', 'Agreement on the next campaign scope.']] }
        ] },

      { id: 'investment', nav: 'Investment', eyebrow: 'Size the test around the question', type: 'cards',
        headline: 'Build the investment around a meaningful learning plan.',
        intro: 'No campaign budget has been supplied. Final investment should reflect the selected markets, channel scope, measurement requirements, and the scale needed to evaluate the test.',
        details: [
          { k: 'Budget status', v: 'To be confirmed.', c: 'u' },
          { k: 'Planning currency', v: 'USD.', c: 'a' },
          { k: 'Investment period', v: 'Proposed eight-week pilot.', c: 'a' }
        ],
        lists: [
          { title: 'Decisions needed to size the plan', items: [
            { t: 'Which markets and store areas should participate?', c: 'u' },
            { t: 'Is the primary goal app acquisition, product consideration, or another approved outcome?', c: 'u' },
            { t: 'What comparison must the test support?', c: 'u' },
            { t: 'Which channels and audiences are ready to activate?', c: 'u' },
            { t: 'What creative adaptation and measurement work is required?', c: 'u' }
          ] },
          { title: 'Scope', items: [
            { t: 'Proposed for discussion: media activation, trafficking of approved creative, measurement QA, optimization, and reporting.', c: 'a' },
            { t: 'To confirm: creative production, additional sizes, third-party data, app measurement fees, and any incremental technical work.', c: 'u' }
          ] }
        ],
        cta: { label: 'Confirm Pilot Scope', tab: 'recommend', sec: 'next' } },

      { id: 'measurement', nav: 'Measurement', eyebrow: 'From attention to action', type: 'table',
        headline: 'Measure what people explore—and what happens next.',
        intro: 'Separate interaction inside the ad from the app and purchase activity that follows.',
        details: [
          { k: 'Primary business outcome', v: 'New app-user acquisition within the approved pilot markets.', c: 'a' },
          { k: 'Primary conversion event', v: 'Attributed first app open, if supported by the approved measurement setup.', c: 'u' },
          { k: 'Supporting events', v: 'User-initiated product navigation, CTA clicks, and validated post-install actions.', c: 'a' },
          { k: 'Channel diagnostics', v: 'Delivery, viewability, click-through rate, user-initiated engagement, and conversion metrics where available.', c: 'a' }
        ],
        tables: [{
          title: 'Proposed event plan',
          cols: ['Event', 'Trigger', 'Business purpose', 'Required parameters', 'Proposed owner', 'Status'],
          grid: '1fr 1.3fr 1.2fr 1.3fr 1fr 1fr',
          rows: [
            ['product_navigation', 'User selects a carousel dot or completes a swipe', 'Understand intentional product exploration', 'Creative ID, daypart, product, interaction type', 'Creative / ad-serving team', { pill: 'Requires instrumentation', tone: 'wait' }],
            ['app_cta_click', 'User selects “Download App”', 'Measure explicit CTA response', 'Creative ID, daypart, placement, destination', 'Media / ad-serving team', { pill: 'Requires tracking QA', tone: 'wait' }],
            ['ad_body_click', 'User clicks another clickable area of the ad', 'Separate general click-throughs from CTA response', 'Creative ID, daypart, placement', 'Media / ad-serving team', { pill: 'Requires tracking QA', tone: 'wait' }],
            ['app_first_open', 'Measurement system records an eligible first open', 'Evaluate app acquisition', 'Campaign identifiers and permitted attribution fields', 'App analytics team', { pill: 'Access and availability unknown', tone: 'none' }],
            ['first_purchase', 'App records a validated first purchase', 'Evaluate downstream customer activity', 'Transaction ID, value, currency, permitted campaign association', 'Client app / data team', { pill: 'Conditional on data access', tone: 'none' }]
          ] }],
        lists: [
          { title: 'Rules we will hold to', items: [
            { t: 'Engagement definition: automatic product rotation is not a user interaction. Report user-triggered carousel activity separately.', c: 'v', cl: 'Verified in code' },
            { t: 'Tracking requirements: confirm ad-server events, campaign naming, destination tracking, app attribution, and reporting access before launch.', c: 'u' },
            { t: 'Attribution: use the agreed source and windows consistently; report click-through and view-through separately; do not call attributed activity incremental lift without an appropriate test.', c: 'a' },
            { t: 'Limits: an ad click is not an app install. An app install is not a purchase. Revenue and ROAS require validated transaction and spend data.', c: 'a' }
          ] },
          { title: 'Cadence and optimization', items: [
            { t: 'Reporting cadence: weekly optimization summaries, a midpoint review, and a final pilot assessment.', c: 'a' },
            { t: 'Baseline and targets: use a comparable prelaunch period where available and a concurrent control. Agree targets after reviewing historical data, budget, and measurement coverage.', c: 'a' },
            { t: 'How findings guide optimization: refine product emphasis, placements, and daypart rules. Avoid declaring a winner from small or incomplete samples.', c: 'a' }
          ] }
        ],
        panel: { title: 'See the campaign story in one place.', body: 'Review delivery, creative engagement, and available app outcomes together to understand where activity is creating interest and where the next step needs improvement.', label: 'Illustrative reporting layout—not live Sheetz data.', empty: 'Campaign reporting will appear once approved data sources are connected.' } },

      { id: 'next', nav: 'Next Steps', eyebrow: 'Move from concept to campaign', type: 'cards',
        headline: 'Let’s define the pilot.',
        intro: 'Five decisions move this proposal from concept to a measurable campaign.',
        items: [
          { title: 'Align on the outcome', badge: 'Step 1', body: 'Confirm the primary business objective and the customer action that will define success.', c: 'u', cl: 'To confirm', meta: [['Owner', 'Sheetz marketing and KORTX strategy.'], ['Timing', 'Planning kickoff.'], ['Required input', 'Business priorities and available historical context.'], ['Unlocks', 'A focused campaign brief.']] },
          { title: 'Confirm markets and investment', badge: 'Step 2', body: 'Select participating areas and establish the approved campaign scope.', c: 'u', cl: 'To confirm', meta: [['Owner', 'Sheetz marketing and KORTX media.'], ['Timing', 'Before media planning is finalized.'], ['Required input', 'Store coverage, market priorities, and budget.'], ['Unlocks', 'A proposed media plan.']] },
          { title: 'Approve creative and the app promise', badge: 'Step 3', body: 'Confirm featured products, daypart messaging, CTA support, and required variations.', c: 'u', cl: 'To confirm', meta: [['Owner', 'Sheetz brand team and KORTX creative.'], ['Timing', 'Before production and trafficking sign-off.'], ['Required input', 'Approved assortment, app benefits, and brand feedback.'], ['Unlocks', 'Launch-ready creative preparation.']] },
          { title: 'Validate measurement', badge: 'Step 4', body: 'Confirm event definitions, access, and attribution before activity begins.', c: 'u', cl: 'To confirm', meta: [['Owner', 'Client app analytics team and KORTX measurement leads.'], ['Timing', 'Before launch approval.'], ['Required input', 'Platform access, event documentation, and reporting requirements.'], ['Unlocks', 'A measurable pilot.']] },
          { title: 'Approve activation', badge: 'Step 5', body: 'Review the final plan, creative, tracking checks, and reporting cadence.', c: 'u', cl: 'To confirm', meta: [['Owner', 'Sheetz marketing and KORTX account team.'], ['Timing', 'After readiness checks are complete.'], ['Required input', 'Final campaign approval.'], ['Unlocks', 'Scheduling and activation.']] }
        ],
        details: [
          { k: 'Client decisions needed', v: 'Primary outcome, pilot markets, investment, product assortment, and app messaging.', c: 'u' },
          { k: 'Information still required', v: 'Relevant account performance, app measurement details, store eligibility, and approved contacts.', c: 'u' },
          { k: 'Proposed next KORTX deliverable', v: 'A refined campaign brief, media recommendation, and creative implementation plan based on the agreed inputs and scope.', c: 'a' }
        ],
        cta: { label: 'Discuss the Pilot', href: 'mailto:esimone@kortx.io?subject=Sheetz%20pilot' },
        cta2: { label: 'Review the Creative Again', tab: 'recommend', sec: 'creative' } }
    ] }
  ]
};
