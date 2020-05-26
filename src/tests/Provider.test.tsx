import "mock-react-redux";
import { Provider } from "react-redux";

describe("Provider", () => {
  it("throws an error when mock-react-redux has been imported", async () => {
    expect(Provider).toThrowError("Provider is not supported when using mock-react-redux.");
  });
});
