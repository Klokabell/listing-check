import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      input: {
        content: "src/content/content.ts",
        background: "src/background/background.ts",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
});
