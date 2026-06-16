import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format Time
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  // Start Timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Stop Timer
  const stopTimer = () => {
    setIsRunning(false);

    if (seconds > 0) {
      const newSession = {
        duration: formatTime(seconds),
        completedAt: new Date().toLocaleString(),
      };

      setSessions((prevSessions) => [
        newSession,
        ...prevSessions,
      ]);
    }
  };

  // Reset Timer
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Focus Timer
        </h1>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="mb-6 px-4 py-2 rounded bg-purple-600 text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Timer Display */}
        <div className="text-7xl font-bold mb-8">
          {formatTime(seconds)}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={startTimer}
            className="bg-green-500 text-white px-5 py-2 rounded hover:opacity-90"
          >
            Start
          </button>

          <button
            onClick={stopTimer}
            className="bg-red-500 text-white px-5 py-2 rounded hover:opacity-90"
          >
            Stop
          </button>

          <button
            onClick={resetTimer}
            className="bg-blue-500 text-white px-5 py-2 rounded hover:opacity-90"
          >
            Reset
          </button>
        </div>

        {/* Session History */}
        <div className="text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Session History
          </h2>

          {sessions.length === 0 ? (
            <p>No sessions completed yet.</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session, index) => (
                <div
                  key={index}
                  className={`p-4 rounded border ${
                    darkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <p>
                    <strong>Duration:</strong>{" "}
                    {session.duration}
                  </p>

                  <p>
                    <strong>Completed:</strong>{" "}
                    {session.completedAt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;