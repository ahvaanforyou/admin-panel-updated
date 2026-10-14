import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Single continuous stroke path matching Apple hello animation:
// Flows left-to-right through unforgettable without backward line jumps
const STROKE_PATH =
  'M 1.6 89.3 L 18.1 125.9 L 34.6 84.9 L 41.2 125.9 L 54.4 96.6 L 57.7 123.0 L 64.3 84.9 L 77.5 84.9 L 87.4 125.9 L 103.9 93.7 L 117.1 90.8 L 146.8 52.7 L 169.9 32.2 L 199.6 32.2 L 212.8 41.0 L 202.9 67.3 L 169.9 96.6 L 153.4 133.2 L 140.2 163.9 L 143.5 175.7 L 156.7 172.7 L 169.9 147.8 L 183.1 99.5 L 196.3 87.8 L 186.4 105.4 L 196.3 128.8 L 212.8 125.9 L 219.4 96.6 L 206.2 87.8 L 229.3 93.7 L 242.5 84.9 L 255.7 87.8 L 262.3 125.9 L 282.1 93.7 L 301.9 87.8 L 288.7 105.4 L 298.6 128.8 L 315.0 125.9 L 321.6 93.7 L 324.9 133.2 L 311.7 166.9 L 301.9 175.7 L 315.0 172.7 L 334.8 147.8 L 348.0 108.3 L 361.2 93.7 L 374.4 87.8 L 364.5 108.3 L 377.7 128.8 L 394.2 96.6 L 407.4 93.7 L 417.3 41.0 L 420.6 128.8 L 437.1 96.6 L 450.3 93.7 L 463.5 41.0 L 466.8 128.8 L 483.3 96.6 L 503.1 87.8 L 493.2 108.3 L 503.1 128.8 L 519.6 125.9 L 526.2 90.8 L 529.5 128.8 L 549.3 96.6 L 565.8 93.7 L 592.2 32.2 L 602.1 26.3 L 598.8 52.7 L 588.9 128.8 L 608.7 125.9 L 618.5 99.5 L 628.4 93.7 L 641.6 93.7 L 664.7 32.2 L 684.5 29.3 L 694.4 41.0 L 684.5 67.3 L 658.1 128.8 L 677.9 99.5 L 691.1 93.7 L 704.3 87.8 L 694.4 108.3 L 707.6 128.8 L 730.7 111.2 L 750.5 103.9';

const PATH_TOTAL_LENGTH = 2800;

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
        viewBox="0 0 767 202"
        className="w-[280px] min-[380px]:w-[320px] min-[480px]:w-[380px] sm:w-[440px] md:w-[490px] lg:w-[500px] xl:w-[570px] 2xl:w-[630px] h-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="unf-apple-write-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={STROKE_PATH}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="70"
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
            width="767"
            height="202"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
}
