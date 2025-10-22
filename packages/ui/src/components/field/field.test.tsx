import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Field } from './field';

describe('Field', () => {
  describe('렌더링', () => {
    it('Field.Root를 렌더링한다', () => {
      const { container } = render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
        </Field.Root>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('Field.Label을 렌더링한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
        </Field.Root>
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('Field.Control을 렌더링한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control aria-label="Name input" />
        </Field.Root>
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('Field.Description을 렌더링한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
          <Field.Description>Enter your full name</Field.Description>
        </Field.Root>
      );
      expect(screen.getByText('Enter your full name')).toBeInTheDocument();
    });

    it('모든 Field 구성 요소를 함께 렌더링한다', () => {
      render(
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Control required type="email" />
          <Field.Description>We'll never share your email</Field.Description>
          <Field.Error match="valueMissing">Email is required</Field.Error>
        </Field.Root>
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });
  });

  describe('Label 연결', () => {
    it('Label이 Control과 자동으로 연결된다', () => {
      render(
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByText('Username');

      // Label을 클릭하면 input에 포커스가 간다
      expect(input).toHaveAccessibleName('Username');
    });

    it('name prop이 Control에 전달된다', () => {
      render(
        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.name).toBe('email');
    });
  });

  describe('Error 상태', () => {
    it('Field.Error 컴포넌트를 렌더링한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control required />
          <Field.Error match="valueMissing">Name is required</Field.Error>
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Input이 required 속성을 가지는지 확인
      expect(input).toBeRequired();

      // Field.Error는 조건부로 렌더링되므로 초기에는 보이지 않음
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });

    it('typeMismatch 오류를 표시한다', async () => {
      const user = userEvent.setup();
      render(
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" />
          <Field.Error match="typeMismatch">Please enter a valid email</Field.Error>
        </Field.Root>
      );

      const input = screen.getByRole('textbox');

      // 잘못된 이메일 입력
      await user.type(input, 'invalid-email');
      await user.tab();

      // Error 메시지가 표시되어야 함
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    it('여러 Error를 동시에 렌더링할 수 있다', () => {
      render(
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" required />
          <Field.Error match="valueMissing">Email is required</Field.Error>
          <Field.Error match="typeMismatch">Invalid email format</Field.Error>
        </Field.Root>
      );

      // 초기 상태에서는 error가 보이지 않음 (유효성 검사 전)
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();

      // Field.Error 컴포넌트들은 DOM에 조건부로 렌더링됨
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('required 속성을 지원한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control required />
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toBeRequired();
    });

    it('type 속성을 지원한다', () => {
      render(
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" />
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toHaveAttribute('type', 'email');
    });

    it('pattern 속성을 지원한다', () => {
      render(
        <Field.Root>
          <Field.Label>Phone</Field.Label>
          <Field.Control pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" />
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{4}-[0-9]{4}');
    });
  });

  describe('Validity', () => {
    it('Field.Validity를 렌더링한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
          <Field.Validity>
            {(validity) => (
              <div data-testid="validity-state">
                {validity.valid ? 'Valid' : 'Invalid'}
              </div>
            )}
          </Field.Validity>
        </Field.Root>
      );

      expect(screen.getByTestId('validity-state')).toBeInTheDocument();
    });
  });

  describe('상태', () => {
    it('disabled 상태를 지원한다', () => {
      render(
        <Field.Root disabled>
          <Field.Label>Name</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('placeholder를 지원한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control placeholder="Enter your name" />
        </Field.Root>
      );

      const input = screen.getByPlaceholderText('Enter your name');
      expect(input).toBeInTheDocument();
    });

    it('defaultValue를 지원한다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control defaultValue="John Doe" />
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('John Doe');
    });
  });

  describe('인터랙션', () => {
    it('입력 값을 변경할 수 있다', async () => {
      const user = userEvent.setup();
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.type(input, 'John Doe');

      expect(input.value).toBe('John Doe');
    });

    it('포커스를 받을 수 있다', async () => {
      const user = userEvent.setup();
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(input).toHaveFocus();
    });
  });

  describe('접근성', () => {
    it('Control이 textbox role을 가진다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('Description이 aria-describedby로 연결된다', () => {
      render(
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control />
          <Field.Description>Enter your full name</Field.Description>
        </Field.Root>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleDescription('Enter your full name');
    });

    it('커스텀 className을 적용할 수 있다', () => {
      render(
        <Field.Root className="custom-field">
          <Field.Label className="custom-label">Name</Field.Label>
          <Field.Control className="custom-control" />
        </Field.Root>
      );

      const root = screen.getByText('Name').closest('.custom-field');
      expect(root).toHaveClass('custom-field');
      expect(screen.getByText('Name')).toHaveClass('custom-label');
      expect(screen.getByRole('textbox')).toHaveClass('custom-control');
    });
  });
});
