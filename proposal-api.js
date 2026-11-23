/* KORTX Proposal Builder — client API.
   Everything the Builder and Profile pages talk to lives here.

   AI generation never calls Anthropic or OpenAI from the browser: the company
   keys live server-side in the Supabase Edge Function `generate-sections`
   (supabase/functions/generate-sections). This file calls that function with
   the signed-in user's session. If the function is not deployed yet, callers
   get { code: 'not-deployed' } and can fall back to demoSections(). */

import { client, SUPABASE_URL, SUPABASE_ANON_KEY } from './creative-cloud.js';

export const PAGE_TYPES = ['Proposal', 'KORTX Intelligence'];

export const PROVIDERS = [
  { id: 'claude', label: 'Claude', vendor: 'Anthropic',
    models: [
      { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 · Recommended' },
      { id: 'claude-opus-5-5', label: 'Claude Opus 5.5' },
      { id: 'claude-fable-5-1', label: 'Claude Fable 5.1 · Most capable' },
      { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 · Fastest' },
      { id: 'claude-sonnet-5', label: 'Claude Sonnet 5' },
      { id: 'claude-opus-5', label: 'Claude Opus 5' },
      { id: 'claude-fable-5', label: 'Claude Fable 5' },
      { id: 'claude-opus-4-8', label: 'Claude Opus 4.8' },
      { id: 'claude-opus-4-7', label: 'Claude Opus 4.7' },
      { id: 'claude-opus-4-6', label: 'Claude Opus 4.6' },
      { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
      { id: 'claude-opus-4-5', label: 'Claude Opus 4.5' },
      { id: 'claude-sonnet-4-5', label: 'Claude Sonnet 4.5' },
      { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5' }
    ] },
  { id: 'openai', label: 'ChatGPT', vendor: 'OpenAI',
    models: [{ id: 'gpt-5', label: 'GPT-5' }, { id: 'gpt-5-mini', label: 'GPT-5 mini' }, { id: 'gpt-4.1', label: 'GPT-4.1' }] }
];

/* The block library every generated page is assembled from — the narrative
   spine Intelligence → Audience → Context → Creative → Media → Measurement,
   bracketed by a hero and the seller's closing footer. */
export const SECTION_TYPES = [
  { id: 'hero', label: 'Hero' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'audience', label: 'Audience' },
  { id: 'context', label: 'Context' },
  { id: 'creative', label: 'Creative Showcase' },
  { id: 'media', label: 'Media Plan' },
  { id: 'measurement', label: 'Measurement' },
  { id: 'closing', label: 'Closing CTA' }
];

const FN = SUPABASE_URL + '/functions/v1/generate-sections';
const ASSET_BUCKET = 'proposal-assets';
const HEADSHOT_BUCKET = 'headshots';

async function authHeaders() {
  const sb = await client();
  const { data } = await sb.auth.getSession();
  const token = data && data.session && data.session.access_token;
  return { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + (token || SUPABASE_ANON_KEY), _signedIn: !!token };
}

/* ---------- AI ---------- */

/* Which company keys the Edge Function has configured. */
export async function aiStatus() {
  try {
    const h = await authHeaders(); delete h._signedIn;
    const res = await fetch(FN + '?health=1', { headers: h });
    if (res.status === 404) return { deployed: false, claude: false, openai: false };
    if (!res.ok) return { deployed: true, claude: false, openai: false, error: 'HTTP ' + res.status };
    const j = await res.json();
    return { deployed: true, claude: !!j.claude, openai: !!j.openai };
  } catch (e) {
    return { deployed: false, claude: false, openai: false, error: String(e && e.message || e) };
  }
}

/* input: { provider, model, pageType, agency, brand, brandUrl, brief,
            creatives: [{ id, brand, name, product, vertical, goals, bestFor, measure }],
            assets: [{ name, url, kind }] }
   returns: { sections: [{ type, eyebrow, headline, body, bullets[], cta }],
              theme: { primary, accent, tone }, usage: { input, output }, provider, model } */
export async function generateSections(input) {
  const h = await authHeaders();
  if (!h._signedIn) { const e = new Error('Sign in to generate with the company AI.'); e.code = 'signed-out'; throw e; }
  delete h._signedIn;
  let res;
  try { res = await fetch(FN, { method: 'POST', headers: h, body: JSON.stringify(input) }); }
  catch (e) { const err = new Error('Could not reach the generator.'); err.code = 'not-deployed'; throw err; }
  if (res.status === 404) { const e = new Error('The generate-sections function is not deployed yet.'); e.code = 'not-deployed'; throw e; }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(j.error || ('Generator error ' + res.status)); e.code = j.code || 'error'; throw e; }
  return j;
}

/* Rewrites one section in place (same function, `regenerate` mode). */
export async function regenerateSection(input, section) {
  return generateSections(Object.assign({}, input, { regenerate: section }));
}

/* Offline stand-in so the Builder is usable before the function is deployed.
   Clearly marked as demo output in the UI. */
export function demoSections(i) {
  const brand = i.brand || 'Your Brand';
  const agency = i.agency ? ' with ' + i.agency : '';
  const types = [...new Set((i.creatives || []).map(c => c.product))].join(', ') || 'rich media and CTV';
  const goals = [...new Set((i.creatives || []).flatMap(c => c.goals || []))].slice(0, 3);
  const intel = i.pageType === 'KORTX Intelligence';
  return {
    demo: true, provider: i.provider, model: i.model, usage: { input: 0, output: 0 },
    theme: { tone: 'Confident, plain, specific' },
    sections: [
      { type: 'hero', eyebrow: intel ? 'KORTX INTELLIGENCE' : 'PROPOSAL' + (i.agency ? ' · ' + i.agency.toUpperCase() : ''), headline: intel ? `What we know about ${brand}'s audience.` : `A creative plan built for ${brand}.`, body: `Prepared by KORTX${agency}. One idea, adapted to every screen and every moment that matters to ${brand}.`, cta: 'See The Plan' },
      { type: 'intelligence', eyebrow: 'INTELLIGENCE', headline: 'Start with what the data already says.', body: 'We read category trends, search demand and first-party signals before a single frame is designed.', bullets: ['Category Signals', 'Competitive Creative', 'First-Party Data'] },
      { type: 'audience', eyebrow: 'AUDIENCE', headline: `Who ${brand} needs to reach.`, body: 'Three priority audiences, each with its own reason to act.', bullets: ['Primary Buyers', 'Growth Segment', 'Lapsed Customers'] },
      { type: 'context', eyebrow: 'CONTEXT', headline: 'Adapt the message to the moment.', body: 'Temperature, time of day, dates, ZIP code and language decide which version of the ad each person sees.' },
      { type: 'creative', eyebrow: 'CREATIVE', headline: 'Creative people can play with.', body: `Selected work across ${types}, chosen for ${goals.length ? goals.join(', ').toLowerCase() : 'the campaign goal'}.` },
      { type: 'media', eyebrow: 'MEDIA', headline: 'The right screen for every step.', body: 'CTV builds reach, rich media earns engagement, and display closes the loop.', bullets: ['Connected TV', 'Rich Media', 'Display'] },
      { type: 'measurement', eyebrow: 'MEASUREMENT', headline: 'Know what worked, while it runs.', body: 'Live dashboards track pacing, engagement and outcomes as the campaign runs, not weeks after it ends.' },
      { type: 'closing', eyebrow: 'NEXT STEP', headline: `Let's build ${brand}'s concept.`, body: 'Share your objective and we will shape a creative direction around it.', cta: 'Book A Call' }
    ]
  };
}

/* ---------- conversational proposal writer ----------
   Streams one assistant turn. body: { provider, model, system: [blocks], messages: [{ role, content }] }.
   onDelta(textChunk) fires as Claude writes; resolves with { text, usage }. */
export async function chatStream(body, onDelta, signal) {
  const h = await authHeaders();
  if (!h._signedIn) { const e = new Error('Sign in with your @kortx.io account to chat with Claude.'); e.code = 'signed-out'; throw e; }
  delete h._signedIn;
  let res;
  try { res = await fetch(FN, { method: 'POST', headers: h, body: JSON.stringify(Object.assign({ mode: 'chat' }, body)), signal }); }
  catch (e) { if (e.name === 'AbortError') throw e; const err = new Error('Could not reach the generator.'); err.code = 'not-deployed'; throw err; }
  if (res.status === 404) { const e = new Error('The generate-sections function is not deployed yet.'); e.code = 'not-deployed'; throw e; }
  if (!res.ok || !res.body) { const j = await res.json().catch(() => ({})); const e = new Error(j.error || ('Generator error ' + res.status)); e.code = j.code || 'error'; throw e; }
  const reader = res.body.getReader(), dec = new TextDecoder();
  let buf = '', text = '', usage = { input: 0, output: 0 };
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let k;
    while ((k = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, k).trim(); buf = buf.slice(k + 1);
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (!data || data === '[DONE]') continue;
      let ev; try { ev = JSON.parse(data); } catch (e) { continue; }
      if (ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta') { text += ev.delta.text; onDelta && onDelta(ev.delta.text); }
      else if (ev.type === 'message_start' && ev.message && ev.message.usage) usage.input = ev.message.usage.input_tokens || 0;
      else if (ev.type === 'message_delta' && ev.usage) usage.output = ev.usage.output_tokens || 0;
      else if (ev.type === 'error') { const e = new Error((ev.error && ev.error.message) || 'Claude error'); e.code = 'error'; throw e; }
      else if (ev.choices && ev.choices[0] && ev.choices[0].delta && ev.choices[0].delta.content) { const c = ev.choices[0].delta.content; text += c; onDelta && onDelta(c); }
    }
  }
  return { text, usage };
}

/* Saved conversations (table proposal_chats, owner-only). */
export async function saveChat(chat) {
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  const u = s && s.session && s.session.user;
  if (!u) throw new Error('Sign in first');
  const row = { owner: u.id, title: chat.title || 'Untitled proposal', brand: chat.brand || null, messages: chat.messages || [], config: chat.config || null, off: chat.off || {}, form: chat.form || {}, creatives: chat.creatives || [], updated_at: new Date().toISOString() };
  if (chat.id) row.id = chat.id;
  const { data, error } = await sb.from('proposal_chats').upsert(row).select('id').single();
  if (error) throw error;
  return data.id;
}
export async function listChats() {
  const sb = await client();
  const { data, error } = await sb.from('proposal_chats').select('id,title,brand,updated_at').order('updated_at', { ascending: false }).limit(30);
  if (error) throw error;
  return data || [];
}
export async function deleteChat(id) {
  const sb = await client();
  const { data, error } = await sb.from('proposal_chats').delete().eq('id', id).select('id');
  if (error) throw error;
  return (data || []).length;
}
export async function loadChat(id) {
  const sb = await client();
  const { data, error } = await sb.from('proposal_chats').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

/* ---------- landing pages ---------- */

export function slugify(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'page';
}

export async function savePage(page) {
  const sb = await client();
  const { data: sess } = await sb.auth.getSession();
  const uid = sess && sess.session && sess.session.user.id;
  if (!uid) throw new Error('Sign in to save');
  const row = {
    id: page.id || undefined, owner: uid,
    /* Every page gets its own permanent URL: /p/<title-or-brand>-<short id>. Republishing keeps it. */
    slug: page.slug || (slugify(page.title || page.brand) + '-' + Date.now().toString(36)),
    status: page.status || 'draft', page_type: page.pageType, agency: page.agency || null,
    brand: page.brand, brand_url: page.brandUrl || null, brief: page.brief || null,
    provider: page.provider || null, model: page.model || null,
    creative_ids: page.creativeIds || [], assets: page.assets || [],
    sections: page.sections || [], theme: page.theme || {}
  };
  const { data, error } = await sb.from('landing_pages').upsert(row).select().single();
  if (error) throw error;
  return data;
}

export async function listMyPages() {
  const sb = await client();
  const { data, error } = await sb.from('landing_pages')
    .select('id, owner, slug, status, page_type, agency, brand, creative_ids, created_at, updated_at, campaign:sections->0->builder->form->>campaign')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPage(id) {
  const sb = await client();
  const { data, error } = await sb.from('landing_pages').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

/* Public share links (/p/<slug>): published pages are readable by anyone; drafts only by their owner/admins. */
export async function getPageBySlug(slug) {
  const sb = await client();
  const { data, error } = await sb.from('landing_pages').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function deletePage(id) {
  const sb = await client();
  const { error } = await sb.from('landing_pages').delete().eq('id', id);
  if (error) throw error;
}

export function pageUrl(slug) {
  return location.origin + '/p/' + slug;
}

/* ---------- uploads ---------- */

async function upload(bucket, path, file) {
  const sb = await client();
  const { error } = await sb.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  return SUPABASE_URL + '/storage/v1/object/public/' + bucket + '/' + path.split('/').map(encodeURIComponent).join('/');
}

export async function uploadAsset(file) {
  const sb = await client();
  const { data } = await sb.auth.getSession();
  const uid = data && data.session && data.session.user.id;
  if (!uid) throw new Error('Sign in to upload');
  const safe = file.name.replace(/[^\w.\-]+/g, '_');
  return upload(ASSET_BUCKET, uid + '/' + Date.now() + '-' + safe, file);
}

/* ---------- profile & account ---------- */

export async function getProfile() {
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  const u = s && s.session && s.session.user;
  if (!u) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', u.id).maybeSingle();
  /* Fields saved to the account itself (used until the profiles columns exist). */
  const meta = (u.user_metadata && u.user_metadata.kx_profile) || {};
  const row = Object.fromEntries(Object.entries(data || {}).filter(([, v]) => v != null && v !== ''));
  return Object.assign({ id: u.id, email: u.email }, meta, row);
}

export async function saveProfile(p) {
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  const u = s && s.session && s.session.user;
  if (!u) throw new Error('Sign in first');
  const row = { id: u.id, full_name: p.full_name || null, title: p.title || null, phone: p.phone || null,
    cta_label: p.cta_label || null, cta_url: p.cta_url || null, headshot_url: p.headshot_url || null,
    headshot_kind: p.headshot_kind || null, headshot_frame: p.headshot_frame || null, updated_at: new Date().toISOString() };
  const { id: _id, ...patch } = row;
  const { error } = await sb.from('profiles').update(patch).eq('id', u.id);
  if (!error) return { stored: 'profiles' };
  /* Before the SQL migration adds the footer columns, keep the footer on the
     user's own account record so Save still works. */
  if (/schema cache|column|PGRST204|does not exist/i.test(error.message || '')) {
    const { id, updated_at, ...fields } = row;
    const up = await sb.auth.updateUser({ data: { kx_profile: fields } });
    if (up.error) throw up.error;
    await sb.from('profiles').update({ full_name: row.full_name }).eq('id', u.id);
    return { stored: 'account' };
  }
  throw error;
}

export async function uploadHeadshot(file) {
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  const u = s && s.session && s.session.user;
  if (!u) throw new Error('Sign in first');
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const url = await upload(HEADSHOT_BUCKET, u.id + '/headshot-' + Date.now() + '.' + ext, file);
  return { url, kind: file.type.startsWith('video') ? 'video' : 'image' };
}

export async function changePassword(current, next, email) {
  const sb = await client();
  const check = await sb.auth.signInWithPassword({ email, password: current });
  if (check.error) throw new Error('Your current password is incorrect');
  const { error } = await sb.auth.updateUser({ password: next });
  if (error) throw error;
}

export async function changeEmail(next) {
  if (!/@kortx\.io$/i.test(next.trim())) throw new Error('Use your @kortx.io email');
  const sb = await client();
  const { error } = await sb.auth.updateUser({ email: next.trim() });
  if (error) throw error;
}

/* ---------- personal AI connections ---------- */
const CONN = SUPABASE_URL + '/functions/v1/ai-connections';
async function connFetch(method, body) {
  const h = await authHeaders();
  if (!h._signedIn) throw new Error('Sign in first');
  delete h._signedIn;
  let res;
  try { res = await fetch(CONN, { method, headers: h, body: body ? JSON.stringify(body) : undefined }); }
  catch (e) { const err = new Error('The AI connections service is not deployed yet.'); err.code = 'not-deployed'; throw err; }
  if (res.status === 404) { const err = new Error('The AI connections service is not deployed yet.'); err.code = 'not-deployed'; throw err; }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.error || ('Error ' + res.status));
  return j;
}
export const KEY_LINKS = { openai: 'https://platform.openai.com/api-keys', claude: 'https://console.anthropic.com/settings/keys' };
export async function listConnections() { return (await connFetch('GET')).connections || []; }
export async function connectProvider(provider, apiKey) { return connFetch('POST', { provider, apiKey }); }
export async function disconnectProvider(provider) { return connFetch('DELETE', { provider }); }

/* ---------- copy-prompt mode (no API: uses a corporate ChatGPT / Claude seat) ---------- */
export const WRITER_INSTRUCTIONS = `You write landing-page sections for KORTX, a Detroit modern media firm.
Voice: plain, declarative, confident. Headlines in sentence case, card titles in Title Case, eyebrows in ALL CAPS.
No hype without a mechanism, no exclamation marks except the closing CTA.
Structure: headline, one 1-2 sentence lede, then exactly three parallel bullets where bullets are used. CTAs are two or three words, Title Case.
Narrative spine, in order: hero, intelligence, audience, context, creative, media, measurement, closing.
Signals in scope for context: temperature, time of day, dates, ZIP codes, languages.
Measurement copy says what a configured campaign can track; never claim results you were not given.
Adapt tone and vocabulary to the brand, but never change the KORTX structure.
Reply with ONLY one JSON code block matching:
{"theme":{"primary":"#hex or null","accent":"#hex or null","tone":"short phrase"},
 "sections":[{"type":"hero|intelligence|audience|context|creative|media|measurement|closing","eyebrow":"","headline":"","body":"","bullets":[""],"cta":""}]}`;

export function buildPrompt(i) {
  const creatives = (i.creatives || []).map(c => '- ' + c.brand + ' — ' + (c.name || '') + ' (' + c.product + '; ' + (c.vertical || '') + '; goals: ' + (c.goals || []).join(', ') + (c.bestFor ? '; best for: ' + c.bestFor : '') + (c.measure ? '; measure: ' + c.measure : '') + ')').join('\n');
  const assets = (i.assets || []).map(x => '- ' + x.name + ' (' + x.kind + ')').join('\n');
  return WRITER_INSTRUCTIONS + '\n\n---\n' +
    'Page type: ' + i.pageType + '\nAgency: ' + (i.agency || 'none') + '\nBrand: ' + i.brand + '\nBrand URL: ' + (i.brandUrl || 'none') +
    '\nSelected creatives:\n' + (creatives || '- none') + '\nUploaded assets:\n' + (assets || '- none') +
    '\nBrief from the seller:\n"""' + String(i.brief || '').slice(0, 24000) + '"""\n\nWrite all eight sections in spine order.';
}

const TYPES = ['hero', 'intelligence', 'audience', 'context', 'creative', 'media', 'measurement', 'closing'];
export function parseReply(text) {
  const t = String(text || '');
  const fenced = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : (t.match(/\{[\s\S]*\}/) || [''])[0];
  if (!raw) throw new Error('No JSON found — paste the whole reply, including the code block.');
  let out;
  try { out = JSON.parse(raw); } catch (e) { throw new Error('The reply is not valid JSON. Ask the AI to "reply with only the JSON block" and paste again.'); }
  out.sections = (out.sections || []).filter(s => TYPES.includes(s.type));
  if (!out.sections.length) throw new Error('No sections found in the reply.');
  return Object.assign({ manual: true, usage: null }, out);
}
