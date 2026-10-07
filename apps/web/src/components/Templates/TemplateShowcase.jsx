import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CATEGORIES, TEMPLATES } from '../../data/content';

export default function TemplateShowcase({ 
  selectedCategory, 
  onSelectCategory, 
  onPreviewTemplate, 
  onCreateTemplate 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tpl) => {
      const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-border text-brand-primary text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-theme-wedding" />
            <span>Interactive Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-text tracking-tight">
            Curated Invitation <span className="font-handwriting font-normal text-brand-primary italic">Templates</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-muted">
            Tap "Preview" on any card to test the interactive phone view, music player, RSVP form, and location links before ordering.
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-border/60">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'bg-brand-primary text-white border-brand-primary shadow-soft-sm'
                      : 'bg-white text-surface-muted hover:text-surface-text hover:bg-brand-soft border-brand-border/80'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-subtle" />
            <input
              type="text"
              placeholder="Search by theme, bride or child..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-brand-soft/60 border border-brand-border rounded-full text-xs font-medium placeholder-surface-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-surface-subtle hover:text-surface-text"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Template Grid */}
        <AnimatePresence mode="popLayout">
          {filteredTemplates.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
            >
              {filteredTemplates.map((template, idx) => (
                <motion.div
                  layout
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl border border-brand-border/80 overflow-hidden shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Card Visual / Thumbnail Window */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category Floating Pill */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-soft-sm"
                        style={{
                          backgroundColor: template.themeLight,
                          color: template.textColor
                        }}
                      >
                        {template.categoryName}
                      </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-extrabold text-surface-text shadow-soft-sm border border-white/50">
                      {template.price}
                    </div>

                    {/* Hover Overlay with Instant Preview CTA */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <button
                        onClick={() => onPreviewTemplate(template)}
                        className="w-full py-3 px-4 rounded-xl bg-white text-brand-primary text-xs font-bold shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-brand-soft"
                      >
                        <Eye className="w-4 h-4 text-brand-primary" />
                        <span>Interactive Preview</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Meta */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-surface-text group-hover:text-brand-primary transition-colors line-clamp-1">
                        {template.name}
                      </h3>
                      <p className="text-xs text-surface-muted mt-0.5 line-clamp-1">
                        {template.subtitle}
                      </p>

                      {/* Feature Checklist Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {template.features.slice(0, 2).map((feat, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] font-medium text-surface-muted bg-brand-soft px-2 py-0.5 rounded-md"
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions Bottom Bar */}
                    <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onPreviewTemplate(template)}
                        className="text-xs font-bold text-surface-muted hover:text-brand-primary transition-colors py-1 px-2 rounded"
                      >
                        Preview
                      </button>

                      <button
                        onClick={() => onCreateTemplate(template)}
                        className="text-xs font-bold bg-brand-primary hover:bg-brand-dark text-white px-3.5 py-1.5 rounded-full shadow-soft-sm transition-all flex items-center gap-1"
                      >
                        <span>Use This</span>
                        <ArrowRight className="w-3 h-3 text-theme-wedding" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-brand-soft rounded-2xl border border-brand-border/60">
              <Sparkles className="w-8 h-8 text-surface-subtle mx-auto mb-2" />
              <h3 className="text-base font-bold text-surface-text">No templates match your search</h3>
              <p className="text-xs text-surface-muted mt-1">Try another category or clear your search query.</p>
              <button
                onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
                className="mt-4 px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-full"
              >
                Reset Filters
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
