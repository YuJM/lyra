# Lyra UI - OpenAI Apps SDK 정렬 구현 로드맵

> 작성일: 2025-10-23
> 목적: OpenAI Apps SDK 디자인 가이드라인을 Lyra UI에 체계적으로 반영하기 위한 실행 계획

---

## 📊 Executive Summary

### 현재 상태 분석
- **기존 컴포넌트**: 15개 (button, checkbox, collapsible, dialog, field, menu, popover, progress, radio, select, switch, tabs, toast, tooltip, avatar)
- **OpenAI 가이드라인 일치도**: 65/100점
- **주요 갭**: Inline 모드 컴포넌트 부재 (Card, Carousel), 색상 시스템 제약 미적용

### 목표
OpenAI Apps SDK 디자인 가이드라인 준수도를 **95/100점**으로 향상시켜 ChatGPT 통합 경험에 최적화된 컴포넌트 라이브러리 구축

### 총 예상 작업 시간
**12-16주** (약 3-4개월)

---

## 🎯 핵심 전략

### 1. 점진적 개선 (Incremental Enhancement)
기존 컴포넌트는 유지하면서 OpenAI 특화 기능을 추가

### 2. 네임스페이스 분리
- **Core**: 범용 컴포넌트 (기존 유지)
- **ChatGPT**: OpenAI 특화 컴포넌트 (신규 추가)

### 3. 호환성 우선
기존 사용자 코드에 Breaking Change 없이 확장

---

## 📋 Implementation Roadmap

## Phase 1: 기반 강화 및 검증 시스템 구축 (2-3주)

### Epic 1.1: 색상 시스템 OpenAI 표준 정렬

**목표**: OpenAI 색상 가이드라인 준수 및 검증 시스템 구축

**성공 기준**:
- ✅ 모든 컴포넌트가 시스템 정의 팔레트만 사용
- ✅ 커스텀 그라데이션/배경 오버라이드 0건
- ✅ WCAG AA 대비율 100% 준수

**작업 단계**:

#### Task 1.1.1: 색상 사용 현황 감사 (3시간)
```bash
# 모든 CSS 파일에서 색상 직접 정의 검색
grep -r "background:" packages/ui/src --include="*.css"
grep -r "gradient" packages/ui/src --include="*.css"
```

**체크리스트**:
- [ ] 모든 컴포넌트 CSS 파일 검토
- [ ] 직접 색상 값 사용 사례 목록 작성
- [ ] 그라데이션 사용 사례 목록 작성
- [ ] 배경 색상 오버라이드 사례 목록 작성

**결과물**: `claudedocs/color-audit-report.md`

#### Task 1.1.2: 색상 토큰 마이그레이션 (8시간)
**변경 대상**:
```css
/* 변경 전 */
.Component {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
}

/* 변경 후 */
.Component {
  background: var(--color-bg-surface-default);
}
```

**체크리스트**:
- [ ] 모든 하드코딩된 색상 값을 토큰으로 변경
- [ ] 그라데이션을 시스템 토큰 조합으로 변경 또는 제거
- [ ] 배경 색상 오버라이드를 시멘틱 토큰으로 변경
- [ ] 각 변경 사항 테스트 (시각적 회귀 없음)

**결과물**: 수정된 컴포넌트 CSS 파일들

#### Task 1.1.3: ChatGPT 테마 프리셋 개발 (4시간)
**파일**: `packages/ui/src/themes/chatgpt.css`

```css
/**
 * ChatGPT Theme Preset
 * OpenAI Apps SDK 디자인 가이드라인 준수 테마
 *
 * 제약사항:
 * - 브랜드 색상은 primary에만 적용
 * - 배경/텍스트는 시스템 색상 고정
 * - 커스텀 그라데이션 금지
 */
:root {
  /* 브랜드 액센트 색상 (버튼/아이콘에만 사용) */
  --color-primary: var(--brand-accent, var(--color-blue-600));
  --color-primary-hover: var(--brand-accent-hover, var(--color-blue-700));

  /* 시스템 색상 고정 (오버라이드 금지) */
  --color-bg-surface-default: oklch(1 0 0) !important;
  --color-text-primary: var(--color-gray-900) !important;
}

/* 다크모드 시스템 자동 전환 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-surface-default: var(--color-gray-900) !important;
    --color-text-primary: var(--color-gray-50) !important;
  }
}
```

**체크리스트**:
- [ ] 테마 파일 생성
- [ ] 브랜드 색상 변수 정의
- [ ] 시스템 색상 고정 (!important 사용)
- [ ] 다크모드 지원
- [ ] Storybook에 테마 적용 예시 추가

**결과물**: `packages/ui/src/themes/chatgpt.css`

#### Task 1.1.4: 색상 대비율 검증 자동화 (5시간)
**도구**: Storybook A11y Addon

```bash
pnpm add -D @storybook/addon-a11y
```

**설정**: `.storybook/preview.ts`
```typescript
export const parameters = {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
          // WCAG AA 기준 (4.5:1)
        },
      ],
    },
  },
};
```

**체크리스트**:
- [ ] Storybook A11y addon 설치
- [ ] 설정 파일 추가
- [ ] 모든 컴포넌트 스토리에 대비율 검증 활성화
- [ ] 실패 사례 수정
- [ ] CI/CD 통합 (GitHub Actions)

**결과물**:
- `.storybook/preview.ts` 수정
- `.github/workflows/a11y.yml` 추가

**예상 소요 시간**: 20시간 (2.5일)

---

### Epic 1.2: 타이포그래피 및 레이아웃 표준화

**목표**: OpenAI 타이포그래피 가이드라인 준수 및 레이아웃 토큰 확장

**성공 기준**:
- ✅ 플랫폼 네이티브 폰트 자동 적용 (iOS: SF Pro, Android: Roboto)
- ✅ Border Radius 토큰 표준화 (5개 레벨)
- ✅ 텍스트 크기 조정 시 레이아웃 깨짐 0건

**작업 단계**:

#### Task 1.2.1: 플랫폼별 폰트 스택 개선 (2시간)
**현재**: `global.css`에서 `system-ui` 사용 (이미 준수)

