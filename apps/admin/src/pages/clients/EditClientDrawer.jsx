// =============================================================================
// src/pages/clients/EditClientDrawer.jsx — Edit Client & Orders Drawer
// Supporting Order 1, Order 2 hierarchy with events under each order & + Add Order
// =============================================================================
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  Plus, 
  Trash2, 
  Check, 
  FileText, 
  ChevronDown,
  Package
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CUSTOMIZATION, formatCurrency } from '../../config/customization';

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

export default function EditClientDrawer({ isOpen, onClose, client }) {
  const { updateClient, addOrder, addOrderItem, updateOrderItem, deleteOrderItem, templates } = useData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Orders hierarchy state
  // Each order has: { order_id, status, total_amount, submission_date, amount_paid, pending_amount, order_items: [...] }
  const [ordersList, setOrdersList] = useState([]);

  // Add event inline state per order (keyed by order_id or order index)
  const [activeAddEventOrderIdx, setActiveAddEventOrderIdx] = useState(null);
  const [selectedPresetEvent, setSelectedPresetEvent] = useState(PRESET_EVENTS[0]);
  const [customEventName, setCustomEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [newTemplateId, setNewTemplateId] = useState('');

  // Add new order inline state
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrderTotal, setNewOrderTotal] = useState('25000');
  const [newOrderSubmissionDate, setNewOrderSubmissionDate] = useState('');
  const [newOrderEventPreset, setNewOrderEventPreset] = useState(PRESET_EVENTS[0]);
  const [newOrderCustomEvent, setNewOrderCustomEvent] = useState('');
  const [newOrderEventDate, setNewOrderEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [newOrderTemplateId, setNewOrderTemplateId] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeClientId, setActiveClientId] = useState(null);

  useEffect(() => {
    if (client && isOpen) {
      if (activeClientId !== client.client_id) {
        setActiveClientId(client.client_id);
        setName(client.name || '');
        setPhone(client.phone || '');
        setEmail(client.email || '');

        const existingOrders = client.orders && client.orders.length > 0 ? client.orders : [
          {
            order_id: null,
            status: client.status || 'In Progress',
            total_amount: '25000',
            submission_date: '',
            amount_paid: 0,
            pending_amount: 25000,
            order_items: [
              {
                order_item_id: null,
                event_name: 'Wedding Ceremony',
                event_date: new Date().toISOString().slice(0, 10),
                template_id: templates?.[0]?.template_id || '',
              }
            ]
          }
        ];

        setOrdersList(
          existingOrders.map((ord) => ({
            order_id: ord.order_id || null,
            status: ord.status || 'In Progress',
            total_amount: ord.total_amount !== undefined ? String(ord.total_amount) : '25000',
            submission_date: ord.submission_date
              ? new Date(ord.submission_date).toISOString().slice(0, 10)
              : '',
            amount_paid: Number(ord.amount_paid) || 0,
            pending_amount: ord.pending_amount !== undefined ? Number(ord.pending_amount) : 0,
            order_items: (ord.order_items || [])
              .filter((it) => it.status !== 'Cancelled')
              .map((it) => ({
                order_item_id: it.order_item_id || null,
                event_name: it.event_name || 'Wedding Ceremony',
                event_date: it.event_date ? new Date(it.event_date).toISOString().slice(0, 10) : '',
                template_id: it.template_id || templates?.[0]?.template_id || '',
              }))
          }))
        );

        setError('');
        setSuccessMsg('');
        setShowAddOrder(false);
        setActiveAddEventOrderIdx(null);
      }
    } else {
      setActiveClientId(null);
    }
  }, [client?.client_id, isOpen]);

  if (!isOpen || !client) return null;

  // Handle Order field update
  const handleOrderChange = (orderIdx, field, val) => {
    setOrdersList((prev) => {
      const copy = [...prev];
      copy[orderIdx] = { ...copy[orderIdx], [field]: val };
      return copy;
    });
  };

  // Handle Event field update inside an Order
  const handleEventChange = (orderIdx, eventIdx, field, val) => {
    setOrdersList((prev) => {
      const copy = [...prev];
      const ord = { ...copy[orderIdx] };
      const items = [...ord.order_items];
      items[eventIdx] = { ...items[eventIdx], [field]: val };
      ord.order_items = items;
      copy[orderIdx] = ord;
      return copy;
    });
  };

  // Delete Event inside an Order
  const handleDeleteEvent = async (orderIdx, eventIdx) => {
    const ord = ordersList[orderIdx];
    if (ord.order_items.length <= 1) {
      setError('Each order must have at least one event.');
      return;
    }

    const item = ord.order_items[eventIdx];

    // Optimistically remove from state
    setOrdersList((prev) => {
      const copy = [...prev];
      const targetOrd = { ...copy[orderIdx] };
      targetOrd.order_items = targetOrd.order_items.filter((_, i) => i !== eventIdx);
      copy[orderIdx] = targetOrd;
      return copy;
    });

    if (item.order_item_id) {
      try {
        await deleteOrderItem(item.order_item_id);
      } catch (err) {
        console.warn('Failed to delete order item:', err);
      }
    }
    setSuccessMsg('Event removed.');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Add Event to specific Order
  const handleAddEventToOrder = async (orderIdx) => {
    const finalEventName = selectedPresetEvent === 'Other Custom Event'
      ? customEventName.trim()
      : selectedPresetEvent;

    if (!finalEventName) {
      setError('Please choose or enter an event name.');
      return;
    }
    if (!newEventDate) {
      setError('Event date is required.');
      return;
    }

    const ord = ordersList[orderIdx];
    const effTemplateId = newTemplateId || templates?.[0]?.template_id;

    if (ord.order_id) {
      setLoading(true);
      try {
        const added = await addOrderItem({
          order_id: ord.order_id,
          template_id: effTemplateId,
          event_name: finalEventName,
          event_date: newEventDate,
        });

        setOrdersList((prev) => {
          const copy = [...prev];
          const targetOrd = { ...copy[orderIdx] };
          targetOrd.order_items = [
            ...targetOrd.order_items,
            {
              order_item_id: added?.order_item_id || null,
              event_name: finalEventName,
              event_date: newEventDate,
              template_id: effTemplateId,
            }
          ];
          copy[orderIdx] = targetOrd;
          return copy;
        });

        setSelectedPresetEvent(PRESET_EVENTS[0]);
        setCustomEventName('');
        setNewEventDate(new Date().toISOString().slice(0, 10));
        setActiveAddEventOrderIdx(null);
        setSuccessMsg('Event added to order!');
        setTimeout(() => setSuccessMsg(''), 2500);
      } catch (err) {
        setError(err.message || 'Failed to add event');
      } finally {
        setLoading(false);
      }
    } else {
      setOrdersList((prev) => {
        const copy = [...prev];
        const targetOrd = { ...copy[orderIdx] };
        targetOrd.order_items = [
          ...targetOrd.order_items,
          {
            order_item_id: null,
            event_name: finalEventName,
            event_date: newEventDate,
            template_id: effTemplateId,
          }
        ];
        copy[orderIdx] = targetOrd;
        return copy;
      });
      setSelectedPresetEvent(PRESET_EVENTS[0]);
      setCustomEventName('');
      setNewEventDate(new Date().toISOString().slice(0, 10));
      setActiveAddEventOrderIdx(null);
    }
  };

  // Add Brand New Order to Client
  const handleAddNewOrder = async (e) => {
    e.preventDefault();
    setError('');
    const finalEventName = newOrderEventPreset === 'Other Custom Event'
      ? newOrderCustomEvent.trim()
      : newOrderEventPreset;

    if (!finalEventName) {
      setError('Initial event name is required for new order.');
      return;
    }

    setLoading(true);
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const effTemplateId = newOrderTemplateId || templates?.[0]?.template_id;

      const created = await addOrder({
        client_id: client.client_id,
        total_amount: Number(newOrderTotal) || 0,
        order_date: todayStr,
        submission_date: newOrderSubmissionDate || todayStr,
        items: effTemplateId ? [
          {
            template_id: effTemplateId,
            event_name: finalEventName,
            event_date: newOrderEventDate || todayStr,
          }
        ] : []
      });

      setOrdersList((prev) => [
        ...prev,
        {
          order_id: created?.order_id || null,
          status: 'In Progress',
          total_amount: newOrderTotal,
          submission_date: newOrderSubmissionDate || todayStr,
          amount_paid: 0,
          pending_amount: Number(newOrderTotal) || 0,
          order_items: [
            {
              order_item_id: null,
              event_name: finalEventName,
              event_date: newOrderEventDate || todayStr,
              template_id: effTemplateId,
            }
          ]
        }
      ]);

      setShowAddOrder(false);
      setNewOrderTotal('25000');
      setNewOrderSubmissionDate('');
      setSuccessMsg('New order added!');
      setTimeout(() => setSuccessMsg(''), 2500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add order');
    } finally {
      setLoading(false);
    }
  };

  // Save all changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim()) {
      setError('Client / Couple Name is required.');
      return;
    }
    if (!phone.trim()) {
      setError('Phone number is required.');
      return;
    }

    setLoading(true);
    try {
      const primaryOrder = ordersList[0];

      // Update client basic details and primary order info
      await updateClient(client.client_id, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        status: primaryOrder?.status || 'In Progress',
        total_amount: Number(primaryOrder?.total_amount) || 0,
        submission_date: primaryOrder?.submission_date || undefined,
      });

      // Update order items across all orders
      for (const ord of ordersList) {
        for (const ev of ord.order_items) {
          if (ev.order_item_id && updateOrderItem) {
            try {
              await updateOrderItem(ev.order_item_id, {
                event_name: ev.event_name,
                event_date: ev.event_date,
                template_id: ev.template_id,
              });
            } catch (err) {
              console.error('Failed to update event item:', err);
            }
          }
        }
      }

      setSuccessMsg('Client & orders updated successfully!');
      setTimeout(() => {
        onClose();
      }, 600);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save client changes.');
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
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200/80 animate-in slide-in-from-right duration-200 z-[101] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Edit Client Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure details, orders, and events for {client.name}.
            </p>
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
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSaveChanges} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Client Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Client Information</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client / Couple Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* 2. Orders & Events Hierarchy */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>Orders & Events ({ordersList.length})</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Configure Order 1, Order 2... and events under each order.
                </p>
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

            {/* Inline Add Order Form */}
            {showAddOrder && (
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Add New Order</p>
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
                      value={newOrderTotal}
                      onChange={(e) => setNewOrderTotal(e.target.value)}
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

                {/* Event under this new order */}
                <div className="pt-2 border-t border-blue-100 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Initial Event</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <select
                      value={newOrderEventPreset}
                      onChange={(e) => setNewOrderEventPreset(e.target.value)}
                      className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium cursor-pointer"
                    >
                      {PRESET_EVENTS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    <input
                      type="date"
                      value={newOrderEventDate}
                      onChange={(e) => setNewOrderEventDate(e.target.value)}
                      className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />

                    <select
                      value={newOrderTemplateId}
                      onChange={(e) => setNewOrderTemplateId(e.target.value)}
                      className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium cursor-pointer"
                    >
                      {templates.map(t => (
                        <option key={t.template_id} value={t.template_id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  {newOrderEventPreset === 'Other Custom Event' && (
                    <input
                      type="text"
                      placeholder="Type custom event name..."
                      value={newOrderCustomEvent}
                      onChange={(e) => setNewOrderCustomEvent(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  )}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleAddNewOrder}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Confirm Add Order
                  </button>
                </div>
              </div>
            )}

            {/* List of Orders with Events */}
            <div className="space-y-6">
              {ordersList.map((ord, ordIdx) => {
                const totalNum = Number(ord.total_amount) || 0;
                const paidNum = ord.amount_paid || 0;
                const pendingNum = Math.max(0, totalNum - paidNum);

                return (
                  <div 
                    key={ord.order_id || ordIdx} 
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {ordIdx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Order {ordIdx + 1}</h4>
                          <span className="text-[11px] text-slate-400">Order details & financials</span>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="w-40 relative">
                        <select
                          value={ord.status}
                          onChange={(e) => handleOrderChange(ordIdx, 'status', e.target.value)}
                          className="w-full text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 cursor-pointer appearance-none"
                        >
                          {CUSTOMIZATION.clientStatuses.map((st) => (
                            <option key={st.id} value={st.id}>{st.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Order Financials & Submission Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Total Agreed Amount (₹) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          required
                          value={ord.total_amount}
                          onChange={(e) => handleOrderChange(ordIdx, 'total_amount', e.target.value)}
                          className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Submission Date
                        </label>
                        <input
                          type="date"
                          value={ord.submission_date}
                          onChange={(e) => handleOrderChange(ordIdx, 'submission_date', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>Received: <strong className="text-emerald-600">{formatCurrency(paidNum)}</strong></span>
                      <span>Pending: <strong className="text-rose-600">{formatCurrency(pendingNum)}</strong></span>
                    </div>

                    {/* Events under this order */}
                    <div className="pt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          Events under Order {ordIdx + 1} ({ord.order_items.length})
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveAddEventOrderIdx(activeAddEventOrderIdx === ordIdx ? null : ordIdx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold cursor-pointer border border-blue-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Event</span>
                        </button>
                      </div>

                      {/* Inline Add Event box for this specific order */}
                      {activeAddEventOrderIdx === ordIdx && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in-50 duration-100">
                          <p className="text-[11px] font-bold text-slate-700">Add Event to Order {ordIdx + 1}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <select
                              value={selectedPresetEvent}
                              onChange={(e) => setSelectedPresetEvent(e.target.value)}
                              className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium cursor-pointer"
                            >
                              {PRESET_EVENTS.map(p => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>

                            <input
                              type="date"
                              value={newEventDate}
                              onChange={(e) => setNewEventDate(e.target.value)}
                              className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                            />

                            <select
                              value={newTemplateId}
                              onChange={(e) => setNewTemplateId(e.target.value)}
                              className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium cursor-pointer"
                            >
                              {templates.map(t => (
                                <option key={t.template_id} value={t.template_id}>{t.name}</option>
                              ))}
                            </select>
                          </div>

                          {selectedPresetEvent === 'Other Custom Event' && (
                            <input
                              type="text"
                              placeholder="Type custom event name..."
                              value={customEventName}
                              onChange={(e) => setCustomEventName(e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                            />
                          )}

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setActiveAddEventOrderIdx(null)}
                              className="px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-200 rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddEventToOrder(ordIdx)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Add Event
                            </button>
                          </div>
                        </div>
                      )}

                      {/* List of existing events under this order */}
                      <div className="space-y-2.5">
                        {ord.order_items.map((ev, evIdx) => (
                          <div
                            key={ev.order_item_id || evIdx}
                            className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/40 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                                Event #{evIdx + 1}: {ev.event_name}
                              </span>
                              {ord.order_items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEvent(ordIdx, evIdx)}
                                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 cursor-pointer"
                                  title="Delete Event"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                                  Event Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={ev.event_name}
                                  onChange={(e) => handleEventChange(ordIdx, evIdx, 'event_name', e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                                  Event Date
                                </label>
                                <input
                                  type="date"
                                  required
                                  value={ev.event_date}
                                  onChange={(e) => handleEventChange(ordIdx, evIdx, 'event_date', e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                                  Template
                                </label>
                                <select
                                  value={ev.template_id}
                                  onChange={(e) => handleEventChange(ordIdx, evIdx, 'template_id', e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium cursor-pointer"
                                >
                                  {templates.map((tpl) => (
                                    <option key={tpl.template_id} value={tpl.template_id}>
                                      {tpl.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Save All Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
