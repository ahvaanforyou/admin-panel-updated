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
  const leftTranslateY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
  const leftScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.96]);

  // Subtle parallax for right shape grid
  const rightTranslateY = useTransform(scrollYProgress, [0, 0.5], [0, -25]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen w-full pt-24 sm:pt-28 pb-12 sm:pb-16 bg-white overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16"
    >
      {/* Full-width container filling the entire desktop viewport */}
      <div className="w-full max-w-[1540px] mx-auto min-h-[calc(100vh-8rem)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography with Stroke Drawing & Fade-out on scroll */}
          {/* ========================================================================= */}
          <motion.div 
            style={{ 
              opacity: leftOpacity, 
              y: leftTranslateY,
              scale: leftScale 
            }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start justify-center z-10 select-none"
          >
            
            {/* Top Swirl Flourish Line (Exact from image 1) */}
            <div className="w-full max-w-[500px] mb-4 sm:mb-6 overflow-visible">
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
                  transition={{ duration: 2.0, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </div>

            {/* Headline Section */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-bold tracking-tight text-[#1F1F1F] leading-[1.05]"
              >
                Digital invitations,
              </motion.h1>

              <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-bold tracking-tight text-[#1F1F1F] leading-none"
                >
                  made
                </motion.span>

                {/* 'unforgettable' in cursive with realistic SVG handwriting stroke draw */}
                <div className="relative inline-block mt-2 sm:mt-0">
                  <svg
                    viewBox="0 0 680 145"
                    className="w-[280px] sm:w-[380px] lg:w-[460px] xl:w-[500px] h-auto overflow-visible"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* First pass: golden underglow line draw */}
                    <motion.text
                      x="8"
                      y="110"
                      className="font-handwriting italic font-normal"
                      fontSize="120"
                      fill="transparent"
                      stroke="#FFC655"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2000"
                      strokeDashoffset="2000"
                      initial={{ strokeDashoffset: 2000, opacity: 0 }}
                      animate={{ strokeDashoffset: 0, opacity: 0.6 }}
                      transition={{ duration: 2.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      unforgettable
                    </motion.text>

                    {/* Main stroke draw: The word is written using stroke animation */}
                    <motion.text
                      x="8"
                      y="110"
                      className="font-handwriting italic font-normal"
                      fontSize="120"
                      fill="transparent"
                      stroke="#4E1D1D"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2000"
                      strokeDashoffset="2000"
                      initial={{ strokeDashoffset: 2000, opacity: 0 }}
                      animate={{ strokeDashoffset: 0, opacity: 1 }}
                      transition={{ duration: 2.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      unforgettable
                    </motion.text>

                    {/* Gradual subtle fill-in after the stroke completes */}
                    <motion.text
                      x="8"
                      y="110"
                      className="font-handwriting italic font-normal"
                      fontSize="120"
                      fill="#4E1D1D"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.95 }}
                      transition={{ duration: 0.8, delay: 3.1 }}
                    >
                      unforgettable
                    </motion.text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pill CTA button & Subtext layout */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 xl:gap-8 w-full"
            >
              <button
                onClick={onCreateClick}
                className="bg-[#4E1D1D] hover:bg-[#381313] text-white px-8 sm:px-9 py-4 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-md hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group flex-shrink-0"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <p className="text-xs sm:text-sm text-stone-600 max-w-[280px] leading-relaxed font-normal">
                Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.
              </p>
            </motion.div>

          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Full-Height Geometric Shapes Grid (Exact Match to Image)    */}
          {/* ========================================================================= */}
          <motion.div 
            style={{ y: rightTranslateY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end w-full"
          >
            {/* The 3x3 Exact Frame Matrix scaled to fill the right section gracefully */}
            <div className="grid grid-cols-3 gap-3.5 sm:gap-5 w-full max-w-[680px] xl:max-w-[760px] aspect-[1/1] select-none p-1">
              
              {/* Row 1, Col 1: Yellow Quarter-Circle (Top-Right Curved) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-tr-[100%] rounded-tl-none rounded-br-none rounded-bl-none shadow-sm"
              />

              {/* Row 1, Col 2: Peach Quarter-Circle (Bottom-Right Curved) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F3C4B3] rounded-br-[100%] rounded-tl-none rounded-tr-none rounded-bl-none shadow-sm"
              />

              {/* Row 1, Col 3: Deep Maroon Quarter-Circle with 'For Every Special Moment' */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#4E1D1D] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-5 sm:p-7 xl:p-8 flex flex-col justify-end items-end text-right text-white shadow-sm"
              >
                <div className="w-9 sm:w-12 h-0.5 bg-white/70 mb-2 self-start" />
                <span className="font-editorial text-xs sm:text-base xl:text-lg tracking-wide text-white/95 leading-tight">
                  For Every<br />Special<br />Moment
                </span>
              </motion.div>

              {/* Row 2, Col 1: Arch Mandap Photo (Top Rounded Arch) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-t-[140px] overflow-hidden shadow-sm relative group bg-stone-100"
              >
                <img
                  src="/images/grid-mandap.png"
                  alt="Floral Wedding Mandap"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Row 2, Col 2: Peach Full Circle with Star Accent */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-full bg-[#F3C4B3] flex items-center justify-center shadow-sm relative"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-3.5 -right-3.5 text-[#1F1F1F] text-lg sm:text-xl font-bold"
                >
                  ✦
                </motion.div>
              </motion.div>

              {/* Row 2, Col 3: Split into Yellow Quarter-Circle + Wedding Hands Photo */}
              <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.1] bg-[#E5B54F] rounded-tl-[100%] shadow-sm"
                />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.9] rounded-2xl overflow-hidden shadow-sm bg-stone-100 group"
                >
                  <img
                    src="/images/grid-hands.png"
                    alt="Indian Wedding Hands Ceremony"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 1: Split into Maroon 'BEAUTIFUL DESIGNS' + Brass Diya Photo */}
              <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.1] bg-[#4E1D1D] rounded-2xl p-4 sm:p-5 text-white flex flex-col justify-center shadow-sm"
                >
                  <span className="text-[11px] sm:text-xs xl:text-sm font-bold tracking-widest uppercase leading-snug">
                    BEAUTIFUL<br />DESIGNS
                  </span>
                  <div className="w-7 sm:w-9 h-0.5 bg-white/70 mt-2" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.9] rounded-2xl overflow-hidden shadow-sm bg-stone-100 group"
                >
                  <img
                    src="/images/grid-diya.png"
                    alt="Brass Diya Traditional Ritual"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 2: Yellow Solid Square with 'SHARED ACROSS THE WORLD' */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-2xl p-4 sm:p-6 xl:p-7 flex flex-col justify-center text-[#1F1F1F] shadow-sm"
              >
                <span className="font-bold text-xs sm:text-sm xl:text-base tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-7 sm:w-10 h-0.5 bg-[#1F1F1F]/70 mt-2.5" />
              </motion.div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Curved) with Diagonal Arrow */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F3C4B3] rounded-tl-[100%] p-5 sm:p-7 xl:p-9 flex items-end justify-end shadow-sm group"
              >
                <ArrowUpRight className="w-8 h-8 sm:w-11 sm:h-11 xl:w-14 xl:h-14 text-[#1F1F1F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
