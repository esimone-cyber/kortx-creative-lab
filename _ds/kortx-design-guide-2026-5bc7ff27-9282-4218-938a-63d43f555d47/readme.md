# KORTX Design Guide

The brand and interface system for **KORTX** — a Detroit-based modern media firm offering integrated advertising, marketing analytics, and data-inspired creative services.

> Powerful & proven advertising solutions. A modern media firm that empowers ambitious teams to achieve bold results through data-driven strategies and unmatched creative excellence.

**Vision** — To empower transformative growth for our customers, employees, and stakeholders. **Mission** — To challenge the advertising status quo by empowering the bold, the ambitious, and the disruptors to achieve relentless results. **Values** (from the 2025 Town Hall deck) — Keep Refining · Do The Work · Make Things Easy · Communicate With Purpose. **Philanthropy** — KORTX actively supports nonprofits and social causes and drives positive change through targeted philanthropic efforts.

Tagline used on the website: *Experiences refined for people.* Footer signature: **BUILT WITH GRIT IN DETROIT.**

---

## Content fundamentals

**Voice: plain, declarative, confident.** KORTX writes like a strategist explaining a plan to a client who is short on time. Sentences are short and land on a verb or a number.

- **Person.** *You* = the agency or brand reading. *We / KORTX* = the firm. The brand refers to itself by name in headlines and openers ("KORTX helps agencies and brands activate Connected TV with clarity, flexibility, and confidence") and switches to *we* for process ("We build a CTV strategy around your ideal customer"). Never *I*.
- **Casing.** Headlines are **sentence case** — "Connected TV, built for real-world results", "Premium streaming, all in one place", "CTV that works harder for your brand". Card and bullet titles are **Title Case** — "Transparent Pricing", "Operational Confidence", "Audience-Based CTV". Eyebrows are **ALL CAPS**, widely tracked — "PROVEN CTV PACKAGES", "AMPLIFYING AMBITIOUS BRANDS". Product names keep their capitals: CTV, FAST, VOD, OTT, ROAS, CPA, GRP, ComScore, Kampus.
- **Copy do / don't.**
  - Do: *"Live dashboards track pacing, outcomes, and KPIs as campaigns run, not weeks after they end."*
  - Do: *"Amplifying ambitious brands through creative services."*
  - Don't: hype without a mechanism ("revolutionary AI-powered synergy"), exclamation marks outside internal decks, or second-person imperatives that scold ("Stop wasting budget!").
- **Structure that repeats everywhere.** Headline → one 2–3 line lede → a bold gateway label ending in a colon ("What makes us different:", "What this unlocks:", "Why it works:") → exactly three parallel items, each a Title Case title plus one supporting sentence. Three is the brand's number.
- **Punctuation.** Bullet titles take no period. Supporting sentences take one. Serial commas are used. Em dashes are rare; commas do the work. Ampersands appear in short label pairs ("Interactive Video & CTV", "FAST & More") but not in body copy.
- **Rhetoric.** Contrast pairs ("not one-size-fits-all buying", "not weeks after they end", "with purpose, not by default"), and a repeated triad of *clarity, flexibility, confidence*. Copy leans on transparency words: clear, visible, transparent, deduplicated, verified, proven. Claims are qualified by a mechanism, never left floating.
- **Numbers lead.** Results are the headline, the explanation is the subhead: "6.6x ROAS" / "QSR achieves astounding results over 3-years"; "6,000 Applications" / "Set record-breaking higher education enrollment numbers".
- **Blog/insight posts** open with a literal `TL;DR:` paragraph, then long-form. Titles are "The <Vertical> Marketing Playbook: <promise>" or "7 Things to Know About <topic>".
- **CTAs** are two or three words, Title Case, no exclamation marks: "Get Started", "Contact Us", "View All", "VIEW DEMO". One per view.

**The web page as a sentence.** The site says one thing per screenful and moves on. Each section is a headline, at most one supporting line, then evidence — never a headline plus a paragraph plus a list plus a quote. Observed section copy, in order down the home page:

