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
- Wasn't appearing in Safari's tab even after a relaunch and clearing Safari's site data for `localhost`; the PNG rendered fine when opened directly as a page, which pointed at Safari's separate favicon-specific cache rather than the file or the server.
- **Resolved**: Safari keeps a distinct on-disk favicon database at `~/Library/Safari/Favicon Cache`, separate from the page cache and site-data cache. It has to be cleared *while Safari is fully quit* &mdash; clearing it with Safari still running just let it get rewritten from the in-memory copy. Quit Safari, deleted that folder, relaunched, and the correct icon showed up immediately.

### Next steps
- Decide on a header-vs-dot-grid legibility fix &mdash; clearing the dot band behind the header, thinning the dots overall, adding a rule underneath, or making the header heavier (mocked up, not yet chosen).
- Decide on quote treatment &mdash; boxed and taped like the other widgets, or floating italic with no card (mocked up, not yet chosen).
- Give `Didot` a fallback in the font stack (currently a bare `font-family: Didot`).
- Replace placeholder widget content with real weather, quote, calendar, and to-do data.
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
- Set up Google Calendar OAuth credentials and the token exchange/refresh flow.
- Set up Cloudflare Access for single-user gating.
- Connect the Squarespace/Cloudflare domain to the deployed project.

## 2026-08-31

### WidgetCard extracted into a shared component
- Moved the shared card shell out of `App.tsx` into [`src/components/WidgetCard.tsx`](src/components/WidgetCard.tsx) as its own component taking `title` and `children` props, so every widget gets the same shape/tape/typography without each widget file redeclaring the styled-components itself.
- Hit two real bugs during the move, both silent until runtime: a missing `import styled from 'styled-components'`, and `export default WidgetCard = styled.div...` (assigning to a never-declared variable). Vite's dev transform doesn't run TypeScript's type checker (that only happens via `tsc` in the build script), so neither was caught until the browser threw a `ReferenceError` and the whole app rendered blank.
- `App.tsx` still has its old local `Title`/`Block`/`BlockBody` styled-components defined but unused now that Quote/To-Do/Events call `<WidgetCard title="..." children="..." />` directly &mdash; dead code worth removing.

### Weather widget built out ([`src/widgets/Weather.tsx`](src/widgets/Weather.tsx))
- New widget file: a `WeatherBody` (city/condition) plus a `DayContainerGrid` of `DayContainer`s for the 5-day forecast, composed inside the shared `WidgetCard`.
- `WeatherBody` had an Automatic Semicolon Insertion bug &mdash; `return` on its own line before the JSX meant it silently executed as `return;`, so the whole body rendered nothing.
- Wanted the forecast laid out as a transposed table (day/high/low as three shared rows across 5 day-columns). Since `DayContainer` returns a Fragment with no wrapping element, its three children land as direct, independent items in `DayContainerGrid` &mdash; fixed by declaring `grid-template-rows: repeat(3, auto)` alongside `grid-auto-flow: column`, so the grid wraps into a new column every 3 items instead of spreading all 15 into one implicit row.
- Also caught along the way: `high`/`low` typed as `number` but initially passed as string literals; four of five forecast days accidentally copy-pasted as `day="TUE"`; `condition` declared and passed but never actually used to pick a rendered icon (`DayContainer` currently always renders `<SunIcon />` regardless of `condition`).

### Weather icons ([`src/widgets/WeatherIcons.tsx`](src/widgets/WeatherIcons.tsx))
- Sourced 9 SVG files (sunny, partly-cloudy, cloudy, fog, rain, sleet, snow, thunder, wind) into `src/assets/icons/`, covering the core weather conditions.
- First attempt tried `<svg path="../assets/sun.svg" .../>` &mdash; not valid (SVG has no attribute for loading an external file), the path was wrong besides (missing the `icons/` folder, wrong filename), and the tag was self-closing with no shapes inside it regardless.
- Decided against `<img src="...">` for these (would display them, but as opaque images with no way to recolor via `currentColor`/CSS) in favor of inlining the real markup, so the icons can be themed against the Field Notes palette.
- Converted all 9 by hand: kept each file's `viewBox` and actual shape elements (`path`/`circle`/`line`/`rect`); dropped XML declarations, comments, `<title>`/`<desc>`, unused `xmlns:xlink`, decorative ids, and `<defs><style>`+`class` blocks (redundant &mdash; SVG's `fill`/`stroke`/etc. are inheritable, so setting them once on a wrapping `<g>` does the same job without colliding with JSX's own use of `{}`); camelCased hyphenated attributes (`stroke-width` &rarr; `strokeWidth`); replaced every hardcoded fill/stroke color with `currentColor`.
- Caught one real rendering bug in the process: `SunIcon`'s `viewBox` had been changed to `0 0 48 48` to match the other icons' convention, but its circle/line coordinates were calibrated for `0 0 24 24` &mdash; would have rendered tiny and shoved into a corner. Fixed by keeping `viewBox="0 0 24 24"` (matching the real coordinates) while standardizing rendered `width`/`height` to `24` across all 9 icons regardless of each file's native viewBox.

