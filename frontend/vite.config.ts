import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dir, "./src"),
      "@server": path.resolve(import.meta.dir, "../bun-hono/src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://bun-hono.sonwaneshubham049.workers.dev",
        changeOrigin: true,
      },
    },
  },
});
