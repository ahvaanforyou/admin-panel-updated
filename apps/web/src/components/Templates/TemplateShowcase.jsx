import React, { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Heart, Share2, LayoutGrid, HeartHandshake, FileText, Send, ChevronDown, ChevronRight, Eye, Sparkles, Check } from 'lucide-react';
import { TEMPLATES } from '../../data/content';
import CreateItForYouHandwriting from './CreateItForYouHandwriting';
import CreativeHandsBusy from '../Common/CreativeHandsBusy';

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
        {/* MAIN BODY: FULL-WIDTH 3-COLUMN TEMPLATES GRID OR CREATIVE HANDS BANNER     */}
        {/* ========================================================================= */}
        <div className="w-full mb-16 sm:mb-20">
          
          {/* If non-wedding category selected (Birthday, House Warming, Baby Shower), display Creative Hands banner */}
          {activeTab !== 'all' && activeTab !== 'wedding' ? (
            <div className="w-full flex justify-center py-4">
              <CreativeHandsBusy 
                categoryName={
                  activeTab === 'birthday' 
                    ? 'Birthday Celebrations' 
                    : activeTab === 'house-warming' 
                    ? 'House Warming Ceremonies' 
                    : 'Baby Showers'
                }
              />
            </div>
          ) : (
            /* FULL-WIDTH 3-COLUMN TEMPLATES GRID (Filter sidebar removed completely) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredTemplates.map((item) => {
                const isLiked = likedTemplates[item.id];

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl border border-stone-200/90 p-3 min-[380px]:p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-row items-center gap-2.5 min-[380px]:gap-4 sm:gap-5 relative group select-none min-h-[210px] sm:min-h-[225px]"
                  >
                    {/* Left: Realistic Smartphone Frame with Full Clear-Resolution Hero */}
                    <div className="w-[88px] min-[380px]:w-[102px] sm:w-[118px] aspect-[9/19.5] flex-shrink-0 bg-[#1E1E1E] rounded-[18px] min-[380px]:rounded-[22px] p-[2.5px] sm:p-[3px] shadow-md border-[2px] sm:border-[2.5px] border-stone-800 relative overflow-hidden flex flex-col justify-start">
                      {/* Top Island / Speaker Notch */}
                      <div className="w-5 sm:w-6 h-0.5 sm:h-1 bg-stone-700/80 rounded-full mx-auto my-0.5 z-10 flex-shrink-0" />
                      
                      {/* Inner Phone Screen with Client Website Hero or Closed Mystery Box */}
                      <div className="w-full h-full rounded-[14px] min-[380px]:rounded-[17px] overflow-hidden bg-stone-900 relative">
                        {item.isUnrevealed ? (
                          <div className="w-full h-full bg-gradient-to-b from-stone-900 via-stone-950 to-[#2A1412] flex flex-col items-center justify-center p-2 text-center relative overflow-hidden border border-amber-500/20">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-1 shadow-sm">
                              <span className="text-xs sm:text-sm">🔒</span>
                            </div>
                            <span className="text-[9px] min-[380px]:text-[10px] font-bold text-amber-300 tracking-wider uppercase block">
                              Sneak Peek
                            </span>
                            <span className="text-[8px] min-[380px]:text-[9px] text-stone-400 font-medium">
                              Closed Box
                            </span>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-amber-500/10 rounded-full blur-md pointer-events-none" />
                          </div>
                        ) : (
                          <img
                            src={item.phoneImage || item.image}
                            alt={item.name}
                            className={`w-full h-full object-cover ${item.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`}
                          />
                        )}
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
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                      </button>

                      {/* Header Info */}
                      <div className="pr-5 sm:pr-6">
                        {item.badge && (
                          <span 
                            className="inline-block text-[9px] min-[380px]:text-[10px] font-bold px-2 py-0.5 rounded-full mb-1"
                            style={{ 
                              backgroundColor: item.badgeColor || '#FFF0EC', 
                              color: item.badgeText || '#351410' 
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                        <h3 className="font-bold text-stone-900 text-sm min-[380px]:text-base sm:text-lg leading-snug truncate" title={item.clientTitle || item.name}>
                          {item.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-stone-500 font-medium mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Dynamic Feature Pills */}
                      <div className="flex flex-wrap items-center gap-1 min-[380px]:gap-1.5 my-1.5 sm:my-2">
                        {(item.features || ['RSVP', 'Maps', 'Bulk Emails']).slice(0, 3).map((feat, fIdx) => (
                          <span 
                            key={fIdx}
                            className="px-1.5 min-[380px]:px-2 py-0.5 rounded-md text-[9px] min-[380px]:text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200/80 whitespace-nowrap"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Price & Action Buttons */}
                      <div className="mt-auto pt-1">
                        <div className="flex items-baseline gap-1.5 mb-1.5">
                          <span className="text-base min-[380px]:text-lg sm:text-2xl font-bold text-stone-900 tracking-tight">
                            {item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[10px] min-[380px]:text-xs text-stone-400 line-through font-normal">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 min-[380px]:gap-2 w-full">
                          {item.isUnrevealed ? (
                            <a
                              href="https://wa.me/918985966940?text=Hi%20ahvaanforyou%2C%20I%20am%20curious%20about%20your%20upcoming%20unrevealed%20template%21"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 py-1.5 min-[380px]:py-2 px-2 min-[380px]:px-3 rounded-xl text-[11px] min-[380px]:text-xs sm:text-sm font-semibold shadow-xs transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap border border-stone-200"
                            >
                              <span>🔒 On Hold</span>
                            </a>
                          ) : (
                            <button
                              onClick={() => onPreviewTemplate(item)}
                              className="flex-1 bg-[#351410] hover:bg-[#230C0A] text-white py-1.5 min-[380px]:py-2 px-2 min-[380px]:px-3 rounded-xl text-[11px] min-[380px]:text-xs sm:text-sm font-semibold shadow-sm transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                            >
                              <span>Preview</span>
                              <span className="text-xs">→</span>
                            </button>
                          )}

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
                            className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 py-1.5 min-[380px]:py-2 px-2 min-[380px]:px-3 rounded-xl text-[11px] min-[380px]:text-xs sm:text-sm font-medium transition cursor-pointer"
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
          )}
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
