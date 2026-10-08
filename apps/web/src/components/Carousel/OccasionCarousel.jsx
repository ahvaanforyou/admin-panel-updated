import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const OCCASION_CARDS = [
  {
    id: 'wedding',
    category: 'wedding',
    title: 'Wedding/\nReception/\nSangeet....',
    description: 'Thoughtfully designed digital invitations through websites for modern Indian couples and families, wherever you are.',
    bgColor: '#E6A935', // Honey Ochre from Reference Image
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
    bgColor: '#0070C0', // Royal / Azure Blue from Reference Image
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
    bgColor: '#F44E66', // Coral Punch Pink from Reference Image
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
  const [direction, setDirection] = useState(1);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const total = OCCASION_CARDS.length;

  // Preload all 4 images immediately so there is zero delay/lag on changing
  useEffect(() => {
    OCCASION_CARDS.forEach((card) => {
      const img = new Image();
      img.src = card.deviceImage;
    });
  }, []);

  // Scroll driven fade in and fade out like top section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.3, 1, 1, 0.4]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.96, 1, 1, 0.97]);
  const sectionY = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [40, 0, 0, -30]);

  // Auto transition every 6.5 seconds (6500ms) as requested
  useEffect(() => {
    if (isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6500);

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
      scale: 0.95,
      x: dir > 0 ? 180 : -180,
      opacity: 0,
    }),
    center: {
      rotateZ: 0,
      rotateY: 0,
      scale: 1,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      rotateZ: dir > 0 ? -12 : 12,
      rotateY: dir > 0 ? -15 : 15,
      scale: 0.95,
      x: dir > 0 ? -180 : 180,
      opacity: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <motion.section 
      ref={containerRef}
      id="carousel" 
      style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
      className="min-h-screen py-10 sm:py-14 bg-white overflow-hidden relative select-none w-full flex flex-col justify-center"
    >
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex-1 flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* TOP HEADER SECTION (Matching Reference Image 1)                           */}
        {/* ========================================================================= */}
        <div className="text-center mb-6 sm:mb-8 pt-4">
          <div className="inline-flex items-center gap-3 justify-center mb-2.5">
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
        {/* FULL PAGE CAROUSEL STAGE: Seamless edge-to-edge, NO card boundaries       */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full [perspective:1600px] flex items-center justify-center flex-1 my-2"
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
                className="w-full relative flex flex-col justify-center overflow-visible"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 
                  Full Width Section:
                  1. Deep colored horizontal sash / band (expanded to 80% of section height so button is cleanly inside)
                  2. Left typography safely nested inside the colored sash
                  3. Right devices sized uniformly with identical height container
                */}
                <div className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center">
                  
                  {/* Colored Horizontal Rectangle Strip (generous top and bottom height) */}
                  <div 
                    className="absolute inset-y-[8%] sm:inset-y-[10%] inset-x-0 w-full transition-colors duration-700 pointer-events-none rounded-3xl sm:rounded-[36px] shadow-sm"
                    style={{ backgroundColor: current.bgColor }}
                  />

                  {/* Left Text & Right Device Content Grid */}
                  <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 xl:px-20 py-6 sm:py-8">
                    
                    {/* LEFT COLUMN: Large Typography aligned securely inside color sash */}
                    <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center py-4">
                      
                      <h3 
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.04] whitespace-pre-line drop-shadow-sm"
                        style={{ color: current.titleColor }}
                      >
                        {current.title}
                      </h3>

                      <p 
                        className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-md opacity-95"
                        style={{ color: current.subtextColor }}
                      >
                        {current.description}
                      </p>

                      <div className="mt-5 sm:mt-6 flex items-center gap-4">
                        <button
                          onClick={() => onSelectTemplate && onSelectTemplate(current.category)}
                          className="bg-[#4E1D1D] hover:bg-[#381313] text-white px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5"
                        >
                          <span>Explore {current.title.split('/')[0].split('\n')[0]} Templates</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Uniform height and width, NO expanding or jumping */}
                    <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center relative overflow-visible">
                      <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] flex justify-end items-center overflow-visible">
                        <img
                          src={current.deviceImage}
                          alt={current.title}
                          className="w-auto h-full max-h-[440px] sm:max-h-[500px] lg:max-h-[560px] max-w-full object-contain object-right drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] filter pointer-events-none transition-none"
                        />
                      </div>
                    </div>

                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Frosted Glass Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/30 hover:bg-white/60 active:bg-white/80 text-stone-900/80 hover:text-stone-900 border border-white/50 backdrop-blur-md shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Previous occasion"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/30 hover:bg-white/60 active:bg-white/80 text-stone-900/80 hover:text-stone-900 border border-white/50 backdrop-blur-md shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Next occasion"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Bottom Dots Indicator */}
          <div className="absolute -bottom-6 inset-x-0 z-30 flex justify-center items-center gap-2">
            {OCCASION_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
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

