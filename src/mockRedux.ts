import { mockConnect } from "./connect";
import { createGetSelector, GetSelector } from "./selectors";
import { MockRedux, AnySelector } from "./types";

type MockSituation = {
  dispatch: jest.Mock;
  getSelector: GetSelector;
  state?: unknown;
};

let mockSituation: MockSituation | undefined;

const mockStateError = (name: string) => {
  throw new Error(
    `You included mock-redux but didn't call mockRedux() before calling ${name} from react-redux.`,
  );
};

jest.mock("react-redux", () => {
  const getDispatch = () => mockSituation?.dispatch ?? mockStateError("useDispatch");
  const getSelector = (selector: AnySelector) => {
    return mockSituation
      ? mockSituation.getSelector(selector).provide()
      : mockStateError("useSelector");
  };

  return {
    connect: mockConnect(getDispatch, () => {
      if (!mockSituation) {
        throw new Error(
          "You included mock-redux but didn't call mockRedux() before rendering a connect() component.",
        );
      }

      if (!mockSituation.state) {
        throw new Error(
          "You included mock-redux but didn't set state before rendering a connect() component.",
        );
      }

      return mockSituation.state;
    }),
    Provider: () => {
      throw new Error(`Provider is not supported when using mock-redux.`);
    },
    useDispatch: getDispatch,
    useSelector: getSelector,
  };
});

afterEach(() => {
  mockSituation = undefined;
});

export const mockRedux = <State>(): MockRedux<State> => {
  if (require.cache[require.resolve("react-redux")]) {
    throw new Error(
      "It looks like you imported react-redux before mock-redux. Import mock-redux before react-redux or any imports that include react-redux.",
    );
  }

  const currentMockSituation: MockSituation = (mockSituation = {
    dispatch: jest.fn(),
    getSelector: createGetSelector(() => currentMockSituation.state),
  });

  const mockRedux: MockRedux<State> = {
    dispatch: currentMockSituation.dispatch,

    give: (selector, returnValue) => {
      currentMockSituation.getSelector(selector).setMock(jest.fn().mockReturnValue(returnValue));
      return mockRedux;
    },

    giveMock: (selector, mock) => {
      currentMockSituation.getSelector(selector).setMock(mock);
      return mockRedux;
    },

    state: (newState) => {
      currentMockSituation.state = newState;
      return mockRedux;
    },
  };

  return mockRedux;
};
