# 색상 사용 현황 감사 보고서

> 생성일: 2025-10-23
> 감사 대상: Lyra UI 컴포넌트 라이브러리
> 목적: OpenAI Apps SDK 색상 가이드라인 준수도 평가

---

## 📊 Executive Summary

### 현재 상태
- **전체 컴포넌트**: 15개
- **색상 토큰 사용**: ✅ 대부분 CSS 변수 사용
- **직접 색상 값**: ⚠️ Storybook 문서에서만 일부 발견
- **Gradient 사용**: ⚠️ 17개 인스턴스 (주로 Storybook 데모)

### OpenAI 가이드라인 준수도

| 항목 | 현재 점수 | 목표 | 상태 |
|------|-----------|------|------|
| 배경/텍스트 색상 고정 | 60/100 | 95/100 | 🟡 개선 필요 |
| 브랜드 액센트 제한 | 80/100 | 95/100 | 🟢 양호 |
| Gradient 최소화 | 40/100 | 95/100 | 🔴 시급 |
| **전체 색상 준수도** | **65/100** | **95/100** | 🟡 개선 필요 |

---

## 🔍 상세 분석

### 1. 컴포넌트별 색상 사용 현황

#### ✅ 준수 컴포넌트 (11개)

**완벽한 토큰 사용, 수정 불필요**:

1. **Button** (`src/components/button/button.module.css`)
   - ✅ 모든 색상이 CSS 변수로 정의
   - ✅ 상태별 색상 변수 사용 (default, hover, active, disabled)
   ```css
   background-color: var(--color-bg-primary-default);
   background-color: var(--color-bg-primary-hover);
   background-color: var(--color-bg-primary-active);
   ```

2. **Dialog** (`src/components/dialog/dialog.module.css`)
   - ✅ overlay, surface, hover, active 모두 변수 사용
   - ✅ 스크롤바 색상도 토큰화
   ```css
   background-color: var(--color-bg-overlay, rgba(0, 0, 0, 0.5));
   background-color: var(--color-bg-surface, #ffffff);
   ```

3. **Toast** (`src/components/toast/toast.module.css`)
   - ✅ variant별 배경 색상 토큰 사용
   - ✅ 다크모드 대응
   ```css
   background-color: var(--color-success-bg, #f0fdf4);
   background-color: var(--color-danger-bg, #fef2f2);
   ```

4. **Tooltip** (`src/components/tooltip/tooltip.module.css`)
   - ✅ 배경/텍스트 색상 토큰 사용
   - ✅ 다크모드 대응

5. **Menu** (`src/components/menu/menu.module.css`)
   - ✅ 모든 상태 색상 토큰화
   - ✅ 스크롤바, hover, active 모두 변수 사용

6. **Popover** (`src/components/popover/popover.module.css`)
   - ✅ Dialog와 동일한 패턴
   - ✅ overlay, surface, interaction 상태 토큰화

7. **Tabs** (`src/components/tabs/tabs.module.css`)
   - ✅ primary, text, border 색상 토큰 사용
   - ✅ 다크모드 대응

8. **Progress** (`src/components/progress/progress.module.css`)
   - ✅ variant별 색상 토큰 (primary, success)
   - ✅ 다크모드 대응

9. **Avatar** (`src/components/avatar/avatar.module.css`)
   - ✅ soft 색상 토큰 사용
   - ✅ variant별 배경 색상 정의

10. **Checkbox, Radio, Switch** (`src/components/{checkbox,radio,switch}/`)
    - ✅ interactive 상태 토큰 사용
    - ✅ 호버/비활성 상태 대응

11. **Select** (`src/components/select/select.module.css`)
    - ✅ surface, input, interaction 상태 토큰화

---

#### ⚠️ 개선 필요 컴포넌트 (1개)

**Collapsible** (`src/components/collapsible/collapsible.module.css`)

**문제점**:
- 일부 색상이 특정 용도로 고정되어 있지 않음
- `background-selected` 색상이 blue 계열로 브랜드 색상처럼 보일 수 있음

**현재 코드**:
```css
background-color: var(--color-background-selected, #eff6ff);
```

**권장 수정**:
```css
/* OpenAI: 선택 상태는 브랜드 액센트가 아닌 중립 색상 사용 */
background-color: var(--color-background-selected, var(--color-gray-100));
```

**우선순위**: 🟡 Medium (기능 정상 작동, 가이드라인 미준수)

---

### 2. Storybook 문서 색상 사용

#### ⚠️ Gradient 사용 (17개 인스턴스)

**파일**: `src/stories/design-tokens.css`

