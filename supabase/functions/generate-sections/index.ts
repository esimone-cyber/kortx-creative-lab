// KORTX Proposal Builder — Supabase Edge Function: generate-sections
// Deploy:  supabase functions deploy generate-sections
// Secrets: supabase secrets set ANTHROPIC_API_KEY=... OPENAI_API_KEY=...
//
// The browser never sees either key. The function checks the caller is a
// signed-in @kortx.io user, builds one brand-safe prompt, calls Claude or
// ChatGPT, and returns sections in a fixed JSON shape the Builder renders.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const SECTION_TYPES = ["hero", "intelligence", "audience", "context", "creative", "media", "measurement", "closing"];

const SYSTEM = `You write landing-page sections for KORTX, a Detroit modern media firm.
Voice: plain, declarative, confident. Headlines in sentence case, card titles in Title Case,
eyebrows in ALL CAPS. No hype without a mechanism, no exclamation marks except the closing CTA.
Structure: headline, one 1-2 sentence lede, then exactly three parallel bullets where bullets are used.
CTAs are two or three words, Title Case.
Narrative spine, in order: hero, intelligence, audience, context, creative, media, measurement, closing.
Signals in scope for context: temperature, time of day, dates, ZIP codes, languages.
Measurement copy says what a configured campaign can track; never claim results you were not given.
Adapt tone and vocabulary to the brand, but never change the KORTX structure.
Return ONLY JSON matching:
{"theme":{"primary":"#hex or null","accent":"#hex or null","tone":"short phrase"},
 "sections":[{"type":one of ${JSON.stringify(SECTION_TYPES)},"eyebrow":"","headline":"","body":"","bullets":[""],"cta":""}]}`;

function userPrompt(i: any) {
  const creatives = (i.creatives || []).map((c: any) =>
    `- ${c.brand} — ${c.name || ""} (${c.product}; ${c.vertical || ""}; goals: ${(c.goals || []).join(", ")}; best for: ${c.bestFor || ""}; measure: ${c.measure || ""})`).join("\n");
  const assets = (i.assets || []).map((a: any) => `- ${a.name} (${a.kind})`).join("\n");
  const base = `Page type: ${i.pageType}
Agency: ${i.agency || "none"}
Brand: ${i.brand}
Brand URL: ${i.brandUrl || "none"}
Selected creatives:
${creatives || "- none"}
Uploaded assets:
${assets || "- none"}
Brief from the seller:
"""${String(i.brief || "").slice(0, 24000)}"""`;
  if (i.regenerate) {
    return `${base}\n\nRewrite ONLY this one section, same type, fresher angle. Return {"sections":[...one section...]}.\n${JSON.stringify(i.regenerate)}`;
  }
  return `${base}\n\nWrite all eight sections in spine order.`;
}

function parse(text: string) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("Model did not return JSON");
  const out = JSON.parse(m[0]);
  out.sections = (out.sections || []).filter((s: any) => SECTION_TYPES.includes(s.type));
  return out;
}

/* The caller's own connected key (Profile → AI Connections) wins over the company key. */
async function userKey(uid: string, provider: string) {
  const secret = Deno.env.get("AI_KEY_SECRET"); if (!secret || !uid) return null;
  const svc = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const r = await fetch(Deno.env.get("SUPABASE_URL") + `/rest/v1/user_ai_keys?user_id=eq.${uid}&provider=eq.${provider}&select=key_cipher`, { headers: { apikey: svc, Authorization: "Bearer " + svc } });
  const rows = r.ok ? await r.json() : [];
  if (!rows[0]) return null;
  const [iv, ct] = rows[0].key_cipher.split(".").map((s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0)));
  const raw = Uint8Array.from(atob(secret), c => c.charCodeAt(0)).slice(0, 32);
  const k = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["decrypt"]);
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv }, k, ct));
}
let OWN_KEY: string | null = null;

async function claude(model: string, prompt: string, system = SYSTEM, maxTokens = 4000) {
  const key = OWN_KEY || Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) throw Object.assign(new Error("Claude is not configured"), { code: "no-key" });
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages: [{ role: "user", content: prompt }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.error?.message || "Claude error " + r.status);
  return { text: (j.content || []).map((c: any) => c.text || "").join(""), usage: { input: j.usage?.input_tokens || 0, output: j.usage?.output_tokens || 0 } };
}

async function openai(model: string, prompt: string, system = SYSTEM) {
  const key = OWN_KEY || Deno.env.get("OPENAI_API_KEY");
  if (!key) throw Object.assign(new Error("ChatGPT is not configured"), { code: "no-key" });
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "content-type": "application/json" },
    body: JSON.stringify({ model, response_format: { type: "json_object" },
      messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.error?.message || "OpenAI error " + r.status);
  return { text: j.choices?.[0]?.message?.content || "", usage: { input: j.usage?.prompt_tokens || 0, output: j.usage?.completion_tokens || 0 } };
}

