import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MOMENT_CARDS = [
  // Top Row (3 cards)
  {
    id: 1,
    tag: 'Baby Shower',
    tagBg: 'bg-[#EAF3EB]',
    tagText: 'text-[#3E6D47]',
    quote: 'The designs are unique and elegant. We got exactly what we wanted, and the team was very supportive throughout.',
    name: 'Neha V.',
    role: 'Chennai, India · Doctor',
    rotation: -3.5,
    delay: 0.08,
    row: 'top',
    parallaxSpeed: [45, -45],
  },
  {
    id: 2,
    tag: 'Wedding & Sangeet',
    tagBg: 'bg-[#FDF0ED]',
    tagText: 'text-[#8F473E]',
    quote: 'Our wedding invite blew all our guests away! The RSVP tracking and background music made it feel like a royal celebration.',
    name: 'Ananya & Arjun',
    role: 'Jaipur, India · Architects',
    rotation: -1,
    delay: 0.16,
    row: 'top',
    parallaxSpeed: [75, -75],
  },
  {
    id: 3,
    tag: 'Housewarming',
    tagBg: 'bg-[#F4ECF5]',
    tagText: 'text-[#7D4F84]',
    quote: 'Simple, beautiful and customizable. Loved the variety of templates — it made our housewarming invite so special.',
    name: 'Rohit I.',
    role: 'Pune, India · Business Owner',
    rotation: 3.5,
    delay: 0.24,
    row: 'top',
    parallaxSpeed: [50, -50],
  },
  // Bottom Row (2 cards)
  {
    id: 4,
    tag: 'Baby Shower',
    tagBg: 'bg-[#EAF3EB]',
    tagText: 'text-[#3E6D47]',
    quote: 'Every guest commented on how lovely the animations were. Super responsive on mobile phones and made RSVP so easy.',
    name: 'Pooja & Rohan',
    role: 'Bengaluru, India · Tech Lead',
    rotation: 2.8,
    delay: 0.32,
    row: 'bottom',
    parallaxSpeed: [60, -60],
  },
  {
    id: 5,
    tag: 'Birthday Celebration',
    tagBg: 'bg-[#FDF6E8]',
    tagText: 'text-[#7E5E2B]',
    quote: 'The personalized music and countdown created so much excitement before the party. Truly unforgettable experience!',
    name: 'Kavita & Rajesh',
    role: 'Mumbai, India · Creative Directors',
    rotation: -2.8,
    delay: 0.40,
    row: 'bottom',
    parallaxSpeed: [80, -80],
  },
];

function ParallaxCard({ card, scrollYProgress }) {
  // As the user scrolls down through the section, card floats upwards!
  const yParallax = useTransform(scrollYProgress, [0, 1], card.parallaxSpeed);

  return (
    <motion.div style={{ y: yParallax }} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 90, scale: 0.94 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: card.rotation,
        }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: 0.75,
          delay: card.delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.04,
          rotate: 0,
          y: -8,
          transition: { duration: 0.3 },
        }}
        className="bg-white/85 backdrop-blur-xl border border-stone-200/70 rounded-[28px] p-6 sm:p-7 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.07)] hover:shadow-[0_25px_50px_-10px_rgba(78,29,29,0.12)] transition-shadow duration-300 flex flex-col justify-between cursor-default"
        style={{
          boxShadow:
            '0 20px 45px -10px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset',
        }}
      >
        <div>
          {/* Header: Tag Pill + Quote Icon */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <span
              className={`inline-block text-[11px] sm:text-xs font-semibold px-3.5 py-1 rounded-full ${card.tagBg} ${card.tagText}`}
            >
              {card.tag}
            </span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-sm font-bold leading-none ${card.tagBg} ${card.tagText}`}
            >
              ❞
            </div>
          </div>

          {/* Body Quote */}
          <p className="text-[13px] sm:text-[14px] text-stone-700 leading-relaxed font-normal mb-6">
            {card.quote}
          </p>
        </div>

        {/* Author Footer */}
        <div className="pt-2">
          <div className="font-bold text-[13.5px] sm:text-[14px] text-stone-900 leading-tight">
            {card.name}
          </div>
          <div className="text-[11px] sm:text-[11.5px] text-stone-400 font-medium mt-0.5">
            {card.role}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Moments() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.94, 1], [0.75, 1, 1, 0.6]);

  const topRow = MOMENT_CARDS.filter((c) => c.row === 'top');
  const bottomRow = MOMENT_CARDS.filter((c) => c.row === 'bottom');

  return (
    <motion.section
      ref={sectionRef}
      id="moments"
      style={{ opacity: sectionOpacity }}
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-white overflow-hidden flex flex-col justify-center items-center select-none"
    >
      {/* Background 'MOMENTS' Watermark Typography - reduced in size */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span
          className="font-bold tracking-wider text-[#DECFC9]/40 sm:text-[#DECFC9]/38 text-[4.5rem] sm:text-[7.5rem] md:text-[10rem] lg:text-[13rem] xl:text-[15.5rem] leading-none uppercase select-none transition-all duration-300"
          style={{
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: '0.06em',
            transform: 'translateY(-2%)',
          }}
        >
          MOMENTS
        </span>
      </div>

      {/* Floating Glass Cards Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row (3 Cards on Desktop, Staggered on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8 lg:mb-10">
          {topRow.map((card) => (
            <ParallaxCard key={card.id} card={card} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Bottom Row (2 Centered Cards on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
          {bottomRow.map((card) => (
            <ParallaxCard key={card.id} card={card} scrollYProgress={scrollYProgress} />
          ))}
        </div>

      </div>
    </motion.section>
  );
}
