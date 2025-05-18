import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
	// Clear cookies
	const accessCookie = serialize("auth_token", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});
	const refreshCookie = serialize("refresh_token", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});
	const res = NextResponse.json({ success: true });
	res.headers.append("Set-Cookie", accessCookie);
	res.headers.append("Set-Cookie", refreshCookie);
	return res;
}