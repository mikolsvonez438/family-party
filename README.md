Secret Exchange — Paste-ready project
=====================================
Files included:
- register.html
- register-script.js
- reveal.html
- reveal-script.js
- host.html
- host-script.js
- style.css
- api/generate.js (serverless function for Vercel)
- sql/setup.sql (SQL to create tables, RLS, functions)
- sql/reset.sql (SQL to wipe participants & assignments)

IMPORTANT: before deploying or running, replace placeholders:
- SUPABASE_URL
- SUPABASE_ANON_KEY (client pages)
- SUPABASE_SERVICE_ROLE_KEY (serverless env var)
- HOST_SECRET (serverless env var and host-script.js)

Quick steps:
1) Run sql/setup.sql in Supabase SQL Editor.
2) Deploy api/generate.js to Vercel; set env vars:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - HOST_SECRET
3) Edit client JS files to set SUPABASE_URL and SUPABASE_ANON_KEY.
4) Host uses host.html to trigger generation (uses HOST_SECRET).
5) Participants register via register.html, reveal via reveal.html.

See full instructions in the project README inside your Supabase / Vercel console.
