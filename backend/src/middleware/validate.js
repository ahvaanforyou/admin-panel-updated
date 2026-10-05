// =============================================================================
// src/middleware/validate.js — Request body validation (Zod)
// =============================================================================
// Usage in a route file:
//   const { validate } = require('../../middleware/validate');
//   const { z } = require('zod');
//
//   const schema = z.object({ name: z.string().min(1), ... });
//   router.post('/', validate(schema), controller.create);
// =============================================================================
const { z } = require('zod');

/**
 * validate — creates an Express middleware from a Zod schema.
 * Validates req.body and attaches the parsed result back to req.body.
 * Throws a ZodError on failure, which the global errorHandler catches.
 */
function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err); // ZodError → errorHandler formats it as 400
    }
  };
}

// =============================================================================
// SHARED REUSABLE SCHEMAS
// These are used across multiple modules to avoid duplication.
// =============================================================================

const STATUS_VALUES = ['Pending', 'In Progress', 'Review', 'Completed', 'Cancelled'];

/** Validates one of the 5 allowed statuses */
const statusSchema = z.string().optional().default('Pending');

/** Validates a date string (YYYY-MM-DD or ISO string) */
const dateSchema = z.string().optional().nullable().or(z.literal(''));

/** Validates a non-negative numeric amount (coerces strings) */
const amountSchema = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? 0 : Number(val)),
  z.number().nonnegative('Amount must be non-negative')
);

/** Validates a UUID or ID string */
const uuidSchema = z.string().optional().nullable().or(z.literal(''));

// ── Task-specific enums ───────────────────────────────────────────────────

const TASK_PRIORITY_VALUES = ['Low', 'Medium', 'High', 'Urgent'];
const TASK_LABEL_VALUES = [
  'Backend', 'Frontend', 'Bug', 'Database',
  'Invitation', 'New Template', 'Customization',
  'Revision', 'Research', 'Automation', 'Other',
  'Design', 'Development', 'Content',
];

const taskPrioritySchema = z.string().optional().default('High');
const taskLabelSchema    = z.string().optional().default('Other');

// ── Customization point ───────────────────────────────────────────────────
// Add new shared schemas here as the project grows.
// Example for a future payment_method enum:
//   const PAYMENT_METHODS = ['Cash', 'Bank Transfer', 'Card', 'Cheque'];
//   const paymentMethodSchema = z.enum(PAYMENT_METHODS);
// ─────────────────────────────────────────────────────────────────────────

module.exports = {
  validate,
  statusSchema,
  dateSchema,
  amountSchema,
  uuidSchema,
  taskPrioritySchema,
  taskLabelSchema,
  STATUS_VALUES,
  TASK_PRIORITY_VALUES,
  TASK_LABEL_VALUES,
};
