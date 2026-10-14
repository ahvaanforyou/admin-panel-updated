import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function UnforgettableHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-baseline overflow-visible select-none -ml-1 sm:-ml-1.5 ${className}`}
    >
      {/* 
        Smooth continuous writing wipe reveal:
        Smoothly unrolls the exact calligraphy from left to right with ZERO chipped artifacts,
        ZERO missing letter loops, and no 2-second snapping.
      */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration: 1.35,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.15,
        }}
        className="relative inline-flex items-baseline"
      >
        <img
          src="/images/unforgettable-exact-2x.png"
          alt="unforgettable"
          className="h-[46px] min-[400px]:h-[54px] sm:h-[64px] lg:h-[72px] xl:h-[82px] 2xl:h-[92px] w-auto object-contain select-none pointer-events-none drop-shadow-xs"
        />
      </motion.div>
    </div>
  );
}
