import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Single continuous stroke path matching Apple hello animation:
// Flows left-to-right through unforgettable without backward line jumps
const STROKE_PATH =
  'M 28 69 L 38 94 L 48 66 L 52 94 L 60 74 L 62 92 L 66 66 L 74 66 L 80 94 L 90 72 L 98 70 L 116 44 L 130 30 L 148 30 L 156 36 L 150 54 L 130 74 L 120 99 L 112 120 L 114 128 L 122 126 L 130 109 L 138 76 L 146 68 L 140 80 L 146 96 L 156 94 L 160 74 L 152 68 L 166 72 L 174 66 L 182 68 L 186 94 L 198 72 L 210 68 L 202 80 L 208 96 L 218 94 L 222 72 L 224 99 L 216 122 L 210 128 L 218 126 L 230 109 L 238 82 L 246 72 L 254 68 L 248 82 L 256 96 L 266 74 L 274 72 L 280 36 L 282 96 L 292 74 L 300 72 L 308 36 L 310 96 L 320 74 L 332 68 L 326 82 L 332 96 L 342 94 L 346 70 L 348 96 L 360 74 L 370 72 L 386 30 L 392 26 L 390 44 L 384 96 L 396 94 L 402 76 L 408 72 L 416 72 L 430 30 L 442 28 L 448 36 L 442 54 L 426 96 L 438 76 L 446 72 L 454 68 L 448 82 L 456 96 L 470 84 L 482 79';

const PATH_TOTAL_LENGTH = 1800;

export default function UnforgettableHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 2100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none py-0.5 ${className}`}
    >
      {/* 
        Apple 'hello' style SVG continuous stroke writing animation:
        Single continuous flowing stroke from left to right revealing the exact reference calligraphy
      */}
      <svg
        viewBox="0 0 516 154"
        className="w-[250px] min-[380px]:w-[285px] min-[480px]:w-[340px] sm:w-[400px] md:w-[450px] lg:w-[460px] xl:w-[520px] 2xl:w-[570px] h-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="unf-apple-write-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={STROKE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="48"
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
                duration: 1.85,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.15,
              }}
            />
          </mask>
        </defs>

        {/* 
          Renders the exact typography and fine outline from the attached image,
          with 100% transparent background and ample padding so ascenders/descenders are never clipped
        */}
        <g mask={isDone ? undefined : 'url(#unf-apple-write-mask)'}>
          <image
            href="/images/unforgettable-exact-2x.png"
            width="516"
            height="154"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
}
