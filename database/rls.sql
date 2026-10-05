-- =============================================================================
-- AHVAAN — ROW-LEVEL SECURITY (RLS)
-- Single Admin Panel Model
-- =============================================================================
-- This system uses a single admin account (not per-team-member logins).
-- Strategy:
--   • All tables have RLS enabled.
--   • Only authenticated users (the admin) can read/write any data.
--   • The admin logs in via Supabase Auth (email/password).
--   • Team members are data records — they do NOT log in.
--
-- HOW TO USE
--   1. First run database/schema.sql
--   2. Then paste and run this file in Supabase SQL Editor
--   3. Create your admin user in Supabase Auth → Users → Invite user
-- =============================================================================

-- ── Enable RLS on every table ──────────────────────────────────────────────

ALTER TABLE clients       ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates     ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks         ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_finance  ENABLE ROW LEVEL SECURITY;

-- ── Policy: only authenticated users (admin) can SELECT ───────────────────

CREATE POLICY "Admin can read clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read order_items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read templates"
  ON templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read payments"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read team_members"
  ON team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read team_finance"
  ON team_finance FOR SELECT
  TO authenticated
  USING (true);

-- ── Policy: only authenticated users (admin) can INSERT ───────────────────

CREATE POLICY "Admin can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert order_items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert templates"
  ON templates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert team_members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can insert team_finance"
  ON team_finance FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ── Policy: only authenticated users (admin) can UPDATE ───────────────────

CREATE POLICY "Admin can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can update order_items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can update templates"
  ON templates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can update tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can update expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can update team_members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── Policy: authenticated users can DELETE (templates, team members) ───────

CREATE POLICY "Admin can delete templates"
  ON templates FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete team_members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

-- ── Note on payments & team_finance ───────────────────────────────────────
-- Payments and team_finance are historical records (PRD §14).
-- They intentionally have no DELETE policy — records should never be removed.
-- If you need soft-deletes in the future:
--   ALTER TABLE payments ADD COLUMN deleted_at timestamptz;
--   Then add a policy filtering on deleted_at IS NULL.

-- =============================================================================
-- EXTENDING LATER (e.g., adding admin/login tables)
-- =============================================================================
-- When you add a new table later (e.g., admin_users, login_sessions):
--   1. CREATE TABLE admin_users (...);
--   2. ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
--   3. CREATE POLICY "..." ON admin_users FOR SELECT TO authenticated USING (true);
-- The same pattern applies to any new table you add.
-- =============================================================================
