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
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
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