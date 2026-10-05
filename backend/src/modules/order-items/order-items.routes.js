// =============================================================================
// modules/order-items/order-items.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, dateSchema, statusSchema } = require('../../middleware/validate');
const controller = require('./order-items.controller');

// ── Validation schemas ────────────────────────────────────────────────────

const addItemSchema = z.object({
  order_id:    z.string().uuid('order_id must be a UUID'),
  template_id: z.string().optional().nullable().or(z.literal('')),
  event_name:  z.string().min(1, 'event_name is required'),
  event_date:  dateSchema,
  notes:       z.string().optional(),
});

const updateItemSchema = z.object({
  template_id: z.string().uuid().optional(),
  event_name:  z.string().min(1).optional(),
  event_date:  dateSchema.optional(),
  notes:       z.string().optional(),
  // status and completed_at are handled by the /status endpoint
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

const changeStatusSchema = z.object({
  status:       statusSchema,
  completed_at: z.string().datetime({ offset: true }).optional().nullable(),
  // When status = 'Completed', completed_at MUST be provided.
  // The service validates this rule — schema accepts it as optional to give a clear error.
});

// ── Routes ────────────────────────────────────────────────────────────────

/** POST /api/order-items — Add item to existing order */
router.post('/', validate(addItemSchema), controller.add);

/** PATCH /api/order-items/:id — Edit item fields (not status) */
router.patch('/:id', validate(updateItemSchema), controller.update);

/** PATCH /api/order-items/:id/status — Change status → triggers order recalculation */
router.patch('/:id/status', validate(changeStatusSchema), controller.changeStatus);

/** DELETE /api/order-items/:id — Cancel this item */
router.delete('/:id', controller.cancel);

module.exports = router;
