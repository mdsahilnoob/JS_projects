import React, { createContext, useState, useContext, useEffect } from 'react';

const ClockContext = createContext();

export const useClockContext = () => useContext(ClockContext);

export const ClockProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode !== null ? JSON.parse(savedMode) : false
  });
  const [clockType, setClockType] = useState(() => {
    const savedType = localStorage.getItem('clockType')
    return savedType || 'analog'
  });
  const [colorTheme, setColorTheme] = useState(() => {
    const savedTheme = localStorage.getItem('colorTheme')
    return savedTheme || 'default'
  });
  const [fontFamily, setFontFamily] = useState(() => {
    const savedFont = localStorage.getItem('fontFamily')
    return savedFont || 'font-sans'
  });
  const [showSettings, setShowSettings] = useState(false);

  // States for different clock components
  const [stopwatchState, setStopwatchState] = useState({ time: 0, isRunning: false });
  const [timerState, setTimerState] = useState({ time: 0, isRunning: false });
  const [pomodoroState, setPomodoroState] = useState({
    focusTime: 25,
    breakTime: 5,
    time: 25 * 60,
    isActive: false,
    isBreak: false 
  });
  const [alarmState, setAlarmState] = useState({ alarms: [] });
  const [worldClockState, setWorldClockState] = useState({ selectedTimezones: [] });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    localStorage.setItem('clockType', clockType)
    localStorage.setItem('colorTheme', colorTheme)
    localStorage.setItem('fontFamily', fontFamily)
  }, [darkMode, clockType, colorTheme, fontFamily]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSettings = () => setShowSettings(!showSettings);

  const value = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
    clockType,
    setClockType,
    colorTheme,
    setColorTheme,
    fontFamily,
    setFontFamily,
    showSettings,
    setShowSettings,
    toggleSettings,
    stopwatchState,
    setStopwatchState,
    timerState,
    setTimerState,
    pomodoroState,
    setPomodoroState,
    alarmState,
    setAlarmState,
    worldClockState,
    setWorldClockState,
  };

  return <ClockContext.Provider value={value}>{children}</ClockContext.Provider>;
};