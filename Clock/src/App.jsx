import React, { lazy, Suspense } from 'react'
import Clock from './components/clocks/Analog'
import ErrorBoundary from './ErrorBoundary'
import { useClockContext } from './context/ClockContext'

// Lazy load components
const Digi = lazy(() => import('./components/clocks/Digital'))
const Pomodoro = lazy(() => import('./components/timers/Pomodoro'))
const Moon = lazy(() => import('./components/misc/Moon'))
const Stopwatch = lazy(() => import('./components/timers/Stopwatch'))
const Timer = lazy(() => import('./components/timers/Timer'))
const WorldClock = lazy(() => import('./components/clocks/WorldClock'))
const Alarm = lazy(() => import('./components/timers/Alarm'))

// Define color themes and font options
const colorThemes = {
  default: { bg: 'bg-gray-100', text: 'text-gray-900', dark: 'bg-gray-900', darkText: 'text-white' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-900', dark: 'bg-blue-900', darkText: 'text-blue-100' },
  green: { bg: 'bg-green-100', text: 'text-green-900', dark: 'bg-green-900', darkText: 'text-green-100' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-900', dark: 'bg-purple-900', darkText: 'text-purple-100' },
}

const fontOptions = ['font-sans', 'font-serif', 'font-mono']

function App() {
  const {
    darkMode,
    toggleDarkMode,
    clockType,
    setClockType,
    colorTheme,
    setColorTheme,
    fontFamily,
    setFontFamily,
    showSettings,
    toggleSettings,
  } = useClockContext();

  const buttonClass = darkMode
    ? `${colorThemes[colorTheme].dark} ${colorThemes[colorTheme].darkText} hover:opacity-80`
    : `${colorThemes[colorTheme].bg} ${colorThemes[colorTheme].text} hover:opacity-80`;

  return (
    <ErrorBoundary>
      <div className={`flex flex-col justify-center items-center min-h-screen ${fontFamily} ${darkMode ? colorThemes[colorTheme].dark : colorThemes[colorTheme].bg} ${darkMode ? colorThemes[colorTheme].darkText : colorThemes[colorTheme].text}`}>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button 
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button 
            onClick={() => setClockType('digital')}
            aria-label="Switch to digital clock"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Digital
          </button>
          <button 
            onClick={() => setClockType('pomodoro')}
            aria-label="Switch to Pomodoro timer"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Pomodoro
          </button>
          <button 
            onClick={() => setClockType('moon')}
            aria-label="Switch to moon phase display"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Moon Phase
          </button>
          <button 
            onClick={() => setClockType('stopwatch')}
            aria-label="Switch to stopwatch"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Stopwatch
          </button>
          <button 
            onClick={() => setClockType('alarm')}
            aria-label="Switch to alarm clock"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Alarm
          </button>
          <button 
            onClick={() => setClockType('timer')}
            aria-label="Switch to countdown timer"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Timer
          </button>
          <button 
            onClick={() => setClockType('worldclock')}
            aria-label="Switch to world clock"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            World Clock
          </button>
          <button 
            onClick={toggleSettings}
            aria-label="Open settings"
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            ⚙️ Settings
          </button>
        </div>
        {showSettings && (
          <div className={`mb-4 p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="text-lg font-bold mb-2">Settings</h2>
            <div className="mb-2">
              <label className="block mb-1">Color Theme:</label>
              <select 
                value={colorTheme} 
                onChange={(e) => setColorTheme(e.target.value)}
                className={`w-full p-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
              >
                {Object.keys(colorThemes).map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Font:</label>
              <select 
                value={fontFamily} 
                onChange={(e) => setFontFamily(e.target.value)}
                className={`w-full p-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
              >
                {fontOptions.map(font => (
                  <option key={font} value={font}>{font.replace('font-', '')}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
          <div className={`p-4 rounded-3xl shadow-lg ${darkMode ? colorThemes[colorTheme].dark : 'bg-white'}`}>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <div className={clockType === 'analog' ? '' : 'hidden'}>
                  <Clock darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'digital' ? '' : 'hidden'}>
                  <Digi darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'pomodoro' ? '' : 'hidden'}>
                  <Pomodoro darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'moon' ? '' : 'hidden'}>
                  <Moon darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'stopwatch' ? '' : 'hidden'}>
                  <Stopwatch darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'alarm' ? '' : 'hidden'}>
                  <Alarm darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'timer' ? '' : 'hidden'}>
                  <Timer darkMode={darkMode} colorTheme={colorTheme} />
                </div>
                <div className={clockType === 'worldclock' ? '' : 'hidden'}>
                  <WorldClock darkMode={darkMode} colorTheme={colorTheme} />
                </div>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
        {clockType !== 'analog' && (
          <button 
            onClick={() => setClockType('analog')}
            aria-label="Switch back to analog clock"
            className={`mt-4 px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass}`}
          >
            Back to Analog
          </button>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App