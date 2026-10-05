// =============================================================================
// src/middleware/errorHandler.js — Global error handler
// =============================================================================
// Catches any error thrown in routes/controllers/services.
// Returns a clean JSON error response.
// =============================================================================
const env = require('../config/env');

/**
 * errorHandler — Express error middleware (4 args required)
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  // Log full error in development; keep it brief in production
  if (env.isDev) {
    console.error('[ERROR]', err);
  } else {
    console.error('[ERROR]', err.message);
  }

  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error:   'Validation Error',
      details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  // Known application errors (thrown with a status property)
  if (err.status) {
    return res.status(err.status).json({
      error:   err.error || 'Error',
      message: err.message,
    });
  }

  // Catch-all — hide internals in production
  return res.status(500).json({
    error:   'Internal Server Error',
    message: env.isDev ? err.message : 'Something went wrong. Please try again.',
  });
}

/**
 * createError — helper to throw structured errors from services
 * Usage: throw createError(404, 'Client not found');
 */
function createError(status, message, errorLabel = 'Error') {
  const err  = new Error(message);
  err.status = status;
  err.error  = errorLabel;
  return err;
}

module.exports = { errorHandler, createError };
