-- KORTX Proposal Builder + Profile — run once in the Supabase SQL Editor.

-- 1. Generated landing pages
create table if not exists landing_pages (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft','published')),
  page_type text not null check (page_type in ('Proposal','KORTX Intelligence')),
  agency text, brand text not null, brand_url text, brief text,
  provider text, model text,
  creative_ids text[] default '{}', assets jsonb default '[]', sections jsonb default '[]', theme jsonb default '{}',
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table landing_pages enable row level security;
drop policy if exists "own pages" on landing_pages;
create policy "own pages" on landing_pages for all using (owner = auth.uid()) with check (owner = auth.uid());
drop policy if exists "admins read all" on landing_pages;
create policy "admins read all" on landing_pages for select using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
drop policy if exists "published are public" on landing_pages;
create policy "published are public" on landing_pages for select using (status = 'published');

-- 2. Profile fields used in every generated page's footer
alter table profiles
  add column if not exists title text,
  add column if not exists phone text,
  add column if not exists headshot_url text,
  add column if not exists headshot_kind text,
  add column if not exists headshot_frame jsonb,
  add column if not exists cta_label text,
  add column if not exists cta_url text,
  add column if not exists updated_at timestamptz;
drop policy if exists "edit own profile" on profiles;
create policy "edit own profile" on profiles for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));

-- 3. Storage: uploaded brand assets and headshots (public read, owner write)
insert into storage.buckets (id, name, public) values ('proposal-assets','proposal-assets', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('headshots','headshots', true) on conflict do nothing;
drop policy if exists "own uploads" on storage.objects;
create policy "own uploads" on storage.objects for insert to authenticated
  with check (bucket_id in ('proposal-assets','headshots') and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "own uploads update" on storage.objects;
create policy "own uploads update" on storage.objects for update to authenticated
  using (bucket_id in ('proposal-assets','headshots') and (storage.foldername(name))[1] = auth.uid()::text);

-- 4. Personal AI connections (Profile → AI Connections). Only the Edge
--    Functions (service role) read or write this table; the browser never does.
create table if not exists user_ai_keys (
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('claude','openai')),
  key_cipher text not null, key_hint text, models text[] default '{}',
  verified_at timestamptz, created_at timestamptz default now(),
  primary key (user_id, provider)
);
alter table user_ai_keys enable row level security;
