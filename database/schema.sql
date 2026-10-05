-- =============================================================================
-- AHVAAN — COMPLETE DATABASE SCHEMA
-- Version 1.0 | Run this once in Supabase SQL Editor
-- =============================================================================
-- HOW TO USE
--   1. Open your Supabase project → SQL Editor
--   2. Paste this entire file and click Run
--   3. Then run database/rls.sql for Row-Level Security
-- =============================================================================

-- Enable the uuid extension (already enabled on Supabase by default, but safe to re-run)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- HELPER: auto-update updated_at columns via trigger
-- =============================================================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- TABLE: team_members
-- Must be created before expenses and tasks (they FK into it)
-- =============================================================================
CREATE TABLE IF NOT EXISTS team_members (
  team_member_id  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  email           text,                         -- nullable: some members may not have email
  role            text        NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- To add more team member fields later (e.g., phone, avatar_url, department):
  --   ALTER TABLE team_members ADD COLUMN phone text;
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- TABLE: clients
-- =============================================================================
CREATE TABLE IF NOT EXISTS clients (
  client_id   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  email       text        NOT NULL,
  phone       text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Future fields: address text, city text, notes text, referred_by uuid
  -- ALTER TABLE clients ADD COLUMN notes text;
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- TABLE: templates
-- Must be created before order_items (FK reference)
-- =============================================================================
CREATE TABLE IF NOT EXISTS templates (
  template_id   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  category      text        NOT NULL,
  sub_category  text,                           -- nullable per PRD
  price         numeric     NOT NULL CHECK (price >= 0),
  description   text,
  preview_url   text,
  created_at    timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Run in Supabase SQL editor: ALTER TABLE templates ADD COLUMN IF NOT EXISTS preview_url text;
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- TABLE: orders
-- One client → many orders. status is CALCULATED by backend, never set manually by frontend.
-- =============================================================================
CREATE TABLE IF NOT EXISTS orders (
  order_id        uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       uuid        NOT NULL REFERENCES clients(client_id) ON DELETE RESTRICT,
  status          text        NOT NULL DEFAULT 'Pending'
                              CHECK (status IN ('Pending', 'In Progress', 'Review', 'Completed', 'Cancelled')),
  total_amount    numeric     NOT NULL CHECK (total_amount >= 0),
  order_date      date        NOT NULL,         -- manually entered by admin, no default
  submission_date date        NOT NULL,         -- order-level, manually entered
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Future: currency text DEFAULT 'PKR', discount numeric DEFAULT 0
  -- ALTER TABLE orders ADD COLUMN currency text DEFAULT 'PKR';
  -- ─────────────────────────────────────────────────────────────────────────
);

-- Auto-update updated_at
CREATE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- =============================================================================
-- TABLE: order_items
-- One order → many order items. Each item references one template.
-- =============================================================================
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      uuid        NOT NULL REFERENCES orders(order_id) ON DELETE RESTRICT,
  template_id   uuid        NOT NULL REFERENCES templates(template_id) ON DELETE RESTRICT,
  event_name    text        NOT NULL,
  event_date    date        NOT NULL,
  status        text        NOT NULL DEFAULT 'Pending'
                            CHECK (status IN ('Pending', 'In Progress', 'Review', 'Completed', 'Cancelled')),
  completed_at  timestamptz,                    -- NULL unless status = Completed; manually selected
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- NO submission_date here (PRD explicit non-goal)
  -- NO event_type (PRD explicit non-goal)
  -- Future: quantity integer DEFAULT 1, unit_price numeric
  -- ─────────────────────────────────────────────────────────────────────────
);

-- Auto-update updated_at
CREATE TRIGGER order_items_set_updated_at
  BEFORE UPDATE ON order_items
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- =============================================================================
-- TABLE: payments
-- One order → many payment records. Each is a separate historical transaction.
-- =============================================================================
CREATE TABLE IF NOT EXISTS payments (
  payment_id      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        uuid        NOT NULL REFERENCES orders(order_id) ON DELETE RESTRICT,
  amount          numeric     NOT NULL CHECK (amount >= 0),
  payment_date    date        NOT NULL,
  payment_method  text        NOT NULL,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Future: receipt_url text, transaction_ref text
  -- ALTER TABLE payments ADD COLUMN transaction_ref text;
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- TABLE: tasks
-- One task → one order + one assigned team member.
-- Upcoming/Overdue are DERIVED states — never stored in this table.
-- =============================================================================
CREATE TABLE IF NOT EXISTS tasks (
  task_id       uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  task_title    text        NOT NULL,
  order_id      uuid        NOT NULL REFERENCES orders(order_id) ON DELETE RESTRICT,
  assigned_to   uuid        NOT NULL REFERENCES team_members(team_member_id) ON DELETE RESTRICT,
  description   text,
  priority      text        NOT NULL
                            CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  task_label    text        NOT NULL
                            CHECK (task_label IN (
                              'Backend', 'Frontend', 'Bug', 'Database',
                              'Invitation', 'New Template', 'Customization',
                              'Revision', 'Research', 'Automation', 'Other'
                            )),
  status        text        NOT NULL DEFAULT 'Pending'
                            CHECK (status IN ('Pending', 'In Progress', 'Review', 'Completed', 'Cancelled')),
                            -- NOTE: 'Upcoming' and 'Overdue' are NEVER valid status values (PRD §8)
  due_at        timestamptz NOT NULL,           -- timestamptz because UI shows task time
  start_date    timestamptz,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Future labels: add to the CHECK above or replace with a lookup table
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- TABLE: expenses
-- =============================================================================
CREATE TABLE IF NOT EXISTS expenses (
  expense_id      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  amount          numeric     NOT NULL CHECK (amount >= 0),
  category        text        NOT NULL,
  description     text,
  date            date        NOT NULL,
  payment_method  text        NOT NULL,
  added_by        uuid        NOT NULL REFERENCES team_members(team_member_id) ON DELETE RESTRICT,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Future: receipt_url text, approved_by uuid REFERENCES team_members(team_member_id)
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- TABLE: team_finance
-- Payouts to team members. Each is a separate historical record.
-- =============================================================================
CREATE TABLE IF NOT EXISTS team_finance (
  team_finance_id   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id    uuid        NOT NULL REFERENCES team_members(team_member_id) ON DELETE RESTRICT,
  amount            numeric     NOT NULL CHECK (amount >= 0),
  date              date        NOT NULL,
  payment_method    text        NOT NULL,
  notes             text,
  created_at        timestamptz NOT NULL DEFAULT now()

  -- ── Customization point ──────────────────────────────────────────────────
  -- Future: payout_type text (salary/bonus/advance), approved_by uuid
  -- ─────────────────────────────────────────────────────────────────────────
);

-- =============================================================================
-- POSTGRES FUNCTION: recalculate_order_status(p_order_id uuid)
-- Called by the backend after any order_item status change.
-- Implements exact PRD §6 logic. Returns the new calculated status.
-- =============================================================================
CREATE OR REPLACE FUNCTION recalculate_order_status(p_order_id uuid)
RETURNS text AS $$
DECLARE
  v_status      text;
  v_all_count   integer;
  v_cancel_count integer;
  v_active_statuses text[];
BEGIN
  -- Count total and cancelled items
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'Cancelled')
  INTO v_all_count, v_cancel_count
  FROM order_items
  WHERE order_id = p_order_id;

  -- If no items, leave status as Pending
  IF v_all_count = 0 THEN
    v_status := 'Pending';
  -- Rule 1: All items cancelled → order is Cancelled
  ELSIF v_all_count = v_cancel_count THEN
    v_status := 'Cancelled';
  ELSE
    -- Collect statuses of non-cancelled (active) items
    SELECT ARRAY_AGG(DISTINCT status)
    INTO v_active_statuses
    FROM order_items
    WHERE order_id = p_order_id AND status != 'Cancelled';

    -- Rule 2: Any active item is In Progress
    IF 'In Progress' = ANY(v_active_statuses) THEN
      v_status := 'In Progress';
    -- Rule 3: Any active item is Review
    ELSIF 'Review' = ANY(v_active_statuses) THEN
      v_status := 'Review';
    -- Rule 4: Any active item is Pending
    ELSIF 'Pending' = ANY(v_active_statuses) THEN
      v_status := 'Pending';
    -- Rule 5: All active items are Completed
    ELSE
      v_status := 'Completed';
    END IF;
  END IF;

  -- Apply the calculated status to the order
  UPDATE orders
  SET status = v_status, updated_at = now()
  WHERE order_id = p_order_id;

  RETURN v_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- POSTGRES FUNCTION: create_client_with_order(payload jsonb)
-- Atomic transactional creation of: client + order + order_items
-- Called via Supabase RPC. If anything fails, entire transaction rolls back.
-- =============================================================================
CREATE OR REPLACE FUNCTION create_client_with_order(payload jsonb)
RETURNS jsonb AS $$
DECLARE
  v_client_id     uuid;
  v_order_id      uuid;
  v_item          jsonb;
  v_order_item_id uuid;
  v_result        jsonb;
BEGIN
  -- 1. Insert client
  INSERT INTO clients (name, email, phone)
  VALUES (
    payload->>'name',
    payload->>'email',
    payload->>'phone'
  )
  RETURNING client_id INTO v_client_id;

  -- 2. Insert order
  INSERT INTO orders (client_id, total_amount, order_date, submission_date)
  VALUES (
    v_client_id,
    (payload->'order'->>'total_amount')::numeric,
    (payload->'order'->>'order_date')::date,
    (payload->'order'->>'submission_date')::date
  )
  RETURNING order_id INTO v_order_id;

  -- 3. Insert each order item
  FOR v_item IN SELECT * FROM jsonb_array_elements(payload->'order'->'items')
  LOOP
    INSERT INTO order_items (order_id, template_id, event_name, event_date, notes)
    VALUES (
      v_order_id,
      (v_item->>'template_id')::uuid,
      v_item->>'event_name',
      (v_item->>'event_date')::date,
      v_item->>'notes'
    );
  END LOOP;

  -- 4. Return the created IDs
  v_result := jsonb_build_object(
    'client_id', v_client_id,
    'order_id',  v_order_id
  );

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- POSTGRES FUNCTION: get_order_finance(p_order_id uuid)
-- Returns total_amount, amount_paid, and pending_amount for an order.
-- =============================================================================
CREATE OR REPLACE FUNCTION get_order_finance(p_order_id uuid)
RETURNS jsonb AS $$
DECLARE
  v_total     numeric;
  v_paid      numeric;
  v_result    jsonb;
BEGIN
  SELECT total_amount INTO v_total
  FROM orders WHERE order_id = p_order_id;

  SELECT COALESCE(SUM(amount), 0) INTO v_paid
  FROM payments WHERE order_id = p_order_id;

  v_result := jsonb_build_object(
    'order_id',       p_order_id,
    'total_amount',   v_total,
    'amount_paid',    v_paid,
    'pending_amount', v_total - v_paid
  );

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- SCHEMA COMPLETE
-- Next step: run database/rls.sql to enable Row-Level Security
-- =============================================================================
