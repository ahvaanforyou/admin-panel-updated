import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Users, Globe, Image as ImageIcon, MessageCircle } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

// 5 Floating Badges on the right of the phone mockup
const FLOATING_BADGES = [
  {
    id: 'details',
    img: '/images/pill-event-details.png',
    alt: 'Event Details',
    topOffset: '8%',
    rightOffset: '-4%',
    bobDuration: 4.2,
    bobDelay: 0.1,
  },
  {
    id: 'location',
    img: '/images/pill-location-maps.png',
    alt: 'Location & Maps',
    topOffset: '25%',
    rightOffset: '-8%',
    bobDuration: 4.8,
    bobDelay: 0.4,
  },
  {
    id: 'gallery',
    img: '/images/pill-photos-gallery.png',
    alt: 'Photos & Gallery',
    topOffset: '42%',
    rightOffset: '-5%',
    bobDuration: 5.1,
    bobDelay: 0.7,
  },
  {
    id: 'music',
    img: '/images/pill-music.png',
    alt: 'Music',
    topOffset: '59%',
    rightOffset: '-10%',
    bobDuration: 4.5,
    bobDelay: 0.3,
  },
  {
    id: 'rsvp',
    img: '/images/pill-rsvp.png',
    alt: 'RSVP',
    topOffset: '76%',
    rightOffset: '-6%',
    bobDuration: 4.9,
    bobDelay: 0.5,
  },
];

