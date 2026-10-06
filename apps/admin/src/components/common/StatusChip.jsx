// =============================================================================
// src/components/common/StatusChip.jsx — Standardized Status Badges
// =============================================================================
import React from 'react';

const STATUS_STYLES = {
  // Client & Order Statuses (Matching Figma)
  "In Progress": "bg-blue-50 text-blue-600 border-blue-200/60",
  "In Review": "bg-amber-50 text-amber-600 border-amber-200/60",
  "Review": "bg-amber-50 text-amber-600 border-amber-200/60",
  "Completed": "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  "Template Chosen": "bg-purple-50 text-purple-600 border-purple-200/60",
  "On Hold": "bg-rose-50 text-rose-600 border-rose-200/60",
  "Pending": "bg-slate-100 text-slate-700 border-slate-200",
  "Cancelled": "bg-red-50 text-red-700 border-red-200",

  // Task Derived States (PRD §8)
  "Upcoming": "bg-blue-50 text-blue-700 border-blue-200",
  "Overdue": "bg-red-50 text-red-700 border-red-200",

  // Priority: High (Red), Medium (Orange), Low (Green)
  "High": "bg-rose-100 text-rose-700 border-rose-200",
  "Medium": "bg-orange-100 text-orange-700 border-orange-200",
  "Low": "bg-emerald-100 text-emerald-700 border-emerald-200",

  // Template Status
  "Published": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Draft": "bg-slate-100 text-slate-600 border-slate-200",
};

export default function StatusChip({ status, className = "" }) {
  if (!status) return null;
  const style = STATUS_STYLES[status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
}
