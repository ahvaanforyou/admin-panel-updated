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
  Check,
  ChevronDown
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';

export default function MemberPayoutDrawer({ isOpen, onClose, member, onOpenAddPayout }) {
  const { payouts, deletePayout, updatePayout } = useData();

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingPayout, setEditingPayout] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState('');
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

  // Filter payouts for this member strictly from real payouts
  const memberName = member.name || 'Chaitu';
  const displayPayouts = (payouts || []).filter(p => {
    if (p.team_member_id === member.id || p.team_member_id === member.team_member_id) return true;
    if ((p.team_members?.name || '').toLowerCase() === memberName.toLowerCase()) return true;
    return false;
  });

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
    setEditDate(p.payout_date ? new Date(p.payout_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
    setEditMethod(p.payment_method || 'UPI');
    setEditNotes(p.notes || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPayout) return;
    const targetPayoutId = editingPayout.team_finance_id || editingPayout.payout_id || editingPayout.id;
    try {
      setLoading(true);
      await updatePayout(targetPayoutId, {
        amount: Number(editAmount),
        payout_date: editDate,
        payment_method: editMethod,
        notes: editNotes,
      });
      setEditingPayout(null);
      setFeedbackMsg('Payout updated successfully.');
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to update payout');
    } finally {
      setLoading(false);
    }
  };

  const memberBg = memberName.toLowerCase().includes('chaitu') 
    ? 'bg-slate-900 text-white' 
    : (memberName.toLowerCase().includes('farru') ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white');
  const memberInitial = member?.initial || memberName.charAt(0);

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
            <div className={`w-11 h-11 rounded-full ${memberBg} flex items-center justify-center font-bold text-base shrink-0`}>
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
          {displayPayouts.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Banknote className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
              <p className="text-sm font-semibold text-slate-600">No payout records found</p>
              <p className="text-xs text-slate-400 mt-1">
                Click &ldquo;Add Payout&rdquo; to record a payment for {memberName}.
              </p>
            </div>
          ) : (
            displayPayouts.map((p, idx) => {
              const pId = p.team_finance_id || p.payout_id || p.id || `payout-${idx}`;
              const cardDate = formatCardDate(p.date || p.payout_date || p.payment_date);
              const isMenuOpen = activeMenuId === pId;

              return (
                <div 
                  key={pId}
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
                        setActiveMenuId(isMenuOpen ? null : pId);
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
                          onClick={() => handleDelete(pId)}
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
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Received</p>
            <p className="text-lg font-bold text-slate-900 mt-0.5">{formatCurrency(totalReceived)}</p>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            {displayPayouts.length} Payout{displayPayouts.length !== 1 ? 's' : ''} recorded
          </p>
        </div>

        {/* Edit Payout Modal Matching Screenshot 5 Style */}
        {editingPayout && (
          <div className="fixed inset-0 z-[120] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 relative">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Edit Payout</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Update payout record for this team member.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setEditingPayout(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* Team Member Pill */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Team Member <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${memberBg}`}>
                        {memberInitial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{memberName}</p>
                        <p className="text-[11px] text-slate-400">{member.role || 'Team Member'}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Amount and Payout Date Side-by-Side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Amount Paid <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        required
                        min="1"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-full text-xs font-bold pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Payout Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={editMethod}
                    onChange={(e) => setEditMethod(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 cursor-pointer"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                {/* Notes (Optional) with Character Counter */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Notes (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      value={editNotes}
                      maxLength={200}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="e.g. Website design payout"
                      rows={3}
                      className="w-full text-xs p-3.5 pb-7 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-400"
                    />
                    <span className="absolute right-3.5 bottom-2.5 text-[11px] text-slate-400">
                      {(editNotes || '').length}/200
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingPayout(null)}
                    className="w-full py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-sm transition-all cursor-pointer"
                  >
                    {loading ? "Saving..." : "Save Changes"}
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