**검증**:
```css
body {
  font-family: var(--font-family-sans);
  /* system-ui가 iOS에서 SF Pro, Android에서 Roboto로 자동 매핑됨 */
}
```

**체크리스트**:
- [ ] iOS Safari에서 SF Pro 적용 확인
- [ ] Android Chrome에서 Roboto 적용 확인
- [ ] 문서화 업데이트

**결과물**: 검증 완료 문서

#### Task 1.2.2: Border Radius 토큰 확장 (3시간)
**현재**: `@lyra/design-tokens`에 3개 레벨만 존재

**추가 필요**:
```css
/* packages/design-tokens/tokens.css */
:root {
  /* 기존 */
  --border-radius-md: 8px;
  --border-radius-lg: 12px;

  /* 추가 (OpenAI 표준) */
  --border-radius-sm: 4px;   /* Inline Card */
  --border-radius-xl: 16px;  /* Fullscreen Popup */
  --border-radius-full: 9999px; /* Avatar, Badge */

  /* OpenAI 특화 토큰 */
  --border-radius-card: var(--border-radius-md);
  --border-radius-carousel: var(--border-radius-sm);
}
```

**체크리스트**:
- [ ] design-tokens 패키지에 토큰 추가
- [ ] 기존 컴포넌트에 새 토큰 적용
- [ ] Storybook 문서 업데이트
- [ ] 빌드 및 배포

**결과물**: 업데이트된 `@lyra/design-tokens` 패키지

#### Task 1.2.3: 텍스트 크기 조정 테스트 (3시간)
**목표**: 200% 확대 시에도 레이아웃 유지

**테스트 방법**:
```bash
# Playwright 테스트 스크립트
pnpm test:responsive-text
```

**체크리스트**:
- [ ] 모든 컴포넌트 100% 확대 테스트
- [ ] 모든 컴포넌트 200% 확대 테스트
- [ ] 레이아웃 깨짐 사례 수정 (overflow-y: auto 추가 등)
- [ ] 회귀 테스트 자동화

**결과물**: Playwright 테스트 스크립트

**예상 소요 시간**: 8시간 (1일)

---

### Epic 1.3: 접근성 유틸리티 컴포넌트 개발

**목표**: 스크린 리더 지원 강화

**성공 기준**:
- ✅ ScreenReaderOnly 유틸리티 컴포넌트 개발
- ✅ 모든 컴포넌트에 스크린 리더 텍스트 추가

**작업 단계**:

#### Task 1.3.1: ScreenReaderOnly 컴포넌트 개발 (4시간)
**파일**: `packages/ui/src/components/utilities/screen-reader-only/`

```tsx
// screen-reader-only.tsx
import * as React from 'react';
import styles from './screen-reader-only.module.css';

export interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  as?: React.ElementType;
}

export const ScreenReaderOnly = React.forwardRef<
  HTMLElement,
  ScreenReaderOnlyProps
>(function ScreenReaderOnly({ children, as: Component = 'span' }, ref) {
  return (
    <Component ref={ref} className={styles.srOnly}>
      {children}
    </Component>
  );
});
```

```css
/* screen-reader-only.module.css */
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**체크리스트**:
- [ ] 컴포넌트 구현
- [ ] CSS 스타일 작성
- [ ] TypeScript 타입 정의
- [ ] 테스트 작성 (스크린 리더 접근 가능, 시각적 숨김)
- [ ] Storybook 스토리 작성

**결과물**: ScreenReaderOnly 컴포넌트

#### Task 1.3.2: 기존 컴포넌트에 스크린 리더 텍스트 추가 (6시간)
**예시**: Button, Dialog, Popover 등

```tsx
// Before
<Button onClick={handleClose}>
  <XIcon />
</Button>

// After
<Button onClick={handleClose}>
  <XIcon aria-hidden="true" />
  <ScreenReaderOnly>닫기</ScreenReaderOnly>
</Button>
```

**체크리스트**:
- [ ] 아이콘 전용 버튼에 스크린 리더 텍스트 추가
- [ ] Dialog의 hidden 상태 알림 추가
- [ ] Tooltip 대체 텍스트 추가
- [ ] 스크린 리더 테스트 (NVDA, VoiceOver)

**결과물**: 업데이트된 컴포넌트 파일들

**예상 소요 시간**: 10시간 (1.25일)

---

### Phase 1 총 예상 시간: 38시간 (약 5일, 여유 포함 2-3주)

---

## Phase 2: Inline 모드 컴포넌트 개발 (3-4주)

### Epic 2.1: Card 컴포넌트 구현 (HIGH Priority)

**목표**: OpenAI Inline 모드의 핵심 UI 패턴 제공

**성공 기준**:
- ✅ 최대 2개 주요 액션 제한
- ✅ 깊은 네비게이션 금지
- ✅ 동적 높이 조정
- ✅ WCAG AA 접근성 준수

**작업 단계**:

#### Task 2.1.1: Card 컴포넌트 아키텍처 설계 (3시간)
**API 설계**:
```tsx
// API 명세
export interface CardRootProps {
  children: React.ReactNode;
  /** 최대 높이 제한 (동적 높이) */
  maxHeight?: string;
  /** 깊은 네비게이션 방지 */
  navigation?: 'disabled' | 'shallow';
}

export interface CardActionsProps {
  children: React.ReactNode;
  /** 최대 액션 수 (OpenAI: 2개) */
  maxActions?: 1 | 2;
}

