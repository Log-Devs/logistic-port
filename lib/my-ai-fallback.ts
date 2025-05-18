/**
 * MyAIFallback: Local AI fallback logic for chatbot responses
 * Clean code, OOP, and extensibility best practices
 *
 * This module provides a knowledge-augmented fallback for chatbot responses
 * if the OpenRouter API is unavailable or fails. It loads company/service-specific
 * FAQs from a dataset and matches user queries to provide relevant answers.
 *
 * You can extend this to use embeddings, a local LLM, or connect to a custom server.
 *
 * How to extend:
 * - Replace the FAQ dataset with your own (CSV, JSON, DB, etc.)
 * - Replace the matching logic with semantic/embedding search or an API call
 * - Integrate a local LLM by replacing getResponse with your inference logic
 */

// Node.js-only modules are imported dynamically and only on the server
let fs: typeof import('fs') | undefined;
let path: typeof import('path') | undefined;
let spawnSync: typeof import('child_process').spawnSync | undefined;

if (typeof window === 'undefined') {
  // Only import these modules on the server to avoid Next.js build errors
  // @ts-ignore
  fs = require('fs');
  // @ts-ignore
  path = require('path');
  // @ts-ignore
  spawnSync = require('child_process').spawnSync;
}


// Interface for a chatbot message
export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp?: string;
}

// Interface for a FAQ entry with embedding
interface FAQEntry {
  question: string;
  answer: string;
  embedding?: number[]; // Optional: used for semantic search
}

/**
 * Utility to compute cosine similarity between two vectors.
 * @param a First vector
 * @param b Second vector
 * @returns Cosine similarity (range: -1 to 1)
 */
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; ++i) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}


/**
 * Utility to compute embedding for a query by calling the Python script.
 * You can replace this with a direct Node.js inference if desired.
 * @param text Query string
 * @returns Embedding vector
 */
function getQueryEmbedding(text: string): number[] | null {
  // Only run on the server (Node.js)
  if (typeof window !== 'undefined' || !spawnSync || !path) return null;
  try {
    const py = spawnSync('python3', [
      path.join(process.cwd(), 'scripts', 'generate_faq_embeddings.py'),
      '--query', text
    ], { encoding: 'utf-8' });
    if (py.status === 0 && py.stdout) {
      // Parse the embedding from stdout
      const lines = py.stdout.split('\n');
      for (const line of lines) {
        if (line.startsWith('[')) {
          return JSON.parse(line);
        }
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[MyAIFallback] Failed to get query embedding:', err);
  }
  return null;
}



/**
 * Main fallback AI class. Loads a FAQ dataset and matches user queries.
 * You can extend this for embeddings, vector DB, or local LLM integration.
 */
export class MyAIFallback {
  private faqs: FAQEntry[] = [];

  constructor() {
    // Only load files on the server (Node.js)
    if (typeof window !== 'undefined' || !fs || !path) {
      this.faqs = [];
      return;
    }
    try {
      const embeddingsPath = path.join(process.cwd(), 'lib', 'data', 'company-faq-embeddings.json');
      if (fs.existsSync(embeddingsPath)) {
        const raw = fs.readFileSync(embeddingsPath, 'utf-8');
        this.faqs = JSON.parse(raw);
      } else {
        // Fallback: load plain FAQ if embeddings not present
        const faqPath = path.join(process.cwd(), 'lib', 'data', 'company-faq.json');
        if (fs.existsSync(faqPath)) {
          const raw = fs.readFileSync(faqPath, 'utf-8');
          this.faqs = JSON.parse(raw);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[MyAIFallback] Failed to load FAQ/embeddings dataset:', err);
      this.faqs = [];
    }
  }

  /**
   * Generates a fallback response based on user message and history.
   * Uses FAQ matching; extend for embeddings or local LLM as needed.
   * @param message User's message
   * @param history Chat history
   * @param company Company name (for branding)
   * @returns Best-matched answer or default fallback
   */
  public async getResponse(
    message: string,
    history: ChatMessage[],
    company: string = 'LogisticsFuture'
  ): Promise<string> {
    // Defensive: fallback if no dataset loaded
    if (typeof window !== 'undefined') {
      // Never run fallback logic on the client (browser)
      return `Sorry, the AI service is temporarily unavailable. Please try again later or contact support.`;
    }
    if (!this.faqs.length) {
      return `Sorry, the AI service is temporarily unavailable. Please try again later or contact support.`;
    }
    // If embeddings are present, use semantic search
    if (this.faqs[0] && this.faqs[0].embedding) {
      // Compute embedding for the query (calls Python script)
      const queryEmbedding = getQueryEmbedding(message);
      if (!queryEmbedding) {
        return `Sorry, I couldn't process your request. Please try again later or contact support.`;
      }
      // Find the FAQ with the highest cosine similarity
      let bestMatch: FAQEntry | null = null;
      let bestScore = -1;
      for (const faq of this.faqs) {
        if (!faq.embedding) continue;
        const score = cosineSimilarity(queryEmbedding, faq.embedding);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = faq;
        }
      }
      // Threshold for a confident match (tune as needed, e.g., 0.7)
      if (bestMatch && bestScore > 0.7) {
        return bestMatch.answer;
      } else {
        return `Sorry, I couldn't find an answer for that. Please try rephrasing or contact support.`;
      }
    }
    // Fallback: use keyword/substring match if no embeddings
    const lower = message.toLowerCase();
    let bestMatch: FAQEntry | null = null;
    let bestScore = 0;
    for (const faq of this.faqs) {
      const qWords = faq.question.toLowerCase().split(/\W+/);
      const mWords = lower.split(/\W+/);
      const overlap = mWords.filter(w => w.length > 2 && qWords.includes(w)).length;
      if (overlap > bestScore) {
        bestScore = overlap;
        bestMatch = faq;
      }
      if (lower.includes(faq.question.toLowerCase())) {
        bestMatch = faq;
        bestScore = 100;
        break;
      }
    }
    if (bestMatch && bestScore > 0) {
      return bestMatch.answer;
    }
    // Default fallback if no match
    return `Sorry, I couldn't find an answer for that. Please try rephrasing or contact support.`;
  }
}

// Singleton instance for use in chatbot logic
export const myAIFallback = new MyAIFallback();
