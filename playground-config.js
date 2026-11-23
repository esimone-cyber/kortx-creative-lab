/* ════════════════════════════════════════════════════════════════════════
   PLAYGROUND CONFIG — editable content only.

   Nothing in this file animates anything. Swap copy, colors and media here
   and the interactions in the page pick them up unchanged.

   media: null                                   → the built placeholder
   media: { kind: 'image', src: 'assets/x.png' } → png / jpg / gif
   media: { kind: 'video', src: 'assets/x.mp4' } → mp4, autoplaying and muted
   media: { kind: 'html',  html: '<div>…</div>' }→ a live HTML unit
   ════════════════════════════════════════════════════════════════════════ */

/* ── "Creative for every occasion" — six goals, six 300×600 builds ──
   parts[] is what the text window beneath the ad says when a visitor clicks
   that piece of the creative. key must match a data-occ-part in the markup. */
export const OCCASIONS = [
  {
    key: 'awareness',
    /* Real 300×600 package, rendered live in the slat and the lightbox. */
    frame: 'assets/work/occasions/art-and-jakes/index.html?v=20261118b',
    rec: {title: "Make game day a reason to choose Art & Jake’s.", why: "Food, sports, and rewards give people several reasons to remember Art & Jake’s when making plans. Animation introduces the experience, then gives interested viewers a clear next step.", measure: "Viewable impressions, reach, frequency, and clicks to order or learn more. A separate brand study can assess changes in awareness or consideration."}, label: 'Awareness', eyebrow: 'Top of funnel',
    headline: 'Meet the season head-on',
    copy: 'One story, sized for every screen it lands on.',
    cta: 'See The Film', slotNote: 'Hero Frame', rgb: '0,204,255', media: null,
    parts: {
      headline: { label: 'Headline', note: 'Set once, reused across every size in the flight. No per-placement rewrite.' },
      media: { label: 'Hero Frame', note: 'The brand film, trimmed to the unit. Swap the file, keep the build.' },
      copy: { label: 'Support Line', note: 'One line under the hero. It carries the season, not the offer.' },
      cta: { label: 'Call To Action', note: 'A single action at the top of the funnel: watch, do not buy.' }
    }
  },
  {
    key: 'engagement',
    /* Real 300×600 package, rendered live in the slat and the lightbox. */
    frame: 'assets/work/occasions/genesis/index.html',
    rec: {title: "Let shoppers explore what makes the GV70 different.", why: "A vehicle deserves more than a single image. Interactive feature panels let shoppers explore the technology, performance, and electric driving story before continuing to a dealer.", measure: "Feature interactions, engagement rate, average exposure time, and dealer CTA clicks. Feature selections show which parts of the vehicle story attract attention."}, label: 'Engagement', eyebrow: 'Time spent',
    headline: 'Play with it before you buy it',
    copy: 'Swipe, spin and drag inside the unit itself.',
    cta: 'Try It', slotNote: 'Interaction', rgb: '109,94,240', media: null,
    parts: {
      headline: { label: 'Headline', note: 'Names the interaction so the invitation is obvious at a glance.' },
      media: { label: 'Interaction Panel', note: 'The playable area. Drag, spin or scratch — measured as dwell.' },
      copy: { label: 'Support Line', note: 'Tells the visitor what their hand is supposed to do.' },
      cta: { label: 'Call To Action', note: 'Opens the full experience for anyone who wants more than a taste.' }
    }
  },
  {
    key: 'discovery',
    /* Real 300×600 package, rendered live in the slat and the lightbox. */
    frame: 'assets/work/occasions/baxter-ford/index.html',
    rec: {title: "Put more vehicles into consideration.", why: "Featuring the Bronco Sport, Escape, and Maverick gives shoppers several ways into Baxter Ford’s lineup. Each vehicle offers a direct path to explore that model in more detail.", measure: "Clicks and click-through rate by vehicle, plus visits to vehicle detail pages. Connected website tracking can follow those visits through to inquiries."}, label: 'Product Discovery', eyebrow: 'Consideration',
    headline: 'Find the one that fits',
    copy: 'Feed-driven products, ranked for the person seeing them.',
    cta: 'Browse The Range', slotNote: 'Feed Grid', rgb: '0,204,255', media: null,
    parts: {
      headline: { label: 'Headline', note: 'Stays fixed while the products underneath rotate by feed.' },
      media: { label: 'Feed Grid', note: 'Products pulled live from the catalogue and ranked per viewer.' },
      copy: { label: 'Support Line', note: 'Explains the ranking without naming the mechanics.' },
      cta: { label: 'Call To Action', note: 'Lands on the filtered range, not a generic homepage.' }
    }
  },
  {
    key: 'store',
    /* Real 300×600 package, rendered live in the slat and the lightbox. */
    frame: 'assets/work/occasions/dq-stackburgers/index.html',
    rec: {title: "Turn a burger craving into a trip to the nearest DQ.", why: "The new Signature Stackburgers lead the ad, then Find Locations opens a map and list of nearby Dairy Queen restaurants with one-tap directions.", measure: "Find Locations opens, map and list interactions, location selections, and directions clicks. These actions show intent to visit; layer on a foot traffic study to measure store visits."}, label: 'Store Visits', eyebrow: 'Local',
    headline: 'Six minutes from here',
    copy: 'The nearest door, its hours, and a route to it.',
    cta: 'Get Directions', slotNote: 'Store Map', rgb: '190,242,100', media: null,
    parts: {
      headline: { label: 'Headline', note: 'Distance is written from the viewer\u2019s own ZIP at request time.' },
      media: { label: 'Store Map', note: 'The nearest location, plotted and refreshed per impression.' },
      copy: { label: 'Support Line', note: 'Hours and stock status for that specific door.' },
      cta: { label: 'Call To Action', note: 'Hands the route to the phone\u2019s own maps app.' }
    }
  },
  {
    key: 'commerce',
    /* Real 300×600 package, rendered live in the slat and the lightbox. */
    frame: 'assets/work/occasions/capri-blue/index.html',
    rec: {title: "Put the Volcano collection a swipe away from checkout.", why: "Three category tabs and nine swipeable product cards let shoppers browse Capri Blue candles, bath and body, and home care, then click straight to the product they want.", measure: "Category taps, product swipes, product clicks, and Shop Now clicks. Product-level clicks show which items drive shopping intent; add website tracking to measure online purchases and ROAS."}, label: 'Commerce', eyebrow: 'Conversion',
    headline: 'Straight to the cart',
    copy: 'Live price, live stock, one tap to checkout.',
    cta: 'Shop Now', slotNote: 'Product Card', rgb: '214,125,240', media: null,
    parts: {
      headline: { label: 'Headline', note: 'Short by design — the price does the persuading here.' },
      media: { label: 'Product Card', note: 'Price and availability read from the commerce feed, not baked in.' },
      copy: { label: 'Support Line', note: 'Carries shipping or offer terms, the last objection before the tap.' },
      cta: { label: 'Call To Action', note: 'Deep-links to that exact SKU with the cart pre-filled.' }
    }
  },
  {
    key: 'leadgen',
    /* Real 300×600 package, rendered live in the slat and the lightbox. */
    frame: 'assets/work/occasions/aaa/aaa-300x600.html',
    rec: {title: "Make starting a coverage inquiry feel simple.", why: "A short form gives interested shoppers a clear way to take the next step with AAA. Keeping name, ZIP code, and email together makes the initial inquiry easy to understand.", measure: "Form starts, completed submissions, completion rate, and abandonment. Connected CRM reporting can identify which submissions become qualified leads or customers."}, label: 'Lead Generation', eyebrow: 'Pipeline',
    headline: 'Two fields, that is it',
    copy: 'A form that completes inside the ad, not after it.',
    cta: 'Get The Quote', slotNote: 'Inline Form', rgb: '0,204,255', media: null,
    parts: {
      headline: { label: 'Headline', note: 'Sets the effort expectation before the form is even seen.' },
      media: { label: 'Inline Form', note: 'Two fields, validated in the unit and posted straight to the CRM.' },
      copy: { label: 'Support Line', note: 'Says what happens after submit, which is what stalls most forms.' },
      cta: { label: 'Call To Action', note: 'Submits in place. No click-through, no landing-page drop-off.' }
    }
  }
];