// 컴포넌트 구조
export const Card = {
  Root: CardRoot,        // 카드 컨테이너
  Media: CardMedia,      // 이미지/비디오
  Header: CardHeader,    // 제목 + 메타데이터
  Title: CardTitle,      // 제목
  Metadata: CardMetadata, // 메타데이터 (최대 3줄)
  Content: CardContent,  // 본문
  Actions: CardActions,  // 액션 버튼 (최대 2개)
};
```

**체크리스트**:
- [ ] API 명세 작성
- [ ] 컴포넌트 구조 설계
- [ ] Props 인터페이스 정의
- [ ] 사용 예시 작성

**결과물**: `claudedocs/card-component-spec.md`

#### Task 2.1.2: Card 컴포넌트 구현 (12시간)
**파일 구조**:
```
packages/ui/src/components/card/
├── card.tsx                 # 메인 컴포넌트
├── card-root.tsx
├── card-media.tsx
├── card-header.tsx
├── card-title.tsx
├── card-metadata.tsx
├── card-content.tsx
├── card-actions.tsx
├── card.module.css
├── index.ts
└── README.md
```

**구현 예시**:
```tsx
// card-root.tsx
export const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  function CardRoot({ children, maxHeight = '70vh', navigation = 'shallow', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={styles.card}
        style={{ maxHeight }}
        data-navigation={navigation}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// card-actions.tsx
export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  function CardActions({ children, maxActions = 2, ...props }, ref) {
    const actions = React.Children.toArray(children);

    if (actions.length > maxActions) {
      console.warn(`Card.Actions: ${actions.length}개 액션이 있습니다. 최대 ${maxActions}개만 허용됩니다.`);
    }

    return (
      <div ref={ref} className={styles.actions} {...props}>
        {actions.slice(0, maxActions)}
      </div>
    );
  }
);
```

**CSS**:
```css
/* card.module.css */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-card);
  background: var(--color-bg-surface-default);
  border: 1px solid var(--color-border-default);

  /* 동적 높이 */
  min-height: auto;
  overflow-y: auto;
}

/* 깊은 네비게이션 방지 */
.card[data-navigation="disabled"] a,
.card[data-navigation="disabled"] button[type="submit"] {
  pointer-events: none;
  opacity: 0.5;
}

.actions {
  display: flex;
  gap: var(--spacing-2);
  justify-content: flex-start;
}

.metadata {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  /* 최대 3줄 제약 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

**체크리스트**:
- [ ] 모든 서브 컴포넌트 구현
- [ ] CSS 스타일 작성
- [ ] TypeScript 타입 정의
- [ ] maxActions 제약 로직 구현
- [ ] navigation 제약 로직 구현
- [ ] 동적 높이 조정 구현

**결과물**: Card 컴포넌트 전체 파일

#### Task 2.1.3: Card 테스트 작성 (4시간)
```tsx
// card.test.tsx
describe('Card', () => {
  it('최대 2개 액션만 렌더링', () => {
    render(
      <Card.Root>
        <Card.Actions maxActions={2}>
          <Button>액션 1</Button>
          <Button>액션 2</Button>
          <Button>액션 3</Button> {/* 렌더링되지 않아야 함 */}
        </Card.Actions>
      </Card.Root>
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('navigation="disabled" 시 링크 비활성화', () => {
    render(
      <Card.Root navigation="disabled">
        <Card.Content>
          <a href="/test">링크</a>
        </Card.Content>
      </Card.Root>
    );

    expect(screen.getByRole('link')).toHaveStyle({ pointerEvents: 'none' });
  });
});
```

**체크리스트**:
- [ ] 단위 테스트 작성 (모든 서브 컴포넌트)
- [ ] 통합 테스트 작성
- [ ] 접근성 테스트 (ARIA, 키보드 네비게이션)
- [ ] 시각적 회귀 테스트 (Chromatic)

**결과물**: `card.test.tsx`

#### Task 2.1.4: Card Storybook 스토리 작성 (3시간)
```tsx
// card.stories.tsx
export default {
  title: 'ChatGPT/Card',
  component: Card.Root,
  parameters: {
    docs: {
      description: {
        component: 'OpenAI Inline 모드를 위한 카드 컴포넌트. 최대 2개 액션 제한.',
      },
    },
  },
};

export const Default = () => (
  <Card.Root>
    <Card.Header>
      <Card.Title>호텔 예약 확인</Card.Title>
    </Card.Header>
    <Card.Content>
      2025-10-23, 오후 2시
    </Card.Content>
    <Card.Actions maxActions={2}>
      <Button variant="primary">확인</Button>
      <Button variant="secondary">취소</Button>
    </Card.Actions>
  </Card.Root>
);

export const WithImage = () => (
  <Card.Root>
    <Card.Media src="/hotel.jpg" alt="호텔 전경" />
    <Card.Header>
      <Card.Title>럭셔리 호텔 A</Card.Title>
      <Card.Metadata>
        서울 강남구<br />
        ₩150,000 / 박<br />
        ⭐ 4.8 (123)
      </Card.Metadata>
    </Card.Header>
    <Card.Actions>
      <Button>예약하기</Button>
    </Card.Actions>
  </Card.Root>
);

export const MaxActionsConstraint = () => (
  <Card.Root>
    <Card.Header>
      <Card.Title>액션 제약 테스트</Card.Title>
    </Card.Header>
    <Card.Actions maxActions={2}>
      <Button>액션 1</Button>
      <Button>액션 2</Button>
      <Button>액션 3 (숨김)</Button>
    </Card.Actions>
  </Card.Root>
);
```

**체크리스트**:
- [ ] Default 스토리
- [ ] WithImage 스토리
- [ ] WithMetadata 스토리
- [ ] MaxActionsConstraint 스토리
- [ ] NavigationDisabled 스토리
- [ ] 접근성 체크 활성화

**결과물**: `card.stories.tsx`

#### Task 2.1.5: Card 문서화 (2시간)
**파일**: `packages/ui/src/components/card/README.md`

**내용**:
- API 레퍼런스
- 사용 예시
- OpenAI 가이드라인 준수 사항
- 제약사항 (최대 2개 액션, 깊은 네비게이션 금지 등)
- 접근성 가이드

**체크리스트**:
- [ ] API 문서 작성
- [ ] 사용 예시 추가
- [ ] 제약사항 설명
- [ ] 접근성 가이드 추가

**결과물**: `README.md`

**Epic 2.1 총 예상 시간**: 24시간 (3일)

---

### Epic 2.2: Icon 컴포넌트 구현 (HIGH Priority)

**목표**: OpenAI 아이콘 가이드라인 준수 시스템 제공

**성공 기준**:
- ✅ 단색, 아웃라인 스타일
- ✅ 시스템 아이콘 우선
- ✅ 모든 아이콘 aria-label 필수

**작업 단계**:

#### Task 2.2.1: Icon 컴포넌트 구현 (6시간)
**API 설계**:
```tsx
export interface IconProps {
  /** 아이콘 이름 (Heroicons 24/outline) */
  name: string;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg'; // 16px, 20px, 24px
  /** 색상 (currentColor 기본) */
  color?: string;
  /** 접근성 레이블 (필수) */
  'aria-label': string;
  /** 스타일 */
  variant?: 'outline' | 'solid';
}
```

**구현**:
```tsx
// icon.tsx
import * as React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import styles from './icon.module.css';

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  function Icon({ name, size = 'md', color = 'currentColor', variant = 'outline', ...props }, ref) {
    const IconComponent = HeroIcons[name as keyof typeof HeroIcons];

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        className={styles.icon}
        data-size={size}
        style={{ color }}
        {...props}
      />
    );
  }
);
```

**CSS**:
```css
.icon {
  display: inline-block;
  flex-shrink: 0;
}

