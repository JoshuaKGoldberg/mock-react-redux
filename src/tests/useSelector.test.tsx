import { mockReactRedux } from "mock-react-redux";
import { useSelector } from "react-redux";

type TestState = {
  value: string;
};

const selectTestValue = (state: TestState) => state.value;

describe("useSelector", () => {
  it("throws an error when mockReactRedux was not previously called", () => {
    expect(() => useSelector(selectTestValue)).toThrowError(
      `You imported mock-react-redux but didn't call mockReactRedux() before calling useSelector from react-redux.`,
    );
  });

  it("throws an error when a named selector has not been given a return or mock and mock state has not been set", () => {
    mockReactRedux();

    expect(() => useSelector(selectTestValue)).toThrowError(
      `No Redux state or mock defined for 'selectTestValue'`,
    );
  });

  it("throws an error when an anonymous selector has not been given a return or mock and mock state has not been set", () => {
    mockReactRedux();

    expect(() => useSelector(() => true)).toThrowError(
      `No Redux state or mock defined for '() => true'`,
    );
  });

  it("uses the mock state when mock state has been set", () => {
    const value = "Hooray!";

    mockReactRedux().state({ value });

    const result = useSelector(selectTestValue);

    expect(result).toEqual(value);
  });

  describe("give", () => {
    it("returns the provided value for a selector when the selector was given a value", () => {
      const testValue = "Hi!";

      mockReactRedux().give(selectTestValue, testValue);

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("returns the provided value for a selector when the selector was given a value and a mock state was set", () => {
      const testValue = "Hi!";

      mockReactRedux().give(selectTestValue, testValue).state({ value: "Something else!?" });

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("throws an error when called a second time for a named selector when the selector was given a value", () => {
      const { give } = mockReactRedux();

      give(selectTestValue, "");

      expect(() => give(selectTestValue, "")).toThrowError(
        "Attempted to provide a second mock for 'selectTestValue'",
      );
    });

    it("throws an error when called a second time for an anonymous selector when the selector was given a value", () => {
      const { give } = mockReactRedux();
      const selector = (() => () => "")();

      give(selector, "");

      expect(() => give(selector, "")).toThrowError(
        `Attempted to provide a second mock for '() => ""'`,
      );
    });
  });

  describe("giveMock", () => {
    it("passes through a mock implementation for a selector when the selector was given a value", () => {
      const testValue = "Hi!";

      mockReactRedux().giveMock(
        selectTestValue,
        jest.fn(() => testValue),
      );

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("passes through a mock implementation for a selector when the selector was given a value and a mock state was set", () => {
      const testValue = "Hi!";

      mockReactRedux()
        .giveMock(
          selectTestValue,
          jest.fn(() => testValue),
        )
        .state({ value: "Something else!?" });

      const result = useSelector(selectTestValue);

      expect(result).toEqual(testValue);
    });

    it("throws an error when called a second time for a selector when the selector was given a value", () => {
      const { giveMock } = mockReactRedux();

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
