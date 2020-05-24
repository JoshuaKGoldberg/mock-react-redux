import { render, fireEvent } from "@testing-library/react";
import { mockRedux } from "mock-redux";
import * as React from "react";
import { useDispatch } from "react-redux";

import { markClicked } from "./redux";

const Clicker = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(markClicked())} type="button">
      Click me!
    </button>
  );
};

describe(Clicker, () => {
  it("dispatches the markClicked event when clicked", () => {
    const { dispatch } = mockRedux();

    const view = render(<Clicker />);

    fireEvent.click(view.getByRole("button"));

    expect(dispatch).toHaveBeenCalledWith(markClicked());
  });
});
