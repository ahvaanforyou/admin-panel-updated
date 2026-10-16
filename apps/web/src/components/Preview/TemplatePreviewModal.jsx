import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { TEMPLATES } from '../../data/content';

export default function TemplatePreviewModal({ 
  template, 
  onClose, 
  onSelectForCreation 
}) {
  if (!template) return null;

  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  // Re-trigger loading whenever template changes
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
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Floating Top Bar: Template Title & Close Button */}
        <div className="fixed top-3 sm:top-5 inset-x-0 max-w-xl mx-auto px-4 z-50 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto bg-stone-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              {template.clientTitle || template.name}
            </span>
            <span className="text-xs font-black text-amber-300">
              {template.price}
            </span>
          </div>

          <button
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-800 text-white flex items-center justify-center border border-white/15 shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prev / Next Floating Navigation Arrows */}
        {prevTemplate && (
          <div className="fixed inset-y-0 left-2 sm:left-6 flex items-center z-40 pointer-events-auto">
            <button
              onClick={() => onSelectForCreation(prevTemplate, true)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer border border-white/15 hover:border-white/30"
              title={`Previous: ${prevTemplate.clientTitle || prevTemplate.name}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        )}

        {nextTemplate && (
          <div className="fixed inset-y-0 right-2 sm:right-6 flex items-center z-40 pointer-events-auto">
            <button
              onClick={() => onSelectForCreation(nextTemplate, true)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer border border-white/15 hover:border-white/30"
              title={`Next: ${nextTemplate.clientTitle || nextTemplate.name}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Centered Mobile Phone Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 flex flex-col items-center justify-center my-auto pt-14 pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glow */}
          <div 
            className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-25 pointer-events-none -top-10"
            style={{ backgroundColor: template.themeColor || '#F5CD51' }}
          />

          {/* ========================================================================= */}
          {/* REALISTIC STATIONARY SMARTPHONE CHASSIS: STANDARD 390 × 810 DIMENSIONS    */}
          {/* ========================================================================= */}
          <div className="relative w-[340px] min-[390px]:w-[370px] sm:w-[390px] h-[700px] min-[390px]:h-[760px] sm:h-[810px] max-h-[82vh] rounded-[52px] p-2.5 sm:p-3 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] border-[4px] border-stone-600/90 ring-1 ring-white/20 flex flex-col items-center">
            
            {/* Outer Hardware Buttons */}
            <div className="absolute -left-[6px] top-28 w-[3px] h-10 bg-stone-600 rounded-l-sm" />
            <div className="absolute -left-[6px] top-42 w-[3px] h-10 bg-stone-600 rounded-l-sm" />
            <div className="absolute -right-[6px] top-32 w-[3px] h-14 bg-stone-600 rounded-r-sm" />

            {/* Dynamic Island / Speaker Pill */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-xs border border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-950/80" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            </div>

            {/* Inner Screen Display (Fixed 390x810 viewport, scrollable inside) */}
            <div 
              className="relative w-full h-full rounded-[42px] overflow-hidden bg-black shadow-inner flex flex-col"
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* High-Res Visual Artwork Underlay (Zero blank delay) */}
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

              {/* Case 1: Template on hold (Sneak peek) */}
              {!template.hasLivePreview || !template.previewUrl ? (
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none">
                  <div className="self-center mt-6">
                    <span className="px-4 py-1.5 rounded-full bg-[#F5CD51] text-stone-950 font-bold text-xs tracking-wide shadow-lg">
                      {template.isUnrevealed ? '🔒 On Hold · Sneak Peek' : 'Demo Link Coming Soon'}
                    </span>
                  </div>

                  <div className="text-center text-white pb-8 px-3">
                    <p className="text-sm font-bold text-stone-100 drop-shadow-md">
                      {template.clientTitle || template.name}
                    </p>
                    <p className="text-xs text-stone-300 mt-1.5 leading-relaxed drop-shadow-sm">
                      {template.isUnrevealed
                        ? 'This template is currently in our design workshop. Stay tuned for the grand reveal!'
                        : 'Tap below to order and customize with our design team.'}
                    </p>
                  </div>
                </div>
              ) : (
                /* Case 2: Live interactive website with NO scrollbars */
                <>
                  {/* Top loading indicator */}
                  {isLoadingIframe && (
                    <div className="absolute top-0 inset-x-0 z-20 bg-black/60 backdrop-blur-xs py-2 px-3 flex items-center justify-center gap-2 text-white">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" />
                      <span className="text-[11px] font-medium text-stone-200">
                        Connecting interactive invitation...
                      </span>
                    </div>
                  )}

                  {/* Scrollbar-Clipping Container */}
                  <div className="relative z-10 w-full h-full overflow-hidden">
                    <div 
                      className="h-full overflow-hidden"
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
                        className={`w-full h-full border-0 select-auto block bg-white transition-opacity duration-300 ${
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
                    <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-2 shadow-lg select-none">
                      <span className="text-[#F5CD51] text-xs animate-bounce font-bold leading-none">↕</span>
                      <span className="tracking-wide">Scrollable</span>
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Subtle Home Indicator Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />

          </div>

          {/* ========================================================================= */}
          {/* PRIMARY WHATSAPP CTA DOCKED DIRECTLY UNDER THE PHONE SCREEN               */}
          {/* ========================================================================= */}
          <div className="w-[340px] min-[390px]:w-[370px] sm:w-[390px] mt-4 flex flex-col items-center gap-2">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] active:scale-98 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white" />
              <span>Order This Invitation — {template.price}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <div className="flex items-center justify-between w-full px-2 text-[11px] text-stone-400">
              <span>Scroll inside screen to view details</span>
              {template.hasLivePreview !== false && template.previewUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline font-semibold transition-colors"
                >
                  <span>Full screen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
