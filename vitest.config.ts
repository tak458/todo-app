import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    reporters: process.env.GITHUB_ACTIONS ? ["default", "junit", "github-actions"] : ["default"],
    outputFile: {
      junit: "./reports/test-results.xml",
    },
    coverage: {
      reporter: ["text", "json-summary"],
      reportsDirectory: "./coverage",
    },
  },
  plugins: [react()],
});
