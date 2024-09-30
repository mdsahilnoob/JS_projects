import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { useClockContext } from '../../context/ClockContext';

const WorldClock = () => {
  const { darkMode, worldClockState, setWorldClockState } = useClockContext();
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(moment()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addTimezone = (e) => {
    const newTimezone = e.target.value;
    if (newTimezone && !worldClockState.selectedTimezones.includes(newTimezone)) {
      setWorldClockState(prev => ({
        ...prev,
        selectedTimezones: [...prev.selectedTimezones, newTimezone]
      }));
    }
  };

  const removeTimezone = (timezone) => {
    setWorldClockState(prev => ({
      ...prev,
      selectedTimezones: prev.selectedTimezones.filter(tz => tz !== timezone)
    }));
  };

  const buttonClass = darkMode
    ? 'bg-gray-600 text-white hover:bg-gray-500'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  const inputClass = darkMode
    ? 'bg-gray-700 text-white'
    : 'bg-white text-gray-800';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">World Clock</h2>
      <select
        onChange={addTimezone}
        className={`w-full p-2 mb-4 rounded ${inputClass}`}
      >
        <option value="">Add a timezone</option>
        {moment.tz.names().map(tz => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
      <div className="w-full space-y-2">
        {worldClockState.selectedTimezones.map(tz => (
          <div key={tz} className="flex justify-between items-center">
            <span>{tz}: {currentTime.tz(tz).format('HH:mm:ss')}</span>
            <button
              onClick={() => removeTimezone(tz)}
              className={`px-2 py-1 rounded ${buttonClass}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;