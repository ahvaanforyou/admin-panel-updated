import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Hero({ onCreateClick }) {
  const containerRef = useRef(null);

  // Scroll driven fade-out for the left section as user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const leftTranslateY = useTransform(scrollYProgress, [0, 0.45], [0, -30]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-6 sm:pb-8"
    >
      {/* 
        Full viewport width container with safe margins:
        - pl-6 sm:pl-10 lg:pl-14 xl:pl-16 guarantees left headline & button NEVER clip on any resolution
        - pr-0 allows the right shape grid to reach the right border 
      */}
      <div className="w-full pl-6 sm:pl-10 lg:pl-14 xl:pl-16 pr-4 sm:pr-8 lg:pr-10 xl:pr-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center w-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Animated Stroke Text                  */}
          {/* ========================================================================= */}
          <motion.div 
            style={{ 
              opacity: leftOpacity, 
              y: leftTranslateY,
            }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-start justify-center z-10 select-none py-2"
          >
            
            {/* Top Swirl Flourish Line */}
            <div className="w-full max-w-[420px] sm:max-w-[460px] mb-3 sm:mb-4 overflow-visible">
              <svg 
                viewBox="0 0 450 140" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible"
              >
                <motion.path
                  d="M 10 95 C 60 40, 120 20, 180 50 C 230 75, 230 15, 200 15 C 160 15, 170 85, 230 85 C 310 85, 370 20, 440 95"
                  stroke="#4E1D1D"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </div>

            {/* Headline Section */}
            <div className="space-y-1 sm:space-y-2 w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-5xl xl:text-[4.4rem] font-bold tracking-tight text-[#1F1F1F] leading-[1.08]"
              >
                Digital invitations,
              </motion.h1>

              {/* Line with 'made' and 'unforgettable' directly beside it */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3.5">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-5xl xl:text-[4.4rem] font-bold tracking-tight text-[#1F1F1F] leading-none"
                >
                  made
                </motion.span>

                {/* 'unforgettable' in cursive with smooth fluid stroke reveal */}
                <div className="relative inline-block overflow-hidden align-baseline">
                  <div className="relative w-[230px] sm:w-[310px] lg:w-[360px] xl:w-[410px] h-[52px] sm:h-[70px] lg:h-[80px] xl:h-[92px]">
                    
                    {/* Golden Underglow Line Draw */}
                    <svg 
                      className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" 
                      viewBox="0 0 450 100" 
                      fill="none"
                    >
                      <motion.path
                        d="M 12 70 Q 120 40 230 65 T 440 55"
                        stroke="#FFC655"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1.2, delay: 0.35, ease: "easeInOut" }}
                      />
                    </svg>

                    {/* Smooth masked fluid write-on for exact cursive text */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.3, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute inset-y-0 left-0 overflow-hidden"
                    >
                      <img
                        src="/images/unforgettable-exact.png"
                        alt="unforgettable"
                        className="w-[230px] sm:w-[310px] lg:w-[360px] xl:w-[410px] h-full object-contain object-left pointer-events-none"
                      />
                    </motion.div>

                  </div>
                </div>
              </div>
            </div>

            {/* Pill CTA button & Subtext layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 xl:gap-7 w-full"
            >
              <button
                onClick={onCreateClick}
                className="bg-[#4E1D1D] hover:bg-[#381313] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 group flex-shrink-0"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <p className="text-xs sm:text-sm text-stone-600 max-w-[270px] leading-relaxed font-normal">
                Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.
              </p>
            </motion.div>

          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Exact 3×3 Grid Fitting Viewport with Depth Shadows & Crops  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-end items-center w-full">
            {/* 
              Responsive 3x3 Matrix clamped to viewport height:
              max-w-[calc(100vh-8.5rem)] ensures shapes NEVER bleed off the bottom of the screen!
            */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4.5 xl:gap-5 w-full max-w-[620px] lg:max-w-[660px] xl:max-w-[720px] 2xl:max-w-[780px] max-h-[calc(100vh-8rem)] aspect-[1/1] select-none p-1 relative">
              
              {/* Star Accent placed at intersection of Peach Circle & Col 3 boundary */}
              <div className="absolute top-[34%] right-[32%] z-20 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="text-[#1F1F1F] text-xl sm:text-2xl font-black drop-shadow-sm"
                >
                  ✦
                </motion.div>
              </div>

              {/* Row 1, Col 1: Yellow Quarter-Circle (Top-Right Curved) with Inset Depth */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-tr-[100%] rounded-tl-none rounded-br-none rounded-bl-none"
                style={{
                  boxShadow: 'inset -8px -8px 24px rgba(0, 0, 0, 0.08), 0 8px 20px -6px rgba(229, 181, 79, 0.25)'
                }}
              />

              {/* Row 1, Col 2: Peach Quarter-Circle (Bottom-Right Curved) with Inset Depth */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F3C4B3] rounded-br-[100%] rounded-tl-none rounded-tr-none rounded-bl-none"
                style={{
                  boxShadow: 'inset 8px -8px 24px rgba(0, 0, 0, 0.06), 0 8px 20px -6px rgba(243, 196, 179, 0.25)'
                }}
              />

              {/* Row 1, Col 3: Deep Maroon Quarter-Circle with 'For Every Special Moment' */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#4E1D1D] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-4 sm:p-6 xl:p-8 flex flex-col justify-end items-end text-right text-white relative overflow-hidden"
                style={{
                  boxShadow: 'inset -6px 6px 20px rgba(0, 0, 0, 0.2), 0 10px 25px -6px rgba(78, 29, 29, 0.3)'
                }}
              >
                <div className="w-8 sm:w-11 h-0.5 bg-white/70 mb-2 self-start" />
                <span className="font-editorial text-xs sm:text-base xl:text-lg tracking-wide text-white/95 leading-tight">
                  For Every<br />Special<br />Moment
                </span>
              </motion.div>

              {/* Row 2, Col 1: High-Res Couple in Mandap with Rose Petals (No black edges!) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-t-[140px] sm:rounded-t-[180px] overflow-hidden relative group bg-[#FAF8F6]"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.15), 0 8px 24px -4px rgba(0, 0, 0, 0.12)'
                }}
              >
                <img
                  src="/images/hero-couple-arch-clean.jpg"
                  alt="Wedding Couple Rose Petals Ceremony"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Row 2, Col 2: Peach Full Circle with Subtle Spherical Depth Shadow */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-full bg-[#F3C4B3]"
                style={{
                  boxShadow: 'inset 0 -10px 25px rgba(0, 0, 0, 0.08), inset 0 10px 25px rgba(255, 255, 255, 0.4), 0 10px 25px -8px rgba(243, 196, 179, 0.35)'
                }}
              />

              {/* Row 2, Col 3: Split into Yellow Quarter-Circle + Newly Uploaded Reception Night Lights Photo */}
              <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3.5 xl:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#E5B54F] rounded-tl-[100%]"
                  style={{
                    boxShadow: 'inset -6px 6px 20px rgba(0, 0, 0, 0.07)'
                  }}
                />
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-2xl overflow-hidden bg-stone-900 group"
                  style={{
                    boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.1), 0 6px 16px -4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <img
                    src="/images/hero-night-lights.jpg"
                    alt="Starry Chandelier Reception Night"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 1: Split into Maroon 'BEAUTIFUL DESIGNS' + Diya Ritual Photo (Clean crop, zero black bars) */}
              <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3.5 xl:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#4E1D1D] rounded-2xl p-3 sm:p-4.5 text-white flex flex-col justify-center"
                  style={{
                    boxShadow: 'inset -4px 4px 16px rgba(0, 0, 0, 0.25), 0 6px 16px -4px rgba(78, 29, 29, 0.25)'
                  }}
                >
                  <span className="text-[10px] sm:text-xs xl:text-sm font-bold tracking-widest uppercase leading-snug">
                    BEAUTIFUL<br />DESIGNS
                  </span>
                  <div className="w-6 sm:w-8 h-0.5 bg-white/70 mt-1.5" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-2xl overflow-hidden bg-stone-900 group"
                  style={{
                    boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.2), 0 6px 16px -4px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <img
                    src="/images/hero-diya-clean.jpg"
                    alt="Traditional Brass Diya Ritual"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 2: Yellow Solid Square with 'SHARED ACROSS THE WORLD' */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-2xl p-4 sm:p-5 xl:p-6 flex flex-col justify-center text-[#1F1F1F]"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.06), 0 8px 20px -6px rgba(229, 181, 79, 0.25)'
                }}
              >
                <span className="font-bold text-[11px] sm:text-xs xl:text-sm tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-6 sm:w-8 h-0.5 bg-[#1F1F1F]/70 mt-2" />
              </motion.div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Curved) with Diagonal Arrow */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F3C4B3] rounded-tl-[100%] p-4 sm:p-6 xl:p-8 flex items-end justify-end group"
                style={{
                  boxShadow: 'inset 8px 8px 24px rgba(0, 0, 0, 0.07), 0 8px 24px -6px rgba(243, 196, 179, 0.25)'
                }}
              >
                <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 xl:w-12 xl:h-12 text-[#1F1F1F] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
