# Publish PlantPal content from your PC

## Configure

Use Node 22.13+ and install project dependencies. `.env.publisher` on this PC already contains the site origin and a random publishing key. Keep it private. On another computer copy `.env.publisher.example` and configure it locally.

`CONTENT_API_KEY` must match the site's secret and contain at least 32 characters. Rotate the hosting secret and local file together, then redeploy. Never put secrets in article files, URLs, source control, or task arguments.

## Queue reviewed articles

Prepare an English source draft in `publisher/drafts/your-guide.json`. This illustrates the payload shape; replace the example with at least 300 words across three or more sections:

```json
{
  "slug": "your-distinct-plant-care-topic",
  "title": "A specific and useful plant care title",
  "category": "plant-care",
  "description": "Write an accurate, unique description between 60 and 180 characters explaining the question that this guide answers.",
  "takeaway": "One clear practical answer to the main question this guide addresses.",
  "sections": [
    {"heading": "Understand the situation", "paragraphs": ["Replace with original explanatory paragraphs of at least 30 characters each."]},
    {"heading": "Check the right clues", "paragraphs": ["Replace with original concrete observations and practical steps."]},
    {"heading": "Build a better routine", "paragraphs": ["Replace with original follow-up guidance and meaningful limitations."]}
  ],
  "related": ["how-to-water-houseplants", "bright-indirect-light"],
  "sources": [{"title": "RHS houseplant growing guide", "url": "https://www.rhs.org.uk/plants/types/houseplants/growing-guide"}],
  "author": "PlantPal",
  "locale": "en",
  "status": "draft",
  "publishedAt": "2026-10-01T06:00:00.000Z"
}
```

Categories: `plant-guides`, `plant-care`, `troubleshooting`, `soil-fertilizer`, `tips`. Use plain text, not HTML. Publication dates must use ISO 8601 with a timezone and are normalized to UTC. Omit the date for publication on acceptance; future dates keep articles hidden until due.

Before moving a draft to `publisher/queue/`, add a `translations` object with full `title`, `description`, `takeaway`, and `sections` for `he`, `fr`, `it`, `hi`, `zh`, `ar`, `pt`, `ru`, and `es`. Each translation must be substantive and use the local language throughout. Set `status` to `published` only after reviewing all ten versions. The schema rejects incomplete published posts. The request limit is 512 KB. Confirm that the multilingual site change is deployed and each live language route works before queueing a post.

The first complete article must be shown to the owner before publication. Include all ten rendered versions, metadata, sources, and intended URLs in the review package. The owner can request edits; only their explicit approval of the final version permits the first publish. The local publisher requires a matching, content-hash-bound approval record at `../content-ops/approvals/first-publication.json` and refuses to send the first API post without it. See that directory's README. The first sample is currently a source-page refresh, whose deployment must be reviewed separately. Automatic publishing and its schedule remain off.

```powershell
# Validate only: no publishing or generation calls
node --env-file=.env.publisher publisher/run.mjs --dry-run
# Publish up to three queued articles
node --env-file=.env.publisher publisher/run.mjs
```

Successful files move to `publisher/sent/`, with receipts in `publisher/state/`. Failed files remain in the queue. Exact retries are safe; changing a previously used slug requires the update API. Local logs contain no keys. Rotate logs as needed.

## Optional AI generation

Set `OPENAI_API_KEY` and `CONTENT_MODEL` locally. Select a model available to your account supporting Responses, web search, and Structured Outputs; the script does not assume availability or pricing.

```powershell
node --env-file=.env.publisher publisher/run.mjs --generate
```

Each run selects one unused topic from `topics.json`, checks the live sitemap, gathers primary-source research, and generates one structured article. At least two cited HTTPS sources are required, and the output can cite only URLs returned during research. This uses two model calls per new topic; saved research can be reused after failure. Paid generation calls are not automatically retried.

Default `AUTO_PUBLISH=false` saves generated English content in `publisher/drafts/`. Translate and review all ten versions, change `status` to `published`, optionally set a publication time, then move it to `queue/`.

`AUTO_PUBLISH=true` is currently blocked before any paid generation call because this generator produces English only. The ten-language workflow needs a translation and QA stage before automatic publication can be enabled. `--dry-run` suppresses generation even if `--generate` is supplied.

Lock files prevent overlapping runs. After a crash, confirm no publisher process is running before removing a stale `publisher/state/*.lock` file.

## Windows Task Scheduler

After a successful manual run, install a daily task at 09:00 local time:

```powershell
powershell -ExecutionPolicy Bypass -File publisher/install-task.ps1 -At '09:00'
```

Add `-Generate` for optional drafting. On this PC, if the default Node is too old:

```powershell
powershell -ExecutionPolicy Bypass -File publisher/install-task.ps1 -At '09:00' -NodePath 'C:\AI\PlantPalWeb\site\.sites-runtime\tooling\node.exe'
```

The installer creates or replaces `PlantPal Content Publisher` for the current user, with limited privileges, no overlapping runs, a 20-minute limit, and `StartWhenAvailable`. It runs only while this user is logged in; the PC must be awake and online. The task stores an environment-file path, not secret values. It has not been installed automatically.

```powershell
Get-ScheduledTask -TaskName 'PlantPal Content Publisher'
Get-ScheduledTaskInfo -TaskName 'PlantPal Content Publisher'
Unregister-ScheduledTask -TaskName 'PlantPal Content Publisher' -Confirm:$false
```

## Linux/macOS cron

Run the publisher once to create its folders, then use absolute paths:

```cron
0 9 * * * cd /absolute/path/to/site && /absolute/path/to/node --env-file=.env.publisher publisher/run.mjs >> publisher/logs/cron.log 2>&1
```

Add `--generate` only after configuring generation. Restrict the environment file to your user.

## API contract

Require `Authorization: Bearer <CONTENT_API_KEY>` on every management/write endpoint. Use `Content-Type: application/json`. Payloads are limited to 512 KB in the local multilingual code; the live site must be redeployed before relying on that limit.

- `POST /api/content`: create. 201 on creation, 200 on exact retry, 409 for conflicting slug or duplicate normalized body.
- `GET /api/content/{slug}`: retrieve an API-created article (including a draft) and its revision/ETag. Requires authentication.
- `PUT /api/content/{slug}`: replace, supplying `If-Match: <revision>`. Missing revision: 428. Stale revision: 412. Set `status: draft` to unpublish.

Bundled source articles cannot be overwritten through the API. Invalid key: 401. Invalid JSON: 400. Wrong content type: 415. Oversized request: 413. Invalid schema: 422. Storage unavailable: 503. The publisher retries transient requests at most three times and does not blindly retry validation errors.

Example using environment variables already loaded in PowerShell:

```powershell
$headers = @{ Authorization = 'Bearer ' + $env:CONTENT_API_KEY }
Invoke-RestMethod -Method Post -Uri ($env:PLANTPAL_SITE_URL + '/api/content') -Headers $headers -ContentType 'application/json' -Body (Get-Content -LiteralPath 'publisher/queue/my-guide.json' -Raw)
```

The bundled command is preferred because it loads `.env.publisher`, validates, retries safely, and archives successful queue files.
