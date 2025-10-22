const path = require('path');

const {createFilter} = require('@rollup/pluginutils');
const postcss = require('postcss');
const cssModules = require('postcss-modules');

/**
 * CSS Modules를 처리하는 Rollup 플러그인
 * Polaris의 plugin-styles.js를 기반으로 간소화
 *
 * @param {Object} options
 * @param {string} options.output - 번들된 CSS 파일 경로
 * @param {Array} options.plugins - PostCSS 플러그인 목록
 * @param {Object} options.modules - postcss-modules 옵션
 * @param {string} options.mode - 'standalone' | 'esnext'
 */
module.exports.styles = function styles({
  output = '',
  plugins = [],
  modules = {},
  mode,
  include = ['**/*.css'],
  exclude = [],
} = {}) {
  if (!['standalone', 'esnext'].includes(mode)) {
    throw new Error(
      `Expected mode to be either "standalone" or "esnext", but got "${mode}"`,
    );
  }

  const filter = createFilter(include, exclude);

  // PostCSS 플러그인 순서:
  // 1. postcss-import, postcss-custom-media 등이 먼저 실행
  // 2. postcss-modules는 마지막에 실행되어야 CSS Modules 처리
  const styleProcessor = postcss([
    ...plugins,
    cssModules({
      ...modules,
      // eslint-disable-next-line no-empty-function
      getJSON() {},
    }),
  ]);

  let inputRoot;
  const cssByFile = {};

  function transformStandalone(rollup, id, postCssOutput) {
    cssByFile[id] = postCssOutput.css;

    const properties = JSON.stringify(postCssOutput.tokens, null, 2);
    // no-treeshake to ensure css files are included in bundle
    return {
      code: `export default ${properties};`,
      moduleSideEffects: 'no-treeshake',
    };
  }

  function transformEsNext(rollup, id, postCssOutput) {
    const processedExt = '.out.css';
    const relativePath = `./${path.relative(
      path.dirname(id),
      id.replace(/(\.module)?\.css$/, processedExt),
    )}`;

    rollup.emitFile({
      type: 'asset',
      fileName: id
        .replace(`${inputRoot}/`, '')
        .replace(/(\.module)?\.css$/, processedExt),
      source: postCssOutput.css,
    });

    const properties = JSON.stringify(postCssOutput.tokens, null, 2);
    return {
      code: `import '${relativePath}';\nexport default ${properties};`,
    };
  }

  function generateBundleStandalone(rollup, generateOptions, bundle) {
    // generateBundle는 build.write() 호출마다 실행됨
    // CJS와 ESM 빌드를 구분해서 한 번만 실행
    if (generateOptions.dir !== 'dist/esm') {
      return;
    }

    if (typeof output !== 'string') {
      return;
    }

    // 엔트리포인트의 import 순서대로 CSS 결합
    const entrypointBundles = Object.values(bundle).filter(
      (bundleInfo) => bundleInfo.isEntry,
    );
    const bundleModuleIds = entrypointBundles.flatMap((bundleInfo) =>
      getRecursiveImportOrder(bundleInfo.facadeModuleId, rollup.getModuleInfo),
    );

    let css = bundleModuleIds
      .filter((id) => id in cssByFile)
      .map((id) => cssByFile[id])
      .join('\n\n');

    // CSS 파일 생성
    rollup.emitFile({type: 'asset', fileName: output, source: css});
  }

  return {
    name: 'styles',

    buildStart({input}) {
      inputRoot = path.resolve(process.cwd(), path.dirname(input[0]));
    },

    // esnext 모드에서 생성된 .out.css import를 external로 처리
    resolveId(source, importer) {
      if (!source.endsWith('.out.css')) return;
      const id = path.resolve(path.dirname(importer), source);
      return {
        id,
        external: true,
      };
    },

    async transform(source, id) {
      if (!filter(id)) {
        return null;
      }

      const postCssOutput = await styleProcessor
        .process(source, {from: id})
        .then((result) => ({
          css: result.css,
          tokens: result.messages.find(({plugin, type}) => {
            return plugin === 'postcss-modules' && type === 'export';
          })?.exportTokens || {},
        }));

      if (mode === 'standalone') {
        return transformStandalone(this, id, postCssOutput);
      }
      if (mode === 'esnext') {
        return transformEsNext(this, id, postCssOutput);
      }
    },

    generateBundle(generateOptions, bundles) {
      if (mode === 'standalone') {
        return generateBundleStandalone(this, generateOptions, bundles);
      }
    },
  };
};

/**
 * Rollup에서 재귀적으로 import 순서 가져오기
 */
function getRecursiveImportOrder(id, getModuleInfo, seen = new Set()) {
  if (seen.has(id)) {
    return [];
  }

  seen.add(id);

  const result = [id];
  getModuleInfo(id).importedIds.forEach((importFile) => {
    result.push(...getRecursiveImportOrder(importFile, getModuleInfo, seen));
  });

  return result;
}
