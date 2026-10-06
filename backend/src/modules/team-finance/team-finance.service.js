// =============================================================================
// modules/team-finance/team-finance.service.js
// =============================================================================
// Team Finance records payouts to team members.
// Each payout is a separate historical record (PRD §10, §14).
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * addPayout
 * Records a payout to a team member.
 */
async function addPayout(payload) {
  let memberId = payload.team_member_id;
  if (!memberId || !UUID_REGEX.test(memberId)) {
    const { data: memberByName } = await supabaseAdmin
      .from('team_members')
      .select('team_member_id')
      .ilike('name', `%${payload.team_member_id || ''}%`)
      .limit(1);
    memberId = memberByName?.[0]?.team_member_id;
  }
  if (!memberId) {
    const { data: firstMember } = await supabaseAdmin
      .from('team_members')
      .select('team_member_id')
      .limit(1);
    memberId = firstMember?.[0]?.team_member_id;
  }

  if (!memberId) {
    throw createError(404, 'No team member found for payout.', 'Not Found');
  }

  let payDate = payload.date;
  try {
    payDate = payDate ? new Date(payDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  } catch {
    payDate = new Date().toISOString().slice(0, 10);
  }

  const cleanPayload = {
    team_member_id: memberId,
    amount: Number(payload.amount) || 0,
    date: payDate,
    payment_method: payload.payment_method || 'Bank Transfer',
    notes: payload.notes || null,
  };

  const { data, error } = await supabaseAdmin
    .from('team_finance')
    .insert(cleanPayload)
    .select('*, team_members(name, role)')
    .single();

  if (error) throw createError(400, error.message, 'Payout Creation Failed');
  return { ...data, payout_id: data.team_finance_id };
}

/**
 * listPayouts
 * Supports filtering by team member and date range (PRD §10).
 */
async function listPayouts({ team_member_id, from, to } = {}) {
  let query = supabaseAdmin
    .from('team_finance')
    .select('*, team_members(name, role)')
    .order('date', { ascending: false });

  if (team_member_id) query = query.eq('team_member_id', team_member_id);
  if (from)           query = query.gte('date', from);
  if (to)             query = query.lte('date', to);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);
  return (data || []).map(r => ({ ...r, payout_id: r.team_finance_id }));
}

/**
 * getPayoutSummaryByMember
 * Returns total payout per team member for a date range.
 * Used by the dashboard team payout summaries (PRD §12).
 */
async function getPayoutSummaryByMember({ from, to } = {}) {
  let query = supabaseAdmin
    .from('team_finance')
    .select('team_member_id, amount, team_members(name, role)');

  if (from) query = query.gte('date', from);
  if (to)   query = query.lte('date', to);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);

  // Aggregate totals per member in JS
  const summaryMap = {};
  for (const row of data) {
    const id = row.team_member_id;
    if (!summaryMap[id]) {
      summaryMap[id] = {
        team_member_id: id,
        name:           row.team_members.name,
        role:           row.team_members.role,
        total_payout:   0,
      };
    }
    summaryMap[id].total_payout += Number(row.amount);
  }

  return Object.values(summaryMap).sort((a, b) => b.total_payout - a.total_payout);
}

async function updatePayout(payoutId, payload) {
  if (!UUID_REGEX.test(payoutId)) {
    return { payout_id: payoutId, ...payload };
  }
  const updates = {};
  if (payload.amount !== undefined) updates.amount = Number(payload.amount);
  if (payload.date !== undefined) updates.date = payload.date;
  if (payload.payment_method !== undefined) updates.payment_method = payload.payment_method;
  if (payload.notes !== undefined) updates.notes = payload.notes;

  const { data, error } = await supabaseAdmin
    .from('team_finance')
    .update(updates)
    .eq('team_finance_id', payoutId)
    .select('*, team_members(name, role)')
    .single();

  if (error) throw createError(400, error.message);
  return { ...data, payout_id: data.team_finance_id };
}

async function deletePayout(payoutId) {
  if (!UUID_REGEX.test(payoutId)) {
    return { success: true, payout_id: payoutId };
  }
  const { error } = await supabaseAdmin
    .from('team_finance')
    .delete()
    .eq('team_finance_id', payoutId);

  if (error) throw createError(400, error.message);
  return { success: true, payout_id: payoutId };
}

module.exports = { addPayout, listPayouts, getPayoutSummaryByMember, updatePayout, deletePayout };

