# NEWME MEDTECH System Overview

NEWME MEDTECH is not a product catalog website.

It is a structured, AI-readable aesthetic medical technology system.

The website is built on four core entities:

1. **System** — clinical application group
2. **Technology** — physical mechanism
3. **Product** — device implementation
4. **Application** — clinical demand

## Core Principle

Everything must be **system-driven**, not product-driven.

Do not build a flat product catalog.

Every page must belong to a structured system.

## Required Relationship Model

```text
System
├── Applications
├── Technologies
└── Products
    ├── Technology implementation
    ├── Treatment applications
    ├── Complementary technologies
    └── Market-specific configuration and regulatory status
```

## Page Rules

- System pages are the primary navigation and discovery layer.
- Technology pages explain mechanisms, selection logic, and workflow relevance.
- Product pages identify their parent system, implemented technology, and supported applications.
- Application pages connect clinical demand to suitable systems, technologies, and products.
- Blog, case-study, FAQ, and AI knowledge content must link back to one or more systems.
- Products must never be presented as isolated machines or as a price-led catalog.

## AI and CMS Rules

- Every entity must use a stable ID or slug.
- Every product must reference a system, technology, and one or more applications.
- Relationships must be represented as structured data, not inferred only from prose.
- Regulatory and certification claims must remain product- and market-specific.
- The AI assistant must begin recommendations with application needs and workflow context before recommending products.
