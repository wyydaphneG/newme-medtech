# NEWME MEDTECH Page Generation System

The website is fully CMS-driven.

## System Page Template

1. Hero — system name and description
2. Applications list
3. Technologies list
4. Products list
5. Conversion CTA — WhatsApp and inquiry

## Technology Page Template

1. Definition
2. Mechanism
3. Applications
4. Related systems
5. Related products
6. FAQ

## Product Page Template

1. Product name and image
2. Clinical applications
3. Technology used
4. Parent system
5. Key features
6. Specifications — positioned near the bottom of the page
7. Inquiry CTA

## Application Page Template

1. What it is
2. Systems involved
3. Technologies used
4. Products supporting it
5. Clinical outcomes

## Dynamic Generation Rule

- All pages are dynamically generated from CMS data.
- No page-specific content may be hard-coded in route components.
- Route components act only as reusable templates and data loaders.
- Entity relationships determine lists, internal links, recommendations, and structured data.
- Missing or unpublished CMS records must return a controlled not-found state.
