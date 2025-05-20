// types/custom-elements.d.ts
// Global JSX declaration for custom web components, such as dotlottie-player.
// This ensures TypeScript recognizes <dotlottie-player> in React code.

import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * dotlottie-player web component for animated Lottie files.
       * @see https://github.com/LottieFiles/lottie-player
       * Add additional attributes as needed for your use case.
       */
      'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        autoplay?: boolean;
        loop?: boolean;
        mode?: string;
        background?: string;
        speed?: number;
        style?: React.CSSProperties;
        // Extend with other attributes as needed
      };
    }
  }
}
