import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../../components/text/text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '텍스트 내용',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
    variant: {
      control: 'select',
      options: ['primary', 'description', 'muted', 'error', 'success'],
      description: '텍스트 색상 변형',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Text 컴포넌트입니다. `<p>` 태그로 렌더링됩니다.
 */
export const Default: Story = {
  args: {
    children: 'This is a default paragraph text.',
  },
};

/**
 * Typography 계층 구조입니다.
 * H1부터 H6까지 시맨틱 제목 요소를 제공하며, 각각 사전 정의된 크기와 굵기를 가집니다.
 */
export const Hierarchy: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text.h1>Heading 1 - 36px Bold</Text.h1>
      <Text.h2>Heading 2 - 30px Bold</Text.h2>
      <Text.h3>Heading 3 - 24px Semibold</Text.h3>
      <Text.h4>Heading 4 - 20px Semibold</Text.h4>
      <Text.h5>Heading 5 - 18px Medium</Text.h5>
      <Text.h6>Heading 6 - 16px Medium</Text.h6>
      <Text>Paragraph - 16px Normal</Text>
    </div>
  ),
};

/**
 * 텍스트 정렬 옵션입니다.
 * Left, Center, Right 정렬을 지원합니다.
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </div>
  ),
};

/**
 * 색상 변형입니다.
 * 모든 색상은 WCAG 2.1 AA 기준(4.5:1 대비율)을 충족합니다.
 */
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="primary">Primary text (body color 상속)</Text>
      <Text variant="description">Description text (설명, 부가 정보)</Text>
      <Text variant="muted">Muted text (덜 중요한 정보)</Text>
      <Text variant="error">Error text (오류 메시지)</Text>
      <Text variant="success">Success text (성공 메시지)</Text>
    </div>
  ),
};

/**
 * 전체 너비 텍스트입니다.
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ padding: '16px', border: '1px dashed #ccc' }}>
      <Text fullWidth align="center">
        Full width centered text
      </Text>
    </div>
  ),
};

/**
 * 실제 사용 예제입니다.
 */
export const RealWorldExample: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', padding: '24px' }}>
      <Text.h1>OpenAI Apps SDK 준수</Text.h1>
      <Text variant="description" style={{ marginTop: '8px', marginBottom: '24px' }}>
        Lyra 디자인 시스템의 Typography 컴포넌트
      </Text>

      <Text.h2 style={{ marginTop: '32px', marginBottom: '16px' }}>
        접근성 우선 디자인
      </Text.h2>
      <Text style={{ marginBottom: '16px' }}>
        모든 텍스트 컴포넌트는 WCAG 2.1 AA 기준을 준수하며, 시맨틱 HTML 요소를 사용하여
        스크린 리더 호환성을 보장합니다.
      </Text>

      <Text.h3 style={{ marginTop: '24px', marginBottom: '12px' }}>
        주요 특징
      </Text.h3>
      <Text style={{ marginBottom: '8px' }}>
        • 시맨틱 HTML 요소 사용 (h1-h6, p)
      </Text>
      <Text style={{ marginBottom: '8px' }}>
        • 사전 정의된 Typography 토큰
      </Text>
      <Text style={{ marginBottom: '16px' }}>
        • 다크 모드 및 고대비 모드 지원
      </Text>

      <Text variant="muted" style={{ marginTop: '32px', fontSize: '14px' }}>
        Design System v1.0.0
      </Text>
    </div>
  ),
};

/**
 * 제목 정렬 예제입니다.
 */
export const HeadingAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text.h2 align="left">Left Aligned Heading</Text.h2>
      <Text.h2 align="center">Center Aligned Heading</Text.h2>
      <Text.h2 align="right">Right Aligned Heading</Text.h2>
    </div>
  ),
};

/**
 * 복합 시나리오 예제입니다.
 */
export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text.h1 align="center" variant="primary">
        Welcome to Lyra
      </Text.h1>

      <Text.h3 align="center" variant="secondary">
        Build better interfaces
      </Text.h3>

      <Text align="center" variant="muted">
        A comprehensive design system following OpenAI Apps SDK guidelines
      </Text>

      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <Text.h4 variant="error">Error State</Text.h4>
        <Text variant="error" style={{ marginTop: '8px' }}>
          Something went wrong. Please try again.
        </Text>
      </div>

      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <Text.h4 variant="success">Success State</Text.h4>
        <Text variant="success" style={{ marginTop: '8px' }}>
          Your changes have been saved successfully.
        </Text>
      </div>
    </div>
  ),
};
