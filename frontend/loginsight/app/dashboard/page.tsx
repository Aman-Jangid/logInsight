"use client";

import React, { useState } from "react";

// Main Content Container - Content
import LogsTable from "./Logs";
import VisualInsights from "./VisualInsights";

import {
  LayoutDashboard,
  FileText,
  Bell,
  BarChart3,
  ClipboardList,
  Plug,
  Activity,
  Settings,
  ChevronRight,
} from "lucide-react";
import LiveModeButton from "./LiveModeButton";

enum Services {
  Dashboard = "Dashboard",
  Logs = "Logs",
  Alerts = "Alerts",
  Analytics = "Analytics",
  Reports = "Reports",
  Connections = "Connections",
  Daemon = "Daemon",
  Settings = "Settings",
}

const serviceItems = [
  {
    key: Services.Dashboard,
    icon: LayoutDashboard,
    component: <VisualInsights key={1} />,
  },
  { key: Services.Logs, icon: FileText, component: <LogsTable key={2} /> },
  { key: Services.Alerts, icon: Bell, component: <div key={3} /> },
  { key: Services.Analytics, icon: BarChart3, component: <div key={4} /> },
  { key: Services.Reports, icon: ClipboardList, component: <div key={5} /> },
  { key: Services.Connections, icon: Plug, component: <div key={6} /> },
  { key: Services.Daemon, icon: Activity, component: <div key={7} /> },
  { key: Services.Settings, icon: Settings, component: <div key={8} /> },
];

const Dashboard = () => {
  const [service, setService] = useState<Services>(Services.Dashboard);

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gray-900 text-gray-300">
      {/* Header */}
      <header className="col-span-2 flex items-center justify-between px-4 py-2 bg-gray-800 fixed top-4 left-4 right-4 z-10 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold select-none">LI</div>
          <div className="flex flex-row items-center gap-1">
            <ChevronRight size={22} />
            <div className="text-lg">{service}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10">
            <LiveModeButton />
          </div>
          {/* Profile picture */}
          <div
            className="w-10 h-10 rounded-xl"
            style={{
              backgroundImage:
                "url('https://preview.redd.it/show-me-your-happy-cat-pictures-videos-v0-v4mpdbiafo8c1.jpeg?width=3472&format=pjpg&auto=webp&s=80688169c8d54d2d64cf390ea9bbaac13e297b55')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`bg-transparent p-0 h-[calc(100vh-7.6rem)] flex flex-col gap-4 transition-all duration-300 fixed top-25 left-4 bottom-4 z-10 rounded shadow-md w-64`}
      >
        {/* Services Box */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <div className="grid grid-cols-3 gap-4">
            {serviceItems.map(({ key, icon: Icon }) => (
              <div key={key} className="flex flex-col items-center">
                <button
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${
                    service === key ? "bg-indigo-600" : "bg-gray-900"
                  }`}
                  onClick={() => setService(key)}
                >
                  <Icon size={22} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-gray-800 p-4 rounded shadow-md flex-grow flex flex-col gap-4 transition-all duration-300">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex gap-2">
            <button className="w-1/3 h-8 bg-gray-900 rounded border-b-4 border-blue-500 transition-all duration-300"></button>
            <button className="w-1/3 h-8 bg-gray-900 rounded transition-all duration-300"></button>
            <button className="w-1/3 h-8 bg-gray-900 rounded transition-all duration-300"></button>
          </div>
          <div className="flex-grow bg-gray-900 rounded transition-all duration-300"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="p-2 fixed top-18 left-[calc(16rem+1rem)] right-4 bottom-4 bg-gray-900 rounded shadow-md overflow-auto transition-all duration-300"
        style={{
          marginTop: "calc(0.2rem + 1rem)",
          marginLeft: "calc(0.8rem)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {/* Selected Service */}
        {serviceItems
          .filter(({ key }) => key === service)
          .map(({ component }) => component)}
      </main>
    </div>
  );
};

export default Dashboard;