- Hero: "Powerful & proven advertising solutions" / "A modern media firm that empowers ambitious teams to achieve bold results through data-driven strategies and unmatched creative excellence."
- Client strip eyebrow: "AMPLIFYING AMBITIOUS BRANDS"
- Services: "Partners in growth, experts in execution" / "We empower ambitious teams to cut through marketing complexity and drive real results. See how our tailored approach delivers measurable success." — then three bare names: **Digital Advertising**, **Marketing Analytics**, **Data-Inspired Creative**. No descriptions. The names are the whole message.
- Audiences: **Agency** — "Seamlessly extend agency capabilities and supercharge client results." **Brands** — "Turning marketing ideas into data-driven strategies worth bragging about." **Franchise** — "Grow franchise revenue through local impact and national reach." One sentence each, verb-first, no hedging.
- Proof: results as headlines — "6,000 Applications", "6.6x ROAS", "Boosted Bookings", "9.8x ROAS", "Speed to Market" — each under a single explanatory line.
- Close: "Advertising transformation starts here!" / "Discover how our team can help deliver solutions that convert." The exclamation mark is the only one on the site; it belongs to the closing CTA and nowhere else.

---

## Visual foundations

### The ground

The brand lives on **midnight navy `#001830`**, not black and not white. Almost every branded surface is dark. Light (`--gray-50` / white) belongs to the **Kampus product UI** and to a few mid-page marketing sections — switch to it with `[data-theme="light"]`, which re-points every semantic alias.

### Color

One accent: **bright blue `#00CCFF`**, the mark's own color. It is used for the logo, for card titles, for the 2px bullet rules, for icon glyphs, for primary buttons on dark, and for the first chart series — and for nothing else. Secondary accents are deliberately rationed: **lime `#BEF264`** for eyebrow labels on dark panels, **violet `#6D5EF0`** for the second chart series and the lower-left background wash, **magenta `#D67DF0`** only as an out-of-focus glow. Semantic green/amber/red appear only in product data (delta chips, statuses).

Maximum two background colours per deck or page: midnight, plus white/`--gray-50` if a light section is genuinely needed.

### Backgrounds

Never flat, never busy. Every branded surface is midnight plus **large soft radial glows** — a cyan-teal bloom entering from the right/upper-right and a violet bloom from the lower-left (`--wash-page`). No linear gradients as page backgrounds and no hand-drawn illustration.

### Imagery

Cool, dark, high-contrast, slightly synthetic: neon cyan wireframes on near-black, glowing network diagrams, screen-in-screen device mockups. Photography, when it appears, is cool-toned and dim so white type sits on it directly. No warm grades, no b&w, no grain, no lens flare. Text over an image always sits on a bottom-up **protection gradient** (`linear-gradient(to top, rgba(0,10,22,.92), transparent)`), never on a solid capsule.

### Logo Use

Logomark is a rounded-square tile with the X knocked out; wordmark is the tile plus KORTX in heavy caps. Bright blue on midnight, white on midnight or photography, midnight on white. Never recolor outside the three supplied variants, never place the midnight mark on a dark background, and keep clear space equal to the tile's corner radius on all sides.

### Type

One family: **Inter**, shipped with the system at `assets/fonts/` (variable, weight 100–900, roman and italic, SIL OFL 1.1). `--font-display` and `--font-body` both resolve to it. Acceptable substitutes where Inter cannot be embedded — an email client, a partner template, a locked-down deck tool — are **Proxima Nova** first, then **Helvetica**; both are in the stack, in that order.

- Slide headline **85px bold**, `-2.5%` tracking, `1.05` leading, one or two lines, sentence case.
- Lede **28px regular**, `1.45` leading, max \~62 characters per line, `rgba(255,255,255,.76)`.
- Bullet title **24px semibold** white; supporting line **24px regular** at 76% white.
- Eyebrow **11px semibold uppercase**, `+18%` tracking.
- Product UI runs 13/14/16px with 32px page titles.
- Never below 24px on a 1920×1080 slide.

Rules measured from the deck. Inter's default tracking is loose for display sizes — keep `--ls-display` (`-2.5%`) on anything 44px and up.

### Spacing & layout

4px base scale (`--space-1` … `--space-24`). Deck geometry is fixed: **99px** side margins, **64px** top/bottom, headline baseline at **210px**, 32px column gaps, and a persistent top-left `LogoLockup` (wordmark + section name) on every interior slide — the only fixed element. Content sits left, imagery right, roughly 45/55. Web layout: 1280px max container, 24px gutters, 96px section rhythm.

### Corners, borders, cards

Radii: 4 / 6 / 8 / 12 / 16 / 20 / pill. Product controls are **8px**; cards and deck pills **12px**; large deck panels **16px**. The mark's own squircle is **22%**.

