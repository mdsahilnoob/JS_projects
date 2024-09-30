import React, { useState, useEffect, memo } from 'react';

const Digi = memo(({ darkMode }) => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24Hour
    };
    let timeString = date.toLocaleTimeString([], options);
    
    if (!is24Hour) {
      // Ensure consistent width for AM/PM
      timeString = timeString.replace(/\s(AM|PM)/, ' $1');
      // Add leading zero to hour if needed
      if (timeString.indexOf(' ') === 1) {
        timeString = '0' + timeString;
      }
    }
    
    return timeString;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const toggleTimeFormat = () => {
    setIs24Hour(!is24Hour);
  };

  const buttonClass = darkMode
    ? 'bg-gray-600 text-white hover:bg-gray-500'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1" aria-live="polite" aria-label="Current time">
        {formatTime(time)}
      </div>
      <div className="text-xs sm:text-sm md:text-base lg:text-lg text-center mb-2" aria-live="polite" aria-label="Current date">
        {formatDate(time)}
      </div>
      <button
        onClick={toggleTimeFormat}
        aria-label={`Switch to ${is24Hour ? '12-hour' : '24-hour'} format`}
        className={`px-2 py-1 text-xs rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
      >
        {is24Hour ? '12h' : '24h'}
      </button>
    </div>
  );
});

export default Digi;
