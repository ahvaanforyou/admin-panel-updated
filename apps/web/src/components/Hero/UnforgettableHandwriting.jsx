import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function UnforgettableHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-baseline overflow-visible select-none -ml-1 sm:-ml-1.5 translate-y-[24%] sm:translate-y-[26%] xl:translate-y-[28%] ${className}`}
    >
      {/* 
        Smooth continuous calligraphy reveal:
        Scaled to match the x-height and baseline of 'made' exactly as shown in reference design
      */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration: 1.35,
          ease: [0.25, 1, 0.5, 1],
          delay: 0.15,
        }}
        className="relative inline-flex items-baseline overflow-visible"
      >
        <img
          src="/images/unforgettable-exact-2x.png"
          alt="unforgettable"
          className="h-[62px] min-[400px]:h-[74px] sm:h-[92px] lg:h-[105px] xl:h-[122px] 2xl:h-[138px] w-auto max-w-none object-contain select-none pointer-events-none drop-shadow-xs"
        />
      </motion.div>
    </div>
  );
}
