import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../../data/content';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft border border-brand-border text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-theme-wedding text-theme-wedding" />
            <span>Cherished Memories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-text tracking-tight">
            Loved by couples & <span className="font-handwriting font-normal text-brand-primary italic">families</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-muted">
            Read real stories from hosts who celebrated their milestone moments with Ahvaan for You.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAF8F6] rounded-3xl p-8 border border-brand-border/80 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-primary/20" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-surface-text italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-brand-border/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-soft-sm"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-surface-text">{item.name}</span>
                  <span className="text-[11px] text-surface-muted">{item.location} • {item.event}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
