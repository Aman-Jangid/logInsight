import React from "react";

const LogsTable = () => {
  const dummyLogs = [
    { time: "2025-04-25 10:00:00", message: "Log message 1" },
    { time: "2025-04-25 10:05:00", message: "Log message 2" },
    { time: "2025-04-25 10:10:00", message: "Log message 3" },
    { time: "2025-04-25 10:15:00", message: "Log message 4" },
    { time: "2025-04-25 10:20:00", message: "Log message 5" },
  ];

  return (
    <div
      className="bg-gray-800 rounded shadow-md overflow-hidden"
      style={{ gridColumn: "span 3", gridRow: "span 2" }}
    >
      <div className="flex justify-between items-center bg-gray-700 p-2">
        <div className="flex gap-4">
          <button className="text-gray-300">Logs</button>
          <button className="text-gray-500">Patterns</button>
          <button className="text-gray-500">Insights</button>
        </div>
        <div className="flex gap-2">
          <button className="w-6 h-6 bg-gray-600 rounded"></button>
          <button className="w-6 h-6 bg-gray-600 rounded"></button>
        </div>
      </div>
      <div className="flex justify-between border-b border-gray-600 px-4 py-2">
        <span className="text-gray-400">Time</span>
        <span className="text-gray-400">Message</span>
      </div>
      <div className="overflow-auto max-h-96">
        {dummyLogs.map((log, index) => (
          <div
            key={index}
            className="flex justify-between px-4 py-2 border-b border-gray-700 last:border-b-0"
          >
            <span className="text-gray-300 text-sm">{log.time}</span>
            <span className="text-gray-300 text-sm">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsTable;