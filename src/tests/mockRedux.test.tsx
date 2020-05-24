import "react-redux";
import { mockRedux } from "mock-redux";

describe("mockRedux", () => {
  it("throws an error when required after react-redux", async () => {
    expect(mockRedux).toThrowError(
      "It looks like you imported react-redux before mock-redux. Put mock-redux before react-redux or any imports that include react-redux.",
    );
  });
});
