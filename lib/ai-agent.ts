/**
 * AI Agent for dynamic app discovery and routing awareness
 * - Indexes all Next.js App Router routes (static/dynamic)
 * - Searches components, APIs, and code by user query
 * - Clean OOP, extensible for future LLMs/plugins
 *
 * Usage: Import and use in chatbot logic for context-aware answers.
 */

// Remove Node.js-only imports from shared code to fix build error
import path from 'path';
// import * as fs from 'fs'; // Node.js File System module, required for server-side route indexing. Do not use on client-side code.

/**
 * Represents a discovered route in the app.
 */
export interface AppRoute {
  /** Route URL, e.g. /register, /services/[id] */
  url: string;
  /** File path in the repo */
  filePath: string;
  /** Is this a dynamic route? */
  dynamic: boolean;
  /** Route params, e.g. ['id'] for /services/[id] */
  params: string[];
}

/**
 * Indexes all routes in the Next.js /app directory, including dynamic routes.
 */
export class RouteIndexer {
  private appDir: string;
  public routes: AppRoute[] = [];

  constructor(appDir = path.join(process.cwd(), 'app')) {
    this.appDir = appDir;
    this.routes = this.indexRoutes();
  }

  /**
   * Recursively index all routes.
   */
  /**
   * Recursively index all routes in the app directory.
   * Uses Node.js fs only on the server. On the client, returns an empty array (cannot index files at runtime).
   * This ensures no fs usage in client bundles.
   */
  private indexRoutes(dir = this.appDir, prefix = ''): AppRoute[] {
    const routes: AppRoute[] = [];
    // Only run file system code on the server (SSR/build time)
    if (typeof window === 'undefined') {
      // Dynamically require fs and path only if available (server-side)
      let fs: typeof import('fs') | undefined;
      let path: typeof import('path') | undefined;
      try {
        fs = require('fs');
        path = require('path');
      } catch {
        // If fs/path are not available, skip indexing
        return routes;
      }
      if (!fs.existsSync(dir)) return routes;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          // Dynamic route: [param]
          const isDynamic = entry.name.startsWith('[') && entry.name.endsWith(']');
          const param = isDynamic ? entry.name.slice(1, -1) : undefined;
          const childPrefix = prefix + '/' + (isDynamic ? `[${param}]` : entry.name);
          routes.push(...this.indexRoutes(path.join(dir, entry.name), childPrefix));
        } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
          // Only index page/route files
          if (['page.tsx', 'route.ts'].includes(entry.name)) {
            const url = prefix || '/';
            const params = (url.match(/\[([^\]]+)\]/g) || []).map((s: string) => s.slice(1, -1));
            routes.push({
              url,
              filePath: path.join(dir, entry.name),
              dynamic: params.length > 0,
              params,
            });
          }
        }
      }
    }
    // On client, return empty array (cannot index files)
    return routes;
  }

  /**
   * Find a route by URL or param (e.g. 'register', 'services', 'id').
   */
  public findRoute(query: string): AppRoute | undefined {
    return this.routes.find(r =>
      r.url.includes(query) ||
      r.filePath.includes(query) ||
      r.params.some(p => p === query)
    );
  }
}

/**
 * Searches the codebase for files/components/APIs matching a query.
 */
export class CodebaseSearcher {
  private baseDirs: string[];
  constructor(baseDirs = [
    path.join(process.cwd(), 'components'),
    path.join(process.cwd(), 'lib'),
    path.join(process.cwd(), 'app', 'api'),
  ]) {
    this.baseDirs = baseDirs;
  }

  /**
   * Recursively search for files matching the query.
   */
  public search(query: string): string[] {
    const results: string[] = [];
    for (const baseDir of this.baseDirs) {
      this.searchDir(baseDir, query, results);
    }
    return results;
  }

  private searchDir(dir: string, query: string, results: string[]) {
    // Only run file system code on the server (SSR/build time)
    if (typeof window === 'undefined') {
      let fs: typeof import('fs') | undefined;
      let path: typeof import('path') | undefined;
      try {
        fs = require('fs');
        path = require('path');
      } catch {
        // If fs/path are not available, skip searching
        return;
      }
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          this.searchDir(fullPath, query, results);
        } else if (entry.isFile() && fullPath.toLowerCase().includes(query.toLowerCase())) {
          results.push(fullPath);
        }
      }
    }
  }
}

/**
 * Main AI Agent for dynamic discovery.
 */
export class ChatbotAIAgent {
  private routeIndexer: RouteIndexer;
  private codebaseSearcher: CodebaseSearcher;

  constructor() {
    this.routeIndexer = new RouteIndexer();
    this.codebaseSearcher = new CodebaseSearcher();
  }

  /**
   * Find a route, component, or API by user query.
   * Returns best match and type.
   */
  public find(query: string): { type: 'route' | 'component' | 'api' | 'unknown'; result: any } {
    // 1. Try route
    const route = this.routeIndexer.findRoute(query);
    if (route) return { type: 'route', result: route };
    // 2. Try codebase (component or api)
    const files = this.codebaseSearcher.search(query);
    if (files.length > 0) {
      // Heuristic: API if under /app/api, else component
      const isApi = files[0].includes('/app/api/');
      return { type: isApi ? 'api' : 'component', result: files };
    }
    return { type: 'unknown', result: null };
  }
}

// Example usage (remove in production):
// const agent = new ChatbotAIAgent();
// console.log(agent.find('register'));
