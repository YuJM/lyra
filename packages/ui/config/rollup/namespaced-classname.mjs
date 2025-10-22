import {basename} from 'path';

/**
 * CSS Modules 클래스 이름 생성 함수
 * Polaris의 로직을 간소화
 *
 * @param {Object} options
 * @param {boolean} options.includeHash - 해시 포함 여부
 * @returns {Function} generateScopedName 함수
 */
export function generateScopedName({includeHash = false} = {}) {
  return (name, filename) => {
    // Vite/esbuild가 추가하는 쿼리 파라미터 제거
    const cleanedFilename = filename.replace(/\?.*$/, '');
    const componentName = basename(cleanedFilename, '.module.css');

    // 기본 클래스 이름: componentName-localName
    // 예: button.module.css의 .primary -> button-primary
    const className = componentName === name
      ? componentName
      : `${componentName}-${name}`;

    // 해시 추가
    const suffix = includeHash
      ? `_${stringHash(name).toString(36).substr(0, 5)}`
      : '';

    return className + suffix;
  };
}

/**
 * 간단한 문자열 해시 함수
 * Polaris의 string-hash 알고리즘 사용
 */
function stringHash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  // JavaScript의 비트 연산은 32비트 signed integer로 수행되므로
  // unsigned로 변환하기 위해 unsigned bitshift 사용
  return hash >>> 0;
}
