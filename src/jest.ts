import { createMockReactRedux } from "./core/createMockReactRedux";
import { createJestRunner } from "./runners/jest";

export * from "./core/types";

export const mockReactRedux = createMockReactRedux(createJestRunner());

export default mockReactRedux;
