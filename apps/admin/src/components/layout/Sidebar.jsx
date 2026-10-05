// =============================================================================
// src/components/layout/Sidebar.jsx — Clean White & Sky Blue Sidebar (Image 5)
// =============================================================================
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  CheckSquare, 
  Sparkles, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const { admin, logout } = useAuth();
  const { clients, tasks } = useData();

  // Active counts
  const pendingTasksCount = (tasks || []).filter(t => t.status !== 'Completed').length;
  const activeClientsCount = (clients || []).filter(c => c.status !== 'Completed').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users, badge: activeClientsCount > 0 ? activeClientsCount : null },
    { id: 'finance', label: 'Finance', icon: CreditCard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : null },
    { id: 'invitations', label: 'Invitations', icon: Sparkles },
  ];

  return (
    <aside className="w-64 bg-white text-slate-700 flex flex-col flex-shrink-0 border-r border-slate-200/80 select-none">
      {/* Brand Header with Exclusive Stylish Serif Typography */}
      <div className="h-24 px-6 flex items-center justify-between border-b border-slate-100">
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold tracking-[0.2em] text-slate-900 uppercase">
            AHVAAN
          </span>
          <span className="text-[10px] font-medium tracking-[0.35em] text-slate-400 uppercase mt-0.5">
            FOR YOU
          </span>
        </div>
      </div>

      {/* Navigation Links (Matches Image 5: Sky-blue active highlight) */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin Profile & Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
              {admin?.name?.slice(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{admin?.name || 'Ahvaan Admin'}</p>
              <p className="text-[10px] text-slate-400 truncate">{admin?.email || 'ahvaanforyou@gmail.com'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            title="Logout"
            className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
