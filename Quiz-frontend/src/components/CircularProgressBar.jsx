// File: frontend/src/components/CircularProgressBar.jsx

import React from 'react';

const CircularProgressBar = ({ percentage }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-block">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4f46e5"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <span className="absolute text-3xl font-bold text-indigo-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {`${Math.round(percentage)}%`}
      </span>
    </div>
  );
};

export default CircularProgressBar;
