import React, { useState, useEffect, memo } from 'react';

const Alarm = memo(({ darkMode }) => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkAlarms();
  }, [currentTime, alarms]);

  const addAlarm = () => {
    if (newAlarm) {
      setAlarms([...alarms, { time: newAlarm, id: Date.now() }]);
      setNewAlarm('');
    }
  };

  const removeAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const checkAlarms = () => {
    const currentTimeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    alarms.forEach(alarm => {
      if (alarm.time === currentTimeString) {
        alert(`Alarm! It's ${alarm.time}`);
      }
    });
  };

  const buttonClass = darkMode
    ? 'bg-gray-600 text-white hover:bg-gray-500'
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  const inputClass = darkMode
    ? 'bg-gray-700 text-white'
    : 'bg-white text-gray-800';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Alarm Clock</h2>
      <div className="mb-4">
        <input
          type="time"
          value={newAlarm}
          onChange={(e) => setNewAlarm(e.target.value)}
          className={`mr-2 p-2 rounded ${inputClass}`}
        />
        <button
          onClick={addAlarm}
          className={`px-4 py-2 rounded ${buttonClass}`}
        >
          Add Alarm
        </button>
      </div>
      <ul className="w-full">
        {alarms.map(alarm => (
          <li key={alarm.id} className="flex justify-between items-center mb-2">
            <span>{alarm.time}</span>
            <button
              onClick={() => removeAlarm(alarm.id)}
              className={`px-2 py-1 rounded ${buttonClass}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        Current Time: {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
});

export default Alarm;