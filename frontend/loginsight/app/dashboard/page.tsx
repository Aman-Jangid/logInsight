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
} from "lucide-react";

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
    component: <VisualInsights />,
  },
  { key: Services.Logs, icon: FileText, component: <LogsTable /> },
  { key: Services.Alerts, icon: Bell, component: <></> },
  { key: Services.Analytics, icon: BarChart3, component: <></> },
  { key: Services.Reports, icon: ClipboardList, component: <></> },
  { key: Services.Connections, icon: Plug, component: <></> },
  { key: Services.Daemon, icon: Activity, component: <></> },
  { key: Services.Settings, icon: Settings, component: <></> },
];

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [service, setService] = useState<Services>(Services.Dashboard);

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gray-900 text-gray-300">
      {/* Header */}
      <header className="col-span-2 flex items-center justify-between px-6 py-2 bg-gray-800 fixed top-4 left-4 right-4 z-10 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">LI</div>
          <div className="text-lg">
            {">"} {service}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-11 h-11 bg-gray-900 rounded-xl"></div>
          <div className="w-11 h-11 bg-gray-900 rounded-xl"></div>
          {/* Profile picture */}
          <div
            className="w-11 h-11  rounded-xl"
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
        className={`bg-transparent p-0 h-[calc(100vh-7rem)] flex flex-col gap-6 transition-all duration-300 fixed top-18 left-4 bottom-4 z-10 rounded shadow-md ${
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
            {serviceItems.map(({ key, icon: Icon }) => (
              <div key={key} className="flex flex-col items-center">
                <button
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${
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
        <div className="bg-gray-800 p-4 rounded shadow-md flex-grow flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex gap-2">
            <button className="w-1/3 h-8 bg-gray-900 rounded border-b-4 border-blue-500 "></button>
            <button className="w-1/3 h-8 bg-gray-900 rounded"></button>
            <button className="w-1/3 h-8 bg-gray-900 rounded"></button>
          </div>
          <div className="flex-grow bg-gray-900 rounded"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="p-2 fixed top-18 left-[calc(16rem+1rem)] right-4 bottom-4 bg-gray-900 rounded shadow-md overflow-auto"
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
