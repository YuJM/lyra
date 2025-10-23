# 색상 토큰 마이그레이션 계획

> 생성일: 2025-10-23
> 작성자: SuperClaude Framework
> 목적: OpenAI Apps SDK 색상 가이드라인 100% 준수를 위한 체계적 마이그레이션
> 기반: claudedocs/color-audit-report.md

---

## 📊 Executive Summary

### 현재 상태
- **OpenAI 색상 준수도**: 65/100 → **목표**: 95/100
- **Gradient 사용**: 17개 → ✅ **0개 (완료)**
- **직접 색상 값**: 4개 → **목표**: 0개
- **브랜드 액센트 분리**: 미완 → **목표**: 명시적 분리

### 마이그레이션 범위
```
Phase 1: ✅ Gradient 제거 (완료)
Phase 2: 🔄 브랜드 액센트 토큰 분리 (진행 중)
Phase 3: ⏳ Collapsible 색상 조정
Phase 4: ⏳ 직접 색상 값 토큰화
Phase 5: ⏳ 최종 검증 및 문서화
```

---

## 🎯 Phase 2: 브랜드 액센트 토큰 분리

### 목표
OpenAI 가이드라인에 따라 브랜드 액센트 색상을 **버튼/아이콘**에만 제한적으로 사용하도록 토큰 구조 개선

### 현재 문제점

#### 1. `--color-primary-*` 과다 사용
```css
/* 현재: primary 토큰이 다양한 용도로 사용됨 */
--color-bg-primary-default: var(--color-blue-600);
--color-bg-primary-hover: var(--color-blue-700);
--color-text-primary: var(--color-gray-900);
--color-primary-solid: var(--color-blue-600);
--color-primary-soft: var(--color-blue-50);
```

**문제**: `primary`라는 이름이 "주요 브랜드 색상"과 "주요 텍스트/배경"을 모두 의미하여 혼란

#### 2. 브랜드 액센트 암묵적 사용
```css
/* 현재: 브랜드 색상이 명시적으로 분리되지 않음 */
.button-primary {
  background: var(--color-bg-primary-default);  /* blue-600 */
}

.icon-brand {
  color: var(--color-blue-600);  /* 직접 참조 */
}
```

**문제**: 어떤 토큰이 "브랜드 액센트"인지 불명확

### 해결 방안

#### 1. 새로운 토큰 아키텍처

