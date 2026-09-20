import { TestRunner } from "../core/createMockReactRedux";
import { createReactReduxModule } from "../core/createReactReduxModule";
import { MockFunction } from "../core/types";

/**
 * The parts of Vitest's API that mock-react-redux uses, as exposed on the `__vitest_index__` global.
 * That global is what lets this package hook into Vitest without importing 'vitest' from CommonJS.
 */
export type VitestIndex = {
  afterEach: (callback: () => void) => void;
  vi: {
    fn: (implementation?: (...args: any[]) => any) => MockFunction;
    mock: (path: string, factory: () => unknown) => void;
  };
};

export const getVitestIndex = (): VitestIndex | undefined => {
  return (globalThis as { __vitest_index__?: VitestIndex }).__vitest_index__;
};

/**
 * Hooks mock-react-redux into Vitest through its global: replaces `react-redux` and provides `vi.fn()` mocks.
 */
export const createVitestGlobalRunner = (vitest: VitestIndex): TestRunner<MockFunction> => {
  vitest.vi.mock("react-redux", () => createReactReduxModule());

  return {
    afterEach: vitest.afterEach,
    fn: (implementation) => vitest.vi.fn(implementation),
  };
};
