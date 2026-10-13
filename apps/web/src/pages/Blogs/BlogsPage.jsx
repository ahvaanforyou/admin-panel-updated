import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import BlogArticlePage from './BlogArticlePage';

// Accurate blog data matching media_1791897760299.png exactly
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'digital-wedding-invitation-guide',
    tag: 'WEDDING',
    tagBg: 'bg-[#FDF2EC]',
    tagText: 'text-[#9E4D38]',
    arrowBg: 'bg-[#FBEBE8] text-[#9E4D38]',
    title: 'Digital Wedding Invitation Website: Complete Guide for Indian Weddings',
    description:
      'Learn what a digital wedding invitation website is, what to include, and how it makes your wedding celebrations easier and more memorable.',
    date: 'Sep 25, 2026',
    readTime: '8 min read',
    image: '/images/blogs/blog-wedding-mandap.jpg',
    delay: 0.05,
  },
  {
    id: 2,
    slug: 'digital-invitations-guide-every-occasion',
    tag: 'DIGITAL INVITATIONS',
    tagBg: 'bg-[#FEF9E7]',
    tagText: 'text-[#946A14]',
    arrowBg: 'bg-[#FEF9E7] text-[#946A14]',
    title: 'Digital Invitations: The Complete Guide to Online Invitations for Every Occasion',
    description:
      'Discover what digital invitations are, their benefits, what you can include and how to create them for weddings, birthdays and more.',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
    image: '/images/blogs/blog-digital-guide.jpg',
    delay: 0.12,
  },
  {
    id: 3,
    slug: 'whatsapp-invitations-how-to-send',
    tag: 'TIPS & GUIDES',
    tagBg: 'bg-[#EBF8F2]',
    tagText: 'text-[#23704C]',
    arrowBg: 'bg-[#EBF8F2] text-[#23704C]',
    title: 'WhatsApp Invitations: How to Send Digital Wedding, Birthday & Event Invites',
    description:
      'Learn how to share your digital invitation on WhatsApp, with message ideas, tips and best practices for better engagement and RSVPs.',
    date: 'Sep 18, 2026',
    readTime: '5 min read',
    image: '/images/blogs/blog-whatsapp-invite.jpg',
    delay: 0.18,
  },
  {
    id: 4,
    slug: 'wedding-invitation-wording-ideas',
    tag: 'WORDING IDEAS',
    tagBg: 'bg-[#F4EFFB]',
    tagText: 'text-[#6B3FA0]',
    arrowBg: 'bg-[#F4EFFB] text-[#6B3FA0]',
    title: 'Wedding Invitation Wording Ideas: 50+ Messages for Every Celebration',
    description:
      'Find the perfect wording for your wedding, haldi, mehendi, sangeet, reception and more, with examples in English, Hindi and regional...',
    date: 'Sep 15, 2026',
    readTime: '7 min read',
    image: '/images/blogs/blog-wedding-wording.jpg',
    delay: 0.24,
  },
  {
    id: 5,
    slug: 'digital-birthday-invitations-guide',
    tag: 'BIRTHDAY',
    tagBg: 'bg-[#FCEEF2]',
    tagText: 'text-[#A43B5C]',
    arrowBg: 'bg-[#FCEEF2] text-[#A43B5C]',
    title: 'Digital Birthday Invitations: Create Beautiful Online Birthday Invitations',
    description:
      'Explore ideas, design tips and wording for kids, teens and adults, and learn how to create and share a digital birthday invitation.',
    date: 'Sep 12, 2026',
    readTime: '6 min read',
    image: '/images/blogs/blog-birthday-invite.jpg',
    delay: 0.3,
  },
  {
    id: 6,
    slug: 'how-to-create-digital-invitation-online',
    tag: 'HOW IT WORKS',
    tagBg: 'bg-[#EBF4FA]',
    tagText: 'text-[#286090]',
    arrowBg: 'bg-[#EBF4FA] text-[#286090]',
    title: 'How to Create a Digital Invitation Online: Step-by-Step Guide',
    description:
      'A simple step-by-step guide to creating, customising and sharing your digital invitation with RSVP, maps and event details.',
    date: 'Sep 10, 2026',
    readTime: '5 min read',
    image: '/images/blogs/blog-create-guide.jpg',
    delay: 0.36,
  },
];

