import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Radio } from './radio';
import { RadioGroup } from './radio-group';

describe('RadioGroup', () => {
  describe('렌더링', () => {
    it('RadioGroup과 Radio들을 렌더링한다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );
      expect(screen.getAllByRole('radio')).toHaveLength(2);
    });

    it('defaultValue로 초기 선택 상태를 설정할 수 있다', () => {
      render(
        <RadioGroup defaultValue="b">
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option A')).not.toBeChecked();
      expect(screen.getByLabelText('Option B')).toBeChecked();
    });
  });

  describe('단일 선택', () => {
    it('한 번에 하나의 Radio만 선택할 수 있다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
          <Radio value="c" aria-label="Option C" />
        </RadioGroup>
      );

      const radioA = screen.getByLabelText('Option A');
      const radioB = screen.getByLabelText('Option B');
      const radioC = screen.getByLabelText('Option C');

      await user.click(radioA);
      expect(radioA).toBeChecked();
      expect(radioB).not.toBeChecked();
      expect(radioC).not.toBeChecked();

      await user.click(radioB);
      expect(radioA).not.toBeChecked();
      expect(radioB).toBeChecked();
      expect(radioC).not.toBeChecked();

      await user.click(radioC);
      expect(radioA).not.toBeChecked();
      expect(radioB).not.toBeChecked();
      expect(radioC).toBeChecked();
    });
  });

  describe('onValueChange', () => {
    it('값이 변경되면 onValueChange를 호출한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup onValueChange={handleChange}>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Option A'));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('a', expect.anything());

      await user.click(screen.getByLabelText('Option B'));
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenCalledWith('b', expect.anything());
    });
  });

  describe('제어 컴포넌트', () => {
    it('value prop으로 제어할 수 있다', () => {
      const { rerender } = render(
        <RadioGroup value="a">
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option A')).toBeChecked();
      expect(screen.getByLabelText('Option B')).not.toBeChecked();

      rerender(
        <RadioGroup value="b">
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option A')).not.toBeChecked();
      expect(screen.getByLabelText('Option B')).toBeChecked();
    });

    it('제어 모드에서 onValueChange와 함께 작동한다', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('a');
        return (
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="a" aria-label="Option A" />
            <Radio value="b" aria-label="Option B" />
          </RadioGroup>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      expect(screen.getByLabelText('Option A')).toBeChecked();

      await user.click(screen.getByLabelText('Option B'));
      expect(screen.getByLabelText('Option B')).toBeChecked();
      expect(screen.getByLabelText('Option A')).not.toBeChecked();
    });
  });

  describe('키보드 네비게이션', () => {
    it('방향키로 선택을 이동할 수 있다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup defaultValue="a">
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
          <Radio value="c" aria-label="Option C" />
        </RadioGroup>
      );

      const radioA = screen.getByLabelText('Option A');
      const radioB = screen.getByLabelText('Option B');
      const radioC = screen.getByLabelText('Option C');

      radioA.focus();
      expect(radioA).toBeChecked();

      // ArrowDown으로 다음 항목으로 이동
      await user.keyboard('{ArrowDown}');
      expect(radioB).toBeChecked();
      expect(radioA).not.toBeChecked();

      // ArrowDown으로 다음 항목으로 이동
      await user.keyboard('{ArrowDown}');
      expect(radioC).toBeChecked();
      expect(radioB).not.toBeChecked();

      // ArrowUp으로 이전 항목으로 이동
      await user.keyboard('{ArrowUp}');
      expect(radioB).toBeChecked();
      expect(radioC).not.toBeChecked();
    });

    it('ArrowRight/ArrowLeft로도 선택을 이동할 수 있다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup defaultValue="a">
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      const radioA = screen.getByLabelText('Option A');
      const radioB = screen.getByLabelText('Option B');

      radioA.focus();
      expect(radioA).toBeChecked();

      await user.keyboard('{ArrowRight}');
      expect(radioB).toBeChecked();
      expect(radioA).not.toBeChecked();

      await user.keyboard('{ArrowLeft}');
      expect(radioA).toBeChecked();
      expect(radioB).not.toBeChecked();
    });
  });

  describe('disabled', () => {
    it('RadioGroup이 disabled이면 모든 Radio가 비활성화된다', () => {
      render(
        <RadioGroup disabled>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option A')).toBeDisabled();
      expect(screen.getByLabelText('Option B')).toBeDisabled();
    });

    it('disabled RadioGroup에서는 클릭이 무시된다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup disabled onValueChange={handleChange}>
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Option A'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('개별 Radio를 disabled로 설정할 수 있다', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="a" disabled aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
        </RadioGroup>
      );

      const radioA = screen.getByLabelText('Option A');
      const radioB = screen.getByLabelText('Option B');

      await user.click(radioA);
      expect(radioA).not.toBeChecked();

      await user.click(radioB);
      expect(radioB).toBeChecked();
    });
  });

  describe('접근성', () => {
    it('radiogroup role을 가진다', () => {
      render(
        <RadioGroup>
          <Radio value="a" aria-label="Option A" />
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('aria-labelledby를 지원한다', () => {
      render(
        <div>
          <span id="group-label">Choose an option</span>
          <RadioGroup aria-labelledby="group-label">
            <Radio value="a" aria-label="Option A" />
          </RadioGroup>
        </div>
      );
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-labelledby', 'group-label');
    });
  });
});
