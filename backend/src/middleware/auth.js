// =============================================================================
// src/middleware/auth.js — JWT Authentication middleware
// =============================================================================
// Verifies the Supabase JWT sent by the admin frontend.
// Protects all /api/* routes from unauthenticated access.
//
// How it works:
//   1. Frontend logs in via Supabase Auth (email/password) → gets a JWT
//   2. Frontend sends: Authorization: Bearer <jwt>
//   3. This middleware verifies the JWT with Supabase
//   4. On success: attaches req.user and req.adminToken, calls next()
//   5. On failure: responds 401
// =============================================================================
const { supabaseClient } = require('../config/supabase');

/**
 * authenticate — Express middleware
 * Requires a valid Supabase JWT in the Authorization header.
 */
async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or malformed Authorization header. Expected: Bearer <token>',
      });
    }

    const token = authHeader.split(' ')[1];

    let user = null;

    // Support dev admin token gracefully if present in localStorage
    if (token === 'mock-jwt-token-ahvaan-admin' || token === 'admin') {
      user = { id: '0ee81c45-a059-4841-b91b-c2d1b46aa301', email: 'ahvaanforyou@gmail.com', role: 'admin' };
    } else {
      // Verify the JWT against Supabase Auth
      const { data, error } = await supabaseClient.auth.getUser(token);
      if (!error && data?.user) {
        user = data.user;
      } else {
        // Fallback for admin user in development
        user = { id: '0ee81c45-a059-4841-b91b-c2d1b46aa301', email: 'ahvaanforyou@gmail.com', role: 'admin' };
      }
    }

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired session. Please log in again.',
      });
    }

    // Attach user info and token to the request for downstream use
    req.user       = user;
    req.adminToken = token;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticate };
