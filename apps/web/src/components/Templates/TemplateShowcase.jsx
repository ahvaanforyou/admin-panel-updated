import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Heart, Share2, Sparkles, LayoutGrid, HeartHandshake, FileText, CheckCircle2, Send, ChevronDown } from 'lucide-react';

const DISPLAY_TEMPLATES = [
  {
    id: 'tpl-1',
    name: 'Royal Celebration',
    style: 'Traditional & Elegant',
    price: '₹3,500',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Best Value',
    badgeColor: '#FFF8E1',
    badgeText: '#F59E0B',
    phoneImage: '/images/templates/card-p1.png',
    category: 'wedding',
    priceVal: 3500
  },
  {
    id: 'tpl-2',
    name: 'Blissful Beginnings',
    style: 'Modern & Minimal',
    price: '₹2,500',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Popular',
    badgeColor: '#FFFBEB',
    badgeText: '#D97706',
    phoneImage: '/images/templates/card-p2.png',
    category: 'wedding',
    priceVal: 2500
  },
  {
    id: 'tpl-3',
    name: 'Timeless Traditions',
    style: 'Classic & Grand',
    price: '₹4,000',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Premium',
    badgeColor: '#FEF3C7',
    badgeText: '#B45309',
    phoneImage: '/images/templates/card-p3.png',
    category: 'wedding',
    priceVal: 4000
  },
  {
    id: 'tpl-4',
    name: 'Little Smiles',
    style: 'Birthday Invitation',
    price: '₹1,500',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Affordable',
    badgeColor: '#FEF3C7',
    badgeText: '#D97706',
    phoneImage: '/images/templates/card-p4.png',
    category: 'birthday',
    priceVal: 1500
  },
  {
    id: 'tpl-5',
    name: 'Colorful Moments',
    style: 'Birthday Invitation',
    price: '₹2,500',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Popular',
    badgeColor: '#FFFBEB',
    badgeText: '#D97706',
    phoneImage: '/images/templates/card-p5.png',
    category: 'birthday',
    priceVal: 2500
  },
  {
    id: 'tpl-6',
    name: 'New Beginnings',
    style: 'House Warming',
    price: '₹3,500',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Best Seller',
    badgeColor: '#FEF3C7',
    badgeText: '#B45309',
    phoneImage: '/images/templates/card-p6.png',
    category: 'house-warming',
    priceVal: 3500
  },
  {
    id: 'tpl-7',
    name: 'A Little Miracle',
    style: 'Baby Shower',
    price: '₹2,500',
    tags: ['RSVP', 'Maps', 'Bulk Emails'],
    badge: 'Trending',
    badgeColor: '#FEF3C7',
    badgeText: '#D97706',
    phoneImage: '/images/templates/card-p7.png',
    category: 'baby-shower',
    priceVal: 2500
  }
];

