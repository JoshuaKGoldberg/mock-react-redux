import { render } from "@testing-library/react";
import { mockReactRedux } from "mock-react-redux/vitest";
import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import { describe, expect, it, vi } from "vitest";

const selectTitle = (state: { title: string }) => state.title;
const pageLoaded = () => ({ type: "pageLoaded" });

const Tester = () => {
  const dispatch = useDispatch();
  const title = useSelector(selectTitle);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  return <h1>{title}</h1>;
};

describe("mock-react-redux/vitest", () => {
  it("mocks react-redux with vi.fn() spies", () => {
    const { dispatch } = mockReactRedux().give(selectTitle, "Hooray!");

    act(() => {
      render(<Tester />).getByText("Hooray!");
    });

    expect(dispatch).toHaveBeenCalledWith(pageLoaded());
    expect(vi.isMockFunction(dispatch)).toBe(true);
  });
});
