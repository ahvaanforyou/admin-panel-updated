// =============================================================================
// src/pages/finance/AddPaymentModal.jsx — Record Client Payment (Matching Screenshot 5)
// =============================================================================
import React, { useState, useEffect } from 'react';
import { CreditCard, X, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CUSTOMIZATION, formatCurrency } from '../../config/customization';

export default function AddPaymentModal({ isOpen, onClose, defaultClient }) {
  const { clients, addPayment } = useData();

  const [clientId, setClientId] = useState(defaultClient?.client_id || (clients[0]?.client_id || ''));
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState(CUSTOMIZATION.paymentMethods[0] || 'UPI');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultClient?.client_id) {
      setClientId(defaultClient.client_id);
    } else if (!clientId && clients.length > 0) {
      setClientId(clients[0].client_id);
    }
  }, [defaultClient, clients, isOpen]);

  if (!isOpen) return null;

  const effectiveClientId = clientId || defaultClient?.client_id || (clients.length > 0 ? clients[0].client_id : '');
  const selectedClient = clients.find((c) => c.client_id === effectiveClientId);
  const order = selectedClient?.orders?.[0];
  const totalAmount = Number(order?.total_amount) || 0;
  const pendingAmount = order?.pending_amount ?? (order?.total_amount || 0);
  const isFullyPaid = totalAmount > 0 && Number(pendingAmount) <= 0;

  // Monogram initials for the client avatar
  const rawClientName = selectedClient?.name || 'Client';
  const initials = typeof rawClientName === 'string'
    ? rawClientName
        .split('&')
        .map(part => part.trim().charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'CL'
    : 'CL';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targetClientId = effectiveClientId;
    if (!targetClientId) {
      setError('Please select a client.');
      return;
    }
    if (isFullyPaid) {
      setError('Payments for this client are frozen because the full amount has already been received.');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid positive payment amount.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const activeOrder = selectedClient?.orders?.[0];
      await addPayment({
        client_id: targetClientId,
        order_id: activeOrder?.order_id || 'o1',
        amount: Number(amount),
        payment_date: paymentDate,
        payment_method: paymentMethod,
        notes,
      });

      setAmount('');
      setNotes('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to record payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[120] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching Screenshot 5 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Payment</h3>
              <p className="text-xs text-slate-500 mt-0.5">Record a payment for a client.</p>
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

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Selector Pill matching Screenshot 5 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Client <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{selectedClient?.name || 'Select Client'}</p>
                    <p className="text-[11px] text-slate-400">{selectedClient?.phone || 'No phone'}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <select
                value={effectiveClientId || ''}
                onChange={(e) => setClientId(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              >
                {clients.map((c) => (
                  <option key={c.client_id} value={c.client_id}>
                    {c.name} {c.phone ? `(${c.phone})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Total Amount & Amount Paid Side-by-Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Total Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={totalAmount.toLocaleString('en-IN')}
                  className="w-full text-xs font-bold pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 cursor-not-allowed"
                />
              </div>
            </div>

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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="3000"
                  disabled={isFullyPaid}
                  className="w-full text-xs font-bold pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Payment Date & Method Side-by-Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Payment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 cursor-pointer"
              >
                {CUSTOMIZATION.paymentMethods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes (Optional) with Character Counter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Notes (Optional)
            </label>
            <div className="relative">
              <textarea
                value={notes}
                maxLength={200}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g. Advance payment for wedding..."
                rows={3}
                className="w-full text-xs p-3.5 pb-7 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-400"
              />
              <span className="absolute right-3.5 bottom-2.5 text-[11px] text-slate-400">
                {(notes || '').length}/200
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isFullyPaid}
              className="w-full py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              {loading ? "Recording..." : isFullyPaid ? "Payment Frozen" : "Add Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
