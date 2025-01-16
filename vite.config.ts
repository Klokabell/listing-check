import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: "src/Popup.tsx",
        content: "src/content.ts",
        background: "src/background.ts",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
});
