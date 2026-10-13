import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Exact vectorized glyph path of 'unforgettable' from the reference image
const GLYPH_PATH = "M 1 35 L 4 39 L 6 40 L 10 40 L 13 39 L 16 37 L 20 33 L 21 37 L 24 40 L 28 40 L 34 36 L 40 27 L 43 20 L 47 15 L 47 18 L 45 24 L 45 27 L 41 37 L 41 39 L 43 40 L 47 39 L 48 37 L 48 35 L 52 27 L 56 21 L 63 14 L 65 13 L 68 14 L 68 17 L 63 30 L 63 37 L 66 40 L 70 40 L 76 36 L 77 39 L 71 55 L 70 59 L 70 64 L 71 66 L 74 69 L 80 69 L 84 66 L 87 60 L 89 53 L 91 38 L 95 38 L 101 34 L 106 39 L 108 40 L 116 40 L 121 38 L 126 33 L 128 30 L 128 28 L 129 26 L 131 24 L 137 24 L 139 23 L 145 16 L 150 14 L 153 15 L 150 24 L 148 27 L 146 33 L 146 35 L 148 39 L 150 40 L 154 40 L 159 37 L 161 35 L 166 40 L 171 40 L 175 38 L 178 35 L 179 38 L 175 42 L 171 44 L 166 48 L 161 53 L 158 58 L 158 66 L 162 69 L 169 69 L 173 67 L 177 62 L 180 55 L 184 42 L 190 37 L 195 35 L 198 38 L 202 40 L 207 40 L 212 38 L 215 36 L 219 32 L 221 35 L 222 38 L 225 40 L 229 40 L 232 39 L 235 37 L 239 33 L 240 36 L 243 39 L 245 40 L 249 40 L 254 37 L 256 35 L 261 40 L 266 40 L 270 38 L 274 34 L 277 39 L 279 40 L 283 40 L 292 34 L 294 38 L 297 40 L 304 40 L 307 39 L 310 37 L 315 32 L 317 29 L 320 21 L 322 19 L 325 21 L 329 22 L 327 27 L 327 34 L 328 36 L 332 40 L 337 40 L 346 36 L 348 38 L 352 40 L 359 40 L 362 39 L 367 36 L 370 32 L 369 28 L 366 28 L 362 32 L 358 34 L 354 34 L 352 32 L 361 24 L 365 17 L 365 12 L 362 8 L 357 7 L 356 8 L 353 8 L 349 9 L 351 7 L 355 0 L 348 0 L 345 6 L 341 10 L 340 6 L 342 2 L 342 0 L 336 0 L 334 5 L 332 13 L 331 15 L 328 16 L 327 15 L 324 15 L 322 14 L 321 10 L 319 8 L 318 8 L 317 6 L 319 4 L 321 0 L 315 0 L 313 2 L 310 8 L 306 13 L 305 10 L 307 6 L 307 3 L 308 2 L 308 0 L 302 0 L 298 11 L 294 26 L 287 32 L 283 34 L 282 30 L 289 11 L 288 8 L 282 9 L 277 7 L 275 7 L 274 8 L 271 8 L 267 10 L 261 16 L 258 21 L 257 26 L 253 31 L 249 34 L 246 33 L 245 30 L 248 20 L 250 16 L 252 14 L 259 14 L 260 12 L 260 9 L 252 7 L 254 4 L 254 2 L 255 0 L 248 0 L 248 2 L 245 9 L 234 6 L 236 0 L 229 0 L 228 2 L 227 7 L 225 9 L 221 9 L 219 11 L 219 14 L 223 17 L 223 19 L 222 21 L 215 29 L 208 34 L 204 34 L 202 33 L 201 31 L 204 28 L 207 27 L 212 23 L 216 17 L 216 11 L 213 8 L 210 7 L 207 7 L 201 9 L 198 12 L 195 17 L 192 30 L 189 32 L 188 29 L 190 25 L 190 22 L 194 12 L 194 8 L 188 9 L 182 7 L 180 7 L 179 8 L 176 8 L 172 10 L 166 16 L 163 21 L 162 26 L 154 34 L 153 31 L 159 17 L 159 10 L 157 8 L 149 9 L 146 8 L 146 6 L 144 4 L 141 4 L 139 6 L 138 8 L 139 15 L 135 19 L 133 19 L 130 16 L 130 14 L 129 12 L 124 8 L 121 8 L 120 7 L 113 8 L 109 10 L 105 14 L 101 22 L 101 26 L 95 32 L 90 32 L 89 25 L 97 17 L 107 3 L 108 0 L 101 1 L 98 7 L 93 13 L 93 7 L 96 0 L 89 0 L 89 2 L 87 6 L 82 24 L 81 26 L 77 30 L 70 31 L 71 26 L 74 19 L 74 10 L 72 8 L 69 7 L 64 8 L 60 10 L 56 14 L 55 10 L 52 7 L 50 7 L 47 8 L 43 11 L 37 20 L 34 27 L 29 33 L 28 29 L 34 11 L 34 8 L 29 8 L 27 12 L 27 14 L 24 20 L 20 26 L 13 33 L 11 34 L 8 33 L 8 29 L 11 22 L 14 11 L 14 8 L 9 8 L 1 31 Z M 174 49 L 174 52 L 173 57 L 172 59 L 168 63 L 166 64 L 164 62 L 164 59 L 166 56 L 171 51 L 172 51 Z M 83 41 L 84 46 L 83 47 L 83 52 L 82 56 L 80 61 L 76 62 L 77 57 Z M 243 15 L 243 17 L 240 24 L 234 31 L 233 31 L 230 34 L 228 34 L 226 32 L 226 28 L 230 16 L 232 14 Z M 357 13 L 359 16 L 357 20 L 351 26 L 351 20 L 352 17 Z M 346 13 L 347 15 L 345 18 L 344 21 L 343 32 L 338 34 L 335 34 L 333 32 L 333 29 L 336 20 L 344 15 Z M 277 13 L 281 16 L 275 26 L 267 34 L 265 34 L 263 32 L 263 26 L 266 19 L 271 14 L 274 13 Z M 210 14 L 210 16 L 204 22 L 203 22 L 201 24 L 201 19 L 203 15 L 206 13 Z M 185 14 L 186 17 L 181 25 L 177 30 L 172 34 L 168 33 L 168 26 L 171 19 L 176 14 L 179 13 L 183 13 Z M 119 13 L 121 14 L 124 18 L 124 22 L 123 26 L 122 28 L 116 34 L 110 34 L 107 30 L 107 25 L 108 21 L 109 19 L 114 14 Z M 313 12 L 315 15 L 315 19 L 311 28 L 307 32 L 304 34 L 299 33 L 299 28 L 308 19 Z";

