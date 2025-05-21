import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	// Get the pathname from the URL
	const pathname = request.nextUrl.pathname

	// Check if it's a duplicate client path like /client/client/*
	if (pathname.startsWith('/client/client/')) {
		// Redirect to the login page
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/client/client/:path*'],
}