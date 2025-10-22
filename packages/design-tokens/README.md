# @lyra/design-tokens

W3C DTCG 표준을 준수하는 Lyra 디자인 시스템의 Primitive 디자인 토큰 패키지입니다.

## 📦 Installation

```bash
pnpm add @lyra/design-tokens
```

## 🎯 Philosophy

이 패키지는 **Primitive 토큰만** 제공합니다. Semantic 레이어(예: `color-bg-primary`, `color-text-default`)는 각 플랫폼(Web, iOS, Android 등)에서 정의하세요.

### Why Primitive-First?

- ✅ **멀티플랫폼 지원**: 각 플랫폼의 네이밍 컨벤션에 맞춰 사용 가능
- ✅ **유연성**: 플랫폼별로 다른 semantic 의미 부여 가능
- ✅ **유지보수성**: 한 곳에서 primitive 값만 관리

## 📚 Token Categories

### 1. Size (2px 단위 체계)
```css
--size-0: 0px
--size-px: 1px
--size-1: 2px    (0.125rem)
--size-2: 4px    (0.25rem)
--size-4: 8px    (0.5rem)
--size-8: 16px   (1rem)
--size-12: 24px  (1.5rem)
--size-16: 32px  (2rem)
--size-24: 48px  (3rem)
--size-32: 64px  (4rem)
```

**Icon Sizes**:
```css
--size-icon-sm: 16px  (var(--size-8))
--size-icon-md: 20px  (var(--size-10))
--size-icon-lg: 24px  (var(--size-12))
```

### 2. Colors (7 Palettes × 11 Shades)
각 컬러는 50~950까지 11개 shade 제공 (50이 가장 밝고, 950이 가장 어두움)

```css
/* Gray Scale */
--color-gray-50: oklch(0.984 0.003 247.858)
--color-gray-500: oklch(0.554 0.046 257.417)
--color-gray-950: oklch(0.129 0.042 264.695)

/* Brand Colors */
--color-blue-{50-950}
--color-red-{50-950}
--color-green-{50-950}
--color-yellow-{50-950}
--color-orange-{50-950}
--color-purple-{50-950}
--color-pink-{50-950}
```

### 3. Typography

**Font Families**:
```css
--font-family-sans: system-ui, -apple-system, ...
--font-family-mono: 'Menlo', 'Monaco', ...
```

**Font Sizes** (모두 size 토큰 참조):
```css
--font-size-sm: 14px   (var(--size-7))
--font-size-base: 16px (var(--size-8))
--font-size-lg: 18px   (var(--size-9))
--font-size-xl: 20px   (var(--size-10))
--font-size-2xl: 24px  (var(--size-12))
```

**Font Weights**:
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
```

**Line Heights**:
```css
--font-line-height-tight: 1.25   (제목용)
--font-line-height-normal: 1.5   (본문용)
```

### 4. Borders

**Widths** (size 토큰 참조):
```css
--border-width-0: 0px (var(--size-0))
--border-width-1: 1px (var(--size-px))
--border-width-2: 2px (var(--size-1))
--border-width-4: 4px (var(--size-2))
```

**Radius** (size 토큰 참조):
```css
--border-radius-none: 0px      (var(--size-0))
--border-radius-sm: 4px        (var(--size-2))
--border-radius-md: 8px        (var(--size-4))
--border-radius-full: 9999px   (pill/circle)
```

### 5. Shadows

```css
--shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1), ...
--shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1), ...
--shadow-inner: inset 0 2px 4px 0 oklch(0 0 0 / 0.05)
```

### 6. Animation

**Durations**:
```css
--duration-instant: 0ms
--duration-fast: 100ms
--duration-base: 200ms
--duration-moderate: 300ms
--duration-slow: 500ms
```

**Easing**:
```css
--easing-linear: linear
--easing-ease: ease
--easing-ease-in: ease-in
--easing-ease-out: ease-out
--easing-ease-in-out: ease-in-out
```

### 7. Z-Index (레이어 시스템)

```css
--z-index-base: 0           /* 기본 레이어 */
--z-index-dropdown: 1000    /* 드롭다운, 팝오버 */
--z-index-sticky: 1100      /* Sticky 요소 */
--z-index-overlay: 1200     /* 오버레이 배경 */
--z-index-modal: 1300       /* 모달, 다이얼로그 */
--z-index-popover: 1400     /* 팝오버 (모달 위) */
--z-index-tooltip: 1500     /* 툴팁 */
--z-index-notification: 1600 /* 토스트, 알림 */
```

### 8. Breakpoints (반응형 디자인)

```css
--breakpoint-sm: 640px   /* Small devices (mobile landscape) */
--breakpoint-md: 768px   /* Medium devices (tablets) */
--breakpoint-lg: 1024px  /* Large devices (desktops) */
--breakpoint-xl: 1280px  /* Extra large devices (large desktops) */
--breakpoint-2xl: 1536px /* 2X large devices (ultra-wide) */
```

**Media Query 사용 예**:
```css
@media (min-width: var(--breakpoint-md)) {
  /* Tablet and above */
}

@media (min-width: var(--breakpoint-lg)) {
  /* Desktop and above */
}
```

## 💻 Usage

### CSS
```css
@import "@lyra/design-tokens/css";

