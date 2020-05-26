// This types.d.ts file allows the tests in this ./docs/examples/ folder to not fail TypeScript compilation.
// These documentation test examples are actually run as part of this repository's `yarn test` command.
// Kind of cool, right? 🤗

declare module "mock-redux" {
  const _: typeof import("../../src/index");
  export = _;
}
