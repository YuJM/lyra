# Lyra UI - OpenAI Apps SDK 정렬 설계

> 작성일: 2025-10-23
> 목적: OpenAI Apps SDK 디자인 가이드라인에 맞춘 Lyra UI 컴포넌트 라이브러리 개선 방향

---

## 📋 Executive Summary

Lyra UI를 OpenAI Apps SDK 디자인 가이드라인에 정렬하여 ChatGPT 통합 경험에 최적화된 컴포넌트 라이브러리로 전환합니다. 핵심은 **대화형(Conversational)**, **단순함(Simple)**, **반응형(Responsive)** 원칙을 준수하면서도 기존 Base UI 기반 아키텍처를 유지하는 것입니다.

### 핵심 전략
1. **디스플레이 모드 지원**: Inline Card/Carousel, Fullscreen, PiP 모드를 위한 전용 컴포넌트 개발
2. **시각적 표준 준수**: 시스템 정의 색상/타이포그래피 사용, 커스텀 오버라이드 최소화
3. **접근성 강화**: WCAG AA 필수 준수, 보조 기술 지원 확대
4. **컴포넌트 확장**: ChatGPT 인터페이스에 특화된 새로운 컴포넌트 추가

---

## 🎯 OpenAI 가이드라인 핵심 원칙 분석

### 1. Conversational (대화형)
**원칙**: ChatGPT의 자연스러운 대화 흐름을 seamless하게 확장

**Lyra UI 적용 포인트**:
- ✅ 이미 적용: Tooltip, Popover가 대화 흐름 방해 최소화
- 🔄 개선 필요: Dialog → 대화 컨텍스트 유지 기능 추가
- ➕ 신규: ChatSheet 컴포넌트 (Fullscreen 모드용)

### 2. Intelligent (지능형)
**원칙**: 컨텍스트 이해, 사용자 요구 예측

**Lyra UI 적용 포인트**:
- ➕ 신규: ContextualPrompt 컴포넌트 (사용자 의도 기반 제안)
- 🔄 개선: Menu → 컨텍스트 기반 메뉴 항목 활성화/비활성화

### 3. Simple (단순함)
**원칙**: 단일하고 명확한 결과에 집중, 복잡성 최소화

**Lyra UI 적용 포인트**:
- ✅ 이미 적용: 모든 컴포넌트가 단일 책임 원칙 준수
- 🔄 개선: Dialog → 최대 2개 주요 액션으로 제한
- ➕ 신규: Card 컴포넌트 (Inline 모드용 단순 카드)

### 4. Responsive (반응형)
**원칙**: 빠르고 가벼운 도구, 압도하지 않고 향상

**Lyra UI 적용 포인트**:
- ✅ 이미 적용: CSS Modules로 런타임 오버헤드 최소화
- 🔄 개선: Progress → 실시간 스트리밍 인디케이터 추가
- ➕ 신규: Skeleton 컴포넌트 (로딩 상태 표시)

### 5. Accessible (접근성)
**원칙**: 다양한 사용자 지원, 보조 기술 포함

**Lyra UI 적용 포인트**:
- ✅ 이미 적용: ARIA 속성, 키보드 네비게이션
- 🔄 개선 필요: 모든 컴포넌트 WCAG AA 대비율 검증
- ➕ 신규: ScreenReaderOnly 유틸리티 컴포넌트

---

## 🏗️ 디스플레이 모드별 컴포넌트 매핑

### Inline Mode (인라인 모드)
> 대화 내 직접 통합, 가벼운 디스플레이

#### 기존 컴포넌트 활용
| 컴포넌트 | 용도 | 제약사항 준수 |
|---------|------|--------------|
| **Button** | 주요 액션 (최대 2개) | ✅ 이미 준수 |
| **Avatar** | 앱 아이콘 표시 | ✅ 이미 준수 |
| **Progress** | 작업 진행 상태 | ✅ 이미 준수 |

#### 신규 컴포넌트 필요
1. **Card** (우선순위: 🔴 HIGH)
   ```tsx
   <Card.Root>
     <Card.Media src="..." alt="..." />
     <Card.Header>
       <Card.Title>제목</Card.Title>
       <Card.Metadata>메타데이터 (최대 3줄)</Card.Metadata>
     </Card.Header>
     <Card.Footer>
       <Card.Action>액션</Card.Action>
     </Card.Footer>
   </Card.Root>
   ```
   - **제약**: 동적 높이, 깊은 네비게이션/중첩 스크롤 금지
   - **최대 액션**: 2개

