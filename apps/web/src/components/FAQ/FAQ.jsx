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
            
            {/* Top Flourish Ornament with Small Mandala */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
              <span className="w-8 h-px bg-stone-300" />
              <img 
                src="/images/creative_mandala.png" 
                alt="Mandala" 
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-80"
              />
              <span className="w-8 h-px bg-stone-300" />
            </div>

            <motion.h2 
              initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1F1F1F] tracking-tight leading-tight"
            >
              <span className="block">Before the</span>
              <span className="inline-flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 whitespace-nowrap overflow-visible">
                <CelebrationHandwriting />
                <span className="font-bold text-[#1F1F1F]">Begins</span>
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-base sm:text-lg text-stone-500 font-normal leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              A few quick answers to help you get started.
            </motion.p>

          </div>

          {/* RIGHT COLUMN: ACCORDION LIST (Matching Reference Image 3) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-5">
            {EXACT_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const Icon = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                    isOpen 
                      ? 'border-stone-300 shadow-md ring-1 ring-[#FAF2EE]' 
                      : 'border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  
                  {/* Question Header Button */}
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 sm:gap-5 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 flex-1">
                      {/* Left Icon Pill */}
                      <div 
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs"
                        style={{ backgroundColor: faq.iconBg, color: faq.iconColor }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Question Text */}
                      <span className="font-bold text-base sm:text-lg lg:text-xl text-stone-900 tracking-tight leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    {/* Chevron Arrow */}
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0 transition-transform duration-300">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-stone-800" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-600" />
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
                        <div className="bg-[#FAF2EE]/60 px-6 sm:px-8 py-5 sm:py-6 border-t border-stone-100 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
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
