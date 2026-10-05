// =============================================================================
// modules/team-finance/team-finance.controller.js
// =============================================================================
const service = require('./team-finance.service');

async function add(req, res, next) {
  try {
    const data = await service.addPayout(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { team_member_id, from, to } = req.query;
    const data = await service.listPayouts({ team_member_id, from, to });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getSummary(req, res, next) {
  try {
    const { from, to } = req.query;
    const data = await service.getPayoutSummaryByMember({ from, to });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updatePayout(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const data = await service.deletePayout(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { add, list, getSummary, update, remove };
