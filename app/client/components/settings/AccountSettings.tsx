"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { initialUserData } from "@/lib/constants";

export default function AccountSettings() {
  const [formData, setFormData] = useState(initialUserData);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="flex text-xl font-semibold mb-2">
        <FaUser className="text-2xl mr-3" />
        Account Settings
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Manage your account details and preferences
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="senderName" className="font-semibold">
              Full Name <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              required
              value={formData.senderName}
              onChange={onInputChange}
              placeholder="Enter your full name"
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senderEmail" className="font-semibold">
              Email <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              required
              value={formData.senderEmail}
              onChange={onInputChange}
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senderPhone" className="font-semibold">
              Phone Number <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="tel"
              id="senderPhone"
              name="senderPhone"
              required
              value={formData.senderPhone}
              onChange={onInputChange}
              placeholder="(233) 245-678-901"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="senderCountry" className="font-semibold">
                Country <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="senderCountry"
                name="senderCountry"
                required
                value={formData.senderCountry}
                onChange={onInputChange}
                placeholder="Enter your country"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="senderCity" className="font-semibold">
                City <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="senderCity"
                name="senderCity"
                required
                value={formData.senderCity}
                onChange={onInputChange}
                placeholder="Enter your city"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="senderAddress" className="font-semibold">
              Address <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="text"
              id="senderAddress"
              name="senderAddress"
              required
              value={formData.senderAddress}
              onChange={onInputChange}
              placeholder="Enter your street address"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          
            <div className="space-y-2">
              <label htmlFor="senderZip" className="font-semibold">
                Zip Code <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="senderZip"
                name="senderZip"
                required
                value={formData.senderZip}
                onChange={onInputChange}
                placeholder="Enter your ZIP/postal code"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary border-2 border-primary hover:border-2 transition-colors"
        >
          Save Account Settings
        </button>
      </form>
    </div>
  );
}
