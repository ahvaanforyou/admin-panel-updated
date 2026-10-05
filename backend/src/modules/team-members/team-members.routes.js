// =============================================================================
// modules/team-members/team-members.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate } = require('../../middleware/validate');
const controller = require('./team-members.controller');

const createMemberSchema = z.object({
  name:  z.string().min(1, 'name is required'),
  email: z.string().email().optional().nullable(),
  role:  z.string().min(1, 'role is required'),

  // ── Customization point ────────────────────────────────────────────────
  // Add new team member fields here as the schema grows.
  // Example: phone: z.string().optional()
  // ────────────────────────────────────────────────────────────────────────
});

const updateMemberSchema = z.object({
  name:  z.string().min(1).optional(),
  email: z.string().email().optional().nullable(),
  role:  z.string().min(1).optional(),
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

router.post('/',    validate(createMemberSchema), controller.create);
router.get('/',     controller.list);
router.patch('/:id', validate(updateMemberSchema), controller.update);

module.exports = router;
