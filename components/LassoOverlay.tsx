"use client";

import { track, useValue } from "tldraw";
import { lassoPointsAtom } from "./wandAtoms";
import { VecModel } from "tldraw";
import "./LassoOverlay.css";

export const LassoOverlay = track(() => {
  const lassoPoints = useValue(lassoPointsAtom);

  if (!lassoPoints || lassoPoints.length === 0) {
    return null;
  }

  // Convert points to SVG path
  const pathData = lassoPoints.map((point: VecModel, i: number) => {
    const command = i === 0 ? 'M' : 'L';
    return `${command} ${point.x} ${point.y}`;
  }).join(' ');

  return (
    <svg className="tl-overlays__item tl-lasso-overlay">
      <path
        d={pathData}
        fill="rgba(99, 102, 241, 0.08)"
        stroke="rgba(99, 102, 241, 0.8)"
        strokeWidth={2.5}
        strokeDasharray="5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {lassoPoints.map((point: VecModel, i: number) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={3}
          fill="rgba(99, 102, 241, 1)"
        />
      ))}
    </svg>
  );
});
