-- Campaign briefs — run once in the Supabase SQL Editor (safe to re-run).
-- Clients submit the public Campaign Brief Intake without an account.
-- Only signed-in @kortx.io team members can read or update briefs.

create table if not exists public.campaign_briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  status text not null default 'new' check (status in ('new', 'proposal')),
  advertiser text,
  campaign_name text,
  agency text,
  contact_name text,
  contact_email text,
  budget text,
  flight text,
  answers jsonb not null default '{}'::jsonb,
  qa jsonb not null default '[]'::jsonb,
  notified_at timestamptz
);

create index if not exists campaign_briefs_created_idx on public.campaign_briefs (created_at desc);

alter table public.campaign_briefs enable row level security;

drop policy if exists "Anyone can submit a brief" on public.campaign_briefs;
create policy "Anyone can submit a brief" on public.campaign_briefs
  for insert to anon, authenticated
  with check (status = 'new' and notified_at is null);

drop policy if exists "KORTX team reads briefs" on public.campaign_briefs;
create policy "KORTX team reads briefs" on public.campaign_briefs
  for select to authenticated
  using (lower(auth.jwt() ->> 'email') like '%@kortx.io');

drop policy if exists "KORTX team updates briefs" on public.campaign_briefs;
create policy "KORTX team updates briefs" on public.campaign_briefs
  for update to authenticated
  using (lower(auth.jwt() ->> 'email') like '%@kortx.io')
  with check (lower(auth.jwt() ->> 'email') like '%@kortx.io');

grant insert on public.campaign_briefs to anon;
grant select, insert, update on public.campaign_briefs to authenticated;
