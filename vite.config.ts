import tsconfigPaths from "vitest-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {},
  plugins: [tsconfigPaths()],
});
