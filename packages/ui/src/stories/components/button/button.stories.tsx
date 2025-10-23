import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../../../components/button/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부 콘텐츠',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'text'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Primary 버튼입니다.
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * 버튼 변형들입니다.
 * Primary, Secondary, Ghost, Text 스타일을 제공합니다.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

/**
 * 버튼 크기들입니다.
 * Small, Medium, Large 크기를 제공합니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * 로딩 상태의 버튼입니다.
 * 스피너 애니메이션이 표시되고 클릭이 비활성화됩니다.
 */
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" loading>
        Loading
      </Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button variant="ghost" loading>
        Loading
      </Button>
    </div>
  ),
};

/**
 * 아이콘이 포함된 버튼입니다.
 * 왼쪽, 오른쪽 또는 양쪽에 아이콘을 배치할 수 있습니다.
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button
          iconLeft={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2L3 7h3v5h4V7h3L8 2z" />
            </svg>
          }
        >
          Upload
        </Button>
        <Button
          iconRight={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12 8l-4 4V9H4V7h4V4l4 4z" />
            </svg>
          }
        >
          Next
        </Button>
        <Button
          iconLeft={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 12a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          }
          iconRight={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 4l4 4-4 4V4z" />
            </svg>
          }
        >
          Both Icons
        </Button>
      </div>
    </div>
  ),
};

/**
 * 비활성화된 버튼입니다.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="ghost" disabled>
        Disabled
      </Button>
      <Button variant="text" disabled>
        Disabled
      </Button>
    </div>
  ),
};

/**
 * 전체 너비 버튼입니다.
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};

/**
 * 다양한 조합 예제입니다.
 */
export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Button
        variant="primary"
        size="lg"
        iconLeft={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3L4 9h4v6h4V9h4l-6-6z" />
          </svg>
        }
        fullWidth
      >
        Large Primary with Icon
      </Button>

      <Button
        variant="secondary"
        size="sm"
        iconRight={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M10 7l-3 3V8H4V6h3V3l3 4z" />
          </svg>
        }
      >
        Small Secondary
      </Button>

      <Button variant="ghost" loading fullWidth>
        Ghost Loading Full Width
      </Button>

      <Button
        variant="text"
        size="sm"
        iconLeft={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M7 10a3 3 0 100-6 3 3 0 000 6zm0-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
          </svg>
        }
      >
        Text with Icon
      </Button>
    </div>
  ),
};

/**
 * 폼 제출 버튼 예제입니다.
 */
export const Submit: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
    variant: 'primary',
  },
};
