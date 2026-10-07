import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const OCCASION_CARDS = [
  {
    id: 'wedding',
    category: 'wedding',
    title: 'Wedding/\nReception/\nSangeet....',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#F4BA44', // Warm Honey Gold from Reference Image 3
    titleColor: '#533705',
    subtextColor: '#533705',
    deviceImage: '/images/card-wedding-phones.png',
    accentTag: 'Wedding Celebrations',
    badge: 'Trending • Most Loved'
  },
  {
    id: 'baby-shower',
    category: 'baby-shower',
    title: 'Baby\nShower',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#0070C0', // Royal / Azure Blue from Reference Image 4
    titleColor: '#FFFFFF',
    subtextColor: '#E8F5FF',
    deviceImage: '/images/card-baby-devices.png',
    accentTag: 'Pastel Baby Shower',
    badge: 'Sweet Beginnings'
  },
  {
    id: 'birthday',
    category: 'birthday',
    title: 'Birthday\nParties',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#F44E66', // Coral Punch Pink from Reference Image 5
    titleColor: '#FFFFFF',
    subtextColor: '#FFEBF0',
    deviceImage: '/images/card-bday-devices.png',
    accentTag: 'Fun & Playful',
    badge: 'All Ages • Themes'
  },
  {
    id: 'house-warming',
    category: 'house-warming',
    title: 'House\nWarming',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#2E5131', // Forest Olive Emerald Green
    titleColor: '#FFFFFF',
    subtextColor: '#EEF6EE',
    deviceImage: '/images/card-house-devices.png',
    accentTag: 'Griha Pravesh & Puja',
    badge: 'Blessings & Rituals'
  }
];

export default function OccasionCarousel({ onSelectTemplate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const total = OCCASION_CARDS.length;

  useEffect(() => {
    if (isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4200);

    return () => clearInterval(timer);
  }, [isAutoPlayPaused, total]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const current = OCCASION_CARDS[activeIndex];

  // Cart-wheel 3D rotation variants matching the reference video/keyframe rotation
  const wheelVariants = {
    enter: (dir) => ({
      rotateZ: dir > 0 ? 12 : -12,
      rotateY: dir > 0 ? 15 : -15,
      scale: 0.88,
      x: dir > 0 ? 220 : -220,
      opacity: 0,
    }),
    center: {
      rotateZ: 0,
      rotateY: 0,
      scale: 1,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      rotateZ: dir > 0 ? -12 : 12,
      rotateY: dir > 0 ? -15 : 15,
      scale: 0.88,
      x: dir > 0 ? -220 : 220,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section 
      id="carousel" 
      className="py-16 sm:py-24 bg-white overflow-hidden relative select-none w-full"
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* ========================================================================= */}
        {/* TOP HEADER SECTION (Matching Reference Image 1)                           */}
        {/* ========================================================================= */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 justify-center mb-3">
            <span className="w-10 sm:w-16 h-px bg-stone-300" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-stone-500">
              FOR EVERY SPECIAL MOMENT
            </span>
            <span className="w-10 sm:w-16 h-px bg-stone-300" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.12]">
            Create beutiful invitations
            <br />
            for life’s{' '}
            <span className="font-['Caveat',cursive] font-normal text-[#E5B54F] italic text-4xl sm:text-6xl lg:text-7xl ml-1">
              special moments
            </span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* FULL SCREEN 3D WHEEL CAROUSEL STAGE                                      */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full [perspective:1400px] flex items-center justify-center min-h-[500px] sm:min-h-[560px] lg:min-h-[620px]"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          
          <div className="w-full relative flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={wheelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-stone-100 bg-white"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 
                  Card Container:
                  Half of the card height at the center has a vibrant colored rectangle
                  with left typography and right device assets, matching reference images 3, 4, 5
                */}
                <div className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-center overflow-hidden">
                  
                  {/* Colored Horizontal Rectangle through the center */}
                  <div 
                    className="absolute inset-y-[15%] sm:inset-y-[14%] inset-x-0 transition-colors duration-700 pointer-events-none"
                    style={{ backgroundColor: current.bgColor }}
                  />

                  {/* Left Text & Right Device Content Grid */}
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 xl:px-20 py-8">
                    
                    {/* LEFT COLUMN: Large Typography */}
                    <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
                      
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm self-start mb-4 border border-white/30">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span className="text-[11px] font-bold tracking-wider uppercase text-white">
                          {current.badge}
                        </span>
                      </div>

                      <h3 
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.04] whitespace-pre-line"
                        style={{ color: current.titleColor }}
                      >
                        {current.title}
                      </h3>

                      <p 
                        className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-md opacity-95"
                        style={{ color: current.subtextColor }}
                      >
                        {current.description}
                      </p>

                      <div className="mt-6 sm:mt-8 flex items-center gap-4">
                        <button
                          onClick={() => onSelectTemplate && onSelectTemplate(current.category)}
                          className="bg-[#4E1D1D] hover:bg-[#381313] text-white px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                        >
                          <span>Explore {current.title.split('/')[0].split('\n')[0]} Templates</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Realistic Device Assets & Mockups */}
                    <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center relative">
                      <div className="relative w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[720px] flex justify-end items-center">
                        <motion.img
                          key={current.deviceImage}
                          initial={{ opacity: 0, scale: 0.94, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                          src={current.deviceImage}
                          alt={current.title}
                          className="w-full h-auto max-h-[360px] sm:max-h-[440px] lg:max-h-[490px] object-contain object-right drop-shadow-2xl"
                        />
                      </div>
                    </div>

                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cart-Wheel Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-2xl border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous card"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-2xl border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next card"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Dots Indicator */}
          <div className="absolute bottom-4 inset-x-0 z-30 flex justify-center items-center gap-2.5">
            {OCCASION_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-10 bg-stone-900 shadow-md' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
                title={card.title.replace(/\n/g, ' ')}
              />
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4 CARDS PREVIEW BAR                                                       */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {OCCASION_CARDS.map((card, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={card.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xl scale-[1.02]'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div 
                    className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: card.bgColor }}
                  />
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                    isSelected ? 'text-amber-400' : 'text-stone-400'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                
                <h4 className="font-bold text-sm sm:text-base leading-tight">
                  {card.title.replace(/\n/g, ' ')}
                </h4>
                
                <span className={`text-xs block mt-1 ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}>
                  {card.accentTag}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

