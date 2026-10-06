// =============================================================================
// src/components/common/Sparkline.jsx — Dynamic Real-Time Sparkline Component
// Renders responsive bezier curves and gradient areas reflecting actual data points
// =============================================================================
import React from 'react';

export function getSparklinePaths(data = [], width = 100, height = 40, padding = 4) {
  const pts = Array.isArray(data) && data.length >= 2
    ? data.map(Number)
    : (Array.isArray(data) && data.length === 1 ? [Number(data[0]), Number(data[0])] : [0, 0, 0, 0]);

  const allZero = pts.every(p => !p || p === 0);
  if (allZero) {
    const yBottom = height - padding;
    const line = `M ${padding} ${yBottom} L ${width - padding} ${yBottom}`;
    const area = `M ${padding} ${height} L ${padding} ${yBottom} L ${width - padding} ${yBottom} L ${width - padding} ${height} Z`;
    return { line, area, isZero: true };
  }

  const allEqual = pts.every(p => p === pts[0]);
  if (allEqual) {
    const yMid = Math.round(height / 2);
    const line = `M ${padding} ${yMid} L ${width - padding} ${yMid}`;
    const area = `M ${padding} ${height} L ${padding} ${yMid} L ${width - padding} ${yMid} L ${width - padding} ${height} Z`;
    return { line, area, isZero: false };
  }

  // Anchor min at 0 if points are positive, so graph accurately reflects magnitude
  const minVal = Math.min(...pts);
  const min = minVal >= 0 ? 0 : minVal;
  const max = Math.max(...pts);
  const range = (max - min) || 1;

  const coords = pts.map((val, idx) => {
    const x = padding + (idx / (pts.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((val - min) / range) * (height - 2 * padding);
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  });

  let line = `M ${coords[0][0]} ${coords[0][1]}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const [x0, y0] = coords[i];
    const [x1, y1] = coords[i + 1];
    const cpX1 = x0 + (x1 - x0) * 0.45;
    const cpX2 = x1 - (x1 - x0) * 0.45;
    line += ` C ${cpX1} ${y0}, ${cpX2} ${y1}, ${x1} ${y1}`;
  }

  const area = `${line} L ${coords[coords.length - 1][0]} ${height} L ${coords[0][0]} ${height} Z`;

  return { line, area, isZero: false };
}

export default function Sparkline({
  data = [],
  color = '#3b82f6',
  width = 100,
  height = 40,
  showArea = false,
  className = "w-20 h-9 overflow-visible",
  strokeWidth = 2.5
}) {
  const { line, area, isZero } = getSparklinePaths(data, width, height);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} fill="none">
      {showArea && !isZero && (
        <path d={area} fill={color} fillOpacity="0.12" />
      )}
      <path
        d={line}
        stroke={isZero ? '#cbd5e1' : color}
        strokeWidth={isZero ? 1.5 : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={isZero ? '3 3' : undefined}
      />
    </svg>
  );
}
