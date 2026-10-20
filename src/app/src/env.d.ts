/// <reference types="vite/client" />
import type { JSX } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "mj-button": {
        href?: string;
        children?: React.ReactNode;
      };
    }
  }
}
