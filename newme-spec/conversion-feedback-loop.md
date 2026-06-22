# Conversion & Feedback Loop

## Runtime Flow

```text
Anonymous browser events
→ /api/analytics/events
→ Supabase analytics_events
→ daily /api/analytics/analyze
→ AI_INTELLIGENCE_CORE.evaluateConversionFeedback
→ conversion_insights
→ content_strategy_recommendations
→ safe CTA prioritization + human-reviewed content actions
```

## Tracked Events

- Page view
- Section view
- CTA click
- Inquiry start
- Lead submission or error
- WhatsApp click
- AI chat open
- Page exit, time on page, maximum scroll depth, and last section

The tracker does not send form values, contact details, IP addresses, fingerprints, medical information, or element text. It respects browser Do Not Track.

## Dynamic Optimization

The latest active recommendation may safely prioritize Inquiry, WhatsApp, or AI Chat. The current implementation visibly emphasizes WhatsApp when aggregated behavior indicates a strong WhatsApp preference.

Content changes remain recommendations. Medical, regulatory, factual, and published-copy changes require human review.

## Required Environment

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
CRON_SECRET=
```

Apply `supabase/schema.sql` before enabling analytics in production. Vercel runs the analysis endpoint daily at 02:00 UTC.

## Privacy Deployment Check

Confirm analytics disclosure and any jurisdiction-specific consent requirements with the company’s privacy/legal reviewer before production launch.
