// =============================================================================
// modules/auth/auth.controller.js
// =============================================================================
const service = require('./auth.service');

async function login(req, res, next) {
  try {
    const data = await service.loginAdmin(req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function setPassword(req, res, next) {
  try {
    const data = await service.setAdminPassword(req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function getMe(req, res, next) {
  try {
    res.json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (err) { next(err); }
}

module.exports = { login, setPassword, getMe };
