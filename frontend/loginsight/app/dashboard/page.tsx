"use client";

import React, { useState } from "react";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gray-900 text-gray-300">
      {/* Header */}
      <header className="col-span-2 flex items-center justify-between px-6 py-2 bg-gray-800 fixed top-4 left-4 right-4 z-10 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">LI</div>
          <div className="text-lg">
            {">"} {window.location.pathname.split("/").pop()}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-11 h-11 bg-gray-900 rounded-xl"></div>
          <div className="w-11 h-11 bg-gray-900 rounded-xl"></div>
          <div className="w-11 h-11 bg-gray-900 rounded-xl"></div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`bg-transparent p-0 h-[calc(100vh-7rem)] flex flex-col gap-6 transition-all duration-300 fixed top-22 left-4 bottom-4 z-10 rounded shadow-md ${
          isSidebarCollapsed ? "w-64" : "w-124"
        }`}
      >
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="self-end text-sm text-gray-400 hover:text-gray-200"
        >
          {/* {isSidebarCollapsed ? "Expand" : "Collapse"} */}
        </button>

        {/* Services Box */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Dashboard</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Logs</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Alerts</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Analytics</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Reports</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Connections</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Daemon</span> */}
            </div>
            <div className="flex flex-col items-center">
              <button className="w-14 h-14 bg-gray-900 rounded-xl"></button>
              {/* <span className="text-xs mt-0.4">Settings</span> */}
            </div>
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-gray-800 p-4 rounded shadow-md flex-grow flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex gap-2">
            <button className="w-1/3 h-10 bg-gray-900 rounded"></button>
            <button className="w-1/3 h-10 bg-gray-900 rounded"></button>
            <button className="w-1/3 h-10 bg-gray-900 rounded"></button>
          </div>
          <div className="flex-grow bg-gray-900 rounded"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="p-4 fixed top-[calc(4rem+1rem)] left-[calc(16rem+1rem)] right-4 bottom-4 bg-gray-900 rounded shadow-md overflow-auto"
        style={{
          marginTop: "calc(0.2rem + 1rem)",
          marginLeft: "calc(0.8rem)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 3", gridRow: "span 1" }}
        ></div>
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 1", gridRow: "span 2" }}
        ></div>
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 1", gridRow: "span 2" }}
        ></div>
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 1", gridRow: "span 4" }}
        ></div>
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 2", gridRow: "span 1" }}
        ></div>
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 1", gridRow: "span 1" }}
        ></div>
        <div
          className="bg-gray-800 rounded"
          style={{ gridColumn: "span 1", gridRow: "span 1" }}
        ></div>
      </main>
    </div>
  );
};

export default Dashboard;