```css
/**
 * 색상 토큰 아키텍처 v2.0
 * OpenAI Apps SDK 준수 구조
 */

/* ─────────────────────────────────────────────────────────────
 * 1. 브랜드 액센트 (Brand Accent) - 버튼/아이콘에만 사용
 * ───────────────────────────────────────────────────────────── */
:root {
  /* 사용자가 커스터마이징 가능한 브랜드 색상 */
  --brand-accent: var(--brand-accent-override, oklch(0.55 0.22 263.37)); /* blue-600 */
  --brand-accent-hover: oklch(0.5 0.24 263.37); /* blue-700 */
  --brand-accent-active: oklch(0.45 0.26 263.37); /* blue-800 */

  /* 브랜드 배경 (soft) */
  --brand-bg-soft: oklch(0.97 0.02 263.37); /* blue-50 */
  --brand-bg-subtle: oklch(0.94 0.04 263.37); /* blue-100 */
}

/* ─────────────────────────────────────────────────────────────
 * 2. Surface/Background - 고정 색상 (브랜드 독립적)
 * ───────────────────────────────────────────────────────────── */
:root {
  /* 메인 배경 */
  --color-bg-canvas: oklch(1 0 0); /* 순백 */
  --color-bg-surface: oklch(1 0 0); /* white */
  --color-bg-surface-elevated: oklch(1 0 0); /* white with shadow */

  /* 세컨더리 배경 */
  --color-bg-secondary: oklch(0.98 0 0); /* gray-50 */
  --color-bg-tertiary: oklch(0.96 0 0); /* gray-100 */

  /* 오버레이 */
  --color-bg-overlay: rgba(0, 0, 0, 0.5);
  --color-bg-overlay-light: rgba(0, 0, 0, 0.25);
}

/* ─────────────────────────────────────────────────────────────
 * 3. Text - 고정 색상 (브랜드 독립적)
 * ───────────────────────────────────────────────────────────── */
:root {
  --color-text-primary: oklch(0.2 0 0); /* gray-900 */
  --color-text-secondary: oklch(0.45 0 0); /* gray-600 */
  --color-text-tertiary: oklch(0.65 0 0); /* gray-400 */
  --color-text-disabled: oklch(0.75 0 0); /* gray-300 */
  --color-text-on-accent: oklch(1 0 0); /* white */
}

/* ─────────────────────────────────────────────────────────────
 * 4. Interactive States - 중립 색상 (브랜드 독립적)
 * ───────────────────────────────────────────────────────────── */
:root {
  /* Hover/Active/Focus */
  --color-bg-hover: oklch(0.96 0 0); /* gray-100 */
  --color-bg-active: oklch(0.94 0 0); /* gray-200 */
  --color-bg-selected: oklch(0.96 0 0); /* gray-100 - NOT BLUE! */

  /* Border */
  --color-border-default: oklch(0.88 0 0); /* gray-300 */
  --color-border-hover: oklch(0.75 0 0); /* gray-400 */
  --color-border-focus: var(--brand-accent); /* 예외: focus ring은 브랜드 */
}

/* ─────────────────────────────────────────────────────────────
 * 5. Semantic Colors - 기능별 색상 (브랜드 독립적)
 * ───────────────────────────────────────────────────────────── */
:root {
  /* Success */
  --color-success: oklch(0.5 0.15 145); /* green-600 */
  --color-success-bg: oklch(0.97 0.02 145); /* green-50 */

  /* Danger/Error */
  --color-danger: oklch(0.55 0.22 27); /* red-600 */
  --color-danger-bg: oklch(0.98 0.02 27); /* red-50 */

  /* Warning */
  --color-warning: oklch(0.65 0.15 85); /* yellow-600 */
  --color-warning-bg: oklch(0.98 0.02 85); /* yellow-50 */

  /* Info */
  --color-info: oklch(0.55 0.18 230); /* blue-600 - semantic, not brand */
  --color-info-bg: oklch(0.97 0.02 230); /* blue-50 */
}

/* ─────────────────────────────────────────────────────────────
 * 6. Component-Specific - 컴포넌트별 매핑
 * ───────────────────────────────────────────────────────────── */
:root {
  /* Button Primary (브랜드 액센트 사용) */
  --btn-primary-bg: var(--brand-accent);
  --btn-primary-bg-hover: var(--brand-accent-hover);
  --btn-primary-bg-active: var(--brand-accent-active);
  --btn-primary-text: var(--color-text-on-accent);

  /* Button Secondary (중립 색상) */
  --btn-secondary-bg: var(--color-bg-secondary);
  --btn-secondary-bg-hover: var(--color-bg-hover);
  --btn-secondary-text: var(--color-text-primary);

  /* Icon Accent (브랜드 액센트 사용) */
  --icon-accent: var(--brand-accent);
  --icon-default: var(--color-text-secondary);
}

/* ─────────────────────────────────────────────────────────────
 * Dark Mode
 * ───────────────────────────────────────────────────────────── */
@media (prefers-color-scheme: dark) {
  :root {
    /* Surface */
    --color-bg-canvas: oklch(0.15 0 0); /* gray-900 */
    --color-bg-surface: oklch(0.2 0 0); /* gray-800 */
    --color-bg-secondary: oklch(0.25 0 0); /* gray-700 */

    /* Text */
    --color-text-primary: oklch(0.95 0 0); /* gray-50 */
    --color-text-secondary: oklch(0.75 0 0); /* gray-300 */

    /* Interactive */
    --color-bg-hover: oklch(0.3 0 0); /* gray-700 */
    --color-bg-active: oklch(0.35 0 0); /* gray-600 */

    /* Brand Accent는 유지 (라이트/다크 모드 동일) */
  }
}
```

#### 2. 토큰 마이그레이션 매트릭스

