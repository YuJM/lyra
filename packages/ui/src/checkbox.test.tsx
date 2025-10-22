import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  describe('렌더링', () => {
    it('체크박스를 렌더링한다', () => {
      render(<Checkbox aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('기본 상태는 unchecked이다', () => {
      render(<Checkbox aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('defaultChecked prop으로 초기 checked 상태를 설정할 수 있다', () => {
      render(<Checkbox defaultChecked aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('커스텀 className을 적용할 수 있다', () => {
      render(<Checkbox className="custom-class" aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
    });
  });

  describe('상호작용', () => {
    it('클릭하면 checked 상태가 토글된다', async () => {
      const user = userEvent.setup();
      render(<Checkbox aria-label="Test checkbox" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('onCheckedChange 핸들러를 호출한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox onCheckedChange={handleChange} aria-label="Test checkbox" />);

      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
    });

    it('disabled 상태일 때 클릭을 무시한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox disabled onCheckedChange={handleChange} aria-label="Test checkbox" />);

      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('readOnly 상태일 때 클릭을 무시한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Checkbox
          readOnly
          defaultChecked
          onCheckedChange={handleChange}
          aria-label="Test checkbox"
        />
      );

      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Indeterminate 상태', () => {
    it('indeterminate prop을 지원한다', () => {
      render(<Checkbox indeterminate aria-label="Test checkbox" />);
      const checkbox = screen.getByRole('checkbox');

      // Base UI의 indeterminate 상태는 data 속성으로 표현됨
      expect(checkbox).toHaveAttribute('data-indeterminate', '');
    });

    it('indeterminate 상태에서 아이콘이 변경된다', () => {
      const { container } = render(<Checkbox indeterminate aria-label="Test checkbox" />);

      // HorizontalRuleIcon이 렌더링되는지 확인 (line 요소)
      const line = container.querySelector('line');
      expect(line).toBeInTheDocument();
    });

    it('checked 상태에서 CheckIcon이 렌더링된다', () => {
      const { container } = render(<Checkbox defaultChecked aria-label="Test checkbox" />);

      // CheckIcon이 렌더링되는지 확인 (path 요소)
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
    });
  });

  describe('제어 컴포넌트', () => {
    it('checked prop으로 제어할 수 있다', () => {
      const { rerender } = render(<Checkbox checked={false} aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();

      rerender(<Checkbox checked={true} aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('제어 모드에서 onCheckedChange와 함께 작동한다', async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            aria-label="Test checkbox"
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  describe('접근성', () => {
    it('checkbox role을 가진다', () => {
      render(<Checkbox aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('disabled 상태를 올바르게 전달한다', () => {
      render(<Checkbox disabled aria-label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('aria-label을 지원한다', () => {
      render(<Checkbox aria-label="Accept terms" />);
      expect(screen.getByRole('checkbox')).toHaveAccessibleName('Accept terms');
    });
  });
});
