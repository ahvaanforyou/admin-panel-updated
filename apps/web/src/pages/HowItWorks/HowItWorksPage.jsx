import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  Plane,
  Heart,
  FileText,
  Palette,
  Edit3,
  Link2,
  Wand2,
} from 'lucide-react';
import Footer from '../../components/Footer/Footer';

// Helper component for cursive write-on stroke animation using Playwrite US Traditional
function CursiveStrokeText({ text, className = '' }) {
  return (
    <span
      className={`font-['Playwrite_US_Trad',cursive] font-normal inline-flex leading-tight  select-none ${className}`}
      style={{ letterSpacing: '-2.1px' }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
                        y: 8,
            filter: 'blur(3px)',
          }}
          whileInView={{
            opacity: 1,
                        y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{ once: false }}
          transition={{
            duration: 0.34,
            delay: 0.12 + index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block transform-gpu "
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// 5 Floating Badges on the right of the Hero phone mockup
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

// 5 Process Step Cards for "How Ahvaan Works" (Section 5)
const PROCESS_STEPS = [
  {
    step: '01',
    icon: '📝',
    title: 'Tell us about your celebration',
    description:
      'Share the basic details like date, venue, timings, photos, preferred style and anything else you’d like included.',
  },
  {
    step: '02',
    icon: '🎨',
    title: 'We design your invitation',
    description:
      'Our team turns your details into a beautiful digital invitation designed around your celebration and personality.',
  },
  {
    step: '03',
    icon: '✍️',
    title: 'Make it yours',
    description:
      'Review your invitation and request changes to the content, music, images or other details.',
    highlight: 'Two rounds of revisions are included for free',
  },
  {
    step: '04',
    icon: '🔗',
    title: 'Share it with everyone',
    description:
      'Once your invitation is ready, simply share it with your guests through WhatsApp, Instagram, email or wherever they are.',
  },
  {
    step: '05',
    icon: '🪄',
    title: 'Let your guests experience it',
    description:
      'Guests can open the invitation on their phone or laptop and access everything they need — event details, location, photos, music, RSVP and more.',
  },
];

// 7 Occasion Cards (Section 7)
const OCCASION_EVENTS = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Celebrate every ceremony, function and beautiful beginning.',
    photo: '/images/events/event-card-weddings-photo.png',
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    description: 'From intimate gatherings to big milestone celebrations.',
    photo: '/images/events/event-card-birthdays-photo.png',
  },
  {
    id: 'babyshowers',
    title: 'Baby Showers',
    description: 'Share the excitement before your little one arrives.',
    photo: '/images/events/event-card-babyshowers-photo.png',
  },
  {
    id: 'housewarmings',
    title: 'Housewarmings',
    description: 'Open the doors to a new chapter and invite your loved ones in.',
    photo: '/images/events/event-card-housewarmings-photo.png',
  },
  {
    id: 'engagements',
    title: 'Engagements',
    description: 'Announce the beginning of your forever.',
    photo: '/images/events/event-card-engagements-photo.png',
  },
  {
    id: 'anniversaries',
    title: 'Anniversaries',
    description: 'Celebrate another year of memories together.',
    photo: '/images/events/event-card-anniversaries-photo.png',
  },
  {
    id: 'andmore',
    title: 'And More',
    description: 'Graduations, reunions, parties and exciting events worth gathering for.',
    photo: '/images/events/event-card-andmore-photo.png',
  },
];

// Floating Pill Badges around the Experience Phone (Section 8)
const EXPERIENCE_PILLS_LEFT = [
  { id: 'opening', icon: '🤍', label: 'Beautiful opening' },
  { id: 'story', icon: '📜', label: 'Your story' },
  { id: 'details', icon: '📅', label: 'Event details' },
  { id: 'memories', icon: '🖼️', label: 'Photos & memories' },
];

const EXPERIENCE_PILLS_RIGHT = [
  { id: 'location', icon: '📍', label: 'Location' },
  { id: 'rsvp', icon: '👥', label: 'RSVP' },
  { id: 'music', icon: '🎵', label: 'Music' },
  { id: 'more', icon: '✨', label: 'And more' },
];

// 4 Value Proposition Cards (Section 9 - Designed beautifully. Shared effortlessly.)
const VALUE_PROP_CARDS = [
  {
    id: 'beautiful',
    icon: '🎨',
    iconBg: 'bg-rose-50 text-rose-500',
    title: 'Beautiful by design',
    description: 'Every invitation is thoughtfully designed around your occasion.',
  },
  {
    id: 'easy',
    icon: '🔗',
    iconBg: 'bg-indigo-50 text-indigo-500',
    title: 'Easy to share',
    description: 'One link can reach guests anywhere in the world.',
  },
  {
    id: 'everything',
    icon: '📁',
    iconBg: 'bg-amber-50 text-amber-600',
    title: 'Everything in one place',
    description: 'No more sending five different messages for five different details.',
  },
  {
    id: 'made',
    icon: '✨',
    iconBg: 'bg-emerald-50 text-emerald-500',
    title: 'Made for every celebration',
    description: 'Weddings are just the beginning.',
  },
];

export default function HowItWorksPage({ onNavigate, onOpenCreateModal }) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);
  const section9Ref = useRef(null);
  const section10Ref = useRef(null);

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

  // Section 5 scroll fade-out
  const { scrollYProgress: s5Progress } = useScroll({
    target: section5Ref,
    offset: ['start end', 'end start'],
  });
  const s5Opacity = useTransform(s5Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

  // Section 6 scroll fade-out
  const { scrollYProgress: s6Progress } = useScroll({
    target: section6Ref,
    offset: ['start end', 'end start'],
  });
  const s6Opacity = useTransform(s6Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

  // Section 7 scroll fade-out
  const { scrollYProgress: s7Progress } = useScroll({
    target: section7Ref,
    offset: ['start end', 'end start'],
  });
  const s7Opacity = useTransform(s7Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

  // Section 8 scroll fade-out
  const { scrollYProgress: s8Progress } = useScroll({
    target: section8Ref,
    offset: ['start end', 'end start'],
  });
  const s8Opacity = useTransform(s8Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

  // Section 9 scroll fade-out
  const { scrollYProgress: s9Progress } = useScroll({
    target: section9Ref,
    offset: ['start end', 'end start'],
  });
  const s9Opacity = useTransform(s9Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

  // Section 10 scroll fade-out
  const { scrollYProgress: s10Progress } = useScroll({
    target: section10Ref,
    offset: ['start end', 'end start'],
  });
  const s10Opacity = useTransform(s10Progress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.15]);

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
            <motion.span
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-stone-400 uppercase mb-4 sm:mb-6"
            >
              HOW AHVAAN FOR YOU WORKS
            </motion.span>

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

          {/* Right Column: Tilted Phone & Responsive Scroll-Parallax Floating Pills */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full pt-4 lg:pt-0">
            <div className="relative w-full max-w-[500px] sm:max-w-[560px] flex items-center justify-center">
              
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

              {/* 5 Stacked Floating Pills with Scroll-Linked Parallax */}
              <div className="absolute right-0 sm:-right-4 inset-y-0 w-[170px] sm:w-[210px] md:w-[230px] flex flex-col justify-around py-4 z-20 pointer-events-auto">
                {FLOATING_BADGES.map((badge, idx) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: 40, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      x: 0,
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
                ))}
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
      {/* SECTION 3: SIMPLER WAY TO INVITE (Comparison)                             */}
      {/* ========================================================================= */}
      <motion.section
        ref={section3Ref}
        style={{ opacity: s3Opacity }}
        id="simpler-way"
        className="w-full py-24 sm:py-32 lg:py-36 bg-white relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
                <div className="inline-block bg-white/20 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-8 tracking-wider">
                  TRADITIONAL / STATIC INVITE
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-7 mb-8">
                  <div className="w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg border border-white/20 flex-shrink-0 bg-stone-700">
                    <img
                      src="/images/traditional-card.png"
                      alt="Traditional Printed Invitation"
                      className="w-full h-full object-cover"
                    />
                  </div>

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

                <div className="w-full h-px bg-white/15 my-6" />

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
                <div className="inline-block bg-[#4E1D1D] text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-8 tracking-wider shadow-sm">
                  WITH AHVAAN FOR YOU
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-6">
                  <div className="w-36 sm:w-44 h-auto flex-shrink-0 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                    <img
                      src="/images/ahvaan-playing-phone.png"
                      alt="Ahvaan Interactive Invitation Playing"
                      className="w-full h-auto object-contain select-none pointer-events-none"
                    />
                  </div>

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

                <div className="w-full h-px bg-stone-200 my-6" />

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
      {/* SECTION 4: ONE INVITATION. EVERYTHING YOUR GUESTS NEED                    */}
      {/* ========================================================================= */}
      <motion.section
        ref={section4Ref}
        style={{ opacity: s4Opacity }}
        id="everything-guests-need"
        className="w-full py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300/80 leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 5: HOW AHVAAN WORKS (5 Regular Process Step Cards from Top to Down) */}
      {/* ========================================================================= */}
      <motion.section
        ref={section5Ref}
        style={{ opacity: s5Opacity }}
        id="how-ahvaan-works-steps"
        className="w-full py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight"
            >
              How Ahvaan Works
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3.5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl mx-auto"
            >
              A simple process, from your details to a beautiful invitation, ready to share.
            </motion.p>
          </div>

          {/* 5 Step Cards with top-to-bottom entrance animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 max-w-7xl mx-auto">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: -60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 15,
                  delay: idx * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 35px -10px rgba(78, 29, 29, 0.12)',
                  transition: { duration: 0.25 },
                }}
                className="bg-[#FCFAF8] border border-[#6A382C]/15 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_25px_-8px_rgba(78,29,29,0.05)] hover:shadow-[0_20px_35px_-8px_rgba(78,29,29,0.12)] transition-all duration-300 relative group min-h-[290px] sm:min-h-[310px]"
              >
                <div>
                  {/* Top Badge: Number and Emoji Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {step.step}
                    </div>
                    <span className="text-xl select-none">{step.icon}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-stone-900 leading-snug mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Highlight badge e.g. Free Revisions */}
                {step.highlight && (
                  <div className="mt-5 pt-3.5 border-t border-[#6A382C]/10">
                    <span className="inline-block bg-[#FDF0ED] text-[#8C3A27] text-[11px] font-semibold px-2.5 py-1 rounded-md leading-tight">
                      {step.highlight}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 6: YOUR PEOPLE DON'T HAVE TO BE NEARBY (Global Map Reach)        */}
      {/* ========================================================================= */}
      <motion.section
        ref={section6Ref}
        style={{ opacity: s6Opacity }}
        id="global-reach"
        className="w-full py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Subtitle & Callout */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <motion.h2
                initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
                className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-stone-900 tracking-tight leading-[1.15]"
              >
                Your people don't have to be nearby to be part of it.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 text-sm sm:text-base text-stone-600 leading-relaxed font-normal"
              >
                Your family might be in Hyderabad. Your best friend might be in London. Your cousin might be in Dubai. A celebration can still bring everyone together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-5 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs"
              >
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                  With Ahvaan, your invitation can travel anywhere in the world with a single link.
                </p>
              </motion.div>
            </div>

            {/* Right Column: World Destination Map Card with 4 Cities */}
            <div className="lg:col-span-7 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F8F4EE] border border-[#E4D9CD] rounded-[36px] p-8 sm:p-12 relative shadow-xl overflow-hidden flex flex-col justify-between min-h-[360px]"
              >
                {/* 4 Connected Global Cities */}
                <div className="relative w-full py-8 sm:py-12 flex items-center justify-between px-3 sm:px-8">
                  
                  {/* Flight Connection Dotted Arc (Positioned behind circular avatars) */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    viewBox="0 0 500 130"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 50 82 Q 165 25 285 82 T 455 68"
                      stroke="#C9B8A7"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                    />
                  </svg>

                  {/* City 1: USA */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                      USA
                    </span>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[3px] border-2 border-dashed border-amber-400/90 bg-[#F8F4EE] shadow-md transform hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                        <img src="/images/city-usa.png" alt="USA - New York" className="w-full h-full object-cover object-center" />
                      </div>
                    </div>
                  </div>

                  {/* City 2: UK */}
                  <div className="relative z-10 flex flex-col items-center -mt-8 sm:-mt-10">
                    <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                      UK
                    </span>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[3px] border-2 border-amber-400 bg-[#F8F4EE] shadow-md transform hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                        <img src="/images/city-uk.png" alt="UK - London" className="w-full h-full object-cover object-center" />
                      </div>
                    </div>
                  </div>

                  {/* City 3: DUBAI */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                      DUBAI
                    </span>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[3px] border-2 border-dashed border-amber-400/90 bg-[#F8F4EE] shadow-md transform hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                        <img src="/images/city-dubai.png" alt="Dubai" className="w-full h-full object-cover object-center" />
                      </div>
                    </div>
                  </div>

                  {/* City 4: INDIA */}
                  <div className="relative z-10 flex flex-col items-center -mt-4">
                    <span className="text-xs sm:text-sm font-extrabold text-stone-800 uppercase tracking-wider mb-2.5">
                      INDIA
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] border-[3px] border-[#8C3A27] bg-[#F8F4EE] shadow-xl ring-4 ring-[#8C3A27]/20 transform hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                        <img src="/images/city-india.png" alt="India - Taj Mahal" className="w-full h-full object-cover object-center" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Center Pill CTA */}
                <div className="flex justify-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-white px-5 sm:px-6 py-2.5 rounded-full border border-stone-300/80 shadow-sm text-xs sm:text-sm font-semibold text-stone-800">
                    <Plane className="w-4 h-4 text-[#8C3A27] transform -rotate-45" />
                    <span>One link. Wherever your people are. →</span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 7: WHATEVER THE OCCASION (Continuous Slow-Moving Card Carousel)   */}
      {/* ========================================================================= */}
      <motion.section
        ref={section7Ref}
        style={{ opacity: s7Opacity }}
        id="occasions-film-strip"
        className="w-full py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight"
            >
              Whatever the occasion, make the invitation{' '}
              <CursiveStrokeText
                text="memorable."
                className="text-3xl sm:text-4xl lg:text-5xl text-[#8C3A27] ml-1"
              />
            </motion.h2>
          </div>
        </div>

        {/* Continuous Slow-Moving Infinite Card Carousel (Never stops) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left and Right Edge Soft Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-5 sm:gap-6 w-max"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              ease: 'linear',
              duration: 38,
              repeat: Infinity,
            }}
          >
            {[...OCCASION_EVENTS, ...OCCASION_EVENTS].map((event, idx) => (
              <motion.div
                key={`${event.id}-${idx}`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="w-[230px] sm:w-[250px] shrink-0 bg-[#462121] text-white rounded-[26px] p-4 sm:p-5 flex flex-col justify-between shadow-xl border border-white/10 group cursor-pointer"
              >
                <div>
                  {/* Top Photo Frame */}
                  <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-4 bg-stone-900 shadow-sm">
                    <img
                      src={event.photo}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-white tracking-tight mb-1.5">
                    {event.title}
                  </h3>

                  <p className="text-xs text-stone-300/80 leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Pill Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => onNavigate && onNavigate('/#templates')}
            className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
          >
            <span>Explore Invitations</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 8: AN INVITATION YOUR GUESTS CAN ACTUALLY EXPERIENCE              */}
      {/* ========================================================================= */}
      <motion.section
        ref={section8Ref}
        style={{ opacity: s8Opacity }}
        id="actually-experience"
        className="w-full py-24 sm:py-32 lg:py-36 bg-[#FAF8F5] relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight"
            >
              An invitation your guests can{' '}
              <CursiveStrokeText
                text="actually experience."
                className="text-3xl sm:text-4xl lg:text-5xl text-[#8C3A27] ml-1"
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3.5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl mx-auto"
            >
              More than a card. More than a video. A complete digital experience designed around your celebration.
            </motion.p>
          </div>

          {/* Interactive Mockup Stage: Center Phone & 8 Surrounding Badges */}
          <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center py-8">
            
            {/* Left 4 Floating Pills */}
            <div className="hidden md:flex flex-col gap-6 items-end z-20 flex-1 pr-6 sm:pr-10">
              {EXPERIENCE_PILLS_LEFT.map((pill, idx) => (
                <motion.div
                  key={pill.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
                  whileHover={{ scale: 1.08, x: -4 }}
                  className="bg-white border border-[#3E1F1F]/40 hover:border-[#3E1F1F] rounded-full px-5 py-2.5 shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer transition-all"
                >
                  <span className="text-base select-none">{pill.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800">
                    {pill.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Center Phone Mockup (Transparent Cutout) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[240px] sm:w-[280px] md:w-[320px] filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
            >
              <img
                src="/images/experience-phone.png"
                alt="Ahvaan Interactive Experience Mobile Phone"
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </motion.div>

            {/* Right 4 Floating Pills */}
            <div className="hidden md:flex flex-col gap-6 items-start z-20 flex-1 pl-6 sm:pl-10">
              {EXPERIENCE_PILLS_RIGHT.map((pill, idx) => (
                <motion.div
                  key={pill.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
                  whileHover={{ scale: 1.08, x: 4 }}
                  className="bg-white border border-[#3E1F1F]/40 hover:border-[#3E1F1F] rounded-full px-5 py-2.5 shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer transition-all"
                >
                  <span className="text-base select-none">{pill.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800">
                    {pill.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Mobile Pills Grid (below phone on smaller screens) */}
          <div className="grid grid-cols-2 gap-3 mt-8 md:hidden max-w-sm mx-auto">
            {[...EXPERIENCE_PILLS_LEFT, ...EXPERIENCE_PILLS_RIGHT].map((pill) => (
              <div
                key={pill.id}
                className="bg-white border border-stone-300 rounded-full px-3 py-2 flex items-center justify-center gap-2 shadow-2xs text-xs font-semibold text-stone-800"
              >
                <span>{pill.icon}</span>
                <span className="truncate">{pill.label}</span>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 9: VALUE PROPS (Designed beautifully. Shared effortlessly.)       */}
      {/* ========================================================================= */}
      <motion.section
        ref={section9Ref}
        style={{ opacity: s9Opacity }}
        id="designed-beautifully"
        className="w-full py-20 sm:py-28 lg:py-32 bg-[#3D1A1A] text-white relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
            >
              Designed beautifully. Shared effortlessly.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {VALUE_PROP_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: -45, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 15,
                  delay: idx * 0.1,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.25 },
                }}
                className="bg-white text-stone-900 rounded-[24px] p-6 sm:p-7 shadow-lg flex flex-col justify-start relative group"
              >
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center text-xl mb-5 shadow-xs`}>
                  <span>{card.icon}</span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-stone-900 tracking-tight mb-2.5">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION 10: FINAL CTA CALLOUT (You bring the occasion)                    */}
      {/* ========================================================================= */}
      <motion.section
        ref={section10Ref}
        style={{ opacity: s10Opacity }}
        id="final-callout"
        className="w-full py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden select-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Card with Left and Right Tilted Photo Frames */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Left Photo Frame: Anniversary couple celebrating (Attachment 2) */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -12 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              animate={{
                y: [-5, 6, -5],
              }}
              className="hidden md:block absolute -left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-40 sm:w-48 lg:w-56 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.06, rotate: -2 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)] border border-stone-200/80 transform origin-center"
              >
                <div className="w-full h-48 sm:h-56 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src="/images/cta-anniversary.jpg"
                    alt="Celebration moment - Anniversary"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Photo Frame: Indian wedding petal shower (Attachment 3) */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              animate={{
                y: [6, -5, 6],
              }}
              className="hidden md:block absolute -right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-40 sm:w-48 lg:w-56 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.06, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)] border border-stone-200/80 transform origin-center"
              >
                <div className="w-full h-48 sm:h-56 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src="/images/cta-wedding.jpg"
                    alt="Celebration moment - Wedding petal shower"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Inner Cream Banner Card */}
            <div className="bg-[#FAF7F2] border border-[#6A382C]/20 rounded-[36px] sm:rounded-[44px] px-6 py-14 sm:px-16 sm:py-20 lg:py-24 text-center shadow-lg relative z-10">
              
              <motion.h2
                initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
                className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-stone-900 tracking-tight leading-[1.2] max-w-2xl mx-auto"
              >
                You bring the occasion.
                <br />
                We'll make the invitation{' '}
                <span className="relative inline-block mt-1">
                  <CursiveStrokeText
                    text="unforgettable."
                    className="text-3xl sm:text-4xl lg:text-[3.35rem] text-[#8C3A27] inline-block"
                  />
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-[#8C3A27]"
                    viewBox="0 0 240 10"
                    fill="none"
                  >
                    <path
                      d="M 3 6 Q 120 2 237 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-5 text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-xl mx-auto"
              >
                Tell us what you're celebrating, and we'll create an invitation your guests will want to open, explore and remember.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
              >
                <button
                  onClick={onOpenCreateModal}
                  className="w-full sm:w-auto bg-[#3D1A1A] hover:bg-[#281111] text-white px-7 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Create Your Invitation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('/#templates')}
                  className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 px-7 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Explore Designs</span>
                </button>
              </motion.div>

              {/* Mobile Photo Preview Cards (stacked below CTA on small devices) */}
              <div className="grid grid-cols-2 gap-3 mt-8 md:hidden max-w-xs mx-auto">
                <div className="bg-white p-2 rounded-xl shadow-md border border-stone-200/80 -rotate-3">
                  <div className="w-full h-28 rounded-lg overflow-hidden">
                    <img src="/images/cta-anniversary.jpg" alt="Anniversary" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-md border border-stone-200/80 rotate-3">
                  <div className="w-full h-28 rounded-lg overflow-hidden">
                    <img src="/images/cta-wedding.jpg" alt="Wedding" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

            </div>

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
