# Supabase updates — Oct 13, 2026

1. SQL Editor → run `2026-10-13_campaign_briefs.sql` (creates the campaign_briefs table + security).
2. Edge Functions → deploy `brief-notify` (email to strategy team) and `brief-extract` (Import Brief AI). Both need JWT verification OFF.
3. Edge Functions → Secrets: RESEND_API_KEY, STRATEGY_TEAM_EMAILS, BRIEF_FROM_EMAIL, SITE_URL, ANTHROPIC_API_KEY, (optional) BRIEF_MODEL. Import Brief needs ANTHROPIC_API_KEY for public clients; signed-in @kortx.io users can also run it on their own Profile → AI Connections Claude key (needs AI_KEY_SECRET).
4. Storage → upload the two templates from assets/templates/ if you want them served from Supabase.

Earlier: `2026-10-11_proposal_chats.sql` and `generate-sections/` (already applied if Proposal Chat works).
