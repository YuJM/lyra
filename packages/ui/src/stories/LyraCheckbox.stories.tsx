import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { Checkbox } from '../components/checkbox/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: 'boolean',
      description: '불확정 상태 (일부 선택)',
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

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

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
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
      <Checkbox {...args} id="checkbox-with-label" />
      <label htmlFor="checkbox-with-label" style={{ cursor: 'pointer' }}>
        이용약관에 동의합니다
      </label>
    </div>
  ),
};

export const MultipleStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked">미선택 상태</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox defaultChecked id="checked" />
        <label htmlFor="checked">선택 상태</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="indeterminate" indeterminate />
        <label htmlFor="indeterminate">불확정 상태</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox disabled id="disabled" />
        <label htmlFor="disabled">비활성화 상태</label>
      </div>
    </div>
  ),
};
