// =============================================================================
// modules/dashboard/dashboard.service.js
// =============================================================================
// Aggregates data for the admin dashboard (PRD §12).
// All queries use supabaseAdmin for efficient server-side aggregation.
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

/**
 * getStats
 * Returns top-level dashboard stats:
 *   - Total clients
 *   - Total orders
 *   - Completed projects (by completed_at month — PRD §7)
 *   - Revenue (sum of all payments received)
 */
async function getStats() {
  const [
    { count: totalClients, error: e1 },
    { count: totalOrders,  error: e2 },
    { data: completedItems, error: e3 },
    { data: revenueData,    error: e4 },
  ] = await Promise.all([
    supabaseAdmin.from('clients').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }),
    // Completed projects use completed_at, not order_date (PRD §7)
    supabaseAdmin
      .from('order_items')
      .select('completed_at')
      .eq('status', 'Completed')
      .not('completed_at', 'is', null),
    supabaseAdmin
      .from('payments')
      .select('amount'),
  ]);

  if (e1 || e2 || e3 || e4) {
    throw createError(500, 'Failed to fetch dashboard stats');
  }

  // Group completed items by month (YYYY-MM)
  const completedByMonth = {};
  for (const item of (completedItems || [])) {
    const month = item.completed_at.slice(0, 7); // "2026-10"
    completedByMonth[month] = (completedByMonth[month] || 0) + 1;
  }

  const totalRevenue = (revenueData || []).reduce((sum, p) => sum + Number(p.amount), 0);

  return {
    total_clients:       totalClients,
    total_orders:        totalOrders,
    completed_projects:  completedItems?.length || 0,
    completed_by_month:  completedByMonth,
    total_revenue:       totalRevenue,
  };
}

/**
 * getRecentClients
 * Returns the 10 most recently added clients with their latest order info.
 * Used by the Figma dashboard "Recent Clients" section (PRD §12).
 */
async function getRecentClients(limit = 10) {
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select(`
      client_id, name, email, phone, created_at,
      orders (
        order_id, status, total_amount, order_date, created_at,
        order_items (count)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw createError(500, error.message);
  return data;
}

/**
 * getFinanceSummary
 * Finance summary for a date range:
 *   - Total revenue (payments received)
 *   - Total expenses
 *   - Total team payouts
 *   - Net (revenue - expenses - payouts)
 */
async function getFinanceSummary({ from, to } = {}) {
  const buildQuery = (table, column) => {
    let q = supabaseAdmin.from(table).select(column);
    if (from) q = q.gte('date', from);
    if (to)   q = q.lte('date', to);
    return q;
  };

  // For payments, the date column is payment_date
  const buildPaymentQuery = () => {
    let q = supabaseAdmin.from('payments').select('amount');
    if (from) q = q.gte('payment_date', from);
    if (to)   q = q.lte('payment_date', to);
    return q;
  };

  const [
    { data: paymentData,  error: e1 },
    { data: expenseData,  error: e2 },
    { data: payoutData,   error: e3 },
  ] = await Promise.all([
    buildPaymentQuery(),
    buildQuery('expenses',     'amount'),
    buildQuery('team_finance', 'amount'),
  ]);

  if (e1 || e2 || e3) throw createError(500, 'Failed to fetch finance summary');

  const sumAmounts = (rows) => (rows || []).reduce((s, r) => s + Number(r.amount), 0);

  const revenue  = sumAmounts(paymentData);
  const expenses = sumAmounts(expenseData);
  const payouts  = sumAmounts(payoutData);

  return {
    from:           from || null,
    to:             to   || null,
    total_revenue:  revenue,
    total_expenses: expenses,
    total_payouts:  payouts,
    net:            revenue - expenses - payouts,
  };
}

/**
 * getTeamPayoutSummary
 * Returns total payout per team member for a date range.
 */
async function getTeamPayoutSummary({ from, to } = {}) {
  let query = supabaseAdmin
    .from('team_finance')
    .select('team_member_id, amount, date, team_members(name, role)');

  if (from) query = query.gte('date', from);
  if (to)   query = query.lte('date', to);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);

  // Aggregate per member
  const map = {};
  for (const row of (data || [])) {
    const id = row.team_member_id;
    if (!map[id]) {
      map[id] = {
        team_member_id: id,
        name:           row.team_members.name,
        role:           row.team_members.role,
        total_payout:   0,
        record_count:   0,
      };
    }
    map[id].total_payout += Number(row.amount);
    map[id].record_count += 1;
  }

  return Object.values(map).sort((a, b) => b.total_payout - a.total_payout);
}

module.exports = { getStats, getRecentClients, getFinanceSummary, getTeamPayoutSummary };