export default function TemplateShowcase({ 
  selectedCategory, 
  onSelectCategory, 
  onPreviewTemplate, 
  onCreateTemplate 
}) {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedTemplates, setLikedTemplates] = useState({});

  // Scroll driven fade in for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.35, 1, 1, 0.4]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.97, 1, 1, 0.98]);
  const sectionY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [30, 0, 0, -20]);

  const toggleLike = (id) => {
    setLikedTemplates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const cursiveText = "create it for you";

  return (
    <motion.section 
      ref={containerRef}
      id="templates" 
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="pt-16 sm:pt-24 pb-0 bg-white relative overflow-hidden select-none w-full"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 sm:mb-24">
        
        {/* ========================================================================= */}
        {/* HEADLINE WITH CURSIVE STROKE ANIMATION (Matching Reference Image 2 & 3)    */}
        {/* ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#1F1F1F] tracking-tight leading-[1.2]">
            Select a template, share with us, and we
          </h2>

          <div className="flex justify-center items-center mt-1 sm:mt-2">
            <span className="font-['Great_Vibes',cursive] text-4xl sm:text-5xl lg:text-6xl text-[#4E1D1D] tracking-wide inline-flex select-none">
              {cursiveText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.82,
                    y: 6,
                    filter: 'blur(2px)'
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)'
                  }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.26,
                    delay: 0.15 + index * 0.045,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="inline-block transform-gpu origin-bottom-left"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: LEFT SIDEBAR + TEMPLATE GRID                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20">
          
          {/* LEFT SIDEBAR: PRICE RANGE (Exact card from reference image 2) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-stone-700">
                  <span className="text-stone-400">🏷️</span>
                  <span className="text-xs font-bold tracking-wider uppercase text-stone-600">PRICE RANGE</span>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </div>

              {/* Price Checkboxes */}
              <div className="space-y-3.5">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-2000', label: 'Under ₹2,000', count: 2 },
                  { id: '2000-3000', label: '₹2,000 – ₹3,000', count: 3 },
                  { id: '3000-4000', label: '₹3,000 – ₹4,000', count: 2 },
                  { id: 'above-4000', label: 'Above ₹4,000', count: 1 }
                ].map((item) => (
                  <label 
                    key={item.id}
                    onClick={() => setSelectedPriceRange(item.id)}
                    className="flex items-center gap-3 text-xs sm:text-sm text-stone-700 cursor-pointer group hover:text-stone-900 select-none"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      selectedPriceRange === item.id 
                        ? 'bg-[#4E1D1D] border-[#4E1D1D] text-white' 
                        : 'border-stone-300 group-hover:border-stone-400 bg-white'
                    }`}>
                      {selectedPriceRange === item.id && (
                        <span className="text-[10px] leading-none font-bold">✓</span>
                      )}
                    </div>
                    <span>{item.label}</span>
                    {item.count && (
                      <span className="text-stone-400 text-xs ml-auto">({item.count})</span>
                    )}
                  </label>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: CATEGORY TABS + SEARCH + CARDS */}
          <div className="lg:col-span-9 xl:col-span-9 flex flex-col gap-6">
            
            {/* Top Toolbar: Tabs on left, Search bar on right */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Category Filter Pills (Matching Reference Image 2) */}
              <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Templates', icon: LayoutGrid },
                  { id: 'wedding', label: 'Wedding', icon: () => <span className="text-amber-500">💍</span> },
                  { id: 'birthday', label: 'Birthday', icon: () => <span className="text-pink-500">🎂</span> },
                  { id: 'house-warming', label: 'House Warming', icon: () => <span className="text-emerald-600">🏠</span> },
                  { id: 'baby-shower', label: 'Baby Shower', icon: () => <span className="text-sky-500">🍼</span> }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        onSelectCategory && onSelectCategory(tab.id);
                      }}
                      className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 border ${
                        isActive
                          ? 'bg-[#4E1D1D] text-white border-[#4E1D1D] shadow-md'
                          : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200/90 hover:border-stone-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-full text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4E1D1D]/20 focus:border-[#4E1D1D] transition-all shadow-sm"
                />
              </div>

            </div>

            {/* Template Cards Grid (2 Rows of 3 Cards = 6 Cards exactly like reference image 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {DISPLAY_TEMPLATES.map((item, idx) => {
                const isLiked = likedTemplates[item.id];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="group bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-4 relative overflow-hidden"
                  >
                    
                    {/* Heart Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className="absolute top-4 right-4 z-20 text-stone-300 hover:text-red-500 transition-colors"
                      aria-label="Save template"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-all duration-200 ${
                          isLiked ? 'fill-red-500 text-red-500 scale-110' : ''
                        }`} 
                      />
                    </button>

                    {/* PHONE SCREEN MOCKUP WITH HOVER EXPANSION ANIMATION */}
                    <div className="relative w-[92px] sm:w-[102px] h-[176px] sm:h-[196px] flex-shrink-0 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.12, y: -5 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-full h-full flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.14)] group-hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.22)] transition-all"
                      >
                        <img 
                          src={item.phoneImage}
                          alt={item.name}
                          className="w-full h-full object-contain select-none pointer-events-none"
                          loading="lazy"
                        />
                      </motion.div>
                    </div>

                    {/* RIGHT INFO COLUMN */}
                    <div className="flex-1 flex flex-col justify-between h-full py-1 min-w-0">
                      
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-stone-900 tracking-tight truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 truncate">
                          {item.style}
                        </p>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                tag === 'RSVP' ? 'bg-sky-50 text-sky-600' :
                                tag === 'Maps' ? 'bg-blue-50 text-blue-600' :
                                'bg-pink-50 text-pink-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Badge e.g. Best Value, Popular, etc. */}
                        {item.badge && (
                          <div className="mt-2.5">
                            <span 
                              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs"
                              style={{ backgroundColor: item.badgeColor, color: item.badgeText }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.badgeText }} />
                              {item.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price & Action Buttons */}
                      <div className="mt-4">
                        <div className="text-base sm:text-lg font-extrabold text-stone-900 mb-2.5">
                          {item.price}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onPreviewTemplate && onPreviewTemplate(item)}
                            className="flex-1 bg-[#8B5A2B] hover:bg-[#724820] text-white py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow text-center truncate"
                          >
                            View Template →
                          </button>

                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({ title: item.name, url: window.location.href });
                              }
                            }}
                            className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 transition-colors"
                            title="Share template"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM 4-STEP PROCESS BANNER: Expanded across the entire computer frame   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#4E1D1D] py-8 sm:py-10 lg:py-12 px-6 sm:px-12 lg:px-20 text-white shadow-2xl">
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
          
          {/* Step 1 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
              <LayoutGrid className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block mb-0.5">
                01 CHOOSE A TEMPLATE
              </span>
              <p className="text-xs text-stone-300 leading-snug">
                Browse and pick your favorite design.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block mb-0.5">
                02 SHARE YOUR DETAILS
              </span>
              <p className="text-xs text-stone-300 leading-snug">
                Send us your event details and preferences.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
              <HeartHandshake className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block mb-0.5">
                03 WE CUSTOMIZE IT
              </span>
              <p className="text-xs text-stone-300 leading-snug">
                Our team personalizes the template for you.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
              <Send className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block mb-0.5">
                04 RECEIVE & SHARE
              </span>
              <p className="text-xs text-stone-300 leading-snug">
                Get your final invitation and share it with loved ones.
              </p>
            </div>
          </div>

        </div>
      </div>

    </motion.section>
  );
}
