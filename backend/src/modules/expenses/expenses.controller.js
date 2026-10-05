// =============================================================================
// modules/expenses/expenses.controller.js
// =============================================================================
const service = require('./expenses.service');

async function add(req, res, next) {
  try {
    const data = await service.addExpense(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { from, to, category, added_by } = req.query;
    const data = await service.listExpenses({ from, to, category, added_by });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateExpense(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deleteExpense(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { add, list, update, remove };
