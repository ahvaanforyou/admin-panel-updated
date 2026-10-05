// =============================================================================
// src/pages/clients/AddClientModal.jsx — 2-Step Flow matching Figma
// =============================================================================
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Users, 
  Mail, 
  Calendar, 
  Info, 
  ArrowRight, 
  ArrowLeft, 
  Pencil, 
  Trash2, 
  Plus, 
  ChevronDown, 
  Infinity as InfinityIcon, 
  Music, 
  Home, 
  Smile, 
  MoreHorizontal, 
  CircleDot,
  Sparkles,
  PartyPopper,
  Wine,
  Heart
} from 'lucide-react';
import { useData } from '../../context/DataContext';

// International Country Codes with Flags
const COUNTRY_CODES = [
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
];

// Event Type definitions
const ALL_EVENT_TYPES = [
  {
    id: 'Wedding',
    name: 'Wedding',
    subtitle: 'Main wedding invitation and wedding website',
    icon: InfinityIcon,
    bgClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'Engagement',
    name: 'Engagement',
    subtitle: 'Engagement invitation',
    icon: CircleDot,
    bgClass: 'bg-rose-50 text-rose-500',
  },
  {
    id: 'Sangeet',
    name: 'Sangeet',
    subtitle: 'Sangeet / Music night invitation',
    icon: Music,
    bgClass: 'bg-purple-50 text-purple-600',
  },
  {
    id: 'Reception',
    name: 'Reception',
    subtitle: 'Wedding reception & celebration dinner',
    icon: Sparkles,
    bgClass: 'bg-pink-50 text-pink-600',
  },
  {
    id: 'Mehendi',
    name: 'Mehendi',
    subtitle: 'Henna ceremony & celebration',
    icon: PartyPopper,
    bgClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'Haldi',
    name: 'Haldi',
    subtitle: 'Turmeric ritual ceremony',
    icon: Heart,
    bgClass: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'House Opening',
    name: 'House Opening',
    subtitle: 'House warming invitation',
    icon: Home,
    bgClass: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'Baby Shower',
    name: 'Baby Shower',
    subtitle: 'Baby shower invitation',
    icon: Smile,
    bgClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'Cocktail Party',
    name: 'Cocktail Party',
    subtitle: 'Evening cocktail celebration',
    icon: Wine,
    bgClass: 'bg-indigo-50 text-indigo-600',
  },
  {
    id: 'Other',
    name: 'Other',
    subtitle: 'Any other event',
    icon: MoreHorizontal,
    bgClass: 'bg-slate-100 text-slate-600',
  },
];