/* ── "Ads that are meant to be played with" ── */

/* Drag any of these onto the unit. rgb drives every accent in the creative. */
export const PLAY_COLORS = [
  { rgb: '0,204,255', label: 'Bright blue' },
  { rgb: '109,94,240', label: 'Violet' },
  { rgb: '190,242,100', label: 'Lime' },
  { rgb: '214,125,240', label: 'Magenta' }
];

/* The unit itself. media replaces the built hero block when given. */
export const PLAY_AD = {
  brand: 'KORTX',
  mark: 'K',
  size: '300 × 600',
  media: null
};

/* One deck per wheel segment. The wheel only ever rewrites these three. */
export const PLAY_COPY_DECKS = [
  { hl: 'Built for the way people watch', copy: 'One unit, every screen it lands on.', cta: 'Watch The Spot' },
  { hl: 'Made for the moment it appears', copy: 'The line rewrites itself by hour, weather and place.', cta: 'See It Live' },
  { hl: 'Your product, their context', copy: 'The feed picks what to show. You keep the craft.', cta: 'Shop The Look' },
  { hl: 'Six minutes from where they are', copy: 'The nearest door, and the fastest way to it.', cta: 'Get Directions' },
  { hl: 'Fewer steps to the cart', copy: 'Live price, live stock, one tap.', cta: 'Buy Now' },
  { hl: 'Two fields and it is done', copy: 'The form completes inside the ad.', cta: 'Get The Quote' }
];


