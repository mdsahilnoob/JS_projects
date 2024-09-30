import React, { useEffect } from 'react';
import { useClockContext } from '../../context/ClockContext';

const Stopwatch = () => {
  const { darkMode, clockType, stopwatchState, setStopwatchState } = useClockContext();

  useEffect(() => {
    let interval;
    if (stopwatchState.isRunning && clockType === 'stopwatch') {
      interval = setInterval(() => setStopwatchState(prev => ({ ...prev, time: prev.time + 10 })), 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchState.isRunning, clockType, setStopwatchState]);

  const startStop = () => {
    setStopwatchState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const reset = () => {
    setStopwatchState({ time: 0, isRunning: false });
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  const buttonClass = darkMode
    ? 'bg-gray-600 text-white hover:bg-gray-500'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Stopwatch</h2>
      <div className="text-4xl font-mono mb-4">
        {formatTime(stopwatchState.time)}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={startStop}
          className={`px-4 py-2 rounded ${buttonClass}`}
        >
          {stopwatchState.isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={reset}
          className={`px-4 py-2 rounded ${buttonClass}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;