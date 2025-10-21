/**
 * PostCSS 설정
 * Rollup plugin-styles.js에서 사용하기 위해 config/postcss-plugins.js를 가져옴
 * postcss-modules는 Rollup 플러그인에서 처리
 */
const postcssPlugins = require('./config/postcss-plugins.js');

module.exports = {
  plugins: postcssPlugins,
};
