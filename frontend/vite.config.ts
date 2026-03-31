import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const projectRoot = path.resolve(process.cwd());

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== "true",
  },
});