### Next steps
- Wire `condition` to actually select which weather icon renders per day, instead of always showing `SunIcon`.
- Replace the hardcoded MON/TUE placeholder forecast data with real data once a weather API is chosen.
- Remove the now-dead `Title`/`Block`/`BlockBody` styled-components left over in `App.tsx`.
- Decide on a header-vs-dot-grid legibility fix (still open from 2026-08-16).
- Decide on quote treatment &mdash; boxed and taped vs. floating italic (still open from 2026-08-16).
- Give `Didot` a fallback in the font stack (currently a bare `font-family: Didot`).
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
- Set up Google Calendar OAuth credentials and the token exchange/refresh flow.
- Set up Cloudflare Access for single-user gating.
- Connect the Squarespace/Cloudflare domain to the deployed project.

## 2026-09-03

### To-Do widget built out ([`src/widgets/ToDo.tsx`](src/widgets/ToDo.tsx))
- Found the file already had raw CSS (`.checkbox-wrapper input[type="checkbox"] { ... }`) pasted directly into the component body — not valid JS/TSX, so it was throwing a hard parse error. Converted it into a real `styled.input` (`ToDoCheckbox`), matching the `styled-components` convention already used in `Weather.tsx`.
- Added a custom checkmark via `&:checked::before { content: ... }`. Hit two escaping bugs getting there: `content: "2714"` needed the backslash (`\2714`, the Unicode point for ✔) that got stripped from the source tutorial; and once added, `"\2714"` inside a JS template literal collided with JS's own escape parsing (`\2` reads as a legacy octal escape, disallowed in strict-mode ES modules) — fixed with a double backslash (`"\\2714"`) so CSS receives the literal escape.
- Checkmark then rendered in the corner of the whole widget card instead of on the checkbox — `position: absolute` on `&:checked::before` had no positioned ancestor to anchor to, since the base `ToDoCheckbox` rule was missing `position: relative`. Added it.
- Laid out checkbox + label in a grid (`ToDoLabel`, wrapping the existing `<label>`). Went through a few broken attempts before landing on the fix: `align-items: left` is invalid CSS (`align-items` never accepts `left`/`right` — only inline-axis properties like `justify-items`/`justify-content` do); separately, `grid-auto-flow: column` with no `grid-template-columns` let the two implicit `auto` columns split the full row width via `justify-content: normal` (which behaves as stretch in Grid), spreading the checkbox and label apart instead of grouping them. Fixed with an explicit `grid-template-columns: auto 1fr`.
- Added `ToDoTask` (a `styled.span`) to strike through completed items. First pass referenced `isCompleted` as a bare variable inside the template literal — doesn't work, since styled-components interpolations are functions evaluated per-render against that instance's props, not closures over outer scope; fixed to `${(props) => props.isCompleted ? "line-through" : "none"}`.
- That triggered a React DOM warning (`isCompleted` isn't a valid HTML attribute, and styled-components forwards unknown props straight to the DOM by default). Fixed using styled-components v6's transient-prop convention — renamed to `$isCompleted` in both the styled-component definition and the JSX usage, which tells styled-components to consume it for styling only, not forward it.
- Added dashed dividers between to-do items (skipping the last) via `& > *:not(:last-child)`. `border-bottom: dotted` worked but rendered a visibly thicker, squished dot at the end of each line — inherent behavior of `dotted`/`dashed` borders, which favor flush edges over uniform dot spacing when the line length isn't an exact multiple of the dot pitch. Replaced with a `repeating-linear-gradient` on `background-image` instead (`border-bottom` can't take a gradient value directly — the whole declaration gets silently dropped as invalid if you try). Also caught a `to-right` typo (needs a space, not a hyphen — `to right`) that likewise invalidated the whole gradient function.
- Chased a report of one divider line looking visibly thicker than the others. Computed-style inspection showed all dividers had identical `background-size` and row heights differing by ~0.0002px — traced to CSS Grid producing non-integer row heights, with each row's fractional pixel offset interacting differently with the display's pixel grid at that zoom level. Confirmed as a genuine sub-pixel anti-aliasing artifact (not a real CSS bug) by zooming in, where it disappeared. Decided not to convert the checkbox's `em`-based sizing to fixed `px` to "fix" it, since it isn't actually broken and `em`-based sizing keeps the checkbox scaling with the widget's font size.

