// routes/api.js
// Exposes portfolio content as JSON so front-end changes become data edits in /data/*.json.
// Adds a tiny in-memory cache plus CDN-friendly Cache-Control headers.

'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();
const DATA_DIR = path.join(__dirname, '..', 'data');

const cache = new Map();

async function loadJson(name) {
  if (cache.has(name)) return cache.get(name);
  const filePath = path.join(DATA_DIR, `${name}.json`);
  const payload = JSON.parse(await fs.readFile(filePath, 'utf8'));
  cache.set(name, payload);
  return payload;
}

// Route factory collapses per-route try/catch boilerplate.
const jsonRoute = (name) => async (req, res, next) => {
  try {
    res.set('Cache-Control', 'public, max-age=300');
    res.json(await loadJson(name));
  } catch (err) {
    next(err);
  }
};

router.get('/site', jsonRoute('site'));
router.get('/highlights', jsonRoute('highlights'));
router.get('/projects', jsonRoute('projects'));

// Exposed for tests / admin tooling to drop the cache without a restart.
router.post('/_cache/clear', (req, res) => {
  cache.clear();
  res.json({ ok: true });
});

// Explicit 404 so unknown /api paths don't fall through to the SPA handler.
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

module.exports = router;
