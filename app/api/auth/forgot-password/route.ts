import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Dummy user store (replace with DB/backend in production)
const USERS: Record<string, { email: string; password: string; name: string }> = {
	"test@example.com": { email: "test@example.com", password: "password123", name: "Test User" },
};

export async function POST(req: NextRequest) {
	const { email } = await req.json();
	if (!email || !USERS[email]) {
		// Always return success for security (do not reveal if user exists)
		return NextResponse.json({ success: true });
	}
	// In production, call your backend/email service here to send a reset link
	// Example:
	// await fetch(`${process.env.BACKEND_API_URL}/auth/forgot-password`, { method: "POST", body: JSON.stringify({ email }) });
	return NextResponse.json({ success: true });
}
