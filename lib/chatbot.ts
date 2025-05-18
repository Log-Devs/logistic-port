import axios from "axios";
import { ChatbotAIAgent } from "./ai-agent";

/**
 * Chatbot logic for LogisticsFuture
 * - Handles greetings, service intro, message history, response caching, OpenRouter API integration, error handling, sanitization.
 * - Now supports dynamic app discovery: can find routes, components, APIs using ChatbotAIAgent.
 */

const BOT_NAME = "LogisticsFuture";
const OPENROUTER_API_URL = process.env.NEXT_PUBLIC_OPEN_ROUTER_API_URL || "https://openrouter.ai/api";
const OPENROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;

// --- AI Agent for dynamic discovery ---
const aiAgent = new ChatbotAIAgent();

/**
 * Determines if a user query is a discovery/search request.
 * Returns the search keyword if so, else null.
 */
function parseDiscoveryQuery(query: string): string | null {
  // Supported triggers
  const triggers = ["find", "where", "show", "open", "locate", "search", "route", "component", "api"];
  const lower = query.toLowerCase();
  for (const t of triggers) {
    if (lower.startsWith(t + " ")) {
      // e.g. "find login page" => "login page"
      return lower.replace(t, "").trim();
    }
    if (lower.includes(" " + t + " ")) {
      // e.g. "can you show me the sidebar component?"
      const idx = lower.indexOf(" " + t + " ");
      return lower.slice(idx + t.length + 2).trim();
    }
  }
  return null;
}

// Greeting based on time of day
export function getGreeting(company: string = BOT_NAME) {
	const hour = new Date().getHours();
	if (hour < 12) return `Good morning! Welcome to ${company}.`;
	if (hour < 18) return `Good afternoon! Welcome to ${company}.`;
	return `Good evening! Welcome to ${company}.`;
}

// Service intro
export function getServiceIntro(company: string = BOT_NAME) {
	return `I’m here to help you with ${company} services. Ask me about shipping, tracking, or our company!`;
}

// Conversation history (localStorage) with expiration
const HISTORY_KEY = "tgf-chat-history";
const HISTORY_EXPIRY_MINUTES = 5; // Change to 60 for 1 hour

function getExpiryTimestamp(minutes: number) {
	return Date.now() + minutes * 60 * 1000;
}

export function getHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(HISTORY_KEY);
		if (!raw) return [];
		const { history, expiresAt } = JSON.parse(raw);
		if (!expiresAt || Date.now() > expiresAt) {
			localStorage.removeItem(HISTORY_KEY);
			return [];
		}
		return history || [];
	} catch {
		return [];
	}
}

export function saveHistory(history: any) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(
			HISTORY_KEY,
			JSON.stringify({
				history,
				expiresAt: getExpiryTimestamp(HISTORY_EXPIRY_MINUTES),
			})
		);
	} catch { }
}

export function clearHistory() {
	if (typeof window === "undefined") return;
	try {
		localStorage.removeItem(HISTORY_KEY);
	} catch { }
}

// Simple in-memory cache for responses (per session)
// Exported for testability and clean code
export const responseCache: Record<string, { answer: string; expiresAt: number }> = {};
export function cacheResponse(question: string, answer: string) {
	responseCache[question] = {
		answer,
		expiresAt: getExpiryTimestamp(HISTORY_EXPIRY_MINUTES),
	};
}
export function getCachedResponse(question: string) {
	const cached = responseCache[question];
	if (!cached || Date.now() > cached.expiresAt) {
		delete responseCache[question];
		return undefined;
	}
	return cached.answer;
}

// Send message to internal API route instead of OpenRouter directly
export async function sendChatbotMessage(
	message: string,
	history: { role: "user" | "bot"; content: string }[],
	company: string = BOT_NAME
): Promise<string> {
	try {
		const res = await fetch("/api/chatbot", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message, history, company }),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.error || "Failed to connect to chatbot");
		return data.reply;
	} catch (err: any) {
		console.error("[sendChatbotMessage] Client error:", err);
		throw new Error("Failed to connect to chatbot");
	}
}

