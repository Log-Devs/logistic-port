# AI Chatbot Implementation

This document describes the integration of an AI-powered chatbot for TransGlobalFreight’s Next.js app, supporting user engagement, service discovery, and customer care for the Ghana–US logistics MVP.

## Features

- Floating “Chat with Us” button on all pages.
- Time-based greeting and service introduction.
- Conversational UI with message history (localStorage, 10 messages).
- Integration with deepseek/deepseek-r1-distill-llama-70b via openrouter.ai.
- Out-of-scope queries are redirected to customer care.
- Error handling, input sanitization, and API response caching.
- Unit tests for all chatbot logic and UI.

## File Structure

```
components/
  ChatbotButton.tsx
  ChatbotWindow.tsx
lib/
  chatbot.ts
app/
  layout.tsx
.env.example
vercel.json
package.json
tests/
  ChatbotButton.test.tsx
  ChatbotWindow.test.tsx
  chatbot.test.ts
```

## Setup & Integration

1. **Install dependencies:**
   ```bash
   pnpm add axios dompurify react-helmet-async
   pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

2. **Environment variables:**
   - Add to `.env.example`:
     ```
     NEXT_PUBLIC_OPEN_ROUTER_API_URL=https://openrouter.ai/api/v1
     OPEN_ROUTER_API_KEY=your_openrouter_api_key
     ```
   - Set real values in `.env` (never commit real keys).

3. **Vercel deployment:**
   - Add to `vercel.json`:
     ```json
     {
       "env": {
         "NEXT_PUBLIC_OPEN_ROUTER_API_URL": "@next_public_open_router_api_url",
         "OPEN_ROUTER_API_KEY": "@open_router_api_key"
       }
     }
     ```

4. **Integration:**
   - Import and add `<ChatbotButton />` to `app/layout.tsx` (client-side).
   - The chatbot is now available on all pages.

5. **Testing:**
   - Run `pnpm test` to execute Jest tests for chatbot logic and UI.

6. **Security:**
   - All user input is sanitized with DOMPurify.
   - API key is never exposed to the client.

---

## Usage

- Click the floating button to open the chatbot.
- Ask about services, company info, or shipment process.
- For out-of-scope queries, the bot will direct you to customer care.

---

## Contact

For support, email [support@transglobalfreight.com](mailto:support@transglobalfreight.com) or call +1-800-555-1234.

---

## Changelog

### 2025-05-15

#### Major AI Chatbot Integration and Cross-App Auth Updates

- **components/ChatbotButton.tsx**: Added floating chat button for opening/closing the chatbot window on all pages.
- **components/ChatbotWindow.tsx**: Main chatbot UI, message history, input, and avatar display.
- **lib/chatbot.ts**: Chatbot logic (greetings, service intro, message history, response caching, OpenRouter API integration, error handling, sanitization).
- **app/layout.tsx**: Integrated <ChatbotButton /> for global chatbot access.
- **app/app-details-config.ts**: Centralized company name/branding for chatbot.
- **app/api/chatbot/route.ts**: Server-side API handler for OpenRouter integration.
- **public/avatar-nana.png, public/avatar-user.png**: Professional avatars for bot and user.
- **.env.example**: Required environment variables for OpenRouter API.
- **tests/**: Unit tests for chatbot logic and UI.
- **crosslogic.md**: Updated cross-app authentication logic to use environment variables for all secrets, URLs, and JWTs.
- **ai-integration.md**: Expanded documentation for chatbot setup, integration, and testing.

---

For details, see the respective file or the AI Chatbot Implementation and Cross-App Authentication sections above.
