// =============================================================================
// modules/team-members/team-members.service.js
// =============================================================================
const { supabaseAdmin } = require('../../config/supabase');
const { createError }   = require('../../middleware/errorHandler');

async function createTeamMember(payload) {
  const { data, error } = await supabaseAdmin
    .from('team_members')
    .insert(payload)
    .select()
    .single();
  if (error) throw createError(400, error.message, 'Team Member Creation Failed');
  return data;
}

async function listTeamMembers() {
  const { data, error } = await supabaseAdmin
    .from('team_members')
    .select('*')
    .order('name');
  if (error) throw createError(500, error.message);
  return data;
}

async function updateTeamMember(memberId, updates) {
  const { data, error } = await supabaseAdmin
    .from('team_members')
    .update(updates)
    .eq('team_member_id', memberId)
    .select()
    .single();
  if (error) throw createError(400, error.message, 'Update Failed');
  if (!data) throw createError(404, `Team member ${memberId} not found`, 'Not Found');
  return data;
}

module.exports = { createTeamMember, listTeamMembers, updateTeamMember };
