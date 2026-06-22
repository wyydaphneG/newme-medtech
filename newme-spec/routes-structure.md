# NEWME MEDTECH Route Structure

## Routes

```text
/                                  Home

/systems                           Systems index
/systems/[system]                  System detail

/technologies                      Technologies index
/technologies/[technology]         Technology detail

/products                          Products index
/products/[product]                Product detail

/applications                      Applications index
/applications/[application]        Application detail

/about                             About
/contact                           Contact
/blog                              Blog index
/blog/[article]                    Blog article
```

## Generation Rules

- Each system page is generated from a CMS `System` entity.
- Each product page is generated from a CMS `Product` entity.
- Each technology page is generated from a CMS `Technology` entity.
- Each application page is generated from a CMS `Application` entity.
- The Home, About, Contact, and Blog pages must also retrieve their editable content from CMS entities or CMS-managed page records.
- Route files may define reusable rendering templates, metadata generation, and data loading only.
- Page-specific marketing copy, relationships, specifications, images, FAQs, and calls to action must not be hard-coded inside route components.

## Non-Negotiable Rule

No manually authored content pages are allowed.

All published pages must be CMS-driven.

If CMS data is missing, the route must return a controlled not-found or unpublished state rather than silently rendering hard-coded fallback content.
