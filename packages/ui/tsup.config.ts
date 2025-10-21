import { defineConfig } from "tsup";
import { cssModulesPlugin } from "./scripts/esbuild-css-modules-plugin";

export default defineConfig((options) => {
  // dev 모드일 때는 watch 옵션이 true
  const isDev = Boolean(options.watch);

  return {
    entry: {
      index: "src/index.tsx",
    },
    format: ["cjs", "esm"],
    dts: true,
    external: ["react"],
    clean: !isDev,
    sourcemap: isDev,
    esbuildPlugins: [cssModulesPlugin(isDev)],
    ...options,
  };
});
