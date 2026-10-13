import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const OCCASION_CARDS = [
  {
    id: 'wedding',
    category: 'wedding',
    title: 'Wedding/\nReception/\nSangeet....',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#E6A935', // Honey Ochre
    titleColor: '#3F2703',
    subtextColor: '#4A3005',
    deviceImage: '/images/fullscreen-wedding-trans.webp',
    accentTag: 'Wedding Celebrations',
    badge: 'Trending • Most Loved'
  },
  {
    id: 'baby-shower',
    category: 'baby-shower',
    title: 'Baby\nShower',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#0070C0', // Royal / Azure Blue
    titleColor: '#FFFFFF',
    subtextColor: '#E8F5FF',
    deviceImage: '/images/fullscreen-babyshower-trans.webp',
    accentTag: 'Pastel Baby Shower',
    badge: 'Sweet Beginnings'
  },
  {
    id: 'birthday',
    category: 'birthday',
    title: 'Birthday\nParties',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#F44E66', // Coral Punch Pink
    titleColor: '#FFFFFF',
    subtextColor: '#FFEBF0',
    deviceImage: '/images/fullscreen-birthday-trans.webp',
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
    deviceImage: '/images/fullscreen-housewarming-trans.webp',
    accentTag: 'Griha Pravesh & Puja',
    badge: 'Blessings & Rituals'
  }
];

export default function OccasionCarousel({ onSelectTemplate }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const total = OCCASION_CARDS.length;

  // Preload all 4 images
  useEffect(() => {
    OCCASION_CARDS.forEach((card) => {
      const img = new Image();
      img.src = card.deviceImage;
    });
  }, []);

  // Scroll driven fade in and fade out
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.7, 1, 1, 0.6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.96, 1, 1, 0.97]);
  const sectionY = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [40, 0, 0, -30]);

  // Auto transition every 4.8 seconds
  useEffect(() => {
    if (isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4800);

    return () => clearInterval(timer);
  }, [isAutoPlayPaused, total]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <motion.section 
      ref={containerRef}
      id="carousel" 
      style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
      className="min-h-screen py-10 sm:py-14 bg-white overflow-hidden relative select-none w-full flex flex-col justify-center"
    >
      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12 flex-1 flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* TOP HEADER SECTION                                                        */}
        {/* ========================================================================= */}
        <div className="text-center mb-6 sm:mb-8 pt-4">
          <div className="inline-flex items-center gap-3 justify-center mb-2.5">
            <span className="w-10 sm:w-16 h-px bg-stone-300" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-stone-500">
              FOR EVERY SPECIAL MOMENT
            </span>
            <span className="w-10 sm:w-16 h-px bg-stone-300" />
          </div>

          <motion.h2 
            initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.12]"
          >
            Create beautiful invitations
            <br />
            for life’s
            <span className="inline-block w-2.5 sm:w-3.5" />
            <span className="font-['Playwrite_US_Trad',cursive] font-normal text-[#E5B54F] text-3xl sm:text-5xl lg:text-6xl">
              special moments
            </span>
          </motion.h2>
        </div>

        {/* ========================================================================= */}
        {/* 3D EXPANDING COVER-FLOW CAROUSEL: Before & After cards visible in background */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full flex items-center justify-center flex-1 my-2 overflow-visible min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          
          {/* Card Deck Stage */}
          <div className="w-full relative h-[450px] sm:h-[510px] lg:h-[570px] flex items-center justify-center overflow-visible">
            {OCCASION_CARDS.map((card, idx) => {
              // Calculate circular distance relative to activeIndex
              let diff = (idx - activeIndex) % total;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              // Compute positioning & expansion scale
              let xPos = '0%';
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isActive) {
                xPos = '0%';
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isPrev) {
                // Before card visible in background on the left
                xPos = '-75%';
                scale = 0.86;
                opacity = 0.45;
                zIndex = 10;
              } else if (isNext) {
                // After card visible in background on the right
                xPos = '75%';
                scale = 0.86;
                opacity = 0.45;
                zIndex = 10;
              } else {
                // Other cards hidden offscreen
                xPos = diff > 0 ? '140%' : '-140%';
                scale = 0.75;
                opacity = 0;
                zIndex = 0;
              }

              return (
                <motion.div
                  key={card.id}
                  animate={{
                    x: xPos,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 28,
                  }}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                  className={`absolute inset-x-0 mx-auto w-[90%] sm:w-[86%] lg:w-[80%] xl:w-[76%] max-w-[1380px] ${
                    !isActive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                  }`}
                  style={{
                    zIndex,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative w-full h-[450px] sm:h-[510px] lg:h-[570px] flex items-center">
                    
                    {/* Colored Horizontal Rectangle Strip with soft shadow */}
                    <div 
                      className="absolute inset-y-[5%] sm:inset-y-[6%] inset-x-0 w-full rounded-3xl sm:rounded-[36px] shadow-lg pointer-events-none transition-colors duration-500"
                      style={{ backgroundColor: card.bgColor }}
                    />

                    {/* Content inside card */}
                    <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 px-6 sm:px-10 lg:px-12 xl:px-16 py-6 sm:py-8 h-full">
                      
                      {/* Left Typography Column */}
                      <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center py-2">
                        <h3 
                          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05] whitespace-pre-line drop-shadow-xs"
                          style={{ color: card.titleColor }}
                        >
                          {card.title}
                        </h3>

                        <p 
                          className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base font-medium leading-relaxed max-w-md opacity-95"
                          style={{ color: card.subtextColor }}
                        >
                          {card.description}
                        </p>

                        <div className="mt-5 sm:mt-6 flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isActive && onSelectTemplate) {
                                onSelectTemplate(card.category);
                              }
                            }}
                            className="bg-[#4E1D1D] hover:bg-[#381313] active:scale-95 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                          >
                            <span>Explore {card.title.split('/')[0].split('\n')[0]} Templates</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right Device Mockup Column */}
                      <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center relative overflow-visible h-full">
                        <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[490px] flex justify-end items-center overflow-visible">
                          <img
                            src={card.deviceImage}
                            alt={card.title}
                            className="w-auto h-full max-h-[360px] sm:max-h-[430px] lg:max-h-[490px] max-w-full object-contain object-right drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows floating over outer edges */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/75 hover:bg-white text-stone-900 border border-white/80 backdrop-blur-md shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Previous occasion"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/75 hover:bg-white text-stone-900 border border-white/80 backdrop-blur-md shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Next occasion"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Bottom Dots Indicator */}
          <div className="absolute -bottom-6 inset-x-0 z-40 flex justify-center items-center gap-2">
            {OCCASION_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-stone-900/80 shadow-sm' : 'w-2 bg-stone-300/80 hover:bg-stone-400'
                }`}
                title={card.title.replace(/\n/g, ' ')}
              />
            ))}
          </div>

        </div>

      </div>
    </motion.section>
  );
}
