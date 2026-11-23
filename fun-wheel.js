/* ------------------------------------------------------------------
   FUN BEYOND THE FEED — the spinnable wheel's content.
   One entry per stop: the section copy plus the ad it shows. Kept out of
   the component so new builds are a data edit, not a markup edit.
-------------------------------------------------------------------*/

export const FUN_STOPS = [
  {
    eyebrow: 'Jackpot RSS Feed',
    title: 'The jackpot writes its own headline',
    sub: 'An RSS feed drives the prize figure, so the number on the ad is the number on the board — no trafficking ticket, no reupload.',
    brand: 'GRAND MILLIONS', mark: 'G',
    adHeadline: '$42 MILLION JACKPOT',
    adCopy: 'Tonight could change everything. Play before 9:45pm.',
    cta: 'Play Now',
    url: 'GrandMillions/Play',
    heroFile: 'jackpot-confetti.png',
    accent: '#BEF264', tone: 'lime', hero: 'confetti'
  },
  {
    eyebrow: 'Nightly Countdown',
    title: 'A countdown that resets itself every night',
    sub: 'The clock runs to the 10pm draw, then rolls to tomorrow on its own. One creative covers the whole flight.',
    brand: 'GRAND MILLIONS', mark: 'G',
    adHeadline: 'Next draw in 04:12:38',
    adCopy: 'Draw closes at 10pm. Resets nightly for the next one.',
    cta: 'Get My Numbers',
    url: 'GrandMillions/Tonight',
    heroFile: 'countdown-clock.png',
    accent: '#00CCFF', tone: 'cyan', hero: 'countdown'
  },
  {
    eyebrow: 'Trigger Ads',
    title: 'Creative that only runs once the threshold trips',
    sub: 'Impressions stay dark until tickets sold cross the mark you set, so spend follows real scarcity instead of a calendar.',
    brand: 'GRAND MILLIONS', mark: 'G',
    adHeadline: '82% of tickets are gone',
    adCopy: 'This unit went live the moment the state hit 80% sold.',
    cta: 'Claim Yours',
    url: 'GrandMillions/Alert',
    heroFile: 'threshold-meter.png',
    accent: '#8A7CF8', tone: 'violet', hero: 'meter'
  },
  {
    eyebrow: 'Playable Unit',
    title: 'A game in the banner, not behind a click',
    sub: 'Catch the falling coins to reveal the offer. Every play is measured, so engagement is a metric rather than a guess.',
    brand: 'GRAND MILLIONS', mark: 'G',
    adHeadline: 'Catch the coins to play',
    adCopy: 'Tap to start. Score three and your promo code unlocks.',
    cta: 'Start Playing',
    url: 'GrandMillions/Game',
    heroFile: 'coin-catch-game.png',
    accent: '#00CCFF', tone: 'cyan', hero: 'game'
  },
  {
    eyebrow: 'Scratch Off',
    title: 'Scratch the ad, then find the nearest store',
    sub: 'Users drag to scratch the foil away; the reveal hands off to the closest retailer with its name and address.',
    brand: 'GRAND MILLIONS', mark: 'G',
    adHeadline: 'Scratch to reveal',
    adCopy: 'Corner Market · 1420 Michigan Ave, Detroit',
    cta: 'Find My Store',
    url: 'GrandMillions/Stores',
    heroFile: 'scratch-foil.png',
    accent: '#D67DF0', tone: 'magenta', hero: 'scratch'
  }
];

/* Per-tone palette, so a stop names a colour rather than repeating hexes. */
export const FUN_TONES = {
  lime: { rgb: '190,242,100', bg: '#0B1A16', pattern: 'confetti' },
  cyan: { rgb: '0,204,255', bg: '#050A16', pattern: 'dots' },
  violet: { rgb: '138,124,248', bg: '#0E1226', pattern: 'diagonal' },
  magenta: { rgb: '214,125,240', bg: '#1A0F2C', pattern: 'foil' }
};

export function funHeroPattern(kind, rgb) {
  switch (kind) {
    case 'confetti':
      return 'radial-gradient(circle at 20% 30%, rgba(' + rgb + ',.5) 1.5px, transparent 2px),' +
             'radial-gradient(circle at 70% 20%, rgba(255,255,255,.4) 1.5px, transparent 2px),' +
             'radial-gradient(circle at 45% 70%, rgba(' + rgb + ',.35) 1.5px, transparent 2px),' +
             'radial-gradient(circle at 85% 65%, rgba(255,255,255,.3) 1.5px, transparent 2px)';
    case 'diagonal':
      return 'repeating-linear-gradient(135deg, rgba(' + rgb + ',.18) 0 2px, transparent 2px 9px)';
    case 'foil':
      return 'repeating-linear-gradient(115deg, rgba(255,255,255,.16) 0 3px, rgba(' + rgb + ',.1) 3px 7px)';
    default:
      return 'radial-gradient(rgba(' + rgb + ',.22) 1px, transparent 1px)';
  }
}
