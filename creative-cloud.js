/* KORTX Creative Labs — Supabase connection.
   The one file that knows where the shared database lives. The anon key is
   public by design; row-level security in Supabase decides who can write. */

export const SUPABASE_URL = 'https://fdjfsimjilicmfsiijyi.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkamZzaW1qaWxpY21mc2lpanlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzNTQxMTUsImV4cCI6MjEwNTkzMDExNX0.vzO_SZH1b7qhCMUwkuuAzCyeUi_HBHZ3w4WwL-apS54';

const GOALS = ['Awareness', 'Engagement', 'Product Discovery', 'Store Visits', 'Commerce', 'Lead Generation'];
const ZIP_BUCKET = 'creatives';

let clientP;
export function client() {
  return clientP || (clientP = import('https://esm.sh/@supabase/supabase-js@2.45.4')
    .then(m => m.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: window.localStorage, storageKey: 'kortx.lab.auth' }
    })));
}

/* ---------- rows ---------- */
export function fromCloud(d) {
  const isZip = d.source === 'zip';
  return {
    key: d.id,
    id: isZip ? (d.name || d.zip_path || '') : (d.captivate_id || ''),
    name: d.name || '',
    brand: d.brand || '',
    product: d.creative_type,
    vertical: (d.verticals || [])[0] || '',
    verticals: d.verticals || [],
    components: d.components || [],
    goals: d.campaign_goals || [],
    knownFor: d.description || '',
    bestFor: d.best_for || '',
    measure: d.measure || '',
    mobileId: d.mobile_captivate_id || '',
    source: isZip ? 'zip' : 'link',
    zipKey: d.zip_path || '', zipName: isZip ? (d.name || '') : '',
    zipW: d.zip_width || 0, zipH: d.zip_height || 0,
    inGallery: d.in_gallery !== false,
    cropDX: d.crop_dx || 0, cropDY: d.crop_dy || 0, cropDW: d.crop_dw || 0,
    celtraId: d.celtra_id || ''
  };
}

function toCloud(r, i) {
  const isZip = r.source === 'zip';
  return {
    id: r.key,
    captivate_id: isZip ? null : (r.id || null),
    mobile_captivate_id: r.mobileId || null,
    source: isZip ? 'zip' : 'link',
    zip_path: isZip ? (r.zipKey || null) : null,
    zip_width: r.zipW || null, zip_height: r.zipH || null,
    brand: r.brand || 'Untitled',
    name: r.name || (isZip ? r.zipName : '') || null,
    creative_type: r.product,
    format: r.format === 'vertical' ? '300x600' : '1920x1080',
    verticals: (r.verticals && r.verticals.length ? r.verticals : [r.vertical]).filter(Boolean),
    components: r.components || [],
    campaign_goals: (r.goals || []).filter(g => GOALS.indexOf(g) > -1),
    description: r.knownFor || null,
    best_for: r.bestFor || null,
    measure: r.measure || null,
    in_gallery: r.inGallery !== false,
    crop_dx: Math.round(r.cropDX || 0), crop_dy: Math.round(r.cropDY || 0), crop_dw: Math.round(r.cropDW || 0),
    celtra_id: r.celtraId || null,
    prioritized: false,
    sort_order: (i + 1) * 10
  };
}

let known = new Set();

export async function fetchCreatives() {
  const sb = await client();
  const { data, error } = await sb.from('creatives').select('*')
    .order('prioritized', { ascending: false }).order('sort_order', { ascending: true });
  if (error) throw error;
  known = new Set(data.map(d => d.id));
  return data.map(fromCloud);
}

/* The page hands over its whole ordered list; order becomes sort_order and any
   row that disappeared since the last sync is deleted. */
