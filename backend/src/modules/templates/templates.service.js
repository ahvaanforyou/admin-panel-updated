// =============================================================================
// modules/templates/templates.service.js
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

function formatTemplate(row) {
  if (!row) return null;
  let previewUrl = row.preview_url || '';
  let cleanDesc = row.description || '';
  if (!previewUrl && cleanDesc.includes('[PREVIEW_URL:')) {
    const match = cleanDesc.match(/\[PREVIEW_URL:(.*?)\]/);
    if (match) {
      previewUrl = match[1];
      cleanDesc = cleanDesc.replace(/\[PREVIEW_URL:.*?\]/g, '').trim();
    }
  }
  return {
    ...row,
    preview_url: previewUrl,
    link: previewUrl,
    description: cleanDesc,
  };
}

async function createTemplate(payload) {
  const previewUrl = payload.preview_url || payload.link || '';
  let desc = payload.description || '';

  const cleanPayload = {
    name: payload.name,
    category: payload.category || 'Wedding',
    sub_category: payload.sub_category || null,
    price: Number(payload.price) || 0,
    description: desc,
    preview_url: previewUrl,
  };

  let res = await supabaseAdmin
    .from('templates')
    .insert(cleanPayload)
    .select()
    .single();

  if (res.error && (res.error.code === '42703' || (res.error.message && res.error.message.includes('preview_url')))) {
    // Column preview_url does not exist in remote DB table, encode in description
    if (previewUrl) {
      desc = `${desc} [PREVIEW_URL:${previewUrl}]`.trim();
    }
    delete cleanPayload.preview_url;
    cleanPayload.description = desc;
    res = await supabaseAdmin
      .from('templates')
      .insert(cleanPayload)
      .select()
      .single();
  }

  if (res.error) throw createError(400, res.error.message, 'Template Creation Failed');
  return formatTemplate(res.data);
}

/**
 * listTemplates
 * Supports filtering by category and sub_category.
 */
async function listTemplates({ category, sub_category, search } = {}) {
  let query = supabaseAdmin
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (category && category !== 'All')     query = query.eq('category', category);
  if (sub_category && sub_category !== 'All') query = query.eq('sub_category', sub_category);
  if (search)       query = query.ilike('name', `%${search}%`);

  const { data, error } = await query;
  if (error) throw createError(500, error.message);
  return (data || []).map(formatTemplate);
}

async function getTemplateById(templateId) {
  const { data, error } = await supabaseAdmin
    .from('templates')
    .select('*')
    .eq('template_id', templateId)
    .single();
  if (error || !data) throw createError(404, `Template ${templateId} not found`, 'Not Found');
  return formatTemplate(data);
}

async function updateTemplate(templateId, updates) {
  const previewUrl = updates.preview_url !== undefined ? updates.preview_url : updates.link;
  const cleanUpdates = { ...updates };
  delete cleanUpdates.link;

  if (previewUrl !== undefined) {
    cleanUpdates.preview_url = previewUrl;
  }

  let res = await supabaseAdmin
    .from('templates')
    .update(cleanUpdates)
    .eq('template_id', templateId)
    .select()
    .single();

  if (res.error && (res.error.code === '42703' || (res.error.message && res.error.message.includes('preview_url')))) {
    // Column preview_url does not exist, fetch existing to preserve description
    delete cleanUpdates.preview_url;
    if (previewUrl !== undefined) {
      const { data: existing } = await supabaseAdmin.from('templates').select('description').eq('template_id', templateId).single();
      let currentDesc = cleanUpdates.description !== undefined ? (cleanUpdates.description || '') : (existing?.description || '');
      currentDesc = currentDesc.replace(/\[PREVIEW_URL:.*?\]/g, '').trim();
      if (previewUrl) {
        currentDesc = `${currentDesc} [PREVIEW_URL:${previewUrl}]`.trim();
      }
      cleanUpdates.description = currentDesc;
    }
    res = await supabaseAdmin
      .from('templates')
      .update(cleanUpdates)
      .eq('template_id', templateId)
      .select()
      .single();
  }

  if (res.error) throw createError(400, res.error.message, 'Update Failed');
  if (!res.data) throw createError(404, `Template ${templateId} not found`, 'Not Found');
  return formatTemplate(res.data);
}

async function deleteTemplate(templateId) {
  // Check if template is referenced by any order items
  const { count } = await supabaseAdmin
    .from('order_items')
    .select('*', { count: 'exact', head: true })
    .eq('template_id', templateId);

  if (count > 0) {
    throw createError(
      409,
      `Template is used by ${count} order item(s) and cannot be deleted.`,
      'Conflict'
    );
  }

  const { error } = await supabaseAdmin
    .from('templates')
    .delete()
    .eq('template_id', templateId);
  if (error) throw createError(400, error.message, 'Delete Failed');
  return { deleted: true };
}

module.exports = { createTemplate, listTemplates, getTemplateById, updateTemplate, deleteTemplate };
