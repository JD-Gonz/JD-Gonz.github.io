#!/usr/bin/env node
// scripts/build.js
// Reads src/index.template.html + data/*.json and writes a fully rendered
// index.html at the repo root. That file is what GitHub Pages (or any other
// static host) serves — no Node runtime required in production.
//
// Usage: `npm run build`
// Writes: ./index.html

'use strict';

const path = require('path');
const fs = require('fs').promises;

// Reach into lib/render via its public API so the rendering pipeline is
// identical to what the Express server uses at runtime. One source of truth.
const { renderIndex, clearTemplateCache } = require('../lib/render');
const { clearCache } = require('../lib/content');

const OUT_PATH = path.join(__dirname, '..', 'index.html');

// Banner injected at the very top of the generated file so future editors
// don't mistake the artifact for the template.
const GENERATED_BANNER =
  '<!--\n' +
  '  GENERATED FILE — DO NOT EDIT DIRECTLY.\n' +
  '  Source template: src/index.template.html\n' +
  '  Content data:    data/site.json, data/highlights.json, data/projects.json\n' +
  '  Rebuild with:    npm run build\n' +
  '-->\n';

async function build() {
  // Start from a clean slate so a stale in-memory cache doesn't produce
  // a different output than a fresh process would (matters in CI).
  clearCache();
  clearTemplateCache();

  const rendered = await renderIndex();
  const output = GENERATED_BANNER + rendered;

  // Refuse to publish a file that still contains token placeholders — that
  // would mean data is missing or a new token was added without wiring.
  const leaks = output.match(/<!--@@[A-Z0-9_]+@@-->/g);
  if (leaks && leaks.length > 0) {
    throw new Error(
      `Build failed: unresolved tokens in output: ${leaks.join(', ')}`
    );
  }

  await fs.writeFile(OUT_PATH, output, 'utf8');
  console.log(
    `Wrote ${OUT_PATH} (${Buffer.byteLength(output, 'utf8')} bytes)`
  );
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
