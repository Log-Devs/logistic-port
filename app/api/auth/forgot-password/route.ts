import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

const CSRF_SECRET = process.env.CSRF_SECRET || "csrfsecret";

// Dummy user store (replace with DB/backend in production)
const USERS: Record<string, { email: string; password: string; name: string; verified: boolean }> = {};

function verifyCsrf(req: NextRequest) {
	const csrfCookie = req.cookies.get("csrf_token")?.value;
	const csrfHeader = req.headers.get("x-csrf-token");
	return csrfCookie && csrfHeader && csrfCookie === csrfHeader;
}

export async function POST(req: NextRequest) {
	// if (!verifyCsrf(req)) {
	// 	return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
	// }
	const { email, newPassword, code } = await req.json();
	// In production, verify the code sent to the user's email
	if (!USERS[email]) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}
	// Simulate code check (replace with real logic)
	if (code !== "123456") {
		return NextResponse.json({ error: "Invalid code" }, { status: 400 });
	}
	USERS[email].password = await bcrypt.hash(newPassword, 10);
	return NextResponse.json({ success: true, message: "Password reset successful." });
}
