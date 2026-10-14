import React from 'react';
import { motion } from 'framer-motion';

export default function UnderlineStroke({ className = '' }) {
  return (
    <div className={`relative w-full max-w-[260px] sm:max-w-[320px] h-3 sm:h-4 overflow-visible -mt-1 sm:-mt-1.5 ${className}`}>
      <svg
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Main dynamic brush underline */}
        <motion.path
          d="M 5 12 C 60 7, 180 5, 312 11"
          stroke="#DE7B26"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1.15,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
        />
        {/* Secondary subtle flourish for organic handmade feel */}
        <motion.path
          d="M 15 15 C 80 11, 210 9, 290 14"
          stroke="#F2A03D"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.65 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 1.25,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.35,
          }}
        />
      </svg>
    </div>
  );
}
