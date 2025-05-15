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

## Overview

**Logistics Portfolio** is designed to present logistics, warehousing, and delivery services in a visually appealing and interactive way. It features animated components, image preloading, and a clean, professional UI to help logistics businesses establish a strong online presence.

## Features

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
