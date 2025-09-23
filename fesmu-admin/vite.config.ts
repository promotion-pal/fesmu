// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   plugins: [react()],
//   server: {
//     host: true,
//   },
//   build: {
//     sourcemap: mode === "development",
//   },
//   base: "./",
// }));

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
    https: false,
    cors: true,
    proxy: {},
  },
  server: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
    cors: true,
  },
  // Для production билда
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
