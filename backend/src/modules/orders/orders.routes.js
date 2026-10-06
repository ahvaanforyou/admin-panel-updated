// =============================================================================
// modules/orders/orders.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, dateSchema, amountSchema, statusSchema } = require('../../middleware/validate');
const controller = require('./orders.controller');

// ── Validation schemas ────────────────────────────────────────────────────

const orderItemSchema = z.object({
  template_id: z.string().uuid(),
  event_name:  z.string().min(1),
  event_date:  dateSchema,
  notes:       z.string().optional(),
});

const createOrderSchema = z.object({
  client_id:       z.string().uuid('client_id must be a UUID'),
  total_amount:    amountSchema,
  order_date:      dateSchema,
  submission_date: dateSchema,
  items:           z.array(orderItemSchema).optional(),
});

const updateOrderSchema = z.object({
  total_amount:    amountSchema.optional(),
  order_date:      dateSchema.optional(),
  submission_date: dateSchema.optional(),
  // NOTE: 'status' is intentionally excluded — calculated automatically from order items
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

// ── Routes ────────────────────────────────────────────────────────────────

/** POST /api/orders — Add new order to existing client */
router.post('/', validate(createOrderSchema), controller.create);

/** GET /api/orders — List orders (?client_id=&status=) */
router.get('/', controller.list);

/** GET /api/orders/:id — Get order with all items */
router.get('/:id', controller.getById);

/** PATCH /api/orders/:id — Edit order-level fields (not status) */
router.patch('/:id', validate(updateOrderSchema), controller.update);

/** DELETE /api/orders/:id — Delete order and cascade associated items and payments */
router.delete('/:id', controller.remove);

module.exports = router;