async function callerEmail(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const r = await fetch(Deno.env.get("SUPABASE_URL") + "/auth/v1/user", {
    headers: { Authorization: auth, apikey: Deno.env.get("SUPABASE_ANON_KEY") || "" },
  });
  if (!r.ok) return null;
  const u = await r.json();
  return u?.email ? u : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const url = new URL(req.url);
  if (req.method === "GET" && url.searchParams.get("health")) {
    return json({ claude: !!Deno.env.get("ANTHROPIC_API_KEY"), openai: !!Deno.env.get("OPENAI_API_KEY") });
  }
  const who = await callerEmail(req);
  const email = who && who.email;
  if (!email || !/@kortx\.io$/i.test(email)) return json({ error: "Sign in with your @kortx.io account", code: "signed-out" }, 401);
  try {
    const i = await req.json();
    OWN_KEY = await userKey(who.id, i.provider === "openai" ? "openai" : "claude").catch(() => null);
    // Chat mode: the Builder's conversation with the KORTX proposal skill as the system prompt.
    // Streams the provider's SSE straight back to the browser.
    if (i.mode === "chat" && Array.isArray(i.messages)) {
      if (JSON.stringify(i).length > 600000) return json({ error: "Conversation too large. Start a new chat.", code: "too-large" }, 413);
      if (i.provider === "openai") {
        const key = OWN_KEY || Deno.env.get("OPENAI_API_KEY");
        if (!key) throw Object.assign(new Error("ChatGPT is not configured"), { code: "no-key" });
        const sys = (i.system || []).map((b: any) => b.text || "").join("\n\n");
        const msgs = i.messages.map((m: any) => ({ role: m.role, content: typeof m.content === "string" ? m.content : m.content.map((b: any) =>
          b.type === "text" ? { type: "text", text: b.text } : b.type === "image" ? { type: "image_url", image_url: { url: b.source.url } } : { type: "text", text: "[Attached PDF: " + (b.title || "document") + " " + (b.source && b.source.url || "") + "]" }) }));
        const r = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: "Bearer " + key, "content-type": "application/json" },
          body: JSON.stringify({ model: i.model || "gpt-5", stream: true, messages: [{ role: "system", content: sys }, ...msgs] }) });
        if (!r.ok || !r.body) { const j = await r.json().catch(() => ({})); throw new Error(j?.error?.message || "OpenAI error " + r.status); }
        return new Response(r.body, { headers: { ...CORS, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
      }
      const key = OWN_KEY || Deno.env.get("ANTHROPIC_API_KEY");
      if (!key) throw Object.assign(new Error("Claude is not configured"), { code: "no-key" });
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST",
        headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify(Object.assign({ model: i.model || "claude-sonnet-5-5", max_tokens: 32000, stream: true, system: i.system, messages: i.messages },
          ["low", "medium", "high", "max"].includes(i.effort) ? { output_config: { effort: i.effort } } : {})) });
      if (!r.ok || !r.body) { const j = await r.json().catch(() => ({})); throw new Error(j?.error?.message || "Claude error " + r.status); }
      return new Response(r.body, { headers: { ...CORS, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
    }
    // Proposal mode: the Builder sends the full master-v1 prompt (proposal-schema.js) and gets the raw config back.
    if (i.mode === "proposal" && typeof i.prompt === "string") {
      const sys = "You are a KORTX media strategist. Follow every rule in the user message. Reply with ONLY the JSON object.";
      const r = i.provider === "openai" ? await openai(i.model || "gpt-5", i.prompt.slice(0, 120000), sys) : await claude(i.model || "claude-sonnet-5-5", i.prompt.slice(0, 120000), sys, 16000);
      const m = r.text.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Model did not return JSON");
      return json({ proposal: JSON.parse(m[0]), usage: r.usage, provider: i.provider, model: i.model, keySource: OWN_KEY ? "personal" : "company" });
    }
    const prompt = userPrompt(i);
    const res = i.provider === "openai" ? await openai(i.model || "gpt-5", prompt) : await claude(i.model || "claude-sonnet-5-5", prompt);
    const out = parse(res.text);
    return json({ ...out, usage: res.usage, provider: i.provider, model: i.model, keySource: OWN_KEY ? "personal" : "company" });
  } catch (e) {
    return json({ error: String((e as Error).message || e), code: (e as any).code || "error" }, 500);
  }
});