.my-component {
  /* ✅ Good: Primitive 토큰 직접 사용 */
  padding: var(--size-4);
  background: var(--color-blue-500);
  border-radius: var(--border-radius-md);

  /* ✅ Good: Semantic 레이어는 프로젝트에서 정의 */
  --color-bg-primary: var(--color-blue-500);
  background: var(--color-bg-primary);
}
```

### JavaScript/TypeScript
```typescript
import tokens from '@lyra/design-tokens/js';

const primaryColor = tokens.ColorBlue500; // "oklch(0.623 0.214 249.816)"
const baseSize = tokens.Size8;            // "1rem"
```

### JSON
```typescript
import tokens from '@lyra/design-tokens/json';

const allTokens = tokens; // { Size0: "0", Size1: "0.125rem", ... }
```

## 🎨 Creating Semantic Layers

각 플랫폼에서 semantic 토큰을 정의하세요:

### Web (CSS)
```css
:root {
  /* Surface colors */
  --color-bg-surface-default: var(--color-gray-50);
  --color-bg-surface-subdued: var(--color-gray-100);

  /* Brand colors */
  --color-bg-primary-default: var(--color-blue-500);
  --color-bg-primary-hover: var(--color-blue-600);

  /* Text colors */
  --color-text-default: var(--color-gray-900);
  --color-text-subdued: var(--color-gray-600);
}

[data-theme="dark"] {
  --color-bg-surface-default: var(--color-gray-900);
  --color-text-default: var(--color-gray-50);
}
```

### iOS (Swift)
```swift
extension Color {
    static let surfaceDefault = Color(palette.gray.shade50)
    static let surfaceDefaultDark = Color(palette.gray.shade900)

    static let textDefault = Color(palette.gray.shade900)
    static let textDefaultDark = Color(palette.gray.shade50)
}
```

### Android (Kotlin/Compose)
```kotlin
object AppColors {
    val surfaceDefault = palette.gray.shade50
    val surfaceDefaultDark = palette.gray.shade900

    val textDefault = palette.gray.shade900
    val textDefaultDark = palette.gray.shade50
}
```

## 🔧 Development

```bash
# Build tokens
pnpm build

# Build Figma Tokens config
pnpm build:figma

# Watch mode (파일 변경 시 자동 빌드)
pnpm dev

# Clean output
pnpm clean
```

**Watch Mode**: 토큰 파일을 수정하면 자동으로 재빌드됩니다.
```bash
pnpm dev
# 👀 Watching for changes...
# 📝 Change detected: colors/primitives.json
# 🎨 Building primitive design tokens...
```

## 🎨 Figma Integration

이 패키지는 **Figma Tokens (Tokens Studio)** 플러그인과 완벽하게 호환됩니다.

### Setup

1. Figma Tokens 플러그인 설치
2. 프로젝트 루트의 `$tokens.json` 파일을 Figma Tokens에 연결
3. 토큰 자동 동기화

```bash
# Figma Tokens 파일 생성
pnpm build:figma
```

### Sync Workflow

1. **디자인 → 코드**: Figma에서 토큰 변경 후 `$tokens.json` 내보내기
2. **코드 → 디자인**: 토큰 파일 수정 후 `pnpm build:figma` 실행

### Token Sets

- `primitives/size` - 2px 단위 체계
- `primitives/colors` - 7개 컬러 팔레트
- `primitives/typography` - 폰트 관련 토큰
- `primitives/borders` - 테두리 스타일
- `primitives/shadows` - 그림자 효과
- `primitives/animation` - 애니메이션 타이밍
- `primitives/z-index` - 레이어 시스템
- `primitives/breakpoints` - 반응형 디자인

## 📖 Token Structure (DTCG Format)

모든 토큰은 W3C DTCG 표준을 따릅니다:

```json
{
  "size": {
    "4": {
      "$value": "0.5rem",
      "$type": "dimension",
      "$description": "8px"
    }
  }
}
```

## 🔗 Token References

토큰은 다른 토큰을 참조할 수 있습니다:

```json
{
  "font": {
    "size": {
      "base": {
        "$value": "{size.8}",
        "$type": "dimension"
      }
    }
  }
}
```

빌드 시 자동으로 CSS 변수로 변환됩니다:
```css
--font-size-base: var(--size-8);
```

## 📊 Token Count

- **Total**: 156 tokens
- **Size**: 21 tokens (0~64px scale + icon sizes)
- **Colors**: 77 tokens (7 palettes × 11 shades)
- **Typography**: 11 tokens
- **Borders**: 8 tokens
- **Shadows**: 4 tokens
- **Animation**: 9 tokens
- **Z-Index**: 8 tokens (layering system)
- **Breakpoints**: 5 tokens (responsive design)

## 🎯 Design Decisions

### 2px Unit System
모든 size 토큰은 2px 단위로 증가하여 일관된 spacing rhythm을 제공합니다.

### OKLCH Color Space
모든 색상은 OKLCH 색공간을 사용하여 지각적으로 균일한 그라데이션을 제공합니다.

### Reference-Based Architecture
토큰 간 참조를 통해 Single Source of Truth를 유지하고 유지보수성을 높입니다.

## 📝 License

MIT
