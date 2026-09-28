# PlantPal: AI Plant Care

A responsive promotional website and original plant-care library built with React, TypeScript, Vinext/Vite, and a Cloudflare Worker with D1 persistence.

## Included

- App landing page and feature page with supplied branding/screenshots and the official Google Play link.
- 39 original guides and product overviews (approximately 12,700 words), five topic hubs, and 32 glossary entries with individual URLs.
- Server-rendered content, GET-based search, pagination, table of contents, related guides, and app download links.
- Titles, descriptions, canonicals, article/breadcrumb/defined-term/app structured data, a live sitemap, robots.txt, and real HTTP 404s.
- Authenticated publishing API with durable drafts, future publication dates, duplicate-body rejection, idempotent creation, and revision-protected updates.
- PC publishing scripts, optional source-researched AI drafting, and Windows Task Scheduler / cron setup.

## Run locally

Use Node.js 22.13+ with npm. Tested with Node 22.22.0.

```powershell
npm ci
npm run dev
```

Preview: http://localhost:5173. This PC also has a compatible runtime at `.sites-runtime/tooling/node.exe`; it is ignored local tooling, not deployed. Its preview database is initialized in `.wrangler/state`.

On a fresh checkout, copy `.env.example` to `.env`, set a random publishing key, and use the same value in an ignored `.dev.vars` file for local Worker preview. Then initialize storage:

```powershell
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_tan_power_man.sql
```

Apply each migration once, in order. Sites applies production migrations during publication. Applied migrations must not be rewritten.

## Content and configuration

- `lib/content.ts`: care, troubleshooting, soil, and practical guides.
- `lib/plant-content.ts`: individual plant profiles.
- `lib/extra-content.ts`: product overviews and additional techniques.
- `lib/glossary.ts`: glossary definitions and related guides.
- `lib/config.ts`: canonical origin, Play Store link, and categories.
- `lib/post-schema.mjs`: shared publishing validation.
- `db/schema.ts` and `drizzle/`: database schema and migrations.

Bundled guides are edited in source. API articles live in D1, survive deployments, and become visible without rebuilding. Bundled slugs cannot be overwritten through the API. No browser storage is used as the article database.

For a custom domain: configure it with the host, update `SITE_URL` in `lib/config.ts`, choose one canonical host and redirect the old host, then redeploy. Update `.env.publisher` too.

## PC publishing

See [publisher/README.md](publisher/README.md). A random publishing secret has been created locally and set as a hosting secret. It is not in Git or this documentation.

The Windows task is **not installed yet**. AI generation is **not activated**: `OPENAI_API_KEY` and `CONTENT_MODEL` are blank, and `AUTO_PUBLISH=false`. Queue-only publishing does not require an OpenAI key. Automatic generation requires your API account and model selection and may incur usage charges. The supplied Windows task requires the PC to be awake, online, and the user logged in.

## Verification

```powershell
npx tsc --noEmit
node --env-file=.env scripts/verify-site.mjs
npm run build
```

The integration verifier checks all seed routes, related links, canonicals, sitemap, 404s, authentication, payload validation, duplicate rejection, retries, revision checks, and draft/scheduled/public visibility. It creates one local test article and returns it to draft. Run against local development only.

Optional browser checks use `scripts/browser-check.cjs`. Set `PLAYWRIGHT_MODULE` to an installed Playwright module if not in project dependencies; `BROWSER_CHANNEL` defaults to Edge. Screenshots/results stay in ignored `.sites-runtime/`.

## Editorial and SEO operation

The content is original writing for this project. Exact duplicate bodies are rejected, but neither the code nor AI can guarantee worldwide uniqueness, correctness, indexing, or rankings. Review generated drafts for factual accuracy, source support, distinct intent, and usefulness. The 300-word API minimum is an editorial validation rule, not a ranking threshold.

Search results are noindexed. Category and pagination pages link to individual guides. Drafts and future articles are absent from public pages and sitemap. Storage failure returns 503 for the sitemap instead of an empty successful response.

At public launch, verify the domain in Google Search Console, submit `/sitemap.xml`, and inspect representative pages. The site does not contain analytics trackers, invented testimonials, fabricated ratings, or purported hands-on product tests. Product overviews cite manufacturers.

AI drafting runs on the PC. The hosted site requires no OpenAI key.

Implementation references: [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) and [OpenAI web search](https://developers.openai.com/api/docs/guides/tools-web-search). Horticultural/product links appear in relevant guides. See [ASSETS.md](ASSETS.md) for image provenance.

## Interactive garden game

The homepages link to `/game` and `/he/game` through a compact banner. The dedicated game pages load the WebGL playground when it enters view. The homepage hero still has an optimized greenhouse image, gentle motion, a pause control, and reduced-motion support. Arrow keys or WASD move, Space jumps, Escape pauses; pointer controls support phones. Keyboard input is scoped to the focused garden. The game pauses when offscreen or the browser loses focus and has load/error recovery. The game has three stages: Morning meadow (5 suns, 90 seconds), Bramble crossing (6 suns, 80 seconds), and Golden-hour dash (7 suns, 70 seconds). Later stages use narrower, taller stones and moving orange brambles. Each stage starts with three lives; hits respawn the plant with brief invulnerability. Collect all suns to advance, retry the current stage after losing, or restart the full adventure after winning. Pausing freezes the clock. Pickup sounds, hit tones, and completion melodies start only after Play, with an on-screen mute toggle. No score or personal information is stored.

Game files: `components/plantpal/plant-playground.tsx` (controls), `plant-game-engine.ts` (Three.js renderer), and `lib/plant-game-physics.ts` (movement/collision). See ASSETS.md for model provenance and optimization.

Primary-page headers share `components/plantpal/page-hero.tsx`: full-width photos, pause/reduced-motion support, and direct anchors to their content. App, library, glossary, and five category pages use this treatment.

## Houseplant collection

`/plants` and its ten species profiles are available in all ten site languages. Add a species to `lib/plants.ts`, then provide its name, summary, and care tip for the eight additional languages in `lib/plants-l10n.ts`. The catalog, profile routes, metadata, alternate-language links, and sitemap use this shared list. Plant images live in `public/images/plants/`; generation details are recorded in `ASSETS.md`.

Run deterministic gameplay checks with `node --experimental-strip-types scripts/check-game.mjs` on Node 22.13+. They cover all platform heights, progression, timers, collisions, and lives.
