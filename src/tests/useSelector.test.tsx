import { mockRedux } from "mock-redux";
import { useSelector } from "react-redux";

const selectTestValue = () => "";

describe("useSelector", () => {
  it("throws an error when mockRedux was not previously called", () => {
    expect(() => useSelector(selectTestValue)).toThrowError(
      `You included mock-redux but didn't call mockRedux() before calling useSelector from react-redux.`,
    );
  });

  it("throws an error when the selector has not been given a return or mock", () => {
    mockRedux();

    expect(() => useSelector(selectTestValue)).toThrowError(
      `No mock defined for 'selectTestValue'`,
    );
  });

  describe("give", () => {
    it("returns the provided value for a selector", () => {
      const testValue = "Hi!";

      mockRedux().give(selectTestValue, testValue);

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("throws an error when called a second time for a selector", () => {
      const { give } = mockRedux();

      give(selectTestValue, "");

      expect(() => give(selectTestValue, "")).toThrowError(
        "Attempted to provide a second mock for 'selectTestValue'",
      );
    });
  });

  describe("giveMock", () => {
    it("passes through a mock implementation for a selector", () => {
      const testValue = "Hi!";

      mockRedux().giveMock(
        selectTestValue,
        jest.fn(() => testValue),
      );

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });
  });
});
