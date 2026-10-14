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
        {/* TOP CONTROLS TOOLBAR: CATEGORY PILLS + SEARCH BAR                         */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills matching reference */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Templates', icon: LayoutGrid },
              { id: 'wedding', label: 'Wedding', emoji: '💍' },
              { id: 'birthday', label: 'Birthday', emoji: '🎂' },
              { id: 'house-warming', label: 'House Warming', emoji: '🏠' },
              { id: 'baby-shower', label: 'Baby Shower', emoji: '🛒' }
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-200 border whitespace-nowrap shadow-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#351410] text-white border-[#351410]'
                      : 'bg-white text-stone-700 hover:text-stone-900 border-stone-200/90 hover:bg-stone-50'
                  }`}
                >
                  {Icon ? <Icon className="w-3.5 h-3.5" /> : <span>{tab.emoji}</span>}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar matching reference */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200/90 rounded-xl text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#351410]/20 focus:border-[#351410] transition-all shadow-sm"
            />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: PRICE RANGE SIDEBAR + 3-COLUMN TEMPLATES GRID                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-16 sm:mb-20">
          
          {/* LEFT SIDEBAR: PRICE RANGE */}
          <div className="lg:col-span-3 xl:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm sticky top-28">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-stone-700">
                  <span className="text-stone-400 text-xs">🏷️</span>
                  <span className="text-xs font-bold tracking-wider uppercase text-stone-800">PRICE RANGE</span>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </div>

              {/* Price Checkboxes */}
              <div className="space-y-3">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-2000', label: 'Under ₹2,000', count: 2 },
                  { id: '2000-3000', label: '₹2,000 – ₹3,000', count: 3 },
                  { id: '3000-4000', label: '₹3,000 – ₹4,000', count: 2 },
                  { id: 'above-4000', label: 'Above ₹4,000', count: 1 },
                ].map((item) => (
                  <label 
                    key={item.id}
                    onClick={() => setSelectedPriceRange(item.id)}
                    className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer group hover:text-stone-900 select-none"
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

            </div>
          </div>

          {/* RIGHT COLUMN: 3-COLUMN TEMPLATES GRID WITH PHONE MOCKUPS */}
          <div className="lg:col-span-9 xl:col-span-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredTemplates.map((item) => {
                const isLiked = likedTemplates[item.id];

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-sm hover:shadow-md transition-all flex flex-row items-center gap-4 relative group select-none min-h-[220px]"
                  >
                    {/* Left: Realistic Smartphone Frame with Client Hero Screen */}
                    <div className="w-[102px] sm:w-[110px] aspect-[9/19.5] flex-shrink-0 bg-[#1E1E1E] rounded-[20px] p-[3px] shadow-md border-[2px] border-stone-800 relative overflow-hidden flex flex-col justify-start">
                      {/* Top Island / Speaker Notch */}
                      <div className="w-6 h-1 bg-stone-700/80 rounded-full mx-auto my-0.5 z-10 flex-shrink-0" />
                      
                      {/* Inner Phone Screen with Client Website Hero */}
                      <div className="w-full h-full rounded-[16px] overflow-hidden bg-stone-900 relative">
                        <img
                          src={item.phoneImage || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Right: Template Details */}
                    <div className="flex-1 flex flex-col justify-between h-full py-0.5 min-w-0 relative">
                      {/* Top-Right Heart Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                        className="absolute top-0 right-0 p-1 text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Add to favorites"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                      </button>

                      {/* Header Info */}
                      <div className="pr-6">
                        <h3 className="font-bold text-stone-900 text-base leading-snug truncate" title={item.clientTitle || item.name}>
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Feature Pills (RSVP, Maps, Bulk Emails) matching reference */}
                      <div className="flex flex-wrap items-center gap-1.5 my-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-600 border border-sky-100">
                          RSVP
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-50 text-teal-600 border border-teal-100">
                          Maps
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-50 text-pink-600 border border-pink-100">
                          Bulk Emails
                        </span>
                      </div>

                      {/* Price & Action Buttons */}
                      <div className="mt-auto pt-1">
                        <div className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-2">
                          {item.price}
                        </div>

                        <div className="flex items-center gap-2 w-full">
                          <button
                            onClick={() => onPreviewTemplate(item)}
                            className="flex-1 bg-[#351410] hover:bg-[#230C0A] text-white py-2 px-3 rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            <span>View Template</span>
                            <span className="text-xs">→</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (navigator.share) {
                                navigator.share({
                                  title: item.name,
                                  text: `Check out ${item.name} invitation template on Ahvaan!`,
                                  url: window.location.href,
                                }).catch(() => {});
                              } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Template link copied to clipboard!');
                              }
                            }}
                            className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 py-2 px-3 rounded-xl text-xs font-medium transition cursor-pointer"
                          >
                            Share
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