// Natural cursive handwriting stroke path that writes through each letter in order
const PEN_PATH = "M 1 33 L 6 39 L 12 10 L 18 38 L 24 10 L 28 33 L 33 10 L 36 38 L 42 18 L 49 9 L 54 38 L 58 32 L 66 10 L 80 5 L 92 1 L 104 1 L 100 15 L 88 30 L 80 50 L 74 68 L 82 68 L 88 55 L 89 36 L 95 38 L 108 18 L 113 8 L 122 10 L 126 25 L 122 38 L 112 38 L 110 25 L 118 16 L 128 18 L 134 18 L 142 5 L 148 8 L 153 10 L 154 38 L 158 34 L 166 18 L 174 8 L 180 8 L 184 25 L 178 38 L 168 38 L 174 18 L 180 30 L 176 50 L 166 68 L 172 68 L 178 55 L 182 38 L 188 25 L 194 8 L 202 8 L 206 25 L 198 38 L 192 38 L 208 36 L 216 34 L 222 20 L 232 1 L 230 38 L 238 36 L 244 20 L 252 1 L 250 38 L 258 36 L 266 18 L 274 8 L 278 8 L 282 25 L 278 38 L 268 38 L 276 18 L 282 25 L 286 38 L 294 34 L 298 20 L 305 1 L 302 38 L 314 25 L 318 18 L 324 18 L 330 20 L 340 1 L 338 38 L 344 34 L 348 25 L 354 8 L 360 8 L 364 25 L 358 38 L 368 30 L 218 9 L 262 9";

export default function UnforgettableHandwriting({ className = '' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Hold the completed text permanently after writing completes
      const timer = setTimeout(() => {
        setIsAnimationDone(true);
      }, 3100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-flex items-center overflow-visible select-none ${className}`}
      style={{
        lineHeight: 1,
      }}
    >
      <svg
        viewBox="0 0 376 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-[2.8rem] sm:h-[3.6rem] lg:h-[4.2rem] xl:h-[5.0rem] 2xl:h-[5.6rem] overflow-visible drop-shadow-[0_1px_1px_rgba(78,29,29,0.08)]"
        style={{
          display: 'block',
          verticalAlign: 'middle',
        }}
        aria-label="unforgettable"
      >
        <defs>
          <mask id="unforgettable-stroke-mask" maskUnits="userSpaceOnUse">
            {/* Pure black base hides all unwritten portions */}
            <rect x="-10" y="-10" width="400" height="95" fill="black" />

            {/* Continuous pen writing stroke path */}
            <motion.path
              d={PEN_PATH}
              fill="none"
              stroke="white"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: 2.8,
                ease: [0.35, 0.05, 0.25, 1],
                delay: 0.25,
              }}
            />

            {/* Permanent full unmask guarantee once writing completes */}
            {isAnimationDone && (
              <rect x="-10" y="-10" width="400" height="95" fill="white" />
            )}
          </mask>
        </defs>

        {/* 
          Main Typography & Visual Appearance:
          - Exact vectorized shapes from reference
          - Dark burgundy text color: #4E1D1D
          - Fine dark outline: #381313 with 0.6px stroke
          - Letter-spacing: -2.1px preserved precisely
        */}
        <g mask="url(#unforgettable-stroke-mask)">
          <path
            d={GLYPH_PATH}
            fill="#4E1D1D"
            stroke="#381313"
            strokeWidth="0.6"
            strokeLinejoin="round"
            fillRule="evenodd"
            className="transform-gpu"
          />
        </g>
      </svg>
    </div>
  );
}