.icon[data-size="sm"] {
  width: 16px;
  height: 16px;
}

.icon[data-size="md"] {
  width: 20px;
  height: 20px;
}

.icon[data-size="lg"] {
  width: 24px;
  height: 24px;
}
```

**체크리스트**:
- [ ] Heroicons 설치 (`pnpm add @heroicons/react`)
- [ ] Icon 컴포넌트 구현
- [ ] CSS 스타일 작성
- [ ] TypeScript 타입 정의
- [ ] aria-label 필수 검증 (TypeScript)

**결과물**: Icon 컴포넌트

#### Task 2.2.2: Icon 가이드라인 문서화 (2시간)
**파일**: `packages/ui/src/components/icon/GUIDELINES.md`

**내용**:
```markdown
# Icon Component Guidelines

## OpenAI Apps SDK 준수 사항

### 권장 아이콘 라이브러리
- **Heroicons (outline)**: 기본 권장
- **Lucide**: 대안

### 스타일 제약
- ✅ 단색 (monochromatic)
- ✅ 아웃라인 스타일
- ❌ 다색 아이콘 금지
- ❌ 입체 효과 금지

### 크기 표준
- sm: 16x16px
- md: 20x20px (기본)
- lg: 24x24px

### 접근성 요구사항
- 모든 아이콘 aria-label 필수
- 장식용 아이콘은 aria-hidden="true"

## 사용 예시

### 기본 사용
\`\`\`tsx
<Icon name="ArrowRightIcon" size="md" aria-label="다음" />
\`\`\`

### 장식용 아이콘 (aria-hidden)
\`\`\`tsx
<Button>
  <Icon name="CheckIcon" aria-hidden="true" />
  확인
</Button>
\`\`\`
```

**체크리스트**:
- [ ] 가이드라인 문서 작성
- [ ] 사용 예시 추가
- [ ] 금지 사항 명시

**결과물**: `GUIDELINES.md`

**Epic 2.2 총 예상 시간**: 8시간 (1일)

---

### Epic 2.3: Carousel 컴포넌트 구현 (HIGH Priority)

**목표**: OpenAI Inline 모드의 다중 항목 표시 패턴 제공

**성공 기준**:
- ✅ 3-8개 항목 제한
- ✅ 이미지 + 제목 + 메타데이터(최대 3줄) + 선택적 CTA
- ✅ 스크롤 스냅 지원

**작업 단계**:

#### Task 2.3.1: Carousel 컴포넌트 아키텍처 설계 (4시간)
**API 설계**:
```tsx
export interface CarouselRootProps {
  children: React.ReactNode;
  /** 항목 수 제한 */
  minItems?: number; // 기본: 3
  maxItems?: number; // 기본: 8
  /** 자동 스크롤 */
  autoScroll?: boolean;
}

export const Carousel = {
  Root: CarouselRoot,
  Viewport: CarouselViewport,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Indicators: CarouselIndicators,
};
```

**체크리스트**:
- [ ] API 명세 작성
- [ ] 컴포넌트 구조 설계
- [ ] Props 인터페이스 정의

**결과물**: `claudedocs/carousel-component-spec.md`

#### Task 2.3.2: Carousel 컴포넌트 구현 (14시간)
**파일 구조**:
```
packages/ui/src/components/carousel/
├── carousel.tsx
├── carousel-root.tsx
├── carousel-viewport.tsx
├── carousel-item.tsx
├── carousel-controls.tsx
├── carousel-indicators.tsx
├── carousel.module.css
├── use-carousel.ts         # 스크롤 로직 훅
└── index.ts
```

**구현 예시**:
```tsx
// use-carousel.ts
export function useCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const items = viewport.children;
    const item = items[index] as HTMLElement;

    item.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    setCurrentIndex(index);
  };

  const next = () => {
    const itemCount = viewportRef.current?.children.length || 0;
    if (currentIndex < itemCount - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  return {
    viewportRef,
    currentIndex,
    next,
    previous,
    scrollToIndex,
  };
}

// carousel-root.tsx
export const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselRootProps>(
  function CarouselRoot({ children, minItems = 3, maxItems = 8, ...props }, ref) {
    const carousel = useCarousel();
    const itemCount = React.Children.count(
      React.Children.toArray(children).filter(
        child => React.isValidElement(child) && child.type === CarouselItem
      )
    );

    if (itemCount < minItems) {
      console.warn(`Carousel: ${itemCount}개 항목. 최소 ${minItems}개 필요.`);
    }

    if (itemCount > maxItems) {
      console.warn(`Carousel: ${itemCount}개 항목. 최대 ${maxItems}개 허용.`);
    }

    return (
      <CarouselContext.Provider value={carousel}>
        <div ref={ref} className={styles.carousel} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
```

**CSS**:
```css
/* carousel.module.css */
.carousel {
  position: relative;
}

.viewport {
  display: flex;
  gap: var(--spacing-3);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.viewport::-webkit-scrollbar {
  display: none;
}

.item {
  flex: 0 0 280px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.controls {
  display: flex;
  gap: var(--spacing-2);
  justify-content: center;
  margin-top: var(--spacing-3);
}

.indicators {
  display: flex;
  gap: var(--spacing-1);
  justify-content: center;
  margin-top: var(--spacing-2);
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: var(--border-radius-full);
  background: var(--color-gray-300);
  transition: background 0.3s ease;
}

.indicator[data-active="true"] {
  background: var(--color-primary);
}
```

