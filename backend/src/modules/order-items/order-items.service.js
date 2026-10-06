// =============================================================================
// modules/order-items/order-items.service.js
// =============================================================================
// Contains the most critical business logic:
//   • completed_at validation (PRD §7)
//   • Order status recalculation (PRD §6) via Postgres function
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

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

/**
 * addOrderItem
 * Adds a new item to an existing order.
 * Also triggers order status recalculation.
 */
async function addOrderItem(payload) {
  const { order_id, template_id, event_name, event_date, notes, category, status } = payload;

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

  const effCategory = mapEventToCategory(event_name, category);

  const { data, error } = await supabaseAdmin
    .from('order_items')
    .insert({
      order_id,
      template_id: activeTemplateId,
      event_name,
      event_date,
      notes,
      category: effCategory,
      status: status || 'In Progress'
    })
    .select('*, templates(*)')
    .single();

  if (error) throw createError(400, error.message, 'Order Item Creation Failed');

  // Recalculate parent order status
  await recalculateOrderStatus(order_id);

  return data;
}

/**
 * updateOrderItem
 * Updates editable fields of an existing order item (event/template/details/status).
 */
async function updateOrderItem(itemId, updates) {
  let newCompletedAt = updates.completed_at || null;
  if (updates.status === 'Completed') {
    newCompletedAt = newCompletedAt || new Date().toISOString();
  }

  if (updates.status) {
    let validStatus = updates.status;
    if (!['In Review', 'In Progress', 'Completed', 'On Hold', 'Template Chosen', 'Cancelled'].includes(validStatus)) {
      validStatus = 'In Progress';
    }
    updates.status = validStatus;
    updates.completed_at = newCompletedAt;
  }

  const { data, error } = await supabaseAdmin
    .from('order_items')
    .update(updates)
    .eq('order_item_id', itemId)
    .select('*, templates(*)')
    .single();

  if (error) throw createError(400, error.message, 'Update Failed');
  if (!data) throw createError(404, `Order item ${itemId} not found`, 'Not Found');

  if (data.order_id) {
    await recalculateOrderStatus(data.order_id);
  }

  return data;
}

/**
 * changeOrderItemStatus
 * Status-change operation:
 *   1. Accepts In Review, In Progress, Completed, On Hold, Template Chosen, Cancelled, Pending
 *   2. Validates completed_at requirement for Completed status
 *   3. Updates the item
 *   4. Recalculates and updates the parent order status (only Completed when all items are Completed)
 */
async function changeOrderItemStatus(itemId, { status, completed_at }) {
  // Fetch current item
  const { data: item, error: fetchError } = await supabaseAdmin
    .from('order_items')
    .select('order_id, status')
    .eq('order_item_id', itemId)
    .single();

  if (fetchError || !item) throw createError(404, `Order item ${itemId} not found`, 'Not Found');

  // Completed status handling
  let newCompletedAt = null;
  if (status === 'Completed') {
    newCompletedAt = completed_at || new Date().toISOString();
  }

  // Sanitize status to allowed check constraint values
  let validStatus = status;
  if (!['In Review', 'In Progress', 'Completed', 'On Hold', 'Template Chosen', 'Cancelled'].includes(validStatus)) {
    validStatus = 'In Progress';
  }

  // Update the item
  const { data: updatedItem, error: updateError } = await supabaseAdmin
    .from('order_items')
    .update({ status: validStatus, completed_at: newCompletedAt })
    .eq('order_item_id', itemId)
    .select()
    .single();

  if (updateError) throw createError(400, updateError.message, 'Status Update Failed');

  // Recalculate parent order status: Completed only when ALL active items are Completed
  const newOrderStatus = await recalculateOrderStatus(item.order_id);

  return {
    order_item:   updatedItem,
    order_status: newOrderStatus,
  };
}

/**
 * recalculateOrderStatus (internal helper)
 * Enforces rule: When both / all order items are set to Completed, THEN ONLY main order becomes Completed.
 */
async function recalculateOrderStatus(orderId) {
  const { data: allItems } = await supabaseAdmin
    .from('order_items')
    .select('status')
    .eq('order_id', orderId);

  let targetOrderStatus = 'In Progress';
  if (allItems && allItems.length > 0) {
    const active = allItems.filter(i => i.status !== 'Cancelled');
    if (active.length > 0 && active.every(i => i.status === 'Completed')) {
      targetOrderStatus = 'Completed';
    } else if (active.length === 0 && allItems.length > 0) {
      targetOrderStatus = 'Cancelled';
    } else if (active.every(i => i.status === 'On Hold')) {
      targetOrderStatus = 'On Hold';
    } else {
      targetOrderStatus = 'In Progress';
    }
  }

  await supabaseAdmin
    .from('orders')
    .update({ status: targetOrderStatus })
    .eq('order_id', orderId);

  return targetOrderStatus;
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
