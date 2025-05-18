"use client";
import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  X,
  MoreHorizontal,
  ChevronDown,
  Trash2,
  Download,
  ThumbsUp,
  ThumbsDown,
  Copy,
} from "lucide-react";
import {
  getGreeting,
  getServiceIntro,
  sendChatbotMessage,
  getHistory,
  saveHistory,
  clearHistory,
  cacheResponse,
  getCachedResponse,
} from "@/lib/chatbot";
import { APP_DISPLAY_NAME, BOT_NAME } from "@/app/app-details-config";

interface ChatbotWindowProps {
  onClose: () => void; // Callback to close the chatbot window
  isOpen: boolean; // Controls visibility of the chatbot window
  chatButtonRef: React.RefObject<HTMLDivElement | null>; // Ref to the chat button for outside click logic
}


/**
 * OOP class to encapsulate outside click detection logic for the chatbot window.
 * Accepts refs to the chat window and chat button, and a callback for outside clicks.
 */
// OOP class to encapsulate outside click detection logic for the chatbot window.
// Accepts refs to the chat window and chat button, and a callback for outside clicks.
// FIX: Use React.RefObject<HTMLDivElement> (not HTMLDivElement | null) for compatibility with React's ref typing.
class OutsideClickHandler {
  private chatWindowRef: React.RefObject<HTMLDivElement | null>;
  private chatButtonRef: React.RefObject<HTMLDivElement | null>;
  private onOutsideClick: () => void;
  private isOpen: boolean;

  constructor(
    chatWindowRef: React.RefObject<HTMLDivElement | null>,
    chatButtonRef: React.RefObject<HTMLDivElement | null>,
    onOutsideClick: () => void,
    isOpen: boolean
  ) {
    this.chatWindowRef = chatWindowRef;
    this.chatButtonRef = chatButtonRef;
    this.onOutsideClick = onOutsideClick;
    this.isOpen = isOpen;
    this.handleClick = this.handleClick.bind(this);
  }

  // Main handler for document click events
  handleClick(event: MouseEvent | TouchEvent) {
    if (!this.isOpen) return;
    const chatWindow = this.chatWindowRef.current;
    const chatButton = this.chatButtonRef.current;
    if (
      chatWindow &&
      !chatWindow.contains(event.target as Node) &&
      !(chatButton && chatButton.contains(event.target as Node))
    ) {
      this.onOutsideClick();
    }
  }

  // Attach event listeners
  addListeners() {
    document.addEventListener("mousedown", this.handleClick);
    document.addEventListener("touchstart", this.handleClick);
  }

  // Remove event listeners
  removeListeners() {
    document.removeEventListener("mousedown", this.handleClick);
    document.removeEventListener("touchstart", this.handleClick);
  }
}


