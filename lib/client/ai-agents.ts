'use client';

export interface AppRoute {
  url: string;
  dynamic: boolean;
  params: string[];
}

export class ChatbotAIAgent {
  // Client-safe implementation without filesystem access
  public find(query: string) {
    // Implement client-side search logic or API calls
  }
}