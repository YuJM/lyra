import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Radio } from './radio';
import { RadioGroup } from './radio-group';

describe('Radio', () => {
  describe('렌더링', () => {
    it('Radio를 렌더링한다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('기본 상태는 unchecked이다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('커스텀 className을 적용할 수 있다', () => {
      render(
        <RadioGroup>
          <Radio value="a" className="custom-radio" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toHaveClass('custom-radio');
    });
  });

  describe('상호작용', () => {
    it('클릭하면 checked 상태가 된다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      const radioA = screen.getByLabelText('Option A');
      expect(radioA).not.toBeChecked();

      await user.click(radioA);
      expect(radioA).toBeChecked();
    });

    it('다른 Radio를 클릭하면 이전 선택이 해제된다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      const radioA = screen.getByLabelText('Option A');
      const radioB = screen.getByLabelText('Option B');

      await user.click(radioA);
      expect(radioA).toBeChecked();
      expect(radioB).not.toBeChecked();

      await user.click(radioB);
      expect(radioA).not.toBeChecked();
      expect(radioB).toBeChecked();
    });

    it('disabled 상태일 때 클릭을 무시한다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="a" disabled aria-label="Option A" />
        </RadioGroup>
      );

      const radio = screen.getByRole('radio');
      await user.click(radio);

      expect(radio).not.toBeChecked();
    });
  });

  describe('접근성', () => {
    it('radio role을 가진다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('disabled 상태를 올바르게 전달한다', () => {
      render(
        <RadioGroup>
          <Radio value="a" disabled aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('aria-label을 지원한다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Accept terms" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toHaveAccessibleName('Accept terms');
    });

    it('data-checked 속성을 가진다', () => {
      render(
        <RadioGroup defaultValue="a">
          <Radio value="a" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toHaveAttribute('data-checked', '');
    });

    it('data-unchecked 속성을 가진다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toHaveAttribute('data-unchecked', '');
    });
  });
});
