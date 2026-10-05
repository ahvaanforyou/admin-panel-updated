// =============================================================================
// src/context/DataContext.jsx — Real-time State Synchronization Context
// =============================================================================
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [stats, setStats] = useState({
    total_clients: 0,
    total_orders: 0,
    completed_projects: 0,
    total_revenue: 0,
    revenue_this_month: 0,
    savings: 0,
    total_team_payout: 0,
    total_expenses: 0,
  });

  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2026-10'); // YYYY-MM

  // Synchronize all data from backend / local state
  const refreshAll = useCallback(async () => {
    const token = localStorage.getItem('ahvaan_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [
        statsData,
        clientsData,
        tasksData,
        templatesData,
        paymentsData,
        expensesData,
        teamData,
        payoutsData,
      ] = await Promise.all([
        api.getDashboardStats(),
        api.getClients(),
        api.getTasks(),
        api.getTemplates(),
        api.getPayments(),
        api.getExpenses(),
        api.getTeamMembers(),
        api.getTeamPayouts(),
      ]);

      setStats(statsData || {});
      setClients(clientsData || []);
      setTasks(tasksData || []);
      setTemplates(templatesData || []);
      setPayments(paymentsData || []);
      setExpenses(expensesData || []);
      setTeamMembers(teamData || []);
      setPayouts(payoutsData || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshAll();
    }
  }, [isAuthenticated, refreshAll]);

  // Mutations that trigger instant live sync
  const addClient = async (payload) => {
    const res = await api.createClientWithOrder(payload);
    await refreshAll();
    return res;
  };

  const updateClient = async (clientId, updates) => {
    const res = await api.updateClient(clientId, updates);
    await refreshAll();
    return res;
  };

  const updateClientStatus = async (clientId, updates) => {
    const res = await api.updateClient(clientId, updates);
    await refreshAll();
    return res;
  };

  const changeOrderItemStatus = async (orderItemId, { status, completed_at }) => {
    const res = await api.updateOrderItemStatus(orderItemId, { status, completed_at });
    await refreshAll();
    return res;
  };

  const updateOrderItem = async (orderItemId, payload) => {
    const res = await api.updateOrderItem(orderItemId, payload);
    await refreshAll();
    return res;
  };

  const deleteOrderItem = async (orderItemId) => {
    const res = await api.deleteOrderItem(orderItemId);
    await refreshAll();
    return res;
  };

  const addPayment = async (payload) => {
    const res = await api.addPayment(payload);
    await refreshAll();
    return res;
  };

  const updatePayment = async (paymentId, payload) => {
    const res = await api.updatePayment(paymentId, payload);
    await refreshAll();
    return res;
  };

  const deletePayment = async (paymentId) => {
    const res = await api.deletePayment(paymentId);
    await refreshAll();
    return res;
  };

  const addExpense = async (payload) => {
    const res = await api.addExpense(payload);
    await refreshAll();
    return res;
  };

  const updateExpense = async (expenseId, payload) => {
    const res = await api.updateExpense(expenseId, payload);
    await refreshAll();
    return res;
  };

  const deleteExpense = async (expenseId) => {
    const res = await api.deleteExpense(expenseId);
    await refreshAll();
    return res;
  };

  const addPayout = async (payload) => {
    const res = await api.addTeamPayout(payload);
    await refreshAll();
    return res;
  };

  const updatePayout = async (payoutId, payload) => {
    const res = await api.updateTeamPayout(payoutId, payload);
    await refreshAll();
    return res;
  };

  const deletePayout = async (payoutId) => {
    const res = await api.deleteTeamPayout(payoutId);
    await refreshAll();
    return res;
  };

  const addTask = async (payload) => {
    const res = await api.createTask(payload);
    await refreshAll();
    return res;
  };

  const updateTask = async (taskId, updates) => {
    const res = await api.updateTask(taskId, updates);
    await refreshAll();
    return res;
  };

  const deleteTask = async (taskId) => {
    const res = await api.deleteTask(taskId);
    await refreshAll();
    return res;
  };

  const addTemplate = async (payload) => {
    const res = await api.createTemplate(payload);
    await refreshAll();
    return res;
  };

  const updateTemplate = async (templateId, payload) => {
    const res = await api.updateTemplate(templateId, payload);
    await refreshAll();
    return res;
  };

  const deleteTemplate = async (templateId) => {
    const res = await api.deleteTemplate(templateId);
    await refreshAll();
    return res;
  };

  const addOrder = async (payload) => {
    const res = await api.addOrder(payload);
    await refreshAll();
    return res;
  };

  const addOrderItem = async (payload) => {
    const res = await api.addOrderItem(payload);
    await refreshAll();
    return res;
  };

  return (
    <DataContext.Provider value={{
      stats,
      clients,
      tasks,
      templates,
      payments,
      expenses,
      teamMembers,
      payouts,
      loading,
      selectedMonth,
      setSelectedMonth,
      refreshAll,
      addClient,
      updateClient,
      updateClientStatus,
      changeOrderItemStatus,
      addPayment,
      updatePayment,
      deletePayment,
      addExpense,
      updateExpense,
      deleteExpense,
      addPayout,
      updatePayout,
      deletePayout,
      addTask,
      updateTask,
      deleteTask,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      addOrder,
      addOrderItem,
      updateOrderItem,
      deleteOrderItem,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