| 현재 토큰 | 용도 | 새 토큰 | 이유 |
|-----------|------|---------|------|
| `--color-bg-primary-default` | Button 배경 | `--btn-primary-bg` (→ `--brand-accent`) | 브랜드 액센트 명시 |
| `--color-bg-primary-hover` | Button hover | `--btn-primary-bg-hover` (→ `--brand-accent-hover`) | 브랜드 액센트 명시 |
| `--color-text-primary` | 주요 텍스트 | `--color-text-primary` (유지) | 브랜드와 무관 |
| `--color-primary-solid` | Icon 색상 | `--icon-accent` (→ `--brand-accent`) | 브랜드 액센트 명시 |
| `--color-primary-soft` | Badge 배경 | `--brand-bg-soft` | 브랜드 soft 배경 |
| `--color-background-selected` | Collapsible 선택 | `--color-bg-selected` (→ `gray-100`) | ⚠️ 중립 색상으로 변경 |

#### 3. 컴포넌트별 변경 계획

##### Button (우선순위: 🔴 High)
```css
/* Before */
.button-primary {
  background-color: var(--color-bg-primary-default);
  color: var(--color-text-on-dark);
}

.button-primary:hover {
  background-color: var(--color-bg-primary-hover);
}

/* After */
.button-primary {
  background-color: var(--btn-primary-bg); /* → --brand-accent */
  color: var(--btn-primary-text); /* → --color-text-on-accent */
}

.button-primary:hover {
  background-color: var(--btn-primary-bg-hover); /* → --brand-accent-hover */
}
```

**파일**: `packages/ui/src/components/button/button.module.css`

##### Collapsible (우선순위: 🟡 Medium)
```css
/* Before */
.collapsible-trigger[data-state='open'] {
  background-color: var(--color-background-selected, #eff6ff); /* ⚠️ blue */
}

/* After */
.collapsible-trigger[data-state='open'] {
  background-color: var(--color-bg-selected); /* → gray-100 */
}
```

**파일**: `packages/ui/src/components/collapsible/collapsible.module.css`

##### Avatar (우선순위: 🟢 Low)
```css
/* Before */
.avatar-primary {
  background-color: var(--color-primary-soft); /* blue-50 */
}

/* After */
.avatar-primary {
  background-color: var(--brand-bg-soft); /* 브랜드 soft 배경 */
}
```

**파일**: `packages/ui/src/components/avatar/avatar.module.css`

---

## 🎯 Phase 3: Collapsible 색상 조정

### 목표
선택 상태(selected)를 **중립 색상**으로 변경하여 브랜드 액센트와 분리

### 작업 내용

#### 파일: `packages/ui/src/components/collapsible/collapsible.module.css`

```css
/* Before */
.collapsible-trigger[data-state='open'] {
  background-color: var(--color-background-selected, #eff6ff); /* blue-50 */
}

/* After */
.collapsible-trigger[data-state='open'] {
  background-color: var(--color-bg-selected, var(--color-gray-100)); /* gray-100 */
}
```

### 검증
```bash
# 변경 후 Storybook 확인
pnpm --filter @lyra/ui storybook

# Collapsible 스토리 확인
# - 선택 상태가 회색 배경으로 표시되는지 확인
# - 브랜드 색상(blue)이 아닌지 확인
```

### 예상 시간
30분

---

## 🎯 Phase 4: 직접 색상 값 토큰화

### 목표
Storybook 문서(`design-tokens.css`)에서 하드코딩된 색상 값을 CSS 변수로 교체

### 작업 내용

#### 파일: `packages/ui/src/stories/design-tokens.css`

```css
/* Before */
.code-block {
  background: #1a1a2e;  /* 하드코딩 */
  color: #e4e4e7;
}

.shadow-demo {
  background: white;  /* 하드코딩 */
}

/* After */
.code-block {
  background: var(--color-code-bg, #1a1a2e);
  color: var(--color-code-text, #e4e4e7);
}

.shadow-demo {
  background: var(--color-white, #ffffff);
}
```

### 발견된 하드코딩 (4개 인스턴스)
1. `background: white;` (3개)
2. `background: #1a1a2e;` (1개)
3. `color: #e4e4e7;` (1개)

