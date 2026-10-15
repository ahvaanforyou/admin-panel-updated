import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import UnderlineStroke from './UnderlineStroke';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden select-none w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Narrative & Action Contact Buttons                           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center text-left">
            
            {/* Title with Animated Brush Underline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="space-y-0.5"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-bold text-[#351410] tracking-tight leading-[1.08]">
                A Bunch of
                <br />
                <span className="relative inline-block">
                  Creative Monkeys
                  <UnderlineStroke />
                </span>
              </h2>
            </motion.div>

            {/* Story Description exactly matching reference copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-xl"
            >
              We’re a group of <strong className="font-semibold text-stone-900">B.Tech graduates</strong> from <strong className="font-semibold text-stone-900">Andhra Pradesh</strong> with creative minds, big ideas and a little monkey energy! 🐒 It all started when one of our intelligent &amp; Cleverest friend , came up with an idea and shared it with the gang. One idea turned into a shared dream, and together we brought <strong className="font-semibold text-stone-900">Ahvaan for You</strong> to life. From our home in Andhra Pradesh to celebrations across the world, we’re here to turn your special moments into invitations worth remembering.
            </motion.p>

            {/* Action Badges: WhatsApp & Email */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full"
            >
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918985966940?text=Hi%20Ahvaan%20team!%20I%20would%20love%20to%20learn%20more%20about%20your%20digital%20invitations."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-[#F6EFEA] hover:bg-[#EFE5DD] border border-[#ECDDCF] transition-all duration-300 shadow-xs hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Circular WhatsApp Icon */}
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[11px] text-stone-500 font-medium">Chat with us on WhatsApp</span>
                  <span className="block text-xs sm:text-sm font-bold text-[#351410] tracking-wide">+91 898 5966940</span>
                </div>
              </a>

              {/* Email Button */}
              <a
                href="mailto:team@ahvaanforyou.com?subject=Enquiry%20from%20Ahvaan%20Website"
                className="group flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-[#F6EFEA] hover:bg-[#EFE5DD] border border-[#ECDDCF] transition-all duration-300 shadow-xs hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Circular Mail Icon */}
                <div className="w-10 h-10 rounded-full bg-[#351410] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] text-stone-500 font-medium">Mail us at</span>
                  <span className="block text-xs sm:text-sm font-bold text-[#351410] tracking-wide">team@ahvaanforyou.com</span>
                </div>
              </a>

            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Creative Monkeys Illustration                               */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex items-center justify-center relative select-none"
          >
            <div className="relative w-full max-w-[540px] flex items-center justify-center">
              <img
                src="/images/about/creative-monkeys.png"
                alt="Creative Monkeys - Ahvaan for You Founders"
                className="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"
                loading="eager"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
