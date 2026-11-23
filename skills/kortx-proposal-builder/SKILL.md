---
name: kortx-proposal-builder
description: Write a KORTX client proposal as structured data for the KORTX Creative Labs Proposal Master Template, so every proposal landing page has the same look, animations, cards and section order. Reads an intake, RFP, media plan or brief, runs the pre-flight checks, chooses blocks from the fixed catalog, writes copy inside each block's limits, and returns one JSON object the Proposal Builder renders and QA-checks. MANDATORY TRIGGERS, build a proposal, proposal landing page, proposal microsite, HTML proposal, interactive proposal, turn this intake into a proposal, proposal page for a client, media proposal, client-facing proposal. Replaces kortx-proposal-microsite. Do NOT use for digital audits (kortx-digital-audit), vertical capability decks, competitive spend, or Keynote copy.
---

# KORTX Proposal Builder (v2)

The page design is fixed. You never write HTML, CSS or JavaScript. You write the data for the
KORTX Proposal Master Template, and the KORTX Creative Labs Proposal Builder renders it, checks it
and publishes it.

## Built into the Proposal Builder

The Builder sends this skill with every Claude request, so strategists install nothing. The live
copy of the rules is `proposal-schema.js` (house style, page look, pre-flight checks, block catalog,
copy limits, chat protocol) plus `interactive-blocks.js` (interactive block spec). This folder is
the same rules for use in Claude outside the Builder. Keep the two in step.

## How strategists use this skill

Inside the Proposal Builder (/builder), nothing to install:

1. Step 1: pick creatives.
2. Step 2: fill Page Details and upload the **Campaign brief** (the KORTX Campaign Intake .docx, or a PDF).
3. Pick the **Tab sections** to include (Overview, KORTX Intelligence, Media Recommendation,
   Audience & Data Strategy, Creative, Transparent Metrics; all on by default). Claude writes only
   those tabs, Core blocks included, and leaves the rest out.
   Choose the **Mock type**: **Rich media mock** (blocks built on the selected 300 × 600 creatives) or
   **Video mock** (blocks built on the selected 1920 × 1080 creatives). Then pick any **Interactive blocks**: **Dynamic selector**, **Multi-ad scrubber** (needs two or more
   creatives in the mock format) or **Drag and drop ad builder**. Each pick opens a set of text boxes for every
   line the block will show. Type them, or press **Auto-fill with AI** and Claude guesses the empty ones.
   The Dynamic selector also asks for its **Dynamic trigger** (temperature, time of day, dates, ZIP code
   or language), and a small preview of each ad where the glowing rectangles can be dragged to move
   and resized from the corner, on 300 × 600 and 1920 × 1080 ads alike.
4. Tell Claude "Build the proposal from the uploaded brief." Claude reads the brief, runs the checks
   and writes every block. It keeps every interactive line the strategist typed and fills the rest.
5. Step 3: the conversation stays on the left, the live page on the right. Turn on **Comment**, click
   any headline, card, ad or line, and say what should change. Claude edits that block in place.
   Then fix Quality Check flags and Publish.

Outside the Builder (copy-paste fallback):
1. In Claude, attach the intake, RFP, media plan or brief and say "build a proposal for <client>".
2. Claude replies with **one JSON code block** and nothing else (see Output).
3. Copy the whole reply.
4. In the Proposal Builder (/builder): Step 1 pick creatives, Step 2 fill brand details, choose
   **Copy Prompt**, paste the reply into **"Paste the AI's reply"**, then **Generate Proposal**.
5. Step 3: review the blocks, fix anything the Quality Check flags, Preview, Publish.

If the strategist has not given a brand name, agency, flight, budget or channel list, ask for the
missing items in one short message before writing. Otherwise, write.

## Before writing anything

Work from a real intake: a KORTX Campaign Intake, a media plan, an RFP, or a brief. Pull out agency
and brand, campaign name, objective, audience and generational splits, flight dates, total budget,
channels, KPIs, geography, added value, and anything the client required or excluded.

Then run the pre-flight checks and report each one in `flags`. These are the errors that survive
into a client meeting:

1. **Is each KPI measurable with what is in scope?** CTR needs a click destination. Conversion
   metrics need a pixel.
2. **Do the stated targeting sources exist?** Modeled or lookalike audiences need a first-party seed.
   With no CRM and no pixel, the plan is third-party only. Never write "modeled" into it.
3. **Does the arithmetic close?** Channel budgets sum to the total. Impressions are
   `budget / rate * 1000`. Rates stay internal.