2. **Carousel** (우선순위: 🔴 HIGH)
   ```tsx
   <Carousel.Root>
     <Carousel.Viewport>
       <Carousel.Item>
         <Card.Root>...</Card.Root>
       </Carousel.Item>
       {/* 3-8개 항목 */}
     </Carousel.Viewport>
     <Carousel.Controls>
       <Carousel.Previous />
       <Carousel.Next />
     </Carousel.Controls>
   </Carousel.Root>
   ```
   - **항목 수**: 3-8개
   - **구조**: 이미지 + 제목 + 메타데이터 + 선택적 CTA

### Fullscreen Mode (풀스크린 모드)
> 복잡한 워크플로우를 위한 몰입형 경험

#### 신규 컴포넌트 필요
1. **ChatSheet** (우선순위: 🟡 MEDIUM)
   ```tsx
   <ChatSheet.Root>
     <ChatSheet.Composer>
       {/* 지속적인 ChatGPT composer 오버레이 */}
     </ChatSheet.Composer>
     <ChatSheet.Content>
       {/* 전체 화면 콘텐츠 */}
     </ChatSheet.Content>
     <ChatSheet.StreamingIndicator />
   </ChatSheet.Root>
   ```
   - **특징**: 대화 컨텍스트 유지, 스트리밍 인디케이터

2. **Canvas** (우선순위: 🟢 LOW)
   - 편집 캔버스, 맵 탐색 등 복잡한 인터랙션 지원

### Picture-in-Picture (PiP)
> 병렬 활동을 위한 지속적인 플로팅 윈도우

#### 신규 컴포넌트 필요
1. **FloatingWindow** (우선순위: 🟢 LOW)
   ```tsx
   <FloatingWindow.Root>
     <FloatingWindow.Header>
       <FloatingWindow.Title>제목</FloatingWindow.Title>
       <FloatingWindow.Close />
     </FloatingWindow.Header>
     <FloatingWindow.Content>
       {/* 게임, 퀴즈, 라이브 세션 */}
     </FloatingWindow.Content>
   </FloatingWindow.Root>
   ```
   - **특징**: 대화 중에도 계속 보임, 프롬프트 동적 응답

---

## 🎨 비주얼 디자인 표준 정렬

### Color System (색상 시스템)

#### 현재 Lyra UI 색상 구조
```css
/* 계층적 시멘틱 토큰 */
--color-primary: var(--color-blue-600);
--color-text-primary: var(--color-gray-900);
--color-bg-primary-default: var(--color-primary);
```

#### OpenAI 가이드라인 요구사항
- ✅ **시스템 정의 팔레트 사용**: Lyra 이미 준수
- ✅ **버튼/아이콘 브랜드 액센트 허용**: 현재 `--color-primary` 사용
- ❌ **커스텀 그라데이션 금지**: 검증 필요
- ❌ **배경 색상 오버라이드 금지**: 검증 필요

#### 개선 사항
1. **색상 오버라이드 검증** (우선순위: 🔴 HIGH)
   - 모든 컴포넌트 CSS 검토
   - `background-color`, `gradient` 직접 설정 제거
   - 시스템 토큰만 사용하도록 강제

2. **다크 모드 일관성 강화** (우선순위: 🟡 MEDIUM)
   ```css
   /* 현재 */
   @media (prefers-color-scheme: dark) {
     .Component {
       background: var(--color-background-default-dark);
     }
   }

   /* 개선안: 시스템 토큰 자동 전환 */
   .Component {
     background: var(--color-bg-surface-default);
   }
   ```

### Typography (타이포그래피)

#### 현재 Lyra UI
```css
--font-family-base: system-ui, sans-serif;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
```

#### OpenAI 가이드라인 요구사항
- ✅ **플랫폼 네이티브 폰트 사용**:
  - iOS: SF Pro
  - Android: Roboto
- ✅ **일관된 시스템 사이징 계층**: Lyra 이미 준수
- ⚠️ **콘텐츠 영역에만 스타일 변형 제한**: 검증 필요

