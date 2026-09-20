import { defineConfig, Options } from "tsup";

const shared: Options = {
  dts: true,
  external: ["react", "react-redux", "vitest"],
  outDir: "lib",
  sourcemap: true,
  target: "es2017",
};

export default defineConfig([
  {
    ...shared,
    clean: true,
    // Jest loads packages from node_modules without transforms, so these entries must be CommonJS.
    entry: { index: "src/index.ts", jest: "src/jest.ts" },
    format: ["cjs"],
    splitting: true,
  },
  {
    ...shared,
    // Vitest refuses to be require()d, so this entry must be ESM.
    entry: { vitest: "src/vitest.ts" },
    format: ["esm"],
  },
]);
