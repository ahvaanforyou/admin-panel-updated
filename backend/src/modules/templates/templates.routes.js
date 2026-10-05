// =============================================================================
// modules/templates/templates.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, amountSchema } = require('../../middleware/validate');
const controller = require('./templates.controller');

// ── Customization point ───────────────────────────────────────────────────
// Template categories are free-text in the DB (no enum constraint).
// If you want to restrict them, add a CHECK constraint in schema.sql or
// add a z.enum() here.
// ─────────────────────────────────────────────────────────────────────────

const createTemplateSchema = z.object({
  name:         z.string().min(1, 'name is required'),
  category:     z.string().optional().default('Wedding'),
  sub_category: z.string().optional().nullable(),
  price:        amountSchema,
  description:  z.string().optional().nullable(),
  preview_url:  z.string().optional().nullable(),
  link:         z.string().optional().nullable(),
});

const updateTemplateSchema = z.object({
  name:         z.string().min(1).optional(),
  category:     z.string().min(1).optional(),
  sub_category: z.string().optional().nullable(),
  price:        amountSchema.optional(),
  description:  z.string().optional().nullable(),
  preview_url:  z.string().optional().nullable(),
  link:         z.string().optional().nullable(),
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

// ── Routes ────────────────────────────────────────────────────────────────

router.post('/',    validate(createTemplateSchema), controller.create);
router.get('/',     controller.list);    // ?category=&sub_category=&search=
router.get('/:id',  controller.getById);
router.patch('/:id', validate(updateTemplateSchema), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