**체크리스트**:
- [ ] useCarousel 훅 구현
- [ ] 모든 서브 컴포넌트 구현
- [ ] CSS 스크롤 스냅 구현
- [ ] 키보드 네비게이션 구현 (Arrow Left/Right)
- [ ] 항목 수 제약 검증

**결과물**: Carousel 컴포넌트 전체 파일

#### Task 2.3.3: Carousel 테스트 및 Storybook (6시간)
**테스트**:
```tsx
describe('Carousel', () => {
  it('3-8개 항목 제약 경고', () => {
    const consoleSpy = jest.spyOn(console, 'warn');

    render(
      <Carousel.Root>
        <Carousel.Viewport>
          <Carousel.Item>Item 1</Carousel.Item>
          <Carousel.Item>Item 2</Carousel.Item>
        </Carousel.Viewport>
      </Carousel.Root>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('최소 3개 필요')
    );
  });
});
```

**Storybook**:
```tsx
export const HotelCarousel = () => (
  <Carousel.Root>
    <Carousel.Viewport>
      {hotels.map(hotel => (
        <Carousel.Item key={hotel.id}>
          <Card.Root>
            <Card.Media src={hotel.image} alt={hotel.name} />
            <Card.Title>{hotel.name}</Card.Title>
            <Card.Metadata>
              {hotel.location}<br />
              {hotel.price}<br />
              ⭐ {hotel.rating}
            </Card.Metadata>
            <Card.Actions>
              <Button>예약하기</Button>
            </Card.Actions>
          </Card.Root>
        </Carousel.Item>
      ))}
    </Carousel.Viewport>
    <Carousel.Controls>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Controls>
    <Carousel.Indicators />
  </Carousel.Root>
);
```

**체크리스트**:
- [ ] 단위 테스트 작성
- [ ] 접근성 테스트 (키보드 네비게이션)
- [ ] Storybook 스토리 작성 (Default, WithControls, WithIndicators)
- [ ] 문서화

**결과물**: `carousel.test.tsx`, `carousel.stories.tsx`

**Epic 2.3 총 예상 시간**: 24시간 (3일)

---

### Epic 2.4: Image 컴포넌트 구현 (MEDIUM Priority)

**목표**: 이미지 표시 표준화 및 OpenAI 가이드라인 준수

**성공 기준**:
- ✅ alt 필수 (빈 문자열 불허)
- ✅ aspect ratio 강제 (왜곡 방지)
- ✅ 지연 로딩 지원

**작업 단계**:

#### Task 2.4.1: Image 컴포넌트 구현 (6시간)
```tsx
export interface ImageProps {
  src: string;
  alt: string; // 필수, 빈 문자열 불허
  aspectRatio?: '1/1' | '16/9' | '4/3';
  loading?: 'lazy' | 'eager';
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image({ src, alt, aspectRatio, loading = 'lazy', ...props }, ref) {
    if (!alt || alt.trim() === '') {
      throw new Error('Image: alt 속성은 필수이며 빈 문자열일 수 없습니다.');
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        className={styles.image}
        style={{ aspectRatio }}
        {...props}
      />
    );
  }
);
```

**CSS**:
```css
.image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
}
```

**체크리스트**:
- [ ] Image 컴포넌트 구현
- [ ] alt 검증 로직 추가
- [ ] aspect ratio 지원
- [ ] 테스트 작성
- [ ] Storybook 스토리 작성

**결과물**: Image 컴포넌트

**Epic 2.4 총 예상 시간**: 6시간 (0.75일)

---

### Phase 2 총 예상 시간: 62시간 (약 8일, 여유 포함 3-4주)

---

## Phase 3: 기존 컴포넌트 개선 (2-3주)

### Epic 3.1: Button 개선

**목표**: 터치 타겟 크기 보장 및 액션 수 제한 지원

**작업 단계**:

#### Task 3.1.1: 터치 타겟 크기 보장 (3시간)
```css
/* button.module.css */
.button {
  /* 기존 스타일 유지 */

  /* 최소 터치 타겟 크기 (모바일) */
  min-width: 44px;
  min-height: 44px;

  /* 작은 버튼 variant도 터치 영역은 44px 유지 */
  &[data-size="sm"] {
    min-width: 44px;
    min-height: 44px;
    padding: var(--spacing-2) var(--spacing-3);
  }
}
```

**체크리스트**:
- [ ] CSS 수정
- [ ] 모바일 테스트 (실제 디바이스)
- [ ] Storybook 터치 타겟 가시화

**결과물**: 업데이트된 `button.module.css`

**예상 소요 시간**: 3시간

---

### Epic 3.2: Dialog 개선

**목표**: SimpleDialog 템플릿 추가 (최대 2개 액션)

**작업 단계**:

#### Task 3.2.1: SimpleDialog 컴포넌트 개발 (6시간)
```tsx
export interface SimpleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  actions: {
    primary: {
      label: string;
      onClick: () => void;
      variant?: 'primary' | 'danger';
    };
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
}

export function SimpleDialog({
  open,
  onOpenChange,
  title,
  description,
  actions,
}: SimpleDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Popup>
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        <Dialog.Actions>
          <Button
            variant={actions.primary.variant || 'primary'}
            onClick={actions.primary.onClick}
          >
            {actions.primary.label}
          </Button>
          {actions.secondary && (
            <Button
              variant="secondary"
              onClick={actions.secondary.onClick}
            >
              {actions.secondary.label}
            </Button>
          )}
        </Dialog.Actions>
        <Dialog.Close />
      </Dialog.Popup>
    </Dialog.Root>
  );
}
```

**체크리스트**:
- [ ] SimpleDialog 컴포넌트 구현
- [ ] 최대 2개 액션 제한
- [ ] 테스트 작성
- [ ] Storybook 스토리 추가

**결과물**: SimpleDialog 컴포넌트

**예상 소요 시간**: 6시간

---

### Epic 3.3: Progress 개선

**목표**: 스트리밍 인디케이터 추가 (실시간 AI 응답 표시)

**작업 단계**:

