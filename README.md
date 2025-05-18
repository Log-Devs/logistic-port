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
	- [Contributing](#contributing)
	- [License](#license)
	- [Contact](#contact)
	- [Changelog](#changelog)
		- [2025-05-15](#2025-05-15)
			- [Major AI Chatbot Integration and Cross-App Auth Updates](#major-ai-chatbot-integration-and-cross-app-auth-updates)

## Overview

**Logistics Portfolio** is designed to present logistics, warehousing, and delivery services in a visually appealing and interactive way. It features animated components, image preloading, and a clean, professional UI to help logistics businesses establish a strong online presence.

## Features

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
git clone https://github.com/yourusername/logistics-portfolio.git
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
