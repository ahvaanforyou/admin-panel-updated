import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, ChevronDown, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CreateModal({ 
  isOpen, 
  onClose, 
  preSelectedTemplate 
}) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [occasion, setOccasion] = useState(
    preSelectedTemplate?.category 
      ? preSelectedTemplate.category === 'wedding' 
        ? 'Wedding Celebration' 
        : preSelectedTemplate.name 
      : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);

    const leadData = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: whatsapp.trim().startsWith('+91') ? whatsapp.trim() : `+91 ${whatsapp.trim()}`,
      occasion: occasion || 'Wedding Celebration',
      template: preSelectedTemplate?.name || 'Custom Invitation Request',
      status: 'NEW',
    };

    try {
      // 1. Send to Google Sheets Webhook endpoint (if available)
      const googleSheetEndpoint = window.__AHVAAN_GOOGLE_SHEET_WEBHOOK__ || '';
      if (googleSheetEndpoint) {
        await fetch(googleSheetEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      }

      // 2. Also record in local storage for offline resiliency
      const savedLeads = JSON.parse(localStorage.getItem('ahvaan_leads') || '[]');
      savedLeads.unshift(leadData);
      localStorage.setItem('ahvaan_leads', JSON.stringify(savedLeads));

      // 3. Post to backend API if running
      fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: leadData.name,
          phone: leadData.phone,
          project_type: leadData.occasion,
          status: 'In Progress',
          budget: preSelectedTemplate ? parseInt(preSelectedTemplate.price.replace(/[^\d]/g, '')) || 1999 : 1999,
          received_amount: 0,
          pending_amount: preSelectedTemplate ? parseInt(preSelectedTemplate.price.replace(/[^\d]/g, '')) || 1999 : 1999,
          notes: `Website Enquiry: Occasion '${leadData.occasion}'. Selected Template: ${leadData.template}`,
        }),
      }).catch(() => {});

      setIsSuccess(true);
    } catch (err) {
      console.warn('Form submitted locally:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Ahvaan Team! I would like to create an invitation.\n\nName: ${name || 'Interested Client'}\nPhone: ${whatsapp || ''}\nOccasion: ${occasion || 'Wedding Celebration'}`
    );
    window.open(`https://wa.me/918985966940?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 select-none">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[480px] bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 border border-stone-200/90 p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Top Close Button matching reference */}
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors shadow-2xs z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {isSuccess ? (
            /* ================= SUCCESS CONFIRMATION ================= */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-[#351410] tracking-tight">
                Request Received!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong className="text-stone-900">{name}</strong>! Our design team will contact you on WhatsApp within <strong className="text-[#351410]">3–5 hours</strong>.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Chat on WhatsApp Instantly</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3 px-5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ================= EXACT FORM MATCHING REFERENCE ================= */
            <div>
              {/* Header with Title & Envelope Graphic */}
              <div className="relative flex items-start justify-between mb-6 pr-6">
                <div className="max-w-[270px] sm:max-w-[290px]">
                  <h3 className="text-3xl sm:text-[2.1rem] font-bold text-[#351410] tracking-tight leading-[1.08]">
                    Let's Create
                    <br />
                    Your Invitation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-stone-500 font-normal leading-relaxed">
                    Share a few details and our team will design your perfect invitation.
                  </p>
                </div>

                {/* Envelope Artwork at Top Right */}
                <div className="w-20 sm:w-24 h-auto flex-shrink-0 -mt-1 select-none pointer-events-none">
                  <img
                    src="/images/create-modal/envelope-clean.png"
                    alt="Invitation Envelope"
                    className="w-full h-auto object-contain drop-shadow-sm transform rotate-1"
                  />
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Field 1: Your Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs sm:text-sm font-semibold text-stone-900 block">
                    Your Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-2xl border border-stone-200/90 text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#351410] focus:ring-1 focus:ring-[#351410] transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Field 2: WhatsApp Number */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs sm:text-sm font-semibold text-stone-900 block">
                    WhatsApp Number
                  </label>
                  <div className="relative flex items-center rounded-2xl border border-stone-200/90 bg-white overflow-hidden focus-within:border-[#351410] focus-within:ring-1 focus-within:ring-[#351410] transition-all">
                    {/* Country Code Prefix */}
                    <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 sm:py-3.5 bg-stone-50/70 border-r border-stone-200 text-stone-700 text-xs sm:text-sm font-medium flex-shrink-0 select-none">
                      <span className="text-base leading-none">🇮🇳</span>
                      <span className="font-semibold">+91</span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                    </div>

                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/[^\d\s]/g, ''))}
                      placeholder="898 5966940"
                      className="w-full px-3.5 py-3 sm:py-3.5 text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Field 3: Invitation For */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs sm:text-sm font-semibold text-stone-900 block">
                    Invitation For
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full pl-10 pr-9 py-3 sm:py-3.5 rounded-2xl border border-stone-200/90 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#351410] focus:ring-1 focus:ring-[#351410] transition-all bg-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select occasion</option>
                      <option value="Wedding Celebration">Wedding Celebration</option>
                      <option value="Sangeet & Cocktails">Sangeet &amp; Cocktails</option>
                      <option value="Grand Vivah & Reception">Grand Vivah &amp; Reception</option>
                      <option value="Engagement Ceremony">Engagement Ceremony</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="House Warming (Griha Pravesh)">House Warming (Griha Pravesh)</option>
                      <option value="Baby Shower (Godh Bharai)">Baby Shower (Godh Bharai)</option>
                      <option value="Other Celebration">Other Celebration</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-5 py-3.5 sm:py-4 px-6 rounded-2xl sm:rounded-full bg-[#351410] hover:bg-[#230C0A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-75"
                >
                  <span>{isSubmitting ? 'Sending Details...' : 'Submit Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

              {/* Bottom Notification Card matching reference */}
              <div className="mt-5 p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex items-center justify-between gap-3 text-left">
                
                {/* Left side: SLA Note */}
                <div className="flex items-center gap-2.5 flex-1 pr-2">
                  <div className="w-7 h-7 rounded-full bg-[#FCECE8] text-[#351410] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-tight">
                    Once submitted, our team will contact you within <strong className="text-stone-900 font-bold">3–5 hours</strong>.
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-stone-200 flex-shrink-0" />

                {/* Right side: WhatsApp link */}
                <a
                  href="https://wa.me/918985966940?text=Hi%20Ahvaan%20Team!%20I%20would%20like%20to%20create%20a%20digital%20invitation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity"
                >
                  <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <div className="text-[10px] sm:text-[11px] leading-tight text-left">
                    <span className="block text-stone-500">You can also</span>
                    <span className="block text-stone-700 font-bold whitespace-nowrap">WhatsApp us at</span>
                    <span className="block text-[#351410] font-extrabold whitespace-nowrap">+91 898 59 66940</span>
                  </div>
                </a>

              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
