# Card 컴포넌트 API 설계 명세

> 생성일: 2025-10-23
> 버전: 1.0.0
> 상태: Design Specification
> OpenAI 가이드라인 준수: ✅

---

## 📋 Overview

Card 컴포넌트는 **OpenAI Apps SDK Inline 모드 가이드라인**을 준수하여 설계된 컴포넌트입니다.

### 핵심 원칙

1. **Inline 모드 우선**: 깊은 네비게이션 방지
2. **단순성**: 최대 2개 주요 액션
3. **접근성**: WCAG 2.1 AA 준수
4. **유연성**: Compound Component 패턴

---

## 🎨 디자인 가이드라인 준수

### OpenAI Apps SDK 요구사항

| 요구사항 | 준수 여부 | 구현 방법 |
|---------|----------|----------|
| Inline 모드 지원 | ✅ | 깊은 네비게이션 없음 |
| 최대 2개 주요 액션 | ✅ | `Actions` 컴포넌트 제약 |
| 명확한 계층 구조 | ✅ | Header/Content 분리 |
| 메타데이터 최대 3줄 | ✅ | `Metadata` 컴포넌트 제약 |
| 동적 높이 조정 | ✅ | Auto height, no fixed |
| 중첩 스크롤 금지 | ✅ | 단일 스크롤 영역 |

---

## 🏗️ 컴포넌트 구조

### Compound Component API

```typescript
export const Card = {
  Root: CardRoot,
  Media: CardMedia,
  Header: CardHeader,
  Title: CardTitle,
  Metadata: CardMetadata,
  Content: CardContent,
  Actions: CardActions,
};
```

### 계층 구조

```
Card.Root
├── Card.Media (선택)
├── Card.Header
│   ├── Card.Title
│   └── Card.Metadata (선택)
├── Card.Content
└── Card.Actions (선택)
```

---

## 📐 컴포넌트 상세 명세

### 1. Card.Root

**컨테이너 컴포넌트**

#### Props

```typescript
interface CardRootProps {
  /** 카드 변형 */
  variant?: 'default' | 'elevated' | 'outlined';

  /** 인터랙티브 카드 여부 (hover/focus 스타일) */
  interactive?: boolean;

  /** 클릭 핸들러 (interactive=true일 때만) */
  onClick?: () => void;

  /** 키보드 접근성 */
  onKeyDown?: (e: React.KeyboardEvent) => void;

  /** ARIA 레이블 */
  'aria-label'?: string;

  /** 커스텀 className */
  className?: string;

  /** 자식 컴포넌트 */
  children: React.ReactNode;
}
```

#### 스타일

```css
/* Variant: default */
.card-root--default {
  background: var(--color-bg-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

/* Variant: elevated */
.card-root--elevated {
  background: var(--color-bg-surface-elevated);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
}

/* Variant: outlined */
.card-root--outlined {
  background: transparent;
  border: 2px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

/* Interactive */
.card-root--interactive {
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-ease-in-out);
}

.card-root--interactive:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover);
}

.card-root--interactive:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

### 2. Card.Media

**이미지/비디오 미디어 컴포넌트**

#### Props

```typescript
interface CardMediaProps {
  /** 미디어 소스 URL */
  src: string;

  /** 미디어 타입 */
  type?: 'image' | 'video';

  /** Alt 텍스트 (이미지) */
  alt?: string;

  /** 종횡비 (aspect ratio) */
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';

  /** 로딩 전략 */
  loading?: 'lazy' | 'eager';

  /** 에러 시 fallback */
  fallback?: React.ReactNode;

  /** 커스텀 className */
  className?: string;
}
```

#### 스타일

```css
.card-media {
  width: 100%;
  aspect-ratio: var(--aspect-ratio, 16 / 9);
  object-fit: cover;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.card-media--video {
  background: var(--color-bg-surface-secondary);
}
```

---

### 3. Card.Header

**헤더 그룹 컴포넌트**

#### Props

```typescript
interface CardHeaderProps {
  /** 자식 컴포넌트 (Title + Metadata) */
  children: React.ReactNode;

  /** 커스텀 className */
  className?: string;
}
```

#### 스타일

```css
.card-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
}
```

---

### 4. Card.Title

**제목 컴포넌트**

#### Props

```typescript
interface CardTitleProps {
  /** 제목 레벨 (semantic HTML) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** 제목 텍스트 */
  children: React.ReactNode;

  /** 말줄임 (line clamp) */
  clamp?: number;

  /** 커스텀 className */
  className?: string;
}
```

#### 스타일

```css
.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin: 0;
}

