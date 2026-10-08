import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  XCircle,
  CheckCircle2,
  MapPin,
  Users,
  Music2,
  Image as ImageIcon,
  CalendarDays,
  Send,
  Sparkles,
} from 'lucide-react';
import Footer from '../../components/Footer/Footer';

// Helper component for cursive write-on stroke animation using Playwrite US Traditional
function CursiveStrokeText({ text, className = '' }) {
  return (
    <span
      className={`font-['Playwrite_US_Trad',cursive] font-normal inline-flex leading-tight tracking-normal select-none ${className}`}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            scale: 0.82,
            y: 8,
            filter: 'blur(3px)',
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
  );
}

// 5 Floating Badges on the right of the phone mockup
const FLOATING_BADGES = [
  {
    id: 'details',
    img: '/images/pill-event-details.png',
    alt: 'Event Details',
    parallax: [35, -35],
    bobDuration: 4.2,
    bobDelay: 0.1,
  },
  {
    id: 'location',
    img: '/images/pill-location-maps.png',
    alt: 'Location & Maps',
    parallax: [60, -60],
    bobDuration: 4.8,
    bobDelay: 0.35,
  },
  {
    id: 'gallery',
    img: '/images/pill-photos-gallery.png',
    alt: 'Photos & Gallery',
    parallax: [25, -25],
    bobDuration: 5.2,
    bobDelay: 0.65,
  },
  {
    id: 'music',
    img: '/images/pill-music.png',
    alt: 'Music',
    parallax: [70, -70],
    bobDuration: 4.5,
    bobDelay: 0.25,
  },
  {
    id: 'rsvp',
    img: '/images/pill-rsvp.png',
    alt: 'RSVP',
    parallax: [45, -45],
    bobDuration: 5.0,
    bobDelay: 0.5,
  },
];

