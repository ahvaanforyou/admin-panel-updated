// =============================================================================
// src/components/common/ModalDrawer.jsx — Popup Modal (Image 2) & Slide-over Drawer
// =============================================================================
import React, { useEffect } from 'react';
import { X, FileText } from 'lucide-react';

export default function ModalDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  icon: Icon = FileText,
  maxWidth = "max-w-2xl",
  drawer = false, // false = center popup modal (matching Image 2), true = right slide-over drawer for editing
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto flex items-center justify-center p-4">
      {/* Clean neutral backdrop - eliminates dark blue overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {drawer ? (
        // Side Drawer (for Editing / Details)
        <div className="fixed inset-y-0 right-0 z-10 flex max-w-full pl-10">
          <div className={`w-screen ${maxWidth} bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200`}>
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
                  {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {children}
            </div>
          </div>
        </div>
      ) : (
        // Center Popup Modal (Regular, crisp white popup)
        <div className={`relative z-10 w-full ${maxWidth} bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7 animate-in zoom-in-95 duration-150`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-5 pb-3.5 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100/80">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
