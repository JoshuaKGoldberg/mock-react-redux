import type { Mock } from "vitest";
import { afterEach, vi } from "vitest";
import { createMockReactRedux } from "./core/createMockReactRedux";
import { createReactReduxModule } from "./core/createReactReduxModule";

vi.mock("react-redux", () => createReactReduxModule());

export * from "./core/types";

export const mockReactRedux = createMockReactRedux<Mock>({
  afterEach,
  fn: (implementation) => vi.fn(implementation),
});

export default mockReactRedux;
