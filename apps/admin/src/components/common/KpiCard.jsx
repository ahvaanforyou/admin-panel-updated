// =============================================================================
// src/components/common/KpiCard.jsx — Statistics KPI Card
// =============================================================================
import React from 'react';

export default function KpiCard({ title, value, subtext, icon: Icon, trend, color = "blue" }) {
  const colorStyles = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    teal: "text-blue-600 bg-blue-50 border-blue-100",
  }[color] || "text-blue-600 bg-blue-50 border-blue-100";

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${colorStyles}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          {value}
        </h3>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-xs text-slate-500 mt-2 font-normal">
          {subtext}
        </p>
      )}
    </div>
  );
}
