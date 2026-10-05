// =============================================================================
// src/pages/finance/AddPayoutModal.jsx — Record Team Member Payout (PDF Page 8)
// =============================================================================
import React, { useState } from 'react';
import ModalDrawer from '../../components/common/ModalDrawer';
import { useData } from '../../context/DataContext';
import { CUSTOMIZATION } from '../../config/customization';

export default function AddPayoutModal({ isOpen, onClose }) {
  const { teamMembers, addPayout } = useData();

  const [teamMemberId, setTeamMemberId] = useState(teamMembers[0]?.team_member_id || '');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState(CUSTOMIZATION.paymentMethods[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a positive payout amount.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addPayout({
        team_member_id: teamMemberId || teamMembers[0]?.team_member_id || 'tm1',
        amount: Number(amount),
        date,
        payment_method: paymentMethod,
        notes,
      });

      setAmount('');
      setNotes('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to record team payout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Payout"
      subtitle="Track team earnings and manage creator payouts."
      maxWidth="max-w-md"
      drawer={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Team Member <span className="text-red-500">*</span>
          </label>
          <select
            value={teamMemberId}
            onChange={(e) => setTeamMemberId(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800"
          >
            {teamMembers.map((m) => (
              <option key={m.team_member_id} value={m.team_member_id}>
                {m.name} ({m.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Payout Amount ({CUSTOMIZATION.currency.symbol}) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 25000"
            required
            min="1"
            className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Payout Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
            Notes / Description
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g. September payout for wedding card design work..."
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
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
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm"
          >
            {loading ? "Recording..." : "Add Payout"}
          </button>
        </div>
      </form>
    </ModalDrawer>
  );
}
