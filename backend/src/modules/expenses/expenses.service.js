// =============================================================================
// modules/expenses/expenses.service.js
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function addExpense(payload) {
  let addedBy = payload.added_by;
  if (!addedBy || !UUID_REGEX.test(addedBy)) {
    const { data: tm } = await supabaseAdmin
      .from('team_members')
      .select('team_member_id')
      .ilike('name', `%${payload.added_by || ''}%`)
      .limit(1);
    addedBy = tm?.[0]?.team_member_id;
    if (!addedBy) {
      const { data: firstTm } = await supabaseAdmin.from('team_members').select('team_member_id').limit(1);
      addedBy = firstTm?.[0]?.team_member_id;
    }
  }

  let expDate = payload.date;
  try {
    expDate = expDate ? new Date(expDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  } catch {
    expDate = new Date().toISOString().slice(0, 10);
  }

  // Ensure DB category matches check constraint
  const validDbCategories = ['Marketing', 'Tools', 'Other'];
  let dbCategory = payload.category;
  let userCategoryNote = '';
  if (!validDbCategories.includes(dbCategory)) {
    userCategoryNote = `[${dbCategory}] `;
    dbCategory = 'Other';
  }

  const cleanPayload = {
    title: payload.title,
    amount: Number(payload.amount) || 0,
    category: dbCategory,
    description: (userCategoryNote + (payload.description || '')).trim(),
    date: expDate,
    payment_method: payload.payment_method || 'Cash',
    added_by: addedBy,
    notes: payload.notes || null,
  };

  const { data, error } = await supabaseAdmin
    .from('expenses')
    .insert(cleanPayload)
    .select('*, team_members(name, role)')
    .single();

  if (error) throw createError(400, error.message, 'Expense Creation Failed');
  return { ...data, category: payload.category || data.category };
}

/**
 * listExpenses
 * Supports date range and category filtering.
 */
async function listExpenses({ from, to, category, added_by } = {}) {
  let query = supabaseAdmin
    .from('expenses')
    .select('*, team_members(name, role)')
    .order('date', { ascending: false });

  if (from)     query = query.gte('date', from);
  if (to)       query = query.lte('date', to);
  if (category) query = query.eq('category', category);
  if (added_by) query = query.eq('added_by', added_by);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);
  return data;
}

async function updateExpense(expenseId, updates) {
  const { data, error } = await supabaseAdmin
    .from('expenses')
    .update(updates)
    .eq('expense_id', expenseId)
    .select('*, team_members(name, role)')
    .single();

  if (error) throw createError(400, error.message, 'Update Failed');
  return data;
}

async function deleteExpense(expenseId) {
  const { error } = await supabaseAdmin
    .from('expenses')
    .delete()
    .eq('expense_id', expenseId);

  if (error) throw createError(400, error.message);
  return { success: true, expense_id: expenseId };
}

module.exports = { addExpense, listExpenses, updateExpense, deleteExpense };
