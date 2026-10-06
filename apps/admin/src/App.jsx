// =============================================================================
// src/App.jsx — Master Router & Application Shell
// =============================================================================
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ClientsPage from './pages/clients/ClientsPage';
import FinancePage from './pages/finance/FinancePage';
import TasksPage from './pages/tasks/TasksPage';
import InvitationsPage from './pages/invitations/InvitationsPage';

// Modals & Drawers
import AddClientModal from './pages/clients/AddClientModal';
import ClientDetailsDrawer from './pages/clients/ClientDetailsDrawer';
import EditClientDrawer from './pages/clients/EditClientDrawer';
import ClientPaymentDrawer from './pages/finance/ClientPaymentDrawer';
import MemberPayoutDrawer from './pages/finance/MemberPayoutDrawer';
import AddPaymentModal from './pages/finance/AddPaymentModal';
import AddPayoutModal from './pages/finance/AddPayoutModal';
import AddExpenseModal from './pages/finance/AddExpenseModal';
import EditExpenseModal from './pages/finance/EditExpenseModal';
import AddTaskModal from './pages/tasks/AddTaskModal';
import EditTaskModal from './pages/tasks/EditTaskModal';
import AddTemplateModal from './pages/invitations/AddTemplateModal';
import EditTemplateModal from './pages/invitations/EditTemplateModal';
import ErrorBoundary from './components/common/ErrorBoundary';

