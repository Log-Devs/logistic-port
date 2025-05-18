import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";
const CSRF_SECRET = process.env.CSRF_SECRET || "csrfsecret";

// Dummy user store (replace with DB/backend in production)
const USERS: Record<string, { email: string; password: string; name: string; verified: boolean }> = {
	"test@example.com": {
		email: "test@example.com",
		password: bcrypt.hashSync("password123", 10),
		name: "Test User",
		verified: true,
	},
};

function verifyCsrf(req: NextRequest) {
	const csrfCookie = req.cookies.get("csrf_token")?.value;
	const csrfHeader = req.headers.get("x-csrf-token");
	return csrfCookie && csrfHeader && csrfCookie === csrfHeader;
}

export async function POST(req: NextRequest) {
	if (!verifyCsrf(req)) {
		return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
	}
	const { email, password, rememberMe } = await req.json();
	const user = USERS[email];
	if (!user || !user.verified || !(await bcrypt.compare(password, user.password))) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}
	// Issue tokens
	const accessPayload = { sub: email, name: user.name };
	const refreshPayload = { sub: email, name: user.name };
	const accessToken = jwt.sign(accessPayload, JWT_SECRET, { expiresIn: "15m" });
	const refreshToken = jwt.sign(refreshPayload, REFRESH_SECRET, { expiresIn: rememberMe ? "30d" : "2h" });
	const accessCookie = serialize("auth_token", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 15, // 15 min
	});
	const refreshCookie = serialize("refresh_token", refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2, // 30d or 2h
	});
	const res = NextResponse.json({ success: true });
	res.headers.append("Set-Cookie", accessCookie);
	res.headers.append("Set-Cookie", refreshCookie);
	return res;
}