import React, { useState, useEffect } from 'react';
import { useClockContext } from '../../context/ClockContext';

const Moon = () => {
  const { darkMode } = useClockContext();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getMoonPhase = (date) => {
    const synodic = 29.53059;
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    if (month < 3) {
      year -= 1;
      month += 12;
    }
    
    const a = Math.floor(year / 100);
    const b = Math.floor(a / 4);
    const c = 2 - a + b;
    const e = 365.25 * (year + 4716);
    const f = 30.6001 * (month + 1);
    const jd = c + day + e + f - 1524.5;
    const daysSinceNew = jd - 2451549.5;
    const newMoons = daysSinceNew / synodic;
    const phase = newMoons % 1;
    
    return phase;
  };

  const moonPhase = getMoonPhase(date);
  const clockColor = darkMode ? 'white' : 'black';
  const backgroundColor = darkMode ? '#374151' : 'white';

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg className="w-full h-full max-w-full max-h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill={backgroundColor} stroke={clockColor} strokeWidth="2" />
        <circle cx="50" cy="50" r="40" fill={darkMode ? "#1F2937" : "#D1D5DB"} />
        <path
          d={`M50 10 A 40 40 0 0 ${moonPhase < 0.5 ? 1 : 0} 1 50 90 A ${40 * Math.abs(0.5 - moonPhase) * 4} 40 0 ${moonPhase < 0.5 ? 0 : 1} 1 50 10`}
          fill={darkMode ? "#D1D5DB" : "#1F2937"}
        />
        <text x="50" y="20" textAnchor="middle" fontSize="8" fill={clockColor}>Moon Phase</text>
      </svg>
      <div className={`text-center mt-2 text-xs sm:text-sm md:text-base lg:text-lg ${darkMode ? 'text-white' : 'text-black'}`}>
        {formatDate(date)}
      </div>
    </div>
  );
};

export default Moon;