import StyleDictionary from 'style-dictionary';
import { usesReferences, getReferences, typeDtcgDelegate } from 'style-dictionary/utils';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { watch } from 'fs';

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
    const outputReferences = options.outputReferences ?? false;

    return `@layer ${layer} {
  ${selector} {
${dictionary.allTokens.map(token => {
  // DTCG preprocessor를 사용하더라도 $value를 직접 접근
  let value = token.$value ?? token.value;

  // outputReferences가 true이고 토큰이 다른 토큰을 참조하는 경우
  const originalValue = token.original?.$value ?? token.original?.value;

  if (outputReferences && token.original && usesReferences(originalValue)) {
    const refs = getReferences(originalValue, dictionary.tokens);

    if (refs && refs.length > 0) {
      const varName = refs[0].ref.join('-');
      value = `var(--${varName})`;
    }
  }

  return `    --${token.name}: ${value};`;
}).join('\n')}
  }
}
`;
  }
});

// Build configuration for primitive tokens only
const baseConfig = {
  preprocessors: ['dtcg'],
  source: [
    'src/tokens/size.json',
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

// Build function
async function buildTokens() {
  console.log('🎨 Building primitive design tokens...\n');

  const sd = new StyleDictionary(baseConfig);
  await sd.buildAllPlatforms();

  console.log('\n✅ Primitive design tokens built successfully!');
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
