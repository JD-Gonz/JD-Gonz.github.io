// server.js
// Process entry point. Owns port resolution, logging, and graceful shutdown.
// All HTTP wiring lives in app.js so tests can share the same middleware
// stack without booting a real port.

'use strict';

const { createApp } = require('./app');

const PORT = Number(process.env.PORT) || 8080;
const app = createApp();

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
