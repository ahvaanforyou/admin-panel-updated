// =============================================================================
// src/app.js — Express application setup & route registration
// =============================================================================
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const env        = require('./config/env');
const { authenticate }   = require('./middleware/auth');
const { errorHandler }   = require('./middleware/errorHandler');

// ── Module routers ────────────────────────────────────────────────────────
const clientsRouter     = require('./modules/clients/clients.routes');
const ordersRouter      = require('./modules/orders/orders.routes');
const orderItemsRouter  = require('./modules/order-items/order-items.routes');
const templatesRouter   = require('./modules/templates/templates.routes');
const paymentsRouter    = require('./modules/payments/payments.routes');
const tasksRouter       = require('./modules/tasks/tasks.routes');
const expensesRouter    = require('./modules/expenses/expenses.routes');
const teamMembersRouter = require('./modules/team-members/team-members.routes');
const teamFinanceRouter = require('./modules/team-finance/team-finance.routes');
const dashboardRouter   = require('./modules/dashboard/dashboard.routes');
const authRouter        = require('./modules/auth/auth.routes');

// ── Customization point ───────────────────────────────────────────────────
// To add a new module (e.g., login sessions, notifications):
//   1. Create backend/src/modules/your-module/
//   2. const yourRouter = require('./modules/your-module/your-module.routes');
//   3. app.use('/api/your-module', authenticate, yourRouter);
// ─────────────────────────────────────────────────────────────────────────

const app = express();

// ── Security & utility middleware ─────────────────────────────────────────
app.use(helmet());                              // Security headers
app.use(cors({ origin: env.allowedOrigins })); // CORS — configured in .env
app.use(express.json());                        // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.isDev ? 'dev' : 'combined')); // HTTP request logging

// ── Health check (public, no auth required) ───────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ahvaan-backend', timestamp: new Date().toISOString() });
});

// ── Auth routes (login is public, /me is protected) ───────────────────────
app.use('/api/auth', authRouter);

// ── Protected API routes ──────────────────────────────────────────────────
// All /api/* routes require a valid Supabase JWT (authenticate middleware).
app.use('/api/clients',      authenticate, clientsRouter);
app.use('/api/orders',       authenticate, ordersRouter);
app.use('/api/order-items',  authenticate, orderItemsRouter);
app.use('/api/templates',    authenticate, templatesRouter);
app.use('/api/payments',     authenticate, paymentsRouter);
app.use('/api/tasks',        authenticate, tasksRouter);
app.use('/api/expenses',     authenticate, expensesRouter);
app.use('/api/team-members', authenticate, teamMembersRouter);
app.use('/api/team-finance', authenticate, teamFinanceRouter);
app.use('/api/dashboard',    authenticate, dashboardRouter);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.path} does not exist.` });
});

// ── Global error handler ──────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
