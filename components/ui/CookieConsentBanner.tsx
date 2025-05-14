"use client";
// CookieConsentBanner.tsx
import React, { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <div className="m-4 px-6 py-4 rounded-lg shadow-lg bg-background border border-border flex flex-col md:flex-row items-center gap-4 max-w-2xl w-full md:w-auto">
        <span className="text-sm text-foreground">
          We use cookies to enhance your experience. You can accept or reject
          the use of cookies. Your choice will be remembered.
        </span>
        <div className="flex gap-2 ml-0 md:ml-4">
          <button
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 rounded bg-muted text-foreground border border-border hover:bg-muted/80 transition"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
