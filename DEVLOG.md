# Daily Dashboard — Dev Log

A running record of work done to stand up this app.

## 2026-08-13

### Architecture decisions
- Scope: single-user personal dashboard (weather, Google Calendar events, interactive to-do list, daily random quote).
- Hosting: Cloudflare Pages/Workers, deploying via `wrangler deploy` — the Cloudflare dashboard's "Build command" + "Deploy command" fields indicated this project is set up under Cloudflare's newer unified **Workers with static assets** model rather than classic Pages Functions.
  - Build command: `npm run build` (runs `vite build`)
  - Deploy command: `npx wrangler deploy`
- Backend: a single Cloudflare Worker (`src/worker/index.ts`) handling `/api/*` routes and serving the built frontend as static assets — no separate server needed. Required mainly because Google Calendar OAuth needs a client secret and token refresh handled server-side.
- Datastore: Cloudflare-native instead of standalone Redis — D1 (SQLite) for the to-do list, KV for cached/ephemeral data (weather cache, daily quote, Calendar OAuth refresh token). Chosen over Upstash Redis to avoid an extra vendor and the added network hop, given everything already runs on Cloudflare.
- Auth: Cloudflare Access in front of Cloudflare Pages, since it's single-user — avoids building a custom login system.
- Domain: already registered via Squarespace and pointed at Cloudflare DNS, so it just needs to be added as a custom domain on the Cloudflare project — no extra DNS work required.

### Environment setup
- Found Node.js/npm were not installed on this machine.
- Installed Node.js v24.19.0 (LTS) and npm 11.17.0 via nvm.

### Scaffolding
- Stood up a minimal Vite + TypeScript boilerplate at the repo root: [`index.html`](index.html), [`src/main.ts`](src/main.ts), `package.json`, `tsconfig.json`, `.gitignore` — stripped of the default template's demo styling/assets, rendering a plain "Hello World".
- Added `.claude/launch.json` and `.claude/dev.sh` so the dev server (`npm run dev`) launches correctly through nvm's Node path from the Browser pane preview.
- Verified: dev server runs on `localhost:5173` and renders "Hello World" with no styling.

### React migration
- Converted the entry point from plain TypeScript DOM manipulation to React: added `react`, `react-dom`, `@types/react`, `@types/react-dom`, and `@vitejs/plugin-react`.
- Added [`vite.config.ts`](vite.config.ts) with the React plugin, and enabled `"jsx": "react-jsx"` in [`tsconfig.json`](tsconfig.json).
- Renamed `src/main.ts` to [`src/main.tsx`](src/main.tsx), now mounting via `createRoot(...).render(<App />)`; added [`src/App.tsx`](src/App.tsx) rendering "Hello World"; updated [`index.html`](index.html) to load `/src/main.tsx`.
- Verified: `tsc --noEmit` passes clean and the dev server still renders "Hello World" with no console errors.

### Next steps
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
- Build out the four dashboard widgets (weather, calendar, to-dos, quote) against that backend.
- Set up Google Calendar OAuth credentials and the token exchange/refresh flow.
- Set up Cloudflare Access for single-user gating.
- Connect the Squarespace/Cloudflare domain to the deployed project.
