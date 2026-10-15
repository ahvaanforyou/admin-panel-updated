import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function InspirationHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-baseline overflow-visible select-none align-baseline translate-y-[18%] sm:translate-y-[20%] xl:translate-y-[22%] ${className}`}
    >
      {/* 
        Smooth continuous Apple Hello style handwriting reveal:
        Smoothly unrolls the exact calligraphy from left to right with zero clipping,
        zero artifacts, and fluid natural motion.
      */}
      <motion.span
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration: 1.4,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.2,
        }}
        className="relative inline-flex items-baseline overflow-visible"
      >
        <img
          src="/images/blogs/inspiration-exact.png"
          alt="Inspiration"
          className="h-[36px] min-[400px]:h-[46px] min-[480px]:h-[56px] sm:h-[68px] md:h-[80px] lg:h-[92px] xl:h-[105px] w-auto max-w-none object-contain select-none pointer-events-none drop-shadow-xs"
        />
      </motion.span>
    </span>
  );
}
