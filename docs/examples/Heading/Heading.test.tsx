import { render } from "@testing-library/react";
import { mockRedux } from "mock-redux";
import * as React from "react";
import { useSelector } from "react-redux";

import { selectTitle } from "./redux";

const Heading = () => {
  const title = useSelector(selectTitle);

  return <h1>{title}</h1>;
};

describe(Heading, () => {
  it("renders the title from state", () => {
    mockRedux().give(selectTitle, "Test Title");

    const view = render(<Heading />);

    view.getByText("Test Title");
  });
});
