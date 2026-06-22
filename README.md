# NEWME MEDTECH

Conversion-focused B2B medical aesthetic equipment platform built with Next.js App Router, TypeScript, Tailwind, OpenAI, Supabase, and Resend.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and add credentials.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. `npm run dev`

Windows users can also double-click `启动网站.cmd`; it starts the local server and opens `http://localhost:3000` automatically.

## Editing product images and copy

- Edit product names, descriptions, specifications, applications, and certifications in `lib/products.ts`.
- Put product PNG/WebP files in `public/images/products/`.
- Add the matching `image` path to the product record, for example `image: '/images/products/rf-microneedling.png'`.
- Product cards and detail pages automatically switch from the prepared placeholder to the uploaded image.

Footer contact details can be edited in `.env.local` through `NEXT_PUBLIC_CONTACT_TEL`, `NEXT_PUBLIC_CONTACT_EMAIL`, and `NEXT_PUBLIC_WHATSAPP_NUMBER`. Set `NEXT_PUBLIC_FACEBOOK_URL` and `NEXT_PUBLIC_INSTAGRAM_URL` to activate the social icons. The defaults live in `lib/site-config.ts`, ready to be replaced by a CMS later.

## Global narrative layer

The canonical semantic strategy is stored in `lib/global-narrative.ts`. It drives site metadata, Schema.org organization relationships, Nova's system prompt, `/llms.txt`, and `public/knowledge/newme-global-narrative.json`. Keep future content aligned with application-driven systems, technology integration, workflow relevance, and decision frameworks. Avoid hidden keyword blocks or unsupported market, clinical, and regulatory claims.

Without an OpenAI key, Nova uses a deterministic product knowledge fallback. In production, lead submission fails safely if Supabase is not configured.

## Lead export

Add `ADMIN_EXPORT_TOKEN` to your environment, then download `/api/leads/export?token=YOUR_TOKEN`.

## Deploy

Import the repository in Vercel, add the environment variables, and deploy. Sitemap and robots are generated automatically.
