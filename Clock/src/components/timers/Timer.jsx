import React, { useState } from 'react';
import { useClockContext } from '../../context/ClockContext';

const Timer = () => {
  const { darkMode, timerState, setTimerState } = useClockContext();
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  const startTimer = () => {
    const totalSeconds = 
      parseInt(inputHours || '0') * 3600 + 
      parseInt(inputMinutes || '0') * 60 + 
      parseInt(inputSeconds || '0');
    if (totalSeconds > 0) {
      setTimerState({ time: totalSeconds, isRunning: true });
    }
  };

  const pauseTimer = () => setTimerState(prev => ({ ...prev, isRunning: false }));
  const resumeTimer = () => setTimerState(prev => ({ ...prev, isRunning: true }));
  const resetTimer = () => {
    setTimerState({ time: 0, isRunning: false });
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const buttonClass = darkMode
    ? 'bg-gray-600 text-white hover:bg-gray-500'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  const inputClass = darkMode
    ? 'bg-gray-700 text-white'
    : 'bg-white text-gray-800';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Countdown Timer</h2>
      {!timerState.isRunning && timerState.time === 0 ? (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <input
            type="number"
            placeholder="Hours"
            value={inputHours}
            onChange={(e) => setInputHours(e.target.value)}
            className={`w-20 p-2 rounded ${inputClass}`}
          />
          <input
            type="number"
            placeholder="Minutes"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            className={`w-20 p-2 rounded ${inputClass}`}
          />
          <input
            type="number"
            placeholder="Seconds"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(e.target.value)}
            className={`w-20 p-2 rounded ${inputClass}`}
          />
        </div>
      ) : (
        <div className="text-4xl font-bold mb-4">
          {formatTime(timerState.time)}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {!timerState.isRunning && timerState.time === 0 ? (
          <button
            onClick={startTimer}
            className={`px-4 py-2 rounded ${buttonClass}`}
          >
            Start
          </button>
        ) : timerState.isRunning ? (
          <button
            onClick={pauseTimer}
            className={`px-4 py-2 rounded ${buttonClass}`}
          >
            Pause
          </button>
        ) : (
          <button
            onClick={resumeTimer}
            className={`px-4 py-2 rounded ${buttonClass}`}
          >
            Resume
          </button>
        )}
        <button
          onClick={resetTimer}
          className={`px-4 py-2 rounded ${buttonClass}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;