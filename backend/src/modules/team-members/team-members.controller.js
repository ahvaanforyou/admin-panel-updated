// =============================================================================
// modules/team-members/team-members.controller.js
// =============================================================================
const service = require('./team-members.service');

async function create(req, res, next) {
  try {
    const data = await service.createTeamMember(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const data = await service.listTeamMembers();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const data = await service.updateTeamMember(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

module.exports = { create, list, update };
