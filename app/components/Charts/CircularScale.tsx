import React, { useEffect, useState } from 'react';

const HalfCircularScale = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  const radius = 50;
  const circumference = Math.PI * radius;
  const percentage = value / maxValue;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    setStrokeDashoffset(circumference * (1 - percentage));
  }, [value, maxValue, percentage, circumference]);

  return (
    <svg className="w-auto h-auto transform" viewBox="0 0 100 50">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(0)">
          <stop offset="0%" stopColor="#bae6fd" /> {/* Light Blue */}
          <stop offset="25%" stopColor="#7dd3fc" /> {/* Medium Blue */}
          <stop offset="50%" stopColor="#38bdf8" /> {/* Darker Blue */}
          <stop offset="75%" stopColor="#ff6d82" /> {/* Light Peachy */}
          <stop offset="100%" stopColor="#fa506d" /> {/* Peachy */}
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
        strokeLinecap="round"
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
        style={{ transition: 'stroke-dashoffset 1s ease-out' }} // Add transition for smooth animation
      />
      <text x="10" y="48" fill="#126c78" fontSize="4" textAnchor="middle">
        0
      </text>{' '}
      {/* Start number */}
      <text x="90" y="48" fill="#126c78" fontSize="4" textAnchor="middle">
        {maxValue}
      </text>{' '}
      {/* End number */}
    </svg>
  );
};

export default HalfCircularScale;
