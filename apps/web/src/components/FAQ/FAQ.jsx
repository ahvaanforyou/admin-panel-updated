import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF8F6] border-t border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-text tracking-tight">
            Frequently Asked <span className="font-handwriting font-normal text-brand-primary italic">Questions</span>
          </h2>
          <p className="mt-2 text-sm text-surface-muted">
            Everything you need to know about delivery timelines, customization, music, and RSVP tracking.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-brand-border/80 overflow-hidden shadow-soft-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-surface-text hover:text-brand-primary transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-primary text-white' : 'text-surface-muted'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-surface-muted leading-relaxed border-t border-brand-border/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Chat Prompt */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-brand-border/80 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-sm text-surface-text">Have a special custom design in mind?</h4>
            <p className="text-xs text-surface-muted mt-0.5">Talk directly with our lead invitation artist on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/918985966940?text=Hi%20Ahvaan%20Team!%20I%20have%20a%20question%20about%20customizing%20an%20invitation."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-soft-sm whitespace-nowrap transition-colors"
          >
            WhatsApp Support (+91 89859 66940)
          </a>
        </div>

      </div>
    </section>
  );
}