#### Task 3.3.1: Progress.Streaming 컴포넌트 개발 (5시간)
```tsx
export interface ProgressStreamingProps {
  value: number; // 0-100
  estimatedTime?: string;
  label?: string;
}

export const ProgressStreaming = React.forwardRef<HTMLDivElement, ProgressStreamingProps>(
  function ProgressStreaming({ value, estimatedTime, label, ...props }, ref) {
    return (
      <div ref={ref} className={styles.streaming} {...props}>
        <div className={styles.streamingLabel}>
          {label || '응답 생성 중...'}
          {estimatedTime && (
            <span className={styles.streamingTime}>{estimatedTime}</span>
          )}
        </div>
        <Progress.Root value={value}>
          <Progress.Indicator className={styles.streamingIndicator} />
        </Progress.Root>
      </div>
    );
  }
);
```

**CSS**:
```css
.streamingIndicator {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.streamingTime {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-left: var(--spacing-2);
}
```

**체크리스트**:
- [ ] Progress.Streaming 컴포넌트 구현
- [ ] 애니메이션 추가
- [ ] 예상 시간 표시 기능
- [ ] 테스트 및 Storybook

**결과물**: Progress.Streaming 컴포넌트

**예상 소요 시간**: 5시간

---

### Epic 3.4: Toast 개선

**목표**: 컨텍스트 기반 알림 패턴 추가

**작업 단계**:

#### Task 3.4.1: toast.contextual API 개발 (4시간)
```tsx
export interface ContextualToastOptions {
  message: string;
  context: string; // user-order-123
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export function contextualToast({
  message,
  context,
  actions,
}: ContextualToastOptions) {
  toast.custom((t) => (
    <div className={styles.contextualToast}>
      <div className={styles.contextualMessage}>{message}</div>
      {actions && (
        <div className={styles.contextualActions}>
          {actions.map((action, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => {
                action.onClick();
                toast.dismiss(t.id);
              }}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  ), {
    duration: 5000,
    id: `contextual-${context}`,
  });
}
```

**체크리스트**:
- [ ] contextualToast 함수 구현
- [ ] 액션 버튼 지원
- [ ] 컨텍스트 ID 중복 방지
- [ ] Storybook 스토리 추가

**결과물**: contextualToast API

**예상 소요 시간**: 4시간

---

### Phase 3 총 예상 시간: 18시간 (약 2.5일, 여유 포함 2-3주)

---

## Phase 4: Fullscreen 및 피드백 컴포넌트 (2-3주)

### Epic 4.1: Skeleton 컴포넌트 구현 (MEDIUM Priority)

**목표**: 로딩 상태 표시 컴포넌트 제공

**작업 단계**:

#### Task 4.1.1: Skeleton 컴포넌트 구현 (8시간)
**API 설계**:
```tsx
export const Skeleton = {
  Root: SkeletonRoot,
  Avatar: SkeletonAvatar,
  Text: SkeletonText,
  Button: SkeletonButton,
  Image: SkeletonImage,
};

export interface SkeletonTextProps {
  lines?: number; // 텍스트 줄 수
}
```

**구현 예시**:
```tsx
// skeleton-text.tsx
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText({ lines = 1, ...props }, ref) {
    return (
      <div ref={ref} className={styles.skeletonText} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={styles.skeletonLine}
            style={{ width: index === lines - 1 ? '60%' : '100%' }}
          />
        ))}
      </div>
    );
  }
);
```

**CSS**:
```css
.skeletonLine {
  height: 1em;
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 0%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 100%
  );
  background-size: 200% 100%;
  border-radius: var(--border-radius-sm);
  animation: skeleton-loading 1.5s ease-in-out infinite;
  margin-bottom: var(--spacing-2);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

**체크리스트**:
- [ ] 모든 서브 컴포넌트 구현 (Avatar, Text, Button, Image)
- [ ] 로딩 애니메이션 구현
- [ ] 테스트 작성
- [ ] Storybook 스토리 작성

**결과물**: Skeleton 컴포넌트

**예상 소요 시간**: 8시간 (1일)

---

### Epic 4.2: ChatSheet 컴포넌트 구현 (MEDIUM Priority)

**목표**: Fullscreen 모드 지원 (대화 컨텍스트 유지)

**작업 단계**:

#### Task 4.2.1: ChatSheet 컴포넌트 구현 (10시간)
**API 설계**:
```tsx
export const ChatSheet = {
  Root: ChatSheetRoot,
  Content: ChatSheetContent,
  Composer: ChatSheetComposer,
  StreamingIndicator: ChatSheetStreamingIndicator,
};

export interface ChatSheetRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  composer?: boolean; // ChatGPT composer 오버레이 활성화
  streaming?: boolean; // 스트리밍 인디케이터
}
```

**구현 예시**:
```tsx
// chat-sheet-root.tsx
export const ChatSheetRoot = React.forwardRef<HTMLDivElement, ChatSheetRootProps>(
  function ChatSheetRoot({ open, onOpenChange, composer, streaming, children, ...props }, ref) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Popup className={styles.chatSheet}>
          <div ref={ref} className={styles.chatSheetContent} {...props}>
            {children}
          </div>
          {composer && (
            <div className={styles.chatSheetComposer}>
              {/* ChatGPT composer 오버레이 */}
            </div>
          )}
          {streaming && (
            <div className={styles.chatSheetStreaming}>
              <Progress.Streaming />
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Root>
    );
  }
);
```

**CSS**:
```css
.chatSheet {
  position: fixed;
  inset: 0;
  max-width: 100vw;
  max-height: 100vh;
  border-radius: 0;
  display: flex;
  flex-direction: column;
}

.chatSheetContent {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-6);
}

.chatSheetComposer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: var(--color-bg-surface-default);
  border-top: 1px solid var(--color-border-default);
  padding: var(--spacing-4);
}

