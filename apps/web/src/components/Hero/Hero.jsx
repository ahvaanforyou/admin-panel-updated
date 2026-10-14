import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import UnforgettableHandwriting from './UnforgettableHandwriting';

export default function Hero({ onCreateClick }) {
  const containerRef = useRef(null);

  // Scroll driven fade-out for the left section as user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.55]);
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.98]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.85], [0, -25]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.55]);
  const leftTranslateY = useTransform(scrollYProgress, [0, 0.95], [0, -15]);

  return (
    <motion.section 
      ref={containerRef}
      id="hero" 
      style={{ opacity: heroOpacity, scale: heroScale, y: heroTranslateY }}
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center pt-20 sm:pt-24 lg:pt-26 pb-8"
    >
      {/* 
        Full viewport width container:
        - pl-6 sm:pl-10 lg:pl-12 xl:pl-16 guarantees left headline & button NEVER clip
        - pr-0 allows the right shape grid to touch the right border of the screen without white gap
      */}
      <div className="w-full pl-6 sm:pl-10 lg:pl-12 xl:pl-16 pr-0 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-8 items-center w-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Animated Stroke Text                  */}
          {/* ========================================================================= */}
          <motion.div 
            style={{ 
              opacity: leftOpacity, 
              y: leftTranslateY,
            }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start justify-center z-10 select-none py-2"
          >
            
            {/* Top Swirl Flourish Line */}
            <div className="w-full max-w-[480px] sm:max-w-[560px] xl:max-w-[620px] mb-3 sm:mb-4 overflow-visible">
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
                initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-6xl xl:text-[5.2rem] 2xl:text-[5.8rem] font-bold tracking-tight text-[#1F1F1F] leading-[1.06]"
              >
                Digital invitations,
              </motion.h1>

              {/* Line with 'made' and 'unforgettable' directly beside it */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 xl:gap-5 mt-2.5 sm:mt-4 pt-1 sm:pt-2">
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-6xl xl:text-[5.2rem] 2xl:text-[5.8rem] font-bold tracking-tight text-[#1F1F1F] leading-none"
                >
                  made
                </motion.span>

                {/* 'unforgettable' premium smooth handwriting SVG animation matching reference image */}
                <UnforgettableHandwriting />
              </div>
            </div>

            {/* Pill CTA button & Subtext layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-8 sm:mt-10 xl:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 xl:gap-8 w-full"
            >
              <button
                onClick={onCreateClick}
                className="bg-[#4E1D1D] hover:bg-[#381313] text-white px-8 sm:px-9 py-4 sm:py-4.5 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group flex-shrink-0"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <p className="text-sm sm:text-base text-stone-600 max-w-[320px] leading-relaxed font-normal">
                Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.
              </p>
            </motion.div>

          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Exact 3×3 Grid Fitting Viewport with Neumorphic Depth & Flush Border */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-end items-center w-full pr-0 overflow-visible">
            {/* 
              Responsive 3x3 Matrix matching third reference image with neumorphic depth and flush right border:
            */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 xl:gap-4.5 w-full max-w-[680px] lg:max-w-none lg:w-[calc(100%+1.5rem)] xl:w-[calc(100%+2.5rem)] 2xl:w-[calc(100%+4rem)] lg:-mr-6 xl:-mr-10 2xl:-mr-16 max-h-[calc(100vh-5.5rem)] aspect-[1/1] select-none p-0 relative">
              
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
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.5), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 8px 16px 30px -4px rgba(245, 205, 81, 0.38), 0 4px 12px rgba(0, 0, 0, 0.06)'
                }}
              />

              {/* Row 1, Col 2: Peach Quarter-Circle (Bottom-Right Curved) with Neumorphic Depth */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F4C4B7] rounded-br-[100%] rounded-tl-none rounded-tr-none rounded-bl-none"
                style={{
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.55), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 8px 16px 28px -4px rgba(244, 196, 183, 0.38), 0 4px 12px rgba(0, 0, 0, 0.06)'
                }}
              />

              {/* Row 1, Col 3: Deep Maroon Quarter-Circle with 'For Every Special Moment' (Flush to Right Border) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#381410] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-4 sm:p-6 xl:p-8 flex flex-col justify-end items-end text-right text-white relative overflow-hidden"
                style={{
                  boxShadow: 'inset 4px -4px 18px rgba(0, 0, 0, 0.4), inset -2px 2px 10px rgba(255, 255, 255, 0.15), 8px 16px 30px -4px rgba(56, 20, 16, 0.45)'
                }}
              >
                <div className="w-8 sm:w-11 h-0.5 bg-white/75 mb-2.5 self-start" />
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
                  boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.15), 8px 18px 30px -4px rgba(0, 0, 0, 0.16)'
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
                  boxShadow: 'inset 0 6px 14px rgba(255, 255, 255, 0.6), inset 0 -12px 24px rgba(0, 0, 0, 0.14), 8px 18px 32px -4px rgba(244, 196, 183, 0.42), 0 6px 16px rgba(0, 0, 0, 0.08)'
                }}
              />

              {/* Row 2, Col 3: Split into Yellow Quarter-Circle + Traditional Hands Ceremony Photo (Flush to Right Border) */}
              <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3.5 xl:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#F5CD51] rounded-tl-[100%] rounded-tr-none rounded-b-none"
                  style={{
                    boxShadow: 'inset 3px 3px 12px rgba(255, 255, 255, 0.45), inset -4px 4px 14px rgba(0, 0, 0, 0.1), 6px 14px 26px -4px rgba(245, 205, 81, 0.32)'
                  }}
                />
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-2xl rounded-r-none overflow-hidden bg-stone-900 group"
                  style={{
                    boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.15), 6px 14px 24px -4px rgba(0, 0, 0, 0.14)'
                  }}
                >
                  <img
                    src="/images/hero-hands-perfect.jpg"
                    alt="Traditional Wedding Hands Ceremony"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 1: Split into Maroon 'BEAUTIFUL DESIGNS' + Brass Diya Oil Lamps Photo */}
              <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3.5 xl:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#381410] rounded-tl-[100%] rounded-tr-none rounded-b-none p-3 sm:p-4.5 text-white flex flex-col justify-center"
                  style={{
                    boxShadow: 'inset 4px -4px 16px rgba(0, 0, 0, 0.35), 6px 14px 24px -4px rgba(56, 20, 16, 0.38)'
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
                  className="flex-[0.95] rounded-2xl overflow-hidden bg-stone-900 group"
                  style={{
                    boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.18), 6px 14px 24px -4px rgba(0, 0, 0, 0.14)'
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
                  boxShadow: 'inset 3px 3px 12px rgba(255, 255, 255, 0.45), inset -6px -6px 18px rgba(0, 0, 0, 0.1), 8px 16px 28px -4px rgba(245, 205, 81, 0.35)'
                }}
              >
                <span className="font-bold text-[11px] sm:text-xs xl:text-sm tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-6 sm:w-8 h-0.5 bg-[#1F1F1F]/70 mt-2" />
              </motion.div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Curved) with Diagonal Arrow (Flush to Right Border) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F4C4B7] rounded-tl-[100%] rounded-tr-none rounded-br-none rounded-bl-none p-4 sm:p-6 xl:p-8 flex items-end justify-end group"
                style={{
                  boxShadow: 'inset 4px 4px 14px rgba(255, 255, 255, 0.5), inset -6px -6px 20px rgba(0, 0, 0, 0.1), 8px 16px 28px -4px rgba(244, 196, 183, 0.35)'
                }}
              >
                <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 xl:w-12 xl:h-12 text-[#1F1F1F] stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
