// =============================================================================
// modules/clients/clients.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, dateSchema, amountSchema } = require('../../middleware/validate');
const controller = require('./clients.controller');

// ── Validation schemas ────────────────────────────────────────────────────

const orderItemSchema = z.object({
  template_id: z.string().optional().nullable().or(z.literal('')),
  event_name:  z.string().min(1, 'event_name is required'),
  event_date:  dateSchema,
  notes:       z.string().optional().nullable(),
});

const createClientSchema = z.object({
  // Client fields
  name:  z.string().min(1, 'name is required'),
  email: z.string().optional().nullable().or(z.literal('')),
  phone: z.string().optional().nullable().or(z.literal('')),

  // Initial order (required on client creation per PRD §4)
  order: z.object({
    total_amount:    amountSchema,
    order_date:      dateSchema,
    submission_date: dateSchema,
    items:           z.array(orderItemSchema).min(1, 'At least one order item is required'),
  }),
});

const updateClientSchema = z.object({
  name:         z.string().min(1).optional(),
  email:        z.string().optional().nullable().or(z.literal('')),
  phone:        z.string().optional().nullable().or(z.literal('')),
  total_amount: z.union([z.number(), z.string()]).optional(),
  event_name:   z.string().optional(),
  event_date:   z.string().optional(),
  status:       z.string().optional(),
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field to update is required' });

// ── Routes ────────────────────────────────────────────────────────────────

/** POST /api/clients — Create client + first order + items (transactional) */
router.post('/', validate(createClientSchema), controller.create);

/** GET /api/clients — List all clients (?search=term) */
router.get('/', controller.list);

/** GET /api/clients/:id — Get client with all orders and items */
router.get('/:id', controller.getById);

/** PATCH /api/clients/:id — Update client details */
router.patch('/:id', validate(updateClientSchema), controller.update);

module.exports = router;