// ChatbotWindow is a React functional component that renders the chatbot UI window
// It must not be async and must return JSX at the top level
// Consistent error message for chatbot API failures
const FAILED_TO_CONNECT_ERROR_MESSAGE = "Failed to connect to chatbot. Please try again.";

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose, isOpen, chatButtonRef }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string; timestamp?: string }[]
  >(() => []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuggestionVisible, setSuggestionVisible] = useState(true);
  const [suggestions] = useState([
    "How can I get started?",
    "Tell me about your features",
    "What can you help me with?",
  ]);
  const [showOptions, setShowOptions] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    [index: number]: "positive" | "negative" | null;
  }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const history = getHistory();
      if (history.length === 0) {
        const greeting = getGreeting(APP_DISPLAY_NAME);
        const intro = getServiceIntro(APP_DISPLAY_NAME);
        // Render both greeting and intro on first open for best UX and testability
        setMessages([
          {
            role: "bot",
            content: greeting,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            role: "bot",
            content: intro,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        saveHistory([
          {
            role: "bot",
            content: greeting,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            role: "bot",
            content: intro,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      } else {
        // Add timestamps to existing messages if they don't have them
        const updatedHistory = history.map(
          (msg: {
            role: "user" | "bot";
            content: string;
            timestamp?: string;
          }) => ({
            ...msg,
            timestamp:
              msg.timestamp ||
              new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
          })
        );
        setMessages(updatedHistory);
      }

      // Focus on input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // --- Escape Key Handling for Accessibility ---
      // Handler for Escape keydown event
      const handleEscape = (event: KeyboardEvent) => {
        // If Escape is pressed and window is open, close it
        if (event.key === "Escape") {
          onClose();
        }
      };
      // Attach event listener to document
      document.addEventListener("keydown", handleEscape);
      // Cleanup: Remove event listener on close/unmount
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Use OOP-based OutsideClickHandler for robust outside click detection
  useEffect(() => {
    // Instantiate the handler
    const handler = new OutsideClickHandler(chatWindowRef, chatButtonRef, onClose, isOpen);
    handler.addListeners();
    // Cleanup listeners on unmount or dependency change
    return () => {
      handler.removeListeners();
    };
  }, [isOpen, chatButtonRef, onClose]); // Ensure effect updates if dependencies change

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || loading) return;

    setError(null);
    const sanitized = DOMPurify.sanitize(messageText.trim());
    const newUserMessage = {
      role: "user" as const,
      content: sanitized,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Hide suggestions when user sends a message
    setSuggestionVisible(false);

    setMessages((prev) => {
      const updated = [...prev, { ...newUserMessage, role: "user" }].slice(-20); // Increased history length
      saveHistory(updated);
      return updated as {
        role: "user" | "bot";
        content: string;
        timestamp?: string;
      }[];
    });

    setInput("");

    // Set loading state to true
    setLoading(true);

    try {
      // Show typing indicator immediately
      scrollToBottom();

      // Check for cached response
      const cached = getCachedResponse(sanitized);

      if (cached) {
        // Simulate delay for natural feel
        await new Promise((r) => setTimeout(r, 800));

        // Add cached response to chat history
        setMessages((prev) => {
          const updated = [
            ...prev,
            {
              role: "bot",
              content: cached,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ].slice(-20);
          saveHistory(updated);
          return updated as {
            role: "user" | "bot";
            content: string;
            timestamp?: string;
          }[];
        });
        setLoading(false);
        return;
      }

      // Filter out invalid messages (missing or empty content) before sending to API
      const filteredHistory = messages.filter(
        (msg) => typeof msg.content === "string" && msg.content.trim().length > 0
      );
      // Get actual response from backend
      const response = await sendChatbotMessage(
        sanitized,
        filteredHistory,
        APP_DISPLAY_NAME
      );

      // Cache response for future use
      cacheResponse(sanitized, response);

      // Add bot response to chat history, but only if response is a valid string
      setMessages((prev) => {
        // Enhanced diagnostics: handle backend configuration errors
        let botReply = typeof response === "string" && response.trim().length > 0
          ? response
          : "Sorry, I didn't understand that. Please try again.";

        // If backend returns a configuration error, show special UI and log to console
        if (botReply.startsWith('[Backend Error]')) {
          // Log the backend error for developer diagnostics
          // eslint-disable-next-line no-console
          console.error('Chatbot backend configuration error:', botReply);
          // Display a special message in the chat UI
          botReply = `⚠️ <b>Configuration Error:</b><br>${botReply.replace('[Backend Error]', '').trim()}`;
          botReply = DOMPurify.sanitize(botReply);
        }

        const updated = [
          ...prev,
          {
            role: "bot",
            content: botReply,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ].slice(-20);
        saveHistory(updated);
        return updated as {
          role: "user" | "bot";
          content: string;
          timestamp?: string;
        }[];
      });
      setLoading(false);
      return;
    } catch (err: any) {
      // Set a clear, testable error message for all API/network failures
    setError(FAILED_TO_CONNECT_ERROR_MESSAGE);
      setLoading(false);
    }
  };

  /**
   * Handles when a suggestion is clicked by the user.
   * Sets the input field to the suggestion and sends it as a message.
   * @param suggestion - The suggested question or phrase.
   */
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion); // Set the input field to the suggestion
    handleSend(suggestion); // Send the suggestion as a message
  };

  const handleClearHistory = () => {
    clearHistory();
    const greeting = getGreeting(APP_DISPLAY_NAME);
    setMessages([
      {
        role: "bot",
        content: greeting,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setShowOptions(false);
  };

  const toggleMessageExpansion = (index: number) => {
    setExpandedMessages((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const copyMessageToClipboard = (index: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFeedback = (index: number, type: "positive" | "negative") => {
    setFeedback((prev) => ({ ...prev, [index]: type }));
    // Optionally: send feedback to your backend or analytics here
    // Example: fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ message: messages[index], type }) })
  };

  const exportChatHistory = () => {
    const historyText = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === "user" ? "You" : BOT_NAME}: ${m.content
          }`
      )
      .join("\n\n");

    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowOptions(false);
  };

  /**
   * Checks if a message is long (>150 chars). Handles undefined/null content defensively.
   * Returns false if content is not a valid string.
   */
  const isMessageLong = (content?: string | null): boolean => {
    if (typeof content !== "string") return false;
    return content.length > 150;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={chatWindowRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          "fixed z-[10001]",
          // Responsive positioning
          "bottom-28 right-4 left-4 md:left-auto md:right-8 md:bottom-28",
          // Responsive width
          "w-auto md:w-[450px] max-w-[100vw] md:max-w-[95vw]",
          "flex flex-col rounded-xl shadow-2xl overflow-hidden",
          "border dark:border-zinc-700 bg-background"
        )}
        data-testid="chatbot-window"
      >
        {/* Header */}
        <div
          className={clsx(
            "bg-background border-b border-border/40 transition-colors flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4",
            resolvedTheme === "dark"
              ? "bg-transparent text-white"
              : "bg-background/90 ",
            "chatbot-header"
          )}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white overflow-hidden flex items-center justify-center">
              <img
                src="/avatar-nana.png"
                alt={`${APP_DISPLAY_NAME} Avatar`}
                className="w-6 h-6 sm:w-7 sm:h-7 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/avatar-nana-fallback.svg";
                }}
              />
            </div>
            <div>
              <h2 className="font-semibold text-base sm:text-lg">{BOT_NAME}</h2>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs opacity-90">Online now</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="rounded-full p-1.5 hover:bg-primary-foreground/10 transition-colors relative"
              aria-label="Chat options"
            >
              <MoreHorizontal className="w-5 h-5" />

              {showOptions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-50 py-1 text-foreground">
                  <button
                    onClick={handleClearHistory}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted text-left"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear conversation
                  </button>
                  <button
                    onClick={exportChatHistory}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted text-left"
                  >
                    <Download className="w-4 h-4" />
                    Export chat history
                  </button>
                </div>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-primary-foreground/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto py-3 sm:py-4 px-2 sm:px-3 space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] scroll-smooth"
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={clsx(
                "flex gap-2 sm:gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "bot" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-500 via-rose-400 to-rose-700 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                    <img
                      src="/avatar-nana.png"
                      alt={`${APP_DISPLAY_NAME} Avatar`}
                      className="w-6 h-6 sm:w-7 sm:h-7 object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/avatar-nana-fallback.svg";
                      }}
                    />
                  </div>
                </div>
              )}

              <div
                className={clsx(
                  "max-w-[80%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm relative group",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-muted-foreground rounded-tl-none"
                )}
              >
                <div
                  className={clsx(
                    expandedMessages.includes(i)
                      ? ""
                      : isMessageLong(msg.content)
                        ? "max-h-28 sm:max-h-32 overflow-hidden"
                        : "",
                    "prose dark:prose-invert prose-sm chatbot-message-content"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(msg.content, {
                      ADD_ATTR: ["target", "rel", "class"],
                      ADD_TAGS: ["a"],
                    })
                      // Add a class to all links for professional formatting
                      .replace(
                        /<a /g,
                        '<a class="chatbot-link text-primary font-semibold underline hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer" '
                      ),
                  }}
                />

                {isMessageLong(msg.content) &&
                  !expandedMessages.includes(i) && (
                    <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-muted to-transparent flex items-end justify-center">
                      <button
                        onClick={() => toggleMessageExpansion(i)}
                        className="px-2 py-1 rounded-full bg-background border text-xs font-medium flex items-center gap-1 mb-2 hover:bg-muted transition-colors"
                      >
                        <ChevronDown className="w-3 h-3" />
                        Show more
                      </button>
                    </div>
                  )}

                {isMessageLong(msg.content) && expandedMessages.includes(i) && (
                  <button
                    onClick={() => toggleMessageExpansion(i)}
                    className="mt-2 px-2 py-1 rounded-full bg-background border text-xs font-medium flex items-center gap-1 hover:bg-muted transition-colors"
                  >
                    <ChevronDown className="w-3 h-3 transform rotate-180" />
                    Show less
                  </button>
                )}

                <div className="flex justify-between mt-1">
                  <span className="text-xs opacity-60 pt-1">
                    {msg.timestamp}
                  </span>

                  {msg.role === "bot" && (
                    <div className="invisible group-hover:visible flex items-center gap-1">
                      <button
                        onClick={() => copyMessageToClipboard(i, msg.content)}
                        className="p-1 rounded-full hover:bg-background/50 transition-colors"
                        aria-label="Copy message"
                      >
                        {copied === i ? (
                          <span className="text-xs text-green-500">
                            Copied!
                          </span>
                        ) : (
                          <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                        )}
                      </button>
                      <button
                        onClick={() => handleFeedback(i, "positive")}
                        className={clsx(
                          "p-1 rounded-full transition-colors",
                          feedback[i] === "positive"
                            ? "bg-green-100 text-green-600"
                            : "hover:bg-background/50"
                        )}
                        aria-label="Thumbs up"
                        disabled={feedback[i] === "positive"}
                      >
                        <ThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                      </button>
                      <button
                        onClick={() => handleFeedback(i, "negative")}
                        className={clsx(
                          "p-1 rounded-full transition-colors",
                          feedback[i] === "negative"
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-background/50"
                        )}
                        aria-label="Thumbs down"
                        disabled={feedback[i] === "negative"}
                      >
                        <ThumbsDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.role === "user" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 border-2 border-white shadow flex items-center justify-center overflow-hidden">
                    <img
                      src="/rider.jpg"
                      alt="User Avatar"
                      className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-full border-2 border-zinc-200 shadow"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (
                          e.target as HTMLImageElement
                        ).parentElement!.style.backgroundImage =
                          "url(/rider.jpg)";
                        (
                          e.target as HTMLImageElement
                        ).parentElement!.style.backgroundSize = "cover";
                        (
                          e.target as HTMLImageElement
                        ).parentElement!.style.backgroundPosition = "center";
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 sm:gap-3"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-500 via-rose-400 to-rose-700 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <img
                    src="/avatar-nana.png"
                    alt={`${APP_DISPLAY_NAME} Avatar`}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/avatar-nana.png";
                    }}
                  />
                </div>
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-none p-3 sm:p-3.5 text-xs sm:text-sm shadow-sm">
                {/* Professional typing indicator */}
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.4,
                        delay: 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.4,
                        delay: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                    ></motion.div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground font-medium">
                    {BOT_NAME} is typing...
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/*
  Error message block: Always render this block if error exists.
  Uses ARIA live region for accessibility, ensuring screen readers announce errors immediately.
  Styled for high visibility and user clarity.
*/}
          {error && (
            <div
              className="p-3 sm:p-4 rounded-lg bg-destructive/10 text-destructive-foreground text-xs sm:text-sm border border-destructive/20"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-testid="chatbot-error"
            >
              {/* Error message text */}
              <p className="font-semibold" style={{ wordBreak: 'break-word' }}>{error}</p>
              {/* Retry button for user convenience */}
              <button
                onClick={() => handleSend(input)}
                className="mt-2 text-xs sm:text-sm font-medium underline hover:text-primary"
                aria-label="Retry sending message"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {isSuggestionVisible && messages.length < 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 sm:px-4 pb-2 sm:pb-3"
            >
              <div className="text-xs text-muted-foreground mb-2 font-medium">
                Suggested questions:
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-background border border-border rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs hover:bg-muted transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="border-t p-2 sm:p-3 bg-muted/10">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              disabled={loading}
              className={clsx(
                "flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-background text-foreground border-input"
              )}
              // For robust testability with Testing Library
              data-testid="chatbot-input"
            />
            <button
              className={clsx(
                "p-2 sm:p-2.5 rounded-full transition-colors flex items-center justify-center",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              // For robust testability with Testing Library
              data-testid="chatbot-send"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin"></div>
                </div>
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>

          <div className="flex justify-center mt-2 sm:mt-3">
            <div className="text-xs text-muted-foreground">
              Powered by {APP_DISPLAY_NAME} AI Assistant
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; // End of ChatbotWindow component

export default ChatbotWindow;