import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  oxc: {
    jsx: { runtime: "classic" },
  },
  resolve: {
    alias: [
      { find: /^mock-react-redux$/, replacement: src("index.ts") },
      { find: /^mock-react-redux\/vitest$/, replacement: src("vitest.ts") },
    ],
  },
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**", "src/tests/jest/**"],
    include: ["src/**/*.test.tsx", "docs/examples/*.test.tsx"],
    setupFiles: ["src/tests/vitestSetup.ts"],
  },
});
