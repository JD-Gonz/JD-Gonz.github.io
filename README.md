# JD-Gonz.github.io

Personal portfolio site for JD Gonzalez. Hosted at [JD-Gonz.github.io](https://JD-Gonz.github.io/).

Originally built from the FreeCodeCamp curriculum, now refactored so all content updates live in JSON instead of hand-edited HTML.

## Project layout

```text
.
├── app.js                 # Express app factory (middleware, routes)
├── server.js              # Process entry point (listen, signals)
├── index.html             # HTML shell with @@TOKEN@@ mount points
├── data/
│   ├── site.json          # Copy: meta/OG, header, about, banner, contact, copyright
│   ├── highlights.json    # Personal-highlights cards
│   └── projects.json      # Portfolio carousel cards
├── routes/
│   └── api.js             # JSON endpoints backed by /data
├── lib/
│   ├── content.js         # JSON loader + shared in-memory cache
│   └── render.js          # Server-side HTML templating
├── public/                # Static assets (css, js, images, fonts, resume)
└── test/
    └── app.test.js        # node:test integration suite
```

## Updating site content

Everything visible on the page lives in `data/`.

| To change                                 | Edit                                         |
| ----------------------------------------- | -------------------------------------------- |
| Page `<title>`, OG tags                   | `data/site.json` → `meta`                    |
| Header logo / tagline                     | `data/site.json` → `header`                  |
| About Me copy + image                     | `data/site.json` → `about`                   |
| Personal Highlights intro                 | `data/site.json` → `highlightsIntro`         |
| Personal Highlights cards (3)             | `data/highlights.json`                       |
| Portfolio banner                          | `data/site.json` → `banner`                  |
| Portfolio carousel cards                  | `data/projects.json`                         |
| Contact links / resume link               | `data/site.json` → `contact`                 |
| Copyright footer                          | `data/site.json` → `copyright`               |

### Conventions

- String fields are HTML-escaped when rendered.
- Fields whose name ends in `Html` (e.g. `banner.bodyHtml`, `copyright.itemsHtml`) are inserted as raw HTML and must be trusted.
- `projects[*].imageHref` is optional — supply it only when the image should link somewhere different from the title (e.g. a live demo vs. its GitHub repo).

## Development

```bash
npm install
npm run dev     # nodemon; auto-restarts server.js on code changes
```

Content changes under `data/*.json` or edits to `index.html` are picked up on the next request without a restart (a `fs.watch` in `lib/content.js` / `lib/render.js` drops the relevant caches).

### Running tests

```bash
npm test
```

`test/app.test.js` boots the app on an ephemeral port and asserts:

- every project and highlight title from `/data` reaches the rendered HTML,
- site copy from `data/site.json` is present,
- no `@@TOKEN@@` comments leak through,
- `/api/*` endpoints return the expected payloads,
- security headers are attached.

## Production

```bash
NODE_ENV=production npm start
# server listens on $PORT (default 8080)
```

### Operational hooks

- `POST /api/_cache/clear` — drop in-memory JSON + rendered-template caches without restarting the process. Useful if you deploy data changes via a sidecar or CI job.
- `SIGTERM` / `SIGINT` — graceful shutdown; in-flight requests drain before exit.

### Middleware

- `helmet` — security headers (CSP intentionally disabled; tightening it is a separate hardening task).
- `compression` — gzip for large static assets; `public/css/main.css` drops from ~43 KB to ~7 KB on the wire.
- `express.static('/public')` — 7-day `Cache-Control` with ETag.

## API

| Method | Path                   | Response                                 |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | `/api/site`            | `data/site.json`                         |
| GET    | `/api/highlights`      | `data/highlights.json`                   |
| GET    | `/api/projects`        | `data/projects.json`                     |
| POST   | `/api/_cache/clear`    | `{ ok: true }` and invalidates caches    |
| \*     | `/api/<unknown>`       | `404 { error: "Not Found", path }`       |

## License

ISC
