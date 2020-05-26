import "react-redux";
import { mockReactRedux } from "mock-react-redux";

describe("mockReactRedux", () => {
  it("throws an error when required after react-redux", async () => {
    expect(mockReactRedux).toThrowError(
      "It looks like you imported react-redux before mock-react-redux. Import mock-react-redux before react-redux or any imports that include react-redux.",
    );
  });
});
