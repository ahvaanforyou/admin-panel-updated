// =============================================================================
// src/pages/finance/AddPaymentModal.jsx — Record Client Payment (PDF Page 10)
// =============================================================================
import React, { useState, useEffect } from 'react';
import ModalDrawer from '../../components/common/ModalDrawer';
import { useData } from '../../context/DataContext';
import { CUSTOMIZATION, formatCurrency } from '../../config/customization';

export default function AddPaymentModal({ isOpen, onClose, defaultClient }) {
  const { clients, addPayment } = useData();

  const [clientId, setClientId] = useState(defaultClient?.client_id || (clients[0]?.client_id || ''));
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState(CUSTOMIZATION.paymentMethods[0]);
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

  const effectiveClientId = clientId || defaultClient?.client_id || (clients.length > 0 ? clients[0].client_id : '');
  const selectedClient = clients.find((c) => c.client_id === effectiveClientId);
  const order = selectedClient?.orders?.[0];
  const pendingAmount = order?.pending_amount ?? (order?.total_amount || 0);
  const isFullyPaid = Number(order?.total_amount) > 0 && Number(pendingAmount) <= 0;

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
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add Payment"
      subtitle="Record a payment for a client to update business balances."
      maxWidth="max-w-md"
      drawer={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Client Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Select Client <span className="text-red-500">*</span>
          </label>
          <select
            value={effectiveClientId || ''}
            onChange={(e) => setClientId(e.target.value)}
            required
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          >
            {clients.length === 0 ? (
              <option value="">No clients found</option>
            ) : (
              clients.map((c) => (
                <option key={c.client_id} value={c.client_id}>
                  {c.name} {c.phone ? `(${c.phone})` : ''}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Balance Indicator */}
        {order && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Order Total: <strong>{formatCurrency(order.total_amount)}</strong></span>
            <span className="text-amber-700 font-semibold">Pending: <strong>{formatCurrency(pendingAmount)}</strong></span>
          </div>
        )}

        {/* Fully Paid Frozen Alert */}
        {isFullyPaid && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
            <span className="font-semibold">
              Full amount of {formatCurrency(order?.total_amount)} has already been received. Payments for this client are frozen and completed.
            </span>
          </div>
        )}

        {/* Amount */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Amount Received ({CUSTOMIZATION.currency.symbol}) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={isFullyPaid ? "Fully Paid (0 Pending)" : "e.g. 10000"}
            required={!isFullyPaid}
            disabled={isFullyPaid}
            min="1"
            className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 text-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
            >
              {CUSTOMIZATION.paymentMethods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Notes / Receipt Details
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 50% advance for wedding reception"
            rows="2"
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || isFullyPaid}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            {loading ? "Recording..." : isFullyPaid ? "Payment Frozen" : "Record Payment"}
          </button>
        </div>
      </form>
    </ModalDrawer>
  );
}