// Stroke effect animation for cursive word matching "Inspiration" with letter-to-letter animation and -2.1px letter-spacing
function CursiveStrokeText({ text, className = '' }) {
  return (
    <span
      className={`relative inline-flex items-baseline select-none ${className}`}
      style={{
        fontFamily: "'Playwrite US Trad', 'Dancing Script', 'Caveat', cursive",
        fontStyle: 'normal',
        letterSpacing: '-2.1px',
      }}
    >
      <span className="relative z-10 inline-flex">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.25 + index * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block transform-gpu"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
      {/* Decorative handwriting stroke underline */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.1, delay: 0.25 + text.length * 0.045 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewBox="0 0 240 18"
        className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none text-[#9E4D38]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 4,12 Q 60,3 120,9 Q 180,15 236,7"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </span>
  );
}

// Compact, elegant Blog Card matching media_1791897760299.png exactly
function CompactBlogCard({ post, onSelectArticle }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: post.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="will-change-transform transform-gpu h-full"
    >
      <article
        onClick={() => onSelectArticle(post)}
        className="group h-full bg-white rounded-[22px] border border-[#ECE7E3] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-stone-300"
        style={{
          boxShadow: '0 4px 20px -2px rgba(45, 29, 23, 0.04), 0 2px 6px -1px rgba(45, 29, 23, 0.02)',
        }}
      >
        <div>
          {/* Top Banner Image with Bookmark Button and Tag Pill */}
          <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#F2EDE9]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

            {/* Tag Badge Pill on Top Left */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span
                className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs border border-white/60 ${post.tagBg} ${post.tagText}`}
              >
                {post.tag}
              </span>
            </div>

            {/* Bookmark Circular Icon on Top Right */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBookmarked(!bookmarked);
              }}
              title="Bookmark article"
              className="absolute top-3.5 right-3.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-600 hover:text-[#4E1D1D] hover:bg-white shadow-xs transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-3.5 h-3.5 transition-colors ${
                  bookmarked ? 'fill-[#4E1D1D] text-[#4E1D1D]' : 'text-stone-600'
                }`}
              />
            </button>
          </div>

          {/* Card Body with Shorter Padding */}
          <div className="p-5 sm:p-5.5 pb-4">
            {/* Title */}
            <h3 className="text-[15.5px] sm:text-base font-bold text-[#1F1916] leading-snug group-hover:text-[#4E1D1D] transition-colors duration-200 mb-2 line-clamp-2">
              {post.title}
            </h3>

            {/* Snippet / Description */}
            <p className="text-[12px] sm:text-[12.5px] text-[#7A6B63] leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
              {post.description}
            </p>
          </div>
        </div>

        {/* Card Footer: Metadata (Date & Read time) on left + "Read More" button on right */}
        <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[#F2ECE7] mt-auto">
          {/* Left: Date & Time */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-stone-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>{post.date}</span>
            <span>&bull;</span>
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{post.readTime}</span>
          </div>

          {/* Right: Read More + Pastel Circle Arrow */}
          <div className="inline-flex items-center gap-2 group/btn">
            <span className="text-[11.5px] sm:text-xs font-semibold text-stone-700 group-hover:text-[#4E1D1D] transition-colors">
              Read More
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover:scale-105 ${post.arrowBg}`}
            >
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function BlogsPage({ onNavigate, onOpenCreateModal }) {
  // Support state-based article expansion as well as deep-link paths
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Check if initial path has article slug
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (
        path.includes('/blogs/digital-wedding-invitation-guide') ||
        path.includes('/blog/digital-wedding-invitation-guide')
      ) {
        setSelectedArticle(BLOG_POSTS[0]);
      }
    }
  }, []);

  const handleSelectArticle = (post) => {
    // If user clicks Card 1, open expanded PDF article view
    if (post.id === 1) {
      setSelectedArticle(post);
      window.history.pushState(null, '', '/blogs/digital-wedding-invitation-guide');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // For other cards, open the same article view as requested
      setSelectedArticle(post);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToBlogs = () => {
    setSelectedArticle(null);
    window.history.pushState(null, '', '/blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If article is selected, render full PDF expanded article view
  if (selectedArticle) {
    return (
      <BlogArticlePage
        article={selectedArticle}
        onBack={handleBackToBlogs}
        onNavigate={onNavigate}
        onOpenCreateModal={onOpenCreateModal}
      />
    );
  }

  // Otherwise, render full Blog Catalog matching media_1791897760299.png exactly
  return (
    <div className="min-h-screen bg-[#FCFAF8] pt-28 sm:pt-36 flex flex-col justify-between">
      {/* Main Blog Catalog Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 select-none">
        
        {/* Header matching media_1791897760299.png exactly */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Pill Badge 'OUR BLOGS' */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)', y: -8 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#F2ECE6] text-[#8C6D58] text-[11px] sm:text-xs font-medium tracking-wider uppercase mb-5 shadow-xs border border-[#E9DFD6]"
          >
            OUR BLOGS
          </motion.div>

          {/* Main Title: Ideas, Tips & Inspiration (matching exact typography from screenshot) */}
          <div className="mb-4">
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1B17] leading-tight inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            >
              <span>Ideas, Tips &amp;</span>
              <CursiveStrokeText
                text="Inspiration"
                className="text-[#381B18] text-[2.9rem] sm:text-[3.8rem] lg:text-[4.6rem] font-normal"
              />
            </motion.h1>
          </div>

          {/* Subtitle with blur reveal matching media_1791897760299.png text */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
            className="text-xs sm:text-sm lg:text-[15px] text-[#7A6B63] font-normal leading-relaxed max-w-lg mx-auto"
          >
            Helpful guides, creative ideas and everything you need to create beautiful digital invitations for your special moments.
          </motion.p>
        </div>

        {/* 6 Cards 3-Column Responsive Grid with Smooth Fall-Into-Position & Zero Lag */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <CompactBlogCard
              key={post.id}
              post={post}
              onSelectArticle={handleSelectArticle}
            />
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-16 sm:mt-24 bg-[#4E1D1D] text-white rounded-[32px] p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
              Ready to Design Your Own Digital Invitation?
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mb-7 font-normal">
              Select your design, personalize every celebration event, and share instantly with your loved ones on WhatsApp.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2.5 bg-white text-[#4E1D1D] hover:bg-stone-100 font-bold px-7 py-3.5 rounded-full text-xs sm:text-sm tracking-wide shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
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
