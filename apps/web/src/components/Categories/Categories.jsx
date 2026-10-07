import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Baby, Gift, Home } from 'lucide-react';
import { CATEGORIES } from '../../data/content';

const iconMap = {
  wedding: Heart,
  'baby-shower': Baby,
  birthday: Gift,
  'house-warming': Home
};

export default function Categories({ selectedCategory, onSelectCategory }) {
  const celebrationCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="py-16 bg-[#FAF8F6] border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-primary uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-theme-wedding" />
              <span>Occasion Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-text tracking-tight">
              Designed for your <span className="font-handwriting font-normal text-brand-primary italic">milestones</span>
            </h2>
          </div>
          <p className="text-sm text-surface-muted max-w-md mt-2 md:mt-0">
            Handcrafted aesthetics tailored for traditional rituals and modern gatherings, each with distinct color palettes and features.
          </p>
        </div>

        {/* 4 Theme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {celebrationCategories.map((cat, idx) => {
            const Icon = iconMap[cat.id] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                  isSelected 
                    ? 'shadow-soft-lg scale-[1.02] border-brand-primary' 
                    : 'bg-white hover:shadow-soft-md hover:-translate-y-1 border-brand-border/80'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.lightColor : '#FFFFFF'
                }}
              >
                {/* Accent Top Bar */}
                <div 
                  className="w-12 h-1.5 rounded-full mb-6 transition-all duration-300 group-hover:w-20"
                  style={{ backgroundColor: cat.color }}
                />

                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: cat.lightColor, 
                      color: cat.darkText 
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {cat.badge && (
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                      style={{ 
                        borderColor: `${cat.color}60`, 
                        backgroundColor: '#FFFFFF',
                        color: cat.darkText
                      }}
                    >
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-surface-text group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-surface-muted mt-1 leading-relaxed">
                  {cat.tagline}
                </p>

                {/* Count and CTA indicator */}
                <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-semibold">
                  <span style={{ color: cat.darkText }}>
                    {cat.count} Design Templates
                  </span>
                  <span className="text-brand-primary group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
