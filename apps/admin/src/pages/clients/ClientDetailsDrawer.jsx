// =============================================================================
// src/pages/clients/ClientDetailsDrawer.jsx — Matching Figma media_1791121868991.png
// Rules:
// 1. NO client image / photo (user requirement: "and no client image")
// 2. Pure read-only view — no editable inputs or options (user: "When clicked on view no edit option must be shown")
// 3. Status option is visible in ONLY edit option (user: "status option must be visible in only edit option")
// 4. Hierarchy: Order 1, Order 2... and events under that order, with + Add Order option
// =============================================================================
import React, { useState } from 'react';
import { 
  X, 
  Pencil, 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  ChevronRight,
  Infinity as InfinityIcon,
  Music,
  CircleDot,
  Home,
  Smile,
  Sparkles,
  CreditCard,
  Plus,
  Package,
  Check,
  ChevronDown,
  Trash2
} from 'lucide-react';
import StatusChip from '../../components/common/StatusChip';
import { formatCurrency } from '../../config/customization';
import { useData } from '../../context/DataContext';

const PRESET_EVENTS = [
  'Wedding Ceremony',
  'Engagement',
  'Sangeet Celebration',
  'Reception Dinner',
  'Mehendi Party',
  'Haldi Ritual',
  'House Warming',
  'Baby Shower',
  'Cocktail Night',
  'Anniversary',
  'Other Custom Event',
];

