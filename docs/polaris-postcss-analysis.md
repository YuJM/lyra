# Shopify Polaris React - PostCSS 설정 분석

> 분석 대상: `/Users/yujongmyeong/Documents/dev/polaris-react/polaris-react`
> 버전: @shopify/polaris v13.10.1
> 분석 날짜: 2025-10-21

## 📋 목차

1. [개요](#개요)
2. [설정 구조](#설정-구조)
3. [PostCSS 플러그인 상세](#postcss-플러그인-상세)
4. [Custom Mixins 시스템](#custom-mixins-시스템)
5. [의존성 목록](#의존성-목록)
6. [사용 예제](#사용-예제)
7. [우리 프로젝트 적용 가이드](#우리-프로젝트-적용-가이드)

---

## 개요

Shopify Polaris는 엔터프라이즈급 React 컴포넌트 라이브러리로, 고도로 최적화된 PostCSS 파이프라인을 사용합니다. 이 문서는 Polaris의 PostCSS 설정을 분석하고 우리 프로젝트에 적용 가능한 패턴을 추출합니다.

### 주요 특징

- **모듈화된 설정 구조**: 설정이 별도 파일로 분리되어 유지보수 용이
- **Custom Mixins 시스템**: 재사용 가능한 CSS 패턴을 JS/CSS로 정의
- **Design Token 통합**: @shopify/polaris-tokens와 완전한 통합
- **최신 CSS 기능**: Nesting, Custom Media 등 최신 CSS 스펙 지원

---

## 설정 구조

### 파일 구조

```
polaris-react/
├── postcss.config.mjs           # PostCSS 진입점
├── config/
│   └── postcss-plugins.js       # 플러그인 설정
└── postcss-mixins/              # Custom Mixins (23개)
    ├── focus-ring.js            # JavaScript 기반 mixin
    ├── truncate.css             # CSS 기반 mixin
    ├── button-base.css
    ├── control-backdrop.js
    └── ...
```

### 진입점 (`postcss.config.mjs`)

```javascript
import postcssPlugins from './config/postcss-plugins.js';

const config = {
  plugins: postcssPlugins,
};

export default config;
```

**특징**:
- ESM 형식 사용 (`.mjs`)
- 플러그인 설정을 별도 파일로 분리하여 관심사 분리

---

## PostCSS 플러그인 상세

### 플러그인 실행 순서

Polaris의 PostCSS 파이프라인은 **순서가 매우 중요**합니다. 다음 순서대로 실행됩니다:

```javascript
// config/postcss-plugins.js
module.exports = [
  // 1. postcss-import
  postcssImport(),

  // 2. postcss-mixins
  postcssMixins({
    mixinsDir: path.join(__dirname, '../postcss-mixins'),
  }),

  // 3. postcss-nesting
  postcssNesting({
    noIsPseudoSelector: true,  // SASS 호환성
  }),

  // 4. postcss-global-data
  postcssGlobalData({
    files: [mediaQueriesCssPath],  // polaris-tokens의 media-queries.css
  }),

  // 5. postcss-custom-media
  postcssCustomMedia(),

  // 6. @shopify/postcss-plugin
  postcssShopify,

  // 7. postcss-pxtorem
  pxtorem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),

  // 8. postcss-discard-comments
  postcssDiscardComments(),
];
```

### 1. **postcss-import** (^16.1.1)

**목적**: `@import` 문을 인라인으로 번들링

```css
/* 원본 */
@import "modern-normalize/modern-normalize.css";

/* 결과 */
/* modern-normalize의 전체 내용이 인라인으로 삽입됨 */
```

**설정**: 기본 옵션 사용

**위치**: 반드시 **첫 번째**로 실행되어야 함 (다른 플러그인이 import된 파일을 처리할 수 있도록)

---

### 2. **postcss-mixins** (^9.0.4)

**목적**: 재사용 가능한 CSS 패턴을 mixin으로 정의

**설정**:
```javascript
postcssMixins({
  mixinsDir: path.join(__dirname, '../postcss-mixins'),
})
```

**지원 형식**:
1. **CSS 기반 Mixin** (`.css`)
2. **JavaScript 기반 Mixin** (`.js`)

**CSS Mixin 예제** (`truncate.css`):
```css
@define-mixin truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

**사용법**:
```css
.my-text {
  @mixin truncate;
}
```

**JavaScript Mixin 예제** (`focus-ring.js`):
```javascript
module.exports = (_, size, borderWidth, style) => {
  // 파라미터 기본값 처리
  const resolvedSize = size || 'base';

  return {
    position: 'relative',
    '&::after': {
      content: "''",
      boxShadow: '0 0 0 2px var(--p-color-border-focus)',
      borderRadius: resolvedSize === 'wide'
        ? 'var(--p-border-radius-200)'
        : 'var(--p-border-radius-100)',
    },
  };
};
```

**사용법**:
```css
.button {
  @mixin focus-ring base, 0, base;
}

.button:focus {
  @mixin focus-ring base, 0, focused;
}
```

---

### 3. **postcss-nesting** (^12.0.2)

**목적**: 최신 CSS Nesting 스펙 지원 (SASS-like 중첩)

**설정**:
```javascript
postcssNesting({
  noIsPseudoSelector: true,  // 중요!
})
```

**`noIsPseudoSelector: true`의 의미**:

기본 CSS Nesting은 복잡한 셀렉터를 `:is()`로 래핑하지만, SASS와의 호환성을 위해 이를 비활성화합니다.

```css
/* 원본 */
.parent {
  &.active,
  &.hover {
    color: blue;
  }
}

/* noIsPseudoSelector: false (기본 CSS 동작) */
:is(.parent.active, .parent.hover) {
  color: blue;
}

/* noIsPseudoSelector: true (SASS 동작) */
.parent.active,
.parent.hover {
  color: blue;
}
```

**사용 예제**:
```css
.button {
  padding: 1rem;

  &:hover {
    background: blue;
  }

  &--large {
    padding: 2rem;
  }

  .icon {
    margin-right: 0.5rem;
  }
}
```

---

### 4. **postcss-global-data** (@csstools 2.1.0)

**목적**: 모든 CSS 파일에 전역 데이터(변수, custom media 등) 주입

**설정**:
```javascript
const mediaQueriesCssPath = require.resolve(
  '@shopify/polaris-tokens/css/media-queries.css',
);

postcssGlobalData({
  files: [mediaQueriesCssPath],
})
```

**효과**: 모든 CSS 파일에서 Polaris의 media query를 사용 가능

```css
/* media-queries.css의 내용 (자동 주입됨) */
@custom-media --p-breakpoint-sm (min-width: 30em);
@custom-media --p-breakpoint-md (min-width: 48em);
@custom-media --p-breakpoint-lg (min-width: 64em);

/* 어떤 CSS 파일에서도 사용 가능 */
@media (--p-breakpoint-md) {
  .container {
    max-width: 1200px;
  }
}
```

---

### 5. **postcss-custom-media** (^10.0.1)

**목적**: `@custom-media` 문법을 실제 미디어 쿼리로 변환

```css
/* 원본 */
@custom-media --small-viewport (max-width: 30em);

.sidebar {
  display: block;
}

@media (--small-viewport) {
  .sidebar {
    display: none;
  }
}

/* 결과 */
.sidebar {
  display: block;
}

@media (max-width: 30em) {
  .sidebar {
    display: none;
  }
}
```

---

### 6. **@shopify/postcss-plugin** (^5.0.1)

**목적**: Shopify 전용 PostCSS 플러그인 (Polaris 토큰 처리 등)

**기능**:
- Design token 변환
- Polaris 특화 최적화
- 내부 변환 로직

**설정**: 기본 옵션 사용

---

### 7. **postcss-pxtorem** (^6.0.0)

**목적**: `px` 단위를 `rem` 단위로 자동 변환 (접근성 향상)

**설정**:
```javascript
pxtorem({
  rootValue: 16,      // 1rem = 16px
  replace: true,      // 원본 px를 rem으로 교체
  propList: ['*'],    // 모든 속성에 적용
})
```

**변환 예제**:
```css
/* 원본 */
.button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
}

/* 결과 */
.button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}
```

**장점**:
- 사용자가 브라우저 기본 폰트 크기를 변경해도 비율 유지
- 접근성 개선
- 일관된 스케일 시스템

---

### 8. **postcss-discard-comments** (^6.0.1)

**목적**: CSS 주석 제거 (프로덕션 최적화)

```css
/* 원본 */
/* This is a comment */
.button {
  color: blue; /* inline comment */
}

/* 결과 */
.button {
  color: blue;
}
```

**설정**: 기본 옵션 (모든 주석 제거)

---

## Custom Mixins 시스템

Polaris는 23개의 custom mixin을 정의하여 코드 재사용성을 극대화합니다.

### Mixin 목록

| Mixin 파일 | 타입 | 용도 |
|------------|------|------|
| `base-button-disabled.css` | CSS | 비활성화된 버튼 스타일 |
| `button-base.css` | CSS | 기본 버튼 스타일 |
| `control-backdrop.js` | JS | 컨트롤 배경 효과 |
| `duplicate.js` | JS | 요소 복제 유틸리티 |
| `focus-ring.js` | JS | 포커스 링 스타일 (파라미터 지원) |
| `items-to-stagger.js` | JS | 스태거 애니메이션 |
| `list-selected-indicator.css` | CSS | 리스트 선택 인디케이터 |
| `no-focus-ring.css` | CSS | 포커스 링 제거 |
| `page-layout.css` | CSS | 페이지 레이아웃 |
| `range-thumb-selectors.js` | JS | Range input thumb 셀렉터 |
| `range-track-selectors.js` | JS | Range input track 셀렉터 |
| `responsive-grid-cells.js` | JS | 반응형 그리드 셀 |
| `responsive-props.js` | JS | 반응형 속성 유틸리티 |
| `safe-area-for.js` | JS | Safe area 처리 |
| `scope-custom-property.js` | JS | CSS 변수 스코프 |
| `shadow-bevel.js` | JS | 그림자 베벨 효과 |
| `text-breakword.css` | CSS | 텍스트 줄바꿈 |
| `text-style-input.css` | CSS | Input 텍스트 스타일 |
| `truncate.css` | CSS | 텍스트 말줄임 |
| `unstyled-button.css` | CSS | 기본 버튼 스타일 제거 |
| `utils.js` | JS | 유틸리티 함수 |
| `visually-hidden.js` | JS | 스크린 리더 전용 숨김 |

### JavaScript vs CSS Mixin

**CSS Mixin** - 단순 스타일 패턴
```css
@define-mixin text-breakword {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
```

**JavaScript Mixin** - 동적 로직 필요
```javascript
// responsive-props.js
module.exports = (_, prop, ...breakpoints) => {
  const styles = {};

  breakpoints.forEach((value, index) => {
    const breakpoint = ['sm', 'md', 'lg', 'xl'][index];
    styles[`@media (--p-breakpoint-${breakpoint})`] = {
      [prop]: value,
    };
  });

  return styles;
};
```

**사용법**:
```css
.container {
  @mixin responsive-props padding, 1rem, 2rem, 3rem, 4rem;
}

/* 결과 */
.container {
  @media (--p-breakpoint-sm) { padding: 1rem; }
  @media (--p-breakpoint-md) { padding: 2rem; }
  @media (--p-breakpoint-lg) { padding: 3rem; }
  @media (--p-breakpoint-xl) { padding: 4rem; }
}
```

---

## 의존성 목록

### PostCSS 관련 의존성 (package.json)

```json
{
  "devDependencies": {
    "@csstools/postcss-global-data": "2.1.0",
    "@shopify/postcss-plugin": "^5.0.1",
    "postcss": "^8.5.6",
    "postcss-custom-media": "^10.0.1",
    "postcss-discard-comments": "^6.0.1",
    "postcss-import": "^16.1.1",
    "postcss-mixins": "^9.0.4",
    "postcss-modules": "^4.2.2",
    "postcss-nesting": "^12.0.2",
    "postcss-pxtorem": "^6.0.0"
  },
  "dependencies": {
    "@shopify/polaris-tokens": "^9.4.2"
  }
}
```

### 각 플러그인 버전 및 용도

| 패키지 | 버전 | 용도 | 필수도 |
|--------|------|------|--------|
| `postcss` | ^8.5.6 | PostCSS 코어 | 필수 |
| `postcss-import` | ^16.1.1 | @import 인라인 번들링 | 필수 |
| `postcss-mixins` | ^9.0.4 | Mixin 시스템 | 권장 |
| `postcss-nesting` | ^12.0.2 | CSS 중첩 지원 | 권장 |
| `postcss-custom-media` | ^10.0.1 | Custom media query | 선택 |
| `@csstools/postcss-global-data` | 2.1.0 | 전역 데이터 주입 | 선택 |
| `postcss-pxtorem` | ^6.0.0 | px → rem 변환 | 권장 |
| `postcss-discard-comments` | ^6.0.1 | 주석 제거 | 선택 |
| `@shopify/postcss-plugin` | ^5.0.1 | Shopify 전용 | Polaris 전용 |

---

## 사용 예제

### 1. Focus Ring 적용

```css
.button {
  @mixin focus-ring;

  &:focus {
    @mixin focus-ring base, 0, focused;
  }
}
```

### 2. 텍스트 말줄임

```css
.product-title {
  @mixin truncate;
  max-width: 200px;
}
```

### 3. 반응형 패딩

```css
.container {
  @mixin responsive-props padding, 1rem, 2rem, 3rem;
}
```

### 4. Custom Media Query

```css
@media (--p-breakpoint-md) {
  .sidebar {
    width: 300px;
  }
}
```

---

## 우리 프로젝트 적용 가이드

### 현재 우리 프로젝트 설정

```javascript
// packages/ui/postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {},
    autoprefixer: {},
  },
};
```

### Polaris에서 배울 점

#### 1. **설정 파일 분리**

**현재**:
```
packages/ui/
└── postcss.config.js  (모든 설정 포함)
```

**개선안** (Polaris 스타일):
```
packages/ui/
├── postcss.config.mjs         (진입점)
└── config/
    └── postcss-plugins.js     (플러그인 설정)
```

**장점**:
- 설정과 플러그인 로직 분리
- 테스트 용이
- 확장성 향상

#### 2. **Custom Mixins 도입**

**추천 Mixin 생성**:

```
packages/ui/postcss-mixins/
├── truncate.css          # 텍스트 말줄임
├── focus-ring.js         # 포커스 스타일
├── visually-hidden.css   # 접근성 숨김
└── button-reset.css      # 버튼 리셋
```

**구현 예제** (`packages/ui/postcss-mixins/focus-ring.js`):
```javascript
module.exports = () => ({
  '&:focus-visible': {
    outline: '2px solid var(--focus-color, #3b82f6)',
    outlineOffset: '2px',
  },
});
```

#### 3. **추가 플러그인 도입 제안**

**우선순위 높음**:
1. **postcss-nesting** - 최신 CSS 중첩 지원
2. **postcss-pxtorem** - 접근성 향상

**우선순위 중간**:
3. **postcss-custom-media** - 반응형 디자인
4. **postcss-mixins** - 코드 재사용성

**우선순위 낮음**:
5. **postcss-discard-comments** - 프로덕션 최적화

### 단계별 적용 계획

#### Phase 1: 기본 최적화
```bash
pnpm add -D postcss-nesting postcss-pxtorem
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {
      noIsPseudoSelector: true,  // SASS 호환
    },
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16,
      replace: true,
      propList: ['*'],
    },
  },
};
```

#### Phase 2: Mixin 시스템
```bash
pnpm add -D postcss-mixins
```

```javascript
// postcss.config.js
const path = require('path');

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-mixins": {
      mixinsDir: path.join(__dirname, 'postcss-mixins'),
    },
    "postcss-nesting": {
      noIsPseudoSelector: true,
    },
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16,
      replace: true,
      propList: ['*'],
    },
  },
};
```

#### Phase 3: 고급 기능
```bash
pnpm add -D postcss-custom-media postcss-discard-comments
```

### 권장 사항

1. **플러그인 순서 엄수**
   - `postcss-import` 항상 첫 번째
   - `autoprefixer` 마지막 변환 단계 전
   - `postcss-discard-comments` 최종 단계

2. **Mixin 네이밍 규칙**
   - 명확한 이름 사용 (예: `truncate`, `focus-ring`)
   - JavaScript mixin은 파라미터 활용
   - CSS mixin은 단순 패턴에만 사용

3. **점진적 도입**
   - 한 번에 모든 플러그인 도입 지양
   - 각 플러그인의 효과를 테스트하며 단계적 적용
   - 빌드 시간 모니터링

4. **문서화**
   - 각 mixin의 사용법 문서화
   - 팀 내 컨벤션 정립
   - 예제 코드 작성

---

## 결론

Shopify Polaris의 PostCSS 설정은 다음과 같은 교훈을 제공합니다:

### 핵심 인사이트

1. **모듈화된 설정 구조**: 유지보수와 확장성 향상
2. **Smart Mixin 시스템**: JavaScript 기반 동적 mixin으로 코드 재사용 극대화
3. **플러그인 순서의 중요성**: 각 플러그인의 역할과 순서를 명확히 이해
4. **접근성 고려**: px→rem 변환으로 사용자 경험 개선
5. **Design Token 통합**: 일관된 디자인 시스템 구축

### 우리 프로젝트 액션 아이템

- [ ] `postcss-nesting` 도입
- [ ] `postcss-pxtorem` 적용
- [ ] Custom mixins 시스템 구축
- [ ] 설정 파일 구조 개선
- [ ] 팀 내 PostCSS 가이드라인 작성

---

## 참고 자료

- [Shopify Polaris GitHub](https://github.com/Shopify/polaris)
- [PostCSS Plugin 목록](https://github.com/postcss/postcss/blob/main/docs/plugins.md)
- [postcss-mixins 문서](https://github.com/postcss/postcss-mixins)
- [postcss-nesting 스펙](https://www.w3.org/TR/css-nesting-1/)

---

**분석자**: Claude Code
**생성일**: 2025-10-21
**버전**: 1.0
