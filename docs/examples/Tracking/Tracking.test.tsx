import { render, fireEvent } from "@testing-library/react";
import { mockRedux } from "mock-redux";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { markClicked, selectClicks } from "./redux";

const Tracking = () => {
  const clicks = useSelector(selectClicks);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(markClicked())} type="button">
      This button has been clicked {clicks} time{clicks === 1 ? "" : "s"}.
    </button>
  );
};

describe(Tracking, () => {
  it("renders a singular message when it has been clicked 1 time", () => {
    mockRedux().give(selectClicks, 1);

    const view = render(<Tracking />);

    view.getByText("This button has been clicked 1 time.");
  });

  it("renders a plural message when it has been clicked 2 times", () => {
    mockRedux().give(selectClicks, 2);

    const view = render(<Tracking />);

    view.getByText("This button has been clicked 2 times.");
  });

  it("dispatches the markClicked event when clicked", () => {
    const { dispatch } = mockRedux().give(selectClicks, 1);

    const view = render(<Tracking />);

    fireEvent.click(view.getByRole("button"));

    expect(dispatch).toHaveBeenCalledWith(markClicked());
  });
});
