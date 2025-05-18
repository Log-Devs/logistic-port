# API Connection Points & Professional Usage Guide

This document describes how to connect to your backend API endpoints in a professional, production-ready way using environment variables, and how to use dummy data as a fallback. It also includes code snippets, filenames, and locations for edits. Comments are provided for future maintainers.

---

## 1. API Base URL from Environment Variables

**File:** `.env`

```
NEXT_PUBLIC_API_BASE_URL=https://your-production-api.com/api
```

**Usage in code:**
```ts
// Use process.env.NEXT_PUBLIC_API_BASE_URL for all API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
```

---

## 2. Professional API Call Example (with Dummy Data Fallback)

**File:** `components/lib/api.ts` (create this file if it doesn't exist)

```ts
// Professional API call with fallback to dummy data
export async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, dummyData?: T): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    // Fallback to dummy data if provided
    if (dummyData !== undefined) {
      // Comment: This is fallback dummy data for development/testing only
      return dummyData;
    }
    throw err;
  }
}
```

---

## 3. Example Usage in a Component

**File:** `components/SomeComponent.tsx`

```tsx
import { fetchWithFallback } from "@/lib/api";

export default function SomeComponent() {
  // ...existing code...
  useEffect(() => {
    fetchWithFallback("/auth/me", { credentials: "include" }, { user: { name: "Dummy User" } })
      .then(data => {
        // Use data.user
      })
      .catch(err => {
        // Handle error
      });
  }, []);
  // ...existing code...
}
```

---

## 4. Where to Edit

- `.env` — Add or update `NEXT_PUBLIC_API_BASE_URL`.
- `components/lib/api.ts` — Add the `fetchWithFallback` function.
- Any component or hook that calls the API — Use `fetchWithFallback` and pass dummy data as needed.

---

## 5. Comments for Future Maintainers

- Always use the API base URL from environment variables for flexibility between dev/staging/prod.
- Use the `fetchWithFallback` utility for all API calls to ensure robust error handling and easy local development/testing.
- Remove or replace dummy data with real API calls before going to production.
- If you need to add new endpoints, just add the path (e.g., `/auth/login`) to the `fetchWithFallback` call.
- For sensitive endpoints, always pass credentials and handle cookies securely.

---

**This guide is meant to keep your API usage professional, maintainable, and secure.**