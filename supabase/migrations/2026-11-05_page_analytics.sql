-- Page analytics for published Page Builder pages (/p/<slug>).
-- Run once in Supabase → SQL Editor. Safe to re-run.
--
-- Anyone who opens a PUBLISHED page can write events for it (no sign-in, no password).
-- Only the page's owner and admins can read them (Profile → Analytics).

create table if not exists public.page_events (
  id bigint generated always as identity primary key,
  page_id uuid not null references public.landing_pages(id) on delete cascade,
  kind text not null check (kind in ('view','leave','tab','ad_view','ad_click','interact','cta')),
  target text,                 -- tab label, ad name ("Brand · Ad"), block id or CTA label
  visitor text not null,       -- anonymous id kept in the viewer's browser
  viewer text,                 -- recipient label from a tracked link (?v=Jane%20Doe) or a name the viewer gave
  device text check (device in ('desktop','tablet','mobile')),
  seconds integer,             -- time on page (leave events)
  referrer text,
  created_at timestamptz not null default now()
);
create index if not exists page_events_page_idx on public.page_events (page_id, created_at desc);
create index if not exists page_events_kind_idx on public.page_events (page_id, kind);

alter table public.page_events enable row level security;

drop policy if exists "log events on published pages" on public.page_events;
create policy "log events on published pages" on public.page_events for insert to anon, authenticated
  with check (exists (select 1 from public.landing_pages p where p.id = page_id and p.status = 'published')
              and char_length(coalesce(target, '')) <= 200 and char_length(visitor) <= 64 and char_length(coalesce(viewer, '')) <= 120);

drop policy if exists "owners read their page events" on public.page_events;
create policy "owners read their page events" on public.page_events for select to authenticated
  using (exists (select 1 from public.landing_pages p where p.id = page_id and (p.owner = auth.uid()
         or exists (select 1 from public.profiles pr where pr.id = auth.uid() and pr.role = 'admin'))));

grant insert on public.page_events to anon, authenticated;
grant select on public.page_events to authenticated;
