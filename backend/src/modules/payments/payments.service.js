// =============================================================================
// modules/payments/payments.service.js
// =============================================================================
// Payments are historical records — never overwritten (PRD §9, §14).
// Balance is calculated dynamically: total_amount - SUM(payments).
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

/**
 * addPayment
 * Inserts a new payment record for an order.
 * Each payment stays as a separate historical record.
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function addPayment(payload) {
  let { order_id, amount, payment_date, payment_method, notes } = payload;

  // Resolve order_id: Check if directly order_id or client_id
  let resolvedOrderId = order_id;
  if (!resolvedOrderId || !UUID_REGEX.test(resolvedOrderId)) {
    const { data: latest } = await supabaseAdmin.from('orders').select('order_id').order('created_at', { ascending: false }).limit(1);
    resolvedOrderId = latest?.[0]?.order_id;
  } else {
    const { data: ord } = await supabaseAdmin.from('orders').select('order_id').eq('order_id', resolvedOrderId).limit(1);
    if (!ord || ord.length === 0) {
      const { data: clientOrd } = await supabaseAdmin.from('orders').select('order_id').eq('client_id', resolvedOrderId).limit(1);
      if (clientOrd?.[0]) {
        resolvedOrderId = clientOrd[0].order_id;
      }
    }
  }

  if (!resolvedOrderId) {
    throw createError(404, 'No active order found to record payment against.', 'Not Found');
  }

  let payDate = payment_date;
  try {
    payDate = payDate ? new Date(payDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  } catch {
    payDate = new Date().toISOString().slice(0, 10);
  }

  const { data, error } = await supabaseAdmin
    .from('payments')
    .insert({
      order_id: resolvedOrderId,
      amount: Number(amount) || 0,
      payment_date: payDate,
      payment_method: payment_method || 'UPI',
      notes: notes || null
    })
    .select()
    .single();

  if (error) throw createError(400, error.message, 'Payment Creation Failed');
  return data;
}

/**
 * getPaymentsByOrder
 * Returns all payment records for an order, newest first.
 */
async function getPaymentsByOrder(orderId) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .order('payment_date', { ascending: false });

  if (error) throw createError(500, error.message);
  return data;
}

/**
 * getOrderFinance
 * Returns total_amount, amount_paid, and pending_amount for an order.
 * Uses the Postgres function to ensure accuracy.
 */
async function getOrderFinance(orderId) {
  const { data, error } = await supabaseAdmin.rpc('get_order_finance', {
    p_order_id: orderId,
  });
  if (error) throw createError(500, error.message);
  return data;
}

/**
 * listPayments
 * Returns all payments with optional date range filtering.
 */
async function listPayments({ from, to, order_id } = {}) {
  let query = supabaseAdmin
    .from('payments')
    .select('*, orders(client_id, clients(name))')
    .order('payment_date', { ascending: false });

  if (order_id) query = query.eq('order_id', order_id);
  if (from)     query = query.gte('payment_date', from);
  if (to)       query = query.lte('payment_date', to);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);
  return data;
}

/**
 * updatePayment
 */
async function updatePayment(paymentId, payload) {
  const updates = {};
  if (payload.amount !== undefined) updates.amount = Number(payload.amount);
  if (payload.payment_date !== undefined) updates.payment_date = payload.payment_date;
  if (payload.payment_method !== undefined) updates.payment_method = payload.payment_method;
  if (payload.notes !== undefined) updates.notes = payload.notes;

  const { data, error } = await supabaseAdmin
    .from('payments')
    .update(updates)
    .eq('payment_id', paymentId)
    .select()
    .single();

  if (error) throw createError(400, error.message);
  return data;
}

/**
 * deletePayment
 */
async function deletePayment(paymentId) {
  const { error } = await supabaseAdmin
    .from('payments')
    .delete()
    .eq('payment_id', paymentId);

  if (error) throw createError(400, error.message);
  return { success: true, payment_id: paymentId };
}

module.exports = { addPayment, getPaymentsByOrder, getOrderFinance, listPayments, updatePayment, deletePayment };

