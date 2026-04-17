// server.js
// Thin bootstrapper. Routing and content live in /routes and /data so
// backend updates do not require touching front-end markup.

'use strict';

const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;

// Long-lived cache headers on static assets cut bandwidth and backend load.
app.use(
  '/public',
  express.static(path.join(ROOT, 'public'), { maxAge: '7d', etag: true })
);

// Content API — the single seam the front-end uses to talk to the backend.
app.use('/api', apiRouter);

// SPA fallback so hash-linked routes still resolve on refresh.
app.get('/*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

// Centralized error handler — keep this LAST.
app.use((err, req, res, _next) => {
  console.error('[server]', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown so in-flight requests are not dropped on deploy.
['SIGTERM', 'SIGINT'].forEach((sig) =>
  process.on(sig, () => {
    console.log(`${sig} received, shutting down…`);
    server.close(() => process.exit(0));
  })
);
