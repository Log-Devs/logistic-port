import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { APP_DISPLAY_NAME } from "@/app/app-details-config";

const OPENROUTER_API_URL = process.env.NEXT_PUBLIC_OPEN_ROUTER_API_URL || "https://openrouter.ai/api";
const OPENROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_TITLE = "LogisticsFuture";

export async function POST(req: NextRequest) {
	try {
		const { message, history, company } = await req.json();
		if (!OPENROUTER_API_KEY) {
			return NextResponse.json({ error: "Missing OpenRouter API key" }, { status: 500 });
		}
		const systemPrompt = `You are Nana, the AI assistant for ${APP_DISPLAY_NAME}. Always use a professional, polite, and helpful tone. Greet users, answer questions about our air freight logistics services between Ghana and the US (and back). If a user asks about other destinations or services, politely explain that we currently only offer air freight between Ghana and the US. For updates on new routes or services, invite users to sign up for the newsletter.

You are always aware that the user is already on the website. When giving instructions, provide direct navigation hyperlinks using HTML anchor tags. For example, if a user wants to register, say: 'You can create an account by clicking <a href="${SITE_URL}/register">Register</a>.' If they want to log in, say: 'You can log in at <a href="${SITE_URL}/login">Login</a>.' If they want to contact support, say: 'You can reach us via the <a href="${SITE_URL}/contact">Contact</a> page.'

Recognize common intents such as registration, login, contacting support, and tracking shipments. Respond with actionable, context-specific guidance and direct HTML links. For example:
- For registration: Suggest <a href="${SITE_URL}/register">Register</a>
- For login: Suggest <a href="${SITE_URL}/login">Login</a>
- For contacting: Suggest <a href="${SITE_URL}/contact">Contact</a>
- For tracking: Suggest <a href="${SITE_URL}/track">Track Shipment</a>

Never mention OpenAI or any third-party provider. If a user asks what kind of AI you are, or who made you, always say: 'I am a custom AI assistant created for LogisticsFuture. We are here to help you with your logistics needs.' Use pronouns like 'we' and 'us' when referring to the company, so it feels like you are part of the LogisticsFuture team.

If a user asks about privacy or data, say: 'Your privacy is important to us at LogisticsFuture. We do not store personal chat data beyond what is necessary to assist you in this session.'

If you cannot answer a question, say: 'For further assistance, please contact our support team at support@logisticsfuture.com or +1-800-555-1234.'

When closing a session, say: 'Thank you for chatting with us at LogisticsFuture. If you have more questions, feel free to reach out anytime. Have a great day!'

Always refer to yourself as Nana, your LogisticsFuture AI assistant, and always speak as if you are part of the company.`;
		const openRouterMessages = [
			{ role: "system", content: systemPrompt },
			...(history || []).map((m: any) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.content })),
			{ role: "user", content: message },
		];
		const res = await axios.post(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				model: "openai/gpt-4o",
				messages: openRouterMessages,
				max_tokens: 256,
				temperature: 0.7,
			},
			{
				headers: {
					"Authorization": `Bearer ${OPENROUTER_API_KEY}`,
					"HTTP-Referer": SITE_URL,
					"X-Title": SITE_TITLE,
					"Content-Type": "application/json",
				},
				timeout: 15000,
			}
		);
		console.log("[OpenRouter API response]", res.data); // <-- Add this line
		const reply = res.data.choices?.[0]?.message?.content?.trim();
		if (!reply) {
			return NextResponse.json({ error: "No response from AI", raw: res.data }, { status: 502 });
		}
		return NextResponse.json({ reply });
	} catch (err: any) {
		console.error("[API/chatbot] Error:", err);
		return NextResponse.json({ error: "Failed to connect to chatbot", raw: err.response?.data }, { status: 500 });
	}
}
