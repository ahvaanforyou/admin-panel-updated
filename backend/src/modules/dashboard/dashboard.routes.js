// =============================================================================
// modules/dashboard/dashboard.routes.js
// =============================================================================
const router     = require('express').Router();
const controller = require('./dashboard.controller');

/** GET /api/dashboard/stats — Total clients, orders, completed projects, revenue */
router.get('/stats', controller.getStats);

/** GET /api/dashboard/bootstrap — Fast single-trip payload of all dashboard & operational data */
router.get('/bootstrap', controller.getBootstrapData);

/** GET /api/dashboard/recent-clients — Recent client/order info (?limit=10) */
router.get('/recent-clients', controller.getRecentClients);

/** GET /api/dashboard/finance — Finance summary (?from=YYYY-MM-DD&to=YYYY-MM-DD) */
router.get('/finance', controller.getFinanceSummary);

/** GET /api/dashboard/team-payouts — Team payout summaries (?from=&to=) */
router.get('/team-payouts', controller.getTeamPayoutSummary);

// ── Customization point ───────────────────────────────────────────────────
// Add new analytics endpoints here as the dashboard grows.
// Example: router.get('/analytics/monthly', controller.getMonthlyAnalytics);
// ─────────────────────────────────────────────────────────────────────────

module.exports = router;
