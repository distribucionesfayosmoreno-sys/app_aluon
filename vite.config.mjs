import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(__dirname, "stitch (1)"),
  server: {
    port: 5173,
    strictPort: true
  }
});
