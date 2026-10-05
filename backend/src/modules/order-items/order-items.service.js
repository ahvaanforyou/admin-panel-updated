// =============================================================================
// modules/order-items/order-items.service.js
// =============================================================================
// Contains the most critical business logic:
//   • completed_at validation (PRD §7)
//   • Order status recalculation (PRD §6) via Postgres function
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

/**
 * addOrderItem
 * Adds a new item to an existing order.
 * Also triggers order status recalculation.
 */
async function addOrderItem(payload) {
  const { order_id, template_id, event_name, event_date, notes } = payload;

  // Resolve template_id fallback
  let activeTemplateId = template_id;
  if (!activeTemplateId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeTemplateId)) {
    const { data: tpl } = await supabaseAdmin.from('templates').select('template_id').limit(1);
    activeTemplateId = tpl?.[0]?.template_id;
  }

  // Verify order exists
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .select('order_id')
    .eq('order_id', order_id)
    .single();
  if (orderError || !order) throw createError(404, `Order ${order_id} not found`, 'Not Found');

  const { data, error } = await supabaseAdmin
    .from('order_items')
    .insert({ order_id, template_id: activeTemplateId, event_name, event_date, notes })
    .select('*, templates(*)')
    .single();

  if (error) throw createError(400, error.message, 'Order Item Creation Failed');

  // Recalculate parent order status
  await recalculateOrderStatus(order_id);

  return data;
}

/**
 * updateOrderItem
 * Updates editable fields of an existing order item (event/template/details).
 * Does NOT change status — use changeOrderItemStatus for that.
 */
async function updateOrderItem(itemId, updates) {
  // Status changes must go through changeOrderItemStatus (validated separately)
  delete updates.status;
  delete updates.completed_at;

  const { data, error } = await supabaseAdmin
    .from('order_items')
    .update(updates)
    .eq('order_item_id', itemId)
    .select('*, templates(*)')
    .single();

  if (error) throw createError(400, error.message, 'Update Failed');
  if (!data) throw createError(404, `Order item ${itemId} not found`, 'Not Found');
  return data;
}

/**
 * changeOrderItemStatus
 * The critical status-change operation (PRD §7 + §6):
 *   1. Validates completed_at requirement for Completed status
 *   2. Nulls completed_at when moving away from Completed
 *   3. Updates the item
 *   4. Recalculates and updates the parent order status
 */
async function changeOrderItemStatus(itemId, { status, completed_at }) {
  // Fetch current item
  const { data: item, error: fetchError } = await supabaseAdmin
    .from('order_items')
    .select('order_id, status')
    .eq('order_item_id', itemId)
    .single();

  if (fetchError || !item) throw createError(404, `Order item ${itemId} not found`, 'Not Found');

  // PRD §7: completed_at is REQUIRED when status = Completed
  if (status === 'Completed' && !completed_at) {
    throw createError(
      400,
      'completed_at is required when setting status to Completed. Select the actual completion date/time.',
      'Validation Error'
    );
  }

  // PRD §7: completed_at must be NULL when not Completed
  const newCompletedAt = status === 'Completed' ? completed_at : null;

  // Update the item
  const { data: updatedItem, error: updateError } = await supabaseAdmin
    .from('order_items')
    .update({ status, completed_at: newCompletedAt })
    .eq('order_item_id', itemId)
    .select()
    .single();

  if (updateError) throw createError(400, updateError.message, 'Status Update Failed');

  // Recalculate parent order status (PRD §6) via Postgres function
  const newOrderStatus = await recalculateOrderStatus(item.order_id);

  return {
    order_item:   updatedItem,
    order_status: newOrderStatus,
  };
}

/**
 * recalculateOrderStatus (internal helper)
 * Calls the Postgres `recalculate_order_status` function.
 * Returns the newly calculated order status string.
 */
async function recalculateOrderStatus(orderId) {
  const { data, error } = await supabaseAdmin.rpc('recalculate_order_status', {
    p_order_id: orderId,
  });

  if (error) throw createError(500, `Order status recalculation failed: ${error.message}`);
  return data; // e.g., 'In Progress'
}

/**
 * cancelOrderItem
 * Deletes item or sets status to Cancelled and recalculates order status.
 */
async function cancelOrderItem(itemId) {
  const { data: item } = await supabaseAdmin
    .from('order_items')
    .select('order_id')
    .eq('order_item_id', itemId)
    .single();

  const { error: delError } = await supabaseAdmin
    .from('order_items')
    .delete()
    .eq('order_item_id', itemId);

  if (delError) {
    return changeOrderItemStatus(itemId, { status: 'Cancelled', completed_at: null });
  }

  if (item?.order_id) {
    try {
      await recalculateOrderStatus(item.order_id);
    } catch {
      // ignore
    }
  }

  return { success: true, order_item_id: itemId };
}


module.exports = { addOrderItem, updateOrderItem, changeOrderItemStatus, cancelOrderItem };
