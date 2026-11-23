# One-time setup: GitHub → Netlify + Supabase auto-update

After this, every update is ONE step: put the new files in the GitHub repo. Netlify redeploys the site and Supabase runs new SQL and redeploys functions on their own.

## 1. Make the GitHub repo (5 min)
1. github.com → New repository → name it `kortx-creative-labs` → Private → Create.
2. Click "uploading an existing file", drag in EVERYTHING inside this deploy folder (including the hidden `.github` folder — on Mac press Cmd+Shift+. to see it), Commit.
   Easier: install GitHub Desktop, clone the repo, copy the deploy folder's contents into it, Commit + Push.

## 2. Connect Netlify (3 min)
1. Netlify → your existing site → Site configuration → Build & deploy → Link repository → GitHub → pick the repo.
2. Branch: main. Build command: empty. Publish directory: `.` → Save.
3. Push anything (or click Trigger deploy). From now on each push goes live in about 30 seconds.

## 3. Connect Supabase (5 min)
In GitHub: repo → Settings → Secrets and variables → Actions → New repository secret. Add three:
- `SUPABASE_ACCESS_TOKEN` — supabase.com → avatar (top right) → Account preferences → Access Tokens → Generate new token.
- `SUPABASE_PROJECT_REF` — Supabase project → Project Settings → General → Reference ID.
- `SUPABASE_DB_URL` — Supabase project → Connect (top bar) → Connection string → URI, "Session pooler". Replace [YOUR-PASSWORD] with your database password.
Then repo → Actions tab → "Supabase auto-update" → Run workflow once to test. Green check = done.

Secrets like ANTHROPIC_API_KEY stay in Supabase (Edge Functions → Secrets); the workflow never touches them.

## Every update after that
1. Download the new deploy folder from the Creative Lab project.
2. In GitHub Desktop: copy its contents over the repo folder → Commit → Push.
That is the only step. Netlify updates the site; the Action runs new SQL in `supabase/sql/` and redeploys functions.