### 검증
```bash
# 하드코딩 색상 검색
grep -n "background: #\|color: #\|background: white;" src/stories/design-tokens.css

# 결과: 0개여야 함
```

### 예상 시간
1시간

---

## 🎯 Phase 5: 최종 검증 및 문서화

### 검증 체크리스트

#### 1. 색상 토큰 구조 검증
```bash
# 모든 컴포넌트에서 --color-primary-* 사용 확인
grep -r "color-primary" packages/ui/src/components --include="*.css"

# --brand-accent 사용 확인
grep -r "brand-accent" packages/ui/src/components --include="*.css"

# 하드코딩 색상 검색 (hex, rgb, hsl)
grep -r "background: #\|color: #" packages/ui/src --include="*.css"
grep -r "rgb(\|hsl(\|oklch(" packages/ui/src --include="*.css" | grep -v "var("
```

#### 2. OpenAI 가이드라인 준수도 재측정

| 항목 | 이전 점수 | 목표 점수 | 검증 방법 |
|------|-----------|-----------|-----------|
| 배경/텍스트 색상 고정 | 60/100 | 95/100 | `--brand-accent` 분리 확인 |
| 브랜드 액센트 제한 | 80/100 | 95/100 | 버튼/아이콘만 사용 확인 |
| Gradient 최소화 | ✅ 100/100 | 100/100 | `grep -r "gradient"` → 0개 |
| **전체 색상 준수도** | **65/100** | **95/100** | 종합 평가 |

#### 3. Storybook 시각적 검증
```bash
pnpm --filter @lyra/ui storybook
```

**확인 사항**:
- [ ] Button Primary가 브랜드 액센트 색상 사용
- [ ] Button Secondary가 중립 색상 사용
- [ ] Collapsible 선택 상태가 회색 배경
- [ ] Gradient가 모든 데모에서 제거됨
- [ ] 다크모드 전환 시 텍스트/배경만 변경 (브랜드 액센트 유지)

#### 4. 문서화

##### 파일 1: `packages/ui/docs/design-tokens/color-system.md`
```markdown
# Color Token System

## Architecture

Lyra UI의 색상 토큰은 OpenAI Apps SDK 가이드라인을 준수합니다.

### Token Categories

#### 1. Brand Accent (브랜드 액센트)
**사용처**: 버튼, 아이콘에만 제한

\`\`\`css
--brand-accent: oklch(0.55 0.22 263.37);
--brand-accent-hover: oklch(0.5 0.24 263.37);
--brand-accent-active: oklch(0.45 0.26 263.37);
\`\`\`

#### 2. Surface/Background (고정 색상)
**사용처**: 배경, 카드, 모달 등

\`\`\`css
--color-bg-canvas: oklch(1 0 0);
--color-bg-surface: oklch(1 0 0);
--color-bg-secondary: oklch(0.98 0 0);
\`\`\`

#### 3. Text (고정 색상)
**사용처**: 모든 텍스트 요소

\`\`\`css
--color-text-primary: oklch(0.2 0 0);
--color-text-secondary: oklch(0.45 0 0);
\`\`\`

#### 4. Interactive States (중립 색상)
**사용처**: Hover, Active, Selected 상태

\`\`\`css
--color-bg-hover: oklch(0.96 0 0);
--color-bg-active: oklch(0.94 0 0);
--color-bg-selected: oklch(0.96 0 0);  /* NOT BLUE! */
\`\`\`

#### 5. Semantic Colors (기능별)
**사용처**: Success, Error, Warning 등

\`\`\`css
--color-success: oklch(0.5 0.15 145);
--color-danger: oklch(0.55 0.22 27);
--color-warning: oklch(0.65 0.15 85);
\`\`\`

## Usage Guidelines

### ✅ DO
- Button Primary에 `--brand-accent` 사용
- Icon 강조에 `--icon-accent` 사용
- 선택 상태에 `--color-bg-selected` (회색) 사용

### ❌ DON'T
- 배경/텍스트에 브랜드 색상 사용
- Gradient 사용
- 하드코딩된 색상 값 사용
\`\`\`

##### 파일 2: `packages/ui/docs/migration/color-token-v2.md`
```markdown
# Color Token Migration Guide v1 → v2

## Breaking Changes

