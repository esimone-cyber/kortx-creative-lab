-- Make esimone@kortx.io an Admin. Safe to re-run.
-- Paste into Supabase → SQL Editor → New query → Run.

-- 1. Already signed up: promote now.
--    (Dynamic literal works whether profiles.role is text or the app_role enum.)
do $$
begin
  execute format('update public.profiles set role = %L where lower(email) = %L', 'admin', 'esimone@kortx.io');
end $$;

-- 2. Not signed up yet: leave an Admin invite so the account is created as Admin.
--    (Requires 2026-10-02_admin_control.sql; skipped if the invites table is missing.)
do $$
begin
  if to_regclass('public.invites') is not null
     and not exists (select 1 from public.profiles where lower(email) = 'esimone@kortx.io') then
    delete from public.invites where lower(email) = 'esimone@kortx.io' and accepted_at is null;
    insert into public.invites (email, role) values ('esimone@kortx.io', 'admin');
  end if;
end $$;

-- 3. Check: shows 'admin' if they have an account, otherwise the pending Admin invite.
select 'account' as kind, email, role::text from public.profiles where lower(email) = 'esimone@kortx.io'
union all
select 'pending invite', email, role from public.invites where lower(email) = 'esimone@kortx.io' and accepted_at is null;
