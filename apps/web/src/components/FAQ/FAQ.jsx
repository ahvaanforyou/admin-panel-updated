import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Clock, Music, MonitorSmartphone, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import CelebrationHandwriting from './CelebrationHandwriting';

const EXACT_FAQS = [
  {
    id: 1,
    icon: Clock,
    iconBg: '#FCECE8',
    iconColor: '#C05646',
    question: 'How long does it take to get my invitation ready?',
    answer: (
      <span>
        Once we have your details, we'll design and deliver your invitation typically within{' '}
        <strong className="text-stone-900 font-bold">2 working days</strong>. For custom requests, it may take a little longer depending on your requirements.
      </span>
    )
  },
  {
    id: 2,
    icon: Music,
    iconBg: '#FCECE8',
    iconColor: '#C05646',
    question: 'Can I change the content or music to my own taste?',
    answer: (
      <span>
        Absolutely! You can personalize the content, music, and other details to match your celebration. Plus,{' '}
        <strong className="text-stone-900 font-bold">2 rounds of revisions are completely free</strong>, so we can fine-tune everything until it feels just right.
      </span>
    )
  },
  {
    id: 3,
    icon: MonitorSmartphone,
    iconBg: '#FCECE8',
    iconColor: '#C05646',
    question: 'Will it be suitable for both mobile and laptop?',
    answer: (
      <span>
        Yes, absolutely. Every invitation we create is fully responsive, so it will look beautiful and work smoothly on mobile phones, tablets, and laptops.
      </span>
    )
  },
  {
    id: 4,
    icon: ImageIcon,
    iconBg: '#FCECE8',
    iconColor: '#C05646',
    question: "If we don't have any images, what do you do?",
    answer: (
      <span>
        Haha, that’s actually a fun challenge! If you don’t have images, we can create suitable AI-generated visuals to complement your invitation. And of course, we’ll only use them if you’re happy with how they look.
      </span>
    )
  }
];

export default function FAQ() {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null); // Closed by default, opens on user click

  // Scroll driven animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.98], [0.6, 1, 1, 0]);
  const sectionVisibility = useTransform(scrollYProgress, (v) => (v >= 0.98 ? 'hidden' : 'visible'));
  const sectionPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.96 ? 'none' : 'auto'));

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <motion.section 
      ref={containerRef}
      id="faq" 
      style={{ 
        opacity: sectionOpacity,
        visibility: sectionVisibility,
        pointerEvents: sectionPointerEvents,
      }}
      className="py-20 sm:py-28 bg-[#FAF8F6] relative overflow-hidden select-none w-full"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: TITLE & SUBTITLE (Matching Reference Image 3) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-center lg:text-left">
            
            {/* Top Flourish Ornament */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="w-8 h-px bg-stone-300" />
              <span className="text-[#8C6D46] text-sm">🌰</span>
              <span className="w-8 h-px bg-stone-300" />
            </div>

            <motion.h2 
              initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1F1F] tracking-tight leading-tight"
            >
              Before the
              <br />
              <CelebrationHandwriting />
              <span className="font-bold text-[#1F1F1F]">Begins</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              A few quick answers to help you get started.
            </motion.p>

          </div>

          {/* RIGHT COLUMN: ACCORDION LIST (Matching Reference Image 3) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            {EXACT_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const Icon = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                    isOpen 
                      ? 'border-stone-200 shadow-sm' 
                      : 'border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  
                  {/* Question Header Button */}
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full px-5 sm:px-7 py-4.5 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                      {/* Left Icon Pill */}
                      <div 
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: faq.iconBg, color: faq.iconColor }}
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>

                      {/* Question Text */}
                      <span className="font-semibold text-sm sm:text-base text-stone-900 tracking-tight">
                        {faq.question}
                      </span>
                    </div>

                    {/* Chevron Arrow */}
                    <div className="w-7 h-7 flex items-center justify-center text-stone-500 flex-shrink-0 transition-transform duration-300">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Box */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#FAF2EE]/60 px-5 sm:px-7 py-4.5 sm:py-5 border-t border-stone-100 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </motion.section>
  );
}
