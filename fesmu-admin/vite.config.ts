import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: [
      "admin.fesmu.promotion-pal.ru",
      "fesmu.promotion-pal.ru",
      "api.fesmu.promotion-pal.ru",
    ],
    cors: true,
    proxy: {},
  },
  server: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
