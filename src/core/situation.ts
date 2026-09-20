import { GetSelector } from "./selectors";
import { AnyMockFunction } from "./types";

/**
 * Mock state for the current test, created by mockReactRedux() and read by the mocked react-redux module.
 */
export type MockSituation = {
  dispatch: AnyMockFunction;
  getSelector: GetSelector;
  state?: unknown;
};

let mockSituation: MockSituation | undefined;

export const getMockSituation = () => mockSituation;

export const setMockSituation = (newSituation: MockSituation | undefined) => {
  mockSituation = newSituation;
};