/* ── The example browser under the live unit ──────────────────────────────
   Example 0 is the built furniture unit and keeps its own finish + message
   controls. The rest are the interactive builds; each one lists the feed
   values a client would really change, and what each change proves. */
export const PLAY_EXAMPLES = [
  {
    id: 'az-scratch', kind: 'frame',
    frame: 'assets/work/play/az-scratch/index.html',
    eyebrow: 'Interactive scratch off',
    title: 'Turn curiosity into a reason to explore Arizona.',
    sub: 'Scratch to reveal travel inspiration, then browse experiences that could shape your next trip.',
    panel: { label: '', note: 'Scratch the cover to reveal the travel cards, then explore the experiences.' },
    note: {
      changed: 'A scratch reveal opens a carousel of Arizona travel ideas, turning a destination message into a hands-on discovery experience.',
      why: 'Visit Arizona can introduce several reasons to visit while letting travelers choose the experiences that interest them.',
      metric: 'Scratch starts, completed reveals, carousel interactions, and travel-content clicks. Selections show which experiences invite further exploration.'
    }
  },
  {
    id: 'bose-flip', kind: 'frame',
    frame: 'assets/work/play/bose-pearl/index.html',
    eyebrow: 'Flip card functionality',
    title: 'Lead with the product. Let shoppers uncover the details.',
    sub: 'Flip the ad to explore more information, then compare background treatments around the same Bose product story.',
    flip: true,
    /* Background treatments are dragged onto the unit rather than picked from a
       list — the gesture is the point, so these render as swatches. */
    swatches: {
      hint: 'Drag and drop',
      options: [
        { label: 'Pearl background', color: '#EEEDF0', frame: 'assets/work/play/bose-pearl/index.html',
          changed: 'The Pearl background frames the Bose product, while the reverse side provides room for additional information.',
          why: 'Bose can pair a strong product image with more detail in one placement, supporting both an initial impression and deeper product consideration.',
          metric: 'Ad flips, active engagement time, and shopping CTA clicks. Campaign reporting can compare results by background treatment.' },
        { label: 'Lavender background', color: '#DED6ED', chip: '#B9A6D9', frame: 'assets/work/play/bose-lavender/index.html',
          changed: 'The Lavender background changes the visual treatment while keeping the Bose product and two-sided experience consistent.',
          why: 'Bose can pair a strong product image with more detail in one placement, supporting both an initial impression and deeper product consideration.',
          metric: 'Ad flips, active engagement time, and shopping CTA clicks. Campaign reporting can compare results by background treatment.' }
      ]
    }
  },
  {
    id: 'tnf-games', kind: 'frame',
    frame: 'assets/work/play/tnf-bobsled/index.html',
    eyebrow: 'Playable game unit',
    title: 'Put people inside a winter adventure.',
    sub: 'A short playable experience connects The North Face brand with the energy of winter sports.',
    control: {
      label: 'Choose your winter challenge.',
      note: 'Select Bobsled or Skiing, then play the game.',
      options: [
        { label: 'Bobsled', frame: 'assets/work/play/tnf-bobsled/index.html',
          changed: 'A playable bobsled run turns the ad into a short winter-sport challenge.',
          why: 'An interactive experience that fits The North Face brand and positions them as the brand to consider during winter sports.',
          metric: 'Game starts, completion rate, replays, active play time, and CTA clicks. Compare engagement across the two game versions.' },
        { label: 'Skiing', frame: 'assets/work/play/tnf-ski/index.html',
          changed: 'A playable ski run offers a different winter-sport experience within the same branded placement.',
          why: 'An interactive experience that fits The North Face brand and positions them as the brand to consider during winter sports.',
          metric: 'Game starts, completion rate, replays, active play time, and CTA clicks. Compare engagement across the two game versions.' }
      ]
    }
  },
  {
    id: 'govee-slider', kind: 'frame',
    frame: 'assets/work/play/govee-slider/index.html',
    eyebrow: 'Before and after slider',
    title: 'Let shoppers see the difference the lighting makes.',
    sub: 'Drag between the two room views to compare the TV setup with and without the lighting effect.',
    panel: { label: 'Drag to compare.', note: 'Move the slider across the image to reveal the before-and-after views.' },
    note: {
      changed: 'The slider compares the same setting in two states, making the lighting effect easy to inspect.',
      why: 'Govee’s product benefit is visual. Showing the change in context helps shoppers understand how the lighting could affect their own viewing setup.',
      metric: 'Slider interaction rate, active interaction time, and shopping CTA clicks. These actions show exploration of the product benefit.'
    }
  },
  {
    id: 'sleep-quiz', kind: 'frame',
    frame: 'assets/work/play/sleep-number-quiz/index.html',
    eyebrow: 'Interactive quiz',
    title: 'Help shoppers find a place to start.',
    sub: 'Three questions guide shoppers through their preferences and introduce a mattress recommendation to explore.',
    panel: { label: 'Find your starting point.', note: 'Answer the questions about firmness, temperature, and nighttime movement, then explore your result.' },
    note: {
      changed: 'A short quiz uses the selected answers to present a product recommendation.',
      why: 'Mattress shopping involves personal preferences and many options. Sleep Number can make the first step more approachable through guided product discovery.',
      metric: 'Quiz starts, answer selection, completion rate, drop-off by question, and result CTA clicks. Answer patterns can be analyzed when appropriate tracking and consent are in place.'
    }
  },
  {
    id: 'dq-maps', kind: 'frame',
    frame: 'assets/work/play/dq-maps/index.html',
    eyebrow: 'Store locator',
    title: 'Turn a craving into a local next step.',
    sub: 'Move from the featured treat to a location view, then continue to Dairy Queen’s website.',
    panel: { label: 'Explore locations.', note: 'Open the location view and select a listed location to continue to Dairy Queen’s website.' },
    note: {
      changed: 'The location control replaces the product view with a list of Dairy Queen locations.',
      why: 'A restaurant ad becomes more actionable when it helps people connect the product they want with somewhere to get it.',
      metric: 'Location-finder opens, location selections, and outbound website clicks. These actions indicate local interest; they do not confirm a store visit.'
    }
  },
  {
    id: 'pandora-remix', kind: 'frame', hideNote: true,
    frame: 'assets/work/play/pandora-remix/index.html',
    eyebrow: 'Drag, drop and remix',
    title: 'See how the same assets can change based on different layouts.',
    sub: 'Assemble six creative elements, then remix them into three layouts to explore how the same brand story can take different forms. KORTX takes your assets, experiments with different layouts, and provides the best layout for your brand.',
    pandora: true,
    note: {
      changed: 'The logo, headline, body copy, background, CTA, and video combine into one ad, then rearrange into alternate layouts.',
      why: 'Pandora can explore different visual hierarchies using a consistent asset set. This helps teams compare how prominently the message, video, and CTA appear.',
      metric: 'In this Playground: completed builds and remix interactions. In a deployed campaign: video engagement and CTA click-through rate by layout.'
    }
  }
];


