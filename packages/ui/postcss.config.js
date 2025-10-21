const path = require('path');

module.exports = (ctx) => {
  // Production 환경 감지 (명시적으로 설정된 경우만)
  const isProduction = process.env.NODE_ENV === 'production';
  // Dev 모드 = production이 아닌 경우
  const isDev = !isProduction;

  return {
    plugins: [
      // 1. postcss-import - @import를 인라인으로 번들 (반드시 첫 번째!)
      require('postcss-import')(),

      // 2. @csstools/postcss-cascade-layers - CSS Cascade Layers 지원
      require('@csstools/postcss-cascade-layers')(),

      // 3. postcss-mixins - 재사용 가능한 CSS 패턴
      require('postcss-mixins')({
        mixinsDir: path.join(__dirname, 'postcss-mixins'),
      }),

      // 4. postcss-nesting - CSS 중첩 지원 (SASS-like 구문)
      require('postcss-nesting')({
        noIsPseudoSelector: true, // SASS 호환성
      }),

      // 5. postcss-custom-media - Custom media query 지원
      require('postcss-custom-media')(),

      // 6. @shopify/postcss-plugin - Shopify PostCSS 통합 플러그인
      // (postcss-calc, postcss-flexbugs-fixes, postcss-will-change, autoprefixer 포함)
      require('@shopify/postcss-plugin')(),

      // 7. postcss-pxtorem - px를 rem으로 자동 변환 (접근성 향상)
      require('postcss-pxtorem')({
        rootValue: 16, // 1rem = 16px
        replace: true, // 원본 px를 rem으로 교체
        propList: ['*'], // 모든 속성에 적용
      }),

      // 8. postcss-modules - CSS Modules 해시 처리
      require('postcss-modules')({
        generateScopedName: isDev
          ? '[local]'
          : '[local]_[hash:base64:5]',
        getJSON: (cssFileName, json) => {
          // .module.css만 JSON 생성 (esbuild 플러그인용)
          // global.css는 JSON 생성하지 않음
          if (cssFileName.includes('.module.css')) {
            const fs = require('fs');
            const jsonFileName = cssFileName.replace('.css', '.css.json');
            fs.writeFileSync(jsonFileName, JSON.stringify(json, null, 2));
          }
        },
      }),

      // 9. cssnano - CSS 압축 및 최적화 (Production only)
      isProduction && require('cssnano')({
        preset: 'default',
      }),

      // 10. postcss-discard-comments - 주석 제거 (Production only)
      isProduction && require('postcss-discard-comments')(),
    ].filter(Boolean), // false 값 제거
  };
};
