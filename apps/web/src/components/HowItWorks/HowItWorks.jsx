import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Palette, Send, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS } from '../../data/content';

const iconMap = {
  Sparkles,
  FileText,
  Palette,
  Send
};

export default function HowItWorks({ onCreateClick }) {
  return (
    <section id="how-it-works" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary block mb-2">
            Seamless 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-text tracking-tight">
            How It <span className="font-handwriting font-normal text-brand-primary italic">Works</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-muted">
            From picking a favorite design to sharing a dynamic interactive link with your guest list in under 48 hours.
          </p>
        </div>

        {/* 4-Step Horizontal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/3 left-12 right-12 h-0.5 bg-dashed bg-gradient-to-r from-[#FFC655] via-[#F7526C] to-[#0776C6] -z-0 opacity-40" />

          {HOW_IT_WORKS.map((step, idx) => {
            const Icon = iconMap[step.icon] || Sparkles;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative bg-white rounded-3xl p-6 border border-brand-border/80 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 z-10 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-border flex items-center justify-center text-brand-primary shadow-soft-sm">
                      <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <span className="font-editorial text-2xl font-bold text-surface-subtle/40">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-surface-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-surface-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
                  Step {idx + 1} of 4
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-soft-md hover:shadow-soft-lg transition-all"
          >
            <span>Start Creating Your Invitation Now</span>
            <ArrowRight className="w-4 h-4 text-theme-wedding" />
          </button>
        </div>

      </div>
    </section>
  );
}
