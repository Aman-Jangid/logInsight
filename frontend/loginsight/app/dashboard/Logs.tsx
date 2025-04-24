"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Download, RefreshCcw } from "lucide-react";

type LogEntry = {
  time: string;
  message: string;
};

const data: LogEntry[] = [
  {
    time: "2025-04-25 10:00:00",
    message: `Something went wrong in the daemon process and it tried to restart the service, which failed. Please check the logs for more details. This is a long message that should be truncated. It contains a lot of information about the error that occurred in the system. The error code is 500 and it indicates a server-side issue. Please contact support if this issue persists. This is a long message that should be truncated. It contains a lot of information about the error that occurred in the system. The error code is 500 and it indicates a server-side issue. Please contact support if this issue persists.`,
  },
  {
    time: "2025-04-25 10:05:00",
    message: `Successfully connected to the database after retrying. The connection was unstable for a while, but it seems to be stable now. Please check the database logs for more details. This is a long message that should be truncated. It contains a lot of information about the connection status and the database performance. The database is running smoothly now and all queries are executing without any issues. Please contact support if you notice any anomalies.`,
  },
  {
    time: "2025-04-25 10:10:00",
    message: `Short message`,
  },
];

const LogsTable = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const columns = useMemo<ColumnDef<LogEntry>[]>(
    () => [
      {
        id: "expander",
        cell: ({ row }) => {
          const rowIndex = row.index;
          const isExpanded = expandedRows.includes(rowIndex);
          return (
            <button
              onClick={() => toggleRow(rowIndex)}
              className="text-gray-400"
            >
              {isExpanded ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          );
        },
        size: 40,
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: (info) => (
          <span className="truncate">{info.getValue() as string}</span>
        ),
        size: 200,
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: (info) => {
          const rowIndex = info.row.index;
          const isExpanded = expandedRows.includes(rowIndex);
          const message = info.getValue() as string;
          return (
            <span
              className={
                isExpanded
                  ? ""
                  : //   TODO: Fix text overflow issue
                    "text-gray-300 text-sm truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[65vw]"
              }
            >
              {message}
            </span>
          );
        },
        size: 300,
      },
    ],
    [expandedRows]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg overflow-hidden shadow-md w-full col-span-3 h-full -mt-2">
      {/* Tabs + Actions */}
      <div className="flex justify-between items-center px-0 py-2 w-full">
        <div className="flex gap-2">
          <button className="text-white font-medium bg-gray-700 rounded-lg px-8 py-2 hover:bg-gray-600">
            Logs
          </button>
          <button className="text-gray-400 hover:text-white bg-gray-900 rounded-lg px-8 py-2 hover:bg-gray-800">
            Patterns
          </button>
          <button className="text-gray-400 hover:text-white bg-gray-900 rounded-lg px-8 py-2 hover:bg-gray-800">
            Insights
          </button>
        </div>
        <div className="flex gap-2 p-1 rounded">
          <button className="p-2 rounded   hover:bg-gray-700 text-gray-300">
            <Download size={18} />
          </button>
          <button className="p-2 rounded  hover:bg-gray-700 text-gray-300">
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden max-h-[500px] min-h-full bg-gray-800 rounded-xl">
        {/* Header */}
        <div className="grid grid-cols-[40px_200px_1fr] text-sm text-gray-400 px-4 border-b border-gray-600">
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header, i) => (
              <div
                key={header.id}
                className={
                  "flex pr-2 py-3 px-4" +
                  (i > 1 ? " border-l border-gray-600" : "")
                }
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            ))
          )}
        </div>

        {/* Body */}
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[40px_200px_1fr] px-4 border-b border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-all duration-200"
          >
            {row.getVisibleCells().map((cell, i) => (
              <div
                onClick={() => {
                  const rowIndex = cell.row.index;
                  toggleRow(rowIndex);
                }}
                key={cell.id}
                className={
                  "flex pr-2 py-4 px-4 align-middle self-center" +
                  (i > 1 ? " border-l border-gray-700" : "")
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsTable;
