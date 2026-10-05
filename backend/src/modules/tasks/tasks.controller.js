// =============================================================================
// modules/tasks/tasks.controller.js
// =============================================================================
const service = require('./tasks.service');

async function create(req, res, next) {
  try {
    const data = await service.createTask(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { status, assigned_to, order_id, priority } = req.query;
    const data = await service.listTasks({ status, assigned_to, order_id, priority });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getToday(req, res, next) {
  try {
    const data = await service.getTodaysTasks();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateTask(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deleteTask(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { create, list, getToday, update, remove };
