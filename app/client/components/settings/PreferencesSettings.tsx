"use client";

import React from 'react';

export default function PreferencesSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Preferences Settings</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Customize your experience</p>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="language" className="block text-sm font-medium mb-2">
            Language
          </label>
          <select
            id="language"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium mb-2">
            Time Zone
          </label>
          <select
            id="timezone"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time (ET)</option>
            <option value="PST">Pacific Time (PT)</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}
