import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('기본 type이 "button"이다', () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('커스텀 className을 적용할 수 있다', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('primary variant를 적용한다', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--primary');
    });

    it('secondary variant를 적용한다', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--secondary');
    });

    it('ghost variant를 적용한다', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--ghost');
    });

    it('text variant를 적용한다', () => {
      const { container } = render(<Button variant="text">Text</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--text');
    });

    it('기본 variant는 primary이다', () => {
      const { container } = render(<Button>Default</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--primary');
    });
  });

  describe('Sizes', () => {
    it('small 크기를 적용한다', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--sm');
    });

    it('medium 크기를 적용한다', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--md');
    });

    it('large 크기를 적용한다', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--lg');
    });

    it('기본 size는 md이다', () => {
      const { container } = render(<Button>Default Size</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--md');
    });
  });

  describe('Loading 상태', () => {
    it('loading 상태를 적용한다', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--loading');
    });

    it('loading 상태일 때 aria-busy를 true로 설정한다', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('loading 상태일 때 disabled된다', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('loading 상태일 때 spinner를 렌더링한다', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const spinner = container.querySelector('[class*="ButtonSpinner"]');
      expect(spinner).toBeInTheDocument();
    });

    it('loading 상태일 때 아이콘을 숨긴다', () => {
      render(
        <Button loading iconLeft={<span>Icon</span>}>
          Loading
        </Button>
      );
      expect(screen.queryByText('Icon')).not.toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('왼쪽 아이콘을 렌더링한다', () => {
      render(
        <Button iconLeft={<span data-testid="left-icon">←</span>}>
          With Left Icon
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('오른쪽 아이콘을 렌더링한다', () => {
      render(
        <Button iconRight={<span data-testid="right-icon">→</span>}>
          With Right Icon
        </Button>
      );
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('양쪽 아이콘을 모두 렌더링한다', () => {
      render(
        <Button
          iconLeft={<span data-testid="left-icon">←</span>}
          iconRight={<span data-testid="right-icon">→</span>}
        >
          With Both Icons
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('fullWidth를 적용한다', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--fullWidth');
    });
  });

  describe('이벤트 처리', () => {
    it('onClick 핸들러를 호출한다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태일 때 onClick을 호출하지 않는다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick} disabled>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('loading 상태일 때 onClick을 호출하지 않는다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick} loading>Loading</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Props 전달', () => {
    it('모든 HTML button 속성을 전달할 수 있다', () => {
      render(
        <Button
          type="submit"
          disabled
          aria-label="Submit form"
          data-testid="submit-button"
        >
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Submit form');
      expect(button).toHaveAttribute('data-testid', 'submit-button');
    });

    it('ref를 정상적으로 전달한다', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('접근성', () => {
    it('버튼 role을 가진다', () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('disabled 상태를 올바르게 전달한다', () => {
      render(<Button disabled>Disabled Button</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('loading 상태일 때 aria-busy를 설정한다', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('아이콘에 aria-hidden을 설정한다', () => {
      const { container } = render(
        <Button iconLeft={<span>Icon</span>}>Button</Button>
      );
      const iconWrapper = container.querySelector('[class*="ButtonIconLeft"]');
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('복합 시나리오', () => {
    it('모든 props를 함께 사용할 수 있다', () => {
      const { container } = render(
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          iconLeft={<span>←</span>}
          iconRight={<span>→</span>}
        >
          Complex Button
        </Button>
      );

      const className = container.firstChild?.className || '';
      expect(className).toContain('Button--secondary');
      expect(className).toContain('Button--lg');
      expect(className).toContain('Button--fullWidth');
    });
  });
});
