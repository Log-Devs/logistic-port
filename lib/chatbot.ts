import axios from "axios";

const BOT_NAME = "LogisticsFuture";
const OPENROUTER_API_URL = process.env.NEXT_PUBLIC_OPEN_ROUTER_API_URL || "https://openrouter.ai/api";
const OPENROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;

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
const responseCache: Record<string, string> = {};
export function cacheResponse(question: string, answer: string) {
	responseCache[question] = answer;
}
export function getCachedResponse(question: string) {
	return responseCache[question];
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
