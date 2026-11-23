// KORTX — Supabase Edge Function: ai-connections
// Lets each team member connect their own ChatGPT (OpenAI) or Claude (Anthropic)
// account by API key. Keys are verified against the provider, encrypted with
// AES-GCM (secret AI_KEY_SECRET), and stored in user_ai_keys. The browser only
// ever sees a masked hint.
//
// Deploy:  supabase functions deploy ai-connections
// Secret:  supabase secrets set AI_KEY_SECRET=$(openssl rand -base64 32)

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const URL_ = Deno.env.get("SUPABASE_URL")!;
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

async function caller(req: Request) {
  const r = await fetch(URL_ + "/auth/v1/user", { headers: { Authorization: req.headers.get("authorization") || "", apikey: ANON } });
  if (!r.ok) return null;
  const u = await r.json();
  return u?.id && /@kortx\.io$/i.test(u.email || "") ? u : null;
}

async function aesKey() {
  const raw = Uint8Array.from(atob(Deno.env.get("AI_KEY_SECRET") || ""), c => c.charCodeAt(0));
  if (raw.length < 32) throw new Error("AI_KEY_SECRET is not set");
  return crypto.subtle.importKey("raw", raw.slice(0, 32), "AES-GCM", false, ["encrypt", "decrypt"]);
}
const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u));
async function encrypt(text: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aesKey(), new TextEncoder().encode(text)));
  return b64(iv) + "." + b64(ct);
}

async function verify(provider: string, key: string) {
  const r = provider === "claude"
    ? await fetch("https://api.anthropic.com/v1/models", { headers: { "x-api-key": key, "anthropic-version": "2023-06-01" } })
    : await fetch("https://api.openai.com/v1/models", { headers: { Authorization: "Bearer " + key } });
  if (r.status === 401 || r.status === 403) throw new Error("That key was rejected by " + (provider === "claude" ? "Anthropic" : "OpenAI"));
  if (!r.ok) throw new Error("Could not verify the key (" + r.status + ")");
  const j = await r.json().catch(() => ({}));
  return ((j.data || []) as any[]).map(m => m.id).filter(Boolean).slice(0, 40);
}

const rest = (path: string, init: RequestInit = {}) =>
  fetch(URL_ + "/rest/v1/" + path, { ...init, headers: { apikey: SERVICE, Authorization: "Bearer " + SERVICE, "Content-Type": "application/json", Prefer: "return=representation,resolution=merge-duplicates", ...(init.headers || {}) } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const user = await caller(req);
  if (!user) return json({ error: "Sign in with your @kortx.io account" }, 401);
  try {
    if (req.method === "GET") {
      const r = await rest(`user_ai_keys?user_id=eq.${user.id}&select=provider,key_hint,models,verified_at`);
      return json({ connections: await r.json() });
    }
    const body = await req.json().catch(() => ({}));
    const provider = body.provider === "claude" ? "claude" : body.provider === "openai" ? "openai" : null;
    if (!provider) return json({ error: "Unknown provider" }, 400);
    if (req.method === "DELETE") {
      await rest(`user_ai_keys?user_id=eq.${user.id}&provider=eq.${provider}`, { method: "DELETE" });
      return json({ ok: true });
    }
    const key = String(body.apiKey || "").trim();
    if (key.length < 20) return json({ error: "Paste the full API key" }, 400);
    const models = await verify(provider, key);
    const row = { user_id: user.id, provider, key_cipher: await encrypt(key), key_hint: key.slice(0, 6) + "…" + key.slice(-4), models, verified_at: new Date().toISOString() };
    const r = await rest("user_ai_keys?on_conflict=user_id,provider", { method: "POST", body: JSON.stringify(row) });
    if (!r.ok) throw new Error("Could not save the connection");
    return json({ provider, key_hint: row.key_hint, models, verified_at: row.verified_at });
  } catch (e) {
    return json({ error: String((e as Error).message || e) }, 400);
  }
});