A card is: `--surface-card` (`#070B15` on dark, white on light), a **1px hairline** border (`rgba(255,255,255,.08)` dark, `--gray-200` light), 12px radius, 20–24px padding. **No coloured left borders, ever.** The only coloured rule in the system is the 2px cyan `AccentBullet` rule, which is a separate element beside the text, not a card border.

### Elevation

Dark surfaces lift with **inner top light + a deep black shadow** (`--shadow-card-dark`), optionally a **cyan bloom** (`--glow-accent-soft`) on one featured card per view. Never a grey drop shadow on dark. Light surfaces lead with the hairline border and add a near-invisible shadow (`--shadow-card-light`); popovers go to `--shadow-popover-light`.

### Transparency & blur

Rationed. Three sanctioned uses: the sticky site header (72% midnight + 14px blur), modal scrims (`--surface-overlay`), and white-alpha fills for secondary controls (`rgba(255,255,255,.06)`). Body copy is white at 76% / 55% alpha rather than a grey token. No frosted-glass cards.

### Motion

Quick and eased-out; nothing bounces, nothing springs, nothing loops. `120ms` for control state changes, `200ms` for hover/transform, `320ms` for panels, `600ms` for on-scroll reveals — all on `cubic-bezier(.16,1,.3,1)` or the standard `(.4,0,.2,1)`. Reveals are **fade + 12px rise**, never scale-in or slide-from-side. Charts animate the line draw once; numbers do not count up.

### Composing a web page

The site is built from the same parts as everything else in this system; there is no separate web vocabulary. What the site adds is *rhythm*.

- **Section count.** A page is five or six sections. Hero, a quiet proof strip, what we do, proof of results, close. Anything beyond that is a second page, not a longer first one.
- **Section rhythm.** `--section-y` (96px) between sections, 1280px max container, 24px gutters. Alternate the ground sparingly: `--navy-850` for most sections, `--navy-950` for at most one or two, to mark a shift without introducing a colour.
- **Section head.** Eyebrow (optional) → h2 at `--fs-display-md` with `--ls-display` tracking, max 820px → one lede line at `--type-lede`, max 700px. Then 48px to the content.
- **Grids.** Three across is the default for cards; the proof rail may run four or five narrower tiles. Gaps are `--space-5` or `--space-6`. Never two-across for three items.
- **One CTA per page**, repeated at most twice (header and close), always the same words.
- **Chrome.** The header is the only fixed element: 72px, `rgba(0,25,48,.72)` with a 14px blur, wordmark left, four links, one primary button right. The footer is a single row of links under the wordmark, then a rule, then the Detroit sign-off in `--blue-400`.
- **Hero.** Text left at roughly 55/45, the neon mark or brand imagery right, a cyan radial wash bleeding in from the upper right. Headline breaks manually into two lines; never let it wrap.
- **Components used, in order:** `TopBar`, `Button`, `Eyebrow`, `Card`, `StatCard`, `Divider`, `Logo`. A marketing page needs nothing this system does not already have.

### Interaction states

- **Hover, dark:** lighten — primary button goes `blue-400 → blue-300`; secondary fills from 6% to 12% white; cards rise `translateY(-2px)` to `-3px` and pick up a soft bloom; links go cyan-300.
- **Hover, light:** grey fill deepens one step (`gray-0 → gray-50 → gray-100`). Never opacity fades.
- **Press:** `scale(.985)` plus one step darker (`--action-primary-bg-active`). No colour inversion.
- **Focus:** 1px cyan border **plus** a 3px `rgba(0,204,255,.55)` ring. Never removed.
- **Active nav:** solid `--blue-600` rounded square on the midnight rail; a grey fill on light nav rows; a 2px cyan underline on tabs.
- **Disabled:** 40% opacity, pointer-events none. No grey-out repaint.

---

## Iconography

**Outline, single-weight, geometric — no fills, no duotone, no unicode dingbats as icons.** The Kampus UI and the deck both use a Feather/Lucide-family outline set at roughly 1.75px stroke on a 24px grid: house, book-open, folder, radio/broadcast waves, users, pie-chart, clipboard-list, bell, download, settings, calendar, chevrons, more-vertical.

