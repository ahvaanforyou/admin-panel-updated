import React, { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Heart, Share2, LayoutGrid, HeartHandshake, FileText, Send, ChevronDown, ChevronRight, Eye, Sparkles, Check } from 'lucide-react';
import { TEMPLATES } from '../../data/content';
import CreateItForYouHandwriting from './CreateItForYouHandwriting';

export default function TemplateShowcase({
  selectedCategory = 'all',
  onSelectCategory,
  onPreviewTemplate,
  onCreateTemplate,
}) {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(selectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [likedTemplates, setLikedTemplates] = useState({});

  // Synchronize category selection if prop changes
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  // Gentle scroll fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.98], [0.6, 1, 1, 0]);
  const sectionVisibility = useTransform(scrollYProgress, (v) => (v >= 0.98 ? 'hidden' : 'visible'));
  const sectionPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.96 ? 'none' : 'auto'));

  const toggleLike = (id) => {
    setLikedTemplates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tpl) => {
      const matchesCategory = activeTab === 'all' || tpl.category === activeTab;
      const matchesSearch = !searchQuery || 
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tpl.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = selectedPriceRange === 'all' || 
        (selectedPriceRange === 'under-2000' && tpl.priceVal < 2000) ||
        (selectedPriceRange === '2000-3000' && tpl.priceVal >= 2000 && tpl.priceVal <= 3000) ||
        (selectedPriceRange === '3000-4000' && tpl.priceVal >= 3000 && tpl.priceVal <= 4000) ||
        (selectedPriceRange === 'above-4000' && tpl.priceVal > 4000);
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [activeTab, searchQuery, selectedPriceRange]);

  return (
    <motion.section 
      ref={containerRef}
      id="templates" 
      style={{ 
        opacity: sectionOpacity,
        visibility: sectionVisibility,
        pointerEvents: sectionPointerEvents,
      }}
      className="pt-16 sm:pt-24 pb-0 bg-white relative overflow-hidden select-none w-full"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 sm:mb-24">
        
        {/* ========================================================================= */}
        {/* HEADLINE WITH APPLE HELLO SVG HANDWRITING ANIMATION                       */}
        {/* ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#1F1F1F] tracking-tight leading-[1.2]"
          >
            Select a template, share with us, and we
          </motion.h2>

          {/* Apple hello SVG handwriting stroke animation matching reference image */}
          <div className="flex justify-center items-center mt-2 sm:mt-3">
            <CreateItForYouHandwriting />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: STATIC LEFT SIDEBAR + 6-TEMPLATE CLEAN GRID                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20">
          
          {/* LEFT SIDEBAR: PRICE RANGE (Completely static) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm sticky top-28">
              
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
                  { id: '2000-3000', label: '₹2,000 – ₹3,000', count: 2 },
                  { id: '3000-4000', label: '₹3,000 – ₹4,000', count: 2 },
                ].map((item) => (
                  <label 
                    key={item.id}
                    onClick={() => setSelectedPriceRange(item.id)}
                    className="flex items-center gap-3 text-xs sm:text-sm text-stone-700 cursor-pointer group hover:text-stone-900 select-none"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      selectedPriceRange === item.id 
                        ? 'bg-[#351410] border-[#351410] text-white' 
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

              {/* Features summary info */}
              <div className="mt-8 pt-6 border-t border-stone-100 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                  Every Template Includes:
                </span>
                {['Instant RSVP Form', 'Live Venue Google Maps', 'Background Music Player', '48-Hour Delivery Guarantee'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: CATEGORY TABS + SEARCH + 6 TEMPLATES GRID */}
          <div className="lg:col-span-9 xl:col-span-9 flex flex-col gap-6 min-w-0">
            
            {/* Top Toolbar: Tabs on left, Search bar on right */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Templates', icon: LayoutGrid },
                  { id: 'wedding', label: 'Wedding', icon: () => <span className="text-amber-500">💍</span> },
                  { id: 'birthday', label: 'Birthday', icon: () => <span className="text-pink-500">🎂</span> },
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
                          ? 'bg-[#351410] text-white border-[#351410] shadow-md'
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-full text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#351410]/20 focus:border-[#351410] transition-all shadow-sm"
                />
              </div>

            </div>

            {/* SIX TEMPLATES CLEAN GRID (No horizontal scrolling marquee) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
              {filteredTemplates.map((item) => {
                const isLiked = likedTemplates[item.id];

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative select-none"
                  >
                    {/* Top Image & Mockup Preview with Badge */}
                    <div className="relative w-full aspect-[16/11] bg-stone-100 overflow-hidden">
                      <img
                        src={item.image || item.bannerImage}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Top Badges & Favorite Heart */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span 
                          className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm"
                          style={{ backgroundColor: item.badgeColor || '#FFFBEB', color: item.badgeText || '#B45309' }}
                        >
                          {item.badge}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                          }}
                          className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-red-500 shadow-sm transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Bottom Image Overlay Tag */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 text-white">
                        <span className="text-xs font-semibold drop-shadow-md text-white/90">
                          {item.venue || item.subtitle}
                        </span>
                        <div className="flex items-baseline gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                          <span className="text-xs font-bold text-amber-300">{item.price}</span>
                          <span className="text-[10px] text-white/60 line-through">{item.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content & Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#351410] transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium mt-1">
                          {item.subtitle}
                        </p>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-1">
                          {item.features?.slice(0, 3).map((feat, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons: Preview & Select */}
                      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2.5">
                        <button
                          onClick={() => onPreviewTemplate && onPreviewTemplate(item)}
                          className="flex-1 py-2.5 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <button
                          onClick={() => onCreateTemplate && onCreateTemplate(item)}
                          className="flex-1 py-2.5 px-3 rounded-full bg-[#351410] hover:bg-[#230C0A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                          <span>Select</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
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
      {/* BOTTOM 4-STEP PROCESS BANNER (Wide, Spacious & Prominent with Chevrons)   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#351410] py-14 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-20 text-white shadow-2xl">
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
          
          {/* Step 1 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F6] text-[#351410] flex items-center justify-center flex-shrink-0 shadow-lg font-bold">
                <LayoutGrid className="w-6 h-6 text-[#351410]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white block mb-1">
                  01 Choose a Template
                </span>
                <p className="text-xs text-stone-300 leading-snug">
                  Browse and pick your favorite design.
                </p>
              </div>
            </div>
            <ChevronRight className="hidden lg:block w-5 h-5 text-stone-400/60 ml-4 flex-shrink-0" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F6] text-[#351410] flex items-center justify-center flex-shrink-0 shadow-lg font-bold">
                <FileText className="w-6 h-6 text-[#351410]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white block mb-1">
                  02 Share Your Details
                </span>
                <p className="text-xs text-stone-300 leading-snug">
                  Send us your event details and preferences.
                </p>
              </div>
            </div>
            <ChevronRight className="hidden lg:block w-5 h-5 text-stone-400/60 ml-4 flex-shrink-0" />
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F6] text-[#351410] flex items-center justify-center flex-shrink-0 shadow-lg font-bold">
                <HeartHandshake className="w-6 h-6 text-[#351410]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white block mb-1">
                  03 We Customize It
                </span>
                <p className="text-xs text-stone-300 leading-snug">
                  Our team personalizes the template for you.
                </p>
              </div>
            </div>
            <ChevronRight className="hidden lg:block w-5 h-5 text-stone-400/60 ml-4 flex-shrink-0" />
          </div>

          {/* Step 4 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F6] text-[#351410] flex items-center justify-center flex-shrink-0 shadow-lg font-bold">
                <Send className="w-6 h-6 text-[#351410]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white block mb-1">
                  04 Receive & Share
                </span>
                <p className="text-xs text-stone-300 leading-snug">
                  Get your final invitation and share with loved ones.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </motion.section>
  );
}
