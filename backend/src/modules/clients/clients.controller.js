// =============================================================================
// modules/clients/clients.controller.js
// =============================================================================
const service = require('./clients.service');

async function create(req, res, next) {
  try {
    const result = await service.createClientWithOrder(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { search } = req.query;
    const data = await service.listClients({ search });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const data = await service.getClientById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateClient(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deleteClient(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function removeBatch(req, res, next) {
  try {
    const { client_ids } = req.body;
    const data = await service.deleteClients(client_ids || []);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { create, list, getById, update, remove, removeBatch };
