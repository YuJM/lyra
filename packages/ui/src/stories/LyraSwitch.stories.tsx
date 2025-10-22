import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { Switch } from '../components/switch/switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 여부',
    },
    defaultChecked: {
      control: 'boolean',
      description: '초기 체크 상태 (비제어 모드)',
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Switch {...args} id="switch-with-label" />
      <label htmlFor="switch-with-label" style={{ cursor: 'pointer' }}>
        다크 모드 활성화
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            id="controlled-switch"
          />
          <label htmlFor="controlled-switch" style={{ cursor: 'pointer' }}>
            알림 수신 동의
          </label>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          현재 상태: {checked ? '활성화' : '비활성화'}
        </p>
      </div>
    );
  },
};

export const MultipleStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch id="unchecked" />
        <label htmlFor="unchecked">비활성 상태</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch defaultChecked id="checked" />
        <label htmlFor="checked">활성 상태</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch disabled id="disabled" />
        <label htmlFor="disabled">비활성화 상태</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch disabled defaultChecked id="disabled-checked" />
        <label htmlFor="disabled-checked">비활성화 + 활성 상태</label>
      </div>
    </div>
  ),
};
