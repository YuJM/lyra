import StyleDictionary from 'style-dictionary';
import { formattedVariables, typeDtcgDelegate } from 'style-dictionary/utils';
import { propertyFormatNames } from 'style-dictionary/enums';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { watch, readFileSync, writeFileSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if watch mode is enabled
const isWatchMode = process.argv.includes('--watch');

// DTCG preprocessor 등록
StyleDictionary.registerPreprocessor({
  name: 'dtcg',
  preprocessor: (dictionary) => typeDtcgDelegate(dictionary),
});

// Custom format for CSS with cascade layers and references
StyleDictionary.registerFormat({
  name: 'css/layer-variables',
  format: ({ dictionary, options }) => {
    const layer = options.layer || 'base';
    const selector = options.selector || ':root';

    return `@layer ${layer} {
  ${selector} {
${formattedVariables({
  format: propertyFormatNames.css,
  dictionary,
  outputReferences: options.outputReferences,
  usesDtcg: true,
})}
  }
}
`;
  }
});

// Build configuration for primitive tokens only
const baseConfig = {
  preprocessors: ['dtcg'],
  source: [
    'src/tokens/spacing.json',
    'src/tokens/colors/primitives.json',
    'src/tokens/typography.json',
    'src/tokens/borders.json',
    'src/tokens/shadows.json',
    'src/tokens/animation.json',
    'src/tokens/z-index.json',
    'src/tokens/breakpoints.json'
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/layer-variables',
          options: {
            layer: 'base',
            selector: ':root',
            outputReferences: true
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6'
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat'
        }
      ]
    }
  }
};

// px를 em으로 변환 (접근성 향상, 기본 폰트 크기: 16px)
function pxToEm(pxValue) {
  const baseFontSize = 16;
  const value = parseFloat(pxValue);
  return `${value / baseFontSize}em`;
}

// Breakpoints에서 @custom-media 생성
function generateMediaQueries() {
  const breakpointsPath = join(__dirname, 'src/tokens/breakpoints.json');
  const outputDir = join(__dirname, 'dist/css');
  const outputPath = join(outputDir, 'media-queries.css');

  // breakpoints.json 읽기
  const breakpointsFile = readFileSync(breakpointsPath, 'utf8');
  const breakpointsData = JSON.parse(breakpointsFile);
  const breakpoints = breakpointsData.breakpoint;

  // breakpoint 엔트리를 배열로 변환하고 정렬
  const breakpointEntries = Object.entries(breakpoints);

  // @custom-media 선언 생성
  const mediaQueries = [];
  mediaQueries.push('/* Custom Media Queries - Auto-generated from breakpoints.json */');
  mediaQueries.push('/* Polaris-inspired media query system with up/down/only directions */\n');

  breakpointEntries.forEach(([name, tokenData], index) => {
    const pxValue = tokenData.$value;
    const emValue = pxToEm(pxValue);

    // down은 0.04px를 빼서 충돌 방지 (Polaris 방식)
    const downValue = parseFloat(pxValue) - 0.04;
    const downEmValue = pxToEm(`${downValue}px`);

    // up: 해당 사이즈 이상
    mediaQueries.push(`@custom-media --${name}-up (min-width: ${emValue});`);

    // down: 해당 사이즈 이하
    mediaQueries.push(`@custom-media --${name}-down (max-width: ${downEmValue});`);

    // only: 해당 사이즈 범위만
    if (index < breakpointEntries.length - 1) {
      const nextPxValue = breakpointEntries[index + 1][1].$value;
      const nextDownValue = parseFloat(nextPxValue) - 0.04;
      const nextDownEmValue = pxToEm(`${nextDownValue}px`);
      mediaQueries.push(`@custom-media --${name}-only (min-width: ${emValue}) and (max-width: ${nextDownEmValue});`);
    } else {
      // 마지막 breakpoint의 only는 up과 동일
      mediaQueries.push(`@custom-media --${name}-only (min-width: ${emValue});`);
    }

    mediaQueries.push(''); // 빈 줄 추가
  });

  // 디렉토리가 없으면 생성
  mkdirSync(outputDir, { recursive: true });

  // 파일 작성
  writeFileSync(outputPath, mediaQueries.join('\n'));
  console.log('📱 Generated media-queries.css');
}

// Build function
async function buildTokens() {
  console.log('🎨 Building design tokens (primitives only)...\n');

  const sd = new StyleDictionary(baseConfig);
  await sd.buildAllPlatforms();

  // Media queries 생성
  generateMediaQueries();

  console.log('\n✅ Design tokens built successfully!');
}

// Initial build
await buildTokens();

// Watch mode
if (isWatchMode) {
  console.log('\n👀 Watching for changes...\n');

  const watcher = watch('src/tokens', { recursive: true }, async (eventType, filename) => {
    if (filename && filename.endsWith('.json')) {
      console.log(`\n📝 Change detected: ${filename}`);
      await buildTokens();
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping watch mode...');
    watcher.close();
    process.exit(0);
  });
}
