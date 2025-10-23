import type { Preview } from '@storybook/react-vite'

// IMPORTANT: 스타일 적용 순서 보장을 위해 import 순서 유지 필요
// 1. Global styles - Reset/Normalize 먼저 로드하여 초기화
import '../src/global.css'
// 2. Design tokens styles - 커스텀 스타일이 reset을 덮어쓰도록 나중에 로드
import '../src/stories/design-tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // WCAG 2.1 AA 준수를 위한 엄격한 설정
      config: {
        rules: [
          // WCAG 2.1 Level AA 필수 규칙
          { id: 'color-contrast', enabled: true }, // 4.5:1 대비율 (일반 텍스트), 3:1 (대형 텍스트)
          { id: 'aria-allowed-attr', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'duplicate-id', enabled: true },
          { id: 'form-field-multiple-labels', enabled: true },
          { id: 'frame-title', enabled: true },
          { id: 'html-has-lang', enabled: true },
          { id: 'html-lang-valid', enabled: true },
          { id: 'image-alt', enabled: true },
          { id: 'input-image-alt', enabled: true },
          { id: 'label', enabled: true },
          { id: 'link-name', enabled: true },
          { id: 'list', enabled: true },
          { id: 'listitem', enabled: true },
          { id: 'meta-viewport', enabled: true },
          { id: 'valid-lang', enabled: true },
        ],
      },
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations (향후 CI/CD 구축 시 활성화)
      // 'off' - skip a11y checks entirely
      manual: false, // 자동 테스트 활성화
    },

    // 배경색 옵션 추가
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },

    // 기본 레이아웃 설정
    layout: 'centered',
  },
};

export default preview;