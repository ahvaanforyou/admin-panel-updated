import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function CreativeHandsBusy({
  title = "Our Creative Hands Are Busy!",
  subtitle = "Our Team is still working on it !",
  categoryName = "",
  className = ""
}) {
  const handleWhatsAppInquiry = () => {
    const text = categoryName 
      ? `Hi Ahvaan team! I'm interested in digital invitations for ${categoryName}. Can you share custom design options?`
      : `Hi Ahvaan team! I'd love to learn more about your upcoming invitation designs and custom services.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-14 my-4 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 select-none ${className}`}
    >
      {/* Left: Cute Illustration of Couple with Laptop & Ideas */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="relative max-w-[440px] w-full">
          <img
            src="/images/creative_hands_couple.jpg"
            alt="Our Creative Hands Are Busy"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Right: Traditional Mandala Crest, Heading & Subtitle */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        {/* Maroon Mandala Emblem matching reference */}
        <div className="mb-4 sm:mb-5">
          <img
            src="/images/creative_mandala.png"
            alt="Mandala Emblem"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto md:mx-0 filter drop-shadow-xs"
          />
        </div>

        {/* Heading */}
        <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#351410] tracking-tight leading-[1.15]">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-700 font-medium mt-3 sm:mt-4 leading-relaxed">
          {subtitle}
        </p>

        {categoryName && (
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md">
            New handcrafted designs for <span className="font-semibold text-stone-800">{categoryName}</span> are currently being finalized by our creative studio.
          </p>
        )}

        {/* Friendly CTA Button */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full sm:w-auto bg-[#351410] hover:bg-[#230C0A] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>Request Custom Invitation</span>
            <ArrowRight className="w-4 h-4 text-stone-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
