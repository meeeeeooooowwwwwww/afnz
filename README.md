# America First Limited — corporate website

This repository renders `americafirst.co.nz`.

## Authority boundary

Google Drive / David OS is the substantive source of truth. This repository implements founder-approved public copy, visual design, routes and release behaviour.

## Current public direction

America First is presented as a founder-led New Zealand company working across AI / advanced intelligence, business development, systems and project delivery.

Current service families:
- Business & Commercial Development
- Project Management & Delivery
- AI & Business Systems
- Discovery & Feasibility
- Product & Brand Development

“AI / SI” language is future-oriented: the company works with current AI today and designs for increasingly capable intelligence systems. The site must not imply that America First currently possesses literal superintelligence.

## Global shell

The header and footer are single-source global components in `src/site-shell.js`. Static public pages contain only `#site-header` and `#site-footer` placeholders. The Cloudflare Worker injects the global shell server-side with HTMLRewriter, so delivered HTML remains visible to users and crawlers without copied navigation drift.

## Rendering / routing

`src/worker.js` owns:
- approved extensionless page routes;
- the `/assets/` static-asset boundary;
- global header/footer injection;
- security/privacy response headers;
- legacy redirect handling.

Cloudflare Static Assets remains configured with `html_handling = "none"`. Do not remove that while the Worker maps extensionless routes to explicit `.html` files. Real Wrangler integration tests permanently cover this behaviour.

## Visual system

The site uses bespoke model-generated NZ/robot imagery as future-facing brand material. The hero is an optimized WebP and the five service scenes are packed into one optimized WebP sprite to reduce requests and payload. It is illustrative, not evidence of owned robots, facilities, customers or deployed client systems. Do not introduce fake team imagery, invented client logos, unsupported performance charts or infrastructure claims.

## Release quality

Before release:
1. `npm ci --no-audit --no-fund`
2. `npm test`
3. `npx wrangler deploy --dry-run`
4. review the exact candidate visually at desktop/mobile sizes;
5. deploy only the exact approved 40-character source SHA through the central guarded external-site lane;
6. verify and disarm the lane afterward.

`package-lock.json` is committed and Wrangler is pinned to the version validated in CI; dependency changes require an intentional lockfile update.

A merge is not proof of a live release.
