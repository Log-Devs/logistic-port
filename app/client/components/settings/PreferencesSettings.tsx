"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaGlobeAsia } from "react-icons/fa";

export default function PreferencesSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="flex text-xl font-semibold mb-2"><FaGlobeAsia className="text-2xl mr-3"/>Preferences Settings</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Customize your experience
      </p>
      <form className="space-y-6">
        <div className="border-b border-b-gray-300 py-3 flex items-center justify-between">
            <div>
                <label htmlFor="language" className="block text-md font-semibold mb-2">
                    Language
                </label>
                <p className="text-gray-400">Select your preferred language</p>
            </div>
            <select
                id="language"
                className="ml-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-b-gray-300 py-3">
            {" "}
            <div>
              <h3 className="font-semibold">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle dark mode theme
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mounted && theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary border-2 border-primary hover:border-2 transition-colors"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}
