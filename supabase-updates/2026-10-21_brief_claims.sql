-- 2026-10-21 · Brief claims
-- Adds "claim" to the Brief List. The first teammate to claim a brief owns it; it then
-- shows in their Profile → My Proposals with a Start Proposal button.
-- Run once in Supabase → SQL Editor.

alter table public.campaign_briefs add column if not exists claimed_by uuid references auth.users(id) on delete set null;
alter table public.campaign_briefs add column if not exists claimed_by_email text;
alter table public.campaign_briefs add column if not exists claimed_by_name text;
alter table public.campaign_briefs add column if not exists claimed_at timestamptz;
-- Set by the brief-notify function after the "brief claimed" email goes out (one email per claim).
alter table public.campaign_briefs add column if not exists claim_notified_at timestamptz;
-- Per-user email settings (Profile → Account → Email Notifications). Default: on.
alter table public.profiles add column if not exists notify_new_briefs boolean not null default true;
alter table public.profiles add column if not exists notify_claims boolean not null default true;

create index if not exists campaign_briefs_claimed_idx on public.campaign_briefs (claimed_by);

-- Team members can only claim an unclaimed brief, or release one they claimed themselves.
-- (Admins can release anyone's claim.)
create or replace function public.guard_brief_claim() returns trigger language plpgsql security definer set search_path = public as $$
declare is_admin boolean := exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin');
begin
  if new.claimed_by is distinct from old.claimed_by then
    if old.claimed_by is not null and old.claimed_by <> auth.uid() and not is_admin then
      raise exception 'This brief is already claimed by %', coalesce(old.claimed_by_name, old.claimed_by_email, 'another teammate');
    end if;
    if new.claimed_by is not null and new.claimed_by <> auth.uid() then
      raise exception 'You can only claim a brief for yourself';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists guard_brief_claim on public.campaign_briefs;
create trigger guard_brief_claim before update on public.campaign_briefs for each row execute function public.guard_brief_claim();

notify pgrst, 'reload schema';
