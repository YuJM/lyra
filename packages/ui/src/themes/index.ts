/**
 * Theme Presets for Lyra UI
 *
 * 다양한 디자인 가이드라인을 준수하는 테마 프리셋 모음
 */

export { default as chatgptTheme } from './chatgpt.css?inline';

/**
 * 사용 방법:
 *
 * ```tsx
 * import { chatgptTheme } from '@lyra/ui/themes';
 *
 * // 테마 적용
 * function App() {
 *   return (
 *     <>
 *       <style>{chatgptTheme}</style>
 *       <YourComponents />
 *     </>
 *   );
 * }
 * ```
 *
 * 또는 직접 CSS 파일 import:
 *
 * ```tsx
 * import '@lyra/ui/themes/chatgpt.css';
 * ```
 */
