// =============================================================================
// src/pages/finance/ClientFinanceTab.jsx — Exact match for Figma media_1791189909044.png
// =============================================================================
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Users, 
  Search, 
  Calendar, 
  ChevronDown, 
  RotateCcw, 
  MoreVertical, 
  Eye, 
  Pencil, 
  ChevronLeft, 
  ChevronRight,
  Trash2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';
import EmptyState from '../../components/common/EmptyState';
import Sparkline from '../../components/common/Sparkline';

export default function ClientFinanceTab({ onOpenAddPayment, onSelectClient, onEditClient }) {
  const { clients, payments, selectedMonth = '2026-10', deleteClients } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  // Selected checkboxes
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live amounts dynamically for selectedMonth
  const isAllTime = !selectedMonth || selectedMonth === 'All';
  const effectiveMonth = isAllTime ? '2026-10' : selectedMonth;
  const [currY, currM] = effectiveMonth.split('-').map(Number);
  const prevY = currM === 1 ? currY - 1 : currY;
  const prevM = currM === 1 ? 12 : currM - 1;
  const prevMonthStr = `${prevY}-${String(prevM).padStart(2, '0')}`;

  const safePayments = Array.isArray(payments) ? payments : [];
  const safeClients = Array.isArray(clients) ? clients : [];

  const monthPayments = safePayments.filter(p => isAllTime || String(p.payment_date || p.created_at || '').startsWith(selectedMonth));
  const prevMonthPayments = safePayments.filter(p => String(p.payment_date || p.created_at || '').startsWith(prevMonthStr));

  const monthClients = safeClients.filter(c => {
    const d = String(c.created_at || c.orders?.[0]?.order_date || '');
    return isAllTime || d.startsWith(selectedMonth);
  });
  const prevMonthClients = safeClients.filter(c => {
    const d = String(c.created_at || c.orders?.[0]?.order_date || '');
    return d.startsWith(prevMonthStr);
  });

  const totalClientsCount = isAllTime ? safeClients.length : monthClients.length;
  const totalAmountLive = isAllTime 
    ? safeClients.reduce((acc, c) => acc + (Number(c.orders?.[0]?.total_amount) || 0), 0)
    : monthClients.reduce((acc, c) => acc + (Number(c.orders?.[0]?.total_amount) || 0), 0);
  
  const totalReceivedLive = monthPayments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
  const totalPendingLive = Math.max(0, totalAmountLive - totalReceivedLive);

  const displayTotalAmount = totalAmountLive;
  const displayReceivedAmount = totalReceivedLive;
  const displayPendingAmount = totalPendingLive;

  // Paid and pending client counts
  const paidClientIds = new Set(monthPayments.map(p => p.orders?.client_id || p.client_id).filter(Boolean));
  const paidClientsCount = isAllTime
    ? (paidClientIds.size > 0 ? paidClientIds.size : safeClients.filter(c => (Number(c.orders?.[0]?.amount_paid) || 0) > 0).length)
    : (paidClientIds.size > 0 ? paidClientIds.size : monthClients.filter(c => (Number(c.orders?.[0]?.amount_paid) || 0) > 0).length);
  const pendingClientsCount = Math.max(0, totalClientsCount - paidClientsCount);

  // Growth percentage
  const clientsDiff = totalClientsCount - prevMonthClients.length;
  const clientsPct = prevMonthClients.length > 0 ? Math.round((clientsDiff / prevMonthClients.length) * 100) : (totalClientsCount > 0 ? 100 : 0);
  const clientsPctLabel = clientsPct >= 0 ? `↑ ${clientsPct}% vs last month` : `↓ ${Math.abs(clientsPct)}% vs last month`;

  // Weekly distribution for sparklines
  const getPaymentsWeekly = () => {
    const w = [0, 0, 0, 0];
    monthPayments.forEach(p => {
      const d = new Date(p.payment_date || p.created_at || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0] += Number(p.amount) || 0;
      else if (day <= 14) w[1] += Number(p.amount) || 0;
      else if (day <= 21) w[2] += Number(p.amount) || 0;
      else w[3] += Number(p.amount) || 0;
    });
    return w;
  };
  const paymentsWeekly = getPaymentsWeekly();

  const getClientsWeekly = () => {
    const w = [0, 0, 0, 0];
    monthClients.forEach(c => {
      const d = new Date(c.created_at || c.orders?.[0]?.order_date || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0]++;
      else if (day <= 14) w[1]++;
      else if (day <= 21) w[2]++;
      else w[3]++;
    });
    return w;
  };
  const clientsWeekly = getClientsWeekly();

  const getPendingWeekly = () => {
    const w = [0, 0, 0, 0];
    monthClients.forEach(c => {
      const order = c.orders?.[0];
      const pending = order?.pending_amount ?? (order ? Math.max(0, (order.total_amount || 0) - (order.amount_paid || 0)) : 0);
      if (pending > 0) {
        const d = new Date(c.created_at || order?.order_date || Date.now());
        const day = isNaN(d.getDate()) ? 1 : d.getDate();
        if (day <= 7) w[0] += pending;
        else if (day <= 14) w[1] += pending;
        else if (day <= 21) w[2] += pending;
        else w[3] += pending;
      }
    });
    return w;
  };
  const pendingWeekly = getPendingWeekly();

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Oct 20, 2026';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Helper to get events for a client
  const getClientEvents = (client) => {
    const order = client.orders?.[0];
    const items = order?.order_items || [];
    if (items.length > 0) {
      return items.map((it) => it.event_name || 'Wedding');
    }
    return ['Wedding'];
  };

  // Badge styling for event pill
  const getEventBadgeStyle = (ev) => {
    const name = (ev || '').toLowerCase();
    if (name.includes('wedding')) return 'bg-blue-50 text-blue-600 border-blue-100';
    if (name.includes('sangeet')) return 'bg-pink-50 text-pink-600 border-pink-100';
    if (name.includes('engagement')) return 'bg-rose-50 text-rose-600 border-rose-100';
    if (name.includes('house')) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (name.includes('baby')) return 'bg-rose-50 text-rose-600 border-rose-100';
    if (name.includes('reception')) return 'bg-purple-50 text-purple-600 border-purple-100';
    return 'bg-purple-50 text-purple-600 border-purple-100';
  };

  // Filter clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q));

      const events = getClientEvents(c);
      const matchesEvent =
        selectedEventType === 'All' ||
        events.some((ev) => ev.toLowerCase().includes(selectedEventType.toLowerCase()));

      const order = c.orders?.[0];
      const pending = order?.pending_amount ?? (order ? Math.max(0, (order.total_amount || 0) - (order.amount_paid || 0)) : 0);
      const paid = order?.amount_paid || 0;
      const total = order?.total_amount || 0;

      let paymentStatus = 'Pending';
      if (total > 0 && pending <= 0) paymentStatus = 'Paid';
      else if (paid > 0 && pending > 0) paymentStatus = 'Partial';

      const matchesStatus =
        selectedPaymentStatus === 'All' ||
        paymentStatus.toLowerCase() === selectedPaymentStatus.toLowerCase();

      // Calendar month matching
      let matchesMonth = true;
      if (selectedMonth && selectedMonth !== 'All') {
        const clientCreatedMatches = String(c.created_at || '').startsWith(selectedMonth);
        const orderDateMatches = String(order?.order_date || '').startsWith(selectedMonth);
        const clientPayments = safePayments.filter(p => p.order_id === order?.order_id || p.client_id === c.client_id);
        const hasPaymentInMonth = clientPayments.some(p => String(p.payment_date || p.created_at || '').startsWith(selectedMonth));
        matchesMonth = clientCreatedMatches || orderDateMatches || hasPaymentInMonth;
      }

      return matchesSearch && matchesEvent && matchesStatus && matchesMonth;
    });
  }, [clients, payments, searchTerm, selectedEventType, selectedPaymentStatus, selectedMonth]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedEventType('All');
    setSelectedPaymentStatus('All');
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = filteredClients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Checkbox handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedClients.length && paginatedClients.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedClients.map((c) => c.client_id));
    }
  };

  const handleToggleSelectRow = (clientId, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]
    );
  };

  const isAllSelected = paginatedClients.length > 0 && selectedIds.length === paginatedClients.length;

  const handleBatchDeleteClients = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected client(s)? All orders, events, payments, and tasks will be permanently removed.`)) {
      return;
    }
    try {
      await deleteClients(selectedIds);
      setSelectedIds([]);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete selected clients');
    }
  };

  return (
    <div className="space-y-6">
      {/* ── 4 KPI Cards with Dynamic Data & Real-Time Sparklines ──────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Amount */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Amount</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
                {formatCurrency(displayTotalAmount)}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{totalClientsCount} Clients</p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={clientsWeekly} color="#10b981" width={80} height={35} />
          </div>
        </div>

        {/* Card 2: Received Amount */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Received Amount</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
                {formatCurrency(displayReceivedAmount)}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{paidClientsCount} Clients</p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={paymentsWeekly} color="#0d9488" width={80} height={35} />
          </div>
        </div>

        {/* Card 3: Pending Amount */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Pending Amount</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
                {formatCurrency(displayPendingAmount)}
              </p>
              <p className="text-[11px] text-amber-600 font-medium mt-0.5">{pendingClientsCount} Clients</p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={pendingWeekly} color="#f59e0b" width={80} height={35} />
          </div>
        </div>

        {/* Card 4: Total Clients */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Clients</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
                {totalClientsCount}
              </p>
              <p className={`text-[11px] font-semibold mt-0.5 ${clientsPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {clientsPctLabel}
              </p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={clientsWeekly} color="#8b5cf6" width={80} height={35} />
          </div>
        </div>
      </div>

      {/* ── Filters Bar Matching Figma ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by client name or phone number..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/90 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-sm transition-all"
          />
        </div>

        {/* Event Type & Payment Status Dropdowns & Reset Button */}
        <div className="flex items-center gap-2">
          {/* Event Type Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowEventFilter(!showEventFilter);
                setShowStatusFilter(false);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Event Type{selectedEventType !== 'All' ? `: ${selectedEventType}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showEventFilter && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 text-xs">
                {['All', 'Wedding', 'Sangeet', 'Engagement', 'House Opening', 'Baby Shower', 'Reception'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setSelectedEventType(t);
                      setShowEventFilter(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedEventType === t ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t === 'All' ? 'All Event Types' : t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Payment Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStatusFilter(!showStatusFilter);
                setShowEventFilter(false);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Payment Status{selectedPaymentStatus !== 'All' ? `: ${selectedPaymentStatus}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showStatusFilter && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 text-xs">
                {['All', 'Paid', 'Partial', 'Pending'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setSelectedPaymentStatus(st);
                      setShowStatusFilter(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedPaymentStatus === st ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {st === 'All' ? 'All Statuses' : st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2.5 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl text-xs font-medium text-slate-700 shadow-sm transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Batch Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-blue-50/90 border border-blue-200 rounded-2xl text-xs shadow-xs animate-in fade-in-50 duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-semibold text-blue-900">
              {selectedIds.length} client{selectedIds.length > 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 text-slate-600 hover:bg-white rounded-xl font-medium transition-colors cursor-pointer"
            >
              Deselect All
            </button>
            <button
              type="button"
              onClick={handleBatchDeleteClients}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Client Finance Table Matching Figma media_1791189909044.png ───── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-visible">
        {filteredClients.length === 0 ? (
          <EmptyState
            title="No client payment records"
            description="Record payments or add clients to track financial collections."
            actionLabel="Add Payment"
            onAction={onOpenAddPayment}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 uppercase tracking-wider text-[11px] bg-slate-50/50">
                    <th className="py-3.5 px-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleToggleSelectAll}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-6 font-semibold">Client</th>
                    <th className="py-3.5 px-6 font-semibold">Event(s)</th>
                    <th className="py-3.5 px-6 font-semibold">Total Amount</th>
                    <th className="py-3.5 px-6 font-semibold">Paid Amount</th>
                    <th className="py-3.5 px-6 font-semibold">Pending Amount</th>
                    <th className="py-3.5 px-6 font-semibold">Last Payment Date</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedClients.map((client, i) => {
                    const order = client.orders?.[0];
                    const events = getClientEvents(client);
                    const totalAmt = Number(order?.total_amount) || 0;
                    const clientPayments = (payments || []).filter(p => p.order_id === order?.order_id || p.client_id === client.client_id);
                    const livePaid = clientPayments.length > 0 ? clientPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) : (Number(order?.amount_paid) || 0);
                    const paidAmt = livePaid;
                    const pendingAmt = Math.max(0, totalAmt - paidAmt);
                    const allPayments = (clientPayments.length > 0 ? clientPayments : (order?.payments || [])).slice().sort((a, b) => new Date(b.payment_date || b.created_at) - new Date(a.payment_date || a.created_at));
                    const lastPaymentDate = allPayments[0]?.payment_date || order?.order_date || client.created_at;

                    const rawClientName = client?.name || 'Client';
                    const initials = typeof rawClientName === 'string'
                      ? rawClientName
                          .split('&')[0]
                          ?.trim()
                          .split(' ')
                          .map((p) => p[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2) || 'CL'
                      : 'CL';

                    const avatarBgs = [
                      'bg-amber-100 text-amber-800',
                      'bg-rose-100 text-rose-800',
                      'bg-emerald-100 text-emerald-800',
                      'bg-purple-100 text-purple-800',
                      'bg-blue-100 text-blue-800',
                      'bg-sky-100 text-sky-800',
                      'bg-teal-100 text-teal-800',
                      'bg-pink-100 text-pink-800',
                    ];
                    const avatarStyle = avatarBgs[i % avatarBgs.length];
                    const isSelected = selectedIds.includes(client.client_id);
                    const isMenuOpen = activeMenuId === client.client_id;

                    return (
                      <tr
                        key={client.client_id}
                        onClick={() => onSelectClient(client)}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                          isSelected ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td
                          className="py-4 px-4 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleToggleSelectRow(client.client_id, e)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>

                        {/* Client Column with Monogram Avatar */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${avatarStyle}`}>
                              {initials}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-xs">
                                {client.name}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                                {client.phone}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Event(s) Column: Colored Pills */}
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1.5">
                            {events.map((ev, eIdx) => (
                              <span
                                key={eIdx}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getEventBadgeStyle(
                                  ev
                                )}`}
                              >
                                {ev}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Total Amount */}
                        <td className="py-4 px-6 font-bold text-slate-800">
                          {formatCurrency(totalAmt)}
                        </td>

                        {/* Paid Amount */}
                        <td className="py-4 px-6 font-bold text-slate-800">
                          {formatCurrency(paidAmt)}
                        </td>

                        {/* Pending Amount */}
                        <td className={`py-4 px-6 font-bold ${pendingAmt > 0 ? 'text-slate-900' : 'text-slate-800'}`}>
                          {formatCurrency(pendingAmt)}
                        </td>

                        {/* Last Payment Date */}
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          {formatDate(lastPaymentDate)}
                        </td>

                        {/* Actions: Direct View and Edit Buttons */}
                        <td
                          className="py-4 px-6 text-right whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectClient(client);
                              }}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="View Payments & Details"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                              <span>View</span>
                            </button>

                            {onEditClient && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditClient(client);
                                }}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                                title="Edit Client & Order"
                              >
                                <Pencil className="w-3.5 h-3.5 text-blue-600" />
                                <span>Edit</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Matching Figma */}
            <div className="px-6 py-4 border-t border-slate-200/80 bg-white flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-500">
                Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredClients.length)} of {filteredClients.length} clients
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
