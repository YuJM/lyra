import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../button';

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

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a very long button text to test wrapping',
  },
};

export const WithEmoji: Story = {
  args: {
    children: '👋 Hello Button',
  },
};

export const Submit: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
  },
};
