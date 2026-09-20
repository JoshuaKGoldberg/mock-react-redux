/**
 * The subset of mock function APIs shared by Jest's `jest.Mock` and Vitest's `Mock`.
 *
 * `mock-react-redux/jest` and `mock-react-redux/vitest` narrow this to the runner's own type.
 */
export type MockFunction = {
  (...args: any[]): any;
  getMockName(): string;
  mock: {
    calls: any[][];
    instances: any[];
    results: { type: string; value: any }[];
  };
  mockClear(): any;
  mockImplementation(implementation: (...args: any[]) => any): any;
  mockImplementationOnce(implementation: (...args: any[]) => any): any;
  mockName(name: string): any;
  mockRejectedValue(value: unknown): any;
  mockRejectedValueOnce(value: unknown): any;
  mockReset(): any;
  mockResolvedValue(value: unknown): any;
  mockResolvedValueOnce(value: unknown): any;
  mockRestore(): any;
  mockReturnValue(value: unknown): any;
  mockReturnValueOnce(value: unknown): any;
};

/**
 * General-purpose function type referring to any mock function or spy.
 */
export type AnyMockFunction = (...args: any[]) => any;

/**
 * Test APIs to modify the mocked react-redux hooks' behavior.
 */
export type MockReactRedux<State = any, Mock extends AnyMockFunction = MockFunction> = {
  /**
   * Mock dispatch function returned to components via useDispatch().
   */
  dispatch: Mock;

  /**
   * Sets a value to be returned instead of calling a selector.
   */
  give: SelectorGive<Mock>;

  /**
   * Sets a mock function to be called instead of a selector.
   */
  giveMock: SelectorGiveMock<Mock>;

  /**
   * Sets a root Redux state.
   */
  state: SetState<State, Mock>;
};

/**
 * Sets a value to be returned instead of calling a selector.
 *
 * @param selector - Redux selector to be swapped out.
 * @param returnValue - Value to be returned instead of calling the selector.
 */
export type SelectorGive<Mock extends AnyMockFunction = MockFunction> = <ReturnValue, State>(
  selector: (state: State) => ReturnValue,
  returnValue: ReturnValue,
) => MockReactRedux<any, Mock>;

/**
 * Sets a mock function to be called instead of a selector.
 *
 * @param selector - Redux selector to be swapped out.
 * @param mock - Mock to be called instead of the selector.
 */
export type SelectorGiveMock<Mock extends AnyMockFunction = MockFunction> = <ReturnValue, State>(
  selector: (state: State) => ReturnValue,
  mock: (...args: any[]) => ReturnValue,
) => MockReactRedux<any, Mock>;

/**
 * General-purpose function type referring to any Redux selector function.
 */
export type AnySelector<ReturnValue = any> = (...params: any[]) => ReturnValue;

/**
 * Sets a root Redux state.
 *
 * @param newState - New root Redux state.
 */
export type SetState<State, Mock extends AnyMockFunction = MockFunction> = (
  newState: State,
) => MockReactRedux<State, Mock>;
