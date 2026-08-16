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

## 2026-08-15

### Landing page widgets merged
- Merged PR #3 (`landing-page-with-react` branch) into `main`: added [`src/App.css`](src/App.css) and extended [`src/App.tsx`](src/App.tsx) with `styled-components` `Block` elements as placeholder cards for the four widgets (Quote, Weather, To-Do, Events).

### Wireframe / layout design
- Sketched a low-fidelity wireframe of the four widgets (weather, daily quote, calendar events, to-do list) to settle the page layout before wiring up real data.
- Layout: the quote is its own full-width block with no wrapper; the other three widgets (weather, events, to-do) are grouped in a separate grid container below it. Chose CSS Grid over flexbox for that row since the widgets need fixed, unequal column widths rather than flex-grow ratios, and it makes a future single-column mobile breakpoint a one-line change.

### Applied to App.tsx (uncommitted)
- Wrapped the Weather/To-Do/Events `Block`s in a new `WidgetGrid` styled-component (`display: grid; grid-auto-flow: column; grid-template-columns: 3fr 2fr 1fr`), keeping `Quote` as a standalone sibling block.
- Reduced `Block` margin from `50px` to `20px` to tighten spacing now that widgets sit in a grid.

### Next steps
- Commit the `WidgetGrid` layout change.
- Replace placeholder widget content with real weather, quote, calendar, and to-do data.
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
- Set up Google Calendar OAuth credentials and the token exchange/refresh flow.
- Set up Cloudflare Access for single-user gating.
- Connect the Squarespace/Cloudflare domain to the deployed project.

## 2026-08-16

### Field Notes visual direction
- Explored several aesthetic directions for the widget layout (paper/notebook, dark weather-led, terminal-inspired) and picked **Field Notes**: a paper-planner look with a dot-grid buff background, serif type, and widgets styled as index cards held down by tape.
- Explored multiple color palettes and multicolor variants for Field Notes before settling on buff paper + red ink accent + teal tape (rather than matching the tape color to the text accent).
- Explored serif/monospace font pairings before landing on Didot for display type and a monospace stack for widget labels.

### Applied to App.css / App.tsx (uncommitted)
- [`src/App.css`](src/App.css): replaced the placeholder pink/white color scheme with the buff-paper (`#e6dfc9`) / ink (`#212a3b`) palette, added a dot-grid texture via a tiled `radial-gradient`, and switched the body font to `Didot`.
- [`src/App.tsx`](src/App.tsx):
  - Added a `HeaderGrid` wrapping `Greeting` ("Good morning, Zoe.") and a new `DateSubheader` ("It's August 15, 2026."), placed at opposite ends of the header row.
  - `Block` now takes `$accent` and `$rotate` props and grew a second pseudo-element: `::before` and `::after` each render a small rotated "tape" strip at opposite corners, so every widget reads as a hand-taped index card. All four widgets currently share the same teal accent (`#1f6e64`) and rotation (`-0.4deg`) &mdash; per-widget color coding was explored but not applied.
  - Added `BlockBody` for widget copy, with a placeholder line per widget (e.g. "It's a beautiful day!", "Everything handled.").
  - `WidgetGrid` columns changed from `3fr 2fr 1fr` to `3fr 3fr 2fr`.

### Favicon fix
- `favicon.ico` was sitting at the repo root and wasn't actually a valid ICO &mdash; it was a 512&times;512 PNG saved with a `.ico` extension, so Vite never served it from a location the browser would check, and the declared MIME type didn't match the content anyway.
- Moved it into `public/` (the only directory Vite serves as static assets) as `favicon.png`, and added `<link rel="icon" type="image/png" href="/favicon.png">` to [`index.html`](index.html). Verified correct serving directly over HTTP (`200`, `Content-Type: image/png`, correct byte count).
- Still not appearing in Safari's tab after a relaunch attempt; the PNG renders fine when opened directly as a page, so this is Safari's separate favicon-specific cache, not the file or the server. Unresolved &mdash; next step is clearing Safari's site data for `localhost` (or its on-disk favicon cache) if a full quit/relaunch doesn't clear it.

### Next steps
- Resolve the Safari favicon caching.
- Decide on a header-vs-dot-grid legibility fix &mdash; clearing the dot band behind the header, thinning the dots overall, adding a rule underneath, or making the header heavier (mocked up, not yet chosen).
- Decide on quote treatment &mdash; boxed and taped like the other widgets, or floating italic with no card (mocked up, not yet chosen).
- Give `Didot` a fallback in the font stack (currently a bare `font-family: Didot`).
- Replace placeholder widget content with real weather, quote, calendar, and to-do data.
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
- Set up Google Calendar OAuth credentials and the token exchange/refresh flow.
- Set up Cloudflare Access for single-user gating.
- Connect the Squarespace/Cloudflare domain to the deployed project.
