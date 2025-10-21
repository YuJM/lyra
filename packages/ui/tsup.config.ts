import { defineConfig } from "tsup";

export default defineConfig((options) => {
  // dev 모드일 때는 watch 옵션이 true
  const isDev = options.watch;

  return {
    entryPoints: ["src/button.tsx", "src/global.css"],
    format: ["cjs", "esm"],
    dts: true,
    external: ["react"],
    clean: !isDev, // dev: false, production: true
    sourcemap: isDev, // dev: true, production: false
    ...options,
  };
});