export default function AddClientModal({ isOpen, onClose }) {
  const { addClient, templates } = useData();

  // Wizard Step: 1 or 2
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 Form Data
  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mainEventDate, setMainEventDate] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(['Wedding']);

  // Step 2 Form Data
  const [eventItems, setEventItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [showAddEventPicker, setShowAddEventPicker] = useState(false);

  const countryDropdownRef = useRef(null);
  const pickerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setShowCountryDropdown(false);
      }
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowAddEventPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError('');
      setName('');
      setPhone('');
      setEmail('');
      setMainEventDate('');
      setSubmissionDate('');
      setSelectedTypes(['Wedding']);
      setEventItems([]);
      setNotes('');
      setShowAddEventPicker(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle selection of event types in Step 1
  const toggleEventType = (typeId) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  // Move from Step 1 to Step 2
  const handleContinueToStep2 = () => {
    if (!name.trim()) {
      setError('Client / Couple Name is required.');
      return;
    }
    if (!phone.trim()) {
      setError('Phone number is required.');
      return;
    }
    if (!mainEventDate) {
      setError('Main Event Date is required.');
      return;
    }
    setError('');

    const defaultTemplateId = templates?.[0]?.template_id || '';
    const newItems = selectedTypes.map((typeId) => {
      const opt = ALL_EVENT_TYPES.find((o) => o.id === typeId);
      return {
        event_name: typeId,
        subtitle: opt ? opt.subtitle : `${typeId} ceremony`,
        event_date: mainEventDate,
        template_id: defaultTemplateId,
        icon: opt ? opt.icon : InfinityIcon,
        bgClass: opt ? opt.bgClass : 'bg-blue-50 text-blue-600',
      };
    });

    setEventItems(newItems);
    setStep(2);
  };

  // Update item field in Step 2
  const handleItemChange = (index, field, value) => {
    setEventItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Delete event item in Step 2
  const handleDeleteItem = (index) => {
    if (eventItems.length <= 1) return;
    setEventItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Add specific chosen event from selector menu
  const handleSelectEventToAdd = (chosenType) => {
    const defaultTemplateId = templates?.[0]?.template_id || '';
    const opt = ALL_EVENT_TYPES.find((o) => o.id === chosenType) || ALL_EVENT_TYPES[0];

    setEventItems((prev) => [
      ...prev,
      {
        event_name: opt.name,
        subtitle: opt.subtitle,
        event_date: mainEventDate || new Date().toISOString().slice(0, 10),
        template_id: defaultTemplateId,
        icon: opt.icon,
        bgClass: opt.bgClass,
      },
    ]);
    setShowAddEventPicker(false);
  };

  // Final submission in Step 2
  const handleCreateClient = async (e) => {
    e.preventDefault();
    setError('');

    for (const item of eventItems) {
      if (!item.event_name.trim()) {
        setError('All events must have a name.');
        return;
      }
      if (!item.event_date) {
        setError('All events must have a date.');
        return;
      }
    }

    setLoading(true);
    try {
      const fullPhone = `${selectedCountry.code} ${phone.trim()}`;
      const payload = {
        name: name.trim(),
        email: email.trim() || `${phone.replace(/\D/g, '')}@ahvaan.com`,
        phone: fullPhone,
        order: {
          total_amount: 25000,
          order_date: new Date().toISOString().slice(0, 10),
          submission_date: submissionDate || mainEventDate || new Date().toISOString().slice(0, 10),
          items: eventItems.map((ev) => ({
            template_id: ev.template_id || templates?.[0]?.template_id,
            event_name: ev.event_name,
            event_date: ev.event_date,
            notes: notes || '',
          })),
        },
      };

      await addClient(payload);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create client.');
    } finally {
      setLoading(false);
    }
  };

  const formatDisplayDate = (dStr) => {
    if (!dStr) return '';
    try {
      const d = new Date(dStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Add New Client</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === 1
                ? "Step 1: Add the couple's basic details and select the event type(s)."
                : 'Step 2: Add event details and select templates for each event.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Step {step} of 2</span>
              <div className="flex items-center gap-1">
                <span className="w-7 h-1.5 rounded-full bg-blue-600"></span>
                <span className={`w-7 h-1.5 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></span>
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
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                COUPLE / CLIENT INFORMATION
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Client / Couple Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya & Karthik"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 overflow-visible">
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="h-full flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border-r border-slate-200 text-xs font-medium text-slate-700 rounded-l-xl transition-colors cursor-pointer"
                      >
                        <span className="text-base">{selectedCountry.flag}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-500 font-semibold">{selectedCountry.code}</span>
                      </button>

                      {showCountryDropdown && (
                        <div className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs max-h-56 overflow-y-auto">
                          {COUNTRY_CODES.map((c, i) => (
                            <button
                              key={`${c.country}-${i}`}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c);
                                setShowCountryDropdown(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                                selectedCountry.code === c.code && selectedCountry.country === c.country
                                  ? 'bg-blue-50 text-blue-600 font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base">{c.flag}</span>
                                <span>{c.name}</span>
                              </div>
                              <span className="text-slate-400 font-medium">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="415 555 0123"
                      className="w-full text-xs px-3 py-2.5 bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@email.com"
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Main Event Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={mainEventDate}
                      onChange={(e) => setMainEventDate(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Submission Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={submissionDate}
                      onChange={(e) => setSubmissionDate(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event Types 3x2 Grid */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Select Event Type(s) <span className="text-rose-500">*</span>
                </label>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose all the events this client needs invitations for.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ALL_EVENT_TYPES.slice(0, 6).map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedTypes.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleEventType(item.id)}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600/30'
                          : 'border-slate-200/90 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.bgClass}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-slate-900 text-xs">{item.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center gap-2.5 text-xs text-blue-700">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  You can select multiple events (e.g. Wedding + Sangeet) in the next step and choose templates for each event.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleContinueToStep2}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Strict Grid Alignment for Every Event Row & Event Picker */}
        {step === 2 && (
          <form onSubmit={handleCreateClient} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
            {/* Top Summary Banner */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedCountry.code} {phone} &nbsp;•&nbsp; {formatDisplayDate(mainEventDate)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit Details</span>
              </button>
            </div>

            {/* Event Details Section */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Event Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Add all the events this client needs invitations for. Select the template for each event.
                </p>
              </div>

              {/* Event Cards List with Strict 12-Column Responsive Alignment */}
              <div className="space-y-3">
                {eventItems.map((item, idx) => {
                  const Icon = item.icon || InfinityIcon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                        {/* Col 1-4: Icon & Event Title */}
                        <div className="md:col-span-4 flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.bgClass || 'bg-blue-50 text-blue-600'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate">{item.event_name}</p>
                            <p className="text-[11px] text-slate-400 truncate">{item.subtitle || 'Event invitation'}</p>
                          </div>
                        </div>

                        {/* Col 5-7: Event Date */}
                        <div className="md:col-span-3">
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Event Date
                          </label>
                          <input
                            type="date"
                            required
                            value={item.event_date}
                            onChange={(e) => handleItemChange(idx, 'event_date', e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                          />
                        </div>

                        {/* Col 8-11: Selected Template */}
                        <div className="md:col-span-4">
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Selected Template
                          </label>
                          <div className="relative">
                            <select
                              value={item.template_id}
                              onChange={(e) => handleItemChange(idx, 'template_id', e.target.value)}
                              className="w-full text-xs pl-3 pr-8 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-medium appearance-none cursor-pointer truncate"
                            >
                              {templates.map((tpl) => (
                                <option key={tpl.template_id} value={tpl.template_id}>
                                  {tpl.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Col 12: Trash Button */}
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(idx)}
                            disabled={eventItems.length <= 1}
                            className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* + Add Another Event with Popover Menu Selector */}
              <div className="relative" ref={pickerRef}>
                <button
                  type="button"
                  onClick={() => setShowAddEventPicker(!showAddEventPicker)}
                  className="w-full border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 hover:bg-blue-50/50 rounded-2xl p-4 flex items-center justify-between transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-xs group-hover:text-blue-600 transition-colors">
                        Add Another Event
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Pick an event: Wedding, Engagement, Sangeet, Reception, Mehendi, Haldi, or Other
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </button>

                {/* Event Selector Menu Dropdown */}
                {showAddEventPicker && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-30 animate-in fade-in-50 zoom-in-95 duration-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                      Choose Event Type to Add
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ALL_EVENT_TYPES.map((ev) => {
                        const Icon = ev.icon;
                        return (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={() => handleSelectEventToAdd(ev.id)}
                            className="flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-blue-50 transition-colors group cursor-pointer border border-transparent hover:border-blue-200"
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ev.bgClass}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 truncate">
                                {ev.name}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special requirements, design preferences, content details or notes about this client..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 resize-none"
                />
                <span className="absolute right-3 bottom-2 text-[10px] text-slate-400 font-medium">
                  {notes.length}/500
                </span>
              </div>
            </div>

            {/* Step 2 Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Client</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
