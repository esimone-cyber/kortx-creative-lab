-- ============================================================
-- KORTX Creative Labs — October 20 update
-- COPY EVERYTHING IN THIS FILE, paste it into
-- Supabase → SQL Editor → New query, then click Run.
-- Safe to run more than once. Needs the earlier setup
-- (RUN-IN-SUPABASE.sql) to have been run already.
-- ============================================================

-- 1. Live Links table (top dropdown + circle menu settings).
--    Already there if you ran 2026-10-14_site_links.sql; this just makes sure.
create table if not exists public.site_links (
  id          text primary key,
  name        text not null,
  url         text not null,
  tag         text not null default 'Team',
  description text,
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now(),
  updated_by  text
);
alter table public.site_links add column if not exists hidden  boolean not null default false;
alter table public.site_links add column if not exists in_nav  boolean;   -- Top Dropdown (null = page default)
alter table public.site_links add column if not exists in_menu boolean;   -- Circle Menu  (null = page default, shown)

alter table public.site_links enable row level security;
drop policy if exists "team reads links" on public.site_links;
create policy "team reads links" on public.site_links for select to authenticated using (true);
drop policy if exists "admins manage links" on public.site_links;
create policy "admins manage links" on public.site_links for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 2. Shared proposal links (/p/<slug>): anyone can open a PUBLISHED proposal.
--    Drafts stay visible only to their owner (and admins).
drop policy if exists "published are public" on public.landing_pages;
create policy "published are public" on public.landing_pages for select using (status = 'published');

-- 3. Make Supabase pick up the new column right away.
notify pgrst, 'reload schema';
