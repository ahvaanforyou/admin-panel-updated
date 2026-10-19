import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import UnforgettableHandwriting from './UnforgettableHandwriting';

export default function Hero({ onCreateClick }) {
  const containerRef = useRef(null);

  // Scroll driven fade-out that completely disappears once section is scrolled past
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.65, 0.95], [1, 0.35, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.95], [1, 0.96]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.95], [0, -30]);
  const heroVisibility = useTransform(scrollYProgress, (v) => (v >= 0.95 ? 'hidden' : 'visible'));
  const heroPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.92 ? 'none' : 'auto'));

  return (
    <motion.section 
      ref={containerRef}
      id="hero" 
      style={{ 
        opacity: heroOpacity, 
        scale: heroScale, 
        y: heroTranslateY,
        visibility: heroVisibility,
        pointerEvents: heroPointerEvents,
      }}
      className="relative z-0 w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 lg:pt-24 pb-8 sm:pb-10 lg:pb-6"
    >
      {/* 
        Hero Layout: Left column has large prominent typography, right column has responsive 3x3 shapes
      */}
      <div className="w-full pl-5 sm:pl-8 lg:pl-10 xl:pl-14 pr-4 sm:pr-6 lg:pr-8 xl:pr-10 mx-auto max-w-[1720px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-8 items-center w-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Animated Stroke Text                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 min-w-0 flex flex-col items-start justify-center z-10 select-none py-2 my-auto pr-0 lg:pr-2">
            
            {/* Headline Section */}
            <div className="w-full">
              <motion.h1 
                initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.6rem] 2xl:text-[4.6rem] font-bold tracking-tight text-[#1F1F1F] leading-[1.02] lg:leading-[0.98]"
              >
                Digital invitations,
              </motion.h1>

              {/* Line with 'made' and 'unforgettable' directly beside it on the EXACT SAME line */}
              <div className="flex flex-nowrap items-baseline gap-2 sm:gap-3 lg:gap-2.5 xl:gap-3.5 mt-1 sm:mt-1.5 lg:mt-2 w-full overflow-visible whitespace-nowrap">
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative -top-1.5 sm:-top-3 lg:-top-2.5 xl:-top-3.5 text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.6rem] 2xl:text-[4.6rem] font-bold tracking-tight text-[#1F1F1F] leading-none flex-shrink-0"
                >
                  made
                </motion.span>

                {/* 'unforgettable' premium smooth calligraphy matching reference image */}
                <UnforgettableHandwriting />
              </div>
            </div>

            {/* Pill CTA button & Subtext layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-5 sm:mt-7 xl:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 xl:gap-6 w-full"
            >
              <button
                onClick={onCreateClick}
                className="bg-[#351410] hover:bg-[#230C0A] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold tracking-wide shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group flex-shrink-0 cursor-pointer"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <p className="text-xs sm:text-sm text-stone-600 max-w-[320px] leading-relaxed font-normal">
                Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.
              </p>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Full-Bleed 3×3 Grid Fitting Cleanly On Screen               */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 min-w-0 flex justify-end items-center w-full select-none">
            {/* 
              Responsive 3x3 Matrix fitting cleanly with zero overflow clipping
            */}
            <div className="hero-matrix-grid grid grid-cols-3 gap-2 sm:gap-3 lg:gap-2.5 xl:gap-3.5 2xl:gap-4.5 relative select-none p-0">
              
              {/* Star Accent positioned at exact geometry intersection (69.4% X, 32.1% Y) */}
              <div className="absolute top-[31%] right-[32%] z-20 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="text-[#1F1F1F] text-lg sm:text-2xl lg:text-xl xl:text-2xl font-black drop-shadow-sm select-none"
                >
                  ✦
                </motion.div>
              </div>

              {/* Row 1, Col 1: Yellow Quarter-Circle (Top-Right Curved) with Neumorphic Inset & Depth */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F5CD51] rounded-tr-[100%] rounded-tl-none rounded-br-none rounded-bl-none"
                style={{
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.5), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 6px 12px 24px -4px rgba(245, 205, 81, 0.35), 0 4px 12px rgba(0, 0, 0, 0.06)'
                }}
              />

              {/* Row 1, Col 2: Peach Quarter-Circle (Bottom-Right Curved) with Neumorphic Depth */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F4C4B7] rounded-br-[100%] rounded-tl-none rounded-tr-none rounded-bl-none"
                style={{
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.55), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 6px 12px 24px -4px rgba(244, 196, 183, 0.35), 0 4px 12px rgba(0, 0, 0, 0.06)'
                }}
              />

              {/* Row 1, Col 3: Deep Maroon Quarter-Circle with 'For Every Special Moment' */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#351410] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-3 sm:p-4 lg:p-3.5 xl:p-5 2xl:p-6 flex flex-col justify-end items-start text-left text-white relative overflow-hidden pl-7 sm:pl-10 lg:pl-8 xl:pl-12"
                style={{
                  boxShadow: 'inset 4px -4px 18px rgba(0, 0, 0, 0.4), inset -2px 2px 10px rgba(255, 255, 255, 0.15), 6px 14px 26px -4px rgba(53, 20, 16, 0.4)'
                }}
              >
                <div className="w-6 sm:w-8 lg:w-7 xl:w-10 h-0.5 bg-white/75 mb-2" />
                <span className="font-editorial text-xs sm:text-base lg:text-xs xl:text-base 2xl:text-lg tracking-wide text-white/95 leading-tight">
                  For Every<br />Special<br />Moment
                </span>
              </motion.div>

              {/* Row 2, Col 1: High-Res Couple in Mandap with Rose Petals (Rounded Arch Top) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-t-[140px] sm:rounded-t-[180px] rounded-b-none overflow-hidden relative group bg-[#FAF8F6]"
                style={{
                  boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.15), 6px 14px 26px -4px rgba(0, 0, 0, 0.16)'
                }}
              >
                <img
                  src="/images/hero-couple-arch-clean.jpg"
                  alt="Wedding Couple Rose Petals Ceremony"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Row 2, Col 2: Peach Full Circle with 3D Spherical Neumorphic Depth Shadow */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-full bg-[#F4C4B7]"
                style={{
                  boxShadow: 'inset 0 6px 14px rgba(255, 255, 255, 0.6), inset 0 -12px 24px rgba(0, 0, 0, 0.14), 6px 14px 28px -4px rgba(244, 196, 183, 0.38), 0 6px 16px rgba(0, 0, 0, 0.08)'
                }}
              />

              {/* Row 2, Col 3: Split into Yellow Quarter-Circle + Crisp HD Traditional Hands Ceremony Photo */}
              <div className="w-full h-full flex flex-col gap-1.5 sm:gap-2.5 lg:gap-2 xl:gap-3">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#F5CD51] rounded-tl-[100%] rounded-tr-none rounded-b-none"
                  style={{
                    boxShadow: 'inset 3px 3px 12px rgba(255, 255, 255, 0.45), inset -4px 4px 14px rgba(0, 0, 0, 0.1), 6px 12px 22px -4px rgba(245, 205, 81, 0.3)'
                  }}
                />
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 group shadow-md"
                  style={{
                    boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.15), 6px 12px 22px -4px rgba(0, 0, 0, 0.14)'
                  }}
                >
                  <img
                    src="/images/hero-hands-hd.jpg"
                    alt="Traditional Wedding Hands Ceremony"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 1: Split into Maroon 'BEAUTIFUL DESIGNS' + Brass Diya Oil Lamps Photo */}
              <div className="w-full h-full flex flex-col gap-1.5 sm:gap-2.5 lg:gap-2 xl:gap-3">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#351410] rounded-tl-[36px] sm:rounded-tl-[44px] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-3 xl:p-4 text-white flex flex-col justify-center pl-4 sm:pl-6 lg:pl-5 xl:pl-6 shadow-md"
                  style={{
                    boxShadow: 'inset 4px -4px 16px rgba(0, 0, 0, 0.35), 6px 12px 22px -4px rgba(53, 20, 16, 0.35)'
                  }}
                >
                  <span className="text-[9px] sm:text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-bold tracking-widest uppercase leading-snug">
                    BEAUTIFUL<br />DESIGNS
                  </span>
                  <div className="w-5 sm:w-8 lg:w-6 xl:w-8 h-0.5 bg-white/75 mt-1 sm:mt-1.5" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 group shadow-md"
                  style={{
                    boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.18), 6px 12px 22px -4px rgba(0, 0, 0, 0.14)'
                  }}
                >
                  <img
                    src="/images/hero-diya-lamps.jpg"
                    alt="Traditional Brass Diya Lamps with Jasmine Flowers"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 2: Yellow Solid Square with 'SHARED ACROSS THE WORLD' */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F5CD51] rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-3.5 xl:p-5 flex flex-col justify-center text-[#1F1F1F]"
                style={{
                  boxShadow: 'inset 3px 3px 12px rgba(255, 255, 255, 0.45), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 6px 12px 24px -4px rgba(245, 205, 81, 0.3)'
                }}
              >
                <span className="font-bold text-[10px] sm:text-xs lg:text-[10px] xl:text-xs 2xl:text-sm tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-5 sm:w-8 lg:w-6 xl:w-8 h-0.5 bg-[#1F1F1F]/70 mt-1.5 sm:mt-2" />
              </motion.div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Curved) with Diagonal Arrow Centered & Prominent */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F4C4B7] rounded-tl-[64px] sm:rounded-tl-[90px] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center justify-center group"
                style={{
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.5), inset -6px -6px 20px rgba(0, 0, 0, 0.1), 6px 12px 24px -4px rgba(244, 196, 183, 0.32)'
                }}
              >
                <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 lg:w-8 lg:h-8 xl:w-11 xl:h-11 text-[#1F1F1F] stroke-[2.4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