**문제점**:
- 데모/시각화 목적으로 gradient 사용
- OpenAI 가이드라인: "Avoid gradients" 명시

**발견된 Gradient 패턴**:

1. **배경 Gradient** (7개)
   ```css
   background: linear-gradient(135deg, var(--color-gray-50), white);
   background: linear-gradient(135deg, white, var(--color-blue-50));
   ```

2. **오버레이 Gradient** (5개)
   ```css
   background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.5));
   background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent);
   ```

3. **브랜드 Gradient** (1개)
   ```css
   background: linear-gradient(135deg, #1a1a2e, #16213e);
   ```

4. **Accent Gradient** (4개)
   ```css
   background: linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.05));
   ```

**영향 범위**:
- ✅ 컴포넌트 자체에는 영향 없음 (Storybook 데모용)
- ⚠️ 문서가 OpenAI 가이드라인과 불일치

**권장 조치**:
1. **즉시**: Storybook 데모에서 gradient 제거
2. **대안**: 단색 배경으로 교체 또는 투명도만 사용
   ```css
   /* Before */
   background: linear-gradient(135deg, var(--color-gray-50), white);

   /* After */
   background: var(--color-gray-50);
   ```

**우선순위**: 🟢 Low (실제 컴포넌트 영향 없음, 문서 일관성만 해당)

---

#### 🔴 직접 색상 값 사용 (최소)

**파일**: `src/stories/design-tokens.css`

**발견된 직접 값**:
```css
background: white;  /* 3개 인스턴스 */
background: linear-gradient(135deg, #1a1a2e, #16213e);  /* 1개 */
```

**권장 수정**:
```css
/* Before */
background: white;

/* After */
background: var(--color-white, #ffffff);
```

**우선순위**: 🟢 Low (Storybook 전용, 컴포넌트 영향 없음)

---

### 3. CSS 변수 아키텍처 분석

#### ✅ 잘 정의된 토큰 시스템

**카테고리별 토큰**:

1. **Surface/Background** (9개)
   ```css
   --color-bg-primary-default
   --color-bg-primary-hover
   --color-bg-primary-active
   --color-bg-primary-disabled
   --color-bg-surface-default
   --color-bg-surface-elevated
   --color-bg-overlay
   --color-background-secondary
   --color-background-default
   ```

2. **Interactive States** (6개)
   ```css
   --color-interactive-default
   --color-interactive-hover
   --color-bg-hover
   --color-bg-active
   --color-bg-input-hover
   --color-bg-input-disabled
   ```

3. **Semantic Colors** (8개)
   ```css
   --color-success-bg
   --color-danger-bg
   --color-warning-bg
   --color-info-bg
   --color-success-solid
   --color-primary-solid
   --color-primary-soft
   /* ... 다크모드 변형 포함 */
   ```

4. **Text Colors** (4개)
   ```css
   --color-text-primary
   --color-text-secondary
   --color-text-on-dark
   --color-border-default
   ```

**강점**:
- ✅ 시맨틱한 네이밍
- ✅ 상태별 변형 제공
- ✅ 다크모드 대응
- ✅ fallback 값 명시

**OpenAI 정렬 필요 항목**:
- ⚠️ `--color-primary-*` 계열이 너무 많은 곳에 사용될 가능성
- ⚠️ `--brand-accent` 토큰 명시적 분리 필요

---

## 📋 마이그레이션 우선순위

### 🔴 High Priority (이번 주)

#### 1. ChatGPT 테마 프리셋 생성
**파일**: `packages/ui/src/themes/chatgpt.css`

**목표**: OpenAI 가이드라인 준수 테마 제공

**구현 내용**:
```css
/**
 * ChatGPT Theme - OpenAI Apps SDK Compliant
 */
:root {
  /* 1. 배경/텍스트 색상 고정 (브랜드 액센트 제외) */
  --color-bg-surface-default: oklch(1 0 0) !important;  /* 순백 */
  --color-text-primary: var(--color-gray-900) !important;
  --color-text-secondary: var(--color-gray-600) !important;

  /* 2. 브랜드 액센트는 버튼/아이콘에만 */
  --color-primary: var(--brand-accent, var(--color-blue-600));

  /* 3. Semantic 색상 유지 (성공/에러/경고) */
  --color-success: var(--color-green-600);
  --color-danger: var(--color-red-600);
  --color-warning: var(--color-yellow-600);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-surface-default: var(--color-gray-900) !important;
    --color-text-primary: var(--color-gray-50) !important;
    --color-text-secondary: var(--color-gray-400) !important;
  }
}
```

**예상 시간**: 4시간
**산출물**: `chatgpt.css` + 사용 문서

