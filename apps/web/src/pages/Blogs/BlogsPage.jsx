import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

// Helper component for cursive write-on stroke animation using Playwrite US Traditional
function CursiveStrokeText({ text, className = '' }) {
  return (
    <span
      className={
        "relative inline-flex items-center overflow-visible select-none font-['Playwrite_US_Trad',cursive] font-normal leading-none tracking-normal " +
        className
      }
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 8,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.3,
            delay: 0.35 + index * 0.065,
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

// 6 Blog Posts
const BLOG_POSTS = [
  {
    id: 1,
    tag: 'WEDDING',
    tagBg: 'bg-[#FDF0ED]',
    tagText: 'text-[#8F473E]',
    title: 'Digital Wedding Invitation Website: Complete Guide for Indian Weddings',
    description:
      'Everything you need to know about creating, customizing, and sharing digital wedding invitations for your big day with interactive maps, RSVPs, and live photo sharing.',
    image: '/images/blogs/blog-indian-wedding.jpg',
    date: 'Sep 25, 2026',
    readTime: '8 min read',
    rotation: -1.8,
    delay: 0.06,
    parallaxSpeed: [25, -25],
  },
  {
    id: 2,
    tag: 'DIGITAL INVITATIONS',
    tagBg: 'bg-[#EBF3FB]',
    tagText: 'text-[#285784]',
    title: 'Digital Invitations: The Complete Guide to Online Invitations for Every Occasion',
    description:
      'Explore why modern couples and event hosts are switching to interactive digital invites over paper cards, saving cost, time, and creating memorable guest experiences.',
    image: '/images/blogs/blog-digital-guide.jpg',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
    rotation: 1.2,
    delay: 0.12,
    parallaxSpeed: [35, -35],
  },
  {
    id: 3,
    tag: 'TIPS & GUIDES',
    tagBg: 'bg-[#EAF3EB]',
    tagText: 'text-[#3E6D47]',
    title: 'WhatsApp Invitations: How to Send Digital Wedding, Birthday & Event Invites',
    description:
      'The complete checklist and template guide for sending wedding invitations, birthday announcements, and ceremony details via WhatsApp with high open rates.',
    image: '/images/blogs/blog-whatsapp-invite.jpg',
    date: 'Sep 18, 2026',
    readTime: '5 min read',
    rotation: -1.5,
    delay: 0.18,
    parallaxSpeed: [30, -30],
  },
  {
    id: 4,
    tag: 'WORDING IDEAS',
    tagBg: 'bg-[#F4ECF5]',
    tagText: 'text-[#7D4F84]',
    title: 'Wedding Invitation Wording Ideas: 50+ Messages for Every Celebration',
    description:
      'Find the perfect tone and wording for your wedding cards, from traditional Sanskrit shlokas and formal family invitations to quirky modern save-the-dates.',
    image: '/images/blogs/blog-wedding-wording.jpg',
    date: 'Sep 15, 2026',
    readTime: '7 min read',
    rotation: 1.6,
    delay: 0.24,
    parallaxSpeed: [35, -35],
  },
  {
    id: 5,
    tag: 'BIRTHDAY',
    tagBg: 'bg-[#FDF6E8]',
    tagText: 'text-[#7E5E2B]',
    title: 'Digital Birthday Invitations: Create Beautiful Online Birthday Invitations',
    description:
      'Make birthdays extra special with animated countdowns, RSVP counts, Google Maps venue links, and custom themed background music for kids and milestones alike.',
    image: '/images/blogs/blog-birthday-invite.jpg',
    date: 'Sep 12, 2026',
    readTime: '6 min read',
    rotation: -1.4,
    delay: 0.30,
    parallaxSpeed: [40, -40],
  },
  {
    id: 6,
    tag: 'HOW IT WORKS',
    tagBg: 'bg-[#FDEEEE]',
    tagText: 'text-[#9B3232]',
    title: 'How to Create a Digital Invitation Online: Step-by-Step Guide',
    description:
      'From selecting your handcrafted aesthetic template to uploading your schedule, custom music, and instant WhatsApp link sharing in under 5 minutes.',
    image: '/images/blogs/blog-create-guide.jpg',
    date: 'Sep 10, 2026',
    readTime: '5 min read',
    rotation: 1.8,
    delay: 0.36,
    parallaxSpeed: [28, -28],
  },
];

// Single Blog Card with stable fall-into-position & smooth hover
function BlogCard({ post, scrollYProgress }) {
  const yParallax = useTransform(scrollYProgress, [0, 1], post.parallaxSpeed);

  return (
    <motion.div style={{ y: yParallax }} className="w-full h-full">
      <motion.article
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: post.rotation,
        }}
        transition={{
          duration: 0.75,
          delay: 0.2 + post.delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.03,
          rotate: 0,
          y: -8,
          transition: { duration: 0.28 },
        }}
        className="group h-full bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-[28px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-stone-300 transform-gpu"
        style={{
          boxShadow:
            '0 20px 45px -10px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset',
        }}
      >
        <div>
          {/* Card Top Image Banner */}
          <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#F2EDE9]">
            <motion.img
              src={post.image}
              alt={post.title}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="sync"
            />
            {/* Tag Pill badge */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className={
                  "inline-block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-xs " +
                  post.tagBg + 
                  " " + 
                  post.tagText
                }
              >
                {post.tag}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-7">
            {/* Date and Read Time Metadata */}
            <div className="flex items-center gap-3 text-[11.5px] sm:text-xs text-stone-400 font-medium mb-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-[#4E1D1D] transition-colors duration-200 mb-3 line-clamp-2">
              {post.title}
            </h3>

            {/* Snippet / Description */}
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal line-clamp-3">
              {post.description}
            </p>
          </div>
        </div>

        {/* Card Footer: 'Read Article' link */}
        <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 flex items-center justify-between border-t border-stone-100/80 mt-2">
          <span className="text-xs sm:text-sm font-semibold text-[#4E1D1D] group-hover:text-[#3A1414] inline-flex items-center gap-1.5 transition-colors">
            Read Article
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
          <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-200/70 flex items-center justify-center text-stone-400 group-hover:bg-[#4E1D11D] group-hover:text-white group-hover:border-transparent transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function BlogsPage({ onNavigate, onOpenCreateModal }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="min-h-screen bg-[#FCFAF8] pt-28 sm:pt-36 flex flex-col justify-between">
      {/* Main Blog Catalog Section */}
      <section
        ref={sectionRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 select-none"
      >
        {/* Header matching media_1791488921418.png exactly */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Pill Badge 'OUR BLOG' */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)', y: -8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-block px-5 py-1.5 rounded-full bg-[#F5ECE5] text-[#8C6D58] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-5 shadow-xs border border-[#E9DFD6]}"
          >
            OUR LOG
          </motion.div>

          {/* Main Title: Ideas, Tips & Inspiration (matching exact typography from screenshot) */}
          <div className="mb-5">
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1B17] leading-none inline-flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2"
            >
              <span>Ideas, Tips &amp;</span>
              <CursiveStrokeText
                text="Inspiration"
                className="text-[#381B18] text-[3.1rem] sm:text-[3.9rem] lg:text-[4.7rem] font-normal"
              />
            </motion.h1>
          </div>

          {/* Subtitle with blur reveal matching media_1791488921418.png text */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
            className="text-sm sm:text-base lg:text-lg text-stone-600 font-normal leading-relaxed max-w-xl mx-auto"
          >
            Helpful guides, creative ideas and everything you need to create beautiful digital invitations for your special moments.
          </motion.p>
        </div>

        {/* 6 Cards 3-Column Responsive Grid with stable fall-into-position */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-9">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Bottom Callout / Subscribe or Create Banner */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-20 sm:mt-28 bg-[#4E1D11D] text-white rounded-[32px] p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Ready to Design Your Own Digital Invitation?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-7 font-normal">
              Select your design, personalize every celebration event, and share instantly with your loved ones on WhatsApp.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2.5 bg-white text-[#4E1D11D] hover:bg-stone-100 font-bold px-7 py-3.5 rounded-full text-xs sm:text-sm tracking-wide shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer
        onCategoryClick={() => onNavigate('/#templates')}
        onCreateClick={onOpenCreateModal}
      />
    </div>
  );
}
