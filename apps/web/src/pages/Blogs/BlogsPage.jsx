import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
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

// 6 Blog Posts matching media_1791487717628.png
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
    delay: 0.08,
    parallaxSpeed: [35, -35],
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
    delay: 0.16,
    parallaxSpeed: [50, -50],
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
    delay: 0.24,
    parallaxSpeed: [40, -40],
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
    delay: 0.32,
    parallaxSpeed: [45, -45],
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
    delay: 0.40,
    parallaxSpeed: [55, -55],
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
    delay: 0.48,
    parallaxSpeed: [38, -38],
  },
];

// Single Blog Card with Moments-style fall-into-position & parallax float
function BlogCard({ post, scrollYProgress }) {
  const yParallax = useTransform(scrollYProgress, [0, 1], post.parallaxSpeed);

  return (
    <motion.div style={{ y: yParallax }} className="w-full h-full">
      <motion.article
        initial={{ opacity: 0, y: 85, scale: 0.94 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: post.rotation,
        }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: 0.75,
          delay: post.delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.03,
          rotate: 0,
          y: -8,
          transition: { duration: 0.3 },
        }}
        className="group h-full bg-white/90 backdrop-blur-xl border border-stone-200/80 rounded-[28px] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-stone-300"
        style={{
          boxShadow:
            '0 20px 45px -10px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset',
        }}
      >
        <div>
          {/* Card Top Image Banner */}
          <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100">
            <motion.img
              src={post.image}
              alt={post.title}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Tag Pill badge */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className={`inline-block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${post.tagBg} ${post.tagText}`}
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
              <span>₇</span>
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

        {/* Card Footer: 'Read Complete Guide' link */}
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

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.4, 1, 1, 0.3]);

  return (
    <div className="min-h-screen bg-[#FCFAF8] pt-24 sm:pt-28 flex flex-col justify-between">
      {/* Main Blog Catalog Section */}
      <motion.section
        ref={sectionRef}
        style={{ opacity: sectionOpacity }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:kx-8 py-8 sm:py-14 select-none"
      >
        {/* Header matching media_1791487717628.png */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Pill Badge 'OUR LOG' */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF0ED] border border-[#8F473E]/20 text-[#8F473E] text-xs font-bold tracking-wider uppercase mb-5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8F473E]" />
            OUR BLOG
          </motion.div>

          {/* Main Title: Ideas, Tips & Inspiration (with Playwrite US Trad cursive) */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] mb-5"
          >
            Ideas, Tips &amp;{' '}
            <CursiveStrokeText
              text="Inspiration"
              className="text-[#8F473E] italic underline decoration-[#8F473E]/20 decoration-wavy decoration-1 underline-offset-8"
            />
          </motion.h1>

          {/* Subtitle with blur reveal */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-sm sm:text-base lg:text-lg text-stone-600 font-normal line-clamp-relaxed max-w-2xl mx-auto"
          >
            Expert guides, creative ideas, and etiquette tips for creating unforgettable digital invitations for every celebration.
          </motion.p>
        </div>

        {/* 6 Cards 3-Column Responsive Grid with Moments-style fall-into-position */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-9">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Bottom Callout / Subscribe or Create Banner */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
      </motion.section>


      {/* Footer */}
      <Footer
        onCategoryClick={() => onNavigate('/#templates')}
        onCreateClick={onOpenCreateModal}
      />
    </div>
  );
}
