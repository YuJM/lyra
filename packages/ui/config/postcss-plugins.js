const path = require('path');

/**
 * PostCSS 플러그인 목록
 * postcss.config.js와 Rollup plugin에서 공유
 */
module.exports = [
  // 1. postcss-import - @import를 인라인으로 번들 (반드시 첫 번째!)
  require('postcss-import')({
    // workspace 패키지 exports 필드 지원을 위한 커스텀 resolver
    resolve: (id, basedir, importOptions) => {
      // @comneed/lyra-* workspace 패키지 처리
      if (id.startsWith('@comneed/lyra-design-tokens')) {
        try {
          const pkgDir = path.join(__dirname, '../../design-tokens');
          const pkg = require(path.join(pkgDir, 'package.json'));

          // package.json exports 필드에서 경로 찾기
          let exportPath = id.replace('@comneed/lyra-design-tokens', '');
          // /css -> ./css로 정규화
          if (exportPath.startsWith('/')) {
            exportPath = '.' + exportPath;
          }

          if (pkg.exports && pkg.exports[exportPath]) {
            return path.join(pkgDir, pkg.exports[exportPath]);
          }
        } catch (e) {
          // fallback to default resolve
        }
      }

      // 기본 postcss-import resolve 로직 사용
      return id;
    },
    path: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../../../node_modules'),
      path.join(__dirname, '../../design-tokens/dist'),
    ],
  }),

  // 2. @csstools/postcss-cascade-layers - CSS Cascade Layers 지원
  require('@csstools/postcss-cascade-layers')(),

  // 3. postcss-mixins - 재사용 가능한 CSS 패턴
  require('postcss-mixins')({
    mixinsDir: path.join(__dirname, '../postcss-mixins'),
  }),

  // 4. postcss-nesting - CSS 중첩 지원 (SASS-like 구문)
  require('postcss-nesting')({
    noIsPseudoSelector: true, // SASS 호환성
  }),

  // 5. @csstools/postcss-global-data - @custom-media 정의를 모든 CSS 파일에서 사용 가능하게
  require('@csstools/postcss-global-data')({
    files: [
      path.join(__dirname, '../../design-tokens/dist/css/media-queries.css'),
    ],
  }),

  // 6. postcss-custom-media - Custom media query 지원
  require('postcss-custom-media')(),

  // 7. @shopify/postcss-plugin - Shopify PostCSS 통합 플러그인
  // (postcss-calc, postcss-flexbugs-fixes, postcss-will-change, autoprefixer 포함)
  require('@shopify/postcss-plugin')(),

  // 8. postcss-pxtorem - px를 rem으로 자동 변환 (접근성 향상)
  require('postcss-pxtorem')({
    rootValue: 16, // 1rem = 16px
    replace: true, // 원본 px를 rem으로 교체
    propList: ['*'], // 모든 속성에 적용
  }),

  // 9. postcss-discard-comments - 주석 제거 (Production only)
  process.env.NODE_ENV === 'production' && require('postcss-discard-comments')(),
].filter(Boolean);
