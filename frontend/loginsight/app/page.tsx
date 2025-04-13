"use client";

import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to LogInsight</h1>
          <p className="text-lg text-gray-600 mt-2">
            Your gateway to a smarter log handling experience.
          </p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-40 hover:bg-blue-600 transition"
            onClick={() => redirect("/register")}
          >
            Sign Up
          </button>
          <button
            className="bg-gray-800 text-white px-6 py-3 rounded-lg w-40 hover:bg-gray-700 transition"
            onClick={() => console.log("Later...")}
            // onClick={() => redirect("/login")}
          >
            Login
          </button>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-2 mt-16 text-center">
        <p className="text-sm text-gray-500">
          Explore our{" "}
          <a
            href="https://github.com/Aman-Jangid/loginsight"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>{" "}
          repository for more information.
        </p>
        <p className="text-sm text-gray-500">
          &copy; 2025 LogInsight. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
