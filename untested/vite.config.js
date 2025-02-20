"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = require("@vitejs/plugin-react");
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
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
