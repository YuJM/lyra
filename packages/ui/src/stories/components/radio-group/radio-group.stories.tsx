import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { Radio } from '../../../components/radio/radio';
import { RadioGroup } from '../../../components/radio/radio-group';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '전체 라디오 그룹 비활성화 여부',
    },
    defaultValue: {
      control: 'text',
      description: '초기 선택 값 (비제어 모드)',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="a" />
          <span>Option A</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="b" />
          <span>Option B</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="c" />
          <span>Option C</span>
        </label>
      </div>
    </RadioGroup>
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="b">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="a" />
          <span>Option A</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="b" />
          <span>Option B (기본 선택)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="c" />
          <span>Option C</span>
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled defaultValue="a">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'not-allowed' }}>
          <Radio value="a" />
          <span>Option A (선택됨)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'not-allowed' }}>
          <Radio value="b" />
          <span>Option B</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'not-allowed' }}>
          <Radio value="c" />
          <span>Option C</span>
        </label>
      </div>
    </RadioGroup>
  ),
};

export const DisabledOptions: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="a" />
          <span>Option A (활성)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'not-allowed', opacity: 0.5 }}>
          <Radio value="b" disabled />
          <span>Option B (비활성)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="c" />
          <span>Option C (활성)</span>
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('a');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup value={value} onValueChange={setValue}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Radio value="a" />
              <span>작은 사이즈 (Small)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Radio value="b" />
              <span>중간 사이즈 (Medium)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Radio value="c" />
              <span>큰 사이즈 (Large)</span>
            </label>
          </div>
        </RadioGroup>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          선택된 값: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="medium">
      <div style={{ display: 'flex', gap: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="small" />
          <span>S</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="medium" />
          <span>M</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="large" />
          <span>L</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Radio value="xlarge" />
          <span>XL</span>
        </label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="starter">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Radio value="starter" />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Starter</div>
            <div style={{ fontSize: '14px', color: '#666' }}>무료 플랜으로 시작하세요</div>
          </div>
        </label>
        <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Radio value="pro" />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Pro</div>
            <div style={{ fontSize: '14px', color: '#666' }}>월 $29 - 모든 기능 포함</div>
          </div>
        </label>
        <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <Radio value="enterprise" />
          <div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Enterprise</div>
            <div style={{ fontSize: '14px', color: '#666' }}>맞춤형 솔루션</div>
          </div>
        </label>
      </div>
    </RadioGroup>
  ),
};