// 4 Problem Cards (Section 2 - Attachment 5)
const PROBLEM_CARDS = [
  {
    id: 1,
    icon: (
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center relative shadow-sm">
        <span className="text-2xl select-none">🖼️</span>
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

// 6 Feature Cards (Section 4 - Attachment 1 lower half)
const FEATURE_CARDS = [
  {
    id: 'location',
    icon: (
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md text-red-500">
        <MapPin className="w-5 h-5 fill-red-500 text-red-500" />
      </div>
    ),
    title: 'Location',
    description: 'Add your venue and make it easy for guests to find their way with maps.',
  },
  {
    id: 'rsvp',
    icon: (
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md text-sky-600">
        <Users className="w-5 h-5 fill-sky-500 text-sky-500" />
      </div>
    ),
    title: 'RSVP',
    description: "Know who's joining your celebration without chasing replies.",
  },
  {
    id: 'music',
    icon: (
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md text-amber-600">
        <Music2 className="w-5 h-5 text-stone-800" />
      </div>
    ),
    title: 'Music',
    description: 'Set the mood with music that makes the invitation feel personal.',
  },
  {
    id: 'photos',
    icon: (
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
        <span className="text-xl">🖼️</span>
      </div>
    ),
    title: 'Photos',
    description: 'Share your favorite memories and moments with your guests.',
  },
  {
    id: 'details',
    icon: (
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
        <span className="text-xl">📅</span>
      </div>
    ),
    title: 'Event Details',
    description: 'Keep dates, timings and multiple functions organized in one place.',
  },
  {
    id: 'share',
    icon: (
      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md text-teal-600">
        <Send className="w-5 h-5 fill-teal-500 text-teal-500" />
      </div>
    ),
    title: 'Share Anywhere',
    description: 'Send your invitation to family and friends across cities, countries and time zones.',
  },
];

export default function HowItWorksPage({ onNavigate, onOpenCreateModal }) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  // Section 1 scroll fade-out & tiny cards parallax
  const { scrollYProgress: s1Progress } = useScroll({
    target: section1Ref,
    offset: ['start start', 'end start'],
  });
  const s1Opacity = useTransform(s1Progress, [0, 0.75], [1, 0.05]);
  const s1Y = useTransform(s1Progress, [0, 0.75], [0, -50]);

  // Section 2 scroll fade-out
  const { scrollYProgress: s2Progress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });
  const s2Opacity = useTransform(s2Progress, [0, 0.15, 0.82, 1], [0.3, 1, 1, 0.1]);

  // Section 3 scroll fade-out
  const { scrollYProgress: s3Progress } = useScroll({
    target: section3Ref,
    offset: ['start end', 'end start'],
  });
  const s3Opacity = useTransform(s3Progress, [0, 0.15, 0.82, 1], [0.3, 1, 1, 0.1]);

  // Section 4 scroll fade-out
  const { scrollYProgress: s4Progress } = useScroll({
    target: section4Ref,
    offset: ['start end', 'end start'],
  });
  const s4Opacity = useTransform(s4Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-[#4E1D1D] selection:text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO (Matching Reference Attachment 2)                         */}
      {/* ========================================================================= */}
      <motion.section
        ref={section1Ref}
        style={{ opacity: s1Opacity, y: s1Y }}
        className="w-full min-h-screen pt-28 sm:pt-32 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 flex items-center justify-center relative overflow-hidden bg-white select-none"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Cursive stroke reveal, Paragraphs & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10">
            {/* Eyebrow with blur reveal */}
            <motion.span
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-stone-400 uppercase mb-4 sm:mb-6"
            >
              HOW AHVAAN FOR YOU WORKS
            </motion.span>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.65rem] font-bold text-stone-900 tracking-tight leading-[1.12]"
            >
              Your celebration
              <br />
              deserves more than a
              <br />
              <CursiveStrokeText
                text="forwarded image."
                className="text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem] text-[#8C3A27] mt-1"
              />
            </motion.h1>

            {/* Paragraphs with blur reveal */}
            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed font-normal"
            >
              Create a beautiful digital invitation that brings together your event details, location, photos, music, RSVP and more in one easy-to-share experience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3.5 text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed font-normal"
            >
              Whether it's a wedding, birthday, baby shower or housewarming, invite everyone, wherever they are.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
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
            </motion.div>
          </div>

          {/* Right Column: Tilted Phone (Background removed) & 5 Responsive Scroll-Parallax Pills */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full pt-4 lg:pt-0">
            <div className="relative w-full max-w-[500px] sm:max-w-[560px] flex items-center justify-center">
              
              {/* Tilted Phone Image with Transparent Cutout & Soft Filter Shadow */}
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

              {/* 5 Stacked Floating Pills with Scroll-Linked Parallax & Smooth Bobbing */}
              <div className="absolute right-0 sm:-right-4 inset-y-0 w-[170px] sm:w-[210px] md:w-[230px] flex flex-col justify-around py-4 z-20 pointer-events-auto">
                {FLOATING_BADGES.map((badge, idx) => {
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, x: 40, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        y: [0, -7, 0],
                      }}
                      transition={{
                        opacity: { duration: 0.6, delay: 0.2 + idx * 0.1 },
                        x: { duration: 0.6, delay: 0.2 + idx * 0.1 },
                        scale: { duration: 0.6, delay: 0.2 + idx * 0.1 },
                        y: {
                          duration: badge.bobDuration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: badge.bobDelay,
                        },
                      }}
                      whileHover={{ scale: 1.08, x: 6 }}
                      className="w-full filter drop-shadow-[0_8px_16px_rgba(78,29,29,0.12)] transition-transform cursor-pointer"
                    >
                      <img
                        src={badge.img}
                        alt={badge.alt}
                        className="w-full h-auto object-contain select-none"
                      />
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE PROBLEM (Matching Reference Attachment 5)                  */}
      {/* ========================================================================= */}
      <motion.section
        ref={section2Ref}
        style={{ opacity: s2Opacity }}
        id="problem"
        className="w-full py-20 sm:py-28 lg:py-32 bg-[#FAF8F5] relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Blur Reveal */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#B84A39] uppercase block mb-3"
            >
              THE PROBLEM
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-stone-900 tracking-tight leading-tight"
            >
              Sending an invitation shouldn't feel this{' '}
              <CursiveStrokeText
                text="complicated."
                className="text-3xl sm:text-4xl lg:text-5xl text-[#8C3A27] ml-1"
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl mx-auto"
            >
              Traditional cards and static digital invites often leave important details scattered across messages, calls and photos.
            </motion.p>
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
                  <div className="mb-6">{card.icon}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300/85 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
                <div className="w-8 h-1 bg-white/10 rounded-full mt-6" />
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 3: SIMPLER WAY TO INVITE (Comparison - Image 1 Top Half)          */}
      {/* ========================================================================= */}
      <motion.section
        ref={section3Ref}
        style={{ opacity: s3Opacity }}
        id="simpler-way"
        className="w-full py-24 sm:py-32 lg:py-36 bg-white relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Blur Reveal */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-stone-900 tracking-tight leading-tight"
            >
              There's a{' '}
              <CursiveStrokeText
                text="simpler way"
                className="text-3xl sm:text-4xl lg:text-5xl text-[#8C3A27] mx-1"
              />{' '}
              to invite.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3.5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl mx-auto"
            >
              See how Ahvaan makes the experience better for you and your guests.
            </motion.p>
          </div>

          {/* Two Large Comparison Cards (Enlarged & Spacious) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
            
            {/* Card Left: TRADITIONAL / STATIC INVITE */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-[#5B5959] text-white rounded-[32px] p-8 sm:p-10 shadow-2xl flex flex-col justify-between border border-white/10"
            >
              <div>
                {/* Pill Tag */}
                <div className="inline-block bg-white/20 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-8 tracking-wider">
                  TRADITIONAL / STATIC INVITE
                </div>

                {/* Top Row: Picture frame with traditional card + list of issues */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-7 mb-8">
                  {/* Photo frame containing traditional-card */}
                  <div className="w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg border border-white/20 flex-shrink-0 bg-stone-700">
                    <img
                      src="/images/traditional-card.png"
                      alt="Traditional Printed Invitation"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 4 Cross Issues */}
                  <div className="space-y-3.5 text-xs sm:text-sm text-white/90 font-medium">
                    <div className="flex items-center gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                      <span>Share an image or video</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                      <span>Send venue separately</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                      <span>Ask for RSVP on WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                      <span>Share photos separately</span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/15 my-6" />

                {/* Bottom Issues */}
                <div className="space-y-3.5 text-xs sm:text-sm text-white/85 font-medium">
                  <div className="flex items-center gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                    <span>Send event timings in another message</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                    <span>Difficult to update</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
                    <span>Easy to lose in chats</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card Right: WITH AHVAAN FOR YOU */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-white text-stone-900 rounded-[32px] p-8 sm:p-10 shadow-2xl flex flex-col justify-between border border-stone-200/90 relative"
            >
              <div>
                {/* Pill Tag */}
                <div className="inline-block bg-[#4E1D1D] text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-8 tracking-wider shadow-sm">
                  WITH AHVAAN FOR YOU
                </div>

                {/* Top Area: Phone Mockup + List of Benefits */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-6">
                  {/* Phone Mockup with Music Playing */}
                  <div className="w-36 sm:w-44 h-auto flex-shrink-0 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                    <img
                      src="/images/ahvaan-playing-phone.png"
                      alt="Ahvaan Interactive Invitation Playing"
                      className="w-full h-auto object-contain select-none pointer-events-none"
                    />
                  </div>

                  {/* Top 4 Benefits */}
                  <div className="space-y-3.5 text-xs sm:text-sm text-stone-800 font-semibold">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>One beautiful invitation</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Venue + Google Maps</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Easy RSVP</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Event schedule in one place</span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-stone-200 my-6" />

                {/* Bottom 4 Benefits */}
                <div className="space-y-3.5 text-xs sm:text-sm text-stone-800 font-semibold">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Photos and memories</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Music and interactive elements</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Easy to share anywhere</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Designed for every screen</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 4: ONE INVITATION. EVERYTHING YOUR GUESTS NEED (Image 1 Bottom)   */}
      {/* ========================================================================= */}
      <motion.section
        ref={section4Ref}
        style={{ opacity: s4Opacity }}
        id="everything-guests-need"
        className="w-full py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Blur Reveal */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-stone-900 tracking-tight leading-tight"
            >
              One invitation.{' '}
              <CursiveStrokeText
                text="Everything your"
                className="text-3xl sm:text-4xl lg:text-5xl text-[#8C3A27] mx-1"
              />{' '}
              guests need.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3.5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Ahvaan brings all the important details of your celebration together into one beautifully designed experience.
            </motion.p>
          </div>

          {/* 6 Feature Cards (Matching Bottom of Attachment 1) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-7xl mx-auto">
            {FEATURE_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 16,
                  delay: idx * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.25 },
                }}
                className="bg-[#462121] text-white rounded-[24px] p-5 sm:p-6 text-center flex flex-col items-center justify-start min-h-[235px] sm:min-h-[250px] shadow-[0_15px_35px_-10px_rgba(70,33,33,0.3)] border border-white/5 cursor-default group"
              >
                {/* Icon */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-stone-300/80 leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

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
