/* KORTX Mock Builder — saved clients, chats, uploads and generated assets.
   Tables: mock_clients, mock_sessions, mock_files. Bucket: mock-files (private).
   See supabase/migrations/2026-10-28_mock_builder.sql. */
import { client } from './creative-cloud.js';

const BUCKET = 'mock-files';
const ok = ({ data, error }) => { if (error) throw error; return data; };
const safe = n => String(n || 'file').replace(/[^\w.\-]+/g, '-').slice(-120);

export async function listClients() {
  const sb = await client();
  return ok(await sb.from('mock_clients').select('id, name, website, updated_at').order('updated_at', { ascending: false }));
}

/* Find a client by name (case-insensitive) or create it. */
export async function ensureClient(name, website) {
  const sb = await client(), n = String(name || '').trim() || 'Untitled client';
  const found = ok(await sb.from('mock_clients').select('id, name, website').ilike('name', n.replace(/[%_]/g, '\\$&')).limit(1));
  if (found[0]) { if (website && website !== found[0].website) await updateClient(found[0].id, { website }); return found[0]; }
  return ok(await sb.from('mock_clients').insert({ name: n, website: website || null }).select('id, name, website').single());
}

export async function updateClient(id, patch) {
  const sb = await client();
  ok(await sb.from('mock_clients').update(Object.assign({}, patch, { updated_at: new Date().toISOString() })).eq('id', id));
}

export async function listSessions(clientId) {
  const sb = await client();
  return ok(await sb.from('mock_sessions').select('id, title, updated_at, messages').eq('client_id', clientId).order('updated_at', { ascending: false }))
    .map(r => ({ id: r.id, title: r.title, updated_at: r.updated_at, count: (r.messages || []).length }));
}

export async function getSession(id) {
  const sb = await client();
  return ok(await sb.from('mock_sessions').select('*').eq('id', id).single());
}

export async function createSession(clientId, settings) {
  const sb = await client();
  return ok(await sb.from('mock_sessions').insert({ client_id: clientId, settings: settings || {} }).select('id, title').single());
}

export async function saveSession(id, { messages, settings, title }) {
  const sb = await client(), now = new Date().toISOString(), patch = { updated_at: now };
  if (messages) patch.messages = messages;
  if (settings) patch.settings = settings;
  if (title) patch.title = title;
  const row = ok(await sb.from('mock_sessions').update(patch).eq('id', id).select('client_id').single());
  if (row && row.client_id) await sb.from('mock_clients').update({ updated_at: now }).eq('id', row.client_id);
}

export async function deleteSession(id) {
  const sb = await client();
  return (ok(await sb.from('mock_sessions').delete().eq('id', id).select('id')) || []).length;
}

/* Files: kind 'upload' (from the user) or 'generated' (mocks / exports). data = File | Blob | string. */
export async function saveFile(clientId, sessionId, kind, name, data, meta) {
  const sb = await client();
  const blob = typeof data === 'string' ? new Blob([data], { type: (meta && meta.mime) || 'text/html' }) : data;
  const path = clientId + '/' + (sessionId || 'shared') + '/' + crypto.randomUUID() + '-' + safe(name);
  ok(await sb.storage.from(BUCKET).upload(path, blob, { contentType: blob.type || 'application/octet-stream', upsert: false }));
  return ok(await sb.from('mock_files').insert({ client_id: clientId, session_id: sessionId || null, kind, name, mime: blob.type || null, size: blob.size, path, meta: meta || {} }).select('*').single());
}
export const saveUpload = (clientId, sessionId, file) => saveFile(clientId, sessionId, 'upload', file.name, file);
export const saveGenerated = (clientId, sessionId, name, data, meta) => saveFile(clientId, sessionId, 'generated', name, data, meta);

export async function listFiles(clientId, sessionId) {
  const sb = await client();
  let q = sb.from('mock_files').select('*').eq('client_id', clientId).order('created_at');
  if (sessionId) q = q.or('session_id.eq.' + sessionId + ',session_id.is.null');
  return ok(await q);
}

export async function fileUrl(path, seconds) {
  const sb = await client();
  return ok(await sb.storage.from(BUCKET).createSignedUrl(path, seconds || 3600)).signedUrl;
}

export async function deleteFile(row) {
  const sb = await client();
  await sb.storage.from(BUCKET).remove([row.path]);
  ok(await sb.from('mock_files').delete().eq('id', row.id));
}

export async function moveSession(id, clientId) {
  const sb = await client();
  ok(await sb.from('mock_sessions').update({ client_id: clientId, updated_at: new Date().toISOString() }).eq('id', id));
}

/* My Builds: the signed-in user's mock conversations, newest first. */
export async function listMySessions() {
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  const uid = s && s.session && s.session.user && s.session.user.id;
  if (!uid) return [];
  const rows = ok(await sb.from('mock_sessions').select('id, owner, title, created_at, updated_at, settings, messages, client_id, mock_clients(name)').eq('owner', uid).order('updated_at', { ascending: false }).limit(100));
  /* Approved = the mock was approved at least once (approval saves its export files). */
  let done = new Set();
  if (rows.length) { const ex = await sb.from('mock_files').select('session_id').eq('kind', 'export').in('session_id', rows.map(r => r.id)); if (!ex.error) done = new Set((ex.data || []).map(x => x.session_id)); }
  return rows.map(r => ({ id: r.id, owner: r.owner, client_id: r.client_id, title: r.title, created_at: r.created_at, updated_at: r.updated_at, settings: r.settings || {}, brand: (r.mock_clients && r.mock_clients.name) || '', approved: done.has(r.id),
    mocks: ((r.settings && r.settings.versions) || []).filter(v => v && (v.still || v.anim)).length, msgs: (r.messages || []).length }))
    /* Hide empty sessions (setup or uploads only, never generated): Continue would open a blank builder. */
    .filter(r => r.mocks || r.msgs);
}

/* My Builds → Files: every upload and generated file saved under a brand name. */
export async function listBrandFiles(name) {
  const sb = await client(), n = String(name || '').trim();
  if (!n) return [];
  const cs = ok(await sb.from('mock_clients').select('id').ilike('name', n.replace(/[%_]/g, '\\$&')));
  if (!cs.length) return [];
  return ok(await sb.from('mock_files').select('id, name, mime, size, path, kind, session_id, created_at').in('client_id', cs.map(c => c.id)).order('created_at', { ascending: false }));
}

/* Generation diagnostics (stage, ids, settings, status, usage, timing, prompt/backend version, manifest, validation). No secrets. */
export async function logRun(row) {
  const sb = await client();
  const { data: s } = await sb.auth.getSession();
  if (!s || !s.session) return;
  const r = Object.assign({}, row); const keep = ['session_id', 'stage', 'vid', 'model', 'effort', 'prompt_version', 'backend_version', 'request_id', 'status', 'usage', 'incomplete', 'ms', 'ok', 'error', 'images', 'omitted', 'manifest', 'validation', 'brief_version', 'extra'];
  const extra = {}; Object.keys(r).forEach(k => { if (!keep.includes(k)) { extra[k] = r[k]; delete r[k]; } });
  if (r.briefVersion !== undefined) delete r.briefVersion;
  r.brief_version = row.briefVersion == null ? null : row.briefVersion; r.extra = extra;
  ok(await sb.from('mock_runs').insert(r));
}

/* My Builds › Files: what an approved mock saved (HTML ZIP, PNG, GIF, MP4). */
export async function listSessionFiles(sessionId) {
  const sb = await client();
  return ok(await sb.from('mock_files').select('*').eq('session_id', sessionId).eq('kind', 'export').order('created_at', { ascending: false }));
}
