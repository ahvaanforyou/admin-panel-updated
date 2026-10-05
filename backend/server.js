// =============================================================================
// server.js — HTTP server entry point
// =============================================================================
require('dotenv').config();
const app = require('./src/app');
const env = require('./src/config/env');

const server = app.listen(env.port, () => {
  console.log(`\n🚀 Ahvaan Backend running`);
  console.log(`   Environment : ${env.nodeEnv}`);
  console.log(`   Port        : ${env.port}`);
  console.log(`   Health      : http://localhost:${env.port}/health\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
