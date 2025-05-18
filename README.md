# Logistics Portfolio

A modern, responsive web application for showcasing logistics services, built with Next.js, React, and Tailwind CSS.

## Table of Contents

- [Logistics Portfolio](#logistics-portfolio)
	- [Table of Contents](#table-of-contents)
	- [Overview](#overview)
	- [Features](#features)
	- [Tech Stack](#tech-stack)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Installation](#installation)
		- [Running the Development Server](#running-the-development-server)
		- [Building for Production](#building-for-production)
	- [Folder Structure](#folder-structure)
	- [AI Chatbot Implementation](#ai-chatbot-implementation)
		- [Setup](#setup)
		- [Usage](#usage)
		- [Developer Notes](#developer-notes)
			- [Responsive Sidebar Behavior](#responsive-sidebar-behavior)
      - [Authentication Mode Toggle for Testing](#authentication-mode-toggle-for-testing)
      - [Dependency Conflict Workaround (2025-05-18)](#dependency-conflict-workaround-2025-05-18)
	- [Contributing](#contributing)
	- [License](#license)
	- [Contact](#contact)
	- [Changelog](#changelog)
		- [2025-05-18](#2025-05-18)
			- [Refactored Mobile Sidebar Logic](#refactored-mobile-sidebar-logic)
		- [2025-05-15](#2025-05-15)
			- [Major AI Chatbot Integration and Cross-App Auth Updates](#major-ai-chatbot-integration-and-cross-app-auth-updates)

## Overview

**Logistics Portfolio** is designed to present logistics, warehousing, and delivery services in a visually appealing and interactive way. It features animated components, image preloading, and a clean, professional UI to help logistics businesses establish a strong online presence.

## Features

### [2025-05-18] Sidebar Logout Button Refactor
- The sidebar/footer now uses a dedicated **Logout** button instead of a navigation link.
- The button directly calls the `logout` function from the authentication context (`useAuth`), ensuring best practices for security, SSR, and clean code.
- Button is styled consistently with sidebar items and is fully commented for maintainability.
- This change prevents navigation to a `/logout` route and ensures logout logic is always executed.
- See `app/client/layout.tsx` for implementation details.

### Responsive Sidebar Behavior
- The sidebar now uses the `useIsMobile` custom React hook (see `hooks/use-mobile.tsx`) to detect mobile viewports.
- When navigating via the sidebar on mobile, the sidebar automatically closes for a seamless user experience.
- This logic is encapsulated in a reusable hook for clean code, OOP, and maintainability.

---

### Authentication Mode Toggle for Testing

**Overview:**

For local development and QA, the app provides a built-in toggle to switch between real backend authentication and in-memory dummy authentication. This enables seamless testing of all authentication flows, even when the backend API is unavailable or when you want to demo the app without real user accounts.

**How It Works:**
- By default, the app uses **real** authentication (backend API).
- To use **dummy** authentication (for local testing, demos, or offline development):
  1. Open your browser's developer console.
  2. Run: `localStorage.setItem('auth_mode', 'dummy')`
  3. Refresh the page. The app will now use the dummy user for authentication.
- To switch back to **real** authentication:
  1. Run: `localStorage.setItem('auth_mode', 'real')`
  2. Refresh the page.
- No UI toggle is provided for switching modes. This is intentional for production safety and to keep the UI clean.

**Dummy User for Testing:**
- Only one dummy user is available for development and QA:
  - **Email:** `test@example.com`
  - **Password:** `password123`
- Dummy user avatar and name are realistic for UI prototyping.

**Session Expiration:**
- Dummy sessions expire after 2 hours by default (configurable in code).
- If the session is expired (e.g., after a long browser pause), you will be logged out automatically on refresh.
- Session expiration is managed via a timestamp in the cookie (no backend required).

**Behavior in Each Mode:**
- **Real:**
  - Login, logout, and session hydration all use the backend API.
  - All security and redirect logic is enforced as in production.
- **Dummy:**
  - Log in with any of the dummy user credentials above. The session is managed in memory and persisted via cookie until expiration or logout.
  - Logging out clears the dummy session and cookie.
  - Useful for demos, UI/UX testing, and offline development.

**Testing Checklist:**
- Switch the authentication mode via `localStorage` commands and verify:
  1. In **Dummy** mode, you can log in and out using any dummy credentials, and the app behaves as if a real user is logged in (including role-based UI if implemented).
  2. In **Real** mode, only real backend authentication works.
  3. Switching modes instantly updates the app's authentication state.
  4. After 2 hours (or configurable duration), dummy sessions expire and require re-login.
- Always use **Real** mode for production and QA that require backend validation.

**Troubleshooting:**
- If you do not see the toggle, ensure you are running in development mode (`npm run dev` or `yarn dev`).
- If you cannot log in with the dummy credentials, ensure you have selected "Dummy" mode.
- If you are unexpectedly logged out in dummy mode, your session may have expired.

**Security Note:**
- The dummy authentication mode and toggle are only available in development. They are never exposed in production builds.

**Future Enhancements:**
- A dev-only UI for editing/adding dummy users on-the-fly for rapid prototyping.
- More advanced session controls (e.g., warning before expiration, manual session extension).

---
- Example usage in a component:
  ```tsx
  import { useIsMobile } from "@/hooks/use-mobile";
  const isMobileView = useIsMobile();
  // ...
  if (isMobileView) setIsOpen(false);
  ```

### Feature Toggles

- **Chatbot Button Temporarily Disabled**
  - The Chatbot button (`ChatbotButtonWrapper`) in `app/layout.tsx` is currently commented out for future updates.
  - To re-enable, simply uncomment the relevant line in the layout file.
  - This approach keeps the codebase clean while allowing easy restoration of the feature when ready.

### Architectural Notes

- **Global Loader Architecture:**
  - All loading UI is now managed by a single global loader (`AppLoaderWrapper`).
  - The loader listens to the global loading state from `AuthProvider` (via the `useAuth` hook).
  - All page/component-level loaders have been removed for consistency and maintainability.
  - The loader is only displayed during authentication/user hydration or other global loading events.
  - This ensures a professional, non-redundant, and cohesive user experience.
  - See the `AppLoaderWrapper` and `AuthProvider` components for implementation details.

#### Migration Steps
  1. Removed all local/component-level loading state and loader UI from pages and components (e.g., `AppShell`).
  2. Refactored `AppLoaderWrapper` to consume loading state from `AuthProvider` only.
  3. Updated all documentation and tests to reflect the new architecture.

#### Usage
  - To trigger the global loader, set the `loading` state in `AuthProvider` to `true`.
  - The loader will automatically appear and hide based on the global loading state.
  - No component/page should manage its own loading UI—use the context instead.

#### Testing the Loader
  - Automated tests are provided in `tests/global-loader.test.tsx`.
  - These tests ensure:
    - The loader is visible when the global loading state is `true`.
    - The loader is hidden and content is visible when loading is `false`.
    - No duplicate loaders appear from local/component state.
  - Run tests with `npm test` or `yarn test` (see package.json for details).
  - All tests follow clean code and OOP best practices.

- **Global Theming:**
  - The `ThemeProvider` from `next-themes` is now applied **only at the root layout** (`app/layout.tsx` or `app/client/layout.tsx`).
  - This ensures that the theme context is shared globally across the entire application, allowing the theme toggle button in the header to update the theme everywhere.
  - **Do not wrap nested components (such as `AppShell`) in another `ThemeProvider`**; doing so would create a new context and break global theme switching.
  - The `ModeSwitcher` component has been removed from `AppShell`.
  - All theme toggling is now managed via the header's `ThemeToggle` component, which uses the global theme context.

### Chatbot Error Handling

### Testing Best Practices & Fixes
- **AuthProvider isolation:** When testing multiple AuthProvider contexts, render each provider in a separate tree to avoid state leakage. See `auth-context.extra.test.tsx` for an example.
- **ChatbotWindow tests:** Use React Testing Library's built-in queries (`getByTestId`, `getByText`) from the render result instead of custom DOM helpers. This ensures tests are robust and scoped correctly.

- All chatbot API/network failures will show the following error message in the chat window:
  
  > Failed to connect to chatbot. Please try again.

- This message is set in the `ChatbotWindow` component for consistency and to ensure tests can reliably check for error state rendering.

- Responsive design for all devices
- Animated hero sections and cards
- Preloading and smooth transitions
- Dark/light mode support
- Custom cursor and scroll progress effects
- Modular, reusable React components
- **AI Chatbot (Nana) for LogisticsFuture**: Professional, branded, and privacy-conscious assistant for air freight between Ghana and the US

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) (for 3D scenes)
- [PNPM](https://pnpm.io/) (package manager)

## Authentication Dummy Login Fallback

### Enabling Dummy Login (Development Only)

To enable dummy login fallback for development or testing, set the following in your `.env` file:

```env
NEXT_PUBLIC_ENABLE_DUMMY_LOGIN=true
```

- When enabled, logging in with the credentials below will always succeed (even if the backend API is down):
  - **Email:** `test@example.com`
  - **Password:** `password123`
- In production, set `NEXT_PUBLIC_ENABLE_DUMMY_LOGIN=false` or remove the line for security.

### How Dummy Login Works
- Dummy login fallback is **only** triggered if:
  1. `NEXT_PUBLIC_ENABLE_DUMMY_LOGIN` is set to `true`.
  2. The credentials are exactly `test@example.com` / `password123`.
  3. The backend API is unavailable or returns an error.
- All other logins require a real backend response.

### Testing Auth Logic

Unit tests for the authentication logic are provided in `tests/auth-context.test.tsx`.

To run the tests:

```bash
pnpm test
yarn test
# or
npm test
```

These tests cover:
- Real API login
- Dummy login fallback (with and without the flag)
- Rejection for wrong credentials or when the flag is off

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PNPM (or npm/yarn)

### Installation

```bash
git clone https://github.com/kaeytee/logistics-portfolio.git
cd logistics-portfolio
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
pnpm build
pnpm start
```

## Folder Structure

```
components/         # Reusable React components
app/                # Next.js app directory (pages, layouts)
public/             # Static assets (images, models, avatars)
styles/             # Global and component styles
lib/                # Utility functions (including chatbot logic)
hooks/              # Custom React hooks
```

## AI Chatbot Implementation

### Advanced Usage, Diagnostics, Extensibility, and AI Fallback (2025-05-18)

#### Local AI Fallback Logic
- If OpenRouter is unavailable or fails, the chatbot now uses a local fallback script (`lib/my-ai-fallback.ts`).
- The fallback is rules-based by default, but you can extend `MyAIFallback` with your own AI model, local inference server, or custom logic.
- All fallback logic is fully OOP, commented, and ready for developer extension.
- See `lib/chatbot.ts` for how the fallback is integrated and tiered with OpenRouter.

---

### Building FAQ Management in Your Admin App

To implement FAQ management in your admin app (recommended for professional operations):

- **CRUD Operations:**
  - Allow admins to Create, Read, Update, and Delete FAQ entries (question/answer pairs) via a secure UI.
  - Store FAQs in a backend database (e.g., PostgreSQL, MongoDB, or even a flat file for MVP).
  - Use OOP and clean code: encapsulate FAQ logic in service and repository classes, with strict validation and error handling.
  - Add audit logs and user attribution for all edits.
- **Validation & UX:**
  - Validate for duplicate questions, required fields, and professional language.
  - Preview FAQ entries as they will appear to users (including HTML rendering for links).
- **Integration with Embeddings:**
  - On FAQ create/update/delete, trigger the embedding regeneration pipeline automatically (see CI/CD below).
  - Optionally, provide a "Regenerate Embeddings" button in the admin UI that calls an API endpoint to run the embedding script.
- **API Design:**
  - Expose RESTful or GraphQL endpoints for FAQ CRUD, secured with admin authentication.
  - Provide endpoints for fetching all FAQs and for triggering embedding regeneration (POST /admin/faq/embeddings/rebuild).
- **Best Practices:**
  - Use optimistic UI updates and error boundaries.
  - Document the admin workflow and onboarding in your internal docs.

---

### Automated Notifications for FAQ/Embedding Changes

- **Why:** Keep your team informed of knowledge base updates, embedding regenerations, and potential issues.
- **How:**
  - Integrate with Slack, Discord, or email using GitHub Actions or your backend.
  - Example: Add a GitHub Actions step after embedding regeneration:
    ```yaml
    - name: Notify Slack of embedding update
      uses: slackapi/slack-github-action@v1.24.0
      with:
        payload: '{"text":"FAQ embeddings updated and deployed! :robot_face:"}'
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    ```
  - For email, use `actions/send-mail@v1` or trigger a custom webhook to your backend.
  - For Discord, use a webhook notification step.
- **Best Practice:**
  - Notify on both success and failure of embedding regeneration and deployment.
  - Include a link to the PR, commit, or deployment preview in the notification.

---

### Advanced CI/CD Customizations for Professional Teams

- **Branch Protection & PR Checks:**
  - Require all FAQ/embedding changes to go through Pull Requests with code review.
  - Add a CI check to ensure `company-faq-embeddings.json` is always up-to-date with `company-faq.json`.
- **Preview Deployments:**
  - Use Vercel, Netlify, or similar to deploy preview branches for every PR.
  - Test FAQ changes and chatbot responses in a live preview before merging.
- **Notification Hooks:**
  - Integrate Slack/Discord/email notifications for PR merges, deployment failures, or embedding regeneration issues.
- **Secrets Management:**
  - Store all sensitive tokens (Slack, email, etc.) in CI/CD secrets, never in code.
- **Onboarding:**
  - Document this workflow in your internal onboarding guide and README for new developers/admins.

---

### How to Use Python Embeddings with Next.js (Beginner-Friendly)

#### Why Python?
- HuggingFace and Python offer state-of-the-art language models for generating semantic embeddings.
- This approach is industry-standard for knowledge-augmented chatbots, even in Node.js/Next.js projects.
- Python is only used for offline data processing — never in your production web server or client.

#### Setting Up Your Python Environment (Best Practice)
1. **Create a virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   - This keeps Python packages isolated from your system and Node.js dependencies.

#### Updating Your FAQ and Embeddings

1. **Edit your FAQ:**
   - Update `lib/data/company-faq.json` with new Q&A pairs.
   - **Authoring Guidelines:**
     - Write clear, concise, and professional questions and answers.
     - Include both common and advanced (future-facing) questions users might ask.
     - Cover operational, technical, and customer support topics.
     - Use proper grammar and company branding/tone.
     - Example:
       ```json
       {
         "question": "What new routes will LogisticsFuture offer in the future?",
         "answer": "We are always expanding! For future route announcements, please sign up for our newsletter or check our Updates page."
       }
       ```
2. **Regenerate embeddings (manual workflow):**
   - With your virtual environment activated, run:
     ```bash
     python scripts/generate_faq_embeddings.py
     ```
   - This creates/updates `lib/data/company-faq-embeddings.json`.
3. **No server restart needed:**
   - Your Next.js app will use the updated knowledge base automatically.

#### Automating Embedding Regeneration (npm scripts & CI/CD)

- **Add an npm script to package.json:**
  ```json
  "scripts": {
    "generate-faq-embeddings": "source .venv/bin/activate && python scripts/generate_faq_embeddings.py"
  }
  ```
  - Now you (or your CI) can run:
    ```bash
    npm run generate-faq-embeddings
    ```
- **CI/CD integration:**
  - In your pipeline (GitHub Actions, GitLab CI, etc.), add a step to:
    - Set up Python and dependencies
    - Run the embedding script after FAQ edits
    - Commit or deploy the updated `company-faq-embeddings.json`
- **Best Practice:**
  - Always regenerate embeddings after FAQ changes, before deploying to production.

---

#### Advanced: Debugging & Single-Query Embeddings
- To see the embedding for a specific question:
  ```bash
  python scripts/generate_faq_embeddings.py --query "How do I track my shipment?"
  ```

#### Best Practices
- Keep all Python scripts in the `scripts/` folder.
- Never run Python scripts from the client/browser.
- Document this workflow for new developers (see this section for onboarding).
- You can upgrade to a pure Node.js embedding solution later if desired.

#### Industry-Standard Hybrid Pattern
- Using Python for embedding generation and Node.js for serving is common in production AI/chatbot systems.
- This separation ensures maintainability, performance, and access to the best models.

---


#### Enhanced Diagnostics & Error Handling
- All chatbot API/network failures display a clear error message: `Failed to connect to chatbot. Please try again.`
- Backend configuration errors are surfaced in the chat UI with a special warning and logged to the browser console for developer insight.
- Full OpenRouter API responses are logged server-side for debugging.
- All error and fallback handling is documented in `components/ChatbotWindow.tsx` and `lib/chatbot.ts`.

#### Feedback & User Experience
- Users can copy any message, expand/collapse long responses, and provide thumbs up/down feedback on bot replies.
- The chat UI is fully accessible (keyboard navigation, escape key closes window, outside click handler via OOP class).
- Conversation history is persisted locally and can be cleared or exported by the user.

#### Developer Diagnostics & Extension
- All agent and chatbot logic is fully OOP and commented for maintainability.
- Extend the AI agent in `lib/ai-agent.ts` for new discovery logic or LLM plugins.
- All messages, errors, and API interactions are testable and observable for robust CI/CD workflows.
- Clean separation of concerns: UI, agent, and API logic are modular and independently testable.

---


This app includes an AI-powered chatbot named **Nana** for LogisticsFuture, available on all pages via a floating button. Nana provides:
- Professional, time-based greeting and service introduction
- Answers about air freight services between Ghana and the US (and back)
- Out-of-scope queries are redirected to customer care
- Conversation history (10 messages, localStorage)
- Newsletter sign-up prompt for updates on new routes/services
- Privacy-conscious responses (no personal data stored beyond session)
- Clear AI identity: custom for LogisticsFuture, powered by OpenAI
- Professional avatar and branding

### Dynamic AI Routing & Self-Aware Chatbot Agent (2025-05-18)

#### Overview
The AI chatbot (Nana) now features **dynamic app discovery** and **self-awareness** via a custom agent. Nana can answer questions about:
- App routes (pages, dynamic routes, parameters)
- Components (UI, logic, utilities)
- API endpoints (REST, Next.js API routes)

This is achieved through a clean, OOP-based agent architecture, making the chatbot a true in-app assistant for both users and developers.

#### Architecture
- **`lib/ai-agent.ts`**: Implements `ChatbotAIAgent`, `RouteIndexer`, and `CodebaseSearcher`.
  - Indexes all `/app` routes (static/dynamic), `/components`, `/lib`, and `/app/api`.
  - Finds and returns relevant code artifacts by user query (e.g., "find login page", "where is the sidebar component?").
- **`lib/chatbot.ts`**:
  - Exports `getChatbotResponse`, which first uses the agent for discovery, then falls back to LLM (OpenRouter) for general queries.
- **`app/api/chatbot/route.ts`**:
  - Handles all chatbot API requests using the new dynamic logic.

#### Usage
- **End Users:**
  - Ask Nana about any page, component, or API (e.g., "Where is the registration page?", "Show me the sidebar component.").
  - Nana will respond with direct file paths, route info, or lists of matching components/APIs.
- **Developers:**
  - Extend the agent in `lib/ai-agent.ts` for new codebase search logic or plugin LLMs.
  - The system is fully OOP and documented for maintainability.

---

## API Connection & Environment Variables (Updated)

**API URL Construction:**
- All API calls now use a robust utility in `lib/api.ts` that constructs the API URL using `NEXT_PUBLIC_API_BASE_URL` if set, or defaults to a relative path (e.g., `/api/auth/login`) if not set.
- This prevents errors like `/undefined/api/auth/login` on Vercel and ensures compatibility for both local and cloud deployments.

**How it works:**
```typescript
// In lib/api.ts
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const url = `${baseUrl}${endpoint}`.replace(/([^:]\/)\/+/, "$1");
```

**Deployment Instructions:**
- **On Vercel:**
  - If your frontend and backend are deployed together (Next.js fullstack), you may leave `NEXT_PUBLIC_API_BASE_URL` unset or set it to an empty string.
  - If using a separate backend, set `NEXT_PUBLIC_API_BASE_URL` to your backend's URL (e.g., `https://api.yoursite.com`).
- **Locally:**
  - Set `NEXT_PUBLIC_API_BASE_URL` in `.env` as needed, or leave unset for default relative API routing.

**Fallback Logic:**
- The `fetchWithFallback` utility includes a fallback to dummy data for development/testing, following clean code and OOP best practices.

```typescript
// Example usage of fetchWithFallback
import { fetchWithFallback } from './lib/api';

const endpoint = '/api/data';
const dummyData = { key: 'value' }; // Example dummy data

async function fetchData() {
    const data = await fetchWithFallback(endpoint, dummyData);
    console.log(data); // Logs fetched data or dummyData if the fetch fails
}

fetchData();
---

#### Example Queries
- `find login page` → Returns route and file path for the login page.
- `show me the AuthProvider` → Lists the file(s) where `AuthProvider` is implemented.
- `where is the registration API?` → Returns the relevant API endpoint(s).

#### Clean Code & Extensibility
- Every agent and chatbot class/function is fully commented.
- The architecture supports future LLM upgrades and plugin integrations.
- All changes are indexed and discoverable for future developer onboarding.

### Setup
1. Install dependencies:
   ```bash
   pnpm add axios dompurify react-helmet-async
   pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```
2. Add to `.env`:
   ```env
   NEXT_PUBLIC_OPEN_ROUTER_API_URL=https://openrouter.ai/api
   OPEN_ROUTER_API_KEY=your_openrouter_api_key
   ```
3. Deploy with these env vars set in Vercel.
4. Place your avatar images in the `public/` directory as `avatar-nana.png` and `avatar-user.png` for best results.

### Usage
- Click the chat button to open the chatbot.
- Ask about air freight, tracking, or company info.
- For out-of-scope queries, Nana will direct you to customer care or invite you to sign up for the newsletter.
- Nana will always use a professional tone and respect your privacy.

### Developer Notes

---

### Dependency Conflict Workaround (2025-05-18)

**Issue:**
- Attempting to install new packages (e.g., `js-cookie`) may fail due to strict npm peer dependency conflicts between `react`, `react-day-picker`, and `date-fns`.
- Example error: `Cannot find module 'js-cookie' or its corresponding type declarations.`
- The project currently uses `react@19.x`, `react-day-picker@8.x`, and `date-fns@4.x`, which are not all mutually compatible.

**Workaround:**
- To install new dependencies (like `js-cookie`), use the `--legacy-peer-deps` flag:

  ```bash
  npm install js-cookie @types/js-cookie --legacy-peer-deps
  ```

- This bypasses peer dependency checks and allows installation to proceed. The same approach may be required for other packages.

**Recommendation:**
- For long-term project health, align all package versions for compatibility, or consider replacing/upgrading/removing `react-day-picker` and/or downgrading React to 18.x if feasible.
- Document any further workarounds and keep dependencies up to date as upstream packages add React 19 support.

---

- **Workflow Labeler File Ignored:**
  - The file `.github/workflows/labeler.yml` is intentionally listed in `.gitignore` and will not be tracked or pushed to the repository.
  - This is done for local or experimental automation workflows that should not affect the main repository or CI/CD pipelines.
  - If you need to use a labeler workflow, create your own local copy and ensure it is ignored in version control for best practices and clean code hygiene.

- Components: `components/ChatbotButton.tsx`, `components/ChatbotWindow.tsx`
- Logic: `lib/chatbot.ts`, `app/api/chatbot/route.ts` (API integration and prompt)
- Config: `app/app-details-config.ts` (centralized company name/branding)
- Tests: `tests/` (see ai-integration.md for details)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [austinbediako4@gmail.com](mailto:austinbediako4@gmail.com).

## Changelog

### 2025-05-18
- Enhanced AI chatbot documentation for advanced usage, diagnostics, and extensibility.
- Improved error handling and user feedback for chatbot UI and backend integration.
- Documented OOP agent architecture and developer extension points.
- Added changelog for advanced diagnostics and agent-based discovery features.
- **New Feature:** Local AI fallback (`lib/my-ai-fallback.ts`) is now used if OpenRouter is down or misconfigured. Developers can extend this fallback for their own models or scripts.

### [2025-05-18] Workflow Fix: Manual Build Step Name

- **Issue:** YAML syntax error in `.github/workflows/codeql.yml` due to missing `name:` field in the step with `if: matrix.build-mode == 'manual'`.
- **Fix:** Added a `name: Manual build instructions` to the affected step. This resolves the implicit map key error and ensures the workflow follows GitHub Actions and YAML best practices.
- **Reference:** See `.github/workflows/codeql.yml`, step under manual build instructions.
- **Reason:** Every step must have a `name:` when using `if:` to avoid YAML parsing errors and improve workflow clarity.
- **YAML Best Practice:** Comments above a step must not be indented as if they are part of the previous step. This ensures the YAML parser does not misinterpret comments as part of a previous mapping, which can cause 'implicit map key' errors. See the fix in `.github/workflows/codeql.yml` for an example.

### 2025-05-15

#### Major AI Chatbot Integration and Cross-App Auth Updates

- **components/ChatbotButton.tsx**
  - Added a floating chat button available on all pages. Handles opening/closing the chatbot window.

- **components/ChatbotWindow.tsx**
  - Refactored outside click detection logic to use an OOP-based `OutsideClickHandler` class. The chatbot window now receives a `chatButtonRef` prop (a `React.RefObject<HTMLDivElement>`) for robust outside click logic, improving maintainability and testability. This follows clean code, OOP, and dependency injection best practices.
  - Fixed a syntax error caused by a missing closing parenthesis in the component's return statement (see end of file). The return statement now ends with a closing parenthesis followed by the component's closing brace, ensuring valid JSX and TypeScript syntax. Added inline comments for clarity and to align with clean code architecture and best practices.
  - Implements the main chatbot UI, message history, input, and displays bot/user avatars.

- **lib/chatbot.ts**
  - Provides chatbot logic: time-based greetings, service intro, message history (localStorage, 10 messages), response caching, and API integration with OpenRouter.
  - Handles error management and input sanitization.

- **app/layout.tsx**
  - Integrated <ChatbotButton /> so the chatbot is accessible site-wide.

- **app/app-details-config.ts**
  - Centralizes company name and branding for consistent chatbot responses.

- **app/api/chatbot/route.ts**
  - Handles server-side API requests to OpenRouter, including prompt construction and error handling.

- **public/avatar-nana.png, public/avatar-user.png**
  - Added professional avatars for bot and user.

- **.env.example**
  - Added required environment variables for OpenRouter API integration.

- **tests/**
  - Added unit tests for chatbot logic and UI components.

- **crosslogic.md**
  - Updated cross-app authentication logic: all secrets, URLs, and JWTs now use environment variables. See file for migration and deployment steps.

- **ai-integration.md**
  - Expanded documentation for chatbot setup, integration, and testing.

---

For more details on each change, see the respective file or the AI Chatbot Implementation and Cross-App Authentication sections above.