#### 개선 사항
1. **플랫폼별 폰트 스택** (우선순위: 🟡 MEDIUM)
   ```css
   :root {
     --font-family-base:
       -apple-system,           /* iOS Safari */
       BlinkMacSystemFont,      /* macOS Safari */
       "Segoe UI",              /* Windows */
       Roboto,                  /* Android */
       system-ui,               /* Fallback */
       sans-serif;
   }

   /* iOS 전용 */
   @supports (-webkit-touch-callout: none) {
     :root {
       --font-family-base: "SF Pro Display", system-ui;
     }
   }
   ```

2. **타이포그래피 변형 제한** (우선순위: 🟢 LOW)
   - 헤더/본문에만 스타일 적용
   - 시스템 UI 요소는 기본 스타일 유지

### Spacing & Layout (간격 및 레이아웃)

#### 현재 Lyra UI
```css
--spacing-1: 4px;   /* 0.25rem */
--spacing-2: 8px;   /* 0.5rem */
--spacing-3: 12px;  /* 0.75rem */
--spacing-4: 16px;  /* 1rem */
```

#### OpenAI 가이드라인 요구사항
- ✅ **시스템 그리드 간격 사용**: Lyra 이미 준수
- ✅ **명확한 시각적 계층**: 현재 구현됨
- ⚠️ **모서리 반경 값 준수**: 검증 필요

#### 개선 사항
1. **Border Radius 표준화** (우선순위: 🔴 HIGH)
   ```css
   /* 현재 */
   --border-radius-md: 8px;
   --border-radius-lg: 12px;

   /* 추가 필요 (OpenAI 표준) */
   --border-radius-sm: 4px;   /* Inline Card */
   --border-radius-xl: 16px;  /* Fullscreen Popup */
   --border-radius-full: 9999px; /* Avatar, Badge */
   ```

2. **카드 레이아웃 그리드** (우선순위: 🟡 MEDIUM)
   ```css
   /* Inline Card 전용 간격 */
   --card-padding-inline: var(--spacing-4);
   --card-padding-block: var(--spacing-3);
   --card-gap: var(--spacing-3);
   ```

### Iconography (아이콘)

#### OpenAI 가이드라인 요구사항
- ✅ **시스템 아이콘 사용 우선**
- ✅ **단색, 아웃라인 스타일 커스텀 디자인**
- ✅ **모든 이미지 alt text 필수**
- ✅ **왜곡 방지 aspect ratio 강제**

#### 개선 사항
1. **Icon 컴포넌트 개발** (우선순위: 🔴 HIGH)
   ```tsx
   <Icon.Root
     name="arrow-right"
     size="md"
     color="currentColor"
     aria-label="다음"
   />
   ```
   - **스타일**: 단색, 아웃라인
   - **크기**: sm(16px), md(20px), lg(24px)

2. **Image 컴포넌트 개선** (우선순위: 🟡 MEDIUM)
   ```tsx
   <Image.Root
     src="..."
     alt="필수"  // 빈 문자열 불허
     aspectRatio="16/9"  // 왜곡 방지
     loading="lazy"
   />
   ```

### Accessibility (접근성)

#### 현재 Lyra UI 접근성 지원
- ✅ ARIA 속성
- ✅ 키보드 네비게이션
- ✅ Focus 관리
- ⚠️ 대비율 검증 미흡

#### OpenAI 가이드라인 요구사항
- 🔴 **WCAG AA 대비율 최소값 준수** (4.5:1 for text)
- 🔴 **텍스트 크기 조정 지원** (레이아웃 깨짐 없이)

#### 개선 사항
1. **색상 대비율 검증 시스템** (우선순위: 🔴 HIGH)
   ```bash
   # 설치
   pnpm add -D @a11y/color-contrast

   # Storybook 통합
   # .storybook/preview.ts
   export const parameters = {
     a11y: {
       config: {
         rules: [
           { id: 'color-contrast', enabled: true },
         ],
       },
     },
   };
   ```

2. **텍스트 크기 조정 테스트** (우선순위: 🟡 MEDIUM)
   ```css
   /* 반응형 타이포그래피 */
   .Component {
     font-size: clamp(
       var(--font-size-sm),   /* 최소 */
       var(--font-size-base), /* 기본 */
       var(--font-size-lg)    /* 최대 */
     );
   }
   ```

