// =============================================================================
// modules/orders/orders.service.js
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

/**
 * createOrder
 * Adds a NEW order to an existing client.
 * Never overwrites previous orders (PRD §4).
 */
async function createOrder(payload) {
  const { client_id, total_amount, order_date, submission_date, items } = payload;

  // 1. Verify client exists
  const { data: client, error: clientError } = await supabaseAdmin
    .from('clients')
    .select('client_id')
    .eq('client_id', client_id)
    .single();

  if (clientError || !client) throw createError(404, `Client ${client_id} not found`, 'Not Found');

  // 2. Insert the order
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({ client_id, total_amount, order_date, submission_date })
    .select()
    .single();

  if (orderError) throw createError(400, orderError.message, 'Order Creation Failed');

  // 3. Insert order items if provided
  if (items && items.length > 0) {
    const itemRows = items.map((item) => ({ ...item, order_id: order.order_id }));
    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(itemRows);
    if (itemsError) throw createError(400, itemsError.message, 'Order Items Creation Failed');
  }

  return order;
}

/**
 * listOrders
 * Returns all orders with client info. Optionally filter by client_id.
 */
async function listOrders({ client_id, status } = {}) {
  let query = supabaseAdmin
    .from('orders')
    .select('*, clients(name, email, phone), order_items(count)')
    .order('created_at', { ascending: false });

  if (client_id) query = query.eq('client_id', client_id);
  if (status)    query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);
  return data;
}

/**
 * getOrderById
 * Returns a single order with all its items and template details.
 */
async function getOrderById(orderId) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`
      *,
      clients(name, email, phone),
      order_items(*, templates(*)),
      payments(*)
    `)
    .eq('order_id', orderId)
    .single();

  if (error || !data) throw createError(404, `Order ${orderId} not found`, 'Not Found');
  return data;
}

/**
 * updateOrder
 * Updates editable order-level fields. Does NOT create a new order.
 * Status is NOT updated here — it's calculated automatically from order items.
 */
async function updateOrder(orderId, updates) {
  // Prevent frontend from manually setting order status (PRD §6)
  delete updates.status;

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(updates)
    .eq('order_id', orderId)
    .select()
    .single();

  if (error) throw createError(400, error.message, 'Update Failed');
  if (!data) throw createError(404, `Order ${orderId} not found`, 'Not Found');
  return data;
}

module.exports = { createOrder, listOrders, getOrderById, updateOrder };