// 4 Problem Cards (Matching Reference Attachment 5)
const PROBLEM_CARDS = [
  {
    id: 1,
    icon: (
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center relative shadow-sm">
        {/* Gallery Painting Emoji/Icon */}
        <span className="text-2xl select-none">🖼️</span>
        {/* WhatsApp Green Notification Bubble */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center shadow-xs">
          <MessageCircle className="w-2.5 h-2.5 text-white fill-white" />
        </div>
      </div>
    ),
    title: 'Just another forwarded image',
    description:
      'Sending a JPG, PNG or video through WhatsApp can easily get buried between hundreds of other messages.',
  },
  {
    id: 2,
    icon: (
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center relative shadow-sm">
        <span className="text-2xl select-none">📍</span>
      </div>
    ),
    title: 'Where exactly is the venue?',
    description:
      'Guests often have to ask for the location separately, search for the venue themselves, or open another message just to find the map.',
  },
  {
    id: 3,
    icon: (
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center relative shadow-sm">
        <span className="text-2xl select-none">👥</span>
      </div>
    ),
    title: "Who's actually coming?",
    description:
      "With a simple image or video, there's no easy way to know who's attending, who's bringing someone along, or who hasn't responded yet.",
  },
  {
    id: 4,
    icon: (
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center relative shadow-sm">
        <span className="text-2xl select-none">🌍</span>
      </div>
    ),
    title: 'Not everyone is nearby',
    description:
      "Family and friends may be in another city, another country, or even on the other side of the world. Physical cards aren't always practical.",
  },
];

export default function HowItWorksPage({ onNavigate, onOpenCreateModal }) {
  const heroRef = useRef(null);

  // Scroll fade-out animation for Section 1 as user scrolls down
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0.08]);
  const heroScale = useTransform(heroScroll, [0, 0.7], [1, 0.96]);
  const heroY = useTransform(heroScroll, [0, 0.7], [0, -50]);

  const cursiveWord1 = 'forwarded image.';
  const cursiveWord2 = 'complicated.';

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-[#4E1D1D] selection:text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO (Matching Reference Attachment 2 & Assets 3, 4)           */}
      {/* ========================================================================= */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="w-full min-h-screen pt-28 sm:pt-32 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 flex items-center justify-center relative overflow-hidden bg-white select-none"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Cursive stroke reveal, Paragraphs & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10">
            
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-stone-400 uppercase mb-4 sm:mb-6">
              HOW AHVAAN FOR YOU WORKS
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-bold text-stone-900 tracking-tight leading-[1.12]">
              Your celebration
              <br />
              deserves more than a
              <br />
              {/* Cursive Stroke Reveal Animation */}
              <span className="font-['Caveat',cursive] text-[3.4rem] sm:text-[4.4rem] lg:text-[5rem] text-[#8C3A27] font-bold leading-none inline-flex mt-1 tracking-normal">
                {cursiveWord1.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.82,
                      y: 6,
                      filter: 'blur(2px)',
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      filter: 'blur(0px)',
                    }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.28,
                      delay: 0.15 + index * 0.045,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="inline-block transform-gpu origin-bottom-left"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Paragraphs */}
            <p className="mt-6 text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed font-normal">
              Create a beautiful digital invitation that brings together your event details, location, photos, music, RSVP and more in one easy-to-share experience.
            </p>

            <p className="mt-3.5 text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed font-normal">
              Whether it's a wedding, birthday, baby shower or housewarming, invite everyone, wherever they are.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate('/#templates')}
                className="bg-[#4E1D1D] hover:bg-[#381414] text-white px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Invitations</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenCreateModal}
                className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300/80 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-2xs hover:border-stone-400 transition-all duration-300"
              >
                Contact us
              </button>
            </div>

          </div>

          {/* Right Column: Tilted Phone Mockup & 5 Floating Pill Badges */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full pt-4 lg:pt-0">
            <div className="relative w-full max-w-[500px] sm:max-w-[560px] flex items-center justify-center">
              
              {/* Tilted Phone Image with Shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[270px] sm:w-[330px] md:w-[360px] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              >
                <img
                  src="/images/how-it-works-phone.png"
                  alt="Ahvaan for You Mobile Wedding Invitation Mockup"
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </motion.div>

              {/* 5 Stacked Floating Pills along the right of the phone */}
              <div className="absolute right-0 sm:-right-4 inset-y-0 w-[170px] sm:w-[210px] md:w-[230px] flex flex-col justify-around py-4 z-20 pointer-events-auto">
                {FLOATING_BADGES.map((badge, idx) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: 40, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      y: [0, -6, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: 0.3 + idx * 0.12 },
                      x: { duration: 0.6, delay: 0.3 + idx * 0.12 },
                      scale: { duration: 0.6, delay: 0.3 + idx * 0.12 },
                      y: {
                        duration: badge.bobDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: badge.bobDelay,
                      },
                    }}
                    whileHover={{ scale: 1.06, x: 4 }}
                    className="w-full filter drop-shadow-[0_8px_16px_rgba(78,29,29,0.1)] transition-transform cursor-pointer"
                  >
                    <img
                      src={badge.img}
                      alt={badge.alt}
                      className="w-full h-auto object-contain select-none"
                    />
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE PROBLEM (Matching Reference Attachment 5)                  */}
      {/* ========================================================================= */}
      <section
        id="problem"
        className="w-full py-20 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#B84A39] uppercase block mb-3">
              THE PROBLEM
            </span>

            {/* Headline with Cursive Reveal for 'complicated.' */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-stone-900 tracking-tight leading-tight">
              Sending an invitation shouldn't feel this{' '}
              <span className="font-['Caveat',cursive] text-4xl sm:text-5xl lg:text-6xl text-[#8C3A27] font-bold inline-block ml-1">
                {cursiveWord2.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.82,
                      y: 6,
                      filter: 'blur(2px)',
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      filter: 'blur(0px)',
                    }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.28,
                      delay: 0.12 + index * 0.045,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="inline-block transform-gpu origin-bottom-left"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl mx-auto">
              Traditional cards and static digital invites often leave important details scattered across messages, calls and photos.
            </p>
          </div>

          {/* 4 Emergence Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 mt-12 sm:mt-16">
            {PROBLEM_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: -60, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 15,
                  delay: idx * 0.12,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.25 },
                }}
                className="bg-[#462121] text-white rounded-[26px] p-7 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[360px] shadow-[0_20px_45px_-12px_rgba(70,33,33,0.35)] border border-white/5 cursor-default"
              >
                <div>
                  {/* Icon */}
                  <div className="mb-6">{card.icon}</div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-300/85 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="w-8 h-1 bg-white/10 rounded-full mt-6" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <Footer
        onCategoryClick={() => onNavigate && onNavigate('/#templates')}
        onCreateClick={onOpenCreateModal}
      />
    </div>
  );
}
