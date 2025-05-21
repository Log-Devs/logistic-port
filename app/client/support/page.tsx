"use client";
// Support page for the logistics portfolio app
// Implements clean code, OOP, and UX best practices
// Fully commented and ready for expansion

import React, { useState } from 'react';

/**
 * SupportPage
 * Professional Support page component for the logistics portfolio app.
 * Provides contact form and support information.
 * Follows clean code architecture and OOP principles.
 */
const SupportPage: React.FC = () => {
  // State for contact form fields
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  // State for form submission status
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handles input changes for the contact form
   * @param e - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission
   * @param e - React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, send the form data to support API here
    setSubmitted(true);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-white dark:bg-slate-900">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-blue-900 dark:text-blue-200">Support</h1>
      {/* Support Info Section */}
      <section className="max-w-2xl text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
        <p>
          Need help or have questions? Our support team is here to assist you. Please fill out the form below or email us directly at <a href="mailto:support@logistics.com" className="text-blue-700 underline">support@logistics.com</a>.
        </p>
      </section>
      {/* Contact Form Section */}
      <section className="w-full max-w-md bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md p-8">
        {submitted ? (
          <div className="text-green-700 dark:text-green-300 text-center">
            Thank you for contacting support! We will respond as soon as possible.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Field */}
            <label className="flex flex-col text-left">
              <span className="font-semibold mb-1">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                placeholder="Your Name"
              />
            </label>
            {/* Email Field */}
            <label className="flex flex-col text-left">
              <span className="font-semibold mb-1">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                placeholder="you@email.com"
              />
            </label>
            {/* Message Field */}
            <label className="flex flex-col text-left">
              <span className="font-semibold mb-1">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="rounded border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                placeholder="How can we help you?"
              />
            </label>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Submit
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default SupportPage;
