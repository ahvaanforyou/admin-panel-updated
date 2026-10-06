// =============================================================================
// src/pages/finance/ExpensesTab.jsx — Exact match for Figma media_1791194061474.png
// =============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { 
  CreditCard, 
  Megaphone, 
  Settings, 
  FileText, 
  Search, 
  LayoutGrid, 
  Calendar, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Laptop, 
  Navigation, 
  Gift, 
  Figma, 
  Utensils, 
  Triangle, 
  Box,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';
import Sparkline from '../../components/common/Sparkline';

export default function ExpensesTab({ onOpenAddExpense, onEditExpense }) {
  const { expenses, deleteExpense, selectedMonth = '2026-10' } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMethod, setSelectedMethod] = useState('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('This Month');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Preset reference expenses matching media_1791194061474.png
  const fallbackExpenses = [
    {
      expense_id: 'e1',
      date: '2026-09-28',
      title: 'Instagram Ads',
      category: 'Marketing',
      amount: 2500,
      payment_method: 'UPI',
      added_by_name: 'Chaitu',
      added_by_initial: 'C',
      added_by_bg: 'bg-blue-600 text-white',
      iconType: 'ads',
    },
    {
      expense_id: 'e2',
      date: '2026-09-26',
      title: 'Canva Pro Subscription',
      category: 'Tools',
      amount: 1200,
      payment_method: 'Card',
      added_by_name: 'Farru',
      added_by_initial: 'F',
      added_by_bg: 'bg-slate-900 text-white',
      iconType: 'canva',
    },
    {
      expense_id: 'e3',
      date: '2026-09-24',
      title: 'Travel (Client Meeting)',
      category: 'Operations',
      amount: 4800,
      payment_method: 'UPI',
      added_by_name: 'Thanu',
      added_by_initial: 'T',
      added_by_bg: 'bg-teal-500 text-white',
      iconType: 'travel',
    },
    {
      expense_id: 'e4',
      date: '2026-09-20',
      title: 'Client Gift',
      category: 'Gifts & Others',
      amount: 2000,
      payment_method: 'UPI',
      added_by_name: 'Chaitu',
      added_by_initial: 'C',
      added_by_bg: 'bg-blue-600 text-white',
      iconType: 'gift',
    },
    {
      expense_id: 'e5',
      date: '2026-09-18',
      title: 'Figma Subscription',
      category: 'Tools',
      amount: 1800,
      payment_method: 'Card',
      added_by_name: 'Farru',
      added_by_initial: 'F',
      added_by_bg: 'bg-slate-900 text-white',
      iconType: 'figma',
    },
    {
      expense_id: 'e6',
      date: '2026-09-12',
      title: 'Team Lunch',
      category: 'Team',
      amount: 2300,
      payment_method: 'UPI',
      added_by_name: 'Thanu',
      added_by_initial: 'T',
      added_by_bg: 'bg-teal-500 text-white',
      iconType: 'lunch',
    },
    {
      expense_id: 'e7',
      date: '2026-09-10',
      title: 'Google Ads',
      category: 'Marketing',
      amount: 6000,
      payment_method: 'Card',
      added_by_name: 'Farru',
      added_by_initial: 'F',
      added_by_bg: 'bg-slate-900 text-white',
      iconType: 'google',
    },
    {
      expense_id: 'e8',
      date: '2026-09-05',
      title: 'Miscellaneous',
      category: 'Others',
      amount: 4200,
      payment_method: 'UPI',
      added_by_name: 'Chaitu',
      added_by_initial: 'C',
      added_by_bg: 'bg-blue-600 text-white',
      iconType: 'misc',
    },
  ];

  // Merge live expenses with reference data
  const combinedExpenses = (expenses && expenses.length > 0) ? expenses.map(e => {
    const name = e.team_members?.name || e.added_by_name || 'Chaitu';
    const initial = name.charAt(0).toUpperCase();
    const bg = name.toLowerCase().includes('chaitu') 
      ? 'bg-slate-900 text-white' 
      : (name.toLowerCase().includes('farru') ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white');
    return {
      ...e,
      added_by_name: name,
      added_by_initial: initial,
      added_by_bg: bg,
    };
  }) : fallbackExpenses;

  // Filter
  const filtered = combinedExpenses.filter((e) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || (e.title || '').toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q);
    
    let matchesCat = true;
    if (selectedCategory !== 'All') {
      const eCat = (e.category || '').toLowerCase();
      if (selectedCategory.toLowerCase() === 'other') {
        matchesCat = !['marketing', 'tools'].includes(eCat);
      } else {
        matchesCat = eCat === selectedCategory.toLowerCase();
      }
    }

    const matchesMethod = selectedMethod === 'All' || (e.payment_method || '').toLowerCase() === selectedMethod.toLowerCase();

    // Time filter
    let matchesTime = true;
    const eDate = e.date || '';
    if (selectedTimeFilter === 'This Month') {
      matchesTime = eDate.startsWith(selectedMonth);
    } else if (selectedTimeFilter === 'Last Month') {
      const [y, m] = selectedMonth.split('-').map(Number);
      const prevY = m === 1 ? y - 1 : y;
      const prevM = m === 1 ? 12 : m - 1;
      const prevMonthStr = `${prevY}-${String(prevM).padStart(2, '0')}`;
      matchesTime = eDate.startsWith(prevMonthStr);
    }

    return matchesSearch && matchesCat && matchesMethod && matchesTime;
  });

  const isAllSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((e) => e.expense_id));
    }
  };

  const handleToggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBatchDeleteExpenses = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected expense(s)?`)) return;
    try {
      for (const id of selectedIds) {
        await deleteExpense(id);
      }
      setSelectedIds([]);
    } catch (err) {
      alert(err.message || 'Failed to delete selected expenses');
    }
  };

  // Calculate dynamic KPIs based on current month vs previous month
  const [currY, currM] = selectedMonth.split('-').map(Number);
  const prevY = currM === 1 ? currY - 1 : currY;
  const prevM = currM === 1 ? 12 : currM - 1;
  const prevMonthStr = `${prevY}-${String(prevM).padStart(2, '0')}`;

  const currentMonthExpenses = combinedExpenses.filter((e) => (e.date || '').startsWith(selectedMonth));
  const prevMonthExpenses = combinedExpenses.filter((e) => (e.date || '').startsWith(prevMonthStr));

  const totalCurrent = currentMonthExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalPrev = prevMonthExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalDiff = totalPrev > 0 ? Math.round(((totalCurrent - totalPrev) / totalPrev) * 100) : 0;
  const totalDiffLabel = totalDiff >= 0 ? `↑ ${totalDiff}% vs last month` : `↓ ${Math.abs(totalDiff)}% vs last month`;

  const mktCurrent = currentMonthExpenses.filter(e => (e.category || '').toLowerCase() === 'marketing').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const mktPrev = prevMonthExpenses.filter(e => (e.category || '').toLowerCase() === 'marketing').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const mktDiff = mktPrev > 0 ? Math.round(((mktCurrent - mktPrev) / mktPrev) * 100) : 0;
  const mktDiffLabel = mktDiff >= 0 ? `↑ ${mktDiff}% vs last month` : `↓ ${Math.abs(mktDiff)}% vs last month`;

  const toolsCurrent = currentMonthExpenses.filter(e => (e.category || '').toLowerCase() === 'tools').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const toolsPrev = prevMonthExpenses.filter(e => (e.category || '').toLowerCase() === 'tools').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const toolsDiff = toolsPrev > 0 ? Math.round(((toolsCurrent - toolsPrev) / toolsPrev) * 100) : 0;
  const toolsDiffLabel = toolsDiff >= 0 ? `↑ ${toolsDiff}% vs last month` : `↓ ${Math.abs(toolsDiff)}% vs last month`;

  const otherCurrent = currentMonthExpenses.filter(e => !['marketing', 'tools'].includes((e.category || '').toLowerCase())).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const otherPrev = prevMonthExpenses.filter(e => !['marketing', 'tools'].includes((e.category || '').toLowerCase())).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const otherDiff = otherPrev > 0 ? Math.round(((otherCurrent - otherPrev) / otherPrev) * 100) : 0;
  const otherDiffLabel = otherDiff >= 0 ? `↑ ${otherDiff}% vs last month` : `↓ ${Math.abs(otherDiff)}% vs last month`;

  // Weekly distributions for dynamic expense sparklines
  const getExpenseWeekly = (filterFn) => {
    const w = [0, 0, 0, 0];
    currentMonthExpenses.forEach(e => {
      if (filterFn && !filterFn(e)) return;
      const d = new Date(e.date || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0] += Number(e.amount) || 0;
      else if (day <= 14) w[1] += Number(e.amount) || 0;
      else if (day <= 21) w[2] += Number(e.amount) || 0;
      else w[3] += Number(e.amount) || 0;
    });
    return w;
  };

  const totalExpWeekly = getExpenseWeekly();
  const mktExpWeekly = getExpenseWeekly(e => (e.category || '').toLowerCase() === 'marketing');
  const toolsExpWeekly = getExpenseWeekly(e => (e.category || '').toLowerCase() === 'tools');
  const otherExpWeekly = getExpenseWeekly(e => !['marketing', 'tools'].includes((e.category || '').toLowerCase()));

  const formatDate = (dStr) => {
    if (!dStr) return 'Sep 28, 2026';
    try {
      const d = new Date(dStr);
      if (isNaN(d.getTime())) return dStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dStr;
    }
  };

  const getCategoryBadge = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('market')) return 'bg-blue-50 text-blue-600';
    if (c.includes('tool')) return 'bg-purple-50 text-purple-600';
    return 'bg-slate-100 text-slate-600';
  };

  const getExpenseIcon = (item) => {
    const title = (item.title || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();

    if (title.includes('instagram') || title.includes('ads') || cat.includes('market')) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Megaphone className="w-4 h-4" />
        </div>
      );
    }
    if (title.includes('canva') || title.includes('figma') || cat.includes('tool')) {
      return (
        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <Laptop className="w-4 h-4" />
        </div>
      );
    }
    if (title.includes('travel') || cat.includes('operat')) {
      return (
        <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
          <Navigation className="w-4 h-4" />
        </div>
      );
    }
    if (title.includes('gift')) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Gift className="w-4 h-4" />
        </div>
      );
    }
    if (title.includes('lunch') || cat.includes('team')) {
      return (
        <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <Utensils className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        <Box className="w-4 h-4" />
      </div>
    );
  };

  const handleDelete = async (id) => {
    setActiveMenuId(null);
    if (!window.confirm('Delete this expense?')) return;
    try {
      await deleteExpense(id);
    } catch (err) {
      alert(err.message || 'Failed to delete expense');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── 4 KPI Cards matching Figma media_1791194061474.png ──────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Expenses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[148px] space-y-3">
          <div className="flex items-start justify-between relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10 space-y-1">
            <p className="text-xs font-medium text-slate-500">Total Expenses</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{formatCurrency(totalCurrent)}</p>
            <p className="text-xs font-semibold text-emerald-600">{totalDiffLabel}</p>
          </div>
          <div className="absolute right-0 bottom-0 w-28 h-12 pointer-events-none z-0">
            <Sparkline data={totalExpWeekly} color="#3b82f6" width={110} height={45} showArea={true} />
          </div>
        </div>

        {/* Card 2: Marketing & Ads */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[148px] space-y-3">
          <div className="flex items-start justify-between relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10 space-y-1">
            <p className="text-xs font-medium text-slate-500">Marketing & Ads</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{formatCurrency(mktCurrent)}</p>
            <p className="text-xs font-semibold text-emerald-600">{mktDiffLabel}</p>
          </div>
          <div className="absolute right-0 bottom-0 w-28 h-12 pointer-events-none z-0">
            <Sparkline data={mktExpWeekly} color="#3b82f6" width={110} height={45} showArea={true} />
          </div>
        </div>

        {/* Card 3: Tools & Subscriptions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[148px] space-y-3">
          <div className="flex items-start justify-between relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10 space-y-1">
            <p className="text-xs font-medium text-slate-500">Tools & Subscriptions</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{formatCurrency(toolsCurrent)}</p>
            <p className="text-xs font-semibold text-emerald-600">{toolsDiffLabel}</p>
          </div>
          <div className="absolute right-0 bottom-0 w-28 h-12 pointer-events-none z-0">
            <Sparkline data={toolsExpWeekly} color="#3b82f6" width={110} height={45} showArea={true} />
          </div>
        </div>

        {/* Card 4: Other Expenses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[148px] space-y-3">
          <div className="flex items-start justify-between relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10 space-y-1">
            <p className="text-xs font-medium text-slate-500">Other Expenses</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{formatCurrency(otherCurrent)}</p>
            <p className="text-xs font-semibold text-emerald-600">{otherDiffLabel}</p>
          </div>
          <div className="absolute right-0 bottom-0 w-28 h-12 pointer-events-none z-0">
            <Sparkline data={otherExpWeekly} color="#3b82f6" width={110} height={45} showArea={true} />
          </div>
        </div>
      </div>

      {/* ── Filters Bar Matching Figma media_1791194061474.png ──────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search expenses..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/90 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Category Dropdown: Strict match to Supabase Check Constraint */}
          <div className="relative">
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs">
              <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 font-semibold"
              >
                <option value="All">All Categories</option>
                <option value="Marketing">Marketing</option>
                <option value="Tools">Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Payment Method Dropdown */}
          <div className="relative">
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 font-semibold"
              >
                <option value="All">Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Time Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTimeFilter}
              onChange={(e) => setSelectedTimeFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer pr-1 font-bold text-slate-800"
            >
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Batch Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-blue-50/90 border border-blue-200 rounded-2xl text-xs shadow-xs animate-in fade-in-50 duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-semibold text-blue-900">
              {selectedIds.length} expense{selectedIds.length > 1 ? 's' : ''} selected
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
              onClick={handleBatchDeleteExpenses}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Expenses Table Matching Figma media_1791194061474.png ───────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3.5 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-6">DATE</th>
                <th className="py-3.5 px-6">EXPENSE</th>
                <th className="py-3.5 px-6">CATEGORY</th>
                <th className="py-3.5 px-6">AMOUNT</th>
                <th className="py-3.5 px-6">PAYMENT METHOD</th>
                <th className="py-3.5 px-6">ADDED BY</th>
                <th className="py-3.5 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((item, index) => {
                const isMenuOpen = activeMenuId === item.expense_id;
                const openUpwards = index >= Math.max(1, filtered.length - 2);
                const isSelected = selectedIds.includes(item.expense_id);

                return (
                  <tr key={item.expense_id} className={`hover:bg-slate-50/60 transition-colors ${isSelected ? 'bg-blue-50/30' : ''}`}>
                    {/* Checkbox */}
                    <td
                      className="py-4 px-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleToggleSelectRow(item.expense_id, e)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>

                    {/* Expense Title & Description */}
                    <td className="py-4 px-6 text-slate-900 font-semibold">
                      <div className="flex items-center gap-3">
                        {getExpenseIcon(item)}
                        <div>
                          <p className="font-semibold text-slate-900 text-xs">{item.title}</p>
                          {item.description && (
                            <p className="text-[11px] text-slate-400 font-normal mt-0.5 leading-snug">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrency(item.amount)}
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.payment_method || 'UPI'}</span>
                      </div>
                    </td>

                    {/* Added By */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${item.added_by_bg || 'bg-blue-600 text-white'}`}>
                          {item.added_by_initial || 'C'}
                        </div>
                        <span className="font-semibold text-slate-800">{item.added_by_name || 'Chaitu'}</span>
                      </div>
                    </td>

                    {/* Actions Menu */}
                    <td className="py-4 px-6 text-right relative">
                      <div className="inline-block relative text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : item.expense_id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {isMenuOpen && (
                          <div
                            ref={menuRef}
                            className={`absolute right-0 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs text-left animate-in fade-in-50 zoom-in-95 duration-100 ${
                              openUpwards ? 'bottom-full mb-1.5' : 'top-full mt-1'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                if (onEditExpense) onEditExpense(item);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5 text-slate-400" />
                              <span>Edit Expense</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.expense_id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium border-t border-slate-100 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              <span>Delete</span>
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

        {/* Pagination matching media_1791194061474.png */}
        <div className="py-3 px-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1-8 of {filtered.length} expenses</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-40" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              1
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-40" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
