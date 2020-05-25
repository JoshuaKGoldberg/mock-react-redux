import { createGetSelector, GetSelector } from "./selectors";
import { MockRedux, AnySelector } from "./types";

type MockSituation = {
  dispatch: jest.Mock;
  getSelector: GetSelector;
  state?: unknown;
};

let mockSituation: MockSituation | undefined;

const mockNotImplemented = (name: string) => () => {
  throw new Error(`${name} is not supported when using mock-redux.`);
};

const mockStateError = (name: string) => {
  throw new Error(
    `You included mock-redux but didn't call mockRedux() before calling ${name} from react-redux.`,
  );
};

jest.mock("react-redux", () => {
  return {
    connect: mockNotImplemented("connect"),
    Provider: mockNotImplemented("Provider"),
    useDispatch: () => mockSituation?.dispatch ?? mockStateError("useDispatch"),
    useSelector: (selector: AnySelector) => {
      return mockSituation
        ? mockSituation.getSelector(selector).provide()
        : mockStateError("useSelector");
    },
  };
});

afterEach(() => {
  mockSituation = undefined;
});

export const mockRedux = <State>(): MockRedux<State> => {
  if (require.cache[require.resolve("react-redux")]) {
    throw new Error(
      "It looks like you imported react-redux before mock-redux. Put mock-redux before react-redux or any imports that include react-redux.",
    );
  }

  const currentMockState: MockSituation = (mockSituation = {
    dispatch: jest.fn(),
    getSelector: createGetSelector(() => currentMockState.state),
  });

  const mockRedux: MockRedux<State> = {
    dispatch: currentMockState.dispatch,

    give: (selector, returnValue) => {
      currentMockState.getSelector(selector).setMock(jest.fn().mockReturnValue(returnValue));
      return mockRedux;
    },

    giveMock: (selector, mock) => {
      currentMockState.getSelector(selector).setMock(mock);
      return mockRedux;
    },

    state: (newState) => {
      currentMockState.state = newState;
      return mockRedux;
    },
  };

  return mockRedux;
};
