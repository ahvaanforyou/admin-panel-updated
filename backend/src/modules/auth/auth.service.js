// =============================================================================
// modules/auth/auth.service.js — Admin authentication service
// =============================================================================
const { supabaseClient, supabaseAdmin } = require('../../config/supabase');
const { createError }                   = require('../../middleware/errorHandler');

/**
 * loginAdmin
 * Authenticates the admin user with email and password via Supabase Auth.
 * Returns the access token, user details, and expiry.
 */
async function loginAdmin({ email, password }) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw createError(401, error ? error.message : 'Invalid credentials', 'Authentication Failed');
  }

  return {
    access_token:  data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_at:    data.session.expires_at,
    user: {
      id:    data.user.id,
      email: data.user.email,
    },
  };
}

/**
 * setAdminPassword
 * Allows setting/updating the password for an admin user by email (using service_role admin client).
 */
async function setAdminPassword({ email, newPassword }) {
  // Find user by email
  const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) throw createError(500, listError.message);

  const targetUser = usersData.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!targetUser) {
    throw createError(404, `User with email ${email} not found`, 'Not Found');
  }

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
    password: newPassword,
    email_confirm: true,
  });

  if (error) throw createError(400, error.message, 'Password Update Failed');

  return {
    message: `Password updated successfully for ${email}`,
    user_id: targetUser.id,
  };
}

module.exports = { loginAdmin, setAdminPassword };