- **No icon font, sprite or SVG set was provided**, and none is extractable from a PDF or a screenshot as reusable vectors. The system therefore links **Lucide 0.454.0 from CDN** (`https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js`) as the closest match in stroke weight and corner treatment. **This is a flagged substitution** — if KORTX has a licensed set (or the deck's original vector icons), swap it in and this section is the only place to change.
- **Presentation.** On dark surfaces a glyph sits at 20px inside a 40–44px circle filled `rgba(0,204,255,.10)` with the glyph in `--blue-400` (see `FeaturePill`, `IconTile`). In product chrome the glyph is bare at 16–17px in `--gray-400`, going `--gray-800` when active.
- **Isometric line illustrations.** Four large wireframe isometric objects appear on the deck's "CTV that works harder" slide (a checkbox slab, an arrow, a rising chart, a looping arrow) — cyan 1px strokes on near-black. These are brand illustration, not iconography, and are *not* reproduced here: they were only available as rasterised page content. Ask design for the vectors.
- **Unicode** is used for exactly two glyph jobs where an icon would be heavy: the breadcrumb chevron `›` and the double caret on `Select`. The check inside `Checkbox` is `✓`.
- **Brand SVGs from the site.** The three audience icons (`assets/brand/icon-agency.svg`, `icon-brands.svg`, `icon-franchise.svg`) are the real files from kortx.io. They are **filled isometric objects**, not outline glyphs: layered navy planes (`#001830`, `#001C38`) lit by bright blue (`#00CCFF`, `#6BE1FF`) with `#0090B4` in shadow — the same palette as the tokens. This is a second, distinct icon register: outline Lucide glyphs do the small UI work, these isometric objects mark a *section* (one per audience, \~72px and up). Do not mix the two at the same size. `navigation-cyan.svg` is the site's decorative nav flourish.
- **Client logos** (`assets/clients/`) are the nine marks from the "AMPLIFYING AMBITIOUS BRANDS" strip, as supplied by the site: white, single-colour, on a 200×50 box (Indianapolis Motor Speedway is full-colour on its own box). Never recolour or crop them.
- **Publisher and platform logos** (Hulu, Roku, ESPN, ComScore, Tatari…) appear in the deck but are **not** copied — they are other companies' trademarks. Use those brands' press kits.

---

## Index

```
styles.css              the single entry point consumers link
tokens/                 fonts, colors, typography, spacing, radius, elevation, motion, base
guidelines/             foundation specimen cards (Colors, Type, Spacing, Brand)
components/             reusable React primitives, grouped by concern
ui_kits/kampus/         Kampus Reporting Suite — the one product kit, light theme
templates/ctv-deck/     16:9 slide template matching the Connected TV deck
slides/                 sample slide layouts as cards
assets/logo/            wordmark + logomark, 3 colourways, SVG and PNG
assets/brand/           neon mark, audience halo, CTV screen, video collage, site icon SVGs
assets/clients/         9 client marks, white SVG, pulled from kortx.io
assets/textures/        cyan / magenta / navy radial glow washes
assets/product/         Kampus reporting screenshot (reference)
thumbnail.html          homepage tile
SKILL.md                Agent Skills wrapper
```

## Components

Every component has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when + usage).

**Core** (`components/core/`) — `Button`, `IconButton`, `Badge`, `Eyebrow`, `Card`, `Divider`, `Logo`, `LogoLockup`

**Patterns** (`components/patterns/`) — `FeaturePill`, `AccentBullet`, `NumberedCard`, `IconTile`, `StatCard`

**Forms** (`components/forms/`) — `Input`, `Select`, `Checkbox`, `Switch`, `SegmentedControl`

**Data** (`components/data/`) — `MetricTile`, `DeltaBadge`, `DataTable`, `Tabs`, `ProgressBar`, `LineChart`

**Navigation** (`components/navigation/`) — `SidebarNav`, `NavItem`, `Breadcrumbs`, `TopBar`

### Intentional additions
No codebase or Figma library was supplied, so the inventory was derived from the real surfaces (deck, Kampus screenshot, marketing site). These four exist because those surfaces need them but no reusable source defines them: `LineChart` (the Kampus Metrics card plots two series), `Logo`/`LogoLockup` (wraps the supplied files so nobody redraws the mark), `Eyebrow` (the tracked uppercase kicker is on nearly every slide and section), and `ProgressBar` (pacing is named repeatedly in deck copy though no widget was visible — treat as provisional).
