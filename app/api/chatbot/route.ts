import { NextRequest, NextResponse } from "next/server";
import { getChatbotResponse } from "@/lib/chatbot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_TITLE = "LogisticsFuture";

/**
 * POST handler for chatbot API
 * Uses getChatbotResponse for dynamic discovery and LLM fallback
 * Returns JSON response
 */
/**
 * POST handler for chatbot API
 * - Filters incoming history for valid messages
 * - Validates input
 * - Uses getChatbotResponse for AI/LLM integration
 * - Returns JSON response
 * - Clean code, robust, and production-ready
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body.message === 'string' ? body.message : '';
    let history = Array.isArray(body.history) ? body.history : [];
    const company = typeof body.company === 'string' ? body.company : SITE_TITLE;

    // Filter history: only valid messages with non-empty string content
    // Type-safe filter: only valid messages with non-empty string content
    history = history.filter((msg: { role?: string; content?: string }) =>
      msg &&
      typeof msg.role === 'string' &&
      typeof msg.content === 'string' &&
      msg.content.trim().length > 0
    );

    if (!message.trim()) {
      return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
    }

    console.log('[API/chatbot] Incoming payload (validated):', { message, history, company });

    // Use the dynamic chatbot logic (AI agent + LLM fallback)
    const response = await getChatbotResponse({ message, history, company });
    // Include both `response` and `reply` keys for backward compatibility
    return NextResponse.json({ response, reply: response });
  } catch (err: any) {
    // Log all error details for debugging
    console.error('[API/chatbot] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Unexpected error in chatbot API route', message: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
