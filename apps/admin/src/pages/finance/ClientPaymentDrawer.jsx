// =============================================================================
// src/pages/finance/ClientPaymentDrawer.jsx — Client Payment History Drawer
// Exact match for Figma media_1791193886346.png
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
  Phone, 
  Mail, 
  Calendar,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../config/customization';

export default function ClientPaymentDrawer({ isOpen, onClose, client, onOpenAddPayment, onEditClient }) {
  const { clients, payments, deletePayment, updatePayment } = useData();

  const [activeTab, setActiveTab] = useState('payments'); // 'payments' | 'details'
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editMethod, setEditMethod] = useState('UPI');
  const [editNotes, setEditNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const menuRef = useRef(null);

  // Close 3-dots dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen || !client) return null;

  // Reactively track the live client from DataContext
  const liveClient = (clients || []).find(c => c.client_id === client?.client_id) || client;
  const order = liveClient.orders?.[0];
  const totalAmount = (liveClient.orders || []).reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0) || Number(order?.total_amount) || 0;

  // Payments for this client across all their orders
  const clientOrderIds = (liveClient.orders || []).map(o => o.order_id).filter(Boolean);
  const clientPayments = (payments || []).filter(p => 
    clientOrderIds.includes(p.order_id) || 
    p.orders?.client_id === liveClient.client_id || 
    p.client_id === liveClient.client_id
  );

  const fallbackOrderPayments = (liveClient.orders || []).flatMap(o => o.payments || []);
  const baseDisplayPayments = clientPayments.length > 0 
    ? clientPayments 
    : (fallbackOrderPayments.length > 0 ? fallbackOrderPayments : []);

  // Optimistic override for instant UI reflection
  const [localPaymentsOverride, setLocalPaymentsOverride] = useState(null);

  // Clear override when baseDisplayPayments updates from server
  useEffect(() => {
    setLocalPaymentsOverride(null);
  }, [payments, liveClient]);

  const displayPayments = localPaymentsOverride || baseDisplayPayments;

  const paidAmount = displayPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const pendingAmount = Math.max(0, totalAmount - paidAmount);

  // Monogram initials
  const initials = (client.name || 'PK')
    .split('&')
    .map(part => part.trim().charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'PK';

  // Format date parts
  const formatCardDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return { month: 'OCT', day: '20', year: '2026' };
      const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const day = d.toLocaleDateString('en-US', { day: '2-digit' });
      const year = d.getFullYear();
      return { month, day, year };
    } catch {
      return { month: 'OCT', day: '20', year: '2026' };
    }
  };

  const getMethodIcon = (method) => {
    const m = (method || '').toLowerCase();
    if (m.includes('upi')) return <Zap className="w-3.5 h-3.5 text-slate-600" />;
    if (m.includes('bank')) return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
    if (m.includes('cash')) return <Banknote className="w-3.5 h-3.5 text-emerald-600" />;
    return <CreditCard className="w-3.5 h-3.5 text-slate-600" />;
  };

  const handleDelete = async (paymentId) => {
    setActiveMenuId(null);
    if (!window.confirm('Are you sure you want to delete this payment record?')) return;
    
    // Instant optimistic removal
    setLocalPaymentsOverride((prev) => {
      const currentList = prev || displayPayments;
      return currentList.filter(p => p.payment_id !== paymentId);
    });
    setFeedbackMsg('Payment deleted successfully.');
    setTimeout(() => setFeedbackMsg(''), 3000);

    try {
      setLoading(true);
      await deletePayment(paymentId);
    } catch (err) {
      alert(err.message || 'Failed to delete payment');
      setLocalPaymentsOverride(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (p) => {
    setActiveMenuId(null);
    setEditingPayment(p);
    setEditAmount(String(p.amount));
    setEditMethod(p.payment_method || 'UPI');
    setEditNotes(p.notes || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPayment) return;
    const newAmt = Number(editAmount) || 0;

    // Instant optimistic reflection
    setLocalPaymentsOverride((prev) => {
      const currentList = prev || displayPayments;
      return currentList.map(p => p.payment_id === editingPayment.payment_id ? {
        ...p,
        amount: newAmt,
        payment_method: editMethod,
        notes: editNotes,
      } : p);
    });
    const targetPaymentId = editingPayment.payment_id;
    setEditingPayment(null);
    setFeedbackMsg('Payment updated.');
    setTimeout(() => setFeedbackMsg(''), 3000);

    try {
      setLoading(true);
      await updatePayment(targetPaymentId, {
        amount: newAmt,
        payment_method: editMethod,
        notes: editNotes,
      });
    } catch (err) {
      alert(err.message || 'Failed to update payment');
      setLocalPaymentsOverride(null);
    } finally {
      setLoading(false);
    }
  };

  // Events list
  const eventsList = order?.order_items && order.order_items.length > 0 
    ? order.order_items.map(it => it.event_name || 'Wedding')
    : ['Wedding', 'Sangeet'];

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200/80 animate-in slide-in-from-right duration-200 z-[101] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching media_1791193886346.png */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base shrink-0">
              {initials}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{client.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{client.phone || '+1 415 555 0123'}</p>
              <div className="flex items-center gap-1.5 mt-2">
                {eventsList.map((ev, i) => (
                  <span 
                    key={i} 
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      ev.toLowerCase().includes('wedding') ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                    }`}
                  >
                    {ev}
                  </span>
                ))}
              </div>
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

        {/* 3 KPI Summary Cards in a Row */}
        <div className="px-6 py-4 grid grid-cols-3 gap-3 border-b border-slate-100">
          {/* Total Amount */}
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-200/70">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Amount</p>
            <p className="text-base font-bold text-slate-900 mt-1">{formatCurrency(totalAmount)}</p>
          </div>

          {/* Paid Amount */}
          <div className="bg-[#F0FDF4] p-3 rounded-2xl border border-emerald-100">
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Paid Amount</p>
            <p className="text-base font-bold text-emerald-700 mt-1">{formatCurrency(paidAmount)}</p>
          </div>

          {/* Pending Amount */}
          <div className="bg-[#FFFBEB] p-3 rounded-2xl border border-amber-100">
            <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">Pending Amount</p>
            <p className="text-base font-bold text-amber-700 mt-1">{formatCurrency(pendingAmount)}</p>
          </div>
        </div>

        {/* Tabs: Payments & Client Details */}
        <div className="px-6 border-b border-slate-100 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={`py-3 text-xs font-bold transition-all relative ${
              activeTab === 'payments' 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Payments
            {activeTab === 'payments' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`py-3 text-xs font-bold transition-all relative ${
              activeTab === 'details' 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Client Details
            {activeTab === 'details' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {feedbackMsg && (
          <div className="mx-6 mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'payments' ? (
            <>
              {/* + Add Payment Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onOpenAddPayment && onOpenAddPayment(liveClient)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Payment</span>
                </button>
              </div>

              {/* Payments List */}
              <div className="space-y-3">
                {displayPayments.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                    No payments logged yet for this client order.
                  </div>
                ) : (
                  displayPayments.map((p) => {
                  const cardDate = formatCardDate(p.payment_date);
                  const isMenuOpen = activeMenuId === p.payment_id;

                  return (
                    <div 
                      key={p.payment_id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all relative"
                    >
                      {/* Left: Date Badge Box */}
                      <div className="flex items-center gap-4">
                        <div className="w-13 h-14 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cardDate.month}</span>
                          <span className="text-base font-bold text-slate-800 leading-none my-0.5">{cardDate.day}</span>
                          <span className="text-[10px] text-slate-400">{cardDate.year}</span>
                        </div>

                        {/* Middle: Amount, Method & Note */}
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

                      {/* Right: Three Dots Action Popover */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : p.payment_id);
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
                              <span>Edit Payment</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(p.payment_id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium border-t border-slate-100 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              <span>Delete Payment</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }))}
              </div>
            </>
          ) : (
            /* Client Details Tab Content */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Client Information</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{client.phone || 'No phone provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{client.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Created: {new Date(client.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {onEditClient && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEditClient(client);
                  }}
                  className="w-full py-2.5 px-4 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Client Details</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Edit Payment Inline Modal */}
        {editingPayment && (
          <div className="fixed inset-0 z-60 bg-slate-900/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Edit Payment</h3>
                <button 
                  type="button" 
                  onClick={() => setEditingPayment(null)}
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
                    placeholder="e.g. Advance payment"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingPayment(null)}
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
