import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const CAROUSEL_SECTIONS = [
  {
    id: 'wedding',
    title: 'Wedding/\nReception/\nSangeet....',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bannerColor: '#F3B749',
    titleColor: '#5A3D08',
    image: '/images/carousel-wedding.png',
    cardImage: '/images/card-wedding.png',
    accentTag: 'Wedding Celebrations'
  },
  {
    id: 'baby-shower',
    title: 'Baby\nShower',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bannerColor: '#0072C6',
    titleColor: '#FFFFFF',
    image: '/images/carousel-babyshower.png',
    cardImage: '/images/card-babyshower.png',
    accentTag: 'Pastel Baby Shower'
  },
  {
    id: 'birthday',
    title: 'Birthday\nParties',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bannerColor: '#F04C64',
    titleColor: '#FFFFFF',
    image: '/images/carousel-birthday.png',
    cardImage: '/images/card-birthday.png',
    accentTag: 'Fun & Playful'
  },
  {
    id: 'house-warming',
    title: 'House\nWarming',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bannerColor: '#2B4A2D',
    titleColor: '#FFFFFF',
    image: '/images/carousel-housewarming.png',
    cardImage: '/images/card-housewarming.png',
    accentTag: 'Griha Pravesh & Puja'
  }
];

export default function OccasionCarousel({ onSelectTemplate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fast automatic carousel transition (e.g. 3.2 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SECTIONS.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SECTIONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SECTIONS.length) % CAROUSEL_SECTIONS.length);
  };

  const current = CAROUSEL_SECTIONS[currentIndex];

  return (
    <section id="carousel" className="py-20 bg-white overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Matching Image 2 */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 justify-center mb-2">
            <span className="w-12 h-px bg-stone-300" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">
              FOR EVERY SPECIAL MOMENT
            </span>
            <span className="w-12 h-px bg-stone-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Create beutiful invitations
            <br />
            for life’s <span className="font-handwriting font-normal text-[#E5B54F] italic text-4xl sm:text-5xl lg:text-6xl">special moments</span>
          </h2>
        </div>

        {/* Carousel Outer Frame */}
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Wheel / Fade Slide Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[16/7.8] min-h-[360px] sm:min-h-[460px] flex items-center overflow-hidden"
              style={{ backgroundColor: current.bannerColor }}
            >
              {/* Background Color Split / Strip */}
              <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-end">
                {/* Full high-res mockup render from design attachment */}
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center sm:object-right"
                />
              </div>

              {/* Left Typography Overlay (matches layout from image 2, 3, 4, 5) */}
              <div className="relative z-10 max-w-sm sm:max-w-md p-6 sm:p-12 lg:p-16 flex flex-col justify-center">
                <h3 
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] whitespace-pre-line drop-shadow-sm"
                  style={{ color: current.titleColor }}
                >
                  {current.title}
                </h3>
                <p 
                  className="mt-4 text-xs sm:text-sm font-medium leading-relaxed max-w-xs drop-shadow-sm opacity-90"
                  style={{ color: current.titleColor }}
                >
                  {current.description}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Wheel Carousel Arrows (Changing with arrows & fast movement) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-stone-900 backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Occasion"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-stone-900 backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Next Occasion"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Quick Pagination Indicators Bar */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center items-center gap-2">
            {CAROUSEL_SECTIONS.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                title={sec.title.replace('\n', ' ')}
              />
            ))}
          </div>
        </div>

        {/* 4 Bottom Cards Preview Quick Switcher Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CAROUSEL_SECTIONS.map((sec, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={sec.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'border-brand-primary bg-brand-soft shadow-md scale-[1.02]'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full mb-2"
                  style={{ backgroundColor: sec.bannerColor }}
                />
                <span className="block font-bold text-xs sm:text-sm text-stone-900 whitespace-nowrap overflow-hidden text-ellipsis">
                  {sec.title.replace(/\n/g, ' ')}
                </span>
                <span className="text-[11px] text-stone-500 block mt-0.5">
                  {sec.accentTag}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
