import type { Plugin } from "esbuild";
import { readFile } from "fs/promises";
import { writeFileSync } from "fs";
import { resolve } from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";

/**
 * CSS Modules를 처리하는 esbuild 플러그인
 *
 * 작동 방식:
 * 1. .module.css import를 .module.css.json으로 리다이렉트
 * 2. PostCSS로 원본 .module.css 파일 처리
 * 3. postcss-modules로 환경에 따라 해시된 클래스 생성
 *    - Dev: [local] (해시 없음)
 *    - Prod: [local]_[hash:base64:5]
 * 4. 토큰을 JSON 파일로 저장 및 반환
 * 5. CSS는 index.tsx에서 직접 import되어 tsup이 번들에 포함
 */
export function cssModulesPlugin(isDev: boolean): Plugin {
  return {
    name: "css-modules",
    setup(build) {
      // 1. .module.css import를 .module.css.json으로 리다이렉트
      build.onResolve({ filter: /\.module\.css$/ }, (args) => {
        // Side-effect import는 리다이렉트하지 않음 (CSS 번들용)
        if (args.importer && args.importer.includes('index.tsx')) {
          return undefined; // PostCSS가 처리하도록
        }

        // 컴포넌트에서의 import는 .json으로 리다이렉트 (토큰용)
        const fullPath = resolve(args.resolveDir, args.path);
        return {
          path: fullPath + ".json",
          namespace: "file",
        };
      });

      // 2. .module.css.json 파일 로드 시 PostCSS 처리
      build.onLoad({ filter: /\.module\.css\.json$/ }, async (args) => {
        const cssPath = args.path.replace(/\.json$/, "");
        const css = await readFile(cssPath, "utf8");

        const result = await postcss([
          postcssModules({
            generateScopedName: isDev
              ? "[local]"
              : "[local]_[hash:base64:5]",
            getJSON: (cssFileName, json) => {
              // JSON 파일 생성
              writeFileSync(args.path, JSON.stringify(json, null, 2));
            },
          }),
        ]).process(css, { from: cssPath });

        // 토큰 추출 및 반환
        const tokens =
          result.messages.find((msg) => msg.type === "export")?.exportTokens ||
          {};

        return {
          contents: JSON.stringify(tokens),
          loader: "json",
        };
      });
    },
  };
}
