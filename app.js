// app.js
// Express application factory: wires middleware, routes, and the template
// renderer. Exported without calling listen() so tests can bind to an
// ephemeral port, and server.js can own process-level concerns (signals,
// logging, PORT resolution).

'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const apiRouter = require('./routes/api');
const { renderIndex } = require('./lib/render');

const ROOT = __dirname;

function createApp() {
  const app = express();

  // Security headers. CSP is intentionally off: the existing front-end
  // relies on jQuery plugins setting element.style directly, and locking
  // CSP down properly is a separate hardening task that deserves its own
  // pass so we don't regress the UI.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  );

  // Gzip/Brotli on responses above ~1 KB. Big wins on main.css and jquery.min.js.
  app.use(compression());

  // Long-lived cache headers on static assets cut bandwidth and backend load.
  app.use(
    '/public',
    express.static(path.join(ROOT, 'public'), { maxAge: '7d', etag: true })
  );

  // Content API — the single seam the front-end uses to talk to the backend.
  app.use('/api', apiRouter);

  // SPA fallback: render the composed HTML for any non-API, non-static path.
  app.get('/*', async (req, res, next) => {
    try {
      const html = await renderIndex();
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Cache-Control', 'public, max-age=60');
      res.send(html);
    } catch (err) {
      next(err);
    }
  });

  // Centralized error handler — keep this LAST.
  app.use((err, req, res, _next) => {
    console.error('[app]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}

module.exports = { createApp };
