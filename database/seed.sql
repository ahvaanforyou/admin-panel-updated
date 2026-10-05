-- =============================================================================
-- AHVAAN — SEED DATA (Development / Testing)
-- =============================================================================
-- Run ONLY in development. Do NOT run in production unless intentional.
-- This inserts sample data so you can test the API immediately.
-- =============================================================================

-- ── Team Members ──────────────────────────────────────────────────────────
INSERT INTO team_members (team_member_id, name, email, role) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Ali Hassan',    'ali@ahvaan.com',    'Designer'),
  ('11111111-0000-0000-0000-000000000002', 'Sara Khan',     'sara@ahvaan.com',   'Developer'),
  ('11111111-0000-0000-0000-000000000003', 'Zara Malik',    'zara@ahvaan.com',   'Coordinator');

-- ── Templates ─────────────────────────────────────────────────────────────
INSERT INTO templates (template_id, name, category, sub_category, price, description) VALUES
  ('22222222-0000-0000-0000-000000000001', 'Classic Nikah Card',      'Invitation', 'Nikah',     5000,  'Traditional Islamic nikah invitation design'),
  ('22222222-0000-0000-0000-000000000002', 'Royal Wedding Card',      'Invitation', 'Wedding',   8000,  'Elegant royal-themed wedding invitation'),
  ('22222222-0000-0000-0000-000000000003', 'Floral Walima Card',      'Invitation', 'Walima',    4500,  'Soft floral design for walima ceremony'),
  ('22222222-0000-0000-0000-000000000004', 'Mehndi Ceremony Package', 'Package',    'Mehndi',    12000, 'Complete mehndi event package'),
  ('22222222-0000-0000-0000-000000000005', 'Digital Invite Bundle',   'Digital',    'All',       6000,  'Digital invitation for all events');

-- ── Clients ───────────────────────────────────────────────────────────────
INSERT INTO clients (client_id, name, email, phone) VALUES
  ('33333333-0000-0000-0000-000000000001', 'Ahmed Raza',  'ahmed@example.com',  '+92-300-1234567'),
  ('33333333-0000-0000-0000-000000000002', 'Fatima Noor', 'fatima@example.com', '+92-311-9876543');

-- ── Orders ────────────────────────────────────────────────────────────────
INSERT INTO orders (order_id, client_id, total_amount, order_date, submission_date, status) VALUES
  ('44444444-0000-0000-0000-000000000001',
   '33333333-0000-0000-0000-000000000001',
   18000, '2026-09-01', '2026-09-05', 'In Progress'),
  ('44444444-0000-0000-0000-000000000002',
   '33333333-0000-0000-0000-000000000002',
   5000,  '2026-09-15', '2026-09-20', 'Pending');

-- ── Order Items ───────────────────────────────────────────────────────────
INSERT INTO order_items (order_id, template_id, event_name, event_date, status, completed_at) VALUES
  ('44444444-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000001',
   'Nikah Ceremony', '2026-10-10', 'Completed', '2026-10-02 14:00:00+05'),

  ('44444444-0000-0000-0000-000000000001',
   '22222222-0000-0000-0000-000000000002',
   'Wedding Reception', '2026-10-12', 'In Progress', NULL),

  ('44444444-0000-0000-0000-000000000002',
   '22222222-0000-0000-0000-000000000001',
   'Nikah Invitation', '2026-10-20', 'Pending', NULL);

-- ── Payments ─────────────────────────────────────────────────────────────
INSERT INTO payments (order_id, amount, payment_date, payment_method, notes) VALUES
  ('44444444-0000-0000-0000-000000000001', 10000, '2026-09-02', 'Bank Transfer', 'Initial advance'),
  ('44444444-0000-0000-0000-000000000001',  5000, '2026-09-20', 'Cash',          'Second installment');

-- ── Tasks ─────────────────────────────────────────────────────────────────
INSERT INTO tasks (task_title, order_id, assigned_to, priority, task_label, status, due_at, description) VALUES
  ('Design nikah card draft',
   '44444444-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000001',
   'High', 'Invitation', 'Completed',
   '2026-10-01 18:00:00+05',
   'Create first draft of nikah card for client review'),

  ('Set up wedding card template',
   '44444444-0000-0000-0000-000000000001',
   '11111111-0000-0000-0000-000000000002',
   'Medium', 'New Template', 'In Progress',
   '2026-10-15 18:00:00+05',
   'Build the royal wedding card template in system');

-- ── Expenses ─────────────────────────────────────────────────────────────
INSERT INTO expenses (title, amount, category, date, payment_method, added_by, description) VALUES
  ('Printing supplies',       2500, 'Operations', '2026-09-10', 'Cash',          '11111111-0000-0000-0000-000000000001', 'Card printing paper and ink'),
  ('Software subscription',   1800, 'Software',   '2026-09-01', 'Bank Transfer', '11111111-0000-0000-0000-000000000002', 'Design tool monthly subscription');

-- ── Team Finance (Payouts) ────────────────────────────────────────────────
INSERT INTO team_finance (team_member_id, amount, date, payment_method, notes) VALUES
  ('11111111-0000-0000-0000-000000000001', 25000, '2026-09-30', 'Bank Transfer', 'September salary'),
  ('11111111-0000-0000-0000-000000000002', 30000, '2026-09-30', 'Bank Transfer', 'September salary'),
  ('11111111-0000-0000-0000-000000000003', 20000, '2026-09-30', 'Cash',          'September salary');

-- =============================================================================
-- SEED COMPLETE
-- =============================================================================