3. **ScreenReaderOnly 유틸리티** (우선순위: 🟡 MEDIUM)
   ```tsx
   <ScreenReaderOnly>
     추가 컨텍스트 정보
   </ScreenReaderOnly>
   ```
   ```css
   .ScreenReaderOnly {
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

---

## 🔄 기존 컴포넌트 개선 방향

### 1. Button
**현재 상태**: OpenAI 가이드라인 대부분 준수

**개선 사항**:
- 🟡 **최대 액션 수 제한**: Inline Card에서 2개로 제한 (variant 추가)
- 🟡 **터치 타겟 크기**: 최소 44x44px 보장 (모바일)

```tsx
// 개선안
<Card.Root>
  <Card.Actions maxActions={2}>
    <Button variant="primary">주요 액션</Button>
    <Button variant="secondary">보조 액션</Button>
    {/* 3번째 버튼은 자동으로 숨김 처리 */}
  </Card.Actions>
</Card.Root>
```

### 2. Dialog
**현재 상태**: Base UI 기반, 복잡한 워크플로우 지원

**개선 사항**:
- 🔴 **단순성 강화**: 기본 템플릿에서 최대 2개 액션으로 제한
- 🟡 **대화 컨텍스트 유지**: ChatSheet 통합 옵션 제공

```tsx
// 개선안: SimpleDialog
<Dialog.Simple
  title="확인"
  description="정말 삭제하시겠습니까?"
  actions={{
    primary: { label: "삭제", onClick: handleDelete },
    secondary: { label: "취소", onClick: handleCancel },
  }}
/>
```

### 3. Toast
**현재 상태**: Sonner 기반, 우수한 UX

**개선 사항**:
- 🟡 **대화 흐름 통합**: ChatGPT 메시지 스타일 옵션 추가
- 🟢 **컨텍스트 기반 알림**: 사용자 의도 연결 패턴

```tsx
// 개선안: 컨텍스트 기반 알림
toast.contextual({
  message: "주문이 준비되었습니다",
  context: "user-order-123",
  actions: [
    { label: "확인", onClick: handleView },
  ],
});
```

### 4. Select
**현재 상태**: Base UI 기반

**개선 사항**:
- 🟡 **간결한 옵션 표시**: 긴 리스트는 검색 기능 추가
- 🟢 **컨텍스트 기반 기본값**: 사용자 이전 선택 기억

### 5. Progress
**현재 상태**: 정적 진행률 표시

**개선 사항**:
- 🔴 **스트리밍 인디케이터**: 실시간 AI 응답 표시
- 🟡 **예상 완료 시간**: 남은 시간 표시 옵션

```tsx
// 개선안
<Progress.Streaming
  value={75}
  estimatedTime="약 2초 남음"
  label="응답 생성 중..."
/>
```

---

## ➕ 신규 컴포넌트 요구사항

### 우선순위 🔴 HIGH

#### 1. Card (Inline 모드)
**목적**: ChatGPT 대화 내 가벼운 정보 표시

**API 설계**:
```tsx
interface CardRootProps {
  /** 최대 높이 제한 (동적 높이) */
  maxHeight?: string;
  /** 깊은 네비게이션 방지 */
  navigation?: "disabled" | "shallow";
}

interface CardActionsProps {
  /** 최대 액션 수 (OpenAI: 2개) */
  maxActions?: 1 | 2;
}

// 사용 예시
<Card.Root>
  <Card.Media src="..." alt="필수" />
  <Card.Header>
    <Card.Title>제목</Card.Title>
    <Card.Metadata lines={3}>
      메타데이터 최대 3줄
    </Card.Metadata>
  </Card.Header>
  <Card.Actions maxActions={2}>
    <Button>주요 액션</Button>
    <Button>보조 액션</Button>
  </Card.Actions>
</Card.Root>
```

**제약사항**:
- ✅ 최대 2개 주요 액션
- ✅ 깊은 네비게이션/중첩 스크롤 금지
- ✅ 동적 높이 (콘텐츠 따라 조정)

#### 2. Carousel
**목적**: 여러 항목 나란히 표시 (3-8개)

**API 설계**:
```tsx
interface CarouselRootProps {
  /** 항목 수 제한 */
  minItems?: number; // 기본: 3
  maxItems?: number; // 기본: 8
  /** 자동 스크롤 */
  autoScroll?: boolean;
}

