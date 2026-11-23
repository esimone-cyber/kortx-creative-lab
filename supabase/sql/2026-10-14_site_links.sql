-- KORTX Live Links — run once in the Supabase SQL Editor, AFTER
-- 2026-10-02_admin_control.sql (needs is_admin()). Safe to re-run.
-- One row per live page. Admins edit; any signed-in teammate can read.

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
alter table public.site_links add column if not exists hidden boolean not null default false;
alter table public.site_links add column if not exists in_nav boolean;  -- null = use the page's default

alter table public.site_links enable row level security;
drop policy if exists "team reads links" on public.site_links;
create policy "team reads links" on public.site_links for select to authenticated using (true);
drop policy if exists "admins manage links" on public.site_links;
create policy "admins manage links" on public.site_links for all to authenticated using (public.is_admin()) with check (public.is_admin());
