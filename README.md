# America First Limited — corporate website renderer

This repository contains the code and public rendering for `americafirst.co.nz`.

## Source-of-truth boundary

**Google Drive / David OS is the canonical knowledge and substantive-content source.** This repository is the implementation layer for the approved public front end.

For material content changes:

1. update or verify the appropriate canonical David OS / America First Limited record first;
2. derive audience-appropriate public copy from that record;
3. implement the approved copy here;
4. do not place internal notes, AI instructions, management commentary or source-of-truth guidance in rendered pages.

Repository documentation may describe implementation behaviour, but it does not override the canonical Drive records for company facts, strategy, products, projects or public-positioning decisions.

## Public surface

The corporate website currently contains:

- `/` — company introduction;
- `/about` — company overview;
- `/projects` — businesses and projects;
- `/projects/grid-eater` — GRID EATER overview;
- `/projects/cdip` — CDIP feasibility-stage overview;
- `/services` — concise GRID EATER digital-services route;
- `/contact` — business and project contact route.

GRID EATER is a business of America First Limited. CDIP is a data-centre development project sponsored by America First Limited and is currently at feasibility stage.

## Hard architecture boundary

This repository must remain a lightweight corporate website. It must not contain or depend on the legacy America First business directory, NZBN/business-directory data, directory search/indexing, GRID EATER production databases, Typesense, crawlers/processors or operational credentials.

The operating business-discovery platform lives at `grideater.com`.

## Legacy URL migration

The Worker allowlists the current corporate routes and required static assets. Other retired historical `americafirst.co.nz` paths permanently redirect with HTTP 301 to:

`https://grideater.com/search`

Legacy paths and query strings are not forwarded.

## Email / DNS boundary

Website code changes and deployments must not alter or remove MX/email configuration for `americafirst.co.nz`, or make unrelated DNS changes.
