// =============================================================================
// modules/payments/payments.controller.js
// =============================================================================
const service = require('./payments.service');

async function add(req, res, next) {
  try {
    const data = await service.addPayment(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { order_id, from, to } = req.query;
    const data = await service.listPayments({ order_id, from, to });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getOrderFinance(req, res, next) {
  try {
    const data = await service.getOrderFinance(req.params.orderId);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updatePayment(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deletePayment(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { add, list, getOrderFinance, update, remove };
