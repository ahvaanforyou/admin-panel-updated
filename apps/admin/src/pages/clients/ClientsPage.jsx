// =============================================================================
// src/pages/clients/ClientsPage.jsx — Redesigned to match Figma media_1791121690592.png
// =============================================================================
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  Eye, 
  Pencil, 
  CreditCard,
  Users, 
  Clock, 
  CheckCircle2, 
  PauseCircle,
  SlidersHorizontal,
  Trash2
} from 'lucide-react';
import StatusChip from '../../components/common/StatusChip';
import EmptyState from '../../components/common/EmptyState';
import Sparkline from '../../components/common/Sparkline';
import { useData } from '../../context/DataContext';

export default function ClientsPage({ onOpenAddClient, onSelectClient, onEditClient, onOpenAddPayment }) {
  const { clients = [], templates = [], selectedMonth = '2026-10', setSelectedMonth, deleteClient, deleteClients } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTemplateFilter, setSelectedTemplateFilter] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('Oct 1, 2026 – Oct 31, 2026');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showTemplateFilter, setShowTemplateFilter] = useState(false);

  // Selected row checkboxes for multi-select
  const [selectedIds, setSelectedIds] = useState([]);

  // Active 3-dots menu popover client_id
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

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Helper to extract templates & events for a client
  const getClientTemplates = (client) => {
    const order = client.orders?.[0];
    const items = order?.order_items || [];
    if (items.length === 0) {
      return [{ name: 'Royal Elegance', event: 'Wedding' }];
    }
    return items.map((it) => ({
      id: it.order_item_id,
      name: it.templates?.name || it.template_name || 'Royal Elegance',
      event: it.event_name || 'Wedding',
    }));
  };

  // Badge styling for template pills matching Figma
  const getTemplateBadgeStyle = (event, index) => {
    const ev = (event || '').toLowerCase();
    if (ev.includes('wedding')) {
      return 'bg-blue-50 text-blue-600 border-blue-100';
    }
    if (ev.includes('sangeet')) {
      return 'bg-purple-50 text-purple-600 border-purple-100';
    }
    if (ev.includes('reception')) {
      return 'bg-pink-50 text-pink-600 border-pink-100';
    }
    if (ev.includes('engagement')) {
      return 'bg-amber-50 text-amber-700 border-amber-100';
    }
    const colorStyles = [
      'bg-indigo-50 text-indigo-600 border-indigo-100',
      'bg-teal-50 text-teal-700 border-teal-100',
      'bg-sky-50 text-sky-700 border-sky-100',
    ];
    return colorStyles[index % colorStyles.length];
  };

  // Helper to extract client submission date (falls back to order_date or created_at)
  const getClientSubmissionDate = (c) => {
    return c.orders?.[0]?.submission_date || c.submission_date || c.orders?.[0]?.order_date || c.created_at || '';
  };

  // Dynamic KPI calculations connected to selectedMonth
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

  const currentRangeLabel = dateRangeOptions.find(o => o.monthKey === selectedMonth)?.label || (selectedMonth === 'All' ? 'All Time' : selectedMonth);

  const [currY, currM] = (selectedMonth && selectedMonth !== 'All' ? selectedMonth : '2026-10').split('-').map(Number);
  const prevY = currM === 1 ? currY - 1 : currY;
  const prevM = currM === 1 ? 12 : currM - 1;
  const prevMonthStr = `${prevY}-${String(prevM).padStart(2, '0')}`;

  // Filter clients for KPIs strictly based on submission date
  const monthClients = selectedMonth === 'All' ? clients : clients.filter(c => {
    const d = String(getClientSubmissionDate(c));
    return d.startsWith(selectedMonth);
  });

  const prevMonthClients = clients.filter(c => {
    const d = String(getClientSubmissionDate(c));
    return d.startsWith(prevMonthStr);
  });

  const totalClientsCount = monthClients.length;
  const inProgressCount = monthClients.filter(c => (c.status || c.orders?.[0]?.status || 'In Progress') === 'In Progress').length;
  const completedCount = monthClients.filter(c => (c.status || c.orders?.[0]?.status) === 'Completed').length;
  const onHoldCount = monthClients.filter(c => ['On Hold', 'In Review', 'Review'].includes(c.status || c.orders?.[0]?.status)).length;

  const prevTotalCount = prevMonthClients.length;
  const prevInProgressCount = prevMonthClients.filter(c => (c.status || c.orders?.[0]?.status || 'In Progress') === 'In Progress').length;
  const prevCompletedCount = prevMonthClients.filter(c => (c.status || c.orders?.[0]?.status) === 'Completed').length;
  const prevOnHoldCount = prevMonthClients.filter(c => ['On Hold', 'In Review', 'Review'].includes(c.status || c.orders?.[0]?.status)).length;

  const calcDiff = (curr, prev) => {
    if (prev === 0) return { diff: curr > 0 ? 100 : 0, label: curr > 0 ? '↑ 100%' : '0%', isPos: true };
    const pct = Math.round(((curr - prev) / prev) * 100);
    return { diff: pct, label: pct >= 0 ? `↑ ${pct}%` : `↓ ${Math.abs(pct)}%`, isPos: pct >= 0 };
  };

  const totalDiff = calcDiff(totalClientsCount, prevTotalCount);
  const inProgressDiff = calcDiff(inProgressCount, prevInProgressCount);
  const completedDiff = calcDiff(completedCount, prevCompletedCount);
  const onHoldDiff = calcDiff(onHoldCount, prevOnHoldCount);

  // Weekly counts for real-time dynamic sparkline graphs (Weeks 1 to 4)
  const getWeeklyCounts = (filterFn) => {
    const w = [0, 0, 0, 0];
    monthClients.forEach(c => {
      if (filterFn && !filterFn(c)) return;
      const d = new Date(c.created_at || c.orders?.[0]?.order_date || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0]++;
      else if (day <= 14) w[1]++;
      else if (day <= 21) w[2]++;
      else w[3]++;
    });
    return w;
  };

  const clientsWeekly = getWeeklyCounts();
  const inProgressWeekly = getWeeklyCounts(c => (c.status || c.orders?.[0]?.status || 'In Progress') === 'In Progress');
  const completedWeekly = getWeeklyCounts(c => (c.status || c.orders?.[0]?.status) === 'Completed');
  const onHoldWeekly = getWeeklyCounts(c => ['On Hold', 'In Review', 'Review'].includes(c.status || c.orders?.[0]?.status));

  // Filter clients by search, status, template, and selected month (by submission date)
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      // Month calendar filter based on submission date
      if (selectedMonth && selectedMonth !== 'All') {
        const d = String(getClientSubmissionDate(c));
        if (!d.startsWith(selectedMonth)) return false;
      }

      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q));

      const clientStatus = c.status || c.orders?.[0]?.status || 'In Progress';
      const matchesStatus =
        selectedStatus === 'All' || clientStatus.toLowerCase() === selectedStatus.toLowerCase();

      const templatesList = getClientTemplates(c);
      const matchesTemplate =
        selectedTemplateFilter === 'All' ||
        templatesList.some((t) => t.name.toLowerCase().includes(selectedTemplateFilter.toLowerCase()));

      return matchesSearch && matchesStatus && matchesTemplate;
    });
  }, [clients, searchTerm, selectedStatus, selectedTemplateFilter, selectedMonth]);

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = filteredClients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Checkbox handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedClients.length && paginatedClients.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedClients.map(c => c.client_id));
    }
  };

  const handleToggleSelectRow = (clientId, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]
    );
  };

  const isAllSelected = paginatedClients.length > 0 && selectedIds.length === paginatedClients.length;

  const handleDeleteSingleClient = async (client) => {
    if (!window.confirm(`Are you sure you want to delete ${client.name}? All orders, events, payments, and tasks for this client will be permanently deleted.`)) {
      return;
    }
    try {
      await deleteClient(client.client_id);
      setSelectedIds((prev) => prev.filter((id) => id !== client.client_id));
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete client');
    }
  };

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
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header & Date Range / Add Button ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clients</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage client details, wedding information and invitation progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Top Right Date Range Dropdown Pill */}
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
                      setSelectedDateRange(range.label);
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

          {/* Add New Client Primary Button */}
          <button
            type="button"
            onClick={onOpenAddClient}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* ── 4 KPI Cards with Dynamic Percentages & Real Sparklines ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Clients */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">Total Clients</span>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{totalClientsCount}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[11px] font-semibold ${totalDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {totalDiff.label}
                </span>
                <span className="text-[11px] text-slate-400">from last month</span>
              </div>
            </div>
          </div>
          <div className="w-20 h-10 flex items-center justify-end">
            <Sparkline data={clientsWeekly} color="#3b82f6" />
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">In Progress</span>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{inProgressCount}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[11px] font-semibold ${inProgressDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {inProgressDiff.label}
                </span>
                <span className="text-[11px] text-slate-400">from last month</span>
              </div>
            </div>
          </div>
          <div className="w-20 h-10 flex items-center justify-end">
            <Sparkline data={inProgressWeekly} color="#06b6d4" />
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">Completed</span>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{completedCount}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[11px] font-semibold ${completedDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {completedDiff.label}
                </span>
                <span className="text-[11px] text-slate-400">from last month</span>
              </div>
            </div>
          </div>
          <div className="w-20 h-10 flex items-center justify-end">
            <Sparkline data={completedWeekly} color="#10b981" />
          </div>
        </div>

        {/* Card 4: On Hold */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <PauseCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">On Hold</span>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{onHoldCount}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[11px] font-semibold ${onHoldDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {onHoldDiff.label}
                </span>
                <span className="text-[11px] text-slate-400">from last month</span>
              </div>
            </div>
          </div>
          <div className="w-20 h-10 flex items-center justify-end">
            <Sparkline data={onHoldWeekly} color="#f43f5e" />
          </div>
        </div>
      </div>

{/* ── Search & Filters Bar Matching Figma ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
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

        {/* Status & Template Dropdown Filters */}
        <div className="flex items-center gap-2">
          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStatusFilter(!showStatusFilter);
                setShowTemplateFilter(false);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Status{selectedStatus !== 'All' ? `: ${selectedStatus}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showStatusFilter && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 text-xs">
                {['All', 'In Progress', 'In Review', 'Completed', 'Template Chosen', 'On Hold'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(st);
                      setShowStatusFilter(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      selectedStatus === st ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Template Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTemplateFilter(!showTemplateFilter);
                setShowStatusFilter(false);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Template{selectedTemplateFilter !== 'All' ? `: ${selectedTemplateFilter}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showTemplateFilter && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 text-xs max-h-60 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplateFilter('All');
                    setShowTemplateFilter(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedTemplateFilter === 'All' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Templates
                </button>
                {templates.map((tpl) => (
                  <button
                    key={tpl.template_id}
                    type="button"
                    onClick={() => {
                      setSelectedTemplateFilter(tpl.name);
                      setShowTemplateFilter(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors truncate ${
                      selectedTemplateFilter === tpl.name ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            )}
          </div>
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

      {/* ── Clients Table Matching Figma media_1791121690592.png ───────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-visible">
        {filteredClients.length === 0 ? (
          <EmptyState
            title="No clients found"
            description={searchTerm ? "No clients match your search query." : "You have not added any clients yet."}
            actionLabel="Add New Client"
            onAction={onOpenAddClient}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 uppercase tracking-wider text-[11px] bg-slate-50/50">
                    {/* Checkbox Header */}
                    <th className="py-3.5 px-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleToggleSelectAll}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-6 font-semibold">CLIENT</th>
                    <th className="py-3.5 px-6 font-semibold">TEMPLATES</th>
                    <th className="py-3.5 px-6 font-semibold">WEDDING DATE</th>
                    <th className="py-3.5 px-6 font-semibold">SUBMISSION DATE</th>
                    <th className="py-3.5 px-6 font-semibold">STATUS</th>
                    <th className="py-3.5 px-6 font-semibold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedClients.map((client, i) => {
                    const latestOrder = client.orders?.[0];
                    const templatesList = getClientTemplates(client);
                    const weddingDate =
                      latestOrder?.order_items?.[0]?.event_date ||
                      latestOrder?.order_date ||
                      client.created_at;
                    const submissionDate =
                      latestOrder?.submission_date ||
                      latestOrder?.order_date ||
                      client.created_at;
                    const clientStatus = client.status || latestOrder?.status || 'In Progress';
                    const isSelected = selectedIds.includes(client.client_id);
                    const isMenuOpen = activeMenuId === client.client_id;
                    const openUpwards = i >= paginatedClients.length - 2 && paginatedClients.length >= 2;

                    return (
                      <tr
                        key={client.client_id}
                        onClick={() => onSelectClient(client)}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                          isSelected ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        {/* Checkbox Row Cell */}
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

                        {/* CLIENT Column: Name bold & phone underneath, NO avatar */}
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-xs">
                              {client.name}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                              {client.phone}
                            </p>
                          </div>
                        </td>

                        {/* TEMPLATES Column: Colored Pills with event names */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1.5 items-start">
                            {templatesList.map((tpl, i) => (
                              <span
                                key={tpl.id || i}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border ${getTemplateBadgeStyle(
                                  tpl.event,
                                  i
                                )}`}
                              >
                                {tpl.name} ({tpl.event})
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* WEDDING DATE Column: Calendar icon + formatted date */}
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{formatDate(weddingDate)}</span>
                          </div>
                        </td>

                        {/* SUBMISSION DATE Column: Calendar icon + formatted date */}
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{formatDate(submissionDate)}</span>
                          </div>
                        </td>

                        {/* STATUS Column: Pill badge with colored dot */}
                        <td className="py-4 px-6">
                          <StatusChip status={clientStatus} />
                        </td>

                        {/* ACTIONS Column: 3 Vertical Dots with Dropdown Menu */}
                        <td
                          className="py-4 px-6 text-right relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="inline-block relative text-left">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : client.client_id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                              <div
                                ref={menuRef}
                                className={`absolute right-0 w-44 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 text-xs text-left animate-in fade-in-50 zoom-in-95 duration-100 ${
                                  openUpwards ? 'bottom-full mb-1' : 'top-full mt-1'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(null);
                                    onSelectClient(client);
                                  }}
                                  className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                                  <span>View Details</span>
                                </button>

                                {onEditClient && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(null);
                                      onEditClient(client);
                                    }}
                                    className="w-full flex items-center gap-2 px-3.5 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                    <span>Edit Client</span>
                                  </button>
                                )}

                                {onOpenAddPayment && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(null);
                                      onOpenAddPayment(client);
                                    }}
                                    className="w-full flex items-center gap-2 px-3.5 py-2 text-emerald-600 hover:bg-emerald-50 transition-colors font-medium border-t border-slate-100 mt-1"
                                  >
                                    <CreditCard className="w-3.5 h-3.5" />
                                    <span>Record Payment</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(null);
                                    handleDeleteSingleClient(client);
                                  }}
                                  className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium border-t border-slate-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete Client</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Matching Figma media_1791121690592.png */}
            <div className="px-6 py-4 border-t border-slate-200/80 bg-white flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-500">
                Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredClients.length)} of {filteredClients.length} clients
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
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
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
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
