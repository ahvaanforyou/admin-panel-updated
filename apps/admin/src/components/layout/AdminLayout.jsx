import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const TAB_TITLES = {
  dashboard: { title: 'Dashboard', subtitle: 'Real-time overview of Ahvaan wedding invitations & finances' },
  clients: { title: 'Clients', subtitle: 'Manage client details, wedding information and invitation progress' },
  finance: { title: 'Finance', subtitle: 'Track team earnings, payouts and overall financial summary' },
  tasks: { title: 'Tasks', subtitle: 'Stay on top of your work and track progress' },
  invitations: { title: 'Invitations', subtitle: 'Live client wedding invitations and customizable templates' },
};

export default function AdminLayout({ children, currentTab, setCurrentTab }) {
  const tabInfo = TAB_TITLES[currentTab] || { title: 'Dashboard', subtitle: '' };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* Fixed Sidebar */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Canvas — Full Viewport Clean Space with Topbar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={tabInfo.title} subtitle={tabInfo.subtitle} />
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-7">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

