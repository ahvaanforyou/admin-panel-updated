// =============================================================================
// src/pages/finance/FinancePage.jsx — Matching Figma media_1791189909044 & media_1791190034646
// =============================================================================
import React, { useState } from 'react';
import { Plus, Calendar, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ClientFinanceTab from './ClientFinanceTab';
import TeamFinanceTab from './TeamFinanceTab';
import ExpensesTab from './ExpensesTab';

export default function FinancePage({
  onOpenAddPayment,
  onOpenAddPayout,
  onOpenAddExpense,
  onSelectClient,
  onEditClient,
  onEditExpense,
  onSelectMember,
}) {
  const { selectedMonth, setSelectedMonth } = useData();
  const [activeSubTab, setActiveSubTab] = useState('client'); // 'client' | 'team' | 'expenses'
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateRangeOptions = [
    { label: 'September 2026', monthKey: '2026-09' },
    { label: 'October 2026', monthKey: '2026-10' },
    { label: 'November 2026', monthKey: '2026-11' },
    { label: 'December 2026', monthKey: '2026-12' },
    { label: 'All Time', monthKey: 'All' },
  ];
  const currentRangeLabel = dateRangeOptions.find((o) => o.monthKey === selectedMonth)?.label || 'October 2026';

  const subTabs = [
    { id: 'client', label: 'Client Finance' },
    { id: 'team', label: 'Team Finance' },
    { id: 'expenses', label: 'Expenses' },
  ];

  const handleActionButton = () => {
    if (activeSubTab === 'client' && onOpenAddPayment) onOpenAddPayment();
    if (activeSubTab === 'team' && onOpenAddPayout) onOpenAddPayout();
    if (activeSubTab === 'expenses' && onOpenAddExpense) onOpenAddExpense();
  };

  const actionButtonText = {
    client: '+ Add Payment',
    team: '+ Add Payout',
    expenses: '+ Add Expense',
  }[activeSubTab];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header with Date Range & Primary Button ────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance</h1>
          <p className="text-xs text-slate-500 mt-1">
            {activeSubTab === 'client' && "Manage client payments and track your business finances."}
            {activeSubTab === 'team' && "Track team earnings and manage payouts."}
            {activeSubTab === 'expenses' && "Manage business overhead, software tools and physical supplies."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Picker Dropdown Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
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

          {/* Action Button */}
          <button
            type="button"
            onClick={handleActionButton}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>{actionButtonText}</span>
          </button>
        </div>
      </div>

      {/* ── Sub-tabs matching Figma (Underlined Text Tabs) ──────────────────── */}
      <div className="flex items-center gap-8 border-b border-slate-200/80">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-3 text-xs font-semibold transition-all relative cursor-pointer ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Active Tab View ──────────────────────────────────────────────── */}
      {activeSubTab === 'client' && (
        <ClientFinanceTab
          onOpenAddPayment={onOpenAddPayment}
          onSelectClient={onSelectClient}
          onEditClient={onEditClient}
        />
      )}

      {activeSubTab === 'team' && (
        <TeamFinanceTab
          onOpenAddPayout={onOpenAddPayout}
          onSelectMember={onSelectMember}
        />
      )}

      {activeSubTab === 'expenses' && (
        <ExpensesTab
          onOpenAddExpense={onOpenAddExpense}
          onEditExpense={onEditExpense}
        />
      )}
    </div>
  );
}
