// test/app.test.js
// Integration tests that run against the real Express app on an ephemeral
// port. These guard the "backend changes never break the UI" contract:
//   1. Every project title in data/projects.json reaches the HTML.
//   2. Every highlight title in data/highlights.json reaches the HTML.
//   3. Site copy from data/site.json is present.
//   4. JSON API endpoints respond with the same payloads the renderer uses.
//   5. No unresolved @@TOKEN@@ comments leak into the response.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { createApp } = require('../app');
const highlights = require('../data/highlights.json');
const projects = require('../data/projects.json');
const site = require('../data/site.json');

function request(server, urlPath, method = 'GET') {
  const { port } = server.address();
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: '127.0.0.1', port, path: urlPath, method },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () =>
          resolve({ status: res.statusCode, headers: res.headers, body })
        );
      }
    );
    req.on('error', reject);
    req.end();
  });
}

// Boot the app once per file on an OS-assigned port. All tests share it.
const app = createApp();
const server = app.listen(0);
test.after(() => new Promise((r) => server.close(r)));

test('GET / renders every project title from data/projects.json', async () => {
  const { status, body } = await request(server, '/');
  assert.equal(status, 200);
  for (const p of projects) {
    assert.ok(
      body.includes(p.title),
      `rendered HTML missing project title: ${p.title}`
    );
  }
});

test('GET / renders every highlight title from data/highlights.json', async () => {
  const { body } = await request(server, '/');
  for (const h of highlights) {
    assert.ok(
      body.includes(h.title),
      `rendered HTML missing highlight title: ${h.title}`
    );
  }
});

test('GET / renders site.json copy (title, about, banner, contact)', async () => {
  const { body } = await request(server, '/');
  assert.ok(body.includes(`<title>${site.meta.title}</title>`), 'missing <title>');
  assert.ok(body.includes(site.header.logo), 'missing header logo');
  assert.ok(body.includes(site.about.heading), 'missing about heading');
  assert.ok(body.includes(site.banner.heading), 'missing banner heading');
  assert.ok(body.includes(site.contact.heading), 'missing contact heading');
  assert.ok(
    body.includes(site.contact.resume.href),
    'missing contact resume href'
  );
});

test('GET / leaves no unresolved @@TOKEN@@ comments in the response', async () => {
  const { body } = await request(server, '/');
  const leaked = body.match(/<!--@@[A-Z0-9_]+@@-->/g);
  assert.equal(leaked, null, `unresolved tokens: ${leaked && leaked.join(', ')}`);
});

test('GET /api/projects returns the full list', async () => {
  const { status, body, headers } = await request(server, '/api/projects');
  assert.equal(status, 200);
  assert.match(headers['content-type'], /application\/json/);
  const data = JSON.parse(body);
  assert.equal(data.length, projects.length);
  assert.equal(data[0].title, projects[0].title);
});

test('GET /api/highlights returns the full list', async () => {
  const { status, body } = await request(server, '/api/highlights');
  assert.equal(status, 200);
  const data = JSON.parse(body);
  assert.equal(data.length, highlights.length);
});

test('GET /api/site returns the configured sections', async () => {
  const { status, body } = await request(server, '/api/site');
  assert.equal(status, 200);
  const data = JSON.parse(body);
  for (const key of ['meta', 'header', 'about', 'banner', 'contact', 'copyright']) {
    assert.ok(data[key], `/api/site missing key: ${key}`);
  }
});

test('GET /api/unknown returns 404 JSON (does not fall through to SPA)', async () => {
  const { status, body, headers } = await request(server, '/api/nope');
  assert.equal(status, 404);
  assert.match(headers['content-type'], /application\/json/);
  const data = JSON.parse(body);
  assert.equal(data.error, 'Not Found');
});

test('Static asset GET /public/css/main.css serves with long cache', async () => {
  const { status, headers } = await request(server, '/public/css/main.css');
  assert.equal(status, 200);
  assert.match(headers['cache-control'], /max-age=604800/);
});

test('Security headers from helmet are present on /', async () => {
  const { headers } = await request(server, '/');
  assert.ok(headers['x-content-type-options'], 'missing X-Content-Type-Options');
  assert.ok(headers['referrer-policy'], 'missing Referrer-Policy');
});
