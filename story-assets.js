/* ════════════════════════════════════════════════════════════════════════
   CENTRAL ASSET CONFIGURATION — Cinematic Scroll Hero
   ------------------------------------------------------------------------
   Every image, MP4 and HTML creative the hero shows is declared HERE. The
   scene choreography (Gallery with hero scroll animation.dc.html) never
   names a file, so creatives can be replaced without touching motion.

   AD SLOT SHAPE
     media : 'placeholder' | 'image' | 'video' | 'html'
     src   : image / mp4 / HTML entry point (index.html of an EXTRACTED zip —
             a browser cannot load a .zip as an iframe source)
     poster: still shown before an mp4 plays, and as its fallback
     w / h : NATIVE canvas size. The whole creative is scaled proportionally
             into whatever frame the scene gives it; it is never cropped.
     still : true → the slot does not float or tilt. Required for any slot
             the page draws overlay boxes on top of.
     alt   : accessibility text
     Placeholder-only fields (ignored once media is real):
       brand, headline, support, cta

   ENVIRONMENT SHAPE
     src    : photograph ('' → the built-in dev placeholder environment)
     screen : {x,y,w,h} in % of the PHOTO — where the ad sits inside it, so
              the scene can ring the creative without covering it
     focal  : object-position for the crop's focal point
   ════════════════════════════════════════════════════════════════════════ */

export const STORY_CAMPAIGN = {
  brand: 'ARCO',
  campaign: 'The Art of Feeling at Home',
  goal: 'Product Discovery',
  headline: 'The art of\nfeeling at home.',
  support: 'Sculptural seating, made to be lived in.',
  cta: 'Shop collection'
};

/* The extracted HTML packages. `?nohl=1` renders the same ad as a CLEAN PLATE
   (its headline hidden) so the host page can lift the headline out as a layer
   that travels into the CTV composition. */
export const AD_PACKAGES = {
  sage:      'assets/work/a1/index.html',
  charcoal:  'assets/work/a2/index.html',
  terracotta:'assets/work/a3/index.html',
  /* The same terracotta build, authored WITHOUT its headline, so the host page
     can lift the headline out as its own travelling layer. */
  terracottaClean: 'assets/work/a3-nohl/index.html',
  ctv:       'assets/work/ctv/index.html'
};

const AD = (over) => Object.assign({
  media: 'placeholder', src: '', poster: '', still: false,
  brand: STORY_CAMPAIGN.brand,
  headline: STORY_CAMPAIGN.headline,
  support: STORY_CAMPAIGN.support,
  cta: STORY_CAMPAIGN.cta
}, over);

/* SCENE 1 — the deck. THREE live 300×600 HTML units of one campaign.
   The centre unit (index 1) is the one the camera selects: it is loaded twice
   — full plate in the fan, clean plate once selected — so the headline can
   lift away as its own layer. */
export const STORY_DECK = [
  AD({ id: 'deck1', media: 'html', src: AD_PACKAGES.sage,       w: 300, h: 600, alt: 'ARCO 300×600 — green chair' }),
  AD({ id: 'deck2', media: 'html', src: AD_PACKAGES.terracotta, w: 300, h: 600, still: true, alt: 'ARCO 300×600 — the selected unit' }),
  AD({ id: 'deck3', media: 'html', src: AD_PACKAGES.charcoal,   w: 300, h: 600, alt: 'ARCO 300×600 — brown chair' })
];

export const STORY_ADS = {
  /* Scene 1 — selected unit, clean plate (headline hidden, lifted separately) */
  hero600: AD({ media: 'html', src: AD_PACKAGES.terracottaClean, w: 300, h: 600, still: true,
    alt: 'ARCO 300×600 display ad, headline lifted' }),
  /* Scene 1 + 2 — the 1920×1080 composition the headline travels into */
  ctv: AD({ media: 'image', src: 'assets/work/ctv-arco-nohl.png', w: 1672, h: 941, still: true,
    alt: 'ARCO 1920×1080 CTV ad, headline lifted from the 300×600' }),
  /* Signals scene — the two resolved temperature variants (300×600 @2x) */
  variantCold: AD({ media: 'image', src: 'assets/work/northface-winter.png', w: 600, h: 1200, still: true,
    headline: 'Women’s Basin Pullover', alt: 'Below 40°F variant — insulated pullover' }),
  variantWarm: AD({ media: 'image', src: 'assets/work/northface-summer.png', w: 600, h: 1200, still: true,
    headline: 'Women’s Vyrtue Tank', alt: 'Above 70°F variant — lightweight tank' })
};

/* SCENE — one campaign, three real environments. The photograph already
   contains the ad, so the scene rings the creative rather than compositing
   one in. `screen` is measured off the photo, in per cent. */
export const STORY_ENVIRONMENTS = {
  mobile: {
    src: 'assets/env/mobile.png', w: 1672, h: 941, focal: '58% 48%',
    alt: 'A phone held in one hand, the ARCO unit in a mobile article',
    screen: { x: 53.8, y: 35.1, w: 19.5, h: 29.8 },
    label: '1 · Mobile', caption: '300×250 in a mobile article', size: '300×250'
  },
  desktop: {
    src: 'assets/env/desktop.png', w: 1672, h: 941, focal: '62% 45%',
    alt: 'A desktop screen in an evening workspace, the ARCO 300×600 beside the article',
    screen: { x: 67.6, y: 14.9, w: 16.1, h: 58.4 },
    label: '2 · Desktop', caption: '300×600 beside desktop editorial', size: '300×600'
  },
  tv: {
    src: 'assets/env/tv.png', w: 1672, h: 941, focal: '50% 40%',
    alt: 'Two people watching a living-room television, the ARCO 1920×1080 on screen',
    screen: { x: 22.6, y: 7.0, w: 55.0, h: 53.0 },
    label: '3 · Television', caption: '1920×1080 filling a living-room screen', size: '1920×1080'
  }
};

/* SIGNALS SCENE — the shuffle deck. The highlight rides through these labels,
   unselected ones blurred, and resolves on Temperature. Every signal here is
   one the Dynamic Creative in Action playground actually supports. */
export const STORY_SIGNALS = [
  { key: 'temperature', label: 'Temperature', value: 'Below 40°F' },
  { key: 'time',        label: 'Time of Day', value: '6:40pm' },
  { key: 'zip',         label: 'ZIP Code',    value: '48226' },
  { key: 'dates',       label: 'Dates',       value: 'Wk 37' },
  { key: 'language',    label: 'Language',    value: 'EN' }
];

/* The signal the shuffle lands on, and the two readings it alternates between.
   Both creatives stay on screen the whole time; only focus moves. */
export const STORY_RESOLVED = {
  signal: 'Temperature',
  states: [
    { key: 'cold', value: 'Below 40°F', ad: 'variantCold',
      rule: 'If temperature is below 40°F, lead with insulated layers',
      changed: 'Product and headline',
      why: 'The cold reading resolves to the insulated pullover. The store line underneath never moves.' },
    { key: 'warm', value: 'Above 70°F', ad: 'variantWarm',
      rule: 'If temperature is above 70°F, lead with lightweight layers',
      changed: 'Product and headline',
      why: 'One condition read differently — the same rule resolves to the lightweight tank instead.' }
  ]
};