export default function App() {
  const { isAuthenticated } = useAuth();

  // Active Navigation Tab: Persisted in localStorage so refreshing stays on the same page
  const [currentTab, setCurrentTabState] = useState(() => {
    return localStorage.getItem('ahvaan_active_tab') || 'dashboard';
  });

  const handleSetCurrentTab = (tab) => {
    localStorage.setItem('ahvaan_active_tab', tab);
    setCurrentTabState(tab);
  };

  // Modal / Drawer visibility states
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isAddPayoutOpen, setIsAddPayoutOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);

  // Selected entities
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientForPayments, setSelectedClientForPayments] = useState(null);
  const [selectedMemberForPayouts, setSelectedMemberForPayouts] = useState(null);
  const [clientForEdit, setClientForEdit] = useState(null);
  const [clientForPayment, setClientForPayment] = useState(null);
  const [expenseForEdit, setExpenseForEdit] = useState(null);
  const [taskForEdit, setTaskForEdit] = useState(null);
  const [templateForEdit, setTemplateForEdit] = useState(null);
  const [defaultTaskMember, setDefaultTaskMember] = useState(null);

  // If not authenticated, always show LoginPage
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <AdminLayout
        currentTab={currentTab}
        setCurrentTab={handleSetCurrentTab}
      >
        {currentTab === 'dashboard' && (
          <ErrorBoundary title="Failed to display Dashboard">
            <DashboardPage
              onNavigateTab={handleSetCurrentTab}
              onOpenAddClient={() => setIsAddClientOpen(true)}
              onOpenAddTask={(member) => {
                setDefaultTaskMember(typeof member === 'string' ? member : null);
                setIsAddTaskOpen(true);
              }}
              onSelectClient={(c) => setSelectedClient(c)}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'clients' && (
          <ErrorBoundary title="Failed to display Clients">
            <ClientsPage
              onOpenAddClient={() => setIsAddClientOpen(true)}
              onSelectClient={(c) => setSelectedClient(c)}
              onEditClient={(c) => setClientForEdit(c)}
              onOpenAddPayment={(c) => {
                setClientForPayment(c);
                setIsAddPaymentOpen(true);
              }}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'finance' && (
          <ErrorBoundary title="Failed to display Finance">
            <FinancePage
              onOpenAddPayment={(c) => {
                setClientForPayment(c || null);
                setIsAddPaymentOpen(true);
              }}
              onOpenAddPayout={() => setIsAddPayoutOpen(true)}
              onOpenAddExpense={() => setIsAddExpenseOpen(true)}
              onSelectClient={(c) => setSelectedClientForPayments(c)}
              onEditClient={(c) => setClientForEdit(c)}
              onEditExpense={(exp) => {
                setExpenseForEdit(exp);
                setIsEditExpenseOpen(true);
              }}
              onSelectMember={(m) => setSelectedMemberForPayouts(m)}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'tasks' && (
          <ErrorBoundary title="Failed to display Tasks">
            <TasksPage
              onOpenAddTask={(member) => {
                setDefaultTaskMember(typeof member === 'string' ? member : null);
                setIsAddTaskOpen(true);
              }}
              onEditTask={(t) => setTaskForEdit(t)}
            />
          </ErrorBoundary>
        )}

        {currentTab === 'invitations' && (
          <ErrorBoundary title="Failed to display Invitations">
            <InvitationsPage
              onOpenAddTemplate={() => setIsAddTemplateOpen(true)}
              onEditTemplate={(tpl) => setTemplateForEdit(tpl)}
            />
          </ErrorBoundary>
        )}
      </AdminLayout>

      {/* ── Global Modals & Slide-over Drawers (Mounted at Root DOM Level for z-index purity) ── */}
      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
      />

      <ErrorBoundary title="Failed to display Client Details" onClose={() => setSelectedClient(null)}>
        <ClientDetailsDrawer
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          client={selectedClient}
          onOpenAddPayment={(c) => {
            setClientForPayment(c);
            setIsAddPaymentOpen(true);
          }}
          onEditClient={(c) => {
            setSelectedClient(null);
            setClientForEdit(c);
          }}
        />
      </ErrorBoundary>

      {/* Dedicated Client Payment History Drawer matching media_1791193886346.png */}
      <ErrorBoundary title="Failed to display Client Payments" onClose={() => setSelectedClientForPayments(null)}>
        <ClientPaymentDrawer
          isOpen={!!selectedClientForPayments}
          onClose={() => setSelectedClientForPayments(null)}
          client={selectedClientForPayments}
          onOpenAddPayment={(c) => {
            setClientForPayment(c);
            setIsAddPaymentOpen(true);
          }}
          onEditClient={(c) => {
            setSelectedClientForPayments(null);
            setClientForEdit(c);
          }}
        />
      </ErrorBoundary>

      {/* Dedicated Team Member Payout History Drawer matching media_1791193787803.png */}
      <ErrorBoundary title="Failed to display Team Member Payouts" onClose={() => setSelectedMemberForPayouts(null)}>
        <MemberPayoutDrawer
          isOpen={!!selectedMemberForPayouts}
          onClose={() => setSelectedMemberForPayouts(null)}
          member={selectedMemberForPayouts}
          onOpenAddPayout={() => {
            setIsAddPayoutOpen(true);
          }}
        />
      </ErrorBoundary>

      <EditClientDrawer
        isOpen={!!clientForEdit}
        onClose={() => setClientForEdit(null)}
        client={clientForEdit}
      />

      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={() => {
          setIsAddPaymentOpen(false);
          setClientForPayment(null);
        }}
        defaultClient={clientForPayment}
      />

      <AddPayoutModal
        isOpen={isAddPayoutOpen}
        onClose={() => setIsAddPayoutOpen(false)}
      />

      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />

      <EditExpenseModal
        isOpen={isEditExpenseOpen}
        onClose={() => {
          setIsEditExpenseOpen(false);
          setExpenseForEdit(null);
        }}
        expense={expenseForEdit}
      />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => {
          setIsAddTaskOpen(false);
          setDefaultTaskMember(null);
        }}
        defaultMemberName={defaultTaskMember}
      />

      <EditTaskModal
        isOpen={!!taskForEdit}
        onClose={() => setTaskForEdit(null)}
        task={taskForEdit}
      />

      <AddTemplateModal
        isOpen={isAddTemplateOpen}
        onClose={() => setIsAddTemplateOpen(false)}
      />

      <EditTemplateModal
        isOpen={!!templateForEdit}
        onClose={() => setTemplateForEdit(null)}
        template={templateForEdit}
      />
    </>
  );
}