.chatSheetStreaming {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
}
```

**체크리스트**:
- [ ] ChatSheet 컴포넌트 구현
- [ ] Composer 오버레이 구현
- [ ] Streaming 인디케이터 통합
- [ ] 전체 화면 레이아웃 구현
- [ ] 테스트 및 Storybook

**결과물**: ChatSheet 컴포넌트

**예상 소요 시간**: 10시간 (1.25일)

---

### Phase 4 총 예상 시간: 18시간 (약 2.5일, 여유 포함 2-3주)

---

## Phase 5: 문서화 및 검증 (1-2주)

### Epic 5.1: 컴포넌트 라이브러리 문서화

**목표**: OpenAI 가이드라인 준수 문서 및 마이그레이션 가이드 제공

**작업 단계**:

#### Task 5.1.1: OpenAI 가이드라인 체크리스트 작성 (4시간)
**파일**: `claudedocs/openai-compliance-checklist.md`

**내용**:
```markdown
# OpenAI Apps SDK 가이드라인 준수 체크리스트

## 색상 시스템
- [x] 시스템 정의 팔레트만 사용
- [x] 커스텀 그라데이션 0건
- [x] 배경 색상 오버라이드 0건
- [x] 브랜드 색상은 버튼/아이콘에만 적용

## 타이포그래피
- [x] 플랫폼 네이티브 폰트 사용 (SF Pro, Roboto)
- [x] 시스템 사이징 계층 준수

## Inline 모드 컴포넌트
- [x] Card 컴포넌트: 최대 2개 액션 제한
- [x] Carousel 컴포넌트: 3-8개 항목 제한
- [x] 깊은 네비게이션 금지

## 접근성
- [x] WCAG AA 대비율 100% 준수
- [x] 모든 아이콘 aria-label 필수
- [x] 키보드 네비게이션 지원

## 점수: 95/100
```

**체크리스트**:
- [ ] 체크리스트 항목 작성
- [ ] 각 항목 검증
- [ ] 점수 계산

**결과물**: `openai-compliance-checklist.md`

#### Task 5.1.2: Storybook 문서 업데이트 (8시간)
**대상**: 모든 신규 및 개선된 컴포넌트

**업데이트 내용**:
- OpenAI 가이드라인 참조 추가
- 제약사항 명시
- 사용 예시 확장
- 접근성 가이드 추가

**체크리스트**:
- [ ] Card 스토리 문서 업데이트
- [ ] Carousel 스토리 문서 업데이트
- [ ] Icon 스토리 문서 업데이트
- [ ] 기타 컴포넌트 스토리 업데이트

**결과물**: 업데이트된 Storybook 문서

#### Task 5.1.3: 마이그레이션 가이드 작성 (6시간)
**파일**: `claudedocs/migration-guide.md`

**내용**:
```markdown
# Lyra UI → OpenAI 정렬 버전 마이그레이션 가이드

## Breaking Changes 없음
기존 컴포넌트는 모두 유지되며, OpenAI 특화 기능이 추가되었습니다.

## 신규 컴포넌트
### Card (ChatGPT Inline 모드)
\`\`\`tsx
// Before: Popover 사용
<Popover.Root>...</Popover.Root>

// After: Card 사용
<Card.Root>...</Card.Root>
\`\`\`

### Carousel
\`\`\`tsx
<Carousel.Root>
  <Carousel.Viewport>
    {items.map(item => (
      <Carousel.Item key={item.id}>
        <Card.Root>...</Card.Root>
      </Carousel.Item>
    ))}
  </Carousel.Viewport>
</Carousel.Root>
\`\`\`

## ChatGPT 테마 적용
\`\`\`tsx
// main.tsx
import '@lyra/ui/themes/chatgpt.css';
\`\`\`

## 아이콘 가이드라인
\`\`\`tsx
// Before: 직접 SVG 사용
<svg>...</svg>

// After: Icon 컴포넌트 사용
<Icon name="ArrowRightIcon" aria-label="다음" />
\`\`\`
```

**체크리스트**:
- [ ] Breaking Changes 확인
- [ ] 마이그레이션 예시 작성
- [ ] FAQ 섹션 추가

**결과물**: `migration-guide.md`

**Epic 5.1 총 예상 시간**: 18시간 (2.25일)

---

### Epic 5.2: 품질 검증

**목표**: 접근성, 성능, OpenAI 가이드라인 준수 검증

**작업 단계**:

#### Task 5.2.1: 접근성 감사 실행 (4시간)
**도구**:
- Storybook A11y Addon
- axe DevTools
- 스크린 리더 테스트 (NVDA, VoiceOver)

**체크리스트**:
- [ ] 모든 컴포넌트 자동 접근성 테스트
- [ ] 스크린 리더 수동 테스트
- [ ] 키보드 네비게이션 테스트
- [ ] 접근성 이슈 수정

**결과물**: `claudedocs/accessibility-audit-report.md`

#### Task 5.2.2: 성능 벤치마크 (3시간)
**측정 항목**:
- 번들 크기 (전체 라이브러리)
- 개별 컴포넌트 크기
- 렌더링 성능
- Tree-shaking 효율성

**목표**:
- 전체 번들: ≤60KB gzipped (현재 50KB + 신규 10KB)
- 개별 컴포넌트: ≤5KB gzipped

**체크리스트**:
- [ ] 번들 크기 측정
- [ ] Lighthouse 성능 점수 측정
- [ ] 최적화 필요 사항 식별
- [ ] 최적화 적용

**결과물**: `claudedocs/performance-benchmark.md`

#### Task 5.2.3: OpenAI 가이드라인 준수 검증 (3시간)
**검증 항목**:
- 색상 시스템 (시스템 팔레트만 사용)
- 타이포그래피 (플랫폼 네이티브 폰트)
- 컴포넌트 제약사항 (Card 2개 액션, Carousel 3-8개 항목)
- 접근성 (WCAG AA)

**체크리스트**:
- [ ] 색상 토큰 사용 검증
- [ ] 폰트 스택 검증
- [ ] 컴포넌트 제약사항 준수 검증
- [ ] 접근성 기준 준수 검증

**결과물**: `claudedocs/openai-compliance-report.md`

**Epic 5.2 총 예상 시간**: 10시간 (1.25일)

---

### Phase 5 총 예상 시간: 28시간 (약 3.5일, 여유 포함 1-2주)

---

## 📊 전체 로드맵 요약