// Main chatbot logic: Handles user queries, including dynamic discovery.
// If the query is a discovery/search, uses the AI agent to find and respond contextually.
// Otherwise, falls back to LLM/OpenRouter.
//
// @param message   User's message
// @param history   Chat history (optional)
// @param company   Company name (optional)
// @returns         Chatbot response string
export async function getChatbotResponse({ message, history, company }: {
  message: string;
  history?: any[];
  company?: string;
}): Promise<string> {
  // 1. Check if this is a discovery/search query (e.g., "find login page", "where is the sidebar component")
  const discovery = parseDiscoveryQuery(message);
  if (discovery) {
    // Use the dynamic AI agent to find the route/component/api
    const { type, result } = aiAgent.find(discovery);
    if (type === 'route' && result) {
      // Return route info, including params if dynamic
      return `I found the route \`${result.url}\` (file: \`${result.filePath}\`).${result.dynamic ? ` This is a dynamic route with params: ${result.params.join(', ')}` : ''}`;
    }
    if (type === 'component' && result && result.length) {
      // Return list of matching components
      return `I found the following component(s) matching "${discovery}":\n` + result.map((f: string) => `- \`${f}\``).join('\n');
    }
    if (type === 'api' && result && result.length) {
      // Return list of matching API endpoints
      return `I found the following API endpoint(s) matching "${discovery}":\n` + result.map((f: string) => `- \`${f}\``).join('\n');
    }
    // If nothing found
    return `Sorry, I couldn't find anything matching "${discovery}" in the app.`;
  }

  // 2. Otherwise, use LLM/OpenRouter for general queries
  // Compose messages for OpenRouter API
  const systemPrompt = `You are Nana, the AI assistant for LogisticsFuture. Always use a professional, polite, and helpful tone. Greet users, answer questions about our air freight logistics services between Ghana and the US (and back). If a user asks about other destinations or services, politely explain that we currently only offer air freight between Ghana and the US. For updates on new routes or services, invite users to sign up for the newsletter.\n\nYou are always aware that the user is already on the website. When giving instructions, provide direct navigation hyperlinks using HTML anchor tags. For example, if a user wants to register, say: 'You can create an account by clicking <a href="/register">Register</a>.' If they want to log in, say: 'You can log in at <a href="/login">Login</a>.' If they want to contact support, say: 'You can reach us via the <a href="/contact">Contact</a> page.'\n\nRecognize common intents such as registration, login, contacting support, and tracking shipments. Respond with actionable, context-specific guidance and direct HTML links.\n\nNever mention OpenAI or any third-party provider. If a user asks what kind of AI you are, or who made you, always say: 'I am a custom AI assistant created for LogisticsFuture. We are here to help you with your logistics needs.' Use pronouns like 'we' and 'us' when referring to the company, so it feels like you are part of the LogisticsFuture team.\n\nIf a user asks about privacy or data, say: 'Your privacy is important to us at LogisticsFuture. We do not store personal chat data beyond what is necessary to assist you in this session.'\n\nIf you cannot answer a question, say: 'For further assistance, please contact our support team at support@logisticsfuture.com or +1-800-555-1234.'\n\nWhen closing a session, say: 'Thank you for chatting with us at LogisticsFuture. If you have more questions, feel free to reach out anytime. Have a great day!'\n\nAlways refer to yourself as Nana, your LogisticsFuture AI assistant, and always speak as if you are part of the company.`;

  const openRouterMessages = [
    { role: "system", content: systemPrompt },
    ...(history || []).map((m: any) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.content })),
    { role: "user", content: message },
  ];

  try {
    const res = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "openai/gpt-4o",
        messages: openRouterMessages,
        max_tokens: 256,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );
    const reply = res.data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return "Sorry, I did not receive a valid response from the AI.";
    }
    return reply;
  } catch (apiErr: any) {
    // Error handling for LLM fallback
    return "Sorry, I could not process your request at this time. Please try again later or contact support.";
  }
}
