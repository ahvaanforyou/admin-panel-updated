import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const STROKE_PATH =
  'M 4 45 L 14 70 L 24 42 L 28 70 L 36 50 L 38 68 L 42 42 L 50 42 L 56 70 L 66 48 L 74 46 L 92 20 L 106 6 L 124 6 L 132 12 L 126 30 L 106 50 L 96 75 L 88 96 L 90 104 L 98 102 L 106 85 L 114 52 L 122 44 L 116 56 L 122 72 L 132 70 L 136 50 L 128 44 L 142 48 L 150 42 L 158 44 L 162 70 L 174 48 L 186 44 L 178 56 L 184 72 L 194 70 L 198 48 L 200 75 L 192 98 L 186 104 L 194 102 L 206 85 L 214 58 L 222 48 L 230 44 L 224 58 L 232 72 L 242 50 L 250 48 L 256 20 L 258 72 L 268 50 L 276 48 L 284 20 L 286 72 L 296 50 L 308 44 L 302 58 L 308 72 L 318 70 L 322 46 L 324 72 L 336 50 L 346 48 L 362 6 L 368 2 L 366 20 L 360 72 L 372 70 L 378 52 L 384 48 L 392 48 L 406 6 L 418 4 L 424 12 L 418 30 L 402 72 L 414 52 L 422 48 L 430 44 L 424 58 L 432 72 L 446 60 L 456 55 L 244 34 L 270 34 L 274 34 L 300 34';

const PATH_TOTAL_LENGTH = 2200;

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
      className={`relative inline-flex items-center overflow-visible select-none py-1 ${className}`}
    >
      {/* 
        Apple 'hello' style SVG continuous stroke writing animation:
        Uses an SVG stroke-dasharray and stroke-dashoffset animation that draws through the path
        from start to finish without letter-to-letter breaks, revealing the exact lettering from reference image
      */}
      <svg
        viewBox="0 0 468 106"
        className="w-[240px] min-[380px]:w-[270px] min-[480px]:w-[320px] sm:w-[380px] md:w-[430px] lg:w-[440px] xl:w-[500px] 2xl:w-[550px] h-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="unf-apple-write-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={STROKE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="36"
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
          smoothly drawn out by the Apple hello SVG stroke mask
        */}
        <g mask={isDone ? undefined : 'url(#unf-apple-write-mask)'}>
          <image
            href="/images/unforgettable-exact-2x.png"
            width="468"
            height="106"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
}
