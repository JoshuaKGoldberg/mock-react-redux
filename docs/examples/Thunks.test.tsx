/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockReactRedux } from "mock-react-redux";
import { memoize } from "lodash";
import { DispatchProp } from "react-redux";

type Thunk = (dispatch: DispatchProp, getState: () => unknown) => void;

describe("thunks", () => {
  test("same function", () => {
    const makeCallThunk: Thunk = (_dispatch, _getState) => {
      /* ... */
    };

    const makeCall = () => makeCallThunk;

    const { dispatch } = mockReactRedux();

    dispatch(makeCall());

    expect(dispatch).toHaveBeenCalledWith(makeCallThunk);
  });

  test("memoized function", () => {
    const makeCallWith = memoize(
      (_value): Thunk => {
        return (_dispatch, _getState) => {
          /* ... */
        };
      },
    );

    const { dispatch } = mockReactRedux();

    const value = {
      /* ... */
    };

    dispatch(makeCallWith(value));

    expect(dispatch).toHaveBeenCalledWith(makeCallWith(value));
  });

  test("memoized function with string-based cache", () => {
    const makeCallWith = memoize(
      (_value): Thunk => {
        return (_dispatch, _getState) => {
          /* ... */
        };
      },
      (value) => JSON.stringify(value),
    );

    const { dispatch } = mockReactRedux();

    dispatch(makeCallWith({ value: 0 }));

    expect(dispatch).toHaveBeenCalledWith(makeCallWith({ value: 0 }));
  });
});
