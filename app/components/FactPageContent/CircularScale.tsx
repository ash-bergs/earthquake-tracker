import React from 'react';

const HalfCircularScale = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  const radius = 50;
  const circumference = Math.PI * radius;
  // amount of half circle to be filled based on passed values
  const percentage = value / maxValue;
  // stroke offset to determine the length of the colored arc
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <svg className="w-auto h-auto transform" viewBox="0 0 100 50">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(0)">
          <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
          <stop offset="25%" stopColor="#10b981" /> {/* Green */}
          <stop offset="50%" stopColor="#fbbf24" /> {/* Yellow */}
          <stop offset="75%" stopColor="#f59e0b" /> {/* Orange */}
          <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
        </linearGradient>
      </defs>
      <path
        d="
          M 10,50
          A 40,40 0 0 1 90,50
        "
        fill="none"
        stroke="#d1d5db"
        strokeWidth="10"
      />
      <path
        d="
          M 10,50
          A 40,40 0 0 1 90,50
        "
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HalfCircularScale;
