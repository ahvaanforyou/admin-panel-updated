import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Heart, MapPin, Music } from 'lucide-react';

export default function Hero({ onExploreClick, onCreateClick, onPreviewQuick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-[#FAF8F6] via-white to-[#FAF8F6]">
      {/* Decorative Warm Ambient Glows (Pinterest / Ramos style kinetic cards & gradients) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#FFC655]/15 via-[#F7526C]/10 to-[#0776C6]/10 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#4E1D1D]/5 blur-2xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-border/80 shadow-soft-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                For Every Special Moment
              </span>
              <span className="text-surface-subtle text-xs">•</span>
              <span className="text-xs text-surface-muted font-medium">
                Weddings • Showers • Birthdays
              </span>
            </div>

            {/* Main Editorial H1 with After Effects Style Stroke Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-surface-text leading-[1.12]">
              Digital invitations,
              <br />
              <span className="inline-block relative mt-1">
                made{' '}
                <span className="font-handwriting font-normal text-brand-primary italic tracking-normal relative px-1 inline-block">
                  unforgettable
                  
                  {/* SVG Hand-Drawn Stroke Animation (After Effects Style Underline Draw) */}
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-4 overflow-visible"
                    viewBox="0 0 300 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M 5 15 Q 80 4 150 14 T 295 12"
                      stroke="#FFC655"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        duration: 1.4, 
                        delay: 0.4, 
                        ease: [0.65, 0, 0.35, 1] 
                      }}
                    />
                    <motion.path
                      d="M 25 19 Q 120 10 270 17"
                      stroke="#4E1D1D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ 
                        duration: 1.2, 
                        delay: 0.8, 
                        ease: [0.65, 0, 0.35, 1] 
                      }}
                    />
                  </motion.svg>
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-surface-muted max-w-xl leading-relaxed">
              Elevate your celebration with interactive digital invitations. Featuring live Google Maps, one-tap RSVP attendance, background music, and seamless WhatsApp sharing for modern Indian families.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onCreateClick}
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-soft-lg hover:shadow-soft-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4 h-4 text-theme-wedding transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-white hover:bg-brand-soft border border-brand-border text-surface-text font-semibold text-sm px-7 py-3.5 rounded-full shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore 12+ Templates</span>
                <Sparkles className="w-4 h-4 text-brand-primary" />
              </button>
            </div>

            {/* Social Proof & Trust Metric Micro-Bar */}
            <div className="mt-10 pt-8 border-t border-brand-border/60 flex flex-wrap items-center gap-8 text-xs text-surface-muted">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-theme-wedding border-2 border-white flex items-center justify-center font-bold text-[10px] text-brand-primary">S</div>
                  <div className="w-7 h-7 rounded-full bg-theme-baby border-2 border-white flex items-center justify-center font-bold text-[10px] text-white">R</div>
                  <div className="w-7 h-7 rounded-full bg-theme-birthday border-2 border-white flex items-center justify-center font-bold text-[10px] text-white">A</div>
                  <div className="w-7 h-7 rounded-full bg-theme-house border-2 border-white flex items-center justify-center font-bold text-[10px] text-white">K</div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-surface-text">500+ Celebrations</span>
                  <span className="text-[11px] text-surface-subtle">Loved across India & NRI families</span>
                </div>
              </div>

              <div className="h-6 w-px bg-brand-border hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="flex text-amber-500">★★★★★</span>
                <span className="font-semibold text-surface-text">4.9 / 5.0 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pinterest/Ramos-Style Interactive Device Reveal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Phone Mockup Frame */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[42px] p-3 bg-gradient-to-b from-stone-800 to-stone-900 shadow-2xl border-4 border-stone-700/60 transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1F1F1F] mr-3" />
                <div className="w-2 h-2 rounded-full bg-blue-900/40" />
              </div>

              {/* Screen Content Window */}
              <div className="relative w-full aspect-[9/18.5] rounded-[34px] overflow-hidden bg-white shadow-inner flex flex-col">
                <img
                  src="/images/templates/wedding-sangeet.jpg"
                  alt="Ahvaan Royal Wedding Invitation Mockup"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Glass Floating Quick Preview Button on Screen */}
                <div className="absolute bottom-4 inset-x-4">
                  <button
                    onClick={() => onPreviewQuick('tpl-wed-01')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/90 backdrop-blur-md shadow-soft-md border border-white/40 text-brand-primary text-xs font-bold flex items-center justify-center gap-2 hover:bg-white transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                    <span>Tap to Preview Interactive View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Kinetic Pill 1: Live RSVP Alert */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -left-4 sm:-left-8 top-16 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-soft-lg border border-brand-border/80 flex items-center gap-3 z-20 max-w-[210px]"
            >
              <div className="w-9 h-9 rounded-xl bg-theme-wedding-light flex items-center justify-center text-amber-700 flex-shrink-0">
                <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-surface-text">RSVP Confirmed!</span>
                <span className="text-[10px] text-surface-muted leading-tight">Rohit & family attending (4 guests)</span>
              </div>
            </motion.div>

            {/* Floating Kinetic Pill 2: Venue Google Maps Pin */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -right-4 sm:-right-8 bottom-24 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-soft-lg border border-brand-border/80 flex items-center gap-3 z-20 max-w-[200px]"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-surface-text">Turn-by-turn Maps</span>
                <span className="text-[10px] text-surface-muted leading-tight">1-click navigation to venue</span>
              </div>
            </motion.div>

            {/* Floating Kinetic Pill 3: Audio Track */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute bottom-2 left-6 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-soft-md border border-brand-border flex items-center gap-2 z-20"
            >
              <Music className="w-3.5 h-3.5 text-brand-primary animate-bounce" />
              <span className="text-[10px] font-semibold text-brand-primary">Playing: Kesariya (Acoustic)</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
