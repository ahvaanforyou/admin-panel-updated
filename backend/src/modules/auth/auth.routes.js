// =============================================================================
// modules/auth/auth.routes.js
// =============================================================================
const router       = require('express').Router();
const { z }        = require('zod');
const { validate } = require('../../middleware/validate');
const { authenticate } = require('../../middleware/auth');
const controller   = require('./auth.controller');

const loginSchema = z.object({
  email:    z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const setPasswordSchema = z.object({
  email:       z.string().email('Valid email required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

/** POST /api/auth/login — Public login endpoint */
router.post('/login', validate(loginSchema), controller.login);

/** POST /api/auth/set-password — Set or update password */
router.post('/set-password', validate(setPasswordSchema), controller.setPassword);

/** GET /api/auth/me — Get authenticated user details */
router.get('/me', authenticate, controller.getMe);

module.exports = router;
