import {readFileSync} from 'fs';
import * as path from 'path';

import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';

import {styles} from './config/rollup/plugin-styles.js';
import {generateScopedName} from './config/rollup/namespaced-classname.mjs';
import postcssPlugins from './config/postcss-plugins.js';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname),
);
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function generateConfig({output, stylesConfig}) {
  return {
    input: './src/index.tsx',
    plugins: [
      // 외부 의존성 처리 (react, react-dom 등)
      externals({deps: true, packagePath: './package.json'}),

      // Node 모듈 resolution
      nodeResolve({extensions}),

      // CommonJS 모듈 지원
      commonjs(),

      // Babel 트랜스파일
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      }),

      // JSON import 지원
      json({
        compact: true,
      }),

      // CSS Modules 처리
      styles(stylesConfig),
    ],
    output,
  };
}

/** @type {import('rollup').RollupOptions[]} */
export default [
  // Production 빌드 - 단일 CSS 파일
  generateConfig({
    stylesConfig: {
      mode: 'standalone',
      output: 'index.css',
      modules: {
        generateScopedName: generateScopedName({
          includeHash: process.env.NODE_ENV === 'production',
        }),
        globalModulePaths: [/global\.css$/],
      },
      plugins: postcssPlugins,
    },
    output: [
      // CommonJS
      {
        format: 'cjs',
        dir: 'dist/cjs',
        preserveModules: true,
        entryFileNames: '[name].js',
        exports: 'named',
      },
      // ESM
      {
        format: 'esm',
        dir: 'dist/esm',
        preserveModules: true,
        entryFileNames: '[name].mjs',
      },
    ],
  }),
];
