import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Single continuous stroke path matching Apple hello animation for 'create it for you'
const STROKE_PATH =
  'M 10 48 L 20 36 L 12 54 L 22 58 L 32 42 L 40 56 L 50 40 L 56 56 L 68 42 L 78 56 L 88 38 L 96 20 L 98 56 L 112 40 L 122 56 L 140 38 L 144 56 L 156 18 L 158 56 L 168 52 L 186 42 L 198 14 L 196 75 L 202 50 L 218 42 L 228 56 L 240 42 L 250 56 L 264 40 L 274 56 L 282 40 L 286 78 L 278 86 L 292 60 L 308 42 L 318 56 L 330 42 L 340 56 L 350 42 L 356 54';

const PATH_TOTAL_LENGTH = 1000;

export default function CreateItForYouHandwriting({ className = '' }) {
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
        viewBox="0 0 360 92"
        className="w-[280px] min-[400px]:w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px] h-auto overflow-visible inline-block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="create-it-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={STROKE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="44"
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
                duration: 1.65,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.15,
              }}
            />
          </mask>
        </defs>

        <g mask={isDone ? undefined : 'url(#create-it-mask)'}>
          <image
            href="/images/create-it-for-you-2x.png"
            width="360"
            height="92"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </span>
  );
}
