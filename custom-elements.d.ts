// custom-elements.d.ts
// TypeScript declaration for custom web components used in the project
// This allows usage of <dotlottie-player> in JSX without type errors
// Clean code architecture: all custom elements are declared centrally for maintainability
// OOP/Best Practice: Extend as needed for other custom elements

import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * dotlottie-player web component for rendering Lottie animations
       * Accepts standard HTML attributes and common dotlottie-player props
       * Extend this interface if you use more attributes
       */
      "dotlottie-player": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        autoplay?: boolean;
        loop?: boolean;
        mode?: string;
        // Add more dotlottie-player attributes as needed
      };
    }
  }
}

// Documentation: This file enables TypeScript support for custom elements like <dotlottie-player>.
// See README for usage details.
