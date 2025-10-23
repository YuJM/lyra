import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './text';

describe('Text', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(<Text>Test content</Text>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('기본적으로 p 태그로 렌더링된다', () => {
      const { container } = render(<Text>Paragraph</Text>);
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('커스텀 className을 적용할 수 있다', () => {
      const { container } = render(<Text className="custom-class">Text</Text>);
      const element = container.querySelector('p');
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Heading Variants', () => {
    it('h1 태그를 렌더링한다', () => {
      render(<Text.h1>Heading 1</Text.h1>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading 1');
    });

    it('h2 태그를 렌더링한다', () => {
      render(<Text.h2>Heading 2</Text.h2>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('h3 태그를 렌더링한다', () => {
      render(<Text.h3>Heading 3</Text.h3>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('h4 태그를 렌더링한다', () => {
      render(<Text.h4>Heading 4</Text.h4>);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it('h5 태그를 렌더링한다', () => {
      render(<Text.h5>Heading 5</Text.h5>);
      expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
    });

    it('h6 태그를 렌더링한다', () => {
      render(<Text.h6>Heading 6</Text.h6>);
      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });

    it('h1에 올바른 스타일 클래스를 적용한다', () => {
      const { container } = render(<Text.h1>Heading</Text.h1>);
      const element = container.querySelector('h1');
      const className = element?.className || '';
      expect(className).toContain('Text--h1');
    });

    it('h2에 올바른 스타일 클래스를 적용한다', () => {
      const { container } = render(<Text.h2>Heading</Text.h2>);
      const element = container.querySelector('h2');
      const className = element?.className || '';
      expect(className).toContain('Text--h2');
    });
  });

  describe('Alignment', () => {
    it('left 정렬을 적용한다', () => {
      const { container } = render(<Text align="left">Left</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--left');
    });

    it('center 정렬을 적용한다', () => {
      const { container } = render(<Text align="center">Center</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--center');
    });

    it('right 정렬을 적용한다', () => {
      const { container } = render(<Text align="right">Right</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--right');
    });

    it('기본 정렬은 left이다', () => {
      const { container } = render(<Text>Default</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--left');
    });

    it('제목에도 정렬을 적용할 수 있다', () => {
      const { container } = render(<Text.h1 align="center">Centered Heading</Text.h1>);
      const className = container.querySelector('h1')?.className || '';
      expect(className).toContain('Text--center');
    });
  });

  describe('Color Variants', () => {
    it('primary variant를 적용한다', () => {
      const { container } = render(<Text variant="primary">Primary</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--primary');
    });

    it('description variant를 적용한다', () => {
      const { container } = render(<Text variant="description">Description</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--description');
    });

    it('muted variant를 적용한다', () => {
      const { container } = render(<Text variant="muted">Muted</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--muted');
    });

    it('error variant를 적용한다', () => {
      const { container } = render(<Text variant="error">Error</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--error');
    });

    it('success variant를 적용한다', () => {
      const { container } = render(<Text variant="success">Success</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--success');
    });

    it('기본 variant는 primary이다', () => {
      const { container } = render(<Text>Default</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--primary');
    });

    it('제목에도 색상 variant를 적용할 수 있다', () => {
      const { container } = render(<Text.h2 variant="description">Description Heading</Text.h2>);
      const className = container.querySelector('h2')?.className || '';
      expect(className).toContain('Text--description');
    });
  });

  describe('Full Width', () => {
    it('fullWidth를 적용한다', () => {
      const { container } = render(<Text fullWidth>Full Width</Text>);
      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--fullWidth');
    });
  });

  describe('Props 전달', () => {
    it('모든 HTML 속성을 전달할 수 있다', () => {
      render(
        <Text
          id="test-id"
          aria-label="Test label"
          data-testid="test-text"
        >
          Test
        </Text>
      );

      const element = screen.getByText('Test');
      expect(element).toHaveAttribute('id', 'test-id');
      expect(element).toHaveAttribute('aria-label', 'Test label');
      expect(element).toHaveAttribute('data-testid', 'test-text');
    });

    it('제목에 HTML 속성을 전달할 수 있다', () => {
      render(
        <Text.h1
          id="heading-id"
          aria-label="Heading label"
          data-testid="test-heading"
        >
          Heading
        </Text.h1>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveAttribute('id', 'heading-id');
      expect(heading).toHaveAttribute('aria-label', 'Heading label');
      expect(heading).toHaveAttribute('data-testid', 'test-heading');
    });

    it('ref를 정상적으로 전달한다 (p 태그)', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Text ref={ref}>Text</Text>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('ref를 정상적으로 전달한다 (h1 태그)', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Text.h1 ref={ref}>Heading</Text.h1>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('접근성', () => {
    it('제목 요소가 올바른 role을 가진다', () => {
      render(<Text.h1>Heading</Text.h1>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('시맨틱 HTML 요소를 사용한다', () => {
      const { container } = render(
        <>
          <Text.h1>H1</Text.h1>
          <Text.h2>H2</Text.h2>
          <Text>Paragraph</Text>
        </>
      );

      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('복합 시나리오', () => {
    it('모든 props를 함께 사용할 수 있다', () => {
      const { container } = render(
        <Text
          align="center"
          variant="description"
          fullWidth
          className="custom-class"
        >
          Complex Text
        </Text>
      );

      const className = container.querySelector('p')?.className || '';
      expect(className).toContain('Text--center');
      expect(className).toContain('Text--description');
      expect(className).toContain('Text--fullWidth');
      expect(className).toContain('custom-class');
    });

    it('제목에 모든 props를 함께 사용할 수 있다', () => {
      const { container } = render(
        <Text.h2
          align="right"
          variant="error"
          className="custom-heading"
        >
          Complex Heading
        </Text.h2>
      );

      const className = container.querySelector('h2')?.className || '';
      expect(className).toContain('Text--h2');
      expect(className).toContain('Text--right');
      expect(className).toContain('Text--error');
      expect(className).toContain('custom-heading');
    });
  });

  describe('Typography 계층', () => {
    it('모든 제목 레벨이 고유한 스타일을 가진다', () => {
      const { container } = render(
        <>
          <Text.h1>H1</Text.h1>
          <Text.h2>H2</Text.h2>
          <Text.h3>H3</Text.h3>
          <Text.h4>H4</Text.h4>
          <Text.h5>H5</Text.h5>
          <Text.h6>H6</Text.h6>
        </>
      );

      expect(container.querySelector('h1')?.className).toContain('Text--h1');
      expect(container.querySelector('h2')?.className).toContain('Text--h2');
      expect(container.querySelector('h3')?.className).toContain('Text--h3');
      expect(container.querySelector('h4')?.className).toContain('Text--h4');
      expect(container.querySelector('h5')?.className).toContain('Text--h5');
      expect(container.querySelector('h6')?.className).toContain('Text--h6');
    });
  });
});
