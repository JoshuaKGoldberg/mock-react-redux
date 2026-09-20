import { mockConnect } from "./connect";
import { getMockSituation } from "./situation";
import { AnySelector } from "./types";

const mockSupportedError = (name: string) => {
  throw new Error(
    `${name} is not yet supported when using mock-react-redux. Consider filing an issue on https://github.com/JoshuaKGoldberg/mock-react-redux. Thanks, friend!`,
  );
};

const mockStateError = (name: string) => {
  throw new Error(
    `You imported mock-react-redux but didn't call mockReactRedux() before calling ${name} from react-redux.`,
  );
};

/**
 * Creates the object that replaces the `react-redux` module in tests.
 */
export const createReactReduxModule = () => {
  const getDispatch = () => getMockSituation()?.dispatch ?? mockStateError("useDispatch");
  const getSelector = (selector: AnySelector) => {
    const mockSituation = getMockSituation();
    return mockSituation
      ? mockSituation.getSelector(selector).provide()
      : mockStateError("useSelector");
  };

  return {
    connect: mockConnect(getDispatch, () => {
      const mockSituation = getMockSituation();

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
    ].reduce<Record<string, () => void>>((accum, apiName) => {
      accum[apiName] = () => mockSupportedError(apiName);
      return accum;
    }, {}),
  };
};
