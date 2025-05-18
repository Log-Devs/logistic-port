import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

// Dummy user store (replace with DB in production)
const USERS: Record<string, { email: string; password: string; name: string }> = {};

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";

export async function POST(req: NextRequest) {
	const { email, password, name, rememberMe } = await req.json();
	if (!email || !password || !name) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}
	if (USERS[email]) {
		return NextResponse.json({ error: "User already exists" }, { status: 409 });
	}
	USERS[email] = { email, password, name };
	// Issue tokens
	const accessPayload = { sub: email, name };
	const refreshPayload = { sub: email };
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
