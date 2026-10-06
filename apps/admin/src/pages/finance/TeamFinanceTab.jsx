import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  MoreVertical,
  Eye,
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';
import Sparkline from '../../components/common/Sparkline';

export default function TeamFinanceTab({ onOpenAddPayout, onSelectMember }) {
  const { clients, payouts, expenses, payments, selectedMonth, teamMembers } = useData();

  const [activeMenuMemberId, setActiveMenuMemberId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuMemberId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Total Team Payout & Amount Paid (This Month)
  const isAllTime = !selectedMonth || selectedMonth === 'All';
  const effectiveMonth = isAllTime ? '2026-10' : selectedMonth;
  const [currY, currM] = effectiveMonth.split('-').map(Number);
  const prevY = currM === 1 ? currY - 1 : currY;
  const prevM = currM === 1 ? 12 : currM - 1;
  const prevMonthStr = `${prevY}-${String(prevM).padStart(2, '0')}`;

  const monthPayouts = (payouts || []).filter(p => {
    const d = String(p.date || p.payout_date || '');
    const c = String(p.created_at || '');
    return isAllTime || d.startsWith(selectedMonth) || c.startsWith(selectedMonth);
  });
  const prevMonthPayouts = (payouts || []).filter(p => {
    const d = String(p.date || p.payout_date || '');
    const c = String(p.created_at || '');
    return d.startsWith(prevMonthStr) || c.startsWith(prevMonthStr);
  });

  const totalPayoutMonth = monthPayouts.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const prevTotalPayoutMonth = prevMonthPayouts.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const totalPayoutAll = (payouts || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const displayTotalPayout = totalPayoutAll;
  const displayAmountPaidThisMonth = totalPayoutMonth > 0 ? totalPayoutMonth : (isAllTime ? totalPayoutAll : 0);

  // 2. Savings: Formula requested by user:
  // "total received amount - total team payout - total expenses"
  const totalReceivedAll = (payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const totalExpensesAll = (expenses || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const displaySavings = Math.max(0, totalReceivedAll - totalPayoutAll - totalExpensesAll);

  // Previous month comparison
  const prevPaymentsReceived = (payments || []).filter(p => {
    const d = String(p.payment_date || p.created_at || '');
    return d.startsWith(prevMonthStr);
  }).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const prevExpensesTotal = (expenses || []).filter(e => {
    const d = String(e.date || e.created_at || '');
    return d.startsWith(prevMonthStr);
  }).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const prevSavings = Math.max(0, prevPaymentsReceived - prevTotalPayoutMonth - prevExpensesTotal);

  // 3. Avg. Payout per Member
  const numMembers = (teamMembers && teamMembers.length > 0) ? teamMembers.length : 3;
  const effectivePayoutForAvg = totalPayoutMonth > 0 ? totalPayoutMonth : totalPayoutAll;
  const displayAvgPayout = Math.round(effectivePayoutForAvg / numMembers);
  const prevAvgPayout = Math.round((prevTotalPayoutMonth > 0 ? prevTotalPayoutMonth : totalPayoutAll) / numMembers);

  // Real-time dynamic percentages vs last month
  const calcDiff = (curr, prev) => {
    if (prev === 0) return { diff: curr > 0 ? 100 : 0, label: curr > 0 ? `↑ 100% vs last month` : `0% vs last month`, isPos: true };
    const pct = Math.round(((curr - prev) / prev) * 100);
    return { diff: pct, label: pct >= 0 ? `↑ ${pct}% vs last month` : `↓ ${Math.abs(pct)}% vs last month`, isPos: pct >= 0 };
  };

  const totalPayoutDiff = calcDiff(totalPayoutMonth, prevTotalPayoutMonth);
  const monthPayoutDiff = calcDiff(displayAmountPaidThisMonth, prevTotalPayoutMonth);
  const savingsDiff = calcDiff(displaySavings, prevSavings);
  const avgPayoutDiff = calcDiff(displayAvgPayout, prevAvgPayout);

  // Weekly payouts for real-time sparklines
  const getPayoutsWeekly = (filterFn) => {
    const w = [0, 0, 0, 0];
    const sourcePayouts = monthPayouts.length > 0 ? monthPayouts : (payouts || []);
    sourcePayouts.forEach(p => {
      if (filterFn && !filterFn(p)) return;
      const d = new Date(p.date || p.payout_date || p.created_at || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0] += Number(p.amount) || 0;
      else if (day <= 14) w[1] += Number(p.amount) || 0;
      else if (day <= 21) w[2] += Number(p.amount) || 0;
      else w[3] += Number(p.amount) || 0;
    });
    return w;
  };
  const totalPayoutWeekly = getPayoutsWeekly();

  const getWeeklyPayments = () => {
    const w = [0, 0, 0, 0];
    const sourcePayments = payments || [];
    sourcePayments.forEach(p => {
      const d = new Date(p.payment_date || p.created_at || Date.now());
      const day = isNaN(d.getDate()) ? 1 : d.getDate();
      if (day <= 7) w[0] += Number(p.amount) || 0;
      else if (day <= 14) w[1] += Number(p.amount) || 0;
      else if (day <= 21) w[2] += Number(p.amount) || 0;
      else w[3] += Number(p.amount) || 0;
    });
    return w;
  };
  const paymentsWeekly = getWeeklyPayments();
  const savingsWeekly = [0, 1, 2, 3].map(i => Math.max(0, paymentsWeekly[i] - totalPayoutWeekly[i]));

  // Helper to compute individual member payout
  // When selectedMonth has payouts for the member, show that month.
  // When 0 or viewing cards, fallback to all-time payout for that member
  // so values internally present in database are ALWAYS visible on the user card.
  const getMemberPayout = (memberName, memberId) => {
    if (!isAllTime) {
      const monthItems = (payouts || []).filter(p => {
        const matchId = memberId && (p.team_member_id === memberId || p.id === memberId);
        const matchName = (p.team_members?.name || p.member_name || '').toLowerCase() === (memberName || '').toLowerCase();
        const d = String(p.date || p.payout_date || '');
        const c = String(p.created_at || '');
        const dateMatch = d.startsWith(selectedMonth) || c.startsWith(selectedMonth);
        return (matchId || matchName) && dateMatch;
      });
      const monthSum = monthItems.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      if (monthSum > 0) return monthSum;
    }

    const allItems = (payouts || []).filter(p => {
      const matchId = memberId && (p.team_member_id === memberId || p.id === memberId);
      const matchName = (p.team_members?.name || p.member_name || '').toLowerCase() === (memberName || '').toLowerCase();
      return matchId || matchName;
    });
    return allItems.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  };

  const totalPayoutForCalc = (totalPayoutMonth > 0 ? totalPayoutMonth : totalPayoutAll) || 1;

  const knownStyles = {
    chaitu: {
      initial: 'C',
      circleBg: 'bg-slate-900 text-white',
      barColor: 'bg-slate-900',
      barBg: 'bg-slate-200/80',
      badgeClass: 'bg-slate-100 text-slate-900 border border-slate-200',
      sparkColor: '#0f172a',
    },
    farru: {
      initial: 'F',
      circleBg: 'bg-blue-600 text-white',
      barColor: 'bg-blue-600',
      barBg: 'bg-blue-100/80',
      badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100',
      sparkColor: '#2563eb',
    },
    thanu: {
      initial: 'T',
      circleBg: 'bg-teal-600 text-white',
      barColor: 'bg-teal-600',
      barBg: 'bg-teal-100/80',
      badgeClass: 'bg-teal-50 text-teal-700 border border-teal-100',
      sparkColor: '#0d9488',
    },
  };

  const defaultList = [
    { team_member_id: '437ccc82-fcc5-4966-901b-68d8eec40868', name: 'Chaitu' },
    { team_member_id: '780186b7-0207-412e-a8dc-829df203ba16', name: 'Farru' },
    { team_member_id: '28c9dcbc-94eb-4d8c-a15c-19e486249b14', name: 'Thanu' },
  ];

  const sourceMembers = (teamMembers && teamMembers.length > 0) ? teamMembers : defaultList;

  // Ensure Chaitu, Farru, Thanu order
  const sortedMembers = [...sourceMembers].sort((a, b) => {
    const order = { chaitu: 1, farru: 2, thanu: 3 };
    const aKey = (a.name || '').toLowerCase();
    const bKey = (b.name || '').toLowerCase();
    return (order[aKey] || 99) - (order[bKey] || 99);
  });

  const teamMembersData = sortedMembers.map(m => {
    const key = (m.name || '').toLowerCase();
    const style = knownStyles[key] || {
      initial: (m.name || 'M').charAt(0).toUpperCase(),
      circleBg: 'bg-indigo-600 text-white',
      barColor: 'bg-indigo-600',
      barBg: 'bg-indigo-100/80',
      badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
      sparkColor: '#4f46e5',
    };
    const amt = getMemberPayout(m.name, m.team_member_id || m.id);
    const pct = totalPayoutForCalc > 0 ? Math.round((amt / totalPayoutForCalc) * 100) : 0;
    const spark = getPayoutsWeekly(p => 
      (p.team_members?.name || p.member_name || '').toLowerCase() === key ||
      p.team_member_id === (m.team_member_id || m.id)
    );

    return {
      id: m.team_member_id || m.id || `tm-${key}`,
      team_member_id: m.team_member_id || m.id,
      name: m.name,
      initial: style.initial,
      circleBg: style.circleBg,
      barColor: style.barColor,
      barBg: style.barBg,
      badgeClass: style.badgeClass,
      amount: amt,
      percentage: pct,
      sparkline: spark,
      sparkColor: style.sparkColor,
    };
  });

  return (
    <div className="space-y-6">
      {/* ── 4 KPI Cards with Dynamic Percentages & Real-Time Sparklines ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Team Payout */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Team Payout</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {formatCurrency(displayTotalPayout)}
              </p>
              <p className={`text-xs font-semibold mt-0.5 ${totalPayoutDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                {totalPayoutDiff.label}
              </p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={totalPayoutWeekly} color="#3b82f6" width={80} height={35} />
          </div>
        </div>

        {/* Card 2: Amount Paid (This Month) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Amount Paid (This Month)</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {formatCurrency(displayAmountPaidThisMonth)}
              </p>
              <p className={`text-xs font-semibold mt-0.5 ${monthPayoutDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                {monthPayoutDiff.label}
              </p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={totalPayoutWeekly} color="#0d9488" width={80} height={35} />
          </div>
        </div>

        {/* Card 3: Savings (With Us) — Formula: received - payout - expenses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Savings (With Us)</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {formatCurrency(displaySavings)}
              </p>
              <p className={`text-xs font-semibold mt-0.5 ${savingsDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                {savingsDiff.label}
              </p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={savingsWeekly} color="#f59e0b" width={80} height={35} />
          </div>
        </div>

        {/* Card 4: Avg. Payout per Member */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Avg. Payout per Member</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {formatCurrency(displayAvgPayout)}
              </p>
              <p className={`text-xs font-semibold mt-0.5 ${avgPayoutDiff.isPos ? 'text-emerald-600' : 'text-rose-600'}`}>
                {avgPayoutDiff.label}
              </p>
            </div>
          </div>
          <div className="w-16 h-8 flex items-center justify-end">
            <Sparkline data={totalPayoutWeekly.map(v => Math.round(v / 3))} color="#8b5cf6" width={80} height={35} />
          </div>
        </div>
      </div>

      {/* ── Team Payouts Section Matching Figma media_1791190034646.png ────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Team Payouts</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Amount received by each team member this month.
          </p>
        </div>

        {/* 3 Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamMembersData.map((m) => {
            const isMenuOpen = activeMenuMemberId === m.id;

            return (
              <div
                key={m.id}
                onClick={() => onSelectMember && onSelectMember(m)}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer relative"
              >
                {/* Top Row: Avatar Initial, Name, and Three Dots */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${m.circleBg}`}>
                      {m.initial}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{m.name}</h3>
                  </div>

                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuMemberId(isMenuOpen ? null : m.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isMenuOpen && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1.5 z-50 text-xs text-left animate-in fade-in-50 zoom-in-95 duration-100"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuMemberId(null);
                            if (onSelectMember) onSelectMember(m);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>View Payout History</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuMemberId(null);
                            if (onOpenAddPayout) onOpenAddPayout(m);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium border-t border-slate-100 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-blue-600" />
                          <span>Add Payout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Row: Amount Received & Percentage Badge */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Amount Received</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">
                      {formatCurrency(m.amount)}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${m.badgeClass || 'bg-blue-50 text-blue-600'}`}>
                    {m.percentage}% of total
                  </span>
                </div>

                {/* Bottom: Dynamic Progress Bar */}
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${m.barBg || 'bg-blue-100/70'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${m.barColor || 'bg-blue-600'}`}
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

