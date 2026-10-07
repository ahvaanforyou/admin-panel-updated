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
  const leftTranslateY = useTransform(scrollYProgress, [0, 0.45], [0, -35]);

  // Stroke draw variants for letters of "unforgettable"
  // Letters: u n f o r g e t t a b l e
  const letters = ['u', 'n', 'f', 'o', 'r', 'g', 'e', 't', 't', 'a', 'b', 'l', 'e'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.11, // fast, smooth, sequential letter write-on
        delayChildren: 0.35,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      strokeDashoffset: 160,
      fillOpacity: 0,
    },
    visible: {
      opacity: 1,
      strokeDashoffset: 0,
      fillOpacity: 1,
      transition: {
        strokeDashoffset: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
        fillOpacity: { duration: 0.35, delay: 0.3 },
        opacity: { duration: 0.15 },
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen w-full pt-24 sm:pt-28 pb-6 sm:pb-8 bg-white overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10"
    >
      {/* Full-width viewport container that reaches screen borders */}
      <div className="w-full max-w-[1720px] mx-auto min-h-[calc(100vh-6rem)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography (Fade-out on scroll, beside 'made')     */}
          {/* ========================================================================= */}
          <motion.div 
            style={{ 
              opacity: leftOpacity, 
              y: leftTranslateY,
            }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-start justify-center z-10 select-none pl-2 sm:pl-4 xl:pl-6"
          >
            
            {/* Top Swirl Flourish Line */}
            <div className="w-full max-w-[480px] mb-3 sm:mb-5 overflow-visible">
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
                  transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </div>

            {/* Headline Section */}
            <div className="space-y-1 sm:space-y-2 w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-6xl lg:text-6xl xl:text-[4.8rem] font-bold tracking-tight text-[#1F1F1F] leading-[1.06]"
              >
                Digital invitations,
              </motion.h1>

              {/* Line with 'made' and 'unforgettable' directly beside it */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3.5">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="text-4xl sm:text-6xl lg:text-6xl xl:text-[4.8rem] font-bold tracking-tight text-[#1F1F1F] leading-none"
                >
                  made
                </motion.span>

                {/* SVG Stroke animation: letter by letter After Effects write-on */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-flex items-baseline"
                >
                  <svg
                    viewBox="0 0 540 100"
                    className="w-[230px] sm:w-[320px] lg:w-[360px] xl:w-[420px] h-auto overflow-visible translate-y-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {letters.map((char, index) => {
                      // Precise horizontal tracking offsets for Playwrite/cursive letters
                      const charOffsets = [10, 48, 86, 126, 168, 204, 248, 286, 320, 354, 396, 436, 468];
                      const xPos = charOffsets[index] || index * 38;

                      return (
                        <motion.text
                          key={index}
                          x={xPos}
                          y="78"
                          className="font-handwriting italic font-normal"
                          fontSize="76"
                          fill="#4E1D1D"
                          stroke="#4E1D1D"
                          strokeWidth="2.2"
                          strokeDasharray="160"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          variants={letterVariants}
                        >
                          {char}
                        </motion.text>
                      );
                    })}
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Pill CTA button & Subtext layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 xl:gap-8 w-full"
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
          {/* RIGHT COLUMN: Full-Height Geometric Shapes Grid (Filled with uploaded images) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end w-full pr-1 sm:pr-3">
            {/* The 3x3 Exact Frame Matrix scaled to fill the right section gracefully */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4.5 xl:gap-5 w-full max-w-[700px] xl:max-w-[820px] aspect-[1/1] select-none p-1">
              
              {/* Row 1, Col 1: Yellow Quarter-Circle (Top-Right Curved) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-tr-[100%] rounded-tl-none rounded-br-none rounded-bl-none shadow-sm"
              />

              {/* Row 1, Col 2: Peach Quarter-Circle (Bottom-Right Curved) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F3C4B3] rounded-br-[100%] rounded-tl-none rounded-tr-none rounded-bl-none shadow-sm"
              />

              {/* Row 1, Col 3: Deep Maroon Quarter-Circle with 'For Every Special Moment' */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#4E1D1D] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-4 sm:p-6 xl:p-8 flex flex-col justify-end items-end text-right text-white shadow-sm"
              >
                <div className="w-8 sm:w-12 h-0.5 bg-white/70 mb-2 self-start" />
                <span className="font-editorial text-xs sm:text-base xl:text-lg tracking-wide text-white/95 leading-tight">
                  For Every<br />Special<br />Moment
                </span>
              </motion.div>

              {/* Row 2, Col 1: High-Res Couple In Mandap with Rose Petals (Top Rounded Arch) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-t-[140px] sm:rounded-t-[180px] overflow-hidden shadow-sm relative group bg-stone-100"
              >
                <img
                  src="/images/hero-couple-arch.jpg"
                  alt="Wedding Couple Rose Petals Ceremony"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Row 2, Col 2: Peach Full Circle (Clean, no white lines or stars) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-full bg-[#F3C4B3] shadow-sm"
              />

              {/* Row 2, Col 3: Clean Yellow Quarter-Circle (Top-Left Curved) */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none shadow-sm"
              />

              {/* Row 3, Col 1: Split into Maroon 'BEAUTIFUL DESIGNS' + High-Res Night Dinner Reception Photo */}
              <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3.5 xl:gap-4">
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[1.05] bg-[#4E1D1D] rounded-2xl p-3.5 sm:p-5 text-white flex flex-col justify-center shadow-sm"
                >
                  <span className="text-[10px] sm:text-xs xl:text-sm font-bold tracking-widest uppercase leading-snug">
                    BEAUTIFUL<br />DESIGNS
                  </span>
                  <div className="w-6 sm:w-8 h-0.5 bg-white/70 mt-1.5" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="flex-[0.95] rounded-2xl overflow-hidden shadow-sm bg-stone-900 group"
                >
                  <img
                    src="/images/hero-sangeet-reception.jpg"
                    alt="Starry Night Dinner Reception"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Row 3, Col 2: Yellow Solid Square with 'SHARED ACROSS THE WORLD' */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#E5B54F] rounded-2xl p-4 sm:p-6 xl:p-7 flex flex-col justify-center text-[#1F1F1F] shadow-sm"
              >
                <span className="font-bold text-[11px] sm:text-sm xl:text-base tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-7 sm:w-9 h-0.5 bg-[#1F1F1F]/70 mt-2 sm:mt-2.5" />
              </motion.div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Curved) with Diagonal Arrow */}
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-[#F3C4B3] rounded-tl-[100%] p-4 sm:p-7 xl:p-9 flex items-end justify-end shadow-sm group"
              >
                <ArrowUpRight className="w-7 h-7 sm:w-11 sm:h-11 xl:w-14 xl:h-14 text-[#1F1F1F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
