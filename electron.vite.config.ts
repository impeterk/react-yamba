import { resolve } from "path";
import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
export default defineConfig({
  main: {
    build: {
      lib: {
        entry: "./src/electron/main/index.ts",
      },
    },
  },
  preload: {
    build: {
      lib: {
        entry: "./src/electron/preload/index.ts",
      },
    },
  },
  renderer: {
    root: "./src/app",
    build: {
      rolldownOptions: {
        input: "./src/app/index.html",
      },
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      tanstackRouter({
        router: {
          routesDirectory: "./src/app/src/routes",
          generatedRouteTree: "./src/app/src/routeTree.gen.ts",
        },
      }),
      react(),
    ],
  },
});
