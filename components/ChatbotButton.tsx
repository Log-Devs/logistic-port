"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import dynamic from "next/dynamic";

// Use dynamic import with no SSR
const ChatbotWindow = dynamic(
  () =>
    import("./ChatbotWindow").catch((err) => {
      console.error("Failed to load ChatbotWindow:", err);
      return () => <div>Failed to load chat window</div>;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-28 right-8 w-[450px] h-[60vh] max-w-[95vw] z-[10001] rounded-xl bg-background border border-border shadow-xl flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    ),
  }
);

// Messages that will rotate
const helpMessages = [
  "Need assistance? Chat with Nana!",
  "Questions? Let Nana help you out!",
  "Stuck? Nana is here to assist you!",
  "Get instant help from Nana, your AI assistant",
  "Let Nana guide you through your questions",
];

// Custom hook for rotating messages
function useRotatingMessages({
  messages,
  displayDuration = 3000,
  intervalDuration = 8000,
  isActive = true,
}: {
  messages: string[];
  displayDuration?: number;
  intervalDuration?: number;
  isActive?: boolean;
}) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const displayTimeout = useRef<number | null>(null);
  const intervalTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setShowMessage(false);
      if (displayTimeout.current) clearTimeout(displayTimeout.current);
      if (intervalTimeout.current) clearTimeout(intervalTimeout.current);
      return;
    }
    setShowMessage(true);
    displayTimeout.current = window.setTimeout(() => {
      setShowMessage(false);
      intervalTimeout.current = window.setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        setShowMessage(true);
      }, intervalDuration - displayDuration);
    }, displayDuration) as number;
    return () => {
      if (displayTimeout.current) clearTimeout(displayTimeout.current);
      if (intervalTimeout.current) clearTimeout(intervalTimeout.current);
    };
  }, [
    currentMessage,
    isActive,
    displayDuration,
    intervalDuration,
    messages.length,
  ]);

  useEffect(() => {
    if (!isActive) {
      setShowMessage(false);
    }
  }, [isActive]);

  return { currentMessage, showMessage };
}

interface ChatbotButtonProps {
  /**
   * Scatter animation duration in milliseconds. Useful for testing.
   * @default 1000
   */
  scatterDurationMs?: number;
  /**
   * If true, disables opening the chat window when the FAB is clicked (for test isolation).
   * @default false
   */
  disableOpenOnClick?: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ scatterDurationMs = 1000, disableOpenOnClick = false }) => {
  const [open, setOpen] = useState(false);
  const [isScattered, setIsScattered] = useState(false);
  // Removed showMessage and currentMessage state declarations to avoid redeclaration
  const [dots, setDots] = useState<
    { id: number; x: number; y: number; scale: number; opacity: number }[]
  >([]);
  const intervalRef = useRef<number | null>(null);
  const messageIntervalRef = useRef<number | null>(null);
  // Ref to the chat button, used for outside click detection in ChatbotWindow
  // FIX: Type is React.RefObject<HTMLDivElement> (not HTMLDivElement | null) to match ChatbotWindowProps and OOP handler expectations.
    // Fixed ref declaration with proper null handling
    const buttonRef = useRef<HTMLDivElement>(null);


  // Create scatter particles
  const createScatterParticles = () => {
    if (!buttonRef.current) return;

    // Clear previous animation if running
    if (isScattered) {
      setIsScattered(false);
      setDots([]);
      return;
    }

    const newDots = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    setDots(newDots);
    setIsScattered(true);

    // Reset after animation completes
    setTimeout(() => {
      setIsScattered(false);
    }, scatterDurationMs);
  };

  // Use custom hook for message rotation
  const { currentMessage, showMessage } = useRotatingMessages({
    messages: helpMessages,
    displayDuration: 3000,
    intervalDuration: 8000,
    isActive: !open,
  });
  // Set up the interval for scatter effect
  useEffect(() => {
    // Only create scatter particles if chat is closed
    if (!open) {
      intervalRef.current = window.setInterval(() => {
        createScatterParticles();
      }, 3000) as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [open]);

  const handleOpenChat = () => {
    console.log("Opening chat window");

    // First clear any scatter animations
    setIsScattered(false);
    setDots([]);

    // Clear intervals to prevent new animations
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
      messageIntervalRef.current = null;
    }

    // Open the chat window
    setOpen(true);
  };

  const handleCloseChat = () => {
    console.log("Closing chat window");
    setOpen(false);
  };

  return (
    <>

      <motion.div
        className="fixed bottom-8 right-8 z-[10000]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          {/* Pop-up message */}
          <AnimatePresence>
            {showMessage && !open && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 bg-white rounded-lg shadow-lg p-3 max-w-xs"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  transformOrigin: "bottom right",
                  zIndex: 9999,
                  minWidth: "200px",
                }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                      <span className="text-rose-500 text-lg font-bold">N</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {helpMessages[currentMessage]}
                    </p>
                  </div>
                </div>
                {/* Triangle pointer */}
                <div
                  className="absolute w-4 h-4 bg-white transform rotate-45 right-4 -bottom-2"
                  style={{ zIndex: -1 }}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification indicator */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white z-10"></div>

          {/* Scatter particles - place these BEHIND the button */}
          <AnimatePresence>
            {isScattered &&
              dots.map((dot) => (
                // Add data-testid for robust testability
                <motion.div
                  key={dot.id}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-rose-500 pointer-events-none"
                  data-testid="scatter-dot" // Added for robust testability
                  initial={{ x: 0, y: 0, opacity: 0.8 }}
                  animate={{
                    x: dot.x,
                    y: dot.y,
                    scale: dot.scale,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}
          </AnimatePresence>

          {/* Pulse effect - ensure it doesn't block clicks */}
          <div className="absolute inset-0 rounded-full animate-ping bg-rose-400 opacity-20 pointer-events-none"></div>

          {/* Main button - ensure z-index and position */}
          {/* Wrap button in a div to attach buttonRef for OOP outside click handling */}
          <div ref={buttonRef} style={{ display: "inline-block" }}>
            <button
              aria-label="Chat with Us"
              onClick={() => {
                if (open) {
                  handleCloseChat();
                } else if (disableOpenOnClick) {
                  // For test: only trigger scatter animation, do not open chat
                  createScatterParticles();
                } else {
                  handleOpenChat();
                }
              }}
              style={{ position: "relative", zIndex: 2 }} /* Explicit z-index */
              className={clsx(
                "flex flex-col items-center justify-center",
                "w-16 h-16 rounded-full shadow-lg",
                "bg-gradient-to-r from-rose-600 to-rose-500",
                "text-white transition-all duration-300",
                "hover:shadow-rose-200 hover:shadow-lg hover:scale-105",
                "active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
              )}
              data-testid="chatbot-fab"
            >
            <motion.div
              animate={{
                rotate: isScattered ? [0, 15, -15, 0] : 0,
                scale: isScattered ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <MessageSquare className="w-6 h-6 mb-0.5" />
            </motion.div>
            <span className="text-xs font-medium">Chat</span>
          </button>
          {/* End of buttonRef wrapper div */}
          </div>
        </div>
      </motion.div>

      {/* Chatbot Window */}
      {open && (
        <ChatbotWindow
          onClose={handleCloseChat}
          isOpen={open}
          chatButtonRef={buttonRef} // Pass buttonRef for robust OOP outside click detection
        />
      )}
    </>
  );
};

export default ChatbotButton;
