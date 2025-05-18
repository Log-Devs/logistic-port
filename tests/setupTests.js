// Jest global setup for React/Next.js tests
// Mock scrollIntoView to prevent errors in jsdom
window.HTMLElement.prototype.scrollIntoView = function () {};
