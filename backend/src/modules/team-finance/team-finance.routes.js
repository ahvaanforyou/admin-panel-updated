// =============================================================================
// modules/team-finance/team-finance.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, dateSchema, amountSchema } = require('../../middleware/validate');
const controller = require('./team-finance.controller');

const addPayoutSchema = z.object({
  team_member_id: z.string().min(1, 'team_member_id is required'),
  amount:         amountSchema,
  date:           dateSchema,
  payment_method: z.string().min(1, 'payment_method is required'),
  notes:          z.string().optional().nullable(),
});

/** POST /api/team-finance — Record a payout */
router.post('/', validate(addPayoutSchema), controller.add);

/** GET /api/team-finance — List payouts (?team_member_id=&from=&to=) */
router.get('/', controller.list);

/** GET /api/team-finance/summary — Aggregated totals per member (?from=&to=) */
router.get('/summary', controller.getSummary);

/** PATCH /api/team-finance/:id */
router.patch('/:id', controller.update);

/** DELETE /api/team-finance/:id */
router.delete('/:id', controller.remove);

module.exports = router;
