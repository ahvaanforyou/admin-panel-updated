import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CelebrationHandwriting({ className = '' }) {
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
          duration: 1.25,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.1,
        }}
        className="relative inline-flex items-center overflow-visible"
      >
        <img
          src="/images/celebration-2x.png"
          alt="Celebration"
          className="h-[30px] min-[400px]:h-[36px] sm:h-[46px] md:h-[52px] lg:h-[58px] xl:h-[64px] w-auto object-contain select-none pointer-events-none drop-shadow-xs"
        />
      </motion.span>
    </span>
  );
}
