import { TestRunner } from "../core/createMockReactRedux";
import { createReactReduxModule as mockCreateReactReduxModule } from "../core/createReactReduxModule";

export const isJest = () => typeof jest !== "undefined";

/**
 * Hooks mock-react-redux into Jest: replaces `react-redux` and provides `jest.fn()` mocks.
 */
export const createJestRunner = (): TestRunner<jest.Mock> => {
  jest.mock("react-redux", () => mockCreateReactReduxModule());

  return {
    afterEach,
    fn: (implementation) => jest.fn(implementation),
    validate: () => {
      if (require.cache[require.resolve("react-redux")]) {
        throw new Error(
          "It looks like you imported react-redux before mock-react-redux. Import mock-react-redux before react-redux or any imports that include react-redux.",
        );
      }
    },
  };
};
