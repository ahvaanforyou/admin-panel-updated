// =============================================================================
// src/pages/dashboard/DashboardPage.jsx — Operations Dashboard (Matching Design Image)
// =============================================================================
import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  IndianRupee, 
  ArrowRight, 
  ChevronRight,
  UserPlus,
  CheckSquare,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';
import Sparkline from '../../components/common/Sparkline';

export default function DashboardPage({ 
  onNavigateTab, 
  onOpenAddClient, 
  onOpenAddTask, 
  onSelectClient 
}) {
  const { stats, clients, tasks, payments, selectedMonth, setSelectedMonth, loading } = useData();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isInitialLoading = loading && (!clients || clients.length === 0) && (!payments || payments.length === 0);

  if (isInitialLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200/70 h-36 flex flex-col justify-between shadow-xs">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-slate-100" />
                <div className="space-y-2 text-right">
                  <div className="w-16 h-3 bg-slate-100 rounded-md ml-auto" />
                  <div className="w-12 h-6 bg-slate-200 rounded-md ml-auto" />
                </div>
              </div>
              <div className="w-24 h-3 bg-slate-100 rounded-md" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 h-80 flex flex-col justify-between shadow-xs">
            <div className="w-32 h-5 bg-slate-200 rounded-md mb-4" />
            <div className="w-full h-56 bg-slate-100 rounded-2xl" />
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200/70 h-80 flex flex-col justify-between shadow-xs">
            <div className="w-28 h-5 bg-slate-200 rounded-md mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-14 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compute month calculations safely
  const isAllTime = !selectedMonth || selectedMonth === 'All';
  const effectiveMonth = isAllTime ? '2026-10' : selectedMonth;
  const [yearStr, monthStr] = effectiveMonth.split('-');
  const currYear = Number(yearStr) || 2026;
  const currMonth = Number(monthStr) || 10;
  const prevMonthDate = new Date(currYear, currMonth - 2, 1);
  const prevMonth = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;
  const monthDate = new Date(currYear, currMonth - 1, 1);
  const currentMonthName = isAllTime ? 'All Time' : monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // 1. Revenue: Filter payments strictly for this month vs previous month
  const monthPayments = (payments || []).filter(p => {
    const pDate = String(p.payment_date || p.created_at || '');
    return isAllTime || pDate.startsWith(selectedMonth);
  });
  const prevMonthPayments = (payments || []).filter(p => {
    const pDate = String(p.payment_date || p.created_at || '');
    return pDate.startsWith(prevMonth);
  });
  const totalMonthRevenue = monthPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const prevMonthRevenue = prevMonthPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const revenueDiff = totalMonthRevenue - prevMonthRevenue;
  const revenuePct = prevMonthRevenue > 0 
    ? Math.round((revenueDiff / prevMonthRevenue) * 100) 
    : (totalMonthRevenue > 0 ? 100 : 0);
  const revenuePctLabel = revenuePct >= 0 ? `↑${revenuePct}%` : `↓${Math.abs(revenuePct)}%`;
  const displayRevenue = totalMonthRevenue;

  // 2. Weekly breakdown for the bar chart (strictly real payments in selectedMonth)
  let w1 = 0, w2 = 0, w3 = 0, w4 = 0;
  monthPayments.forEach(p => {
    const d = new Date(p.payment_date || p.created_at || Date.now());
    const day = isNaN(d.getDate()) ? 1 : d.getDate();
    const amt = Number(p.amount) || 0;
    if (day <= 7) w1 += amt;
    else if (day <= 14) w2 += amt;
    else if (day <= 21) w3 += amt;
    else w4 += amt;
  });

  const weeklyData = [
    { week: 'Week 1', revenue: w1 },
    { week: 'Week 2', revenue: w2 },
    { week: 'Week 3', revenue: w3 },
    { week: 'Week 4', revenue: w4 },
  ];

  // 3. Clients: Real counts and percentage change
  const monthClients = (clients || []).filter(c => {
    const cDate = String(c.created_at || c.orders?.[0]?.order_date || '');
    return isAllTime || cDate.startsWith(selectedMonth);
  });
  const prevMonthClients = (clients || []).filter(c => {
    const cDate = String(c.created_at || c.orders?.[0]?.order_date || '');
    return cDate.startsWith(prevMonth);
  });
  const totalClientsCount = isAllTime ? (clients || []).length : monthClients.length;
  const clientDiff = monthClients.length - prevMonthClients.length;
  const clientPct = prevMonthClients.length > 0 
    ? Math.round((clientDiff / prevMonthClients.length) * 100) 
    : (monthClients.length > 0 ? 100 : 0);
  const clientPctLabel = clientPct >= 0 ? `↑${clientPct}%` : `↓${Math.abs(clientPct)}%`;

  // 4. Orders: Real counts and percentage change
  const allOrders = (clients || []).flatMap(c => (c.orders || []).map(o => ({ ...o, clientName: c.name })));
  const monthOrders = allOrders.filter(o => {
    const d = o.order_date || o.created_at || '';
    return d.startsWith(selectedMonth);
  });
  const prevMonthOrders = allOrders.filter(o => {
    const d = o.order_date || o.created_at || '';
    return d.startsWith(prevMonth);
  });
  const totalOrdersCount = monthOrders.length;
  const ordersDiff = monthOrders.length - prevMonthOrders.length;
  const ordersPct = prevMonthOrders.length > 0 
    ? Math.round((ordersDiff / prevMonthOrders.length) * 100) 
    : (monthOrders.length > 0 ? 100 : 0);
  const ordersPctLabel = ordersPct >= 0 ? `↑${ordersPct}%` : `↓${Math.abs(ordersPct)}%`;

  // 5. Completed Projects: Real counts and percentage change
  const monthCompleted = allOrders.filter(o => {
    const isComp = o.status === 'Completed';
    const d = o.updated_at || o.order_date || o.created_at || '';
    return isComp && d.startsWith(selectedMonth);
  });
  const prevMonthCompleted = allOrders.filter(o => {
    const isComp = o.status === 'Completed';
    const d = o.updated_at || o.order_date || o.created_at || '';
    return isComp && d.startsWith(prevMonth);
  });
  const completedProjectsCount = monthCompleted.length;
  const completedDiff = monthCompleted.length - prevMonthCompleted.length;
  const completedPct = prevMonthCompleted.length > 0 
    ? Math.round((completedDiff / prevMonthCompleted.length) * 100) 
    : (monthCompleted.length > 0 ? 100 : 0);
  const completedPctLabel = completedPct >= 0 ? `↑${completedPct}%` : `↓${Math.abs(completedPct)}%`;

  // Dynamic weekly arrays for top KPI Sparklines
  const getWeeklyCounts = (items, dateKey) => {
    const w = [0, 0, 0, 0];
    (items || []).forEach((it) => {
      const d = new Date(it[dateKey] || it.created_at || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0]++;
      else if (day <= 14) w[1]++;
      else if (day <= 21) w[2]++;
      else w[3]++;
    });
    return w;
  };

  const revenueWeekly = [w1, w2, w3, w4];
  const clientsWeekly = getWeeklyCounts(monthClients, 'created_at');
  const ordersWeekly = getWeeklyCounts(monthOrders, 'order_date');
  const completedWeekly = getWeeklyCounts(monthCompleted, 'updated_at');

  // 6. Real Tasks Formatting with Date and Priority
  const formatTaskDate = (dStr) => {
    if (!dStr) return 'Oct 05';
    try {
      const d = new Date(dStr);
      if (isNaN(d.getTime())) return dStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    } catch {
      return dStr;
    }
  };

  const displayTasks = (tasks || []).map((t) => {
    const prio = (t.priority || 'Medium').toLowerCase();
    let dotColor = 'bg-[#F97316]';
    let pillClass = 'bg-[#FFF8F0] text-[#EA580C] border border-[#FFEDD5]';
    let prioLabel = 'Medium';

    if (prio === 'high' || prio === 'urgent') {
      dotColor = 'bg-[#EF4444]';
      pillClass = 'bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2]';
      prioLabel = 'High';
    } else if (prio === 'low') {
      dotColor = 'bg-[#10B981]';
      pillClass = 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]';
      prioLabel = 'Low';
    }

    return {
      id: t.task_id,
      title: t.task_title,
      client_name: t.orders?.clients?.name || t.assigned_to_name || 'Assigned task',
      date: formatTaskDate(t.due_at || t.created_at),
      status: t.status,
      priority: prioLabel,
      dotColor,
      pillClass,
    };
  });

  const overdueCount = (tasks || []).filter(t => t.status !== 'Completed' && (t.priority === 'Urgent' || (t.due_at && new Date(t.due_at) < new Date()))).length;
  const pendingCount = (tasks || []).filter(t => t.status === 'Pending').length;
  const inProgressCount = (tasks || []).filter(t => t.status === 'In Progress').length;
  const upcomingCount = (tasks || []).filter(t => t.status === 'Review' || t.status === 'Upcoming' || (t.status !== 'Completed' && t.due_at && new Date(t.due_at) > new Date())).length;

  // 7. Recent Clients (Filtered by selectedMonth)
  const displayClients = monthClients.slice(0, 5).map((c, i) => {
    const order = c.orders?.[0];
    const eventName = order?.order_items?.[0]?.event_name || 'Wedding Invitation';
    return {
      id: c.client_id,
      clientObj: c,
      initials: (c.name || 'CL').slice(0, 2).toUpperCase(),
      avatarBg: ['bg-amber-100 text-amber-800', 'bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800'][i % 3],
      name: c.name,
      subtitle: `1 ${eventName.toLowerCase()}`,
      status: c.status || order?.status || 'In Progress',
      statusClass: (c.status === 'Completed' || order?.status === 'Completed') 
        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
        : 'bg-blue-50 text-blue-700 border border-blue-200',
      date: new Date(c.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
  });

  const dateRangeOptions = [
    { label: 'September 2026', monthKey: '2026-09' },
    { label: 'October 2026', monthKey: '2026-10' },
    { label: 'November 2026', monthKey: '2026-11' },
    { label: 'December 2026', monthKey: '2026-12' },
    { label: 'January 2027', monthKey: '2027-01' },
    { label: 'February 2027', monthKey: '2027-02' },
    { label: 'March 2027', monthKey: '2027-03' },
    { label: 'April 2027', monthKey: '2027-04' },
    { label: 'May 2027', monthKey: '2027-05' },
    { label: 'June 2027', monthKey: '2027-06' },
    { label: 'July 2027', monthKey: '2027-07' },
    { label: 'August 2027', monthKey: '2027-08' },
    { label: 'September 2027', monthKey: '2027-09' },
    { label: 'October 2027', monthKey: '2027-10' },
    { label: 'November 2027', monthKey: '2027-11' },
    { label: 'December 2027', monthKey: '2027-12' },
    { label: 'All Time', monthKey: 'All' },
  ];
  const currentRangeLabel = dateRangeOptions.find((o) => o.monthKey === selectedMonth)?.label || 'October 2026';

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header with Date Range & Title ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time overview of Ahvaan wedding invitations &amp; finances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Calendar Month Selector Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentRangeLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-30 text-xs">
                {dateRangeOptions.map((range) => (
                  <button
                    key={range.monthKey}
                    type="button"
                    onClick={() => {
                      if (setSelectedMonth) setSelectedMonth(range.monthKey);
                      setShowDatePicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedMonth === range.monthKey ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 1. Top KPI Row (Exact 4 Cards as per image) ───────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Clients */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="text-[12px] font-medium text-slate-500">Total Clients</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalClientsCount}</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold z-10">
            <span className={`${clientDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-bold mr-1`}>
              {clientPctLabel}
            </span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
          {/* Subtle blue wave */}
          <div className="w-24 h-10 absolute right-2 bottom-2 pointer-events-none">
            <Sparkline data={clientsWeekly} color="#3b82f6" width={90} height={36} />
          </div>
        </div>

        {/* Total orders */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="text-[12px] font-medium text-slate-500">Total orders</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalOrdersCount}</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold z-10">
            <span className={`${ordersDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-bold mr-1`}>
              {ordersPctLabel}
            </span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
          {/* Subtle green wave */}
          <div className="w-24 h-10 absolute right-2 bottom-2 pointer-events-none">
            <Sparkline data={ordersWeekly} color="#10b981" width={90} height={36} />
          </div>
        </div>

        {/* Completed Projects */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="text-[12px] font-medium text-slate-500">Completed Projects</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{completedProjectsCount}</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold z-10">
            <span className={`${completedDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-bold mr-1`}>
              {completedPctLabel}
            </span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
          {/* Subtle purple wave */}
          <div className="w-24 h-10 absolute right-2 bottom-2 pointer-events-none">
            <Sparkline data={completedWeekly} color="#8b5cf6" width={90} height={36} />
          </div>
        </div>

        {/* Revenue (This Month) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="text-[12px] font-medium text-slate-500">Revenue (This Month)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{formatCurrency(displayRevenue)}</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold z-10">
            <span className={`${revenueDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-bold mr-1`}>
              {revenuePctLabel}
            </span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
          {/* Subtle gold wave */}
          <div className="w-24 h-10 absolute right-2 bottom-2 pointer-events-none">
            <Sparkline data={revenueWeekly} color="#f59e0b" width={90} height={36} />
          </div>
        </div>
      </div>

      {/* ── 2. Middle Row: Revenue Overview Bar Chart & Today's Tasks ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview (Bar Chart) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Revenue Overview</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {formatCurrency(displayRevenue)}
            </h3>
          </div>

          {/* Bar Chart matching image exactly */}
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 25, right: 10, left: -20, bottom: 0 }} barSize={44}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8' }} 
                  ticks={[0, 50000, 100000, 150000, 200000]}
                  tickFormatter={(v) => (v === 0 ? '0' : v === 50000 ? '50K' : v === 100000 ? '1L' : v === 150000 ? '1.5L' : '2L')}
                  domain={[0, 200000]}
                />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#2563eb" 
                  radius={[8, 8, 0, 0]}
                  label={({ x, y, width, value }) => (
                    <text 
                      x={x + width / 2} 
                      y={y - 8} 
                      fill="#1e293b" 
                      textAnchor="middle" 
                      fontSize={11} 
                      fontWeight={700}
                    >
                      {`₹${Number(value).toLocaleString()}`}
                    </text>
                  )}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Today's Tasks</h2>
            
            {/* 4 Summary Pills */}
            <div className="flex items-center gap-2 mt-3.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
              <span className="px-3 py-1 rounded-full text-[13px] font-medium bg-[#FEF2F2] text-[#DC2626] whitespace-nowrap">
                <span className="font-bold mr-1">{overdueCount}</span> Overdue
              </span>
              <span className="px-3 py-1 rounded-full text-[13px] font-medium bg-[#FFFBEB] text-[#D97706] whitespace-nowrap">
                <span className="font-bold mr-1">{pendingCount}</span> Pending
              </span>
              <span className="px-3 py-1 rounded-full text-[13px] font-medium bg-[#EFF6FF] text-[#2563EB] whitespace-nowrap">
                <span className="font-bold mr-1">{inProgressCount}</span> In Progress
              </span>
              <span className="px-3 py-1 rounded-full text-[13px] font-medium bg-[#FAF5FF] text-[#9333EA] whitespace-nowrap">
                <span className="font-bold mr-1">{upcomingCount}</span> Upcoming
              </span>
            </div>

            {/* Task Items List */}
            <div className="divide-y divide-slate-100">
              {displayTasks.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No tasks recorded for this period.
                </div>
              ) : (
                displayTasks.slice(0, 5).map((t) => (
                  <div 
                    key={t.id} 
                    onClick={() => onNavigateTab('tasks')}
                    className="flex items-center justify-between gap-3 py-3 cursor-pointer group hover:bg-slate-50/70 -mx-3 px-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${t.dotColor} flex-shrink-0`} />
                      <div className="min-w-0">
                        <h4 className="text-[14px] font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                          {t.title}
                        </h4>
                        <p className="text-[13px] text-slate-400 truncate mt-0.5 font-normal">
                          {t.client_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[13px] text-slate-400 font-normal">{t.date}</span>
                      <span className={`px-3 py-1 rounded-full text-[12.5px] font-medium ${t.pillClass}`}>
                        {t.priority}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Bottom Row: Recent Clients & Quick Actions ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Clients</h2>
            <button
              type="button"
              onClick={() => onNavigateTab('clients')}
              className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <span>→</span>
            </button>
          </div>

          <div className="space-y-4">
            {displayClients.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  if (c.clientObj && onSelectClient) {
                    onSelectClient(c.clientObj);
                  } else {
                    onNavigateTab('clients');
                  }
                }}
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${c.avatarBg} font-bold text-xs flex items-center justify-center flex-shrink-0`}>
                    {c.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {c.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.statusClass}`}>
                    {c.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
                    {c.date}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight mb-4">Quick Actions</h2>
            
            <div className="space-y-3.5">
              {/* Add New Client Tile */}
              <div
                onClick={onOpenAddClient}
                className="bg-[#F0F6FF] hover:bg-blue-100/70 border border-blue-100/80 rounded-2xl p-4 flex flex-col justify-between h-32 cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-blue-700">
                  <span>Add New Client</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Add Task Tile */}
              <div
                onClick={() => onOpenAddTask && onOpenAddTask()}
                className="bg-[#FEF8ED] hover:bg-amber-100/70 border border-amber-100/80 rounded-2xl p-4 flex flex-col justify-between h-32 cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E08A00] text-white flex items-center justify-center shadow-xs">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-amber-800">
                  <span>Add Task</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
