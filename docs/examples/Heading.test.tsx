import { render } from "@testing-library/react";
import { mockReactRedux } from "mock-react-redux";
import * as React from "react";
import { useSelector } from "react-redux";

type RootState = {
  title: string;
};

const selectTitle = (state: RootState) => state.title;

const Heading = () => {
  const title = useSelector(selectTitle);

  return <h1>{title}</h1>;
};

describe(Heading, () => {
  describe("Mocking State", () => {
    it("renders the title from state", () => {
      mockReactRedux().state({ title: "Test Title" });

      const view = render(<Heading />);

      view.getByText("Test Title");
    });
  });

  describe("Mocking Selectors", () => {
    it("renders the title from state", () => {
      mockReactRedux().give(selectTitle, "Test Title");

      const view = render(<Heading />);

      view.getByText("Test Title");
    });
  });
});
