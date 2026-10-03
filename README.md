# America First Limited — corporate website renderer

This repository contains the code and public rendering for `americafirst.co.nz`.

## Source-of-truth boundary

**Google Drive / David OS is the canonical knowledge and substantive-content source.** This repository is the implementation layer for the approved public front end.

For material content changes:

1. update or verify the appropriate canonical David OS / America First Limited record first;
2. derive audience-appropriate public copy from that record;
3. implement only founder-approved public copy/assets here;
4. do not place internal notes, AI instructions, evidence IDs, management commentary or source-of-truth guidance in rendered pages.

Repository documentation may describe implementation behaviour, but it does not override canonical Drive records for company facts, strategy, products, projects, service scope or public-positioning decisions.

## Approved public surface

The corporate website contains:

- `/` — Business / Commercial Development proposition and orientation;
- `/about` — Company;
- `/services` — high-level corporate service index;
- `/services/business-commercial-development` — the single approved detailed corporate service page;
- `/projects` — America First businesses and sponsored projects;
- `/projects/grid-eater` — GRID EATER overview;
- `/projects/cdip` — CDIP feasibility-stage overview;
- `/contact` — routed business/project enquiry page.

Business / Commercial Development is the lead America First service family. Practical AI integration is a supporting capability inside that work, not a separate page family or AI-agency identity.

GRID EATER is a business of America First Limited and remains the primary customer-facing route for current tactical digital products and services. America First does not duplicate the GRID EATER price/package ladder.

CDIP is a data-centre development project sponsored by America First Limited and remains at feasibility stage. Public material must not imply an operational facility, secured site/power/fibre/funding/customers/capacity or private counterparty endorsement.

## Visual boundary

Keep the site restrained and corporate: strong typography, whitespace, code-built conceptual diagrams and factual company-owned imagery where approved. Do not use fake teams/offices, generic handshake stock, neon AI imagery, speculative data-centre renders presented as real, fabricated performance charts or third-party/client logos without permission.

## Hard architecture boundary

This repository must remain a lightweight corporate website. It must not contain or depend on the legacy America First business directory, NZBN/business-directory data, GRID EATER production databases, Typesense, crawlers/processors or operational credentials.

The operating business-discovery platform lives at `grideater.com`.

## Legacy URL migration

The Worker allowlists approved corporate routes and required static assets. Other retired historical `americafirst.co.nz` paths permanently redirect with HTTP 301 to:

`https://grideater.com/search`

Legacy paths and query strings are not forwarded.

## Email / DNS boundary

Website code changes and deployments must not alter or remove MX/email configuration for `americafirst.co.nz`, or make unrelated DNS changes.

## Release boundary

A PR/merge is not proof of a live release. Production deployment is controlled separately through the existing central guarded external-site deployment path, using an exact approved source SHA and a later release gate.