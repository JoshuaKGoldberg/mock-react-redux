import type * as jest from "jest";

/**
 * Test APIs to modify the mocked react-redux hooks' behavior.
 */
export interface MockReactRedux<State = any> {
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

	/**
	 * Sets a root Redux state.
	 */
	state: SetState<State>;
}

/**
 * Sets a value to be returned instead of calling a selector.
 * @param selector - Redux selector to be swapped out.
 * @param returnValue - Value to be returned instead of calling the selector.
 */
export type SelectorGive = <ReturnValue, State>(
	selector: (state: State) => ReturnValue,
	returnValue: ReturnValue,
) => MockReactRedux;

/**
 * Sets a Jest mock to be called instead of a selector.
 * @param selector - Redux selector to be swapped out.
 * @param mock - Mock to be called instead of the selector.
 */
export type SelectorGiveMock = <ReturnValue, State>(
	selector: (state: State) => ReturnValue,
	returnValue: jest.Mock<ReturnValue>,
) => MockReactRedux;

/**
 * General-purpose function type referring to any Redux selector function.
 */
export type AnySelector<ReturnValue = any> = (...params: any[]) => ReturnValue;

/**
 * Sets a root Redux state.
 * @param newState - New root Redux state.
 */
export type SetState<State> = (newState: State) => MockReactRedux;
