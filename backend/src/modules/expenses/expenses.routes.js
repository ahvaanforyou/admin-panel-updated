// =============================================================================
// modules/expenses/expenses.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, dateSchema, amountSchema } = require('../../middleware/validate');
const controller = require('./expenses.controller');

const addExpenseSchema = z.object({
  title:          z.string().min(1, 'title is required'),
  amount:         amountSchema,
  category:       z.string().min(1, 'category is required'),
  description:    z.string().optional().nullable(),
  date:           dateSchema,
  payment_method: z.string().min(1, 'payment_method is required'),
  added_by:       z.string().optional().nullable().or(z.literal('')),
  notes:          z.string().optional().nullable(),
});

const updateExpenseSchema = z.object({
  title:          z.string().min(1).optional(),
  amount:         amountSchema.optional(),
  category:       z.string().min(1).optional(),
  description:    z.string().optional().nullable(),
  date:           dateSchema.optional(),
  payment_method: z.string().min(1).optional(),
  notes:          z.string().optional().nullable(),
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

router.post('/',    validate(addExpenseSchema), controller.add);
router.get('/',     controller.list);   // ?from=&to=&category=&added_by=
router.patch('/:id', validate(updateExpenseSchema), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
