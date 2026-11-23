-- KORTX Admin Control — run once in the Supabase SQL Editor, AFTER
-- 2026-10-02_team_auth.sql. Safe to re-run.
-- Adds invites, and admin-only functions to list users, change roles,
-- and delete accounts. Every function re-checks is_admin() server-side.

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- 1. Invites
create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  token text unique not null default replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
  email text not null,
  full_name text,
  role text not null default 'internal' check (role in ('admin','internal')),
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  accepted_at timestamptz,
  expires_at timestamptz default now() + interval '30 days'
);
create unique index if not exists invites_open_email on public.invites (lower(email)) where accepted_at is null;
alter table public.invites enable row level security;
drop policy if exists "admins manage invites" on public.invites;
create policy "admins manage invites" on public.invites for all using (public.is_admin()) with check (public.is_admin());

-- Public lookup by token only (prefills the sign-up form). Returns nothing
-- for used or expired tokens.
create or replace function public.invite_lookup(p_token text)
returns table (email text, full_name text)
language sql stable security definer set search_path = public as $$
  select i.email, i.full_name from public.invites i
   where i.token = p_token and i.accepted_at is null and i.expires_at > now();
$$;
grant execute on function public.invite_lookup(text) to anon, authenticated;

-- 2. Sign-up trigger: domain gate, profile, and invite acceptance (applies the invited role)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare inv public.invites;
begin
  if lower(new.email) not like '%@kortx.io' then
    raise exception 'KORTX accounts only (@kortx.io)';
  end if;
  select * into inv from public.invites
   where lower(email) = lower(new.email) and accepted_at is null and expires_at > now()
   order by created_at desc limit 1;
  insert into public.profiles (id, email, full_name, title, created_at)
  values (new.id, lower(new.email),
          coalesce(new.raw_user_meta_data->>'full_name', inv.full_name),
          new.raw_user_meta_data->>'title', now())
  on conflict (id) do update set email = excluded.email;
  -- Dynamic literal so this works whether profiles.role is text or the app_role enum.
  execute format('update public.profiles set role = %L where id = %L', coalesce(inv.role, 'internal'), new.id);
  if inv.id is not null then update public.invites set accepted_at = now() where id = inv.id; end if;
  return new;
end $$;

-- 3. Admin: list everyone
create or replace function public.admin_list_users()
returns table (id uuid, email text, full_name text, title text, role text,
               created_at timestamptz, last_sign_in_at timestamptz, confirmed boolean)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  return query
    select p.id, coalesce(p.email, u.email)::text, p.full_name, p.title, p.role::text,
           coalesce(p.created_at, u.created_at), u.last_sign_in_at, (u.email_confirmed_at is not null)
      from public.profiles p join auth.users u on u.id = p.id
     order by p.role::text, coalesce(p.full_name, u.email);
end $$;

-- 4. Admin: change role (cannot remove the last admin)
create or replace function public.admin_set_role(p_user uuid, p_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  if p_role not in ('admin','internal') then raise exception 'Unknown role'; end if;
  if p_role = 'internal' and (select count(*) from public.profiles where role = 'admin' and id <> p_user) = 0 then
    raise exception 'Keep at least one admin';
  end if;
  execute format('update public.profiles set role = %L, updated_at = now() where id = %L', p_role, p_user);
end $$;

-- 5. Admin: edit name / title
create or replace function public.admin_update_user(p_user uuid, p_full_name text, p_title text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  update public.profiles set full_name = p_full_name, title = p_title, updated_at = now() where id = p_user;
end $$;

-- 6. Admin: delete an account (auth user + profile via cascade). Not yourself.
create or replace function public.admin_delete_user(p_user uuid)
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  if p_user = auth.uid() then raise exception 'You cannot delete your own account here'; end if;
  delete from auth.users where id = p_user;
end $$;

revoke all on function public.admin_list_users() from public, anon;
revoke all on function public.admin_set_role(uuid, text) from public, anon;
revoke all on function public.admin_update_user(uuid, text, text) from public, anon;
revoke all on function public.admin_delete_user(uuid) from public, anon;
grant execute on function public.admin_list_users() to authenticated;
grant execute on function public.admin_set_role(uuid, text) to authenticated;
grant execute on function public.admin_update_user(uuid, text, text) to authenticated;
grant execute on function public.admin_delete_user(uuid) to authenticated;
