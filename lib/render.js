// lib/render.js
// Server-side template rendering for index.html.
//
// Strategy:
//   1. index.html contains token comments like <!--@@HIGHLIGHTS@@--> in the
//      places that used to hold hard-coded <article> lists.
//   2. On boot we read index.html once and keep it as the template source.
//   3. On each request we swap tokens for HTML generated from /data/*.json.
//   4. The rendered string is cached; POST /api/_cache/clear drops it.
//
// Rendering server-side (option B) avoids any first-paint fetch race with
// the jQuery carousel plugin, which measures reel width on window.load.

'use strict';

const path = require('path');
const fs = require('fs').promises;
const { loadJson } = require('./content');

const INDEX_PATH = path.join(__dirname, '..', 'index.html');

let templateCache = null;       // raw index.html on disk
let renderedCache = null;       // fully rendered HTML, ready to send

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Highlight article matches the original Personal Highlights markup exactly:
// <article class="col-4 col-12-mobile special">...</article>
function renderHighlight(item) {
  const href = esc(item.href);
  const image = esc(item.image);
  const alt = esc(item.alt);
  const title = esc(item.title);
  const description = esc(item.description);
  return (
    '          <article class="col-4 col-12-mobile special">\n' +
    `            <a href="${href}" target="_blank" class="image featured"><img\n` +
    `                src="${image}" alt="${alt}" /></a>\n` +
    '            <header>\n' +
    `              <h3><a href="${href}" target="_blank">${title}</a></h3>\n` +
    '            </header>\n' +
    '            <p>\n' +
    `              ${description}\n` +
    '            </p>\n' +
    '          </article>'
  );
}

// Project article matches the original Carousel markup exactly.
// Supports an optional distinct imageHref (e.g. Pollapalooza links its image
// to the live demo but its title to the GitHub repo).
function renderProject(item) {
  const imageHref = esc(item.imageHref || item.href);
  const titleHref = esc(item.href);
  const image = esc(item.image);
  const alt = esc(item.alt);
  const title = esc(item.title);
  const description = esc(item.description);
  return (
    '        <article>\n' +
    `          <a href="${imageHref}" target="_blank" class="image featured"><img\n` +
    `              src="${image}" alt="${alt}" /></a>\n` +
    '          <header>\n' +
    `            <h3><a href="${titleHref}" target="_blank">${title}</a></h3>\n` +
    '          </header>\n' +
    `          <p>${description}</p>\n` +
    '        </article>'
  );
}

async function loadTemplate() {
  if (!templateCache) {
    templateCache = await fs.readFile(INDEX_PATH, 'utf8');
  }
  return templateCache;
}

async function renderIndex() {
  if (renderedCache) return renderedCache;

  const [template, highlights, projects] = await Promise.all([
    loadTemplate(),
    loadJson('highlights'),
    loadJson('projects')
  ]);

  const highlightsHtml = highlights.map(renderHighlight).join('\n');
  // Carousel articles are separated by a blank line in the original markup.
  const projectsHtml = projects.map(renderProject).join('\n\n');

  renderedCache = template
    .replace('<!--@@HIGHLIGHTS@@-->', highlightsHtml)
    .replace('<!--@@PROJECTS@@-->', projectsHtml);

  return renderedCache;
}

function clearTemplateCache() {
  templateCache = null;
  renderedCache = null;
}

module.exports = { renderIndex, clearTemplateCache };
