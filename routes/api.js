// routes/api.js
// JSON endpoints backed by /data/*.json. Thin wrapper around lib/content.js
// so both the API and the HTML renderer share one cache.

'use strict';

const express = require('express');
const { loadJson, clearCache } = require('../lib/content');

const router = express.Router();

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

// Drops the shared data + rendered-template cache without a restart.
router.post('/_cache/clear', (req, res) => {
  clearCache();
  // render cache lives in lib/render.js and listens for this hook
  try { require('../lib/render').clearTemplateCache(); } catch (_) { /* optional */ }
  res.json({ ok: true });
});

// Explicit 404 so unknown /api paths don't fall through to the SPA handler.
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

module.exports = router;
