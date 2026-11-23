## 2026-11-17
- New public pages: Product Offering (/products), Process & Requirements (/process), Pricing (/pricing), split from Offerings & Process; added to the top-left menu and circle menu. Rate Card and Required Assets & Process removed from both menus.
- New AI Video Simulator page (/ai-video-simulator).
- Offerings: "How it's built" section with product tabs, glass tab menus, CPM based pricing, card/menu restyle, layer animation refinements (IV feed layer blur, AI Video centering).
- Creative Playground: "Find examples that fit your goals" moved to the top; bottom buttons removed.
- Light/dark switch removed site-wide.

# 2026-10-26
- Removed Campaign Brief Intake (`/brief`), its Import Brief AI autofill (`brief-extract`, `campaign-brief-autofill` skill) and all brief emails (`brief-notify`: New brief, Brief claimed). Removed the Email Notifications card on Profile and the intake links on Brief List and Sign In. Brief List and existing `campaign_briefs` rows are kept.

# 2026-10-16
- Campaign Brief Intake: new `campaign-brief-autofill` skill (`skills/campaign-brief-autofill/SKILL.md`) embedded in the `brief-extract` Edge Function; Claude tool-use schema built from the form fields.
- New internal Developer Handover docs: `docs/handover/` (Markdown, single source) + local viewer `Developer Handover.dc.html`. Not deployed.

# 2026-10-02
- New pages: `Sign In.dc.html` (/sign-in: sign up, confirm email, welcome, reset password, invite links) and `Admin Control.dc.html` (/admin: team list, roles, invites, delete, live links).
- Renamed: Playground 9-10 v9 → `Creative Playground.dc.html` (/), Example Proposal → `Proposal Example.dc.html` (VA DMV, /example-proposal), Vision → `The Pitch.dc.html` (/vision and /pitch).
- The Pitch: one hero button to sign-in; Creative Database link removed; seller headshot/contact/CTA folded into "Sellers personalize in minutes".
- "KORTX Creative Lab" → "KORTX Creative Labs" across all pages.
- Database: run `supabase/RUN-IN-SUPABASE.sql` once (team accounts + admin control).
- Deploy folder synced; old Playground / Example Proposal / Insights / Vision copies removed.

## 2026-10-12 (Mon)

### Proposal Builder
- Step 2: campaign brief upload (Word or PDF), Tab sections multi-select, Mock type (Rich media mock 300×600 / Video mock 1920×1080), and three interactive blocks: Dynamic selector, Multi-ad scrubber, Drag and drop ad builder.
- Each picked block gets text boxes for every line plus Auto-fill with AI; Dynamic selector adds a trigger dropdown and draggable, resizable glow boxes per ad.
- Step 3: Claude chat on the left, live proposal on the right with click-to-comment.
- Interactive blocks rebuilt around the selected creatives, styled to match the Playground; See Intake Form pop-up; See full ad on the builder block.
- New page: /interactive-video (Interactive Blocks 1920x1080).
- Skill updated (kortx-proposal-builder): interactive blocks, mock type, tab sections, page-look rule.

## 2026-09-28 — Proposal Builder + Profile (not yet deployed)
- New `Proposal Builder.dc.html` (route /builder): 3 steps — select creatives from the library, page details + AI brief (Claude / ChatGPT), review & publish generated sections.
- New `Profile.dc.html` (route /profile): my sites with date/brand/agency filters, footer card (image or video headshot, CTA), change password / email, sign out.
- New `proposal-api.js`, `supabase/functions/generate-sections` (server-side AI proxy), `supabase/migrations/2026-09-28_proposal_builder.sql`.
- Profile → AI Connections: each member connects their own ChatGPT / Claude key (verified, AES-GCM encrypted server-side via `supabase/functions/ai-connections`); generate-sections uses it before the company key.
- Setup: run the SQL migration; `supabase functions deploy ai-connections`; `supabase secrets set AI_KEY_SECRET=$(openssl rand -base64 32)`; `supabase functions deploy generate-sections`; `supabase secrets set ANTHROPIC_API_KEY=… OPENAI_API_KEY=…`.

# KORTX Creative Lab — Changelog

Newest first. One entry per meaningful change. "Live" = deployed to kortx-creative-labs.netlify.app.

## 2026-09-25 (Fri)

### Hero loading
- Hero ARCO units (a1, a2, a3, a3-nohl, ctv) slimmed from ~6.5 MB each to ~150 KB: embedded full-size PNGs pulled out as 2× WebP files next to each index.html.
- Hero ad slots stay hidden until their creative has fully loaded, then fade in (no dark empty frame, no half-drawn ad).
- The lifted "The art of feeling at home" headline appears only once the hero 300×600 has loaded, so it never doubles over a placeholder.

### Tab icon
- KORTX logomark added as the browser tab icon on all live pages (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`).

### Went live
- Site live on Netlify (Personal plan) at `kortx-creative-labs.netlify.app`.
  Short URLs: `/` Creative Lab (Playground 9-10 v8), `/database`, `/style-guide`, `/insights`.
- Creative database moved to Supabase (Pro): 226 creatives loaded; admin sign-in (@kortx.io only); esimone@kortx.io set as admin.
- Supabase auth URLs set to the Netlify address.

### Creative Database (`Best of Creative Services Database.dc.html`)
- Reads/writes the shared Supabase library instead of browser storage.
- Fixed a crash that left the page blank while connecting.
- Added one-time **Send To Live Library** button to move browser-only edits and the Visit Arizona Scratch Off zip to Supabase.
- Rows now load in small batches (on-screen first) for a faster first screen.

### Creative Lab (`Playground 9-10 v8.dc.html`)
- Renamed `assets/ads/` → `assets/work/` and `ad.js`/`ad.css` → `unit.js`/`unit.css` so Chrome stops removing units as "ads".
- Removed placeholder mock ads; hero units are hard-wired and load immediately (`AdSlot.dc.html`).
- Full Catalogue previews wait until the gallery is near; focused slide first, neighbours ~1s later.
- Section HTML units and gallery/modal frames load lazily; preconnect to Captivate, Supabase and CDNs.
- Uploaded zip creatives now play in the public gallery (unpacked in the background).

### Project
- Handoff package (`design_handoff_creative_lab/`) with Supabase SQL setup + creative seed.
- `NETLIFY-SETUP.md` setup guide.
- Weekly Friday backup started (this file + full project download).

## Backups
| Date | What |
|---|---|
| 2026-09-25 | Full project download #1 |
