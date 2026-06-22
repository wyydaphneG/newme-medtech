# NEWME MEDTECH Admin Dashboard Specification

## Purpose

The dashboard manages the structured CMS behind the website. It must preserve:

```text
SYSTEM → TECHNOLOGY → PRODUCT → APPLICATION
```

It is not a product-upload panel. Editors must create and validate entity relationships before publishing.

## Access Roles

### Admin

- Full CRUD access
- Publish, archive, restore, and delete records
- Manage users, media, SEO, relationships, and regulatory fields
- Export leads

### Editor

- Create and edit draft content
- Upload media
- Manage entity relationships
- Submit records for review
- Cannot permanently delete records or publish regulatory claims

### Viewer

- Read-only dashboard access
- May review content and leads but cannot export or mutate data

Roles are stored in Supabase Auth `app_metadata.cms_role`.

## Navigation

1. Overview
2. Systems
3. Technologies
4. Products
5. Applications
6. Pages
7. Articles
8. FAQs
9. Media Library
10. Leads
11. SEO Review
12. Settings

## Overview

- Published/draft counts by entity
- Missing required relationships
- Missing SEO titles/descriptions
- Products without images
- Records awaiting regulatory review
- Recent leads and lead-status summary
- Recent content changes

## Entity Editor

Every editor uses these tabs:

1. Content
2. Relationships
3. Media
4. SEO
5. Regulatory/clinical review where applicable
6. Preview
7. Revision history

Autosave may save drafts only. Publishing always requires an explicit action.

## Required Publishing Checks

### System

- Name, slug, and description
- At least one technology
- At least one application
- SEO title and description

### Technology

- Type, definition, and mechanism
- At least one system and application
- FAQ review

### Product

- Parent system and primary technology
- At least one application
- Product image with alt text
- Key features and specifications
- Market-specific regulatory note
- Regulatory claims approved by an admin

### Application

- Description
- At least one system and technology
- Clinical outcomes written without guarantees
- Clinical disclaimer

## Product Editor Order

1. Identity and overview
2. Parent system
3. Primary technology
4. Clinical applications
5. Key features
6. Media
7. Specifications
8. Regulatory note
9. SEO
10. Preview and publish

## Media Library

- Supabase bucket: `cms-media`
- Accepted types: JPEG, PNG, WebP, AVIF, SVG
- Maximum size: 10 MB
- Alt text required before use on a published page
- Product image roles: hero, gallery, detail, before, after
- Before/after assets require consent and compliance review outside the CMS

## Leads

- Filters: status, date, country, business type, product interest, source
- Statuses: new, qualified, contacted, won, lost, spam
- CSV export restricted to Admin
- Email and WhatsApp fields are personal data and must not appear in public API responses

## Safety

- Service Role Key is server-only
- Every admin API request requires a valid Supabase access token
- Deletion is Admin-only
- Editor-created content defaults to draft
- Regulatory claims require human review
- Public website queries only published records under RLS
