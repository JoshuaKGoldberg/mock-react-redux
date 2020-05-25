import { mockRedux } from "mock-redux";
import { useSelector } from "react-redux";

type TestState = {
  value: string;
};

const selectTestValue = (state: TestState) => state.value;

describe("useSelector", () => {
  it("throws an error when mockRedux was not previously called", () => {
    expect(() => useSelector(selectTestValue)).toThrowError(
      `You imported mock-redux but didn't call mockRedux() before calling useSelector from react-redux.`,
    );
  });

  it("throws an error when the selector has not been given a return or mock and mock state has not been set", () => {
    mockRedux();

    expect(() => useSelector(selectTestValue)).toThrowError(
      `No Redux state or mock defined for 'selectTestValue'`,
    );
  });

  it("uses the mock state when mock state has been set", () => {
    const value = "Hooray!";

    mockRedux().state({ value });

    const result = useSelector(selectTestValue);

    expect(result).toEqual(value);
  });

  describe("give", () => {
    it("returns the provided value for a selector when the selector was given a value", () => {
      const testValue = "Hi!";

      mockRedux().give(selectTestValue, testValue);

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("returns the provided value for a selector when the selector was given a value and a mock state was set", () => {
      const testValue = "Hi!";

      mockRedux().give(selectTestValue, testValue).state({ value: "Something else!?" });

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("throws an error when called a second time for a selector when the selector was given a value", () => {
      const { give } = mockRedux();

      give(selectTestValue, "");

      expect(() => give(selectTestValue, "")).toThrowError(
        "Attempted to provide a second mock for 'selectTestValue'",
      );
    });
  });

  describe("giveMock", () => {
    it("passes through a mock implementation for a selector when the selector was given a value", () => {
      const testValue = "Hi!";

      mockRedux().giveMock(
        selectTestValue,
        jest.fn(() => testValue),
      );

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("passes through a mock implementation for a selector when the selector was given a value and a mock state was set", () => {
      const testValue = "Hi!";

      mockRedux()
        .giveMock(
          selectTestValue,
          jest.fn(() => testValue),
        )
        .state({ value: "Something else!?" });

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("throws an error when called a second time for a selector when the selector was given a value", () => {
      const { giveMock } = mockRedux();

      giveMock(
        selectTestValue,
        jest.fn(() => ""),
      );

      expect(() => giveMock(selectTestValue, jest.fn())).toThrowError(
        "Attempted to provide a second mock for 'selectTestValue'",
      );
    });
  });
});
