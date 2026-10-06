// =============================================================================
// src/services/api.js — Live Supabase / Backend REST API Client
// =============================================================================
// Strictly connects to the live Supabase-backed API.
// NO dummy/mock clients — all initial values start at 0 until you add data.
// =============================================================================
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token from localStorage on every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('ahvaan_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  async login(email, password) {
    const res = await client.post('/auth/login', { email, password });
    return res.data.data;
  },

  async signupAdmin(email, newPassword) {
    const res = await client.post('/auth/set-password', { email, newPassword });
    return res.data.data;
  },

  // ── High-Speed Instant Bootstrap ───────────────────────────────────────────
  async getBootstrapData() {
    const res = await client.get('/dashboard/bootstrap');
    return res.data.data;
  },

  // ── Dashboard Statistics ──────────────────────────────────────────────────
  async getDashboardStats() {
    try {
      const res = await client.get('/dashboard/stats');
      const d = res.data.data || {};
      return {
        total_clients: d.total_clients || 0,
        total_orders: d.total_orders || 0,
        completed_projects: d.completed_projects || 0,
        total_revenue: d.total_revenue || 0,
        revenue_this_month: d.total_revenue || 0,
        savings: (d.total_revenue || 0), // Will subtract expenses/payouts when added
        total_team_payout: 0,
        total_expenses: 0,
      };
    } catch {
      return {
        total_clients: 0,
        total_orders: 0,
        completed_projects: 0,
        total_revenue: 0,
        revenue_this_month: 0,
        savings: 0,
        total_team_payout: 0,
        total_expenses: 0,
      };
    }
  },

  // ── Clients ───────────────────────────────────────────────────────────────
  async getClients(search = '') {
    try {
      const res = await client.get(`/clients${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async createClientWithOrder(payload) {
    const res = await client.post('/clients', payload);
    return res.data.data;
  },

  async updateClient(clientId, updates) {
    const res = await client.patch(`/clients/${clientId}`, updates);
    return res.data.data;
  },

  async deleteClient(clientId) {
    const res = await client.delete(`/clients/${clientId}`);
    return res.data.data;
  },

  async deleteClients(clientIds) {
    const res = await client.post('/clients/batch-delete', { client_ids: clientIds });
    return res.data.data;
  },

  // ── Orders & Order Items ──────────────────────────────────────────────────
  async addOrder(payload) {
    const res = await client.post('/orders', payload);
    return res.data.data;
  },

  async deleteOrder(orderId) {
    const res = await client.delete(`/orders/${orderId}`);
    return res.data.data;
  },

  async addOrderItem(payload) {
    const res = await client.post('/order-items', payload);
    return res.data.data;
  },

  // ── Order Item Status ─────────────────────────────────────────────────────
  async updateOrderItem(orderItemId, payload) {
    const res = await client.patch(`/order-items/${orderItemId}`, payload);
    return res.data.data;
  },

  async updateOrderItemStatus(orderItemId, { status, completed_at }) {
    const res = await client.patch(`/order-items/${orderItemId}/status`, { status, completed_at });
    return res.data.data;
  },

  async deleteOrderItem(orderItemId) {
    const res = await client.delete(`/order-items/${orderItemId}`);
    return res.data.data;
  },

  // ── Payments ──────────────────────────────────────────────────────────────
  async getPayments(params = {}) {
    try {
      const res = await client.get('/payments', { params });
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async addPayment(payload) {
    const res = await client.post('/payments', payload);
    return res.data.data;
  },

  async updatePayment(paymentId, payload) {
    const res = await client.patch(`/payments/${paymentId}`, payload);
    return res.data.data;
  },

  async deletePayment(paymentId) {
    const res = await client.delete(`/payments/${paymentId}`);
    return res.data.data;
  },

  // ── Expenses ──────────────────────────────────────────────────────────────
  async getExpenses(params = {}) {
    try {
      const res = await client.get('/expenses', { params });
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async addExpense(payload) {
    const res = await client.post('/expenses', payload);
    return res.data.data;
  },

  async updateExpense(expenseId, payload) {
    const res = await client.patch(`/expenses/${expenseId}`, payload);
    return res.data.data;
  },

  async deleteExpense(expenseId) {
    const res = await client.delete(`/expenses/${expenseId}`);
    return res.data.data;
  },

  // ── Team Members & Payouts ────────────────────────────────────────────────
  async getTeamMembers() {
    try {
      const res = await client.get('/team-members');
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async getTeamPayouts(params = {}) {
    try {
      const res = await client.get('/team-finance', { params });
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async addTeamPayout(payload) {
    const res = await client.post('/team-finance', payload);
    return res.data.data;
  },

  async updateTeamPayout(payoutId, payload) {
    const res = await client.patch(`/team-finance/${payoutId}`, payload);
    return res.data.data;
  },

  async deleteTeamPayout(payoutId) {
    const res = await client.delete(`/team-finance/${payoutId}`);
    return res.data.data;
  },

  // ── Tasks ─────────────────────────────────────────────────────────────────
  async getTasks(params = {}) {
    try {
      const res = await client.get('/tasks', { params });
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async getTodaysTasks() {
    try {
      const res = await client.get('/tasks/today');
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async createTask(payload) {
    const res = await client.post('/tasks', payload);
    return res.data.data;
  },

  async updateTask(taskId, updates) {
    const res = await client.patch(`/tasks/${taskId}`, updates);
    return res.data.data;
  },

  async deleteTask(taskId) {
    const res = await client.delete(`/tasks/${taskId}`);
    return res.data.data;
  },

  // ── Invitations / Templates ───────────────────────────────────────────────
  async getTemplates(params = {}) {
    try {
      const res = await client.get('/templates', { params });
      return res.data.data || [];
    } catch {
      return null;
    }
  },

  async createTemplate(payload) {
    const res = await client.post('/templates', payload);
    return res.data.data;
  },

  async updateTemplate(templateId, payload) {
    const res = await client.patch(`/templates/${templateId}`, payload);
    return res.data.data;
  },

  async deleteTemplate(templateId) {
    const res = await client.delete(`/templates/${templateId}`);
    return res.data.data;
  }
};
