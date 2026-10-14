import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Single continuous stroke path matching Apple hello animation for 'Celebration'
const STROKE_PATH =
  'M 14 20 L 8 10 L 12 28 L 22 32 L 30 24 L 36 18 L 34 32 L 44 8 L 40 32 L 48 24 L 54 18 L 52 32 L 60 24 L 66 8 L 64 32 L 72 26 L 78 22 L 86 30 L 92 22 L 98 32 L 104 12 L 106 32 L 114 20 L 116 32 L 124 22 L 130 32 L 138 22 L 144 32 L 150 22 L 156 32 L 164 28 L 174 24 L 184 22';

const PATH_TOTAL_LENGTH = 500;

export default function CelebrationHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none align-middle mx-1 ${className}`}
    >
      <svg
        viewBox="0 0 190 42"
        className="w-[150px] sm:w-[190px] md:w-[220px] lg:w-[250px] h-auto overflow-visible inline-block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="celebration-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={STROKE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                strokeDasharray: PATH_TOTAL_LENGTH,
                strokeDashoffset: PATH_TOTAL_LENGTH,
              }}
              animate={
                isInView
                  ? {
                      strokeDashoffset: 0,
                    }
                  : {
                      strokeDashoffset: PATH_TOTAL_LENGTH,
                    }
              }
              transition={{
                duration: 1.5,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.15,
              }}
            />
          </mask>
        </defs>

        <g mask={isDone ? undefined : 'url(#celebration-mask)'}>
          <image
            href="/images/celebration-2x.png"
            width="190"
            height="42"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </span>
  );
}
