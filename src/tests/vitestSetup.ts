import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// @testing-library/react only auto-registers cleanup when a global afterEach exists at import time.
afterEach(cleanup);