export async function saveAll(rows) {
  const sb = await client();
  const payload = rows.map(toCloud);
  let { error } = await sb.from('creatives').upsert(payload, { onConflict: 'id' });
  /* Until the best_for / measure columns exist, save everything else. */
  if (error && /best_for|measure/.test(error.message || '')) {
    console.warn('[creative-cloud] best_for / measure columns missing — run the migration SQL. Saving without them.');
    ({ error } = await sb.from('creatives').upsert(payload.map(({ best_for, measure, ...p }) => p), { onConflict: 'id' }));
  }
  if (error && /crop_dw/.test(error.message || '')) {
    console.warn('[creative-cloud] crop_dw column missing — run 2026-10-11_creative_framing_size.sql. Saving without it.');
    ({ error } = await sb.from('creatives').upsert(payload.map(({ crop_dw, ...p }) => p), { onConflict: 'id' }));
  }
  if (error && /celtra_id/.test(error.message || '')) {
    console.warn('[creative-cloud] celtra_id column missing — run 2026-10-08_creative_framing.sql. Saving without it.');
    ({ error } = await sb.from('creatives').upsert(payload.map(({ celtra_id, ...p }) => p), { onConflict: 'id' }));
  }
  if (error && /crop_d[xy]/.test(error.message || '')) {
    console.warn('[creative-cloud] crop_dx / crop_dy columns missing — run 2026-10-08_creative_framing.sql. Saving without them.');
    ({ error } = await sb.from('creatives').upsert(payload.map(({ crop_dx, crop_dy, crop_dw, best_for, measure, ...p }) => (best_for === undefined ? p : Object.assign(p, { best_for, measure }))), { onConflict: 'id' }));
  }
  if (error) throw error;
  const now = new Set(payload.map(p => p.id));
  const gone = [...known].filter(id => !now.has(id));
  if (gone.length) {
    const del = await sb.from('creatives').delete().in('id', gone);
    if (del.error) throw del.error;
  }
  known = now;
}

/* ---------- auth ---------- */
export async function currentUser() {
  const sb = await client();
  const { data } = await sb.auth.getSession();
  const u = data && data.session && data.session.user;
  if (!u) return null;
  const { data: p } = await sb.from('profiles').select('role, full_name, title, phone, onboarded_at').eq('id', u.id).maybeSingle();
  const md = u.user_metadata || {};
  let headshot = '';
  try { const { data: hs } = await sb.from('profiles').select('headshot_url').eq('id', u.id).maybeSingle(); headshot = (hs && hs.headshot_url) || ''; } catch (e) { /* column optional */ }
  return { id: u.id, headshot, email: u.email, name: (p && p.full_name) || md.full_name || '', title: (p && p.title) || md.title || '', phone: (p && p.phone) || '',
    isAdmin: !!(p && p.role === 'admin'), role: (p && p.role) || 'internal', onboarded: !!(p && p.onboarded_at) };
}

export async function onAuthChange(cb) {
  const sb = await client();
  sb.auth.onAuthStateChange(() => { currentUser().then(cb).catch(() => cb(null)); });
}

export async function signIn(email, password) {
  const sb = await client();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return currentUser();
}

export const isKortxEmail = e => /^[^\s@]+@kortx\.io$/i.test((e || '').trim());

/* First-time sign-up. Name and title ride along as user metadata; the
   on_auth_user_created trigger copies them into profiles and rejects any
   non-@kortx.io address server-side, so the client check is UX only. */
export async function signUp(email, password, meta) {
  email = (email || '').trim().toLowerCase();
  if (!isKortxEmail(email)) throw new Error('Use your @kortx.io email');
  const sb = await client();
  const { data, error } = await sb.auth.signUp({ email, password, options: {
    emailRedirectTo: location.origin + location.pathname + '?confirmed=1&next=' + encodeURIComponent(new URLSearchParams(location.search).get('next') || '/page-builder'),
    data: { full_name: (meta && meta.fullName) || '', title: (meta && meta.title) || '' }
  } });
  if (error) throw error;
  // Supabase returns a user with no identities when the email is already registered.
  if (data.user && Array.isArray(data.user.identities) && !data.user.identities.length) throw new Error('That email already has an account. Sign in instead.');
  return data.session ? 'signed-in' : 'confirm';
}

export async function resendConfirmation(email) {
  const sb = await client();
  const { error } = await sb.auth.resend({ type: 'signup', email: email.trim().toLowerCase(), options: { emailRedirectTo: location.origin + location.pathname + '?confirmed=1&next=' + encodeURIComponent(new URLSearchParams(location.search).get('next') || '/page-builder') } });
  if (error) throw error;
}

export async function sendPasswordReset(email) {
  if (!isKortxEmail(email)) throw new Error('Use your @kortx.io email');
  const sb = await client();
  const { error } = await sb.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: location.origin + location.pathname + '?reset=1' });
  if (error) throw error;
}

export async function updatePassword(password) {
  const sb = await client();
  const { error } = await sb.auth.updateUser({ password });
  if (error) throw error;
}

