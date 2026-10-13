import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function UnforgettableHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 1450);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-visible select-none py-1 sm:py-2 ${className}`}
      style={{
        lineHeight: 1,
      }}
    >
      <motion.span
        initial={{
          clipPath: 'polygon(0% -50%, 0% -50%, -6% 150%, 0% 150%)',
          opacity: 0.05,
        }}
        animate={
          isInView
            ? {
                clipPath: 'polygon(0% -50%, 110% -50%, 104% 150%, 0% 150%)',
                opacity: 1,
              }
            : {
                clipPath: 'polygon(0% -50%, 0% -50%, -6% 150%, 0% 150%)',
                opacity: 0.05,
              }
        }
        transition={{
          duration: 1.35,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.15,
        }}
        className="font-['Playwrite_US_Trad',cursive] text-[3.2rem] sm:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.4rem] 2xl:text-[6rem] font-normal text-[#4E1D1D] leading-none inline-block select-none transform-gpu whitespace-nowrap overflow-visible"
        style={{
          letterSpacing: '-2.1px',
          wordSpacing: '-2.1px',
          WebkitTextStroke: '0.5px #381313',
          // Once animation finishes, clear clip-path completely so no pixel is ever clipped
          clipPath: isDone ? 'none' : undefined,
        }}
      >
        unforgettable
      </motion.span>
    </div>
  );
}
