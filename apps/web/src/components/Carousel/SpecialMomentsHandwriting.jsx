import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SpecialMomentsHandwriting({ className = '' }) {
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
        className="relative inline-flex items-center"
      >
        <span
          className="font-['Playwrite_US_Trad',cursive] text-[#F5CD51] text-3xl sm:text-4xl md:text-[2.6rem] font-normal tracking-tight whitespace-nowrap leading-none"
        >
          special moments
        </span>
      </motion.span>
    </span>
  );
}