// 사용 예시
<Carousel.Root minItems={3} maxItems={8}>
  <Carousel.Viewport>
    {items.map(item => (
      <Carousel.Item key={item.id}>
        <Card.Root>...</Card.Root>
      </Carousel.Item>
    ))}
  </Carousel.Viewport>
  <Carousel.Controls>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Controls>
  <Carousel.Indicators />
</Carousel.Root>
```

**제약사항**:
- ✅ 3-8개 항목
- ✅ 각 카드: 이미지 + 제목 + 메타데이터(최대 3줄) + 선택적 CTA

#### 3. Icon
**목적**: 시스템 아이콘 표준화

**API 설계**:
```tsx
interface IconProps {
  /** 아이콘 이름 */
  name: string;
  /** 크기 */
  size?: "sm" | "md" | "lg"; // 16px, 20px, 24px
  /** 색상 (currentColor 기본) */
  color?: string;
  /** 접근성 레이블 */
  "aria-label"?: string;
  /** 스타일 */
  variant?: "outline" | "solid";
}

// 사용 예시
<Icon
  name="arrow-right"
  size="md"
  aria-label="다음"
/>
```

**요구사항**:
- ✅ 단색, 아웃라인 스타일
- ✅ 시스템 아이콘 우선
- ✅ SVG 기반 (확장성)

### 우선순위 🟡 MEDIUM

#### 4. ChatSheet (Fullscreen 모드)
**목적**: 복잡한 워크플로우 몰입형 경험

**API 설계**:
```tsx
interface ChatSheetRootProps {
  /** ChatGPT composer 오버레이 활성화 */
  composer?: boolean;
  /** 스트리밍 인디케이터 */
  streaming?: boolean;
}

// 사용 예시
<ChatSheet.Root composer streaming>
  <ChatSheet.Content>
    {/* 전체 화면 콘텐츠 */}
  </ChatSheet.Content>
  <ChatSheet.Composer>
    {/* 지속적인 ChatGPT composer */}
  </ChatSheet.Composer>
  <ChatSheet.StreamingIndicator />
</ChatSheet.Root>
```

#### 5. Image
**목적**: 이미지 표시 표준화

**API 설계**:
```tsx
interface ImageProps {
  /** 이미지 소스 */
  src: string;
  /** alt 필수 (빈 문자열 불허) */
  alt: string;
  /** 왜곡 방지 */
  aspectRatio?: "1/1" | "16/9" | "4/3";
  /** 지연 로딩 */
  loading?: "lazy" | "eager";
}

// 사용 예시
<Image
  src="..."
  alt="제품 이미지"
  aspectRatio="16/9"
  loading="lazy"
/>
```

#### 6. Skeleton
**목적**: 로딩 상태 표시

**API 설계**:
```tsx
// 사용 예시
<Skeleton.Root>
  <Skeleton.Avatar />
  <Skeleton.Text lines={3} />
  <Skeleton.Button />
</Skeleton.Root>
```

#### 7. ScreenReaderOnly
**목적**: 스크린 리더 전용 콘텐츠

**API 설계**:
```tsx
<ScreenReaderOnly>
  추가 컨텍스트 정보
</ScreenReaderOnly>
```

### 우선순위 🟢 LOW

#### 8. FloatingWindow (PiP)
**목적**: 병렬 활동 지속적 표시

#### 9. Canvas
**목적**: 편집 캔버스, 맵 등 복잡한 인터랙션

#### 10. ContextualPrompt
**목적**: 사용자 의도 기반 제안

---

## 📐 아키텍처 개선안

### 1. 컴포넌트 분류 체계

#### 기존 분류
```
components/
├── button/
├── checkbox/
├── dialog/
└── ...
```

#### 개선안: OpenAI 모드별 분류
```
components/
├── core/              # 범용 컴포넌트
│   ├── button/
│   ├── checkbox/
│   └── switch/
├── inline/            # Inline 모드 전용
│   ├── card/
│   ├── carousel/
│   └── compact-dialog/
├── fullscreen/        # Fullscreen 모드 전용
│   ├── chat-sheet/
│   └── canvas/
├── pip/               # PiP 모드 전용
│   └── floating-window/
├── feedback/          # 피드백 컴포넌트
│   ├── toast/
│   ├── progress/
│   └── skeleton/
└── utilities/         # 유틸리티
    ├── icon/
    ├── image/
    └── screen-reader-only/
