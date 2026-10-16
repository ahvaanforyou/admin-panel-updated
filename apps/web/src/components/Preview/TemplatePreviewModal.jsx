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
  Smartphone
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
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-5 lg:p-6 select-none animate-in fade-in duration-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 border border-stone-200/90 flex flex-col lg:flex-row max-h-[92vh] sm:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md border border-stone-200 transition-all cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ========================================================================= */}
          {/* LEFT SECTION: About Template, Pricing, Features & Single Primary CTA       */}
          {/* ========================================================================= */}
          <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white border-b lg:border-b-0 lg:border-r border-stone-200/90 order-2 lg:order-1">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
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
              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
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

            {/* ========================================================================= */}
            {/* ONE PROMINENT PRIMARY CTA: Order This Invitation via WhatsApp             */}
            {/* ========================================================================= */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-2.5">
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#351410] hover:bg-[#230C0A] active:scale-98 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>Order This Invitation</span>
                <ArrowRight className="w-4.5 h-4.5 text-amber-300" />
              </a>

              <p className="text-[11px] text-stone-400 text-center">
                Instant WhatsApp enquiry with pre-filled details for {templateName}
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SECTION: Realistic Smartphone Mockup with Real Interactive Website  */}
          {/* ========================================================================= */}
          <div className="lg:w-7/12 bg-gradient-to-b from-stone-900 via-stone-950 to-black p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center relative overflow-hidden select-none order-1 lg:order-2 min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]">
            
            {/* Ambient Background Glow matching category theme */}
            <div 
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -top-10"
              style={{ backgroundColor: template.themeColor }}
            />

            {/* Navigation Arrows for Previous / Next Template */}
            <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center z-30 pointer-events-auto">
              {prevTemplate && (
                <button
                  onClick={() => onSelectForCreation(prevTemplate, true)}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/10"
                  title={`Previous: ${prevTemplate.clientTitle || prevTemplate.name}`}
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center z-30 pointer-events-auto">
              {nextTemplate && (
                <button
                  onClick={() => onSelectForCreation(nextTemplate, true)}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/10"
                  title={`Next: ${nextTemplate.clientTitle || nextTemplate.name}`}
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            {/* ========================================================================= */}
            {/* REALISTIC STATIONARY SMARTPHONE CHASSIS                                   */}
            {/* ========================================================================= */}
            <div className="relative w-[250px] min-[360px]:w-[280px] min-[400px]:w-[310px] sm:w-[335px] lg:w-[350px] aspect-[9/18.8] max-h-[74vh] sm:max-h-[76vh] rounded-[48px] p-2.5 sm:p-3 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[3.5px] border-stone-600/90 ring-1 ring-white/15 flex flex-col items-center cursor-scrollable">
              
              {/* Outer Button Accents (Volume Buttons Left, Power Button Right) */}
              <div className="absolute -left-[6px] top-24 w-[3px] h-9 bg-stone-600 rounded-l-sm" />
              <div className="absolute -left-[6px] top-36 w-[3px] h-9 bg-stone-600 rounded-l-sm" />
              <div className="absolute -right-[6px] top-28 w-[3px] h-12 bg-stone-600 rounded-r-sm" />

              {/* Dynamic Island / Speaker Pill at Top (Stationary, overlaying screen) */}
              <div className="absolute top-4 sm:top-4.5 left-1/2 -translate-x-1/2 w-20 min-[380px]:w-24 sm:w-26 h-3.5 min-[380px]:h-4 sm:h-4.5 bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-xs border border-white/5">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-950/80" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
              </div>

              {/* Inner Screen Display (Fixed viewport, scrollable invitation inside) */}
              <div 
                className="relative w-full h-full rounded-[38px] overflow-hidden bg-black shadow-inner flex flex-col cursor-scrollable"
                style={{ overscrollBehavior: 'contain' }}
              >
                {/* Instant High-Res Visual Artwork Underlay (Renders in 0ms so user never waits on blank void) */}
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

                {/* Case 1: Template has no active live demo yet (Cards 5 & 6) */}
                {!template.hasLivePreview || !template.previewUrl ? (
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none">
                    <div className="self-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-lg">
                        {template.isUnrevealed ? '🔒 On Hold · Sneak Peek' : 'Demo Link Coming Soon'}
                      </span>
                    </div>

                    <div className="text-center text-white pb-6 px-2">
                      <p className="text-xs font-semibold text-stone-200 drop-shadow-md">
                        {template.clientTitle || template.name}
                      </p>
                      <p className="text-[11px] text-stone-300 mt-1 drop-shadow-sm">
                        {template.isUnrevealed
                          ? 'This template is currently in our design workshop. Stay tuned for the grand reveal!'
                          : 'Tap "Order This Invitation" to customize with our design team.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Case 2: Live interactive website with instant preloaded feel and NO scrollbar */
                  <>
                    {/* Sleek top loading indicator bar while live iframe connects */}
                    {isLoadingIframe && (
                      <div className="absolute top-0 inset-x-0 z-20 bg-black/60 backdrop-blur-xs py-2 px-3 flex items-center justify-center gap-2 text-white">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" />
                        <span className="text-[11px] font-medium text-stone-200">
                          Connecting interactive invitation...
                        </span>
                      </div>
                    )}

                    {/* Scrollbar-Clipping Container: Pushes native desktop scrollbars 24px off-screen */}
                    <div className="relative z-10 w-full h-full overflow-hidden cursor-scrollable">
                      <div 
                        className="h-full overflow-hidden cursor-scrollable"
                        style={{
                          width: 'calc(100% + 24px)',
                          marginRight: '-24px',
                        }}
                      >
                        <iframe
                          key={template.id}
                          src={liveUrl}
                          title={`${template.clientTitle || template.name} Live Interactive Invitation`}
                          onLoad={() => setIsLoadingIframe(false)}
                          className={`w-full h-full border-0 select-auto block bg-white transition-opacity duration-300 cursor-scrollable ${
                            isLoadingIframe ? 'opacity-0' : 'opacity-100'
                          }`}
                          style={{
                            width: '100%',
                            height: '100%',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          }}
                          loading="eager"
                          allow="autoplay; fullscreen"
                        />
                      </div>
                    </div>

                    {/* Floating Scroll Indicator Badge inside screen */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500">
                      <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg select-none">
                        <span className="text-amber-300 text-xs animate-bounce font-bold leading-none">↕</span>
                        <span className="tracking-wide">Scrollable</span>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Subtle Home Indicator Bar at Screen Bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />

            </div>

            {/* User Interaction Guidance Tag */}
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs text-stone-300 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm">
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
    </AnimatePresence>
  );
}
