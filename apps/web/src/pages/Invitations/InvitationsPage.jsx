import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, Check, MapPin, Calendar, Share2, Heart } from 'lucide-react';
import { TEMPLATES } from '../../data/content';
import Footer from '../../components/Footer/Footer';
import CreativeHandsBusy from '../../components/Common/CreativeHandsBusy';

const INVITATION_CATEGORIES = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'birthdays', label: 'Birthdays' },
  { id: 'baby-shower', label: 'Baby Shower' },
  { id: 'house-warming', label: 'House Warming' },
];

export default function InvitationsPage({ onNavigate, onPreviewTemplate, onCreateTemplate }) {
  const [activeCategory, setActiveCategory] = useState('wedding');

  const weddingTemplates = TEMPLATES.filter((t) => t.category === 'wedding');

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
            {activeCategory === 'wedding' ? (
              <>Showing <strong className="text-stone-800">{weddingTemplates.length}</strong> Wedding Invitation Websites</>
            ) : (
              <span>Coming Soon</span>
            )}
          </span>
        </div>

        {/* Hero Header without pill tag */}
        <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#1F1F1F] tracking-tight leading-[1.12]">
            Modern Indian Invitations
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore our digital invitations designed for celebrations across India and worldwide. 
            Each invite combines interactive storytelling, live Google Maps, RSVP tracking, background music, and effortless sharing.
          </p>
        </div>

        {/* Category Filter Pills: Wedding, Birthdays, Baby Shower, House Warming */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          {INVITATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#351410] text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Area: Wedding Grid or Creative Hands Busy for other categories */}
        {activeCategory === 'wedding' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {weddingTemplates.map((template) => (
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
                    onClick={() => {
                      const templateSlug = template.slug || template.id;
                      const link = `https://ahvaanforyou.com/invitation/${templateSlug}`;
                      const msg = `Hii ahvaanforyou , I liked this design ${link}`;
                      window.open(`https://wa.me/918985966940?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
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
      ) : (
        <CreativeHandsBusy
          categoryName={
            activeCategory === 'birthdays'
              ? 'Birthday Celebrations'
              : activeCategory === 'baby-shower'
              ? 'Baby Shower & Godh Bharai'
              : 'House Warming & Griha Pravesh'
          }
          title="Our Creative Hands Are Busy!"
          subtitle="Our Team is still working on it !"
        />
      )}

        {/* Bottom Bespoke Creation Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#351410] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Looking for a 100% custom invitation website?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Have your own illustrations, couple monogram, custom background song, or unique multi-day ceremony schedule? Our studio crafts fully tailored celebration websites in 2 working days.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/918985966940?text=${encodeURIComponent('Hii ahvaanforyou , I liked this design https://ahvaanforyou.com/invitations')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-md cursor-pointer"
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
