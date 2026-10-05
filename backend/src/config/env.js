// =============================================================================
// src/config/env.js — Central environment config loader
// =============================================================================
// All environment variables are read from ONE place.
// Add new variables here as your project grows.
// =============================================================================
require('dotenv').config();

const env = {
  // ── Supabase ──────────────────────────────────────────────────────────────
  supabase: {
    url:             process.env.SUPABASE_URL,
    anonKey:         process.env.SUPABASE_ANON_KEY,
    serviceRoleKey:  process.env.SUPABASE_SERVICE_ROLE_KEY,
  },

  // ── Server ────────────────────────────────────────────────────────────────
  port:        parseInt(process.env.PORT || '3001', 10),
  nodeEnv:     process.env.NODE_ENV || 'development',
  isDev:       (process.env.NODE_ENV || 'development') === 'development',
  isProd:      process.env.NODE_ENV === 'production',

  // ── CORS ──────────────────────────────────────────────────────────────────
  // Parse comma-separated origins from a single env var
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim()),

  // ── Customization point ───────────────────────────────────────────────────
  // Add new config sections here as the project grows. Example:
  //
  // email: {
  //   apiKey: process.env.RESEND_API_KEY,
  //   from:   process.env.EMAIL_FROM,
  // },
  // ─────────────────────────────────────────────────────────────────────────
};

// Validate required variables at startup
const required = [
  ['SUPABASE_URL',              env.supabase.url],
  ['SUPABASE_ANON_KEY',         env.supabase.anonKey],
  ['SUPABASE_SERVICE_ROLE_KEY', env.supabase.serviceRoleKey],
];

for (const [name, value] of required) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Check your .env file.`);
  }
}

module.exports = env;
