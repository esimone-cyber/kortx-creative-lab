THE NORTH FACE — CLEAN RUN
300 × 600 interactive rich media concept

OPEN / UPLOAD
Extract this ZIP and open index.html in a modern browser, or upload the ZIP
contents to your HTML ad host. Keep the assets folder beside index.html.
All display assets and fonts are bundled locally. No CDN, framework, network
request or account is needed to play. Only shopping links go online.

GAME
• The red click-to-play prompt has an upward arrow on each side and a subtle
  looping pulse (disabled when reduced motion is requested).
• Click anywhere on the opening slide. A three-second countdown precedes a 10-second run.
• Click and drag, touch and drag, or use the left/right arrow keys (A/D also work).
• Collect red trail markers: +100 points.
• Hit a tree or rock: −50 points; score never drops below zero. A red hit counter
  beside seconds increments and flashes the −50 penalty for each scored hit.
• Each distinct obstacle counts once; removing a hit obstacle prevents repeat penalties.
• Pause button / Escape pauses. Hidden browser tabs pause automatically.
• On completion: a dedicated final-score screen shows score and obstacle hits
  for four seconds, then transitions to the winter collection. “Explore our
  apparel” lets viewers proceed immediately. The hold pauses in hidden tabs.
• Collection: three winter outerwear styles and centered shop CTA.
• Replay fully resets the run, timer and red hit counter.
• The pause popup includes “explore our apparel” to go to the collection.
• Product carousel supports arrows/dots and advances every 4.5 seconds when
  the pointer and carousel keyboard focus are outside the ad. Reduced-motion
  preference disables automatic product rotation and decorative intro motion.

EDITING
game.js: DURATION, product names/images/descriptions, collection destination.
style.css: layout, colors, typography.
The canvas renders at 2× resolution for a crisp 300×600 display.
No product prices, discounts, prizes or purchase requirements are included.

CLICKOUT / EVENT INTEGRATION
Default destination:
https://www.thenorthface.com/en-us/c/shop-all/icons/nuptse-829805

A host may set window.clickTag before game.js to override shopping clickouts.
Gameplay clicks do not trigger shopping links.

The ad dispatches bubbling "richmedia" CustomEvents from #ad, with
{ name, ...details } under event.detail. It also invokes an optional
window.onRichMediaEvent(name, details) callback. Available events:
ad_ready, game_start, run_begin, marker_collected, obstacle_hit, game_pause,
game_complete, collection_view, game_replay, collection_skip, product_change, clickthrough.

These are integration hooks; connect them to your host's event API to persist
reporting. No analytics backend is included. For Celtra or another ad server,
map the shopping action and these hooks to the platform's native API as needed.

BRAND RESEARCH / SOURCES — September 22, 2026
https://www.thenorthface.com/en-us
https://www.thenorthface.com/en-us/c/shop-all/icons/nuptse-829805

The current site features alpine settings, exploration themes and
high-contrast retail layouts. Its heading typography was inspected as
HelveticaNeue; CSS also supplies AkkuratMono. The official logo and the
site-served regular/medium Helvetica Neue and Akkurat Mono files are included.

Colors used in this concept:
#111111 — main CTA / near black
#F8F9F9 — winter collection background (observed site light tone)
#DF1C2F — creative accent for markers and highlights
#D0E3EC / #EAF2F5 — illustrated alpine sky / snow
The red and alpine palette are creative choices, not a claim of a verified
corporate color specification. Clean Run, its illustrations and campaign
copy are original concept work, not an existing official TNF campaign.

PRODUCT IMAGERY
Official site imagery for:
Men’s 1996 Retro Nuptse Jacket (Caraway Seed / TNF Black)
Women’s Nuptse Short Jacket (White Dune / TNF Black)
Men’s 1996 Retro Nuptse Vest (TNF Black / Recycled Down)
Exact downloaded image URLs are recorded in sources.json.

VALIDATION
JavaScript syntax checked. Programmatic game tests passed: countdown,
collection and penalty scoring, distinct obstacle counting, score floor, drag/keyboard
steering, pause, timer completion, hit counter, carousel cycling, replay,
skip-to-collection, clickTag override and tracking hooks. Canvas artwork was
rendered and inspected. Full HTML browser layout verification was blocked by
the preview browser's URL security policy and remains unconfirmed.

BOBSLEDDING VARIANT
Only the gameplay artwork changes: a red two-person bobsled with metal runners,
helmeted riders, icy course banks and paired runner tracks. The Clean Run
copy, controls, collision rules, scoring, 10-second run, results hold and
apparel collection remain unchanged.
