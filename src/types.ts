/**
 * Test APIs to modify the mocked react-redux hooks' behavior.
 */
export type MockRedux = {
  /**
   * Mock dispatch function returned to components via useDispatch().
   */
  dispatch: jest.Mock;

  /**
   * Sets a value to be returned instead of calling a selector.
   */
  give: SelectorGive;

  /**
   * Sets a Jest mock to be called instead of a selector.
   */
  giveMock: SelectorGiveMock;
};

/**
 * Sets a value to be returned instead of calling a selector.
 *
 * @param selector - Redux selector to be swapped out.
 * @param returnValue - Value to be returned instead of calling the selector.
 */
export type SelectorGive = <ReturnValue>(
  selector: (...params: any[]) => ReturnValue,
  returnValue: ReturnValue,
) => MockRedux;

/**
 * Sets a Jest mock to be called instead of a selector.
 *
 * @param selector - Redux selector to be swapped out.
 * @param mock - Mock to be called instead of the selector.
 */
export type SelectorGiveMock = <ReturnValue>(
  selector: (...params: any[]) => ReturnValue,
  returnValue: jest.Mock<ReturnValue>,
) => MockRedux;

/**
 * General-purpose function type referring to any Redux selector function.
 */
export type AnySelector<ReturnValue = any> = (...params: any[]) => ReturnValue;