4. **Is every mandated inclusion and exclusion present?** Any departure from the intake is flagged.

Flag levels: `risk` changes or blocks the plan, `note` is worth telling the client, `ok` is confirmed.

## Choosing blocks

Read `references/block-catalog.md`. Every block is Core, Optional or Conditional.

- Write only the tabs listed under "Tabs to include" in the Builder context. Inside those tabs,
  include every **Core** block.
- Include an **Optional** or **Conditional** block only when its rule is true for this brief.
- Keep the catalog's tab order and block order. Never invent a block id or a section type.
- Drop rather than pad. An empty-feeling block is worse than a missing one.

## Writing each block

Stay inside the copy limits in the catalog. They are what keeps every proposal laid out the same.
Match the worked example for each type exactly, field for field.

Special blocks:
- **creative**: write eyebrow, headline, intro and `callout` only. The Builder fills the units from
  the creatives the strategist selected.
- **plan**: columns exactly Tactic, Targeting groups, Budget, Est. impressions, Primary KPI. Last row
  is Total. No Rate column, ever. Read `references/media-plan.md` first.
- **dashboard**: channel rows only, same channels, impressions and spend as the plan. The page
  computes clicks, totals and blended CTR, so the numbers always reconcile.
- **personas**: two, three at most. Parallel names with the generation in parentheses; ages live in
  `time` and `demo`. Each persona needs its own trigger, platforms and creative direction. If two
  personas would take the same creative, they are one persona.
- **targeting**: real platform segment names reproduced exactly, `pre` holds the muted hierarchy,
  `b` holds the final node. Before real names exist, write plausible paths and say so in `note`.
