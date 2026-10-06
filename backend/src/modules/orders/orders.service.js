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
  const { client_id, total_amount, order_date, submission_date, items, status } = payload;

  // 1. Verify client exists
  const { data: client, error: clientError } = await supabaseAdmin
    .from('clients')
    .select('client_id')
    .eq('client_id', client_id)
    .single();

  if (clientError || !client) throw createError(404, `Client ${client_id} not found`, 'Not Found');

  // 2. Insert the order with explicit status
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      client_id,
      total_amount: Number(total_amount) || 0,
      order_date: order_date || new Date().toISOString().slice(0, 10),
      submission_date: submission_date || new Date().toISOString().slice(0, 10),
      status: status || 'In Progress'
    })
    .select()
    .single();

  if (orderError) throw createError(400, orderError.message, 'Order Creation Failed');

  // Helper to map event names to valid order_items categories
  const mapEventToCategory = (eventName, customCategory) => {
    if (customCategory && ['Wedding Ceremony', 'Engagement', 'Anniversary', 'Baby Shower', 'House Warming'].includes(customCategory)) {
      return customCategory;
    }
    const ev = (eventName || '').toLowerCase();
    if (ev.includes('engagement') || ev.includes('ring')) return 'Engagement';
    if (ev.includes('anniversary')) return 'Anniversary';
    if (ev.includes('baby') || ev.includes('shower')) return 'Baby Shower';
    if (ev.includes('house') || ev.includes('warming') || ev.includes('opening') || ev.includes('griha')) return 'House Warming';
    return 'Wedding Ceremony';
  };

  // 3. Insert order items if provided
  if (items && items.length > 0) {
    const { data: existingTpl } = await supabaseAdmin.from('templates').select('template_id').limit(1);
    const defaultTemplateId = existingTpl?.[0]?.template_id;

    const itemRows = items.map((item) => {
      let tplId = item.template_id;
      if (!tplId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tplId)) {
        tplId = defaultTemplateId;
      }
      return {
        order_id: order.order_id,
        template_id: tplId,
        event_name: item.event_name,
        event_date: item.event_date || new Date().toISOString().slice(0, 10),
        status: item.status || 'In Progress',
        category: mapEventToCategory(item.event_name, item.category),
        notes: item.notes || null,
      };
    });

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
async function deleteOrder(orderId) {
  // 1. Delete tasks linked to this order
  await supabaseAdmin.from('tasks').delete().eq('order_id', orderId);
  // 2. Delete payments linked to this order
  await supabaseAdmin.from('payments').delete().eq('order_id', orderId);
  // 3. Delete order items linked to this order
  await supabaseAdmin.from('order_items').delete().eq('order_id', orderId);
  // 4. Delete the order
  const { error } = await supabaseAdmin.from('orders').delete().eq('order_id', orderId);
  if (error) throw createError(400, error.message, 'Failed to delete order');
  return { success: true, order_id: orderId };
}

module.exports = { createOrder, listOrders, getOrderById, updateOrder, deleteOrder };