export default function ClientDetailsDrawer({ isOpen, onClose, client, onOpenAddPayment, onEditClient }) {
  const { clients, deleteClient, addOrder, templates } = useData();

  const defaultPrice = templates?.[0]?.price ? String(templates[0].price) : '4000';
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrderAmount, setNewOrderAmount] = useState(defaultPrice);
  const [newOrderSubmissionDate, setNewOrderSubmissionDate] = useState('');
  const [newEventPreset, setNewEventPreset] = useState(PRESET_EVENTS[0]);
  const [newCustomEvent, setNewCustomEvent] = useState('');
  const [newEventDate, setNewEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [newTemplateId, setNewTemplateId] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  if (!isOpen || !client) return null;

  // Reactively track the client from global context
  const liveClient = (clients || []).find(c => c.client_id === client?.client_id) || client;

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Get appropriate event icon
  const getEventIcon = (eventName) => {
    const ev = (eventName || '').toLowerCase();
    if (ev.includes('wedding')) return { icon: InfinityIcon || Sparkles, bg: 'bg-rose-50 text-rose-500' };
    if (ev.includes('sangeet')) return { icon: Music || Sparkles, bg: 'bg-purple-50 text-purple-600' };
    if (ev.includes('engagement')) return { icon: CircleDot || Sparkles, bg: 'bg-blue-50 text-blue-600' };
    if (ev.includes('house')) return { icon: Home || Sparkles, bg: 'bg-amber-50 text-amber-600' };
    if (ev.includes('baby')) return { icon: Smile || Sparkles, bg: 'bg-emerald-50 text-emerald-600' };
    return { icon: Sparkles, bg: 'bg-pink-50 text-pink-600' };
  };

  const defaultTplPriceNum = Number(defaultPrice) || 4000;
  const clientOrders = liveClient?.orders && liveClient.orders.length > 0 ? liveClient.orders : [
    {
      order_id: 'default-order',
      total_amount: defaultTplPriceNum,
      amount_paid: 0,
      pending_amount: defaultTplPriceNum,
      status: liveClient?.status || 'In Progress',
      order_date: liveClient?.created_at,
      order_items: [
        {
          order_item_id: 'default-wedding',
          event_name: 'Wedding Ceremony',
          event_date: liveClient?.created_at,
          templates: { name: templates?.[0]?.name || 'Royal Elegance' }
        }
      ]
    }
  ];

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setOrderError('');
    setOrderSuccess('');

    const finalEventName = newEventPreset === 'Other Custom Event' ? newCustomEvent.trim() : newEventPreset;
    if (!finalEventName) {
      setOrderError('Event name is required.');
      return;
    }

    setOrderLoading(true);
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const effectiveTemplateId = newTemplateId || templates?.[0]?.template_id;

      await addOrder({
        client_id: liveClient.client_id,
        total_amount: Number(newOrderAmount) || 0,
        order_date: todayStr,
        submission_date: newOrderSubmissionDate || todayStr,
        items: effectiveTemplateId ? [
          {
            template_id: effectiveTemplateId,
            event_name: finalEventName,
            event_date: newEventDate || todayStr,
          }
        ] : []
      });

      setOrderSuccess('New order added successfully!');
      setShowAddOrder(false);
      setNewOrderAmount(defaultPrice);
      setNewOrderSubmissionDate('');
      setTimeout(() => setOrderSuccess(''), 3000);
    } catch (err) {
      setOrderError(err.response?.data?.message || err.message || 'Failed to add order');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!window.confirm(`Are you sure you want to delete ${liveClient.name}? All orders, events, payments, and tasks for this client will be permanently deleted.`)) {
      return;
    }
    try {
      await deleteClient(liveClient.client_id);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete client');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200/80 animate-in slide-in-from-right duration-200 z-[101] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top Header Matching Figma media_1791121868991.png ───────────── */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* User explicitly requested: NO CLIENT IMAGE */}
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">{liveClient.name}</h2>
                <StatusChip status={liveClient.status || clientOrders[0]?.status || 'In Progress'} />
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{liveClient.phone}</p>
              <p className="text-xs text-slate-400 mt-0.5">{liveClient.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Delete Client Button */}
            <button
              type="button"
              onClick={handleDeleteClient}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Client"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Edit Button — switches directly to Edit Client Drawer */}
            {onEditClient && (
              <button
                type="button"
                onClick={() => onEditClient(liveClient)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Drawer Body: Read-Only Presentation with Order Hierarchy ──────── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. Client Information Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Client Information</span>
            </div>

            <div className="space-y-3">
              {/* Couple Name & Phone (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Client / Couple Name
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 font-medium">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{liveClient.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 font-medium">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{liveClient.phone}</span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Email
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 text-xs text-slate-800 font-medium">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{liveClient.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Client Orders & Events Hierarchy */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Orders & Events ({clientOrders.length})</span>
              </div>

              <button
                type="button"
                onClick={() => setShowAddOrder(!showAddOrder)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-blue-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Order</span>
              </button>
            </div>

            {orderError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {orderError}
              </div>
            )}
            {orderSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{orderSuccess}</span>
              </div>
            )}

            {/* + Add Order Form Inline */}
            {showAddOrder && (
              <form onSubmit={handleCreateOrder} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">Add New Order for {liveClient.name}</p>
                  <button
                    type="button"
                    onClick={() => setShowAddOrder(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Agreed Total Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newOrderAmount}
                      onChange={(e) => setNewOrderAmount(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Submission Date
                    </label>
                    <input
                      type="date"
                      value={newOrderSubmissionDate}
                      onChange={(e) => setNewOrderSubmissionDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                {/* Initial Event under this Order */}
                <div className="pt-2 border-t border-slate-200/80 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">First Event for this Order</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="relative">
                      <select
                        value={newEventPreset}
                        onChange={(e) => setNewEventPreset(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium cursor-pointer"
                      >
                        {PRESET_EVENTS.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="date"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />

                    <select
                      value={newTemplateId}
                      onChange={(e) => {
                        setNewTemplateId(e.target.value);
                        const selTpl = (templates || []).find((t) => t.template_id === e.target.value);
                        if (selTpl?.price) {
                          setNewOrderAmount(String(selTpl.price));
                        }
                      }}
                      className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium cursor-pointer"
                    >
                      {(templates || []).map(t => (
                        <option key={t.template_id} value={t.template_id}>
                          {t.name} {t.price ? `(${formatCurrency(t.price)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {newEventPreset === 'Other Custom Event' && (
                    <input
                      type="text"
                      placeholder="Type custom event name..."
                      value={newCustomEvent}
                      onChange={(e) => setNewCustomEvent(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    {orderLoading ? 'Creating...' : 'Create Order'}
                  </button>
                </div>
              </form>
            )}

            {/* List of Orders: Order 1, Order 2, etc. and their Events */}
            <div className="space-y-4">
              {clientOrders.map((ord, ordIdx) => {
                const items = ord.order_items || [];
                const displayItems = items.length > 0 ? items : [
                  {
                    order_item_id: `fallback-${ordIdx}`,
                    event_name: 'Wedding Ceremony',
                    event_date: ord.order_date || liveClient.created_at,
                    template_name: 'Royal Elegance',
                    templates: { name: 'Royal Elegance' }
                  }
                ];

                const orderTotal = Number(ord.total_amount) || 0;
                const orderPaid = Number(ord.amount_paid) || 0;
                const orderPending = Math.max(0, orderTotal - orderPaid);

                return (
                  <div 
                    key={ord.order_id || ordIdx} 
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
                  >
                    {/* Order Title & Status Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                          {ordIdx + 1}
                        </span>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">Order {ordIdx + 1}</h3>
                          <p className="text-[11px] text-slate-400">
                            Created: {formatDate(ord.order_date || liveClient.created_at)}
                            {ord.submission_date && ` • Submission: ${formatDate(ord.submission_date)}`}
                          </p>
                        </div>
                      </div>

                      <StatusChip status={ord.status || 'In Progress'} />
                    </div>

                    {/* Order Financial Row */}
                    <div className="grid grid-cols-3 gap-2 text-center p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Agreed Total</p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{formatCurrency(orderTotal)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-600 uppercase font-semibold">Received</p>
                        <p className="text-xs font-bold text-emerald-700 mt-0.5">{formatCurrency(orderPaid)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-rose-500 uppercase font-semibold">Pending</p>
                        <p className="text-xs font-bold text-rose-600 mt-0.5">{formatCurrency(orderPending)}</p>
                      </div>
                    </div>

                    {/* Events under this order */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Events under Order {ordIdx + 1} ({displayItems.length})
                      </p>

                      <div className="space-y-2">
                        {displayItems.map((item, idx) => {
                          const { icon: EventIcon, bg } = getEventIcon(item.event_name);
                          const IconComponent = EventIcon || Sparkles;
                          const tplName = (Array.isArray(item.templates) ? item.templates[0]?.name : item.templates?.name) || item.template_name || 'Royal Elegance';

                          return (
                            <div
                              key={item.order_item_id || idx}
                              className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                                  {IconComponent && <IconComponent className="w-4 h-4" />}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 text-xs">{item.event_name}</p>
                                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                                    <Calendar className="w-3 h-3 text-slate-400" />
                                    <span>{formatDate(item.event_date || ord.order_date)}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-right">
                                <div>
                                  <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                                    Template
                                  </span>
                                  <span className="block font-semibold text-slate-800 text-[11px]">
                                    {tplName}
                                  </span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Overall Payment Summary */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-600" />
                Combined Payment Overview
              </span>
              {onOpenAddPayment && (
                <button
                  type="button"
                  onClick={() => onOpenAddPayment(liveClient)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  + Record Payment
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total All Orders</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  {formatCurrency(clientOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0))}
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Paid</p>
                <p className="text-xs font-bold text-emerald-600 mt-0.5">
                  {formatCurrency(clientOrders.reduce((sum, o) => sum + (Number(o.amount_paid) || 0), 0))}
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Pending</p>
                <p className="text-xs font-bold text-rose-600 mt-0.5">
                  {formatCurrency(Math.max(0, 
                    clientOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0) - 
                    clientOrders.reduce((sum, o) => sum + (Number(o.amount_paid) || 0), 0)
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