### 1. `--color-bg-primary-*` → `--btn-primary-bg`
\`\`\`css
/* Before */
background: var(--color-bg-primary-default);

/* After */
background: var(--btn-primary-bg);
\`\`\`

### 2. `--color-background-selected` → `--color-bg-selected`
\`\`\`css
/* Before */
background: var(--color-background-selected, #eff6ff); /* blue */

/* After */
background: var(--color-bg-selected); /* gray */
\`\`\`

### 3. `--color-primary-solid` → `--icon-accent`
\`\`\`css
/* Before */
color: var(--color-primary-solid);

/* After */
color: var(--icon-accent);
\`\`\`

## Migration Steps

1. Search & Replace old tokens
2. Test visual appearance in Storybook
3. Verify dark mode behavior
4. Update custom theme overrides
\`\`\`

---

## 📋 실행 계획

### Week 2 (예정)

#### Day 1: 토큰 아키텍처 설계 (2h)
- [ ] 새로운 토큰 구조 정의 (`design-tokens/colors.css`)
- [ ] 마이그레이션 매트릭스 작성
- [ ] Breaking changes 문서화

#### Day 2: 컴포넌트 마이그레이션 (4h)
- [ ] Button 컴포넌트 업데이트 (1h)
- [ ] Collapsible 색상 조정 (0.5h)
- [ ] Avatar 컴포넌트 업데이트 (0.5h)
- [ ] 기타 컴포넌트 검토 (2h)

#### Day 3: Storybook 정리 (2h)
- [ ] 직접 색상 값 토큰화 (1h)
- [ ] Design tokens 페이지 업데이트 (1h)

#### Day 4: 검증 및 문서화 (2h)
- [ ] OpenAI 준수도 재측정 (0.5h)
- [ ] Storybook 시각적 검증 (0.5h)
- [ ] 마이그레이션 가이드 작성 (1h)

**총 예상 시간**: 10시간

---

## 🎯 성공 기준

### 정량적 지표
- [x] Gradient 사용: 17개 → **0개** ✅
- [ ] 직접 색상 값: 4개 → **0개**
- [ ] OpenAI 색상 준수도: 65 → **95점**
- [ ] `--brand-accent` 사용처: 전체 → **버튼/아이콘만**

### 정성적 지표
- [ ] 모든 컴포넌트가 새 토큰 아키텍처 사용
- [ ] Storybook 문서가 가이드라인 준수
- [ ] 다크모드 완벽 작동
- [ ] 마이그레이션 가이드 완성

---

## 📊 리스크 관리

### 리스크 1: Breaking Changes
**영향도**: 🟡 Medium
**발생 가능성**: 🔴 High
**완화 전략**:
- 마이그레이션 가이드 상세 작성
- 기존 토큰 deprecation 경고 추가
- 2주간 병행 지원 (old + new tokens)

### 리스크 2: 시각적 회귀
**영향도**: 🟡 Medium
**발생 가능성**: 🟡 Medium
**완화 전략**:
- Storybook에서 전체 컴포넌트 시각적 검증
- Before/After 스크린샷 비교
- 다크모드 별도 테스트

### 리스크 3: 일정 지연
**영향도**: 🟢 Low
**발생 가능성**: 🟡 Medium
**완화 전략**:
- MVP 우선 (Button, Collapsible만 먼저)
- 나머지 컴포넌트는 점진적 마이그레이션
- 주간 체크인으로 진행 상황 추적

---

## 📚 참고 문서

- [색상 감사 보고서](./color-audit-report.md)
- [OpenAI Apps SDK 가이드라인](./openai-apps-sdk-design-guidelines.md)
- [구현 로드맵](./openai-alignment-implementation-roadmap.md)
- [ChatGPT 테마 문서](../packages/ui/docs/themes.md)

---

## 📝 변경 이력

### 2025-10-23
- ✅ Phase 1: Gradient 제거 완료 (design-tokens.css)
- 🔄 Phase 2: 브랜드 액센트 토큰 분리 계획 수립
- 초기 마이그레이션 계획 작성

---

**다음 작업**: Phase 2 토큰 아키텍처 구현 시작 (2시간)