| Phase | Epic | 예상 시간 | 일정 | 우선순위 |
|-------|------|----------|------|---------|
| **Phase 1** | 기반 강화 | 38시간 | 2-3주 | 🔴 HIGH |
| 1.1 | 색상 시스템 정렬 | 20시간 | | 🔴 HIGH |
| 1.2 | 타이포그래피/레이아웃 | 8시간 | | 🟡 MEDIUM |
| 1.3 | 접근성 유틸리티 | 10시간 | | 🔴 HIGH |
| **Phase 2** | Inline 컴포넌트 | 62시간 | 3-4주 | 🔴 HIGH |
| 2.1 | Card 컴포넌트 | 24시간 | | 🔴 HIGH |
| 2.2 | Icon 컴포넌트 | 8시간 | | 🔴 HIGH |
| 2.3 | Carousel 컴포넌트 | 24시간 | | 🔴 HIGH |
| 2.4 | Image 컴포넌트 | 6시간 | | 🟡 MEDIUM |
| **Phase 3** | 기존 컴포넌트 개선 | 18시간 | 2-3주 | 🟡 MEDIUM |
| 3.1 | Button 개선 | 3시간 | | 🟡 MEDIUM |
| 3.2 | Dialog 개선 | 6시간 | | 🟡 MEDIUM |
| 3.3 | Progress 개선 | 5시간 | | 🟡 MEDIUM |
| 3.4 | Toast 개선 | 4시간 | | 🟢 LOW |
| **Phase 4** | Fullscreen/피드백 | 18시간 | 2-3주 | 🟡 MEDIUM |
| 4.1 | Skeleton 컴포넌트 | 8시간 | | 🟡 MEDIUM |
| 4.2 | ChatSheet 컴포넌트 | 10시간 | | 🟡 MEDIUM |
| **Phase 5** | 문서화 및 검증 | 28시간 | 1-2주 | 🔴 HIGH |
| 5.1 | 문서화 | 18시간 | | 🔴 HIGH |
| 5.2 | 품질 검증 | 10시간 | | 🔴 HIGH |
| **총계** | | **164시간** | **12-16주** | |

---

## 🎯 성공 지표 (KPIs)

### 기술적 지표
- **접근성**: WCAG AA 준수 100% (Phase 1, 5)
- **색상 대비율**: 텍스트 4.5:1 이상 100% (Phase 1)
- **터치 타겟**: 모바일 44x44px 이상 100% (Phase 3)
- **번들 크기**: ≤60KB gzipped (현재 50KB + 신규 10KB) (Phase 5)

### OpenAI 가이드라인 준수
- **Inline Card**: 최대 2개 액션 제한 (Phase 2)
- **Carousel**: 3-8개 항목 제한 (Phase 2)
- **색상 시스템**: 커스텀 오버라이드 0건 (Phase 1)
- **타이포그래피**: 플랫폼 네이티브 폰트 100% (Phase 1)

### 개발자 경험
- **컴포넌트 생성**: Plop 템플릿으로 5분 내 생성 (Phase 5)
- **문서화**: 모든 컴포넌트 Storybook 예시 + OpenAI 가이드라인 참조 (Phase 5)
- **타입 안전성**: TypeScript strict 모드 100% (모든 Phase)

### 최종 목표
**OpenAI Apps SDK 가이드라인 준수도**: 65/100 → **95/100**

---

## 🔗 작업 간 의존성

### Critical Path (병렬 불가)
```
Phase 1.1 (색상 시스템)
  → Phase 2 (Inline 컴포넌트)
    → Phase 5 (문서화 및 검증)
```

### 병렬 가능
```
Phase 1.2 (타이포그래피) || Phase 1.3 (접근성)
Phase 2.1 (Card) || Phase 2.2 (Icon)
Phase 3 (기존 개선) || Phase 4 (Fullscreen)
```

---

## ⚠️ 리스크 관리

### 리스크 1: 기존 사용자 호환성
**문제**: OpenAI 제약사항이 기존 사용 사례와 충돌

**완화 전략**:
- 별도 네임스페이스 제공 (`Card.Inline` vs `Card.Standard`)
- Breaking Change 없음 (신규 컴포넌트만 추가)
- Deprecation 경고 시스템 도입

### 리스크 2: 번들 크기 증가
**문제**: 신규 컴포넌트 추가로 번들 크기 증가 (50KB → 60KB 목표)

**완화 전략**:
- Tree-shaking 최적화
- 코드 스플리팅 (React.lazy)
- 중복 제거 (공통 유틸리티 추출)

### 리스크 3: 일정 지연
**문제**: 예상 12-16주, 실제 20주 이상 소요 가능

**완화 전략**:
- MVP 우선: Phase 1-2만 먼저 완료 (8주)
- Phase 3-4는 선택적 진행
- 주간 진행 상황 체크인

---

## 📅 다음 단계

### 즉시 시작 (이번 주)
1. **Phase 1.1.1**: 색상 사용 현황 감사 (3시간)
2. **Phase 1.1.3**: ChatGPT 테마 프리셋 개발 (4시간)
3. **Phase 2.1.1**: Card 컴포넌트 아키텍처 설계 (3시간)

### 1주차 목표
- Phase 1.1 완료 (색상 시스템 정렬)
- Phase 2.1.1-2.1.2 진행 (Card 컴포넌트 설계 및 구현 시작)

### 1개월 목표
- Phase 1 완료 (기반 강화)
- Phase 2.1-2.2 완료 (Card, Icon 컴포넌트)

### 3개월 목표 (MVP)
- Phase 1-2 완료 (Inline 모드 완전 지원)
- Phase 5.1 완료 (기본 문서화)

---

## 📚 참고 자료

### OpenAI
- [Apps SDK Design Guidelines](https://developers.openai.com/apps-sdk/concepts/design-guidelines)
- Figma 컴포넌트 라이브러리

### 접근성
- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Storybook A11y Addon](https://storybook.js.org/addons/@storybook/addon-a11y)

### 내부 문서
- `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/lyra-ui-openai-alignment-design.md`
- `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/lyra-ui-vs-openai-apps-sdk-analysis.md`
- `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/openai-apps-sdk-design-guidelines.md`

---

**작성일**: 2025-10-23
**최종 업데이트**: 2025-10-23
**작성자**: Claude (Frontend Architect Persona)
**검토 필요**: 팀 리드, 프로덕트 매니저, 디자이너
