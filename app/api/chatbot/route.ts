import { NextRequest, NextResponse } from "next/server";
import { getChatbotResponse } from "@/lib/chatbot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_TITLE = "LogisticsFuture";

/**
 * POST handler for chatbot API
 * Uses getChatbotResponse for dynamic discovery and LLM fallback
 * Returns JSON response
 */
export async function POST(req: NextRequest) {
  try {
    const { message, history, company } = await req.json();
    console.log("[API/chatbot] Incoming payload:", { message, history, company });
    // Use the dynamic chatbot logic (AI agent + LLM fallback)
    const response = await getChatbotResponse({ message, history, company });
    // Include both `response` and `reply` keys for backward compatibility
    return NextResponse.json({ response, reply: response });
  } catch (err: any) {
    // Log all error details for debugging
    console.error("[API/chatbot] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error in chatbot API route", message: err.message, stack: err.stack }, { status: 500 });
  }
}
