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
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center pt-20 sm:pt-24 lg:pt-26 pb-8"
    >
      {/* 
        Full viewport width container with balanced left padding and edge-to-edge right alignment
      */}
      <div className="w-full pl-6 sm:pl-10 lg:pl-12 xl:pl-14 pr-2 sm:pr-4 lg:pr-5 xl:pr-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-8 items-center w-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Animated Stroke Text                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start justify-center z-10 select-none py-2 my-auto">
            
            {/* Headline Section */}
            <div className="w-full">
              <motion.h1 
                initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-[4.2rem] xl:text-[5.2rem] 2xl:text-[5.8rem] font-bold tracking-tight text-[#1F1F1F] leading-[0.98] lg:leading-[0.94]"
              >
                Digital invitations,
              </motion.h1>

              {/* Line with 'made' and 'unforgettable' directly beside it on the EXACT SAME line */}
              <div className="flex flex-nowrap items-baseline gap-2 sm:gap-3 mt-1 sm:mt-1.5 lg:mt-2 w-full overflow-visible whitespace-nowrap">
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-[4.2rem] xl:text-[5.2rem] 2xl:text-[5.8rem] font-bold tracking-tight text-[#1F1F1F] leading-none flex-shrink-0 -translate-y-2.5 sm:-translate-y-3.5 lg:-translate-y-4 xl:-translate-y-4"
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
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-7 sm:mt-9 xl:mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-5 xl:gap-7 w-full"
            >
              <button
                onClick={onCreateClick}
                className="bg-[#351410] hover:bg-[#230C0A] text-white px-8 sm:px-9 py-4 sm:py-4.5 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group flex-shrink-0 cursor-pointer"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <p className="text-sm sm:text-base text-stone-600 max-w-[320px] leading-relaxed font-normal">
                Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.
              </p>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Exact 3×3 Grid Fitting Viewport with Neumorphic Depth       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-center w-full select-none pr-0">
            {/* 
              Responsive 3x3 Matrix perfectly fitting the page bounds without clipping or white gaps
            */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3 xl:gap-3.5 w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[650px] xl:max-w-[730px] 2xl:max-w-[790px] aspect-square ml-auto select-none p-0 relative max-h-[min(82vh,780px)]">
              
              {/* Star Accent positioned at exact geometry intersection (69.4% X, 32.1% Y) */}
              <div className="absolute top-[31%] right-[32%] z-20 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="text-[#1F1F1F] text-xl sm:text-2xl font-black drop-shadow-sm select-none"
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
                className="w-full h-full bg-[#351410] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-3.5 sm:p-5 xl:p-6 flex flex-col justify-end items-start text-left text-white relative overflow-hidden pl-10 sm:pl-12 xl:pl-14"
                style={{
                  boxShadow: 'inset 4px -4px 18px rgba(0, 0, 0, 0.4), inset -2px 2px 10px rgba(255, 255, 255, 0.15), 6px 14px 26px -4px rgba(53, 20, 16, 0.4)'
                }}
              >
                <div className="w-8 sm:w-10 h-0.5 bg-white/75 mb-2.5" />
                <span className="font-editorial text-xs sm:text-base xl:text-lg tracking-wide text-white/95 leading-tight">
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
              <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
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
                  className="flex-[0.95] rounded-2xl overflow-hidden bg-stone-900 group shadow-md"
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
              <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#351410] rounded-tl-[44px] rounded-2xl p-3 sm:p-4 text-white flex flex-col justify-center pl-6 sm:pl-7 shadow-md"
                  style={{
                    boxShadow: 'inset 4px -4px 16px rgba(0, 0, 0, 0.35), 6px 12px 22px -4px rgba(53, 20, 16, 0.35)'
                  }}
                >
                  <span className="text-[10px] sm:text-xs xl:text-sm font-bold tracking-widest uppercase leading-snug">
                    BEAUTIFUL<br />DESIGNS
                  </span>
                  <div className="w-6 sm:w-8 h-0.5 bg-white/75 mt-1.5" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-2xl overflow-hidden bg-stone-900 group shadow-md"
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
                className="w-full h-full bg-[#F5CD51] rounded-2xl p-4 sm:p-5 xl:p-6 flex flex-col justify-center text-[#1F1F1F]"
                style={{
                  boxShadow: 'inset 3px 3px 12px rgba(255, 255, 255, 0.45), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 6px 12px 24px -4px rgba(245, 205, 81, 0.3)'
                }}
              >
                <span className="font-bold text-[11px] sm:text-xs xl:text-sm tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-6 sm:w-8 h-0.5 bg-[#1F1F1F]/70 mt-2" />
              </motion.div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Curved) with Diagonal Arrow Centered & Prominent */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F4C4B7] rounded-tl-[80px] sm:rounded-tl-[100px] rounded-2xl p-4 sm:p-5 flex items-center justify-center group"
                style={{
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.5), inset -6px -6px 20px rgba(0, 0, 0, 0.1), 6px 12px 24px -4px rgba(244, 196, 183, 0.32)'
                }}
              >
                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 text-[#1F1F1F] stroke-[2.4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
