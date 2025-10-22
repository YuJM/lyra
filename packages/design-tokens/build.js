import StyleDictionary from 'style-dictionary';
import { formattedVariables, typeDtcgDelegate } from 'style-dictionary/utils';
import { propertyFormatNames } from 'style-dictionary/enums';
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

// Custom format for @custom-media from breakpoints
StyleDictionary.registerFormat({
  name: 'css/custom-media',
  format: ({ dictionary, options }) => {
    // Filter only breakpoint tokens
    const breakpoints = dictionary.allTokens.filter(token =>
      token.path[0] === 'breakpoint'
    );

    if (breakpoints.length === 0) {
      return '';
    }

    // Generate @custom-media declarations
    const customMediaDeclarations = breakpoints.map(token => {
      const name = token.path[token.path.length - 1]; // e.g., 'sm', 'md'
      // Get value from original DTCG format or transformed value
      const value = token.original?.$value || token.value;
      return `@custom-media --${name} (max-width: ${value});`;
    }).join('\n');

    return `/* Custom Media Queries - Auto-generated from breakpoints.json */\n${customMediaDeclarations}\n`;
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
        },
        {
          destination: 'breakpoints.css',
          format: 'css/custom-media',
          filter: (token) => token.path[0] === 'breakpoint'
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
  console.log('🎨 Building design tokens (primitives only)...\n');

  const sd = new StyleDictionary(baseConfig);
  await sd.buildAllPlatforms();

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