/* Fires cb('recovery') when the user lands from a password-reset link. */
export async function onRecovery(cb) {
  const sb = await client();
  sb.auth.onAuthStateChange(ev => { if (ev === 'PASSWORD_RECOVERY') cb('recovery'); });
}

/* First-run profile details. Role is never sent; RLS keeps it unchanged. */
export async function completeOnboarding(fields) {
  const sb = await client();
  const { data } = await sb.auth.getSession();
  const u = data && data.session && data.session.user;
  if (!u) throw new Error('Sign in first');
  const patch = { full_name: fields.fullName || null, title: fields.title || null, phone: fields.phone || null, onboarded_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  const { error } = await sb.from('profiles').update(patch).eq('id', u.id);
  if (error) throw error;
  return currentUser();
}

/* Sign out everywhere on this device: end the session even if the network call fails, clear any saved
   session keys, and tell every menu on the page to switch to the client-facing (signed-out) view. */
export async function signOut() {
  const sb = await client();
  /* Local scope: signing out here never ends the user's sessions on their other devices. */
  try { await sb.auth.signOut({ scope: 'local' }); } catch (e2) {}
  try { Object.keys(localStorage).filter(k => /^sb-.*-auth-token/.test(k)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  navP = null;
  try { window.dispatchEvent(new CustomEvent('kx-auth', { detail: { signedOut: true } })); } catch (e) {}
  try { localStorage.setItem('kx-signed-out', String(Date.now())); } catch (e) {}
}
/* Menus call this to stay in sync with sign-in state (this tab, other tabs, sign-out). */
export function watchAuth(cb) {
  const re = () => currentUser().then(cb).catch(() => cb(null));
  /* A sign-out anywhere on the page (or in another tab) clears this copy's session too, then shows the signed-out view straight away. */
  const out = () => { navP = null; cb(null); client().then(sb => sb.auth.signOut({ scope: 'local' })).catch(() => {}); };
  window.addEventListener('kx-auth', e => { if (e.detail && e.detail.signedOut) out(); else re(); });
  window.addEventListener('storage', e => { if (e.key === 'kx-signed-out') out(); else if (!e.key || /^sb-.*-auth-token/.test(e.key)) re(); });
  window.addEventListener('pageshow', e => { if (e.persisted) re(); });
  /* Returning to a tab after a long idle: refresh the token so the user stays signed in. */
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') client().then(sb => sb.auth.getSession()).then(re).catch(() => {}); });
  onAuthChange(cb).catch(() => {});
}

/* ---------- zip files ---------- */
export function zipPublicUrl(key) {
  return SUPABASE_URL + '/storage/v1/object/public/' + ZIP_BUCKET + '/zips/' + encodeURIComponent(key) + '.zip';
}

export async function uploadZip(key, blob) {
  const sb = await client();
  const { error } = await sb.storage.from(ZIP_BUCKET)
    .upload('zips/' + key + '.zip', blob, { upsert: true, contentType: 'application/zip' });
  if (error) throw new Error(error.message === 'new row violates row-level security policy'
    ? 'Only admins can upload creatives' : error.message);
}

export async function downloadZip(key) {
  const res = await fetch(zipPublicUrl(key));
  if (!res.ok) return null;
  return res.blob();
}

/* ---------- admin control (every call is re-checked server-side) ---------- */
const rpc = async (fn, args) => { const sb = await client(); const { data, error } = await sb.rpc(fn, args || {}); if (error) throw error; return data; };
const missingFn = e => e && (e.code === 'PGRST202' || /could not find the function/i.test(e.message || ''));
export async function adminListUsers() {
  try { return await rpc('admin_list_users'); }
  catch (e) {
    if (!missingFn(e)) throw e;
    // Admin SQL not installed yet: read profiles directly (admins can read all rows).
    const sb = await client();
    const { data, error } = await sb.from('profiles').select('*');
    if (error) throw error;
    return (data || []).map(p => ({ id: p.id, email: p.email || '', full_name: p.full_name, title: p.title, role: p.role, created_at: p.created_at, last_sign_in_at: p.last_sign_in_at || null, confirmed: true, _fallback: true }));
  }
}
export async function adminSetRole(id, role) {
  try { return await rpc('admin_set_role', { p_user: id, p_role: role }); }
  catch (e) { if (!missingFn(e)) throw e; const sb = await client(); const { error } = await sb.from('profiles').update({ role }).eq('id', id); if (error) throw error; }
}
export async function adminUpdateUser(id, fullName, title) {
  try { return await rpc('admin_update_user', { p_user: id, p_full_name: fullName || null, p_title: title || null }); }
  catch (e) { if (!missingFn(e)) throw e; const sb = await client(); const { error } = await sb.from('profiles').update({ full_name: fullName || null, title: title || null }).eq('id', id); if (error) throw error; }
}
export async function adminDeleteUser(id) {
  try { return await rpc('admin_delete_user', { p_user: id }); }
  catch (e) { if (missingFn(e)) throw new Error('Deleting accounts needs the admin SQL installed in Supabase (2026-10-02_admin_control.sql).'); throw e; }
}

export async function adminListInvites() {
  const sb = await client();
  const { data, error } = await sb.from('invites').select('id, token, email, full_name, role, created_at, expires_at').is('accepted_at', null).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function adminCreateInvite({ email, fullName, role }) {
  email = (email || '').trim().toLowerCase();
  if (!isKortxEmail(email)) throw new Error('Use an @kortx.io email');
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  await sb.from('invites').delete().ilike('email', email).is('accepted_at', null);
  const { data, error } = await sb.from('invites').insert({ email, full_name: fullName || null, role: role || 'internal', invited_by: s && s.session ? s.session.user.id : null }).select('id, token, email, full_name, role, created_at, expires_at').single();
  if (error) throw error;
  return data;
}
export async function adminRevokeInvite(id) {
  const sb = await client();
  const { error } = await sb.from('invites').delete().eq('id', id);
  if (error) throw error;
}
export async function lookupInvite(token) {
  const r = await rpc('invite_lookup', { p_token: token });
  return (r && r[0]) || null;
}
export function inviteUrl(token, base) {
  return (base || location.origin) + '/sign-up?invite=' + encodeURIComponent(token);
}
export async function adminPublishedPages() {
  const sb = await client();
  const { data, error } = await sb.from('landing_pages').select('id, slug, brand, agency, page_type, updated_at').eq('status', 'published').order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/* Site routes only exist on the live host (Netlify _redirects). In previews
   and local files, link to the page files instead. */
const ROUTE_FILES = { '/': 'Creative Playground.dc.html', '/products': 'Product Offering.dc.html', '/process': 'Process and Requirements.dc.html', '/pricing': 'Pricing.dc.html', '/offerings': 'Offerings and Process.dc.html', '/page-builder': 'Page Builder v4.dc.html', '/creative-review': 'Creative Review.dc.html', '/creative-feedback': 'Creative Review.dc.html', '/mock-builder': 'Mock Builder v3.dc.html', '/quick-mock': 'Mock Builder v3.dc.html?quick=1', '/profile': 'Profile.dc.html', '/my-builds': 'My Builds.dc.html', '/client-upload': 'Client Upload.dc.html', '/proposal': 'Proposal Master Template.dc.html', '/sign-in': 'Sign In.dc.html', '/sign-up': 'Sign Up.dc.html', '/admin': 'Admin Control.dc.html', '/database': 'Best of Creative Services Database.dc.html', '/creative-database': 'Creative Database View Only.dc.html', '/style-guide': 'Build Reference Style Guide.dc.html', '/example-proposal': 'Proposal Example.dc.html', '/vision': 'The Pitch.dc.html', '/pitch': 'The Pitch.dc.html', '/briefs': 'Brief List.dc.html', '/assets-and-process': 'Required Assets and Process.dc.html', '/links': 'Live Links.dc.html', '/rate-card': 'Rate Card.dc.html', '/creative-sheet': 'Creative Sheet.dc.html' };
/* ---------- live links (admin-edited) ---------- */
export async function listSiteLinks() {
  const sb = await client();
  const { data, error } = await sb.from('site_links').select('*').order('sort_order');
  if (error) throw error;
  return data || [];
}
export async function saveSiteLinks(rows) {
  const sb = await client();
  const { error } = await sb.from('site_links').upsert(rows, { onConflict: 'id' });
  if (error) throw error;
}
export async function deleteSiteLink(id) {
  const sb = await client();
  const { error } = await sb.from('site_links').delete().eq('id', id);
  if (error) throw error;
}
export const SITE_BASE = 'https://kortx-creative-labs.netlify.app';
/* Default live links. in_nav = shown in the page dropdown and the profile menu. */
export const SITE_LINK_DEFAULTS = [
  ['playground', 'Creative Playground', '/', 'Public', 'Live, interactive KORTX creative', true],
  ['products', 'Product Offering', '/products', 'Public', 'Our ad products and dynamic creative', true],
  ['process', 'Process & Requirements', '/process', 'Public', 'How we work, the timeline and required assets', true],
  ['pricing', 'Pricing', '/pricing', 'Public', 'How we price and the 2026 rate card', true],
  ['assets', 'Required Assets & Process', '/assets-and-process', 'Public', 'Specs by channel and the production timeline', true],
  ['rate-card', 'Rate Card', '/rate-card', 'Public', '2026 pricing for creative, media and professional services', true],
  ['offerings', 'Offerings & Process', '/offerings', 'Public', 'Our ad products, pricing and the timeline to launch', true],
  ['database-view', 'Creative Database', '/creative-database', 'Public', 'Read-only library to share outside the team', false],
  ['creative-sheet', 'Creative Sheet', '/creative-sheet', 'Team', 'Edit every creative in a spreadsheet view; saves to the database', false],
  ['example-proposal', 'Example Proposal', '/example-proposal', 'Public', 'A finished proposal to show clients', false],
  ['briefs', 'Brief List', '/briefs', 'Team', 'Client campaign briefs, ready to claim', true],
  ['proposals', 'My Builds', '/my-builds', 'Team', 'Your published proposals and their brief intakes', true],
  ['builder', 'Page Builder', '/page-builder', 'Team', 'Build a brand proposal from the creative library', true],
  ['mock-builder', 'Mock Builder', '/mock-builder', 'Team', 'Draft ad mocks with the AI assistant', false],
  ['creative-feedback', 'Creative Review', '/creative-feedback', 'Team', 'Client review, comments and approvals for campaign creative', true],
  ['database', 'Creative Database Admin', '/database', 'Team', 'Browse, add and manage the shared library', true],
  ['pitch', 'The Pitch', '/pitch', 'Team', 'Vision and pilot plan for the Creative Labs', false],
  ['style-guide', 'Build Reference Style Guide', '/style-guide', 'Team', 'Every reusable block and style rule', false],
  ['interactive-video', 'Interactive Video Blocks', '/interactive-video', 'Team', 'Interactive video units at 1920×1080', false],
  ['sign-in', 'Sign In', '/sign-in', 'Team', 'Email and password sign in for the team', false],
  ['sign-up', 'Sign Up', '/sign-up', 'Team', 'New teammates create an account', false],
  ['profile', 'Profile', '/profile', 'Team', 'Published pages, headshot and contact card', false],
  ['admin', 'Admin Control', '/admin', 'Admin', 'Team access and invites', false],
  ['links', 'Live Links', '/links', 'Admin', 'Edit and copy every live URL', false]
].map((d, i) => ({ id: d[0], name: d[1], url: SITE_BASE + d[2], tag: d[3], description: d[4], in_nav: d[5], in_menu: d[0] !== 'sign-in' && d[0] !== 'sign-up', sort_order: i * 10 }));
/* Audience label shown in Live Links and the circle menu. */
export const audienceOf = tag => tag === 'Public' ? 'Client facing' : tag === 'Admin' ? 'Internal · Admin' : 'Internal';
export const SITE_LINKS_LS = 'kx-live-links-v1';
/* Saved rows override defaults key by key (null = not set yet); hidden rows drop out. */
export function mergeSiteLinks(rows) {
  const byId = {}; (rows || []).forEach(r => { byId[r.id] = r; });
  const clean = r => { const o = {}; Object.keys(r).forEach(k => { if (r[k] !== null && r[k] !== undefined) o[k] = r[k]; }); return o; };
  const out = SITE_LINK_DEFAULTS.map(d => Object.assign({}, d, byId[d.id] ? clean(byId[d.id]) : {}));
  (rows || []).forEach(r => { if (!SITE_LINK_DEFAULTS.some(d => d.id === r.id)) out.push(Object.assign({ in_nav: false }, clean(r))); });
  /* Brief List is kept out of both menus (2026-10-26); reach it by URL. */
  out.forEach(r => { if (r.id === 'briefs') { r.hidden = false; r.in_nav = false; r.in_menu = false; } });
  /* Renamed 2026-10-26: saved "My Proposals" rows show as "My Builds". */
  out.forEach(r => { if (r.name === 'My Proposals') r.name = 'My Builds'; if (r.name === 'Proposal Builder' || r.name === 'Page Builder') r.name = 'Page Builder'; if (r.id === 'database' && r.name === 'Creative Database') r.name = 'Creative Database Admin'; if (r.id === 'database-view' && r.name === 'Creative Database · View Only') r.name = 'Creative Database'; });
  return out.filter(r => !r.hidden).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}
/* Menu pages for the signed-in user: in_nav rows they're allowed to see. */
/* Never in the top-left page dropdown (2026-10-26). */
/* Offerings & Process removed from the dropdown 2026-11-10 (page still live at /offerings). */
export const NAV_EXCLUDE = ['database', 'builder', 'briefs', 'creative-feedback', 'offerings', 'rate-card', 'assets'];
let navP;
export function navPages(user) {
  const load = navP || (navP = listSiteLinks().catch(() => { try { return JSON.parse(localStorage.getItem(SITE_LINKS_LS) || '[]'); } catch (e) { return []; } }));
  const admin = !!(user && user.isAdmin);
  /* Client facing = signed out. Customers only ever see these four pages. */
  const PUBLIC_NAV = CLIENT_PAGES;
  return load.then(rows => mergeSiteLinks(rows).filter(r => !NAV_EXCLUDE.includes(r.id) && (user ? (r.in_nav && (r.tag !== 'Admin' || admin)) : PUBLIC_NAV.includes(r.id))).map(r => {
    const url = (r.url || '').trim(), internal = url.indexOf(SITE_BASE) === 0;
    let path = internal ? (url.slice(SITE_BASE.length) || '/') : null;
    if (r.id === 'database' && !admin && path === '/database') path = '/creative-database';
    if (r.id === 'proposals' && path && /^\/profile/.test(path)) path = '/my-builds';
    return { id: r.id, label: r.name, sub: r.description || '', href: internal ? route(path) : url, external: !internal };
  }));
}
/* Circle (profile) menu: every in_menu page this visitor can open. Signed out = client-facing pages only. */
export const CLIENT_PAGES = ['playground', 'products', 'process', 'pricing', 'brief'];
/* Admins see Creative Database Admin only; the team-facing Creative Database (database-view) is hidden from their circle menu. */
/* The three top-left dropdown pages are in every circle menu, signed in or out, admin or not. */
export const MENU_ALWAYS = ['playground', 'products', 'process', 'pricing'];
export function menuPages(user) {
  const load = navP || (navP = listSiteLinks().catch(() => { try { return JSON.parse(localStorage.getItem(SITE_LINKS_LS) || '[]'); } catch (e) { return []; } }));
  const admin = !!(user && user.isAdmin);
  /* Signed out: the four client pages plus Sign In for the team. Signed in: every in_menu page their access allows. */
  return load.then(rows => { const all = mergeSiteLinks(rows); return user
      ? all.filter(r => (MENU_ALWAYS.includes(r.id) || r.in_menu !== false) && r.id !== 'briefs' && r.id !== 'links' && r.id !== 'sign-in' && r.id !== 'offerings' && r.id !== 'rate-card' && r.id !== 'assets' && (r.tag !== 'Admin' || admin) && !(admin && r.id === 'database-view') && r.id !== 'profile' && r.id !== 'creative-feedback' && r.id !== 'creative-sheet')
      : CLIENT_PAGES.map(id => all.find(r => r.id === id)).filter(Boolean).concat(all.filter(r => r.id === 'sign-in').map(r => Object.assign({}, r, { name: 'Sign In · Internal Team' }))); }).then(list => list.map(r => {
    const url = (r.url || '').trim(), internal = url.indexOf(SITE_BASE) === 0;
    let path = internal ? (url.slice(SITE_BASE.length) || '/') : null;
    if (r.id === 'database' && !admin && path === '/database') path = '/creative-database';
    if (r.id === 'proposals' && path && /^\/profile/.test(path)) path = '/my-builds';
    return { id: r.id, label: r.name, sub: r.description || '', href: internal ? route(path) : url, external: !internal, audience: audienceOf(r.tag), client: CLIENT_PAGES.includes(r.id) || (!user && r.id === 'sign-in') };
  }));
}
export function resetNavPages() { navP = null; }
export const onLiveSite = () => /netlify\.app$|kortx\.io$/i.test(location.hostname);
export function route(href) {
  if (onLiveSite() || !href || href[0] !== '/') return href;
  const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const file = ROUTE_FILES[m[1]];
  if (!file) return href;
  let qs = m[2] || '';
  qs = qs.replace(/([?&]next=)([^&#]*)/, (all, k, v) => k + encodeURIComponent(route(decodeURIComponent(v))));
  return encodeURI(file) + qs + (m[3] || '');
}

/* ---------- campaign briefs (public intake → strategy team) ----------
   Anyone can submit (anon insert); only signed-in @kortx.io accounts can read.
   The id is made in the browser so the insert never needs read access. */
export async function submitBrief(row) {
  const sb = await client();
  const id = (crypto.randomUUID && crypto.randomUUID()) || ('b' + Date.now().toString(36) + Math.random().toString(36).slice(2));
  const { error } = await sb.from('campaign_briefs').insert(Object.assign({ id, status: 'new' }, row));
  if (error) throw error;
  return id;
}
export async function listBriefs() {
  const sb = await client();
  const { data, error } = await sb.from('campaign_briefs').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function getBrief(id) {
  const sb = await client();
  const { data, error } = await sb.from('campaign_briefs').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('Brief not found');
  return data;
}
/* Claims: first teammate wins (the update only matches while the brief is unclaimed). */
export async function claimBrief(id) {
  const sb = await client();
  const { data: ss } = await sb.auth.getSession(); const u = ss && ss.session && ss.session.user;
  if (!u) throw new Error('Sign in first');
  let name = (u.user_metadata && u.user_metadata.full_name) || '';
  try { const { data: p } = await sb.from('profiles').select('full_name').eq('id', u.id).maybeSingle(); if (p && p.full_name) name = p.full_name; } catch (e) {}
  const { data, error } = await sb.from('campaign_briefs').update({ claimed_by: u.id, claimed_by_email: u.email, claimed_by_name: name || null, claimed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', id).is('claimed_by', null).select('*');
  if (error) throw /claimed_by/.test(error.message || '') && /column/.test(error.message || '') ? new Error('Run supabase/migrations/2026-10-21_brief_claims.sql in the Supabase SQL Editor to turn on claims.') : error;
  if (!data || !data.length) { const cur = await getBrief(id); throw new Error('Already claimed by ' + (cur.claimed_by_name || cur.claimed_by_email || 'another teammate') + '.'); }
  return data[0];
}
export async function unclaimBrief(id) {
  const sb = await client();
  const { data, error } = await sb.from('campaign_briefs').update({ claimed_by: null, claimed_by_email: null, claimed_by_name: null, claimed_at: null, updated_at: new Date().toISOString() }).eq('id', id).select('*');
  if (error) throw error;
  return data && data[0];
}
export async function countUnclaimedBriefs() {
  const sb = await client();
  const { count, error } = await sb.from('campaign_briefs').select('id', { count: 'exact', head: true }).is('claimed_by', null);
  if (error) throw error;
  return count || 0;
}
export async function listMyClaimedBriefs() {
  const sb = await client();
  const { data: ss } = await sb.auth.getSession(); const u = ss && ss.session && ss.session.user;
  if (!u) return [];
  const { data, error } = await sb.from('campaign_briefs').select('*').eq('claimed_by', u.id).order('claimed_at', { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function setBriefStatus(id, status) {
  const sb = await client();
  const { error } = await sb.from('campaign_briefs').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) throw error;
}
/* Plain-text brief for the Page Builder's brief field. */
export function briefText(b) {
  const out = ['KORTX CAMPAIGN BRIEF — submitted ' + new Date(b.created_at || Date.now()).toLocaleDateString('en-US')];
  let sec = '';
  for (const r of b.qa || []) {
    if (!r.a) continue;
    if (r.section !== sec) { sec = r.section; out.push('', sec.toUpperCase()); }
    out.push(r.q + ': ' + r.a);
  }
  return out.join('\n');
}


/* kx-recovery-redirect: a password-reset link that lands on any page (e.g. the Supabase Site URL) is sent to
   Sign In so the user sets a new password instead of being silently signed in. */
try {
  if (/type=recovery/.test(location.hash) && !/sign-in|Sign%20In|Sign In/i.test(location.pathname)) {
    location.replace(route('/sign-in?reset=1') + location.hash);
  }
} catch (e) {}
