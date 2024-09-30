import React, { useEffect } from 'react';
import { useClockContext } from '../../context/ClockContext';

const Pomodoro = () => {
  const { darkMode, pomodoroState, setPomodoroState } = useClockContext();

  useEffect(() => {
    let interval = null;
    if (pomodoroState.isActive && pomodoroState.time > 0) {
      interval = setInterval(() => {
        setPomodoroState(prev => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
    } else if (pomodoroState.time === 0) {
      setPomodoroState(prev => ({
        ...prev,
        isBreak: !prev.isBreak,
        time: prev.isBreak ? prev.focusTime * 60 : prev.breakTime * 60
      }));
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pomodoroState.isActive, pomodoroState.time, setPomodoroState]);

  const toggleTimer = () => {
    setPomodoroState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const resetTimer = () => {
    setPomodoroState(prev => ({
      ...prev,
      isActive: false,
      isBreak: false,
      time: prev.focusTime * 60
    }));
  };

  const handleFocusChange = (e) => {
    const newFocusTime = parseInt(e.target.value, 10);
    setPomodoroState(prev => ({
      ...prev,
      focusTime: newFocusTime,
      time: !prev.isActive && !prev.isBreak ? newFocusTime * 60 : prev.time
    }));
  };

  const handleBreakChange = (e) => {
    const newBreakTime = parseInt(e.target.value, 10);
    setPomodoroState(prev => ({
      ...prev,
      breakTime: newBreakTime,
      time: !prev.isActive && prev.isBreak ? newBreakTime * 60 : prev.time
    }));
  };

  const minutes = Math.floor(pomodoroState.time / 60);
  const seconds = pomodoroState.time % 60;

  const clockColor = darkMode ? '#E5E7EB' : '#1F2937';
  const backgroundColor = darkMode ? '#1F2937' : '#FFFFFF';
  const buttonClass = darkMode
    ? 'bg-gray-600 text-white hover:bg-gray-500'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  const pomoDegrees = (pomodoroState.time / ((pomodoroState.isBreak ? pomodoroState.breakTime : pomodoroState.focusTime) * 60)) * 360;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg className="w-full h-full max-w-full max-h-full" viewBox="0 0 100 100" aria-label="Pomodoro timer">
        <circle cx="50" cy="50" r="48" fill={backgroundColor} stroke={clockColor} strokeWidth="2" />
        <path
          d={`M50 2 A 48 48 0 ${pomoDegrees > 180 ? 1 : 0} 1 ${50 + 48 * Math.sin(pomoDegrees * Math.PI / 180)} ${50 - 48 * Math.cos(pomoDegrees * Math.PI / 180)}`}
          fill="none"
          stroke={pomodoroState.isBreak ? "green" : "red"}
          strokeWidth="4"
        />
        <text x="50" y="40" textAnchor="middle" fontSize="10" fontWeight="bold" fill={clockColor}>
          {pomodoroState.isBreak ? "Break" : "Focus"}
        </text>
        <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="monospace" fill={clockColor}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </text>
      </svg>
      <div className="mt-4 space-x-2">
        <button
          onClick={toggleTimer}
          aria-label={pomodoroState.isActive ? 'Pause timer' : 'Start timer'}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
        >
          {pomodoroState.isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          aria-label="Reset timer"
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
        >
          Reset
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <label htmlFor="focusTime" className="mr-2">Focus Time (minutes):</label>
          <input
            type="number"
            id="focusTime"
            value={pomodoroState.focusTime}
            onChange={handleFocusChange}
            min="1"
            max="60"
            className={`w-16 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        <div>
          <label htmlFor="breakTime" className="mr-2">Break Time (minutes):</label>
          <input
            type="number"
            id="breakTime"
            value={pomodoroState.breakTime}
            onChange={handleBreakChange}
            min="1"
            max="30"
            className={`w-16 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;