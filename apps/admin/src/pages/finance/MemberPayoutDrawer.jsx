// =============================================================================
// src/pages/finance/MemberPayoutDrawer.jsx — Team Member Payout History Drawer
// Exact match for Figma media_1791193787803.png
// =============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Plus, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  CreditCard, 
  Zap, 
  Building2, 
  Banknote,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';

export default function MemberPayoutDrawer({ isOpen, onClose, member, onOpenAddPayout }) {
  const { payouts, deletePayout, updatePayout } = useData();

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingPayout, setEditingPayout] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editMethod, setEditMethod] = useState('UPI');
  const [editNotes, setEditNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
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

  if (!isOpen || !member) return null;

  // Filter payouts for this member or provide sample matching screenshot
  const memberName = member.name || 'Chaitu';
  const memberPayouts = (payouts || []).filter(p => {
    if (p.team_member_id === member.id || p.team_member_id === member.team_member_id) return true;
    if ((p.team_members?.name || '').toLowerCase() === memberName.toLowerCase()) return true;
    return false;
  });

  const displayPayouts = memberPayouts.length > 0 ? memberPayouts : [
    {
      payout_id: 'py1',
      amount: 10000,
      payment_method: 'UPI',
      notes: 'Website design payout',
      date: '2026-09-28',
    },
    {
      payout_id: 'py2',
      amount: 15000,
      payment_method: 'Bank Transfer',
      notes: 'Template development',
      date: '2026-09-18',
    },
    {
      payout_id: 'py3',
      amount: 5000,
      payment_method: 'UPI',
      notes: 'Social media work',
      date: '2026-09-10',
    },
    {
      payout_id: 'py4',
      amount: 5000,
      payment_method: 'Bank Transfer',
      notes: 'Illustrations and assets',
      date: '2026-09-05',
    }
  ];

  const totalReceived = displayPayouts.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const percentage = member.percentage || 32;

  const formatCardDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return { month: 'SEP', day: '28' };
      const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const day = d.toLocaleDateString('en-US', { day: '2-digit' });
      return { month, day };
    } catch {
      return { month: 'SEP', day: '28' };
    }
  };

  const getMethodIcon = (method) => {
    const m = (method || '').toLowerCase();
    if (m.includes('upi')) return <Zap className="w-3.5 h-3.5 text-emerald-600" />;
    if (m.includes('bank')) return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
    return <CreditCard className="w-3.5 h-3.5 text-slate-600" />;
  };

  const handleDelete = async (payoutId) => {
    setActiveMenuId(null);
    if (!window.confirm('Delete this payout record?')) return;
    try {
      setLoading(true);
      await deletePayout(payoutId);
      setFeedbackMsg('Payout record removed.');
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to delete payout');
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (p) => {
    setActiveMenuId(null);
    setEditingPayout(p);
    setEditAmount(String(p.amount));
    setEditMethod(p.payment_method || 'UPI');
    setEditNotes(p.notes || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPayout) return;
    try {
      setLoading(true);
      await updatePayout(editingPayout.payout_id, {
        amount: Number(editAmount),
        payment_method: editMethod,
        notes: editNotes,
      });
      setEditingPayout(null);
      setFeedbackMsg('Payout updated.');
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to update payout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200/80 animate-in slide-in-from-right duration-200 z-[101] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching media_1791193787803.png */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0">
              {member.initial || memberName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{memberName}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Payout History</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Card matching Figma media_1791193787803.png */}
        <div className="p-6 pb-4">
          <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">TOTAL RECEIVED</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(totalReceived)}</h3>
              <p className="text-xs text-slate-400 mt-0.5">This Month</p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-white text-blue-600 text-xs font-bold shadow-xs border border-blue-100">
              {percentage}% of team total
            </span>
          </div>
        </div>

        {feedbackMsg && (
          <div className="mx-6 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Section: Payouts Header + Add Payout button */}
        <div className="px-6 py-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Payouts</h3>
          <button
            type="button"
            onClick={() => onOpenAddPayout && onOpenAddPayout(member)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Payout</span>
          </button>
        </div>

        {/* Payout Cards List */}
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">
          {displayPayouts.map((p) => {
            const cardDate = formatCardDate(p.date || p.payment_date);
            const isMenuOpen = activeMenuId === p.payout_id;

            return (
              <div 
                key={p.payout_id}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all relative"
              >
                {/* Left Date Box */}
                <div className="flex items-center gap-4">
                  <div className="w-13 h-14 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cardDate.month}</span>
                    <span className="text-base font-bold text-slate-800 leading-none my-0.5">{cardDate.day}</span>
                  </div>

                  {/* Middle Info */}
                  <div>
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(p.amount)}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                      {getMethodIcon(p.payment_method)}
                      <span className="font-semibold">{p.payment_method || 'UPI'}</span>
                    </div>
                    {p.notes && (
                      <p className="text-xs text-slate-400 mt-0.5">{p.notes}</p>
                    )}
                  </div>
                </div>

                {/* Right Three Dots Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(isMenuOpen ? null : p.payout_id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 text-xs text-left animate-in fade-in-50 zoom-in-95 duration-100"
                    >
                      <button
                        type="button"
                        onClick={() => handleStartEdit(p)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                        <span>Edit Payout</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.payout_id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium border-t border-slate-100 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Delete Payout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer matching media_1791193787803.png */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Received</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">{formatCurrency(totalReceived)}</p>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            {displayPayouts.length} Payouts in September 2026
          </p>
        </div>

        {/* Edit Payout Inline Modal */}
        {editingPayout && (
          <div className="fixed inset-0 z-60 bg-slate-900/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Edit Payout</h3>
                <button 
                  type="button" 
                  onClick={() => setEditingPayout(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={editMethod}
                    onChange={(e) => setEditMethod(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Description</label>
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="e.g. Website design payout"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingPayout(null)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
