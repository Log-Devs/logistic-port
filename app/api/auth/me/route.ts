import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";

function verifyJwt(token: string) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch {
		return null;
	}
}

function verifyRefresh(token: string) {
	try {
		return jwt.verify(token, REFRESH_SECRET);
	} catch {
		return null;
	}
}

export async function GET(req: NextRequest) {
	const cookie = req.cookies.get("auth_token");
	if (!cookie) {
		return NextResponse.json({ user: null }, { status: 401 });
	}
	const user = verifyJwt(cookie.value);
	if (!user) {
		return NextResponse.json({ user: null }, { status: 401 });
	}
	return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
	// Refresh access token using refresh token
	const refreshCookie = req.cookies.get("refresh_token");
	if (!refreshCookie) {
		return NextResponse.json({ error: "No refresh token" }, { status: 401 });
	}
	const payload = verifyRefresh(refreshCookie.value);
	if (!payload || !payload.sub) {
		return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
	}
	// Issue new access token
	if (typeof payload !== "object" || payload === null || !("name" in payload)) {
		return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
	}
	const userPayload = { sub: payload.sub, name: (payload as jwt.JwtPayload).name };
	const accessToken = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "15m" });
	const { serialize } = await import("cookie");
	const accessCookie = serialize("auth_token", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 15, // 15 min
	});
	const res = NextResponse.json({ success: true });
	res.headers.append("Set-Cookie", accessCookie);
	return res;
}