-- Saved Proposal Builder conversations with Claude (owner-only).
create table if not exists public.proposal_chats (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null default 'Untitled proposal',
  brand text,
  messages jsonb not null default '[]'::jsonb,
  config jsonb,
  off jsonb not null default '{}'::jsonb,
  form jsonb not null default '{}'::jsonb,
  creatives jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists proposal_chats_owner_updated on public.proposal_chats (owner, updated_at desc);
alter table public.proposal_chats enable row level security;
drop policy if exists "own chats" on public.proposal_chats;
create policy "own chats" on public.proposal_chats for all using (owner = auth.uid()) with check (owner = auth.uid());
