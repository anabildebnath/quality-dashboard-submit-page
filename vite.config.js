import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

// Resolve __dirname for ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
