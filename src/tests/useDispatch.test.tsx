import { render } from "@testing-library/react";
import { mockRedux } from "mock-redux";
import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";

const stubAction = { type: "test" };

const Tester = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stubAction);
  }, [dispatch]);

  return <></>;
};

describe("useDispatch", () => {
  it("throws an error when mockRedux was not previously called", () => {
    expect(useDispatch).toThrowError(
      `You included mock-redux but didn't call mockRedux() before calling useDispatch from react-redux.`,
    );
  });

  it("directly passes a mocked call from the component when mockRedux was previously called", () => {
    const { dispatch } = mockRedux();

    act(() => {
      render(<Tester />);
    });

    expect(dispatch).toHaveBeenCalledWith(stubAction);
  });
});
