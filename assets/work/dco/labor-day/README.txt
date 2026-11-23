IKEA Labor Day | 300 x 600 animated HTML mockup

Open index.html. No build, remote scripts, CDN, or external asset requests.
Upload the entire extracted folder and load its index.html in a 300 x 600 iframe.
Your gallery dropdown should switch the iframe URL among the three seasonal folders.
Keep folder structure intact. Do not load the ZIP directly into an iframe.

Click a product or its plus marker to open its price card. Click the card / right arrow to open the exact product page in a new tab. Close with X, outside the card, or Escape. Only one card is open at a time. Tab and Enter/Space are supported. Reduced-motion preferences are respected.

The main background and logo link to https://www.ikea.com/us/en/
The bottom CTA links to https://www.ikea.com/us/en/rooms/outdoor/

Text, prices, links, product placement and hotspot coordinates are editable in config.js.
Prices are snapshots checked September 23, 2026 on the six supplied IKEA US product pages; standard prices are used, not temporary member-only offers. They do not update automatically.

Font: Noto IKEA regular/bold from the public IKEA website font stylesheet, bundled locally. Logo: supplied SVG. Products and room: supplied product references composited with built-in image generation into a furnished patio scene with a grill along the wall and four chairs around the table. Transparent interactive regions follow the table and grill. It is not an official IKEA room photograph.

Animation: staggered logo/headline/room entrances, repeating subtle hotspot rings and ambient lights. Animation does not interrupt product interactions. Reloading the iframe restarts the entrance. Optional same-origin replay: iframe.contentWindow.IKEAAd.replay().

Local interaction hooks: the ad window dispatches CustomEvent('ikea-ad-interaction') with detail.variant, detail.action and detail.product. Actions include product-expand, product-clickout and season-clickout. No external tracking is installed.

Product sources:
NÄMMARÖ — $199.99
https://www.ikea.com/us/en/p/naemmaroe-table-outdoor-light-brown-stained-20510307/

GRILLSKÄR — $734.00
https://www.ikea.com/us/en/p/grillskaer-gas-grill-w-kitchen-island-stainless-steel-outdoor-s09618941/

Validation: all six products passed local DOM checks for opening, closing, Escape, focus restoration, prices and destination URLs. Static rendered layouts were inspected. Live-browser testing was blocked by the browser URL security policy.
