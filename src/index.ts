import { createMockReactRedux, TestRunner } from "./core/createMockReactRedux";
import { MockFunction } from "./core/types";
import { createJestRunner, isJest } from "./runners/jest";
import { createVitestGlobalRunner, getVitestIndex } from "./runners/vitestGlobal";

export * from "./core/types";

const detectRunner = (): TestRunner<MockFunction> => {
  const vitest = getVitestIndex();
  if (vitest) {
    return createVitestGlobalRunner(vitest);
  }

  if (isJest()) {
    return createJestRunner();
  }

  throw new Error(
    "mock-react-redux could not detect Jest or Vitest. If you're using one of them, import from 'mock-react-redux/jest' or 'mock-react-redux/vitest' directly. Otherwise, consider filing an issue on https://github.com/JoshuaKGoldberg/mock-react-redux. Thanks, friend!",
  );
};

export const mockReactRedux = createMockReactRedux(detectRunner());

export default mockReactRedux;