```

**장점**:
- 명확한 사용 목적
- OpenAI 가이드라인 직접 매핑
- 팀 협업 효율성 향상

### 2. 디자인 토큰 확장

#### 현재 토큰 구조
```css
:root {
  /* Spacing */
  --spacing-1: 4px;
  --spacing-4: 16px;

  /* Colors */
  --color-primary: var(--color-blue-600);
  --color-text-primary: var(--color-gray-900);
}
```

#### 개선안: OpenAI 특화 토큰
```css
:root {
  /* === 기존 토큰 유지 === */

  /* === OpenAI Inline 모드 토큰 === */
  --inline-card-padding: var(--spacing-4);
  --inline-card-gap: var(--spacing-3);
  --inline-card-border-radius: var(--border-radius-md);
  --inline-card-max-actions: 2;
  --inline-carousel-min-items: 3;
  --inline-carousel-max-items: 8;

  /* === OpenAI Fullscreen 모드 토큰 === */
  --fullscreen-composer-height: 80px;
  --fullscreen-streaming-indicator-size: 24px;

  /* === OpenAI 접근성 토큰 === */
  --a11y-min-contrast-ratio: 4.5; /* WCAG AA */
  --a11y-min-touch-target: 44px;
  --a11y-focus-outline-width: 2px;
  --a11y-focus-outline-color: var(--color-primary);
}
```

### 3. 접근성 검증 시스템

#### 자동화된 검증
```bash
# Storybook Addon A11y 설정
# .storybook/preview.ts
export const parameters = {
  a11y: {
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'label', enabled: true },
        { id: 'aria-required-attr', enabled: true },
      ],
    },
  },
};
```

#### CI/CD 통합
```yaml
# .github/workflows/a11y.yml
name: Accessibility Check
on: [pull_request]
jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build-storybook
      - run: pnpm test-storybook --browsers chromium
```

### 4. 컴포넌트 템플릿 생성기

#### Plop 템플릿 도입
```bash
pnpm dlx plop component

? Component name: MyComponent
? Component type: (Use arrow keys)
❯ Core (범용)
  Inline (Inline 모드)
  Fullscreen (Fullscreen 모드)
  PiP (PiP 모드)
  Feedback (피드백)
  Utility (유틸리티)

