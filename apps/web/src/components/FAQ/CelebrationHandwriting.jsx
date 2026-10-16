import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CelebrationHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none align-middle mx-1 ${className}`}
    >
      <motion.span
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration: 1.25,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.1,
        }}
        className="relative inline-flex items-center overflow-visible"
      >
        <span className="font-['Playwrite_US_Trad',cursive] font-normal text-[#F5CD51] not-italic text-3xl sm:text-5xl lg:text-6xl inline-block px-1 tracking-tight leading-none overflow-visible">
          celebration
        </span>
      </motion.span>
    </span>
  );
}
