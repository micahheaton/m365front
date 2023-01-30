import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: "0.0.0.0",
    port: 5000,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
  plugins: [react(), svgr()],
});
