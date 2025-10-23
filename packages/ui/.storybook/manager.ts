import { addons } from '@storybook/manager-api';
import { create } from '@storybook/core/theming';

const lyraTheme = create({
  base: 'light',

  // 브랜딩
  brandTitle: 'Lyra Design System',
  brandUrl: 'https://lyra-ui.dev',
  brandTarget: '_self',

  // 색상 - Lyra 브랜드 컬러
  colorPrimary: '#6366F1', // Indigo
  colorSecondary: '#8B5CF6', // Purple

  // UI 배경
  appBg: '#F8FAFC',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E2E8F0',
  appBorderRadius: 8,

  // 폰트
  fontBase: '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
  fontCode: 'monospace',

  // 텍스트 색상
  textColor: '#0F172A',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#64748B',

  // 툴바 색상
  barTextColor: '#475569',
  barSelectedColor: '#6366F1',
  barBg: '#FFFFFF',

  // 입력 요소
  inputBg: '#FFFFFF',
  inputBorder: '#CBD5E1',
  inputTextColor: '#0F172A',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: lyraTheme,
  sidebar: {
    showRoots: true,
    renderLabel: ({ name, type }) => {
      // 사이드바 라벨 커스터마이징 (필요시)
      return name;
    },
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
