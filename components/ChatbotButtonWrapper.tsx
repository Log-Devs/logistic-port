"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ChatbotButton with no SSR
const ChatbotButton = dynamic(
  () =>
    import("@/components/ChatbotButton").catch((err) => {
      console.error("Failed to load ChatbotButton:", err);
      return () => <div>Failed to load chat button</div>;
    }),
  { ssr: false }
);

export default function ChatbotButtonWrapper() {
  // Add error boundary and console log to help troubleshoot
  useEffect(() => {
    console.log("ChatbotButtonWrapper mounted");

    // Add error handler for uncaught promise rejections
    interface UnhandledRejectionEvent extends Event {
      reason: unknown;
    }

    const handleError = (event: UnhandledRejectionEvent): void => {
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return (
    <div className="chatbot-wrapper">
      <ChatbotButton />
    </div>
  );
}
