# Auth Logic for Production (Next.js, httpOnly Cookies)

## Overview
This document describes the authentication logic for a production-ready Next.js app using httpOnly cookies for JWT storage. This approach is secure and works with SSR/CSR.

---

## API Routes

### 1. `/api/auth/login` (POST)
- Accepts: `{ email, password, rememberMe }` in JSON body.
- Validates credentials (demo: test@example.com / password123).
- Issues a JWT and sets it in an httpOnly, Secure cookie.
- `rememberMe` controls cookie expiration (30 days if true, 2 hours if false).
- Returns: `{ success: true }` or `{ error: "Invalid credentials" }`.

### 2. `/api/auth/logout` (POST)
- Clears the `auth_token` cookie.
- Returns: `{ success: true }`.

### 3. `/api/auth/me` (GET)
- Reads the JWT from the `auth_token` cookie.
- Decodes and returns the user info, or 401 if not authenticated.
- Returns: `{ user }` or `{ user: null }`.

---

## Client Logic

- **Never store JWT in localStorage in production.**
- Use `fetch('/api/auth/login', { method: 'POST', body: ... })` to log in.
- Use `fetch('/api/auth/logout', { method: 'POST' })` to log out.
- Use `fetch('/api/auth/me')` to get the current user (for hydration, SSR, or client-side checks).
- The "Remember me" checkbox on login controls the cookie's maxAge.

---

## Example Usage

### Login
```js
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, rememberMe }),
});
if (res.ok) {
  // Auth cookie is set, redirect or reload as needed
}
```

### Logout
```js
await fetch('/api/auth/logout', { method: 'POST' });
// Auth cookie is cleared
```

### Get Current User
```js
const res = await fetch('/api/auth/me');
if (res.ok) {
  const { user } = await res.json();
  // Use user info
}
```

---

## Security Notes
- Always use httpOnly, Secure cookies for JWT in production.
- Never expose JWTs to client JS or URLs.
- Validate JWTs on the server for protected API routes/pages.
- Use a real JWT library for signing/verification in production.

---

## See Also
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes)
- [Cookies in Next.js](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [JWT Best Practices](https://auth0.com/docs/secure/tokens/json-web-tokens)

---

# Production-Ready Auth Integration with Real Backend (Next.js)

## 1. Environment Variables

Add these to your `.env` (and `.env.production` for production):

```
# JWT secrets (change in production!)
JWT_SECRET=devsecret
REFRESH_SECRET=refreshsecret
# Backend API URL (for real backend integration)
BACKEND_API_URL=http://localhost:5000 # <-- Change to your backend URL in prod
```

---

## 2. Dummy Data (for local/dev only)

In your API routes, you can use dummy users for local testing:

```ts
// Dummy user store (remove for production, use DB/backend instead)
const USERS: Record<string, { email: string; password: string; name: string }> = {
  "test@example.com": { email: "test@example.com", password: "password123", name: "Test User" },
};
```

---

## 3. Where to Integrate Real Backend

**In your API routes (e.g., `/api/auth/login`, `/api/auth/register`):**

Replace the dummy logic with a real backend call:

```ts
// ...existing code...
// Instead of checking dummy users:
// if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) { ... }

// Call your backend API:
const backendRes = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
if (!backendRes.ok) {
  // Handle error from backend
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
const backendData = await backendRes.json();
// backendData should include user info and/or a JWT
// e.g., const { user, token } = backendData;

// If your backend issues JWTs, you can set them as cookies here:
// const jwtToken = backendData.token;
// ...set cookie logic as in the current implementation...

// If your backend does NOT issue JWTs, you can create your own here (not recommended for prod):
// const jwtToken = jwt.sign({ sub: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "15m" });
```

**For registration:**

```ts
// ...existing code...
const backendRes = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password, name }),
});
if (!backendRes.ok) {
  // Handle error from backend
  return NextResponse.json({ error: "Registration failed" }, { status: 400 });
}
const backendData = await backendRes.json();
// ...set cookies as above...
```

---

## 4. Testing Locally
- Use the dummy USERS object and secrets for local development.
- When ready for production, remove dummy data and point to your real backend API.
- Always use strong secrets in production and never commit them to version control.

---

## 5. Summary
- Use dummy data and secrets for local/dev only.
- Use environment variables for secrets and backend URLs.
- Replace dummy logic with real backend API calls as shown above.
- Set JWTs as httpOnly cookies for secure authentication.
- Remove all dummy code before deploying to production.

---

## 6. Where to Update
- `/api/auth/login/route.ts` (login logic)
- `/api/auth/register/route.ts` (registration logic)
- `/api/auth/me/route.ts` (user info/refresh logic)
- `/api/auth/logout/route.ts` (logout logic)

**Commented code blocks above show exactly where to swap in your backend logic.**

---

## 7. Example Dummy User (for dev only)
```ts
// Dummy user for dev:
const DUMMY_USER = {
  email: "test@example.com",
  password: "password123",
  name: "Test User",
};
```

---

## 8. Security Notes
- Never use dummy users or secrets in production.
- Always use httpOnly, Secure cookies for JWTs.
- Validate JWTs on the server for all protected routes.
- Use HTTPS in production.

---

## 9. Forgot Password API Example

Create `app/api/auth/forgot-password/route.ts`:

```ts
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
  // In production, call your backend/API service here to send a reset link
  // Example:
  // await fetch(`${process.env.BACKEND_API_URL}/auth/forgot-password`, { method: "POST", body: JSON.stringify({ email }) });
  return NextResponse.json({ success: true });
}
```

---

## 10. Client-Side Refresh Handler Example

Add this logic to your `components/auth-context.tsx`:

```ts
// ...existing code...
const fetchUser = async () => {
  setLoading(true);
  try {
    let res = await fetch("/api/auth/me", { credentials: "include" });
    if (res.status === 401) {
      // Try to refresh the access token
      const refreshRes = await fetch("/api/auth/me", {
        method: "POST",
        credentials: "include",
      });
      if (refreshRes.ok) {
        // Retry getting user info
        res = await fetch("/api/auth/me", { credentials: "include" });
      }
    }
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      setUser(null);
    }
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUser();
}, []);
// ...existing code...
```

This will keep the user session alive as long as the refresh token is valid, and log out the user if both tokens are expired or invalid.
