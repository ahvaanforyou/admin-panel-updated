import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { TEMPLATES } from '../../data/content';

export default function TemplatePreviewModal({ 
  template, 
  onClose, 
  onSelectForCreation 
}) {
  if (!template) return null;

  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  // Re-trigger loading skeleton whenever template changes
  useEffect(() => {
    setIsLoadingIframe(true);
  }, [template.id, template.previewUrl]);

  // Find index for next/prev navigation
  const currentIndex = TEMPLATES.findIndex(t => t.id === template.id);
  const prevTemplate = currentIndex > 0 ? TEMPLATES[currentIndex - 1] : null;
  const nextTemplate = currentIndex < TEMPLATES.length - 1 ? TEMPLATES[currentIndex + 1] : null;

  // Single Primary CTA: Order This Invitation via WhatsApp
  const templateName = template.clientTitle || template.name || 'Invitation';
  const orderMessage = `Hi andi, I liked the ${templateName} template. Please customise it according to our info.`;
  const whatsappOrderUrl = `https://wa.me/918985966940?text=${encodeURIComponent(orderMessage)}`;

  const liveUrl = template.previewUrl || 'https://divyawedsnikhil.ahvaanforyou.com';

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[200] overflow-y-auto bg-black/90 backdrop-blur-md select-none animate-in fade-in duration-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* ========================================================================= */}
        {/* 1. MOBILE FULLSCREEN VIEW (< lg): Full Screen Edge-to-Edge Experience    */}
        {/* ========================================================================= */}
        <div className="lg:hidden fixed inset-0 w-full h-[100dvh] bg-black z-[200] flex flex-col justify-between overflow-hidden">
          {/* Top-Right "Into Mark" Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-50 w-10 h-10 rounded-full bg-stone-900/85 hover:bg-black active:scale-95 text-white flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-md cursor-pointer transition-transform"
            aria-label="Close preview"
          >
            <X className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>

          {/* Floating Left Navigation Button */}
          {prevTemplate && (
            <button
              onClick={() => onSelectForCreation(prevTemplate, true)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
              aria-label="Previous template"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Right Navigation Button */}
          {nextTemplate && (
            <button
              onClick={() => onSelectForCreation(nextTemplate, true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
              aria-label="Next template"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main Full-Page Screen (Internal Mobile Screen) */}
          <div className="relative flex-1 w-full h-full overflow-hidden bg-black flex flex-col items-center justify-center">
            {/* Visual Underlay Image */}
            <div className="absolute inset-0 z-0 bg-stone-950 overflow-hidden flex flex-col items-center justify-center">
              {template.isUnrevealed || (!template.phoneImage && !template.image) ? (
                <div className="w-full h-full bg-gradient-to-b from-stone-900 via-stone-950 to-[#2A1412] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <span className="text-sm font-bold text-amber-300 tracking-wider uppercase block">
                    Sneak Peek
                  </span>
                  <span className="text-xs text-stone-400 font-medium mt-1">
                    Closed Box · On Hold
                  </span>
                </div>
              ) : (
                <img
                  src={template.phoneImage || template.image}
                  alt={template.clientTitle || template.name}
                  className="w-full h-full object-cover object-top"
                />
              )}
            </div>

            {/* Template On-Hold or Live Interactive Website */}
            {!template.hasLivePreview || !template.previewUrl ? (
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none">
                <div className="self-center mt-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#F5CD51] text-stone-950 font-bold text-xs tracking-wide shadow-lg">
                    {template.isUnrevealed ? '🔒 On Hold · Sneak Peek' : 'Demo Link Coming Soon'}
                  </span>
                </div>
                <div className="text-center text-white pb-6 px-2">
                  <p className="text-sm font-bold text-stone-100 drop-shadow-md">
                    {template.clientTitle || template.name}
                  </p>
                  <p className="text-xs text-stone-300 mt-1 drop-shadow-sm">
                    {template.isUnrevealed
                      ? 'This template is currently in our design workshop. Stay tuned for the grand reveal!'
                      : 'Order to customize with our design team.'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Centered Rotating Loading Symbol */}
                {isLoadingIframe && (
                  <div className="absolute inset-0 z-30 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white pointer-events-none">
                    <div className="w-10 h-10 rounded-full border-[3px] border-amber-400/30 border-t-amber-400 animate-spin" />
                    <span className="text-xs font-medium text-stone-200 tracking-wide">
                      Loading preview...
                    </span>
                  </div>
                )}

                {/* Full-bleed Screen Display with Perfect Alignment */}
                <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
                  <iframe
                    key={template.id}
                    src={liveUrl}
                    title={`${template.clientTitle || template.name} Live Interactive Invitation`}
                    onLoad={() => setIsLoadingIframe(false)}
                    className={`w-full h-full border-0 select-auto block transition-opacity duration-300 no-scrollbar ${
                      isLoadingIframe ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      width: '100%',
                      height: '100%',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      WebkitOverflowScrolling: 'touch',
                      backgroundColor: 'transparent',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    loading="eager"
                    allow="autoplay; fullscreen"
                  />
                </div>
              </>
            )}
          </div>

          {/* Bottom Full-Width WhatsApp CTA Button Dock */}
          <div className="w-full bg-stone-950/95 backdrop-blur-lg border-t border-white/10 p-3 pb-safe z-40 flex flex-col gap-1.5 flex-shrink-0">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Order This Invitation — {template.price}</span>
              <ArrowRight className="w-4 h-4 text-white ml-1" />
            </a>

            <div className="flex items-center justify-between px-1 text-[11px] text-stone-400">
              <span className="font-medium text-stone-300">{template.clientTitle || template.name}</span>
              {template.hasLivePreview !== false && template.previewUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline font-semibold"
                >
                  <span>Open Full Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DESKTOP/LAPTOP VIEW (lg:flex): 2-Column Specs + Phone Chassis Modal   */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex min-h-screen items-center justify-center p-6">
          {/* Backdrop click to dismiss */}
          <div className="fixed inset-0" onClick={onClose} />

          {/* Modal Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-white rounded-[36px] shadow-2xl overflow-hidden z-10 border border-stone-200/90 flex flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md border border-stone-200 transition-all cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT SECTION (DESKTOP): Specs, Pricing & Features */}
            <div className="w-5/12 p-8 flex flex-col justify-between overflow-y-auto bg-white border-r border-stone-200/90">
              <div>
                {/* Category & Price Header */}
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                    style={{ backgroundColor: template.themeLight, color: template.textColor }}
                  >
                    {template.categoryName || 'Wedding Website'}
                  </span>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#351410]">{template.price}</span>
                    <span className="text-xs text-stone-400 line-through">{template.originalPrice}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-3xl font-bold text-stone-900 tracking-tight leading-tight">
                  {template.clientTitle || template.name}
                </h3>
                <p className="text-sm font-semibold text-stone-500 mt-1">
                  {template.subtitle}
                </p>
                {template.venue && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold mt-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{template.venue}</span>
                  </div>
                )}

                {/* Description */}
                <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                  {template.description}
                </p>

                {/* Included Interactive Features */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                    Included Features:
                  </h4>
                  <div className="space-y-2">
                    {template.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-stone-800">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold text-[11px]">
                          ✓
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Speed Note */}
                <div className="mt-6 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Express Delivery Guaranteed</span>
                    <span>Personalized with your photos, date, and venue in 24–48 hours. Includes 2 rounds of free edits.</span>
                  </div>
                </div>
              </div>

              {/* Desktop WhatsApp CTA Button */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-2.5">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-[#351410] hover:bg-[#230C0A] active:scale-98 text-white font-bold text-base shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <span>Order This Invitation</span>
                  <ArrowRight className="w-4.5 h-4.5 text-amber-300" />
                </a>

                <p className="text-[11px] text-stone-400 text-center">
                  Instant WhatsApp enquiry with pre-filled details for {templateName}
                </p>
              </div>
            </div>

            {/* RIGHT SECTION (DESKTOP): Stationary Smartphone Mockup */}
            <div className="w-7/12 bg-gradient-to-b from-stone-900 via-stone-950 to-black p-8 flex flex-col items-center justify-center relative overflow-hidden select-none min-h-[640px]">
              {/* Ambient Background Glow */}
              <div 
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -top-10"
                style={{ backgroundColor: template.themeColor || '#F5CD51' }}
              />

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-4 flex items-center z-30 pointer-events-auto">
                {prevTemplate && (
                  <button
                    onClick={() => onSelectForCreation(prevTemplate, true)}
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/15"
                    title={`Previous: ${prevTemplate.clientTitle || prevTemplate.name}`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center z-30 pointer-events-auto">
                {nextTemplate && (
                  <button
                    onClick={() => onSelectForCreation(nextTemplate, true)}
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/15"
                    title={`Next: ${nextTemplate.clientTitle || nextTemplate.name}`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* REALISTIC STATIONARY SMARTPHONE CHASSIS */}
              <div className="relative w-[350px] xl:w-[375px] aspect-[9/19] max-h-[78vh] rounded-[52px] p-3 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] border-[3.5px] border-stone-600/90 ring-1 ring-white/15 flex flex-col items-center flex-shrink-0">
                {/* Outer Hardware Buttons */}
                <div className="absolute -left-[5px] top-20 w-[2.5px] h-8 bg-stone-600 rounded-l-xs" />
                <div className="absolute -left-[5px] top-32 w-[2.5px] h-8 bg-stone-600 rounded-l-xs" />
                <div className="absolute -right-[5px] top-24 w-[2.5px] h-10 bg-stone-600 rounded-r-xs" />

                {/* Dynamic Island Pill */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-xs border border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-950/80" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                </div>

                {/* Inner Screen Display (Overflow Hidden clips scrollbars completely) */}
                <div 
                  className="relative w-full h-full rounded-[42px] overflow-hidden bg-black shadow-inner flex flex-col"
                  style={{ overscrollBehavior: 'contain' }}
                >
                  {/* Underlay Image */}
                  <div className="absolute inset-0 z-0 bg-stone-950 overflow-hidden flex flex-col items-center justify-center">
                    {template.isUnrevealed || (!template.phoneImage && !template.image) ? (
                      <div className="w-full h-full bg-gradient-to-b from-stone-900 via-stone-950 to-[#2A1412] flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
                          <span className="text-2xl">🔒</span>
                        </div>
                        <span className="text-sm font-bold text-amber-300 tracking-wider uppercase block">
                          Sneak Peek
                        </span>
                        <span className="text-xs text-stone-400 font-medium mt-1">
                          Closed Box · On Hold
                        </span>
                      </div>
                    ) : (
                      <img
                        src={template.phoneImage || template.image}
                        alt={template.clientTitle || template.name}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </div>

                  {!template.hasLivePreview || !template.previewUrl ? (
                    <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none">
                      <div className="self-center mt-6">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#F5CD51] text-stone-950 font-bold text-xs tracking-wide shadow-lg">
                          {template.isUnrevealed ? '🔒 On Hold · Sneak Peek' : 'Demo Link Coming Soon'}
                        </span>
                      </div>
                      <div className="text-center text-white pb-6 px-2">
                        <p className="text-sm font-bold text-stone-100 drop-shadow-md">
                          {template.clientTitle || template.name}
                        </p>
                        <p className="text-xs text-stone-300 mt-1 drop-shadow-sm">
                          {template.isUnrevealed
                            ? 'This template is currently in our design workshop. Stay tuned for the grand reveal!'
                            : 'Order to customize with our design team.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Centered Rotating Loading Symbol */}
                      {isLoadingIframe && (
                        <div className="absolute inset-0 z-30 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white pointer-events-none">
                          <div className="w-10 h-10 rounded-full border-[3px] border-amber-400/30 border-t-amber-400 animate-spin" />
                          <span className="text-xs font-medium text-stone-200 tracking-wide">
                            Loading preview...
                          </span>
                        </div>
                      )}

                      {/* Full-bleed Screen Display with Perfect Center Alignment */}
                      <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
                        <iframe
                          key={template.id}
                          src={liveUrl}
                          title={`${template.clientTitle || template.name} Live Interactive Invitation`}
                          onLoad={() => setIsLoadingIframe(false)}
                          className={`w-full h-full border-0 select-auto block transition-opacity duration-300 no-scrollbar ${
                            isLoadingIframe ? 'opacity-0' : 'opacity-100'
                          }`}
                          style={{
                            width: '100%',
                            height: '100%',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                            backgroundColor: 'transparent',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          }}
                          loading="eager"
                          allow="autoplay; fullscreen"
                        />
                      </div>

                      {/* Floating Scroll Indicator Badge inside screen */}
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500">
                        <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg select-none">
                          <span className="text-[#F5CD51] text-xs animate-bounce font-bold leading-none">↕</span>
                          <span className="tracking-wide">Scrollable</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Subtle Home Indicator Bar */}
                <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />
              </div>

              {/* Desktop Guidance Tag */}
              <div className="mt-3.5 items-center gap-2 text-xs text-stone-300 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-sm flex">
                <span className="text-amber-300 text-sm font-bold animate-pulse">↕</span>
                <span className="font-medium">
                  Scroll inside screen to view details
                </span>
                {template.hasLivePreview !== false && template.previewUrl && (
                  <>
                    <span className="text-stone-500">•</span>
                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold underline decoration-amber-400/50 transition-colors"
                    >
                      <span>Full screen</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