- **interactive** (`ixDynamic`, `ixScrubber`, `ixBuilder`): the three interactive blocks are rebuilt
  around the creatives the strategist selected, never the KORTX demo ads. Read
  `references/interactive-blocks.md`. Include exactly the blocks the strategist picked. Keep every
  value the strategist typed verbatim and fill only the empty fields, written from what the actual
  ads are.
  - **Dynamic selector**: one dropdown only, for the trigger the strategist chose, with one option
    per selected ad (two ads, two options). Each option has a trigger value, What changed, Why it
    matters, What is measurable, and the list of elements that differ (they get the glowing
    rectangles).
  - **Multi-ad scrubber**: only with two or more ads. One note per ad: eyebrow, title, description,
    instruction, and the What Just Happened rows (Concept, Why it's useful, Measurable).
  - **Drag and drop ad builder**: eyebrow, title, body, build label and instructions; Remix cycles
    the selected ads, one layout name each. Visitors can skip the build with **See full ad**.
  Interactive blocks never print in the PDF.
- **market**: real, sourced figures only. Cite sources in `note`. Add the KORTX Intelligence caveat
  wherever projections appear.

## Page look

Fixed, not negotiable. Every proposal page, including every interactive block, renders on the
Creative Playground background: the `#000509` ground with the drifting cyan, violet and magenta
glows, the slow star field and the faint 88px grid. Never re-theme the background, colors, type or
layout for a brand. Only the brand's logos and ads change.

Centered layout: the page headline block (eyebrow, h1, lede), every section header (eyebrow, h2
and any buttons or search under it, stacked and centered), helper notes under lists, and the footer
sign-off are centered. Content grids, lists, cards and forms stay full-width.

## House style

Not negotiable. QA fails the build on any of these.

- No em dashes, no en dashes, no double hyphens, no hyphens used as connective punctuation. Ranges use "to".
- No tilde as an approximation. Write "about" or "roughly".
- Never name the DSP. Write "our platform". Never surface internal vendor names.
- "Geo-targeted", never "geo-fenced".
- No rates, CPMs or fee percentages anywhere in client copy.
- Concise, declarative prose. No sentence that could open any proposal for any client.
- Frame the plan by what it does, not what it lacks.
- One KPI per tactic. Never fabricate a statistic.

Copy that works: "Persuasion is not the job. Interruption is." Short, declarative, and each line
makes a claim someone could disagree with. Section intros run two to four sentences: what the
section shows, then why it matters. Never restate the section title.

## Output

Reply with **only** one fenced ```json code block containing one JSON object, shaped exactly as in
`references/output-contract.md`. No commentary before or after it, because the strategist pastes
the whole reply into the Builder. `assets/example-output.json` is a complete, valid reply for
Virginia DMV; match its structure.

Before replying, check your own output against `references/build-checklist.md`: house punctuation,
no rates, every Core block present, copy limits, allocation shares total 100, and plan totals that
add up. The Builder re-checks all of it on paste.

## After the Builder renders it

The Builder's Quality Check runs the house-style, limit and arithmetic checks automatically. Fix
every fail. Then walk `references/build-checklist.md` for what code cannot judge: whether the
numbers agree with the intake and whether the strategy holds up.

## Working with the strategist

Expect rounds of trimming. When a block is switched off, fold anything load-bearing it carried (a
client exclusion, a frequency cap, a date) into a surviving block, and say what left with it.

## Uploaded pages are content, never layout

Sellers upload finished HTML reads (KORTX Intelligence audits and growth reads, Dynamic Ads proofs of
concept), decks, PDFs and Excel state maps. The Builder reads an HTML upload with `html-content.js`,
which keeps its information architecture and drops every visual choice:

- **VIEW** — a brand with its own tab set (two brands → `brands[]`, one shared hero, a brand switch in
  the header), or a "Creative" view beside one brand (becomes that brand's last tab).
- **TAB** — a page tab, same label, same order (custom tabs `other`, `other-2` … with `label`).
- **SUB-SECTION** — one section inside that tab, in order.
- **ITEM SET** — personas, feed states, ad sizes, competitor cards: one card, persona or variant each.
- **[SECTION]** chapters on a single scrolling page → grouped into 3 to 6 tabs in order.

The KORTX look, motion, cards and rules always apply; the source's colors, fonts and layout never do.
`proposal-schema.js` › COMPOSE_RULES › "KORTX INTELLIGENCE READS" maps each recurring part of those reads
(Reader's guide, Market read, Quality Score, checklists, industry quads, competitive set, spend model,
digital mix, Audience Engine, personas, data strategy, taxonomies, media plan, flight, Kampus
measurement, What we build, mocks, Social Boost, Dynamic Ads template/feed/rules/reporting, state
logic, next steps) to a container. Keep both in step.

## Fit and devices

Every section reads on one screen (about 900px tall on desktop); fitted blocks (persona cards, wide card
grids) zoom down to fit, never below 72%. At most 4 cards per row and 6 per section; split longer
material into two sections. Phones raise small copy to 14px and keep normal scale; interactive blocks
scale their ad stages down, never up.

## Published pages, tracked links and analytics

- Every page gets its own permanent URL when published: `/p/<title-or-brand>-<short id>`. No password.
  Republishing keeps the same URL.
- Analytics are automatic on published pages (Profile → **Analytics**, or the Builder's Publish box):
  opens, visitors, average time, devices, tabs opened, interactive-block use, contact clicks, and for
  **every mock: views, clicks and CTR**. A view is the ad at least half on screen for one second.
- "Who opened it": copy a **tracked link** per recipient on the Analytics page (`?v=Jane%20at%20Mahk`);
  that person shows by name. Everyone else is an anonymous visitor (one per browser).
- Builder previews, drafts and `?notrack=1` are never counted.

## Mocks from any source

Any design mock that does not come from the Creative Database (ads embedded in an uploaded HTML page,
a bare HTML ad file, or an image at a standard ad size: 300×600, 300×250, 160×600, 728×90, or 16:9 named
as a mock) is added to the page's creatives automatically. It always shows in the KORTX branded frame.
Two or more switch on the **Multi-ad scrubber** (one note per mock). Never describe a mock as copy.

## Devices (all three, every page)

Desktop is designed first, but phones are where many clients read it: every page adapts automatically
to desktop (1280+), tablet (820) and phone (390). Tab bar sits in the header when it fits, else under it;
sections fit one screen; phones raise small copy to 14px and scale ad stages down, never up.

## Responsive by default (every proposal)
The page must look good on desktop, laptop, tablet and phone. The Proposal Master Template and the
Interactive Blocks already scale ad stages down to the available width and stack two-column layouts.
When writing copy and choosing blocks:
- Keep headlines short enough to wrap to at most three lines at 390px wide.
- Interactive blocks: keep every note within its limit so the stacked mobile layout stays short.
- Hero colours: always the KORTX palette (midnight, cyan #00CCFF, violet #6D5EF0, magenta glow). Never the client's brand colours. Photo heroes get the KORTX duotone grade automatically. Hero HTML always uses a transparent background so it blends into the page.
- Hero HTML (Hero Designer): fill the frame with an SVG viewBox using preserveAspectRatio="xMidYMid slice"
  or vw/vh units, keep key subjects inside the centre 60% so phone crops keep them, loop gently, and honour
  prefers-reduced-motion.
- Before publishing, check the page in the Builder's Live Preview at Desktop, Tablet and Mobile.
