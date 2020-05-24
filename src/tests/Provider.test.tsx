import "mock-redux";
import { Provider } from "react-redux";

describe("Provider", () => {
  it("throws an error when mock-redux has been imported", async () => {
    expect(Provider).toThrowError("Provider is not supported when using mock-redux.");
  });
});
