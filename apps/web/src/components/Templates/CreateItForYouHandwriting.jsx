import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CreateItForYouHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none align-middle ${className}`}
    >
      <motion.span
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration: 1.35,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.1,
        }}
        className="relative inline-flex items-center overflow-visible"
      >
        <img
          src="/images/create-it-for-you-2x.png"
          alt="create it for you"
          className="h-[56px] min-[400px]:h-[68px] sm:h-[84px] md:h-[96px] lg:h-[110px] xl:h-[122px] w-auto object-contain select-none pointer-events-none drop-shadow-xs"
        />
      </motion.span>
    </span>
  );
}
