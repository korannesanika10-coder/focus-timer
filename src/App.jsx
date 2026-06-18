import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);

    if (seconds > 0) {
      const session = {
        duration: formatTime(seconds),
        completedAt: new Date().toLocaleString(),
      };

      setSessions((prev) => [session, ...prev]);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-8 transition-all ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">
        Focus Timer
      </h1>

      <button
        onClick={toggleTheme}
        className="mb-6 px-4 py-2 bg-purple-600 text-white rounded"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="text-6xl font-bold mb-8">
        {formatTime(seconds)}
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>

        <button
          onClick={stopTimer}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>

        <button
          onClick={resetTimer}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="w-full max-w-md">
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
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
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
  );
}

export default App;
