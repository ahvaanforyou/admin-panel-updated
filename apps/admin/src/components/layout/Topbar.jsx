// =============================================================================
// src/components/layout/Topbar.jsx — Top Navigation Bar
// =============================================================================
import React from 'react';
import { Search, Calendar, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Topbar({ title, subtitle, searchPlaceholder, searchValue, onSearchChange }) {
  const { refreshAll, loading, selectedMonth, setSelectedMonth } = useData();

  const monthsList = [
    { value: '2026-09', label: 'September 2026' },
    { value: '2026-10', label: 'October 2026' },
    { value: '2026-11', label: 'November 2026' },
    { value: '2026-12', label: 'December 2026' },
    { value: '2027-01', label: 'January 2027' },
    { value: '2027-02', label: 'February 2027' },
    { value: '2027-03', label: 'March 2027' },
    { value: '2027-04', label: 'April 2027' },
    { value: '2027-05', label: 'May 2027' },
    { value: '2027-06', label: 'June 2027' },
    { value: '2027-07', label: 'July 2027' },
    { value: '2027-08', label: 'August 2027' },
    { value: '2027-09', label: 'September 2027' },
    { value: '2027-10', label: 'October 2027' },
    { value: '2027-11', label: 'November 2027' },
    { value: '2027-12', label: 'December 2027' },
  ];

  return (
    <header className="h-16 lg:h-18 bg-white border-b border-slate-200/80 px-6 lg:px-8 flex items-center justify-between flex-shrink-0 z-10 shadow-xs">
      <div>
        <h1 className="text-lg lg:text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search Bar (when enabled for page) */}
        {onSearchChange && (
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder || "Search..."}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        )}

        {/* Clickable Month Calendar Selector (updates page data dynamically) */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm">
          <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer text-slate-800 font-bold pr-1 text-xs"
            title="Filter dashboard by month"
          >
            {monthsList.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Live Sync Refresh Button */}
        <button
          type="button"
          onClick={refreshAll}
          disabled={loading}
          title="Refresh All Data"
          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl border border-slate-200/80 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
        </button>
      </div>
    </header>
  );
}
