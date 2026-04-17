// lib/content.js
// Shared async loader + in-memory cache for /data/*.json.
// Both the JSON API and the HTML template renderer read through this module,
// so a single POST /api/_cache/clear invalidates every caller at once.
//
// In non-production environments we also watch /data for JSON changes and
// drop the cache automatically, which means `npm run dev` edits land on the
// next request without a nodemon restart.

'use strict';

const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const EventEmitter = require('events');

const DATA_DIR = path.join(__dirname, '..', 'data');
const cache = new Map();

// Subscribers (e.g. lib/render.js) can listen for 'invalidated' to drop
// downstream caches that were derived from /data/*.json.
const bus = new EventEmitter();

async function loadJson(name) {
  if (cache.has(name)) return cache.get(name);
  const payload = JSON.parse(
    await fs.readFile(path.join(DATA_DIR, `${name}.json`), 'utf8')
  );
  cache.set(name, payload);
  return payload;
}

function clearCache() {
  cache.clear();
  bus.emit('invalidated');
}

if (process.env.NODE_ENV !== 'production') {
  try {
    fsSync.watch(DATA_DIR, { persistent: false }, (_event, filename) => {
      if (!filename || !filename.endsWith('.json')) return;
      clearCache();
    });
  } catch (_) {
    /* fs.watch unsupported on this platform; use POST /_cache/clear */
  }
}

module.exports = { loadJson, clearCache, bus };
