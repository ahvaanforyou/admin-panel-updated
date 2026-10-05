// =============================================================================
// modules/dashboard/dashboard.controller.js
// =============================================================================
const service = require('./dashboard.service');

async function getStats(req, res, next) {
  try {
    const data = await service.getStats();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getRecentClients(req, res, next) {
  try {
    const limit = parseInt(req.query.limit || '10', 10);
    const data  = await service.getRecentClients(limit);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getFinanceSummary(req, res, next) {
  try {
    const { from, to } = req.query;
    const data = await service.getFinanceSummary({ from, to });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getTeamPayoutSummary(req, res, next) {
  try {
    const { from, to } = req.query;
    const data = await service.getTeamPayoutSummary({ from, to });
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { getStats, getRecentClients, getFinanceSummary, getTeamPayoutSummary };
