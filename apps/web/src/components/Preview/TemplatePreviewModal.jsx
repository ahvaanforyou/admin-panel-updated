import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  MapPin, 
  Music, 
  Send, 
  CheckCircle2, 
  Share2, 
  ArrowRight 
} from 'lucide-react';
import { TEMPLATES } from '../../data/content';

export default function TemplatePreviewModal({ 
  template, 
  onClose, 
  onSelectForCreation 
}) {
  if (!template) return null;

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [rsvpStep, setRsvpStep] = useState('idle'); // idle | form | submitted
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [activeTab, setActiveTab] = useState('preview'); // preview | details

  // Find index for next/prev navigation
  const currentIndex = TEMPLATES.findIndex(t => t.id === template.id);
  const prevTemplate = currentIndex > 0 ? TEMPLATES[currentIndex - 1] : null;
  const nextTemplate = currentIndex < TEMPLATES.length - 1 ? TEMPLATES[currentIndex + 1] : null;

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setRsvpStep('submitted');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-brand-border/60 flex flex-col lg:flex-row max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button for Mobile & Desktop */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-surface-text flex items-center justify-center shadow-soft-sm border border-brand-border transition-all"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT: Realistic Phone Mockup Simulator */}
          <div className="lg:w-7/12 bg-gradient-to-b from-[#241E1E] to-[#120F0F] p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden select-none">
            
            {/* Ambient Background Glow matching category theme */}
            <div 
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none -top-10"
              style={{ backgroundColor: template.themeColor }}
            />

            {/* Navigation Arrows for Previous / Next */}
            <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center z-20">
              {prevTemplate && (
                <button
                  onClick={() => onSelectForCreation(prevTemplate, true)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md flex items-center justify-center transition-all"
                  title={`Previous: ${prevTemplate.name}`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center z-20">
              {nextTemplate && (
                <button
                  onClick={() => onSelectForCreation(nextTemplate, true)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md flex items-center justify-center transition-all"
                  title={`Next: ${nextTemplate.name}`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Simulated iPhone Device Frame */}
            <div className="relative w-[280px] sm:w-[310px] rounded-[44px] p-3 bg-gradient-to-b from-stone-800 to-stone-950 shadow-2xl border-4 border-stone-700/80">
              
              {/* Dynamic Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-900 mr-2" />
                <div className="w-2 h-2 rounded-full bg-blue-900/40" />
              </div>

              {/* Scrollable Screen Content */}
              <div className="relative w-full aspect-[9/18.5] rounded-[36px] overflow-hidden bg-white shadow-inner flex flex-col overflow-y-auto scrollbar-none">
                
                {/* Visual Invitation Graphic */}
                <div className="relative w-full">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-auto object-contain"
                  />

                  {/* Audio Floating Pill */}
                  <div className="absolute top-8 right-3 z-20">
                    <button
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/20 shadow-md"
                    >
                      <Music className={`w-3 h-3 ${isPlayingMusic ? 'text-theme-wedding animate-spin' : 'text-white'}`} />
                      <span>{isPlayingMusic ? 'Mute' : 'Play Music'}</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Interactive Mobile Actions Bar */}
                <div className="p-4 bg-white space-y-3 border-t border-stone-100">
                  <div className="text-center">
                    <span 
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: template.themeLight, color: template.textColor }}
                    >
                      Interactive Invitation Demo
                    </span>
                    <h4 className="text-xs font-bold text-surface-text mt-1">{template.subtitle}</h4>
                  </div>

                  {/* Simulated 1-Tap Google Maps Link */}
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Venue Location (Google Maps)</span>
                  </a>

                  {/* Simulated RSVP Accordion / Flow */}
                  <div className="bg-brand-soft rounded-xl p-3 border border-brand-border/60">
                    {rsvpStep === 'submitted' ? (
                      <div className="text-center py-2 text-emerald-700">
                        <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                        <span className="text-[11px] font-bold block">RSVP Received!</span>
                        <span className="text-[10px] text-surface-muted">Host received notification via WhatsApp.</span>
                        <button 
                          onClick={() => setRsvpStep('idle')}
                          className="mt-2 text-[10px] text-brand-primary underline"
                        >
                          Submit another RSVP
                        </button>
                      </div>
                    ) : rsvpStep === 'form' ? (
                      <form onSubmit={handleRsvpSubmit} className="space-y-2">
                        <div className="text-[10px] font-bold text-brand-primary uppercase">Will You Attend?</div>
                        <input
                          type="text"
                          placeholder="Your Full Name"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-brand-border bg-white"
                          required
                        />
                        <div className="flex gap-2">
                          <select
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="px-2 py-1.5 text-xs rounded-lg border border-brand-border bg-white text-surface-text"
                          >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="4">Family (4)</option>
                          </select>
                          <button
                            type="submit"
                            className="flex-1 py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg"
                          >
                            Confirm Attendance
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setRsvpStep('form')}
                        className="w-full py-2 bg-brand-primary text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-soft-sm"
                      >
                        <Heart className="w-3.5 h-3.5 text-theme-wedding fill-theme-wedding" />
                        <span>Tap to RSVP Online</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </div>

            <p className="text-[11px] text-stone-400 mt-4 text-center">
              * Live invitation works in any mobile browser with 60 FPS smooth animations
            </p>
          </div>

          {/* RIGHT: Template Details, Specs & Conversion Action */}
          <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
            <div>
              {/* Category & Price Header */}
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                  style={{ backgroundColor: template.themeLight, color: template.textColor }}
                >
                  {template.categoryName}
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-primary">{template.price}</span>
                  <span className="text-xs text-surface-subtle line-through">{template.originalPrice}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-surface-text tracking-tight">
                {template.name}
              </h3>
              <p className="text-sm font-medium text-surface-muted mt-1">
                {template.subtitle}
              </p>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-surface-muted leading-relaxed">
                {template.description}
              </p>

              {/* Included Interactive Features */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-surface-subtle mb-3">
                  Included In This Template:
                </h4>
                <div className="space-y-2">
                  {template.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-surface-text">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Speed Note */}
              <div className="mt-6 p-3.5 rounded-2xl bg-brand-soft border border-brand-border/80 text-xs text-surface-muted flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-theme-wedding flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-surface-text block">Express Delivery Guaranteed</span>
                  <span>Personalized & delivered with your details in 24–48 hours. Includes 2 rounds of free edits.</span>
                </div>
              </div>
            </div>

            {/* Bottom Conversion CTAs */}
            <div className="mt-8 pt-6 border-t border-brand-border/60 flex flex-col gap-3">
              <button
                onClick={() => onSelectForCreation(template, false)}
                className="w-full py-3.5 px-6 rounded-full bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-soft-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
              >
                <span>Customize & Order This Invitation</span>
                <ArrowRight className="w-4 h-4 text-theme-wedding" />
              </button>

              <a
                href={`https://wa.me/918985966940?text=Hi%20Ahvaan%20Team!%20I%20loved%20the%20${encodeURIComponent(template.name)}%20(${encodeURIComponent(template.categoryName)})%20template.%20I%20would%20like%20to%20customize%20it%20for%20my%20event.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Chat on WhatsApp Directly (+91 89859 66940)</span>
              </a>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
