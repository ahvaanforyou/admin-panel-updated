import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SpecialMomentsHandwriting from './SpecialMomentsHandwriting';

export const OCCASION_CARDS = [
  {
    id: 'wedding',
    category: 'wedding',
    title: 'Wedding/\nReception/\nSangeet....',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#E6A935', // Honey Ochre
    titleColor: '#3F2703',
    subtextColor: '#4A3005',
    deviceImage: '/images/fullscreen-wedding-trans-2x.png',
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
    deviceImage: '/images/fullscreen-babyshower-trans-2x.png',
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
    deviceImage: '/images/fullscreen-birthday-trans-2x.png',
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
    deviceImage: '/images/fullscreen-housewarming-trans-2x.png',
    accentTag: 'Griha Pravesh & Puja',
    badge: 'Blessings & Rituals'
  }
];

export default function OccasionCarousel({ onSelectTemplate }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const total = OCCASION_CARDS.length;

  // Preload all 4 high-resolution images
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

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.82, 0.98], [0.6, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 0.98], [0.96, 1, 1, 0.95]);
  const sectionY = useTransform(scrollYProgress, [0, 0.18, 0.82, 0.98], [40, 0, 0, -40]);
  const sectionVisibility = useTransform(scrollYProgress, (v) => (v >= 0.98 ? 'hidden' : 'visible'));
  const sectionPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.95 ? 'none' : 'auto'));

  // Auto transition every 2.3 seconds with smooth gliding physics
  useEffect(() => {
    if (isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2300);

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
      style={{ 
        opacity: sectionOpacity, 
        scale: sectionScale, 
        y: sectionY,
        visibility: sectionVisibility,
        pointerEvents: sectionPointerEvents,
      }}
      className="min-h-screen py-12 sm:py-16 lg:py-20 bg-white overflow-hidden relative select-none w-full flex flex-col justify-center"
    >
      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12 flex-1 flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* TOP HEADER SECTION                                                        */}
        {/* ========================================================================= */}
        <div className="text-center mb-8 sm:mb-12 pt-4">
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
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.2] overflow-visible"
          >
            Create beautiful invitations
            <br />
            for life’s{' '}
            <span className="font-['Playwrite_US_Trad',cursive] font-normal text-[#F5CD51] not-italic text-3xl sm:text-5xl lg:text-6xl inline-block px-2 overflow-visible">
              special moments
            </span>
          </motion.h2>
        </div>

        {/* ========================================================================= */}
        {/* 3D EXPANDING COVER-FLOW CAROUSEL: Responsive Compact Mobile Cards         */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full flex items-center justify-center flex-1 my-2 sm:my-5 overflow-visible min-h-[360px] min-[400px]:min-h-[390px] sm:min-h-[460px] lg:min-h-[540px] xl:min-h-[600px]"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          
          {/* Card Deck Stage */}
          <div className="w-full relative h-[370px] min-[400px]:h-[400px] sm:h-[480px] lg:h-[560px] xl:h-[620px] flex items-center justify-center overflow-visible">
            {OCCASION_CARDS.map((card, idx) => {
              // Calculate circular distance relative to activeIndex
              let diff = (idx - activeIndex) % total;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              // Positioning & expansion scale
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
                xPos = '-74%';
                scale = 0.85;
                opacity = 0.45;
                zIndex = 10;
              } else if (isNext) {
                // After card visible in background on the right
                xPos = '74%';
                scale = 0.85;
                opacity = 0.45;
                zIndex = 10;
              } else {
                // Other cards offscreen
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
                    stiffness: 175,
                    damping: 25,
                  }}
                  onClick={() => {
                    if (isPrev) handlePrev();
                    if (isNext) handleNext();
                  }}
                  className={`absolute inset-x-0 mx-auto w-[94%] sm:w-[90%] lg:w-[86%] xl:w-[82%] max-w-[1560px] ${
                    !isActive ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                  }`}
                  style={{
                    zIndex,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative w-full h-[360px] min-[400px]:h-[390px] sm:h-[460px] lg:h-[540px] xl:h-[600px] flex items-center">
                    
                    {/* Colored Background Sash / Box */}
                    <div 
                      className="absolute inset-y-0.5 sm:inset-y-[4%] lg:inset-y-[8%] inset-x-0 w-full rounded-2xl sm:rounded-[36px] lg:rounded-[42px] shadow-xl pointer-events-none transition-colors duration-500"
                      style={{ backgroundColor: card.bgColor }}
                    />

                    {/* Content Grid */}
                    <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-2 sm:gap-6 lg:gap-8 px-4 min-[400px]:px-6 sm:px-10 lg:px-14 xl:px-18 h-full py-3 min-[400px]:py-4 lg:py-0">
                      
                      {/* Left Column: Typography & Button */}
                      <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center z-20 max-w-xl">
                        <h3 
                          className="text-xl min-[360px]:text-2xl min-[480px]:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.04] whitespace-normal sm:whitespace-pre-line drop-shadow-xs"
                          style={{ color: card.titleColor }}
                        >
                          {card.title}
                        </h3>

                        <p 
                          className="mt-1.5 sm:mt-3 lg:mt-4 text-[11px] min-[400px]:text-xs sm:text-sm lg:text-base font-medium leading-relaxed max-w-md opacity-95 line-clamp-2 sm:line-clamp-none"
                          style={{ color: card.subtextColor }}
                        >
                          {card.description}
                        </p>

                        <div className="mt-2.5 sm:mt-5 lg:mt-6 flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isActive && onSelectTemplate) {
                                onSelectTemplate(card.category);
                              }
                            }}
                            className="bg-[#4E1D1D] hover:bg-[#381313] active:scale-95 text-white px-4 min-[400px]:px-5 sm:px-8 py-2 min-[400px]:py-2.5 sm:py-3.5 rounded-full text-[11px] min-[400px]:text-xs sm:text-sm lg:text-base font-bold tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <span>Explore {card.title.split('/')[0].split('\n')[0]} Templates</span>
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 
                        Right Column: Controlled Pop-Out 3D Devices
                        - Proportional height on mobile, 3D breakout on desktop
                      */}
                      <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center relative overflow-visible h-full">
                        <div className="relative w-full h-[140px] min-[400px]:h-[160px] sm:h-[240px] lg:h-[460px] xl:h-[520px] flex justify-center lg:justify-end items-center overflow-visible my-0 lg:-my-8">
                          <img
                            src={card.deviceImage}
                            alt={card.title}
                            className="w-auto h-full max-h-[140px] min-[400px]:max-h-[160px] sm:max-h-[240px] lg:max-h-[460px] xl:max-h-[520px] max-w-full object-contain object-center lg:object-right drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)] lg:drop-shadow-[0_24px_35px_rgba(0,0,0,0.32)] pointer-events-none"
                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                            loading="eager"
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
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-white text-stone-900 border border-white/90 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Previous occasion"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/80 hover:bg-white text-stone-900 border border-white/90 backdrop-blur-md shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Next occasion"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Dots Indicator */}
          <div className="absolute -bottom-8 inset-x-0 z-40 flex justify-center items-center gap-2.5">
            {OCCASION_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-10 bg-stone-900/85 shadow-sm' : 'w-2.5 bg-stone-300/80 hover:bg-stone-400'
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
