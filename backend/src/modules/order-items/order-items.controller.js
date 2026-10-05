// =============================================================================
// modules/order-items/order-items.controller.js
// =============================================================================
const service = require('./order-items.service');

async function add(req, res, next) {
  try {
    const data = await service.addOrderItem(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateOrderItem(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function changeStatus(req, res, next) {
  try {
    const data = await service.changeOrderItemStatus(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function cancel(req, res, next) {
  try {
    const data = await service.cancelOrderItem(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { add, update, changeStatus, cancel };
