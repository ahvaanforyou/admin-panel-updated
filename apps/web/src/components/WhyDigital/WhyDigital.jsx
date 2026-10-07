import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, HeartHandshake, Music, Share2, ShieldCheck, Sparkles } from 'lucide-react';

const BENEFITS = [
  {
    icon: HeartHandshake,
    title: 'One-Tap RSVP Tracking',
    description: 'Guests confirm attendance, headcounts, and food preferences with a single tap. Responses sync directly to your WhatsApp.',
    color: '#F7526C',
    bg: '#FFF0F3'
  },
  {
    icon: MapPin,
    title: 'Live Google Maps Navigation',
    description: 'Never answer "Where is the venue?" again. Guests tap to open turn-by-turn driving directions straight to your hall.',
    color: '#0776C6',
    bg: '#E8F5FF'
  },
  {
    icon: Music,
    title: 'Emotional Background Music',
    description: 'Set the celebratory mood from the very first second with romantic acoustic melodies, shehnai, or upbeat party anthems.',
    color: '#FFC655',
    bg: '#FFF4D6'
  },
  {
    icon: Share2,
    title: 'Instant WhatsApp & Social Sharing',
    description: 'Deliver rich interactive cards to family across India and abroad in seconds. No postage delays, zero lost mail.',
    color: '#314A31',
    bg: '#EEF3EC'
  },
  {
    icon: Sparkles,
    title: 'Live Timeline & Muhurtham',
    description: 'Keep all rituals crystal clear with chronological event cards for Mehendi, Haldi, Sangeet, and Reception.',
    color: '#4E1D1D',
    bg: '#FAF8F6'
  },
  {
    icon: ShieldCheck,
    title: 'Eco-Friendly & Timeless',
    description: 'Zero paper wastage, 100% digital keepsake that stays preserved in your cloud family gallery forever.',
    color: '#4E1D1D',
    bg: '#FAF8F6'
  }
];

export default function WhyDigital() {
  return (
    <section id="benefits" className="py-24 bg-[#FAF8F6] relative overflow-hidden">
      
      {/* Subtle background ambient blob */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FFC655]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F7526C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary block mb-2">
            Why Choose Digital Invitations?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-text tracking-tight">
            More than an invitation. An <span className="font-handwriting font-normal text-brand-primary italic">experience</span>.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-muted">
            Static paper cards get misplaced. Ahvaan digital invitations engage your guests with interactive maps, music, and instant confirmations.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-8 border border-brand-border/80 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-soft-sm"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-surface-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-surface-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                  <span>Explore feature</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
