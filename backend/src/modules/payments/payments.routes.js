// =============================================================================
// modules/payments/payments.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, dateSchema, amountSchema } = require('../../middleware/validate');
const controller = require('./payments.controller');

const addPaymentSchema = z.object({
  order_id:       z.string().min(1, 'order_id is required'),
  amount:         amountSchema,
  payment_date:   dateSchema,
  payment_method: z.string().min(1, 'payment_method is required'),
  notes:          z.string().optional().nullable(),
});

/** POST /api/payments — Add a payment for an order */
router.post('/', validate(addPaymentSchema), controller.add);

/** GET /api/payments — List payments (?order_id=&from=YYYY-MM-DD&to=YYYY-MM-DD) */
router.get('/', controller.list);

/** GET /api/payments/orders/:orderId/finance — Get balance for one order */
/** PATCH /api/payments/:id */
router.patch('/:id', controller.update);

/** DELETE /api/payments/:id */
router.delete('/:id', controller.remove);

module.exports = router;
