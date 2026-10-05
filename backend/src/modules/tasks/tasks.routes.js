// =============================================================================
// modules/tasks/tasks.routes.js
// =============================================================================
const router     = require('express').Router();
const { z }      = require('zod');
const { validate, statusSchema, taskPrioritySchema, taskLabelSchema } = require('../../middleware/validate');
const controller = require('./tasks.controller');

const createTaskSchema = z.object({
  task_title:  z.string().min(1, 'task_title is required'),
  order_id:    z.string().optional().nullable().or(z.literal('')),
  assigned_to: z.string().optional().nullable().or(z.literal('')),
  description: z.string().optional().nullable(),
  priority:    z.string().optional().default('High'),
  task_label:  z.string().optional().default('Other'),
  status:      z.string().optional().default('Pending'),
  due_at:      z.string().optional().nullable().or(z.literal('')),
  start_date:  z.string().optional().nullable(),
  notes:       z.string().optional().nullable(),
});

const updateTaskSchema = z.object({
  task_title:  z.string().min(1).optional(),
  assigned_to: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  priority:    z.string().optional(),
  task_label:  z.string().optional(),
  status:      z.string().optional(),
  due_at:      z.string().optional(),
  start_date:  z.string().optional().nullable(),
  notes:       z.string().optional().nullable(),
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

/** GET /api/tasks/today — Today's tasks (must be before /:id) */
router.get('/today', controller.getToday);

/** POST /api/tasks */
router.post('/', validate(createTaskSchema), controller.create);

/** GET /api/tasks — ?status=&assigned_to=&order_id=&priority= */
router.get('/', controller.list);

/** PATCH /api/tasks/:id */
router.patch('/:id', validate(updateTaskSchema), controller.update);

/** DELETE /api/tasks/:id */
router.delete('/:id', controller.remove);

module.exports = router;
