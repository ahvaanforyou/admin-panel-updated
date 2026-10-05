// =============================================================================
// modules/tasks/tasks.service.js
// =============================================================================
// Key PRD rules:
//   • Upcoming / Overdue are DERIVED states — never stored (PRD §8)
//   • due_at is timestamptz (not date) because UI shows time
//   • Active = not Completed and not Cancelled
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

/**
 * derivedState — computes Upcoming/Overdue for a task
 * Returns null for Completed/Cancelled tasks (they are not active work)
 */
function derivedState(task) {
  if (task.status === 'Completed' || task.status === 'Cancelled') return null;
  return new Date(task.due_at) > new Date() ? 'Upcoming' : 'Overdue';
}

/** Attach derived_state to each task in a list */
function withDerivedState(tasks) {
  return tasks.map((t) => ({ ...t, derived_state: derivedState(t) }));
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * createTask
 */
async function createTask(payload) {
  // 1. Resolve assigned_to
  let assignedTo = payload.assigned_to;
  if (!assignedTo || !UUID_REGEX.test(assignedTo)) {
    const { data: tm } = await supabaseAdmin
      .from('team_members')
      .select('team_member_id')
      .ilike('name', `%${payload.assigned_to || ''}%`)
      .limit(1);
    assignedTo = tm?.[0]?.team_member_id;
    if (!assignedTo) {
      const { data: firstTm } = await supabaseAdmin.from('team_members').select('team_member_id').limit(1);
      assignedTo = firstTm?.[0]?.team_member_id;
    }
  }

  // 2. Resolve order_id
  let orderId = payload.order_id;
  if (!orderId || !UUID_REGEX.test(orderId)) {
    const { data: ord } = await supabaseAdmin.from('orders').select('order_id').limit(1);
    orderId = ord?.[0]?.order_id;
    if (!orderId) {
      // Create a default operations client & order if none exists
      const { data: newClient } = await supabaseAdmin.from('clients').insert({
        name: 'Ahvaan Operations',
        email: 'ahvaanforyou@gmail.com',
        phone: '+91 0000000000'
      }).select('client_id').single();
      const { data: newOrder } = await supabaseAdmin.from('orders').insert({
        client_id: newClient.client_id,
        total_amount: 0,
        order_date: new Date().toISOString().slice(0, 10),
        submission_date: new Date().toISOString().slice(0, 10),
        status: 'In Progress'
      }).select('order_id').single();
      orderId = newOrder.order_id;
    }
  }

  // 3. Resolve task_label (ensure it satisfies check constraint)
  const validDbLabels = [
    'Backend', 'Frontend', 'Bug', 'Database',
    'Invitation', 'New Template', 'Customization',
    'Revision', 'Research', 'Automation', 'Other'
  ];
  let taskLabel = payload.task_label;
  if (!validDbLabels.includes(taskLabel)) {
    if (taskLabel === 'Design') taskLabel = 'Invitation';
    else if (taskLabel === 'Development') taskLabel = 'Frontend';
    else if (taskLabel === 'Content') taskLabel = 'Customization';
    else taskLabel = 'Other';
  }

  // 4. Resolve due_at
  let dueAt = payload.due_at;
  try {
    dueAt = dueAt ? new Date(dueAt).toISOString() : new Date(Date.now() + 86400000 * 2).toISOString();
  } catch {
    dueAt = new Date(Date.now() + 86400000 * 2).toISOString();
  }

  const cleanPayload = {
    task_title: payload.task_title,
    order_id: orderId,
    assigned_to: assignedTo,
    description: payload.description || '',
    priority: ['Low', 'Medium', 'High', 'Urgent'].includes(payload.priority) ? payload.priority : 'High',
    task_label: taskLabel,
    status: ['Pending', 'In Progress', 'Review', 'Completed', 'Cancelled'].includes(payload.status) ? payload.status : 'In Progress',
    due_at: dueAt,
  };

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .insert(cleanPayload)
    .select('*, orders(order_id, clients(name)), team_members(name, role)')
    .single();

  if (error) throw createError(400, error.message, 'Task Creation Failed');
  return { ...data, derived_state: derivedState(data) };
}

/**
 * listTasks
 * Supports filtering by status, assigned_to, order_id, priority.
 * Attaches derived_state (Upcoming/Overdue) to each active task.
 */
async function listTasks({ status, assigned_to, order_id, priority } = {}) {
  let query = supabaseAdmin
    .from('tasks')
    .select('*, orders(order_id, clients(name)), team_members(name, role)')
    .order('due_at', { ascending: true });

  if (status)      query = query.eq('status', status);
  if (assigned_to) query = query.eq('assigned_to', assigned_to);
  if (order_id)    query = query.eq('order_id', order_id);
  if (priority)    query = query.eq('priority', priority);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);
  return withDerivedState(data);
}

/**
 * getTodaysTasks
 * Returns all tasks due today OR overdue active tasks.
 * Useful for the Dashboard "Today's Tasks" section (PRD §12).
 */
async function getTodaysTasks() {
  const today      = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const startOfDay = `${today}T00:00:00.000Z`;
  const endOfDay   = `${today}T23:59:59.999Z`;

  // Active tasks: due today OR overdue (due_at <= end of today, status not done)
  const { data, error } = await supabaseAdmin
    .from('tasks')
    .select('*, team_members(name, role), orders(order_id, clients(name))')
    .not('status', 'in', '("Completed","Cancelled")')
    .lte('due_at', endOfDay)
    .order('due_at', { ascending: true });

  if (error) throw createError(500, error.message);
  return withDerivedState(data);
}

/**
 * updateTask
 */
async function updateTask(taskId, updates) {
  if (!UUID_REGEX.test(taskId)) {
    throw createError(400, `Invalid task ID: ${taskId}`);
  }

  const cleanUpdates = { ...updates };
  if (cleanUpdates.assigned_to && !UUID_REGEX.test(cleanUpdates.assigned_to)) {
    const { data: tm } = await supabaseAdmin
      .from('team_members')
      .select('team_member_id')
      .ilike('name', `%${cleanUpdates.assigned_to}%`)
      .limit(1);
    if (tm?.[0]) {
      cleanUpdates.assigned_to = tm[0].team_member_id;
    }
  }
  // remove any non-db fields
  delete cleanUpdates.assigned_to_name;
  delete cleanUpdates.derived_state;

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .update(cleanUpdates)
    .eq('task_id', taskId)
    .select('*, team_members(name, role)')
    .single();

  if (error) throw createError(400, error.message, 'Task Update Failed');
  if (!data) throw createError(404, `Task ${taskId} not found`, 'Not Found');
  return { ...data, derived_state: derivedState(data) };
}

async function deleteTask(taskId) {
  if (!UUID_REGEX.test(taskId)) {
    throw createError(400, `Invalid task ID: ${taskId}`);
  }

  const { error } = await supabaseAdmin
    .from('tasks')
    .delete()
    .eq('task_id', taskId);

  if (error) throw createError(400, error.message);
  return { success: true, task_id: taskId };
}

module.exports = { createTask, listTasks, getTodaysTasks, updateTask, deleteTask };

