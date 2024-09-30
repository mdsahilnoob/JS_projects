import React, { useState, useEffect, memo } from 'react';

const Clock = memo(({ darkMode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  const clockColor = darkMode ? '#E5E7EB' : '#1F2937';
  const backgroundColor = darkMode ? '#1F2937' : '#FFFFFF';

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg className="w-full h-full max-w-full max-h-full" viewBox="0 0 100 100">
        {/* Clock face */}
        <circle cx="50" cy="50" r="48" fill={backgroundColor} stroke={clockColor} strokeWidth="2" />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2={i % 3 === 0 ? "5" : "8"}
            transform={`rotate(${i * 30} 50 50)`}
            stroke={clockColor}
            strokeWidth={i % 3 === 0 ? "2" : "1"}
          />
        ))}
        
        {/* Hour numbers */}
        {[3, 6, 9].map((num) => (
          <text
            key={num}
            x="50"
            y="50"
            dy="3"
            textAnchor="middle"
            fontSize="8"
            fontWeight="bold"
            fill={clockColor}
            transform={`rotate(${num * 30} 50 50) translate(0 -38) rotate(-${num * 30})`}
          >
            {num}
          </text>
        ))}
        
        {/* Clock hands */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="24"
          stroke={clockColor}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${hourDegrees} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke={clockColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${minuteDegrees} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="14"
          stroke="red"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondDegrees} 50 50)`}
        />
        
        {/* Center dot */}
        <circle cx="50" cy="50" r="1.5" fill={clockColor} />
      </svg>
      <div className={`text-center mt-2 text-xs sm:text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>
        {formatDate(time)}
      </div>
    </div>
  );
});

export default Clock;
