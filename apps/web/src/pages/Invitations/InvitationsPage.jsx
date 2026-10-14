import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, Check, MapPin, Music, Sparkles, Calendar, Share2, Heart } from 'lucide-react';
import { TEMPLATES } from '../../data/content';
import Footer from '../../components/Footer/Footer';

export default function InvitationsPage({ onNavigate, onPreviewTemplate, onCreateTemplate }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const weddingTemplates = TEMPLATES.filter((t) => t.category === 'wedding');

  const filteredTemplates = activeFilter === 'all'
    ? weddingTemplates
    : weddingTemplates.filter((t) => {
        if (activeFilter === 'traditional') {
          return t.tags?.some((tag) => ['Traditional', 'Temple', 'Gopuram', 'South Indian'].includes(tag));
        }
        if (activeFilter === 'sangeet') {
          return t.tags?.some((tag) => ['Sangeet', 'Cocktail', 'Glitter'].includes(tag));
        }
        if (activeFilter === 'royal') {
          return t.tags?.some((tag) => ['Heritage', 'Royal Palace', 'Gold Foil'].includes(tag));
        }
        if (activeFilter === 'destination') {
          return t.tags?.some((tag) => ['Destination', 'Beach Mandap', 'Chibi'].includes(tag));
        }
        return true;
      });

  return (
    <div className="min-h-screen bg-[#FCFAF8] pt-24 sm:pt-28 flex flex-col justify-between text-[#1F1F1F]">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 select-text">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#4E1D1D] font-semibold transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </button>

          <span className="text-stone-400">
            Showing <strong className="text-stone-800">{filteredTemplates.length}</strong> Wedding Invitation Websites
          </span>
        </div>

        {/* Hero Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCECE8] text-[#351410] text-[11px] font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Real Client Websites &amp; Templates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#1F1F1F] tracking-tight leading-[1.12]">
            Modern Indian Wedding Invitations
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore our real digital wedding websites designed for couples across India and worldwide. 
            Each invite combines interactive storytelling, live Google Maps, RSVP tracking, background music, and effortless sharing.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          {[
            { id: 'all', label: 'All Invitations' },
            { id: 'traditional', label: 'Traditional & Temple' },
            { id: 'sangeet', label: 'Sangeet & Cocktails' },
            { id: 'royal', label: 'Royal Palace & Heritage' },
            { id: 'destination', label: 'Destination & Beach' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-[#351410] text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Expanded Grid of Client Wedding Websites */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Image Stage */}
              <div 
                className="relative w-full aspect-[9/12] bg-[#FAF8F5] overflow-hidden cursor-pointer"
                onClick={() => onPreviewTemplate(template)}
              >
                <img
                  src={template.phoneImage || template.image}
                  alt={template.clientTitle || template.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Badge Overlay */}
                {template.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-[11px] font-bold shadow-xs tracking-wide"
                      style={{ 
                        backgroundColor: template.badgeColor || '#FFFFFF',
                        color: template.badgeText || '#351410'
                      }}
                    >
                      {template.badge}
                    </span>
                  </div>
                )}

                {/* Quick Preview Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <div className="px-5 py-2.5 rounded-full bg-white text-stone-900 font-bold text-xs flex items-center gap-2 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5 text-[#351410]" />
                    <span>Expand Mobile Preview</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  {/* Category & Price Row */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#8C6D46] font-semibold uppercase tracking-wider text-[11px]">
                      {template.categoryName || 'Wedding Website'}
                    </span>
                    <span className="font-extrabold text-[#351410] text-sm sm:text-base">
                      {template.price}
                    </span>
                  </div>

                  {/* Client Title */}
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug mb-2 group-hover:text-[#351410] transition-colors">
                    {template.clientTitle || template.name}
                  </h3>

                  {/* Venue / Location Tag */}
                  {template.venue && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#C05646] flex-shrink-0" />
                      <span className="truncate">{template.venue}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {template.description}
                  </p>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Live Google Maps', 'RSVP Tracking', 'Music Player'].map((feat, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-stone-50 border border-stone-200/80 text-[10px] font-medium text-stone-600"
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: Preview & Order */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-2.5">
                  <button
                    onClick={() => onPreviewTemplate(template)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => onCreateTemplate(template)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#351410] hover:bg-[#230C0A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Order Design</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Bespoke Creation Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#351410] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Looking for a 100% custom wedding website?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Have your own illustrations, couple monogram, custom background song, or unique multi-day ceremony schedule? Our studio crafts fully tailored wedding websites in 2 working days.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/918985966940?text=Hi%20Ahvaan%20Team!%20I%20would%20like%20to%20discuss%20a%20custom%20wedding%20invitation%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Chat on WhatsApp</span>
              <Share2 className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onCreateTemplate(null)}
              className="px-6 py-3 rounded-full bg-white text-[#351410] font-bold text-xs sm:text-sm hover:bg-stone-100 transition-colors flex items-center gap-2 shadow-md"
            >
              <span>Custom Order Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      <Footer
        onCategoryClick={() => onNavigate('/#carousel')}
        onCreateClick={() => onCreateTemplate(null)}
      />
    </div>
  );
}
