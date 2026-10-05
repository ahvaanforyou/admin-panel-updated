// =============================================================================
// src/config/supabase.js — Supabase client instances
// =============================================================================
// TWO clients are exported:
//
//   supabaseAdmin  — uses the service_role key, bypasses RLS.
//                    Used for all backend operations (trusted server code).
//
//   supabaseClient — uses the anon key + a user JWT.
//                    Used for Auth verification only.
//
// The backend always uses supabaseAdmin to talk to the DB.
// RLS still runs on the DB side enforced by Postgres policies.
// =============================================================================
const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

const ws = require('ws');

// ── Admin client (full access — server-side ONLY) ─────────────────────────
const supabaseAdmin = createClient(
  env.supabase.url,
  env.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
    realtime: {
      transport: ws,
    },
  }
);

// ── Public client (anon access — for Auth verification) ───────────────────
const supabaseClient = createClient(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
    realtime: {
      transport: ws,
    },
  }
);

module.exports = { supabaseAdmin, supabaseClient };