.card-title--clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.card-title--clamp-2 {
  -webkit-line-clamp: 2;
}
```

---

### 5. Card.Metadata

**메타데이터 컴포넌트**

#### Props

```typescript
interface CardMetadataProps {
  /** 메타데이터 항목들 */
  children: React.ReactNode;

  /** 최대 줄 수 (OpenAI 권장: 3줄) */
  maxLines?: 1 | 2 | 3;

  /** 구분자 */
  separator?: '·' | '|' | '•';

  /** 커스텀 className */
  className?: string;
}
```

#### 스타일

```css
.card-metadata {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  align-items: center;
}

.card-metadata--max-lines-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

---

### 6. Card.Content

**본문 컴포넌트**

#### Props

```typescript
interface CardContentProps {
  /** 본문 내용 */
  children: React.ReactNode;

  /** 말줄임 (line clamp) */
  clamp?: number;

  /** 커스텀 className */
  className?: string;
}
```

#### 스타일

```css
.card-content {
  padding: var(--spacing-md);
  padding-top: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
}

.card-content--clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--clamp);
  overflow: hidden;
}
```

---

### 7. Card.Actions

**액션 버튼 그룹 컴포넌트**

#### Props

```typescript
interface CardActionsProps {
  /** 자식 컴포넌트 (Button 등) */
  children: React.ReactNode;

  /** 정렬 */
  align?: 'start' | 'end' | 'center' | 'between';

  /** 최대 액션 수 (OpenAI 권장: 2개) */
  maxActions?: 1 | 2;

  /** 커스텀 className */
  className?: string;
}
```

#### 스타일

```css
.card-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  padding-top: 0;
  border-top: 1px solid var(--color-border-default);
}

.card-actions--align-start {
  justify-content: flex-start;
}

.card-actions--align-end {
  justify-content: flex-end;
}

.card-actions--align-between {
  justify-content: space-between;
}
```

---

## 💻 사용 예제

### 기본 사용

```tsx
import { Card, Button } from '@lyra/ui';

function BasicCard() {
  return (
    <Card.Root>
      <Card.Media
        src="/image.jpg"
        alt="Card image"
        aspectRatio="16/9"
      />
      <Card.Header>
        <Card.Title as="h3">Card Title</Card.Title>
        <Card.Metadata separator="·">
          <span>Author</span>
          <span>3 min read</span>
        </Card.Metadata>
      </Card.Header>
      <Card.Content>
        This is the card content. It can contain any React components.
      </Card.Content>
      <Card.Actions align="end">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Action</Button>
      </Card.Actions>
    </Card.Root>
  );
}
```

### Interactive Card

```tsx
function InteractiveCard() {
  const handleClick = () => {
    console.log('Card clicked');
  };

  return (
    <Card.Root
      interactive
      onClick={handleClick}
      aria-label="View article details"
    >
      <Card.Header>
        <Card.Title clamp={2}>
          Long Article Title That May Span Multiple Lines
        </Card.Title>
      </Card.Header>
      <Card.Content clamp={3}>
        Long content that will be clamped to 3 lines...
      </Card.Content>
    </Card.Root>
  );
}
```

### Product Card

```tsx
function ProductCard() {
  return (
    <Card.Root variant="elevated">
      <Card.Media
        src="/product.jpg"
        alt="Product name"
        aspectRatio="1/1"
        loading="lazy"
      />
      <Card.Header>
        <Card.Title as="h4">Product Name</Card.Title>
        <Card.Metadata maxLines={1}>
          <span>★ 4.8 (123 reviews)</span>
        </Card.Metadata>
      </Card.Header>
      <Card.Content>
        <div className="price">$99.99</div>
        <p>Short product description</p>
      </Card.Content>
      <Card.Actions>
        <Button variant="primary" fullWidth>
          Add to Cart
        </Button>
      </Card.Actions>
    </Card.Root>
  );
}
```

### News Card

```tsx
function NewsCard() {
  return (
    <Card.Root variant="outlined">
      <Card.Header>
        <Card.Title as="h3" clamp={2}>
          Breaking News: Important Announcement
        </Card.Title>
        <Card.Metadata separator="•" maxLines={1}>
          <span>Tech</span>
          <time>2 hours ago</time>
          <span>By John Doe</span>
        </Card.Metadata>
      </Card.Header>
      <Card.Content clamp={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </Card.Content>
      <Card.Actions align="start">
        <Button variant="ghost" size="sm">
          Read More
        </Button>
      </Card.Actions>
    </Card.Root>
  );
}
```

---

## ♿ 접근성

### 키보드 네비게이션

```typescript
function AccessibleCard() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAction();
    }
  };

  return (
    <Card.Root
      interactive
      tabIndex={0}
      role="button"
      aria-label="View details"
      onKeyDown={handleKeyDown}
    >
      {/* ... */}
    </Card.Root>
  );
}
```

