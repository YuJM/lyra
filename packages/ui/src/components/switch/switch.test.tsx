import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Switch } from './switch';

describe('Switch', () => {
  describe('렌더링', () => {
    it('Switch를 렌더링한다', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('기본 상태는 unchecked이다', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('defaultChecked prop으로 초기 checked 상태를 설정할 수 있다', () => {
      render(<Switch defaultChecked aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('커스텀 className을 적용할 수 있다', () => {
      render(<Switch className="custom-switch" aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveClass('custom-switch');
    });
  });

  describe('상호작용', () => {
    it('클릭하면 checked 상태가 토글된다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Test switch" />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('onCheckedChange 핸들러를 호출한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Switch onCheckedChange={handleChange} aria-label="Test switch" />);

      await user.click(screen.getByRole('switch'));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
    });

    it('disabled 상태일 때 클릭을 무시한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Switch disabled onCheckedChange={handleChange} aria-label="Test switch" />);

      await user.click(screen.getByRole('switch'));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('readOnly 상태일 때 클릭을 무시한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Switch
          readOnly
          defaultChecked
          onCheckedChange={handleChange}
          aria-label="Test switch"
        />
      );

      await user.click(screen.getByRole('switch'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('제어 컴포넌트', () => {
    it('checked prop으로 제어할 수 있다', () => {
      const { rerender } = render(<Switch checked={false} aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch checked={true} aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('제어 모드에서 onCheckedChange와 함께 작동한다', async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            aria-label="Test switch"
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('키보드 네비게이션', () => {
    it('Space 키로 토글할 수 있다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Test switch" />);

      const switchElement = screen.getByRole('switch');
      switchElement.focus();

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('Enter 키로 토글할 수 있다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Test switch" />);

      const switchElement = screen.getByRole('switch');
      switchElement.focus();

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.keyboard('{Enter}');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('접근성', () => {
    it('switch role을 가진다', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('disabled 상태를 올바르게 전달한다', () => {
      render(<Switch disabled aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('aria-label을 지원한다', () => {
      render(<Switch aria-label="Enable notifications" />);
      expect(screen.getByRole('switch')).toHaveAccessibleName('Enable notifications');
    });

    it('data-checked 속성을 가진다', () => {
      render(<Switch defaultChecked aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('data-checked', '');
    });

    it('data-unchecked 속성을 가진다', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('data-unchecked', '');
    });
  });
});
