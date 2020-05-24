import "mock-redux";
import { connect } from "react-redux";

describe("connect", () => {
  it("throws an error when mock-redux has been imported", async () => {
    expect(connect).toThrowError("connect is not supported when using mock-redux.");
  });
});