### ARIA 속성

```tsx
<Card.Root aria-labelledby="card-title-1">
  <Card.Header>
    <Card.Title id="card-title-1" as="h3">
      Accessible Card
    </Card.Title>
  </Card.Header>
  <Card.Content aria-describedby="card-content-1">
    <p id="card-content-1">Content description</p>
  </Card.Content>
</Card.Root>
```

---

## 🎨 스타일 커스터마이징

### CSS 변수

```css
.custom-card {
  --card-padding: var(--spacing-lg);
  --card-border-radius: var(--radius-xl);
  --card-shadow: var(--shadow-xl);
}
```

### Tailwind Integration

```tsx
<Card.Root className="hover:scale-105 transition-transform">
  {/* ... */}
</Card.Root>
```

---

## 🚫 안티패턴

### ❌ 나쁜 예

```tsx
// 너무 많은 액션 (OpenAI 권장 위반)
<Card.Actions>
  <Button>Edit</Button>
  <Button>Share</Button>
  <Button>Delete</Button>
  <Button>Archive</Button>
</Card.Actions>

// 깊은 네비게이션
<Card.Root onClick={() => navigate('/details')}>
  <Card.Actions>
    <Button onClick={() => navigate('/edit')}>Edit</Button>
  </Card.Actions>
</Card.Root>

// 중첩 스크롤
<Card.Content style={{ height: '200px', overflow: 'auto' }}>
  {/* 스크롤 영역 */}
</Card.Content>
```

### ✅ 좋은 예

```tsx
// 최대 2개 주요 액션
<Card.Actions>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</Card.Actions>

// Inline 모드: 카드 자체가 액션
<Card.Root interactive onClick={handleView}>
  {/* 추가 액션 없음 */}
</Card.Root>

// 동적 높이 조정
<Card.Content clamp={3}>
  {/* 자동으로 3줄로 제한 */}
</Card.Content>
```

---

## 📊 성능 고려사항

### 이미지 최적화

```tsx
<Card.Media
  src="/image.jpg"
  loading="lazy"
  aspectRatio="16/9"
/>
```

### 가상화 (많은 카드)

```tsx
import { VirtualList } from '@lyra/ui';

function CardList({ items }) {
  return (
    <VirtualList
      items={items}
      renderItem={(item) => <ProductCard {...item} />}
      itemHeight={300}
    />
  );
}
```

---

## 🧪 테스트

### 단위 테스트

```tsx
import { render, screen } from '@testing-library/react';
import { Card } from '@lyra/ui';

describe('Card', () => {
  it('renders title and content', () => {
    render(
      <Card.Root>
        <Card.Header>
          <Card.Title>Test Title</Card.Title>
        </Card.Header>
        <Card.Content>Test Content</Card.Content>
      </Card.Root>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles interactive click', () => {
    const handleClick = jest.fn();
    render(
      <Card.Root interactive onClick={handleClick}>
        <Card.Content>Click me</Card.Content>
      </Card.Root>
    );

    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## 📦 Export

```typescript
// packages/ui/src/components/card/index.ts
export { Card } from './card';
export type {
  CardRootProps,
  CardMediaProps,
  CardHeaderProps,
  CardTitleProps,
  CardMetadataProps,
  CardContentProps,
  CardActionsProps,
} from './card.types';
```

---

## 🗺️ 구현 로드맵

### Phase 1: 기본 구조 (Week 1)
- [ ] Card.Root 구현
- [ ] Card.Header 구현
- [ ] Card.Title 구현
- [ ] Card.Content 구현

### Phase 2: 미디어 & 메타데이터 (Week 1)
- [ ] Card.Media 구현 (이미지/비디오)
- [ ] Card.Metadata 구현

### Phase 3: 액션 & 인터랙션 (Week 2)
- [ ] Card.Actions 구현
- [ ] Interactive 상태 구현
- [ ] 키보드 네비게이션

### Phase 4: 문서화 & 테스트 (Week 2)
- [ ] Storybook 스토리 작성
- [ ] 단위 테스트 작성
- [ ] 접근성 테스트

**총 예상 시간**: 16시간

---

## 📚 참고 문서

- [OpenAI Apps SDK Design Guidelines](https://platform.openai.com/docs/guides/apps-design-guidelines)
- [WAI-ARIA Practices - Card Pattern](https://www.w3.org/WAI/ARIA/apg/)
- [Material Design - Cards](https://m3.material.io/components/cards)
- [Radix UI - Compound Components](https://www.radix-ui.com/primitives/docs/guides/composition)

---

**상태**: ✅ 설계 완료, 구현 준비 완료
**다음 단계**: 구현 시작 (Task 2.2)
