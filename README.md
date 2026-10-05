# Ahvaan — Internal Admin & Business Management System

> **Backend v1.0** | Node.js + Express + Supabase (PostgreSQL)

---

## Project Structure

```
ahvaan/
├── backend/          ← Express REST API (Node.js)
├── frontend/         ← Frontend app (not built yet)
├── database/         ← SQL schema, RLS policies, seed data
└── README.md         ← This file
```

---

## ⚡ Supabase Setup — Step by Step

### Step 1: Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Fill in project name, DB password, and region
3. Wait for it to provision (~1–2 min)

### Step 2: Run the database schema

1. In Supabase dashboard → **SQL Editor** → **New query**
2. Open `database/schema.sql` → **copy all content** → paste → **Run**
3. You should see: `Success. No rows returned`
4. Open `database/rls.sql` → copy → paste → **Run**

> **Dev only:** If you want sample data to test with, also run `database/seed.sql`

### Step 3: Get your API keys

1. Supabase Dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (click to reveal — keep this secret!)

### Step 4: Create your admin user

1. Supabase Dashboard → **Authentication** → **Users** → **Invite user**
2. Enter your admin email and send the invite
3. Check your email and set a password

> This is the **single admin account** for the system. Team members are data records in the `team_members` table, not Supabase Auth users.

### Step 5: Configure environment variables

```bash
cd backend
copy .env.example .env
```

Open `.env` and fill in:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

### Step 6: Install and run

```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 Ahvaan Backend running
   Environment : development
   Port        : 3001
   Health      : http://localhost:3001/health
```

Test it: open `http://localhost:3001/health` in your browser. You should get:
```json
{ "status": "ok", "service": "ahvaan-backend", "timestamp": "..." }
```

---

## API Authentication

Every `/api/*` endpoint requires a valid Supabase JWT.

**How to get a token (from frontend or Postman):**

```js
// Using Supabase JS client
const { data } = await supabase.auth.signInWithPassword({
  email: 'admin@ahvaan.com',
  password: 'yourpassword'
});
const token = data.session.access_token;
```

**Include it in every API request:**
```
Authorization: Bearer <your-jwt-token>
```

---

## API Reference

### Clients
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/clients` | Create client + first order + items (atomic) |
| `GET` | `/api/clients` | List clients (`?search=`) |
| `GET` | `/api/clients/:id` | Get client with all orders |
| `PATCH` | `/api/clients/:id` | Update client |

**Create client body example:**
```json
{
  "name": "Ahmed Raza",
  "email": "ahmed@example.com",
  "phone": "+92-300-1234567",
  "order": {
    "total_amount": 18000,
    "order_date": "2026-10-01",
    "submission_date": "2026-10-05",
    "items": [
      {
        "template_id": "uuid-here",
        "event_name": "Nikah Ceremony",
        "event_date": "2026-11-10"
      }
    ]
  }
}
```

### Orders
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Add new order to existing client |
| `GET` | `/api/orders` | List orders (`?client_id=&status=`) |
| `GET` | `/api/orders/:id` | Get order with items |
| `PATCH` | `/api/orders/:id` | Edit order fields |

> Order `status` is **calculated automatically** — you cannot set it directly.

### Order Items
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/order-items` | Add item to existing order |
| `PATCH` | `/api/order-items/:id` | Edit item fields |
| `PATCH` | `/api/order-items/:id/status` | Change status → auto-recalculates order |
| `DELETE` | `/api/order-items/:id` | Cancel item |

**Change status body:**
```json
{
  "status": "Completed",
  "completed_at": "2026-10-02T14:00:00+05:00"
}
```
> `completed_at` is **required** when setting `Completed`. Omit for any other status.

### Templates
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/templates` | Create template |
| `GET` | `/api/templates` | List (`?category=&sub_category=&search=`) |
| `GET` | `/api/templates/:id` | Get template |
| `PATCH` | `/api/templates/:id` | Update template |
| `DELETE` | `/api/templates/:id` | Delete (blocked if used by order items) |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments` | Add payment |
| `GET` | `/api/payments` | List (`?order_id=&from=&to=`) |
| `GET` | `/api/payments/orders/:orderId/finance` | Balance for one order |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create task |
| `GET` | `/api/tasks` | List (`?status=&assigned_to=&priority=`) |
| `GET` | `/api/tasks/today` | Today's + overdue active tasks |
| `PATCH` | `/api/tasks/:id` | Update task |

> Tasks include a `derived_state` field: `"Upcoming"` or `"Overdue"` for active tasks. This is **never stored** in the database.

### Expenses
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/expenses` | Add expense |
| `GET` | `/api/expenses` | List (`?from=&to=&category=&added_by=`) |
| `PATCH` | `/api/expenses/:id` | Update expense |

### Team Members
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/team-members` | Add team member |
| `GET` | `/api/team-members` | List all |
| `PATCH` | `/api/team-members/:id` | Update |

### Team Finance
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/team-finance` | Record payout |
| `GET` | `/api/team-finance` | List (`?team_member_id=&from=&to=`) |
| `GET` | `/api/team-finance/summary` | Totals per member (`?from=&to=`) |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/stats` | Counts + revenue |
| `GET` | `/api/dashboard/recent-clients` | Last 10 clients |
| `GET` | `/api/dashboard/finance` | Finance summary (`?from=&to=`) |
| `GET` | `/api/dashboard/team-payouts` | Payout summary (`?from=&to=`) |

---

## Adding New Sections Later

The architecture is designed for easy extension. To add a new module (e.g., `login-sessions`, `notifications`):

1. **Create the table** — add to `database/schema.sql` and run in Supabase:
   ```sql
   CREATE TABLE login_sessions ( ... );
   ALTER TABLE login_sessions ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Admin can read login_sessions" ON login_sessions FOR SELECT TO authenticated USING (true);
   ```

2. **Create the module folder** in `backend/src/modules/your-module/`:
   - `your-module.service.js`
   - `your-module.controller.js`
   - `your-module.routes.js`

3. **Register in app.js**:
   ```js
   const yourRouter = require('./modules/your-module/your-module.routes');
   app.use('/api/your-module', authenticate, yourRouter);
   ```

That's it — no other files need to change.

---

## Key Business Rules (Summary)

| Rule | Where enforced |
|---|---|
| Client creation = atomic (client + order + items) | `create_client_with_order` Postgres RPC |
| Order status calculated, never set manually | `recalculate_order_status` Postgres function |
| `completed_at` required when status = Completed | `order-items.service.js` |
| `completed_at` nulled when moving away from Completed | `order-items.service.js` |
| Upcoming/Overdue are derived states, not stored | `tasks.service.js` |
| Payment records are never overwritten | No DELETE policy on `payments` table |
| New order never overwrites historical orders | `orders.service.js` guard |
| Financial amounts must be ≥ 0 | `CHECK` constraints in schema |
| Foreign keys prevent orphan records | `REFERENCES ... ON DELETE RESTRICT` |
