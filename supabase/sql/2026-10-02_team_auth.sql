-- KORTX Team accounts — run once in the Supabase SQL Editor (safe to re-run).
-- Every @kortx.io sign-up gets a profiles row; anything else is rejected
-- by the database itself, not just the sign-in page.

-- 1. Profile columns used by the sign-up flow
alter table public.profiles
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists title text,
  add column if not exists phone text,
  add column if not exists onboarded_at timestamptz,
  add column if not exists last_sign_in_at timestamptz,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz;

create unique index if not exists profiles_email_key on public.profiles (lower(email));

-- 2. Domain gate + profile creation on sign-up
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) not like '%@kortx.io' then
    raise exception 'KORTX accounts only (@kortx.io)';
  end if;
  insert into public.profiles (id, email, full_name, title, created_at)
  values (new.id, lower(new.email), new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'title', now())
  on conflict (id) do update set email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    title = coalesce(public.profiles.title, excluded.title);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Keep email + last sign-in mirrored on profiles
create or replace function public.sync_user_profile() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set email = lower(new.email), last_sign_in_at = new.last_sign_in_at where id = new.id;
  return new;
end $$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of email, last_sign_in_at on auth.users
  for each row execute function public.sync_user_profile();

-- 4. Backfill existing accounts
update public.profiles p set email = lower(u.email), last_sign_in_at = u.last_sign_in_at
  from auth.users u where u.id = p.id and (p.email is null or p.last_sign_in_at is distinct from u.last_sign_in_at);