### Working agreement
- Added [`CLAUDE.md`](CLAUDE.md) at the repo root: going forward, no edits get made without asking first — default assumption is that questions are for explanations/answers, not applied changes.

### Next steps
- To-do items are still hardcoded labels (`zoe`, `kahana`, `thomas`, `jankovic`) with no persistence, add/remove, or backing data — needs real state once the Worker/D1 backend exists.
- Remove the now-unused `.checkbox-wrapper` div/class in `ToDo.tsx`, a leftover from the original (invalid) CSS-class approach.
- Decide on a header-vs-dot-grid legibility fix (still open from 2026-08-16).
- Decide on quote treatment — boxed and taped vs. floating italic (still open from 2026-08-16).
- Give `Didot` a fallback in the font stack (currently a bare `font-family: Didot`).
- Wire `condition` to actually select which weather icon renders per day, instead of always showing `SunIcon` (still open from 2026-08-31).
- Remove the now-dead `Title`/`Block`/`BlockBody` styled-components left over in `App.tsx` (still open from 2026-08-31).
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
- Set up Google Calendar OAuth credentials and the token exchange/refresh flow.
- Set up Cloudflare Access for single-user gating.
- Connect the Squarespace/Cloudflare domain to the deployed project.

## 2026-09-08

### List widgets (Events, ToDo) reformatted
- `EventList`/`ToDoList` switched from a plain flex/grid column to `grid-auto-rows: 1fr` inside a `flex: 1` parent, so rows share the available height evenly instead of packing to content size — needed once [`WidgetCard.tsx`](src/components/WidgetCard.tsx)'s `Card`/`CardBody` also became `display: flex; flex-direction: column` with `flex: 1; min-height: 0` on the body, letting widget content stretch to fill the card instead of collapsing to its natural height.
- Wrapped each `Event` in a new `EventWrapper` (`display: flex; align-items: center`) so an item can vertically center within its stretched grid row rather than sitting at the row's top edge.
- Extracted the repeated per-event JSX into an `EventItem({time, title})` component (mirroring `ToDo`'s existing `ToDoItem` pattern) instead of four hand-copied `EventWrapper`/`Event` blocks; caught a `React.PropsWithChildren` type alias declared with `const` instead of `type` in the process (compiled fine at runtime but was semantically wrong).
- Divider color between list items (`repeating-linear-gradient` on `background-image`, from the 2026-09-03 to-do work) was hardcoded near-black (`#212a3b`) on both widgets — same value as body text, so it read as too heavy against the paper background. Changed to the tape/accent tan (`#9e926a`) on both `EventList` and `ToDoList`.

### Weather widget: daily forecast column layout ([`Weather.tsx`](src/widgets/Weather.tsx))
- Replaced the placeholder `<h1>`/`<h2>` city/condition text with real structure: `Location` ("Dallas, TX"), `Temperature` (large display number with a CSS-generated `°` via `::after`), and later `Forecast` ("Sunny"), laid out in a `DetailsColumn` beside an `IconColumn` holding the current-conditions icon — composed via a new `WeatherBodyWrapper` grid.
- Replaced the bare `h4`/`h5` tags in the 5-day forecast row with named styled-components (`ForecastDay`, `ForecastTemps`), switched `DayContainerGrid` from `grid-auto-flow: column` to `flex; justify-content: space-between` so the 5 day-columns spread evenly, and added a dashed `Divider` (same repeating-gradient technique as the list widgets) between the current-conditions section and the forecast row.
  - First pass at `Divider` didn't render at all — it was an empty `<div>` with a `background-image` but no explicit `height`, and an empty div collapses to 0 height by default, so the gradient had no box to paint into. Fixed with `height: 2px` matching the gradient's `background-size`.
- Added a `°` after each forecast day's high/low (`{high}° / {low}°`), matching the `Temperature` display.

### Weather icons made resizable ([`WeatherIcons.tsx`](src/widgets/WeatherIcons.tsx))
- Every icon component gained a `size` prop (`{size = 24}: {size?: number}`) driving both `width`/`height` attributes, so the same icon can render larger for today's conditions (`SunIcon size={96}` in `WeatherBody`) and smaller in the forecast row (`size={36}`, later `size={24}`) without duplicating markup — the `viewBox` stays fixed, so the browser just scales the existing artwork rather than redrawing it.

### Typography: Georgia fallback for small text
- `body`'s global `font-family: Didot` (a high-contrast display serif) reads fine at large sizes but gets hard to read at small sizes, where its thin hairlines lose definition. Rather than change it globally, scoped `font-family: Georgia` (screen-legible at small sizes) onto the specific small-text components: `ForecastDay`/`ForecastTemps` in Weather, `EventTitle` in Events, `ToDoTask` in ToDo. Large display text (`Location`, `Temperature`, `Forecast`) stayed on Didot.

### High/low temperature: iterating toward a mobile layout
- Wanted "high / low" inline on wide screens and stacked (`high` then `low`, no separator) on narrow ones. Split `{high}° / {low}°` (a single text node) into separate `High`/`Low` styled-spans so a `@media` breakpoint could independently control layout direction and separator visibility.
- Hit a pseudo-element collision: both `High`/`Low` set their own `&::after { content: "°" }`, but `ForecastTemps` *also* targeted `::after` on non-last children (`& > *:not(:last-child)::after { content: " / " }`) to inject the separator generically. An element can only have one `::after`; the more specific `ForecastTemps`-scoped selector won out over `High`'s own rule, silently eating its `°`. Resolved by having `High` own its full trailing content directly (`content: "° / "`, dropped to `content: "°"` under the mobile breakpoint) instead of relying on a generic cross-cutting selector.
- Also lost a few minutes to a plain typo — `content:"°;` (missing closing quote) silently invalidated an entire `@media` block rather than throwing, so the override appeared to just not apply.
- **Decision reversed**: after seeing it live, the `/` separator looked bad at every screen size, not just mobile. Simplified to always stack high/low vertically with no separator — `ForecastTemps` is unconditionally `flex-direction: column`, `High` keeps its `°`, and `Low` picked up a muted `color: #656669` (previously only applied on mobile) to visually de-emphasize it against the bolder `High` value, now that there's no `/` to separate them visually.

### Responsive pass
- `WidgetGrid` in [`App.tsx`](src/App.tsx) columns changed from `3fr 3fr 2fr` to `1fr 1fr 1fr` for more even spacing across Weather/Events/ToDo.
- Added `@media (max-width: 768px)` rules: `ToDoItemWrapper` gets breathing room (`padding: 10px 0px`) between rows on mobile; `WidgetGrid` itself already had (from the 2026-08 wireframe work) a mobile fallback to stack widgets in a single column.

### Google OAuth Integration
- Set up Google Oauth integration as specified in the following docs: [Google Integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/), [Add a Self-Hosted Application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), and [Access Policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).
- All visitors to the site must log in with Google, and only zoekahana21@gmail.com is permitted access.

### Next steps
- Wire `condition` to actually select which weather icon renders per day, instead of always showing `SunIcon` (still open from 2026-08-31).
- Replace the hardcoded MON/TUE placeholder forecast data with real data once a weather API is chosen.
- To-do items are still hardcoded labels with no persistence, add/remove, or backing data.
- Remove the now-dead `Title`/`Block`/`BlockBody` styled-components left over in `App.tsx` (still open from 2026-08-31).
- Decide on a header-vs-dot-grid legibility fix (still open from 2026-08-16).
- Decide on quote treatment — boxed and taped vs. floating italic (still open from 2026-08-16).
- Give `Didot` a fallback in the font stack for the remaining large-text elements (currently a bare `font-family: Didot` on `body`).
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).

