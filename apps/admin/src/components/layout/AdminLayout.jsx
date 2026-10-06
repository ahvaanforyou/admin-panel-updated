import React from 'react';
import Sidebar from './Sidebar';

export default function AdminLayout({ children, currentTab, setCurrentTab }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* Fixed Sidebar */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Canvas — Full Viewport Clean Space */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-7">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

