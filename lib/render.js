// lib/render.js
// Server-side template rendering for index.html.
//
// Strategy:
//   1. index.html contains token comments like <!--@@HIGHLIGHTS@@--> in the
//      places that used to hold hard-coded markup or copy.
//   2. On boot we read index.html once and keep it as the template source.
//   3. On each request we swap tokens for HTML generated from /data/*.json.
//   4. The rendered string is cached; POST /api/_cache/clear (or, in dev,
//      a file change picked up by lib/content.js) drops it.
//
// Convention:
//   - Plain string fields (e.g. about.lede) are HTML-escaped before insertion.
//   - Fields whose name ends in "Html" (e.g. banner.bodyHtml, copyright.itemsHtml)
//     are inserted raw. Use this for trusted snippets that contain markup.

'use strict';

const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const { loadJson, bus } = require('./content');

// Source of truth for the page. Committed index.html at the repo root is a
// BUILD ARTIFACT (produced by scripts/build.js) so GitHub Pages can serve
// the site statically. Never read or write it here.
const TEMPLATE_PATH = path.join(__dirname, '..', 'src', 'index.template.html');

let templateCache = null;
let renderedCache = null;

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHighlight(item) {
  const href = esc(item.href);
  return (
    '          <article class="col-4 col-12-mobile special">\n' +
    `            <a href="${href}" target="_blank" class="image featured"><img\n` +
    `                src="${esc(item.image)}" alt="${esc(item.alt)}" /></a>\n` +
    '            <header>\n' +
    `              <h3><a href="${href}" target="_blank">${esc(item.title)}</a></h3>\n` +
    '            </header>\n' +
    '            <p>\n' +
    `              ${esc(item.description)}\n` +
    '            </p>\n' +
    '          </article>'
  );
}

// Projects support an optional distinct imageHref (e.g. Pollapalooza links
// its image to the live demo but its title to the GitHub repo).
function renderProject(item) {
  const imageHref = esc(item.imageHref || item.href);
  const titleHref = esc(item.href);
  return (
    '        <article>\n' +
    `          <a href="${imageHref}" target="_blank" class="image featured"><img\n` +
    `              src="${esc(item.image)}" alt="${esc(item.alt)}" /></a>\n` +
    '          <header>\n' +
    `            <h3><a href="${titleHref}" target="_blank">${esc(item.title)}</a></h3>\n` +
    '          </header>\n' +
    `          <p>${esc(item.description)}</p>\n` +
    '        </article>'
  );
}

function renderOgMeta(og) {
  if (!og) return '';
  const entries = [
    ['og:title', og.title],
    ['og:description', og.description],
    ['og:image', og.image],
    ['og:url', og.url],
    ['og:type', og.type]
  ].filter(([, v]) => v != null);
  return entries
    .map(([prop, val]) => `  <meta property="${esc(prop)}" content="${esc(val)}">`)
    .join('\n');
}

function renderContactLinks(links = []) {
  return links
    .map((l) =>
      '                <li><a href="' +
      esc(l.href) +
      '" target="_blank" class="' +
      esc(l.iconClass) +
      '"><span class="label">' +
      esc(l.label) +
      '</span></a></li>'
    )
    .join('\n');
}

function renderCopyrightItems(itemsHtml = []) {
  // itemsHtml entries are trusted markup snippets (e.g. "&copy; …", links).
  return itemsHtml.map((h) => `                <li>${h}</li>`).join('\n');
}

async function loadTemplate() {
  if (!templateCache) {
    templateCache = await fs.readFile(TEMPLATE_PATH, 'utf8');
  }
  return templateCache;
}

// Build the token map once per render so we never leak state between requests.
function buildTokens(site, highlights, projects) {
  const tokens = {
    // Meta / head
    META_TITLE: esc(site.meta && site.meta.title),
    META_OG: renderOgMeta(site.meta && site.meta.og),

    // Header
    HEADER_LOGO: esc(site.header && site.header.logo),
    HEADER_TAGLINE: esc(site.header && site.header.tagline),

    // About
    ABOUT_IMAGE_SRC: esc(site.about && site.about.image && site.about.image.src),
    ABOUT_IMAGE_ALT: esc(site.about && site.about.image && site.about.image.alt),
    ABOUT_HEADING: esc(site.about && site.about.heading),
    ABOUT_LEDE: esc(site.about && site.about.lede),
    ABOUT_BODY: esc(site.about && site.about.body),

    // Highlights intro
    HIGHLIGHTS_HEADING: esc(site.highlightsIntro && site.highlightsIntro.heading),
    HIGHLIGHTS_INTRO: esc(site.highlightsIntro && site.highlightsIntro.body),

    // Banner — bodyHtml is raw-trusted (contains <a>, <br>)
    BANNER_HEADING: esc(site.banner && site.banner.heading),
    BANNER_BODY: (site.banner && site.banner.bodyHtml) || '',

    // Contact
    CONTACT_HEADING: esc(site.contact && site.contact.heading),
    CONTACT_LINKS: renderContactLinks(site.contact && site.contact.links),
    CONTACT_RESUME_HREF: esc(site.contact && site.contact.resume && site.contact.resume.href),
    CONTACT_RESUME_LABEL: esc(site.contact && site.contact.resume && site.contact.resume.label),

    // Copyright — itemsHtml is raw-trusted
    COPYRIGHT_ITEMS: renderCopyrightItems(site.copyright && site.copyright.itemsHtml),

    // Lists rendered from their own JSON files
    HIGHLIGHTS: highlights.map(renderHighlight).join('\n'),
    PROJECTS: projects.map(renderProject).join('\n\n')
  };
  return tokens;
}

function applyTokens(template, tokens) {
  // Replace every @@NAME@@ comment in a single pass. Unknown tokens are
  // left alone so the failure mode is visible ("@@TYPO@@" in the HTML)
  // rather than silently swallowing content.
  return template.replace(/<!--@@([A-Z0-9_]+)@@-->/g, (match, name) => {
    return Object.prototype.hasOwnProperty.call(tokens, name) ? tokens[name] : match;
  });
}

async function renderIndex() {
  if (renderedCache) return renderedCache;

  const [template, site, highlights, projects] = await Promise.all([
    loadTemplate(),
    loadJson('site'),
    loadJson('highlights'),
    loadJson('projects')
  ]);

  const tokens = buildTokens(site, highlights, projects);
  renderedCache = applyTokens(template, tokens);
  return renderedCache;
}

function clearTemplateCache() {
  templateCache = null;
  renderedCache = null;
}

// When /data/*.json changes (manual cache clear or a dev-mode fs.watch event),
// drop the rendered HTML so the next request picks up the new content.
bus.on('invalidated', () => {
  renderedCache = null;
});

// Dev-only: when the template changes, drop the cache so nodemon-less edits
// are picked up without a restart.
if (process.env.NODE_ENV !== 'production') {
  try {
    fsSync.watch(TEMPLATE_PATH, { persistent: false }, () => {
      clearTemplateCache();
    });
  } catch (_) {
    /* fs.watch not available on this platform; caller can POST /_cache/clear */
  }
}

module.exports = { renderIndex, clearTemplateCache };
