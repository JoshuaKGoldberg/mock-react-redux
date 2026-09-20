// Lets the shared test suite `import { ... } from "vitest"` when run under Jest.
// jest.config.json maps the "vitest" module name here.
export const { afterEach, beforeEach, describe, expect, it, test } = globalThis as any;

export const vi = {
  fn: (implementation?: (...args: any[]) => any) => jest.fn(implementation),
};
