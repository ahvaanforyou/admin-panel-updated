// =============================================================================
// modules/orders/orders.controller.js
// =============================================================================
const service = require('./orders.service');

async function create(req, res, next) {
  try {
    const data = await service.createOrder(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { client_id, status } = req.query;
    const data = await service.listOrders({ client_id, status });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const data = await service.getOrderById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateOrder(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deleteOrder(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { create, list, getById, update, remove };
