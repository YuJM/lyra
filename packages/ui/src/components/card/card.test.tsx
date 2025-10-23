import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Card } from './card';

describe('Card', () => {
  describe('Card.Root', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(
        <Card.Root>
          <div>Card Content</div>
        </Card.Root>
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('variant prop을 적용한다', () => {
      const { container } = render(
        <Card.Root variant="elevated">
          Content
        </Card.Root>
      );
      const className = container.firstChild?.className || '';
      expect(className).toContain('CardRoot--elevated');
    });

    it('interactive 상태일 때 클릭 핸들러를 호출한다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card.Root interactive onClick={handleClick}>
          Click me
        </Card.Root>
      );

      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('interactive 상태일 때 키보드 접근이 가능하다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card.Root interactive onClick={handleClick}>
          Keyboard accessible
        </Card.Root>
      );

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');

      // Enter 키로 클릭
      card.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Space 키로 클릭
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('aria-label을 설정할 수 있다', () => {
      render(
        <Card.Root aria-label="Product card">
          Content
        </Card.Root>
      );
      expect(screen.getByLabelText('Product card')).toBeInTheDocument();
    });
  });

  describe('Card.Media', () => {
    it('이미지를 렌더링한다', () => {
      render(
        <Card.Media
          src="https://example.com/image.jpg"
          alt="Test image"
        />
      );
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('aspectRatio를 적용한다', () => {
      render(
        <Card.Media
          src="https://example.com/image.jpg"
          alt="Test image"
          aspectRatio="4/3"
        />
      );
      const img = screen.getByAltText('Test image');
      expect(img).toHaveStyle({ aspectRatio: '4/3' });
    });

    it('loading 전략을 설정할 수 있다', () => {
      render(
        <Card.Media
          src="https://example.com/image.jpg"
          alt="Test image"
          loading="eager"
        />
      );
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('loading', 'eager');
    });
  });

  describe('Card.Header', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(
        <Card.Header>
          <div>Header Content</div>
        </Card.Header>
      );
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });
  });

  describe('Card.Title', () => {
    it('제목을 렌더링한다', () => {
      render(<Card.Title>Card Title</Card.Title>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('semantic HTML 태그를 지정할 수 있다', () => {
      render(<Card.Title as="h2">Title</Card.Title>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('기본값은 h3이다', () => {
      render(<Card.Title>Default Title</Card.Title>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('clamp prop을 적용한다', () => {
      const { container } = render(
        <Card.Title clamp={2}>Long Title</Card.Title>
      );
      const className = container.firstChild?.className || '';
      expect(className).toContain('CardTitle--clamp-2');
    });
  });

  describe('Card.Metadata', () => {
    it('메타데이터를 렌더링한다', () => {
      render(
        <Card.Metadata>
          <span>Author</span>
          <span>5 min read</span>
        </Card.Metadata>
      );
      expect(screen.getByText('Author')).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
    });

    it('구분자를 삽입한다', () => {
      render(
        <Card.Metadata separator="|">
          <span>A</span>
          <span>B</span>
        </Card.Metadata>
      );
      expect(screen.getByText('|')).toBeInTheDocument();
    });

    it('maxLines prop을 적용한다', () => {
      const { container } = render(
        <Card.Metadata maxLines={2}>
          <span>Content</span>
        </Card.Metadata>
      );
      const className = container.firstChild?.className || '';
      expect(className).toContain('CardMetadata--max-lines-2');
    });
  });

  describe('Card.Content', () => {
    it('내용을 렌더링한다', () => {
      render(<Card.Content>Content text</Card.Content>);
      expect(screen.getByText('Content text')).toBeInTheDocument();
    });

    it('clamp prop을 적용한다', () => {
      const { container } = render(
        <Card.Content clamp={3}>Long content</Card.Content>
      );
      const className = container.firstChild?.className || '';
      expect(className).toContain('CardContent--clamp');
    });
  });

  describe('Card.Actions', () => {
    it('액션 버튼들을 렌더링한다', () => {
      render(
        <Card.Actions>
          <button>Cancel</button>
          <button>Confirm</button>
        </Card.Actions>
      );
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });

    it('정렬 prop을 적용한다', () => {
      const { container } = render(
        <Card.Actions align="between">
          <button>Action</button>
        </Card.Actions>
      );
      const className = container.firstChild?.className || '';
      expect(className).toContain('CardActions--align-between');
    });
  });

  describe('접근성', () => {
    it('interactive 카드는 키보드 포커스가 가능하다', () => {
      render(
        <Card.Root interactive onClick={() => {}}>
          Content
        </Card.Root>
      );
      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('non-interactive 카드는 role이 없다', () => {
      render(
        <Card.Root>
          Content
        </Card.Root>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('Media는 alt 텍스트를 가진다', () => {
      render(
        <Card.Media
          src="https://example.com/image.jpg"
          alt="Descriptive text"
        />
      );
      expect(screen.getByAltText('Descriptive text')).toBeInTheDocument();
    });

    it('Title은 semantic heading을 사용한다', () => {
      render(
        <Card.Root>
          <Card.Header>
            <Card.Title as="h2">Accessible Title</Card.Title>
          </Card.Header>
        </Card.Root>
      );
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('Compound Component 통합', () => {
    it('모든 하위 컴포넌트가 함께 작동한다', () => {
      render(
        <Card.Root variant="elevated">
          <Card.Media
            src="https://example.com/image.jpg"
            alt="Product"
            aspectRatio="16/9"
          />
          <Card.Header>
            <Card.Title as="h3">Product Name</Card.Title>
            <Card.Metadata separator="·">
              <span>Category</span>
              <span>5 min</span>
            </Card.Metadata>
          </Card.Header>
          <Card.Content>
            Product description here
          </Card.Content>
          <Card.Actions align="end">
            <button>Buy Now</button>
          </Card.Actions>
        </Card.Root>
      );

      // 모든 요소가 렌더링되는지 확인
      expect(screen.getByAltText('Product')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Product Name' })).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Product description here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
    });
  });
});
