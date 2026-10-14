import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Continuous flowing stroke path across 'special moments'
const STROKE_PATH =
  'M 10 45 L 20 28 L 30 52 L 40 40 L 48 56 L 60 40 L 70 56 L 82 22 L 84 56 L 94 40 L 102 56 L 114 40 L 122 56 L 132 18 L 134 56 L 152 40 L 164 56 L 176 40 L 184 56 L 194 40 L 202 56 L 214 38 L 222 56 L 234 40 L 244 56 L 254 18 L 256 56 L 268 40 L 276 56 L 288 40 L 298 56 L 310 40 L 320 54';

const PATH_TOTAL_LENGTH = 1200;

export default function SpecialMomentsHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none align-middle ${className}`}
    >
      <svg
        viewBox="0 0 330 75"
        className="w-[200px] sm:w-[280px] md:w-[320px] lg:w-[360px] h-auto overflow-visible inline-block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="special-moments-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={STROKE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="46"
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
                duration: 1.6,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2,
              }}
            />
          </mask>
        </defs>

        <g mask={isDone ? undefined : 'url(#special-moments-mask)'}>
          <text
            x="5"
            y="54"
            fill="#F5CD51"
            className="font-['Playwrite_US_Trad',cursive] font-normal"
            style={{ fontSize: '48px', letterSpacing: '-0.5px' }}
          >
            special moments
          </text>
        </g>
      </svg>
    </span>
  );
}
