// =============================================================================
// modules/templates/templates.controller.js
// =============================================================================
const service = require('./templates.service');

async function create(req, res, next) {
  try {
    const data = await service.createTemplate(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { category, sub_category, search } = req.query;
    const data = await service.listTemplates({ category, sub_category, search });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const data = await service.getTemplateById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateTemplate(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deleteTemplate(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { create, list, getById, update, remove };