## 2026-09-10

### Theme colors centralized (`clean-up-code` branch)
- Replaced hardcoded hex colors scattered across [`WidgetCard.tsx`](src/components/WidgetCard.tsx), [`Events.tsx`](src/widgets/Events.tsx), [`ToDo.tsx`](src/widgets/ToDo.tsx), and [`Weather.tsx`](src/widgets/Weather.tsx) with CSS custom properties (`--color-page-background`, `--color-page-background-accent`, `--color-card-background`, `--color-card-accent`, `--color-title`, `--color-text-main`, `--color-text-muted`, `--color-divider`) declared once on `:root`.
- Deleted `App.css` and moved its rules into a new [`src/theme/globalStyles.ts`](src/theme/globalStyles.ts) (`GlobalStyle`, via styled-components' `createGlobalStyle`), mounted once at the top of `App.tsx`.

### UI refactoring — shared component/mixin extraction
- Extracted the repeated "flex row, center items" list-item wrapper (previously duplicated as `EventWrapper` in `Events.tsx` and inline in `ToDoItemWrapper`) into a shared [`src/components/ListItemWrapper.tsx`](src/components/ListItemWrapper.tsx). `ToDoItemWrapper` now extends it via `styled(ListItemWrapper)` for its mobile-only padding; `Events.tsx` imports it directly (aliased to `EventWrapper` at the time).
- Pulled the duplicated `repeating-linear-gradient` dashed-divider CSS (copy-pasted identically across `EventList`, `ToDoList`, and Weather's `Divider`) and the `::after { content: "°" }` degree-sign pattern (duplicated across `High`, `Low`, `Temperature`) into shared `css` mixins in a new [`src/theme/mixins.ts`](src/theme/mixins.ts) (`dashedDivider`, `degreeSuffix`).
- Added `--font-display`/`--font-serif` CSS variables (Didot/Georgia) to `globalStyles.ts` so widgets reference them instead of repeating bare font names.
- [`WeatherIcons.tsx`](src/widgets/WeatherIcons.tsx): pulled the shared `<svg>` boilerplate (`width`/`height`/`viewBox`/`xmlns`/`fill`) out of all 9 icon components into one base `Icon` component; each icon now just supplies its `viewBox` and path data as `children`, cutting roughly 100 lines of duplicated markup.
- `WidgetCardProps` switched from `React.PropsWithChildren<...>` to an imported `PropsWithChildren` (`import type { PropsWithChildren } from 'react'`); `EventItemProps`/`DayContainerProps` dropped an unnecessary `PropsWithChildren` wrapper, since neither type actually took `children`.
- Minor: `Card`'s padding shorthand simplified from `20px 30px 20px 30px` to `20px 30px`.

### Checkbox spacing tweak
- `ToDoCheckbox`'s `margin-right` increased from `0.5em` to `1em` for more breathing room next to the label text.

## 2026-09-11

### Naming audit and standardization (`fix-naming-conventions` branch)
- Reviewed variable/component naming across the codebase for consistency and fixed three inconsistencies, all confined to [`Weather.tsx`](src/widgets/Weather.tsx) and [`Events.tsx`](src/widgets/Events.tsx):
  - `Weather.tsx`'s styled components weren't prefixed with the widget name the way `Events`/`ToDo`/`Quote` consistently prefix theirs. Renamed `Location`, `Temperature`, `Forecast`, `Divider`, `DetailsColumn`, `IconColumn`, `High`, `Low`, `ForecastDay`, `ForecastTemps`, `DayContainer`, and `DayContainerProps` to `WeatherLocation`, `WeatherTemperature`, `WeatherForecast`, `WeatherDivider`, `WeatherDetailsColumn`, `WeatherIconColumn`, `WeatherHigh`, `WeatherLow`, `WeatherDayLabel`, `WeatherDayTemps`, `WeatherDay`, and `WeatherDayProps`.
  - Caught a real bug hiding behind the naming along the way: `DayContainerFlex` was actually `display: grid` and `DayContainerGrid` was actually `display: flex` — each name described the opposite of what it did. Renamed by role instead of the (incorrect) layout mode: `DayContainerFlex` → `WeatherDayColumn` (the single-day stack), `DayContainerGrid` → `WeatherDayRow` (the row of five days).
  - `Events.tsx` imported the shared `ListItemWrapper` under an ad-hoc alias (`import EventWrapper from '../components/ListItemWrapper'`), while `ToDo.tsx` kept the real name and only renamed it when actually extending it with extra styles (`ToDoItemWrapper = styled(ListItemWrapper)`). Dropped the alias in `Events.tsx` so it's imported and used as `ListItemWrapper` directly, matching `ToDo.tsx`'s pattern.
- Verified: `tsc --noEmit` passes clean and the app renders with no console errors after the rename.

### Next steps
- Wire `condition` to actually select which weather icon renders per day, instead of always showing `SunIcon` (still open from 2026-08-31).
- Replace the hardcoded MON/TUE placeholder forecast data with real data once a weather API is chosen.
- To-do items are still hardcoded labels with no persistence, add/remove, or backing data.
- Decide on a header-vs-dot-grid legibility fix (still open from 2026-08-16).
- Decide on quote treatment — boxed and taped vs. floating italic (still open from 2026-08-16).
- Give `Didot` a fallback in the font stack for the remaining large-text elements (currently a bare `font-family: Didot` on `body`).
- Scaffold the Cloudflare Worker backend (`src/worker/index.ts`, `wrangler.toml` with D1 + KV bindings).
