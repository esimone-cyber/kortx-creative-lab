-- KORTX Live Links: the circle (profile) menu toggle. Run once in the Supabase SQL Editor,
-- after 2026-10-14_site_links.sql. Safe to re-run.
alter table public.site_links add column if not exists in_menu boolean;  -- null = use the page's default (shown)