? OpenAI compliant: Yes
✔ Component created at src/components/inline/my-component/
```

**생성되는 파일**:
- `my-component.tsx` (OpenAI 제약사항 주석 포함)
- `my-component.module.css` (시스템 토큰만 사용)
- `my-component.test.tsx` (접근성 테스트 포함)
- `my-component.stories.tsx` (A11y addon 활성화)

---

## 🛣️ 구현 로드맵

### Phase 1: 기반 강화 (2-3주)
**목표**: OpenAI 표준 준수 기반 구축

#### Week 1-2: 색상 & 접근성
- [ ] 색상 오버라이드 검증 및 제거
- [ ] WCAG AA 대비율 검증 시스템 구축
- [ ] Storybook A11y addon 통합
- [ ] 모든 컴포넌트 대비율 검증
- [ ] ScreenReaderOnly 유틸리티 개발

#### Week 3: 타이포그래피 & 레이아웃
- [ ] 플랫폼별 폰트 스택 구현
- [ ] Border Radius 표준화
- [ ] 텍스트 크기 조정 테스트

### Phase 2: Inline 모드 컴포넌트 (3-4주)
**목표**: ChatGPT 대화 내 통합 컴포넌트 완성

#### Week 4-5: 핵심 컴포넌트
- [ ] Card 컴포넌트 개발
  - Card.Root
  - Card.Media
  - Card.Header (Title, Metadata)
  - Card.Actions (최대 2개 제한)
- [ ] Icon 컴포넌트 개발
  - 시스템 아이콘 세트 구축
  - 단색/아웃라인 스타일

#### Week 6-7: 고급 컴포넌트
- [ ] Carousel 컴포넌트 개발
  - Carousel.Root (3-8개 항목 제한)
  - Carousel.Viewport
  - Carousel.Item
  - Carousel.Controls
  - Carousel.Indicators
- [ ] Image 컴포넌트 개선
  - alt 필수 검증
  - aspect ratio 강제
  - 지연 로딩 지원

### Phase 3: 기존 컴포넌트 개선 (2-3주)
**목표**: OpenAI 가이드라인 정렬

#### Week 8-9
- [ ] Button: 터치 타겟 크기 보장 (44x44px)
- [ ] Dialog: SimpleDialog 템플릿 추가
- [ ] Toast: 컨텍스트 기반 알림 패턴
- [ ] Progress: 스트리밍 인디케이터 추가
- [ ] Select: 검색 기능 추가

### Phase 4: Fullscreen & 피드백 (2-3주)
**목표**: 복잡한 워크플로우 지원

#### Week 10-11
- [ ] ChatSheet 컴포넌트 개발
  - ChatSheet.Root
  - ChatSheet.Content
  - ChatSheet.Composer
  - ChatSheet.StreamingIndicator
- [ ] Skeleton 컴포넌트 개발
  - Skeleton.Root
  - Skeleton.Avatar
  - Skeleton.Text
  - Skeleton.Button

### Phase 5: 문서화 & 검증 (1-2주)
**목표**: OpenAI 가이드라인 준수 검증

#### Week 12-13
- [ ] 모든 컴포넌트 Storybook 문서 업데이트
- [ ] OpenAI 가이드라인 체크리스트 작성
- [ ] 접근성 감사 실행
- [ ] 성능 벤치마크
- [ ] 마이그레이션 가이드 작성

---

## 📊 성공 지표

### 기술적 지표
- ✅ **접근성**: 모든 컴포넌트 WCAG AA 준수 (100%)
- ✅ **색상 대비율**: 텍스트 4.5:1 이상 (100%)
- ✅ **터치 타겟**: 모바일 44x44px 이상 (100%)
- ✅ **번들 크기**: 현재 대비 +10% 이내 (≤55KB gzipped)

### OpenAI 가이드라인 준수
- ✅ **Inline Card**: 최대 2개 액션, 깊은 네비게이션 없음
- ✅ **Carousel**: 3-8개 항목 제한
- ✅ **시스템 스타일**: 커스텀 오버라이드 0건
- ✅ **플랫폼 폰트**: iOS/Android 네이티브 폰트 사용

### 개발자 경험
- ✅ **컴포넌트 템플릿**: Plop 생성기로 5분 내 컴포넌트 생성
- ✅ **문서화**: 모든 컴포넌트 Storybook 예시 + OpenAI 가이드라인 참조
- ✅ **타입 안전성**: TypeScript strict 모드 100%

---

## 🔍 리스크 & 완화 전략

### 리스크 1: 기존 컴포넌트 호환성
**문제**: OpenAI 제약사항이 기존 사용 사례와 충돌

**완화**:
- 별도 네임스페이스 제공 (`Card.Inline` vs `Card.Standard`)
- 점진적 마이그레이션 가이드
- Deprecation 경고 시스템

### 리스크 2: 번들 크기 증가
**문제**: 신규 컴포넌트 추가로 번들 크기 증가

**완화**:
- Tree-shaking 최적화
- 코드 스플리팅 (React.lazy)
- 중복 제거 (공통 유틸리티)

### 리스크 3: 접근성 검증 복잡도
**문제**: 수동 검증 시간 소모

**완화**:
- Storybook A11y addon 자동화
- CI/CD 통합 검증
- 월간 접근성 감사

---

## 📚 참고 자료

### OpenAI
- [Apps SDK Design Guidelines](https://developers.openai.com/apps-sdk/concepts/design-guidelines)
- Figma 컴포넌트 라이브러리

### 접근성
- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Lyra UI
- [Technical Patterns](/.serena/memories/lyra_ui_technical_patterns)
- [Project Context](/.serena/memories/lyra_ui_project_context)

---

## ✅ 다음 단계

1. **우선순위 검토**: 팀과 Phase 1-5 우선순위 조정
2. **리소스 할당**: 각 Phase별 담당자 배정
3. **킥오프**: Phase 1 색상 & 접근성 작업 시작
4. **주간 체크인**: OpenAI 가이드라인 준수 진행 상황 공유

---

**작성자**: Claude (Serena MCP)
**검토 필요**: 팀 리드, 디자이너, 접근성 전문가
