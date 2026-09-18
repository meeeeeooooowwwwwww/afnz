# America First Limited — static corporate site

This repository is the canonical source for the lightweight `americafirst.co.nz` corporate website.

## Purpose

America First Limited is the umbrella company trading as **GRID EATER**.

The website may describe corporate services including:

- web hosting;
- domains;
- business email;
- branding;
- websites;
- SEO;
- PPC / paid search;
- related digital infrastructure and marketing services.

## Hard architecture boundary

This repository must remain a **static corporate website**.

It must not contain or depend on:

- the legacy America First business directory;
- NZBN/business-directory data;
- directory search/indexing;
- business data storage;
- GRID EATER production databases;
- GRID EATER Typesense;
- GRID EATER crawlers/processors;
- GRID EATER operational credentials.

The full directory/platform product lives at **grideater.com**.

## Email boundary

Website changes and deployments must not alter or remove MX/email configuration for `americafirst.co.nz`.