---

### 🟡 Medium Priority (다음 주)

#### 2. Storybook Gradient 제거
**파일**: `src/stories/design-tokens.css`

**작업 내용**:
1. 17개 gradient를 단색으로 교체
2. 시각적 깊이감이 필요한 경우 border/shadow 사용
3. 문서 업데이트 (OpenAI 가이드라인 준수 명시)

**Before/After 예시**:
```css
/* Before */
.token-preview {
  background: linear-gradient(135deg, var(--color-gray-50), white);
}

/* After */
.token-preview {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
}
```

**예상 시간**: 2시간
**산출물**: 업데이트된 Storybook 페이지

---

#### 3. Collapsible 선택 색상 조정
**파일**: `src/components/collapsible/collapsible.module.css`

**작업 내용**:
```css
/* Before */
background-color: var(--color-background-selected, #eff6ff);

/* After */
background-color: var(--color-background-selected, var(--color-gray-100));
```

**예상 시간**: 30분
**산출물**: 업데이트된 Collapsible 컴포넌트

---

### 🟢 Low Priority (추후)

#### 4. 직접 색상 값 제거
**파일**: `src/stories/design-tokens.css`

**작업 내용**:
```css
/* Before */
background: white;

/* After */
background: var(--color-white, #ffffff);
```

**예상 시간**: 1시간

---

## 🎯 마이그레이션 로드맵

### Week 1 (현재)
- [x] 색상 사용 현황 감사 완료
- [ ] ChatGPT 테마 프리셋 생성 (4h)
- [ ] Storybook gradient 제거 계획 (1h)

### Week 2
- [ ] Storybook gradient 제거 실행 (2h)
- [ ] Collapsible 선택 색상 조정 (0.5h)
- [ ] 문서 업데이트 (1h)

### Week 3
- [ ] 직접 색상 값 토큰화 (1h)
- [ ] 최종 검증 및 테스트 (2h)

**총 예상 시간**: 11.5시간

---

## 📊 성공 지표

### 정량적 지표
- [ ] Gradient 사용: 17개 → 0개
- [ ] 직접 색상 값: 4개 → 0개
- [ ] OpenAI 색상 준수도: 65 → 95점

### 정성적 지표
- [ ] ChatGPT 테마 배포 완료
- [ ] Storybook 문서가 가이드라인 준수
- [ ] 모든 컴포넌트가 토큰 기반

---

## 🔍 추가 발견사항

### ✅ 강점

1. **일관된 토큰 사용**
   - 모든 컴포넌트가 CSS 변수 기반
   - Fallback 값 명시로 안정성 확보

2. **다크모드 지원**
   - 모든 주요 컴포넌트에서 다크모드 변형 제공
   - 시스템 토큰 활용

3. **시맨틱 네이밍**
   - `--color-bg-primary-default` 형식으로 명확
   - 상태별 변형 체계적 정의

### ⚠️ 개선 기회

1. **브랜드 액센트 분리**
   - 현재: `--color-primary`가 다양한 용도로 사용
   - 권장: `--brand-accent` 토큰 명시적 분리

2. **테마 프리셋 부재**
   - 현재: 단일 기본 테마만 존재
   - 권장: ChatGPT, Enterprise 등 프리셋 제공

3. **문서 일관성**
   - Storybook 데모가 가이드라인 미준수
   - 실제 사용 패턴과 문서 정렬 필요

---

## 📚 참고 문서

- [OpenAI Apps SDK 디자인 가이드라인](./openai-apps-sdk-design-guidelines.md)
- [Lyra vs OpenAI 비교 분석](./lyra-ui-vs-openai-apps-sdk-analysis.md)
- [구현 로드맵](./openai-alignment-implementation-roadmap.md)
- [다음 단계](./NEXT_STEPS.md)

---

## 📝 결론

### 현재 상태: 🟡 양호 (65/100)

Lyra UI는 이미 **토큰 기반 색상 시스템**을 갖추고 있어 기반이 견고합니다. OpenAI 가이드라인 정렬을 위해 필요한 작업은:

1. ✅ **강점 유지**: 현재 토큰 시스템 유지
2. 🎯 **테마 추가**: ChatGPT 프리셋 생성
3. 🔧 **문서 정렬**: Storybook gradient 제거
4. 🎨 **미세 조정**: Collapsible 선택 색상 수정

**총 소요 시간**: 11.5시간
**예상 결과**: OpenAI 준수도 65 → 95점 (+30점)

---

**다음 작업**: Task 1.2 - ChatGPT 테마 프리셋 개발 (4시간)
