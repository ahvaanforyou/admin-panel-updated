import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CreativeHandsBusy({
  title = "Our Creative Hands Are Busy!",
  subtitle = "Our Team is still working on it !",
  categoryName = "",
  className = ""
}) {
  const handleWhatsAppInquiry = () => {
    const text = categoryName 
      ? `Hii ahvaanforyou , I liked this design https://ahvaanforyou.com/invitations and would like custom options for ${categoryName}.`
      : `Hii ahvaanforyou , I liked your designs https://ahvaanforyou.com/invitations and would like to learn more.`;
    window.open(`https://wa.me/918985966940?text=${encodeURIComponent(text)}`, '_blank');
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
            <svg className="w-4 h-4 fill-current text-[#25D366] flex-shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Request Custom Invitation</span>
            <ArrowRight className="w-4 h-4 text-stone-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
