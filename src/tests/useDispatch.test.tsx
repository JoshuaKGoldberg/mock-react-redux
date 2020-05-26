import { render } from "@testing-library/react";
import { mockReactRedux } from "mock-react-redux";
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
  it("throws an error when mockReactRedux was not previously called", () => {
    expect(useDispatch).toThrowError(
      `You imported mock-react-redux but didn't call mockReactRedux() before calling useDispatch from react-redux.`,
    );
  });

  it("directly passes a mocked call from the component when mockReactRedux was previously called", () => {
    const { dispatch } = mockReactRedux();

    act(() => {
      render(<Tester />);
    });

    expect(dispatch).toHaveBeenCalledWith(stubAction);
  });
});
