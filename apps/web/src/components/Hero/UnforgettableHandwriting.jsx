import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Single continuous stroke path matching Apple hello animation:
// Flows left-to-right through unforgettable without backward line jumps
const STROKE_PATH =
  'M 1 61 L 11 86 L 21 58 L 25 86 L 33 66 L 35 84 L 39 58 L 47 58 L 53 86 L 63 64 L 71 62 L 89 36 L 103 22 L 121 22 L 129 28 L 123 46 L 103 66 L 93 91 L 85 112 L 87 120 L 95 118 L 103 101 L 111 68 L 119 60 L 113 72 L 119 88 L 129 86 L 133 66 L 125 60 L 139 64 L 147 58 L 155 60 L 159 86 L 171 64 L 183 60 L 175 72 L 181 88 L 191 86 L 195 64 L 197 91 L 189 114 L 183 120 L 191 118 L 203 101 L 211 74 L 219 64 L 227 60 L 221 74 L 229 88 L 239 66 L 247 64 L 253 28 L 255 88 L 265 66 L 273 64 L 281 28 L 283 88 L 293 66 L 305 60 L 299 74 L 305 88 L 315 86 L 319 62 L 321 88 L 333 66 L 343 64 L 359 22 L 365 18 L 363 36 L 357 88 L 369 86 L 375 68 L 381 64 L 389 64 L 403 22 L 415 20 L 421 28 L 415 46 L 399 88 L 411 68 L 419 64 L 427 60 L 421 74 L 429 88 L 443 76 L 455 71';

const PATH_TOTAL_LENGTH = 1750;

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
      className={`relative inline-flex items-center overflow-visible select-none -ml-1 sm:-ml-1.5 ${className}`}
    >
      {/* 
        Apple 'hello' style SVG continuous stroke writing animation:
        Single continuous flowing stroke from left to right revealing the exact reference calligraphy
      */}
      <svg
        viewBox="0 0 465 138"
        className="w-[280px] min-[380px]:w-[320px] min-[480px]:w-[380px] sm:w-[440px] md:w-[490px] lg:w-[500px] xl:w-[570px] 2xl:w-[630px] h-auto overflow-visible"
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
          with 100% transparent background and tight bounds so there is no gap with "made"
          and letters are never cut off.
        */}
        <g mask={isDone ? undefined : 'url(#unf-apple-write-mask)'}>
          <image
            href="/images/unforgettable-exact-2x.png"
            width="465"
            height="138"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
}
