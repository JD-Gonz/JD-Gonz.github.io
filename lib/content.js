// lib/content.js
// Shared async loader + in-memory cache for /data/*.json.
// Both the JSON API and the HTML template renderer read through this module,
// so a single POST /api/_cache/clear invalidates every caller at once.

'use strict';

const path = require('path');
const fs = require('fs').promises;

const DATA_DIR = path.join(__dirname, '..', 'data');
const cache = new Map();

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
}

module.exports = { loadJson, clearCache };
