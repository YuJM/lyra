import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../components/field/field';

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '전체 필드 비활성화 여부',
    },
    name: {
      control: 'text',
      description: '폼 제출 시 필드 식별자',
    },
  },
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Name</Field.Label>
      <Field.Control placeholder="Enter your name" />
      <Field.Description>Your display name visible to others</Field.Description>
    </Field.Root>
  ),
};

export const Required: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Email</Field.Label>
      <Field.Control type="email" required placeholder="email@example.com" />
      <Field.Error match="valueMissing">Email is required</Field.Error>
      <Field.Error match="typeMismatch">Please enter a valid email address</Field.Error>
      <Field.Description>We'll never share your email with anyone</Field.Description>
    </Field.Root>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Username</Field.Label>
      <Field.Control required defaultValue="" placeholder="Required" />
      <Field.Error match="valueMissing">Please enter your username</Field.Error>
      <Field.Description>Choose a unique username</Field.Description>
    </Field.Root>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Field.Root {...args} disabled>
      <Field.Label>Disabled Field</Field.Label>
      <Field.Control defaultValue="This field is disabled" />
      <Field.Description>This field cannot be edited</Field.Description>
    </Field.Root>
  ),
};

export const Password: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Password</Field.Label>
      <Field.Control
        type="password"
        required
        minLength={8}
        placeholder="Enter password"
      />
      <Field.Error match="valueMissing">Password is required</Field.Error>
      <Field.Error match="tooShort">Password must be at least 8 characters</Field.Error>
      <Field.Description>Must be at least 8 characters long</Field.Description>
    </Field.Root>
  ),
};

export const WithPattern: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Phone Number</Field.Label>
      <Field.Control
        type="tel"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        placeholder="010-1234-5678"
      />
      <Field.Error match="patternMismatch">
        Please enter a valid phone number (010-1234-5678)
      </Field.Error>
      <Field.Description>Format: 010-1234-5678</Field.Description>
    </Field.Root>
  ),
};

export const MultipleFields: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Field.Root {...args} name="firstName">
        <Field.Label>First Name</Field.Label>
        <Field.Control required placeholder="John" />
        <Field.Error match="valueMissing">First name is required</Field.Error>
      </Field.Root>

      <Field.Root {...args} name="lastName">
        <Field.Label>Last Name</Field.Label>
        <Field.Control required placeholder="Doe" />
        <Field.Error match="valueMissing">Last name is required</Field.Error>
      </Field.Root>

      <Field.Root {...args} name="email">
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" required placeholder="john.doe@example.com" />
        <Field.Error match="valueMissing">Email is required</Field.Error>
        <Field.Error match="typeMismatch">Please enter a valid email</Field.Error>
      </Field.Root>
    </div>
  ),
};

export const WithValidity: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Email</Field.Label>
      <Field.Control type="email" required placeholder="email@example.com" />
      <Field.Error match="valueMissing">Email is required</Field.Error>
      <Field.Error match="typeMismatch">Invalid email format</Field.Error>
      <Field.Validity>
        {(validity) => (
          <div style={{ fontSize: '12px', marginTop: '4px' }}>
            {validity.valid ? (
              <span style={{ color: 'green' }}>✓ Valid</span>
            ) : (
              <span style={{ color: 'red' }}>✗ Invalid</span>
            )}
          </div>
        )}
      </Field.Validity>
      <Field.Description>We'll verify your email address</Field.Description>
    </Field.Root>
  ),
};

export const NumberInput: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Age</Field.Label>
      <Field.Control
        type="number"
        required
        min={18}
        max={120}
        placeholder="18"
      />
      <Field.Error match="valueMissing">Age is required</Field.Error>
      <Field.Error match="rangeUnderflow">You must be at least 18 years old</Field.Error>
      <Field.Error match="rangeOverflow">Please enter a valid age</Field.Error>
      <Field.Description>You must be 18 or older</Field.Description>
    </Field.Root>
  ),
};

export const TextArea: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Bio</Field.Label>
      <Field.Control
        render={(props) => (
          <textarea
            {...props}
            rows={4}
            placeholder="Tell us about yourself"
            style={{
              resize: 'vertical',
              fontFamily: 'inherit',
              padding: '8px 12px',
            }}
          />
        )}
        maxLength={500}
      />
      <Field.Description>Maximum 500 characters</Field.Description>
    </Field.Root>
  ),
};
