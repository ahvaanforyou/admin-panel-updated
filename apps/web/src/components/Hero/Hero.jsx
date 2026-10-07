import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero({ onCreateClick }) {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 bg-white overflow-hidden flex items-center">
      
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/30 via-rose-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Handwriting Animation */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            
            {/* Elegant Continuous Swirl Flourish Line (Exact from image 1) */}
            <motion.div 
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="w-full max-w-[420px] mb-6 overflow-visible"
            >
              <svg 
                viewBox="0 0 450 140" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <motion.path
                  d="M 10 95 C 60 40, 120 20, 180 50 C 230 75, 230 15, 200 15 C 160 15, 170 85, 230 85 C 310 85, 370 20, 440 95"
                  stroke="#4E1D1D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </motion.div>

            {/* Main Headline with Fade In and Stroke-Drawn 'unforgettable' */}
            <div className="space-y-1">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1F1F] leading-[1.08]"
              >
                Digital invitations,
              </motion.h1>

              <div className="flex flex-wrap items-baseline gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1F1F]"
                >
                  made
                </motion.span>

                {/* 'unforgettable' in cursive with SVG handwriting stroke drawing animation */}
                <span className="relative inline-block font-handwriting font-normal text-4xl sm:text-5xl lg:text-[4.2rem] text-[#4E1D1D] tracking-normal italic ml-2">
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                  >
                    unforgettable
                  </motion.span>

                  {/* SVG Stroke Outline Handwriting Effect (After Effects Style) */}
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-5 overflow-visible pointer-events-none"
                    viewBox="0 0 350 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M 5 18 Q 90 2 180 14 T 345 10"
                      stroke="#FFC655"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 20 20 Q 140 8 320 16"
                      stroke="#4E1D1D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
                    />
                  </motion.svg>
                </span>
              </div>
            </div>

            {/* Primary Action Button & Subtext Layout (Exact from Image 1) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Pill Button 'Create Your Invitation ->' */}
              <button
                onClick={onCreateClick}
                className="bg-[#4E1D1D] hover:bg-[#3A1414] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group flex-shrink-0"
              >
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Subtext description right next to button */}
              <p className="text-xs sm:text-sm text-stone-600 max-w-[260px] leading-relaxed">
                Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.
              </p>
            </motion.div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Exact Geometric Grid Collage (Image 1) */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex justify-center lg:justify-end"
          >
            {/* Grid Container with 3 Columns x 3 Rows Matching Reference */}
            <div className="grid grid-cols-3 gap-3.5 sm:gap-4.5 w-full max-w-[560px] aspect-[1/1] select-none">
              
              {/* Row 1, Col 1: Yellow Quarter-Circle (Top-Right Rounded) */}
              <div 
                className="w-full h-full bg-[#E5B54F] rounded-tr-[100%] rounded-tl-none rounded-br-none rounded-bl-none shadow-sm hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundColor: '#E5B54F' }}
              />

              {/* Row 1, Col 2: Peach Quarter-Circle (Bottom-Right Rounded) */}
              <div 
                className="w-full h-full bg-[#F3C4B3] rounded-br-[100%] rounded-tl-none rounded-tr-none rounded-bl-none shadow-sm hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundColor: '#F3C4B3' }}
              />

              {/* Row 1, Col 3: Deep Maroon Quarter-Circle with 'For Every Special Moment' */}
              <div 
                className="w-full h-full bg-[#4E1D1D] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-5 flex flex-col justify-end items-end text-right text-white shadow-sm hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-8 h-0.5 bg-white/70 mb-2 self-start" />
                <span className="font-editorial text-xs sm:text-sm tracking-wide text-white/95 leading-snug">
                  For Every<br />Special<br />Moment
                </span>
              </div>

              {/* Row 2, Col 1: Arch Mandap Photo (Top Rounded Arch) */}
              <div className="w-full h-full rounded-t-[100px] overflow-hidden shadow-sm hover:scale-[1.02] transition-transform duration-300 relative group">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
                  alt="Scenic Mandap Wedding Setup"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Row 2, Col 2: Peach Full Circle */}
              <div 
                className="w-full h-full rounded-full bg-[#F3C4B3] flex items-center justify-center shadow-sm hover:scale-[1.02] transition-transform duration-300 relative"
                style={{ backgroundColor: '#F3C4B3' }}
              >
                {/* Little 4-point star on top right */}
                <div className="absolute -top-3 -right-3 text-[#1F1F1F]">
                  ✦
                </div>
              </div>

              {/* Row 2, Col 3: Yellow Quarter-Circle (Top-Left Rounded) */}
              <div 
                className="w-full h-full bg-[#E5B54F] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none shadow-sm hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundColor: '#E5B54F' }}
              />

              {/* Row 3, Col 1: Split 2 Cards (Top: Deep Maroon 'BEAUTIFUL DESIGNS', Bottom: Brass Diya Photo) */}
              <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3">
                <div className="flex-1 bg-[#4E1D1D] rounded-xl p-3 sm:p-4 text-white flex flex-col justify-center">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                    BEAUTIFUL<br />DESIGNS
                  </span>
                  <div className="w-6 h-0.5 bg-white/70 mt-1.5" />
                </div>
                <div className="flex-1 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1609137144822-259dbb3f6381?auto=format&fit=crop&w=400&q=80"
                    alt="Traditional Brass Diya Puja"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Row 3, Col 2: Yellow Solid Square with 'SHARED ACROSS THE WORLD' */}
              <div 
                className="w-full h-full bg-[#E5B54F] rounded-xl p-4 sm:p-5 flex flex-col justify-center text-[#1F1F1F] shadow-sm hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundColor: '#E5B54F' }}
              >
                <span className="font-bold text-[11px] sm:text-xs tracking-wider uppercase leading-snug">
                  SHARED<br />ACROSS<br />THE WORLD
                </span>
                <div className="w-6 h-0.5 bg-[#1F1F1F]/70 mt-2" />
              </div>

              {/* Row 3, Col 3: Peach Quarter-Circle (Top-Left Rounded) with Diagonal Arrow */}
              <div 
                className="w-full h-full bg-[#F3C4B3] rounded-tl-[100%] rounded-tr-none rounded-bl-none rounded-br-none p-4 sm:p-6 flex items-end justify-end shadow-sm hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundColor: '#F3C4B3' }}
              >
                <ArrowUpRight className="w-7 h-7 sm:w-9 h-9 text-[#1F1F1F]" />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