/* ── "Dynamic creative in action" — what the note panel says for each signal value.
   Key = "<signal column>|<value>"; [what changed, why it matters, what is measurable]. ── */
export const DCO_NOTES = {
      'Temperatures|Below 40°F': ['Selecting cold weather brings forward a hot coffee and a cozy, warming message.', 'For Naba, the weather provides a timely reason to feature a comforting drink and encourage a coffee stop.', 'Order CTA clicks and click-through rate for the cold-weather version. Connected ordering data can measure purchases following those visits.'],
      'Temperatures|40–70°F': ['Selecting mild weather switches the featured drink and headline to an indulgent coffee moment.', 'Naba can make the message feel appropriate to a milder day while keeping the brand and ordering path consistent.', 'Order CTA clicks and click-through rate for the mild-weather version, with purchases measured through connected ordering data.'],
      'Temperatures|Above 70°F': ['Selecting hot weather brings forward iced coffee and a cooling message.', 'A refreshing drink gives Naba a relevant offer for a warm day and a clear reason for customers to stop in.', 'Order CTA clicks and click-through rate for the hot-weather version. Connected ordering data can show whether those visits lead to purchases.'],
      'Time of Day|6:00am-10:00am': ['The morning selection introduces the before-work message and morning food-and-drink creative.', 'Sheetz becomes part of the morning routine, with a message that fits a coffee or breakfast stop before the workday.', 'Download App clicks and click-through rate during the morning window. App installs require mobile attribution.'],
      'Time of Day|10:01am-3:00pm': ['The midday selection switches the creative to a lunchtime message.', 'The ad gives Sheetz a place in the lunch decision, presenting a meal opportunity when people are considering what to eat.', 'Download App clicks and click-through rate during the lunch window. Connected app measurement can follow installs and subsequent orders.'],
      'Time of Day|3:01pm-6:00pm': ['The afternoon selection introduces “Clock out. Snack on.” and the after-work creative.', 'Sheetz shifts from the workday routine to an after-work stop, giving the same brand a different reason to be considered.', 'Download App clicks and click-through rate during the afternoon window. App installs and orders require connected app measurement.'],
      'Dates|July 15th-August 24th': ['The date selection brings forward a back-to-school room, interactive product details, and the Shop Gaming Room CTA.', 'IKEA connects its products to setting up a personal space for a new school year. The room shows how individual items work together.', 'Product expansions, interactions by featured item, and Shop Gaming Room clicks. Connected ecommerce tracking can measure subsequent purchases.'],
      'Dates|Sept. 6th-Sept. 13th': ['The selected date window displays the Labor Day outdoor scene and Shop Outdoor CTA.', 'IKEA connects outdoor furniture to gathering and enjoying a long weekend, giving the products a recognizable occasion.', 'Product expansions, interactions by outdoor item, and Shop Outdoor clicks. Connected ecommerce tracking can measure subsequent purchases.'],
      'Dates|Dec. 15th-Dec. 25th': ['The selected date window displays a holiday living room and the Shop Living Room CTA.', 'IKEA places its products in a setting associated with hosting and spending time together, helping shoppers imagine them in their own homes.', 'Product expansions, interactions by featured item, and Shop Living Room clicks. Connected ecommerce tracking can measure subsequent purchases.'],
      'Zip|48307': ['Selecting 48307 displays the Rochester Hills weekend offer and the Walton Boulevard location.', 'A local offer becomes easier to act on when the ad names the community and shows where to go.', 'Offer and CTA clicks for the Rochester Hills version. Offer redemptions or store visits require a separate measurement connection.'],
      'Zip|48326': ['Selecting 48326 switches the offer message and location details to Auburn Hills.', 'Tropical Smoothie Cafe can keep the promotion consistent while making the destination relevant to a different local audience.', 'Offer and CTA clicks for the Auburn Hills version. Offer redemptions or store visits require a separate measurement connection.'],
      'RSS Feed|Current Jackpot': ['This example demonstrates how a jackpot value can populate a Mega Millions ad while the surrounding creative stays consistent.', 'The jackpot is a central part of the message. A feed-connected campaign can keep that information current without redesigning the ad for each drawing.', 'CTA clicks and click-through rate by displayed jackpot and campaign period. Clicks alone do not confirm ticket purchases.'],
      'RSS Feed|English': ['The same McDonald’s 2 for $3.99 ad runs in English, with menu items, offer badge and legal copy all set in English.', 'Speaking to people in their preferred language makes the offer clear at a glance, without building a separate campaign for each audience.', 'Click-through rate and app opt-ins by language version. Clicks alone do not confirm in-store or app purchases.'],
      'RSS Feed|Korean': ['The same layout swaps its headline, offer badge and legal copy to Korean, while product photography and branding stay the same.', 'Matching the ad to the viewer’s language builds trust and makes the offer easier to act on for Korean-speaking audiences.', 'Click-through rate and app opt-ins by language version, compared against the English version. Clicks alone do not confirm purchases.'],
      'RSS Feed|Next Draw': ['This example puts the next drawing’s day, date, and time into the Powerball creative.', 'The draw schedule gives the message a clear time reference and helps keep date-sensitive creative relevant.', 'CTA clicks and click-through rate by draw date and time remaining. Clicks alone do not confirm ticket purchases.']
    };
