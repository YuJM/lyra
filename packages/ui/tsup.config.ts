import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx", "src/global.css"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  clean: true,
  sourcemap: true,
  ...options,
}));
