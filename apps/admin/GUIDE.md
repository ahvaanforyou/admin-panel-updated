# Ahvaan for You — Admin Panel Frontend Guide

> **Internal Operations & Admin Management System**  
> Built with **React 18 + Vite + Tailwind CSS + Lucide Icons**  
> Strictly follows PRD v2 & the 17-page design reference PDF (`ilovepdf_merged (2).pdf`).

---

## 🚀 1. Quick Start

### Start the Frontend Dev Server
```bash
cd C:\Users\sohai\.gemini\antigravity\scratch\ahvaan\frontend
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### Start the Backend (in another terminal)
```bash
cd C:\Users\sohai\.gemini\antigravity\scratch\ahvaan\backend
npm run dev
```
Backend runs on **`http://localhost:3001`**. Vite automatically proxies `/api` requests to port 3001.

---

## 🔐 2. Admin Login & Credentials

On initial load, you are presented with the **Admin Login Screen** (`src/pages/auth/LoginPage.jsx`).

### Three Preconfigured Admin Profiles:
| Admin Profile | Email | Password | Role |
|---|---|---|---|
| **Admin 1 (Super Admin)** | `ahvaanforyou@gmail.com` | `Admin@123` | Super Admin |
| **Admin 2 (Operations Lead)** | `admin2@ahvaanforyou.com` | `Admin@123` | Operations Lead |
| **Admin 3 (Finance Manager)** | `admin3@ahvaanforyou.com` | `Admin@123` | Finance Manager |

> **💡 Quick Select Pills:** On the login card, click any of the 3 admin buttons to auto-populate the email with 1 click!

---

## 🎯 3. Master Customization File

Whenever you want to change business options, edit this single file:
👉 **`src/config/customization.js`**

| What you want to change | Where to edit in `customization.js` |
|---|---|
| **Currency Symbol** | `CUSTOMIZATION.currency.symbol` (e.g. `₹` or `$`) |
| **Event Types in Add Client** | `CUSTOMIZATION.eventTypes` (Wedding, Sangeet, Nikah, etc.) |
| **Task Priorities & Colors** | `CUSTOMIZATION.taskPriorities` (Urgent, High, Medium, Low) |
| **Task Workflow Labels** | `CUSTOMIZATION.taskLabels` (Design, Dev, Bug, Invitation, etc.) |
| **Template Categories** | `CUSTOMIZATION.templateCategories` (Invitation, Package, Digital, etc.) |
| **Expense Categories** | `CUSTOMIZATION.expenseCategories` (Printing, Travel, Software, etc.) |
| **Payment Methods** | `CUSTOMIZATION.paymentMethods` (Bank Transfer, UPI, Cash, Card) |
| **Admin Accounts List** | `CUSTOMIZATION.admins` |

**All changes in `customization.js` immediately update the entire application.**

---

## 📂 4. Clean Folder Structure

```
frontend/
├── index.html                         ← HTML shell with Inter typography
├── package.json
├── vite.config.js                     ← Proxy to backend (port 3001)
├── tailwind.config.js                 ← Custom brand palette & slate tones
├── GUIDE.md                           ← This user guidance document
│
└── src/
    ├── main.jsx                       ← Root bootstrap with AuthProvider & DataProvider
    ├── App.jsx                        ← Master router (Login vs AdminLayout + Drawers)
    ├── index.css                      ← Clean scrollbars and global utility styling
    │
    ├── config/
    │   └── customization.js           ← 🎯 SINGLE FILE FOR CUSTOMIZING APP SETTINGS
    │
    ├── context/
    │   ├── AuthContext.jsx            ← Admin session, JWT storage & login/logout
    │   └── DataContext.jsx            ← Real-time synchronization across all tabs
    │
    ├── services/
    │   └── api.js                     ← Unified API client (calls /api + mock fallback)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx            ← 5 approved nav tabs + admin profile & logout
    │   │   ├── Topbar.jsx             ← Search input, date context, and live refresh
    │   │   └── AdminLayout.jsx        ← Unified desktop-first shell
    │   └── common/
    │       ├── KpiCard.jsx            ← Reusable statistics card with trend chips
    │       ├── StatusChip.jsx         ← Standardized badges (In Progress, Review, etc.)
    │       ├── ModalDrawer.jsx        ← Slide-over drawer and center modal component
    │       ├── ConfirmDialog.jsx      ← Destructive action confirmation dialogs
    │       └── EmptyState.jsx         ← No-records & search no-results state
    │
    └── pages/
        ├── auth/
        │   └── LoginPage.jsx          ← Login & admin creation screen
        ├── dashboard/
        │   └── DashboardPage.jsx      ← Main page: 6 KPI cards, Revenue chart, Tasks, Clients
        ├── clients/
        │   ├── ClientsPage.jsx        ← Client table, search, filters & pagination
        │   ├── AddClientModal.jsx     ← 2-step Add Client drawer (Events & Templates)
        │   └── ClientDetailsDrawer.jsx← View/edit client info & deliverable statuses
        ├── finance/
        │   ├── FinancePage.jsx        ← 3 Sub-tabs: Client Finance, Team, Expenses
        │   ├── ClientFinanceTab.jsx   ← Payment ledger & pending balances
        │   ├── TeamFinanceTab.jsx     ← Member payout percentages & payout history
        │   ├── ExpensesTab.jsx        ← Business overhead ledger
        │   ├── AddPaymentModal.jsx    ← Record client payment
        │   ├── AddPayoutModal.jsx     ← Record creator payout
        │   └── AddExpenseModal.jsx    ← Log business expense
        ├── tasks/
        │   ├── TasksPage.jsx          ← Kanban board (Overdue, In Progress, Upcoming, Completed)
        │   └── AddTaskModal.jsx       ← Create new task with priority & due date
        └── invitations/
            ├── InvitationsPage.jsx    ← Template catalog with live preview links
            └── AddTemplateModal.jsx   ← Add new template to master directory
```

---

## ⚡ 5. Real-Time State Synchronization

The frontend uses a central **`DataContext`** (`src/context/DataContext.jsx`):
1. **Adding a Client**:
   - Submits client + order + order items atomically.
   - Automatically increments `Total Clients` and `Total Orders` on the Dashboard and adds the client to the Recent Clients table.
2. **Recording a Payment**:
   - Updates the client's pending balance.
   - Automatically recalculates `Revenue (Month)` and `Savings` on the Dashboard and refreshes the Client Finance ledger.
3. **Updating Deliverable Status**:
   - Marking an item `Completed` prompts for a completion date (enforcing PRD §7) and updates `Completed Projects`.
4. **Adding or Moving Tasks**:
   - Automatically re-evaluates the derived state (`Upcoming` vs `Overdue` based on `due_at`) and refreshes `Today's Tasks` on the Dashboard.

---

## 🛡️ 6. No-Image Rule Compliance

As explicitly specified in PRD §1.2 & §4.1:
- No uploaded photos, thumbnails, or image cards are used.
- All visual elements use **clean SVG icons (Lucide React)**, **typography**, **percentage progress bars**, and **color-coded status chips**.
