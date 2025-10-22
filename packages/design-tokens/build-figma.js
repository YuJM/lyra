import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 토큰 파일 목록
const tokenFiles = [
  { path: 'src/tokens/spacing.json', set: 'primitives/spacing' },
  { path: 'src/tokens/colors/primitives.json', set: 'primitives/colors' },
  { path: 'src/tokens/typography.json', set: 'primitives/typography' },
  { path: 'src/tokens/borders.json', set: 'primitives/borders' },
  { path: 'src/tokens/shadows.json', set: 'primitives/shadows' },
  { path: 'src/tokens/animation.json', set: 'primitives/animation' },
  { path: 'src/tokens/z-index.json', set: 'primitives/z-index' },
  { path: 'src/tokens/breakpoints.json', set: 'primitives/breakpoints' }
];

// Figma Tokens 형식으로 변환
const figmaTokens = {
  $metadata: {
    tokenSetOrder: tokenFiles.map(f => f.set)
  }
};

// 각 토큰 파일 읽어서 병합
tokenFiles.forEach(({ path, set }) => {
  const fullPath = join(__dirname, path);
  const content = JSON.parse(readFileSync(fullPath, 'utf-8'));
  figmaTokens[set] = content;
});

// $tokens.json 파일 생성
const outputPath = join(__dirname, '$tokens.json');
writeFileSync(outputPath, JSON.stringify(figmaTokens, null, 2));

console.log('✅ Figma Tokens config generated: $tokens.json');
