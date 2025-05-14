# Cross-App Authentication Logic (Next.js + Vite/React)

## Purpose
This document describes the cross-app authentication logic implemented between the Next.js app (`logistics-portfolio`) and the Vite/React dashboard app (`clientapp`). It also provides guidance for a real-world, production-ready implementation.

---

## Current Demo Logic (Development/Testing)

### Flow
1. **Login, Registration, or Password Reset** in the Next.js app generates a dummy JWT (not a real token).
2. The user is redirected to the React dashboard app with the JWT in the URL:
   - `http://localhost:5173/dashboard?jwt=...`
3. The React app reads the `jwt` from the URL, stores it in `localStorage`, and authenticates the user for the dashboard route.

### Code Example (Next.js)
```js
// After successful login/registration/password reset:
const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
const payload = btoa(JSON.stringify({ sub: email, name: "Test User", iat: Math.floor(Date.now() / 1000) }));
const signature = "signature";
const dummyJwt = `${header}.${payload}.${signature}`;
window.location.href = `http://localhost:5173/dashboard?jwt=${encodeURIComponent(dummyJwt)}`;
```

### Code Example (React/Vite)
```js
// In RequireAuth (on first load):
const url = new URL(window.location.href);
const jwtFromUrl = url.searchParams.get("jwt");
if (jwtFromUrl) {
  localStorage.setItem("jwt", jwtFromUrl);
  url.searchParams.delete("jwt");
  window.history.replaceState({}, document.title, url.pathname + url.search);
}
const hasJwt = Boolean(localStorage.getItem("jwt"));
if (!hasJwt) {
  window.location.href = "http://localhost:3000/login";
}
```

---

## What To Do In A Real Application (Production)

**Do NOT use localStorage or URL-passed JWTs for authentication in production.**

### Recommended Approach
1. **Use Secure Cookies:**
   - Set an `HttpOnly`, `Secure` cookie with the JWT/session token on login/registration/password reset.
   - Set the cookie domain to your root domain (e.g., `.yourdomain.com`) so both apps can access it.
2. **Backend Validation:**
   - Both apps should validate the JWT/session with your backend API on each request.
   - Never trust the client alone for authentication.
3. **Redirects:**
   - After authentication, simply redirect the user to the dashboard app (no need to pass tokens in the URL).
4. **Logout:**
   - Clear the cookie on logout from either app.

### Example (Express/Node Backend)
```js
// On successful login/registration:
res.cookie('token', jwt, {
  httpOnly: true,
  secure: true,
  domain: '.yourdomain.com',
  path: '/',
  sameSite: 'lax',
});
res.redirect('https://app.yourdomain.com/dashboard');
```

### Example (React/Vite Auth Check)
```js
// On load, call your backend to validate the cookie/session
fetch('/api/me', { credentials: 'include' })
  .then(res => res.json())
  .then(user => { /* show dashboard */ })
  .catch(() => {
    window.location.href = 'https://yourdomain.com/login';
  });
```

---

## [2025-05-14] Edit: Now Using Environment Variables for All Secrets, URLs, and JWT

### What Changed
- All hardcoded URLs, secrets, and JWT logic have been refactored to use environment variables from `.env` files.
- Redirect URLs (dashboard, login) and JWT secret are now loaded from `.env`.
- Example variables:
  - `NEXT_PUBLIC_DASHBOARD_URL` (Next.js)
  - `JWT_SECRET` (Next.js)
  - `VITE_DASHBOARD_URL` (Vite/React)
  - `VITE_LOGIN_URL` (Vite/React)
  - `VITE_JWT_SECRET` (Vite/React, if needed)

### Example Usage in Code
```js
// Next.js (login, register, forgot-password)
const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;
const jwtSecret = process.env.JWT_SECRET;

// Vite/React (RequireAuth)
const loginUrl = import.meta.env.VITE_LOGIN_URL;
```

### What To Do When Deploying or Changing URLs/Secrets
1. **Edit your `.env` files** in each project root. Example:
   - logistics-portfolio/.env
   - mainfrontend/clientapp/.env
2. **Never commit real `.env` files to git.** Only commit `.env.example`.
3. **Update your code to always use environment variables for any secret, API URL, or redirect.**
4. **For production:**
   - Set real values for all secrets and URLs in your deployment environment.
   - Use secure cookies and backend validation for JWTs (see previous section in this file for production best practices).

---

## Previous Logic (for reference)
- JWT and URLs were hardcoded in the codebase.
- Now, everything is loaded from environment variables for security and flexibility.

---

## Summary
- **Development:** JWT is passed via URL and stored in localStorage for demo/testing only.
- **Production:** Use secure cookies and backend validation for all authentication.
- All secrets, URLs, and JWT logic are now environment-driven.
- Update your `.env` files for any deployment or secret change.
- See `.env.example` for required variables.
- For production, use secure cookies and backend validation.

Keep this file as a reference for future cross-app authentication implementations.
