import type * as jest from "jest";

import { mockConnect } from "./connect.js";
import { GetSelector, createGetSelector } from "./selectors.js";
import { AnySelector, MockReactRedux } from "./types.js";

interface MockSituation {
	dispatch: jest.Mock;
	getSelector: GetSelector;
	state?: unknown;
}

let mockSituation: MockSituation | undefined;

const mockSupportedError = (name: string) => {
	throw new Error(
		`${name} is not yet supported when using mock-react-redux. Consider filing an issue on https://github.com/Codecademy/mock-react-redux. Thanks, friend!`,
	);
};

const mockStateError = (name: string) => {
	throw new Error(
		`You imported mock-react-redux but didn't call mockReactRedux() before calling ${name} from react-redux.`,
	);
};

jest.mock("react-redux", () => {
	const getDispatch = () =>
		mockSituation?.dispatch ?? mockStateError("useDispatch");
	const getSelector = (selector: AnySelector) => {
		return mockSituation
			? mockSituation.getSelector(selector).provide()
			: mockStateError("useSelector");
	};

	return {
		connect: mockConnect(getDispatch, () => {
			if (!mockSituation) {
				throw new Error(
					"You imported mock-react-redux but didn't call mockReactRedux() before rendering a connect() component.",
				);
			}

			if (!mockSituation.state) {
				throw new Error(
					"You imported mock-react-redux but didn't set state before rendering a connect() component.",
				);
			}

			return mockSituation.state;
		}),
		useDispatch: getDispatch,
		useSelector: getSelector,
		...[
			"batch",
			"connectAdvanced",
			"createDispatchHook",
			"createSelectorHook",
			"createStoreHook",
			"Provider",
			"shallowEqual",
			"useStore",
		].reduce<Record<string, () => void>>((accumulator, apiName) => {
			accumulator[apiName] = () => mockSupportedError(apiName);
			return accumulator;
		}, {}),
	};
});

afterEach(() => {
	mockSituation = undefined;
});

export const mockReactRedux = <State>(): MockReactRedux<State> => {
	if (require.cache[require.resolve("react-redux")]) {
		throw new Error(
			"It looks like you imported react-redux before mock-react-redux. Import mock-react-redux before react-redux or any imports that include react-redux.",
		);
	}

	const currentMockSituation: MockSituation = (mockSituation = {
		dispatch: jest.fn(),
		getSelector: createGetSelector(() => currentMockSituation.state),
	});

	const mockReactRedux: MockReactRedux<State> = {
		dispatch: currentMockSituation.dispatch,

		give: (selector, returnValue) => {
			currentMockSituation
				.getSelector(selector)
				.setMock(jest.fn().mockReturnValue(returnValue));
			return mockReactRedux;
		},

		giveMock: (selector, mock) => {
			currentMockSituation.getSelector(selector).setMock(mock);
			return mockReactRedux;
		},

		state: (newState) => {
			currentMockSituation.state = newState;
			return mockReactRedux;
		},
	};

	return mockReactRedux;
};
