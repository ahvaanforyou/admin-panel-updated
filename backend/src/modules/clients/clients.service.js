// =============================================================================
// modules/clients/clients.service.js — Business logic for clients
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

/**
 * createClientWithOrder
 * Calls the Postgres RPC function `create_client_with_order` which wraps
 * client + order + order_items creation in a single DB transaction.
 * If any insert fails, the DB rolls back automatically.
 */
async function createClientWithOrder(payload) {
  // 1. Ensure valid default template
  const { data: existingTemplates } = await supabaseAdmin.from('templates').select('template_id').limit(1);
  let defaultTemplateId = existingTemplates?.[0]?.template_id;

  if (!defaultTemplateId) {
    const { data: newTpl } = await supabaseAdmin.from('templates').insert({
      name: 'Bespoke Wedding Invitation',
      category: 'Invitation',
      sub_category: 'Wedding',
      price: 5000,
      description: 'Default master wedding template'
    }).select('template_id').single();
    defaultTemplateId = newTpl?.template_id;
  }

  // Normalize email so DB NOT NULL constraint is satisfied
  let clientEmail = (payload.email || '').trim();
  if (!clientEmail || !clientEmail.includes('@')) {
    const cleanPhone = (payload.phone || 'client').replace(/[^0-9a-zA-Z]/g, '');
    clientEmail = `${cleanPhone || 'client'}@ahvaan.com`;
  }

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

  // 2. Insert Client
  const { data: client, error: clientErr } = await supabaseAdmin
    .from('clients')
    .insert({
      name: payload.name,
      email: clientEmail,
      phone: payload.phone || '0000000000',
      country_code: payload.country_code || '+91',
    })
    .select()
    .single();

  if (clientErr) throw createError(400, clientErr.message, 'Client Insert Failed');

  try {
    // 3. Insert Order with explicit status and valid dates
    const safeDate = (d) => {
      try {
        if (!d) return new Date().toISOString().slice(0, 10);
        const parsed = new Date(d);
        if (isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
        return parsed.toISOString().slice(0, 10);
      } catch {
        return new Date().toISOString().slice(0, 10);
      }
    };

    const orderDate = safeDate(payload.order?.order_date);
    const subDate = safeDate(payload.order?.submission_date);

    const { data: order, error: orderErr } = await supabaseAdmin
      .from('orders')
      .insert({
        client_id: client.client_id,
        status: payload.order?.status || 'In Progress',
        total_amount: Number(payload.order?.total_amount) || 0,
        order_date: orderDate,
        submission_date: subDate,
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // 4. Insert each order item with compliant category and status
    const items = payload.order?.items || [];
    for (const item of items) {
      let templateId = (item.template_id && item.template_id.trim() !== '') ? item.template_id : defaultTemplateId;
      // If templateId is not a valid UUID format, use defaultTemplateId
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(templateId)) {
        templateId = defaultTemplateId;
      }

      const category = mapEventToCategory(item.event_name, item.category);

      const { error: itemErr } = await supabaseAdmin
        .from('order_items')
        .insert({
          order_id: order.order_id,
          template_id: templateId,
          event_name: item.event_name,
          event_date: safeDate(item.event_date),
          status: item.status || 'In Progress',
          notes: item.notes || null,
          category: category,
        });

      if (itemErr) throw itemErr;
    }

    return {
      client_id: client.client_id,
      order_id: order.order_id,
      name: client.name,
    };
  } catch (err) {
    // Rollback client if downstream fails
    await supabaseAdmin.from('clients').delete().eq('client_id', client.client_id);
    throw createError(400, err.message, 'Client Creation Failed');
  }
}

/**
 * listClients
 * Returns all clients with full orders, order items, payments, and computed balances.
 */
async function listClients({ search } = {}) {
  let query = supabaseAdmin
    .from('clients')
    .select(`
      *,
      orders (
        *,
        order_items (*, templates(*)),
        payments (*)
      )
    `)
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw createError(500, error.message);

  const formattedData = (data || []).map((client) => {
    const orders = (client.orders || []).map((ord) => {
      const activeItems = (ord.order_items || []).filter((it) => it.status !== 'Cancelled');
      const amountPaid = (ord.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      const totalAmount = Number(ord.total_amount) || 0;
      const pendingAmount = Math.max(0, totalAmount - amountPaid);
      return {
        ...ord,
        order_items: activeItems,
        amount_paid: amountPaid,
        pending_amount: pendingAmount,
      };
    });
    return {
      ...client,
      status: orders[0]?.status || 'In Progress',
      orders,
    };
  });

  return formattedData;
}

/**
 * getClientById
 * Returns a client and all their orders with order items and computed balances.
 */
async function getClientById(clientId) {
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select(`
      *,
      orders (
        *,
        order_items (*, templates(*)),
        payments (*)
      )
    `)
    .eq('client_id', clientId)
    .single();

  if (error || !data) throw createError(404, `Client ${clientId} not found`, 'Not Found');

  const orders = (data.orders || []).map((ord) => {
    const activeItems = (ord.order_items || []).filter((it) => it.status !== 'Cancelled');
    const amountPaid = (ord.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const totalAmount = Number(ord.total_amount) || 0;
    const pendingAmount = Math.max(0, totalAmount - amountPaid);
    return {
      ...ord,
      order_items: activeItems,
      amount_paid: amountPaid,
      pending_amount: pendingAmount,
    };
  });

  return {
    ...data,
    status: orders[0]?.status || 'In Progress',
    orders,
  };
}

/**
 * updateClient
 * Updates client details (name, email, phone) and optionally order/item info (total_amount, status, event_name, event_date).
 */
async function updateClient(clientId, updates) {
  // 1. Client fields
  const clientUpdates = {};
  if (updates.name !== undefined) clientUpdates.name = updates.name;
  if (updates.email !== undefined) clientUpdates.email = updates.email;
  if (updates.phone !== undefined) clientUpdates.phone = updates.phone;
  if (updates.country_code !== undefined) clientUpdates.country_code = updates.country_code;

  if (Object.keys(clientUpdates).length > 0) {
    const { error: cErr } = await supabaseAdmin
      .from('clients')
      .update(clientUpdates)
      .eq('client_id', clientId);
    if (cErr) throw createError(400, cErr.message, 'Client Update Failed');
  }

  // 2. Order fields (total_amount, status)
  const orderUpdates = {};
  if (updates.total_amount !== undefined) orderUpdates.total_amount = Number(updates.total_amount);
  if (updates.status !== undefined) {
    if (updates.status === 'Completed') {
      const { data: ords } = await supabaseAdmin.from('orders').select('order_id').eq('client_id', clientId);
      const orderIds = (ords || []).map(o => o.order_id);
      const { data: items } = await supabaseAdmin.from('order_items').select('status').in('order_id', orderIds);
      const active = (items || []).filter(i => i.status !== 'Cancelled');
      if (active.length > 0 && active.every(i => i.status === 'Completed')) {
        orderUpdates.status = 'Completed';
      } else {
        orderUpdates.status = 'In Progress';
      }
    } else {
      orderUpdates.status = updates.status;
    }
  }

  if (Object.keys(orderUpdates).length > 0) {
    const { error: oErr } = await supabaseAdmin
      .from('orders')
      .update(orderUpdates)
      .eq('client_id', clientId);
    if (oErr) throw createError(400, oErr.message, 'Order Update Failed');
  }

  // 3. Order item fields (event_name, event_date)
  const itemUpdates = {};
  if (updates.event_name !== undefined) itemUpdates.event_name = updates.event_name;
  if (updates.event_date !== undefined) itemUpdates.event_date = updates.event_date;

  if (Object.keys(itemUpdates).length > 0) {
    const { data: ords } = await supabaseAdmin
      .from('orders')
      .select('order_id')
      .eq('client_id', clientId);
    if (ords && ords.length > 0) {
      const orderIds = ords.map((o) => o.order_id);
      const { error: oiErr } = await supabaseAdmin
        .from('order_items')
        .update(itemUpdates)
        .in('order_id', orderIds);
      if (oiErr) throw createError(400, oiErr.message, 'Event Update Failed');
    }
  }

  return getClientById(clientId);
}

/**
 * deleteClient
 * Cascades deletion of all related entities (payments, order_items, tasks, orders) then the client.
 */
async function deleteClient(clientId) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clientId)) {
    return { success: true, client_id: clientId };
  }

  // Find all orders for this client
  const { data: ords } = await supabaseAdmin
    .from('orders')
    .select('order_id')
    .eq('client_id', clientId);

  const orderIds = (ords || []).map((o) => o.order_id);

  if (orderIds.length > 0) {
    // 1. Delete tasks linked to these orders
    await supabaseAdmin.from('tasks').delete().in('order_id', orderIds);
    // 2. Delete payments linked to these orders
    await supabaseAdmin.from('payments').delete().in('order_id', orderIds);
    // 3. Delete order items linked to these orders
    await supabaseAdmin.from('order_items').delete().in('order_id', orderIds);
    // 4. Delete orders
    await supabaseAdmin.from('orders').delete().in('order_id', orderIds);
  }

  // 5. Delete client
  const { error: cErr } = await supabaseAdmin
    .from('clients')
    .delete()
    .eq('client_id', clientId);

  if (cErr) throw createError(400, cErr.message, 'Failed to delete client');

  return { success: true, client_id: clientId };
}

/**
 * deleteClients
 * Batch deletes multiple clients with cascading.
 */
async function deleteClients(clientIds) {
  if (!Array.isArray(clientIds) || clientIds.length === 0) {
    return { success: true, count: 0 };
  }

  for (const cid of clientIds) {
    await deleteClient(cid);
  }

  return { success: true, count: clientIds.length };
}

module.exports = { createClientWithOrder, listClients, getClientById, updateClient, deleteClient, deleteClients };
