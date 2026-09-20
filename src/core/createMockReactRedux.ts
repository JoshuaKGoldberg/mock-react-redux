import { createGetSelector } from "./selectors";
import { MockSituation, setMockSituation } from "./situation";
import { AnyMockFunction, MockReactRedux } from "./types";

/**
 * The pieces of a test runner that mock-react-redux needs.
 * The runner is also expected to have replaced the `react-redux` module with createReactReduxModule().
 */
export type TestRunner<Mock extends AnyMockFunction> = {
  /**
   * Registers a callback to run after each test.
   */
  afterEach: (callback: () => void) => void;

  /**
   * Creates a mock function, optionally around an implementation.
   */
  fn: (implementation?: AnyMockFunction) => Mock;

  /**
   * Called at the start of each mockReactRedux() to throw if the runner is in an invalid state.
   */
  validate?: () => void;
};

export const createMockReactRedux = <Mock extends AnyMockFunction>(runner: TestRunner<Mock>) => {
  runner.afterEach(() => {
    setMockSituation(undefined);
  });

  return <State>(): MockReactRedux<State, Mock> => {
    runner.validate?.();

    const dispatch = runner.fn();
    const mockSituation: MockSituation = {
      dispatch,
      getSelector: createGetSelector(() => mockSituation.state),
    };

    setMockSituation(mockSituation);

    const mockReactRedux: MockReactRedux<State, Mock> = {
      dispatch,

      give: (selector, returnValue) => {
        mockSituation.getSelector(selector).setMock(runner.fn(() => returnValue));
        return mockReactRedux;
      },

      giveMock: (selector, mock) => {
        mockSituation.getSelector(selector).setMock(mock);
        return mockReactRedux;
      },

      state: (newState) => {
        mockSituation.state = newState;
        return mockReactRedux;
      },
    };

    return mockReactRedux;
  };
};
