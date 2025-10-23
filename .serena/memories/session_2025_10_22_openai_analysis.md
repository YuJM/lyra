# OpenAI Apps SDK 분석 세션

## Session Date: 2025-10-22 (후속 세션)

## 작업 내용

### 1. OpenAI Apps SDK 디자인 가이드라인 문서화
**출처**: https://developers.openai.com/apps-sdk/concepts/design-guidelines

**생성 문서**:
- `claudedocs/openai-apps-sdk-design-guidelines.md`
- 한글 마크다운으로 완전 번역 및 요약

**주요 섹션**:
1. 핵심 원칙 (5가지)
   - Conversational, Intelligent, Simple, Responsive, Accessible
2. Use Cases 프레임워크
   - 적합한 사용 사례 vs 부적합한 사용 사례
3. 디스플레이 모드
   - Inline (카드/캐러셀)
   - Fullscreen
   - Picture-in-Picture
4. 비주얼 디자인 표준
   - 색상, 타이포그래피, 간격, 아이콘, 접근성
5. 커뮤니케이션 표준
   - 톤, 콘텐츠, 능동성 규칙

---

### 2. Lyra UI vs OpenAI Apps SDK 비교 분석
**목적**: Lyra UI가 OpenAI 가이드라인과 얼마나 일치하는지 평가

**생성 문서**:
- `claudedocs/lyra-ui-vs-openai-apps-sdk-analysis.md`

**종합 평가**: **65/100** ⚠️

#### 영역별 점수

| 영역 | 점수 | 평가 |
|------|------|------|
| 타이포그래피 | 100% | ✅ 완전 일치 |
| 간격/레이아웃 | 100% | ✅ 완전 일치 |
| 접근성 | 100% | ✅ 완전 일치 (WCAG AAA) |
| 색상 시스템 | 85% | ⚠️ 부분 일치 |
| 전체화면 | 70% | ⚠️ 부분 일치 |
| 아이콘 | 60% | ⚠️ 가이드 부재 |
| 인라인 카드 | 0% | ❌ 컴포넌트 부재 |
| 캐러셀 | 0% | ❌ 컴포넌트 부재 |
| PiP | 0% | ❌ 컴포넌트 부재 |

---

## 핵심 발견사항

### ✅ Lyra UI의 강점

#### 1. 접근성 우수성
```css
/* WCAG AAA 수준 대비율 (OpenAI 요구 AA 초과) */
--color-text-primary: var(--color-gray-900);  /* #111827 */
--color-bg-surface: oklch(1 0 0);              /* #ffffff */
/* 대비율: 16.1:1 */
```

#### 2. 플랫폼 네이티브 타이포그래피
```css
/* system-ui로 자동 최적화 */
--font-family-sans: system-ui, -apple-system, sans-serif;
/* iOS: SF Pro, Android: Roboto */
```

#### 3. 일관된 디자인 토큰 시스템
```css
/* 계층적 시멘틱 토큰 */
--color-primary: var(--color-blue-600);
--color-text-link: var(--color-primary);
--color-bg-primary-default: var(--color-primary);
```

#### 4. 움직임 감소 및 고대비 지원
```css
@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
}

@media (prefers-contrast: high) {
  .button { border-width: 2px; }
}
```

---

### ⚠️ 개선 필요 영역

#### 1. 인라인 카드 컴포넌트 부재 (Critical)
**OpenAI 요구사항**:
- 최대 2개 주요 액션
- 깊은 네비게이션 금지
- 동적 높이 조정

**현재 상황**: 없음
**대안**: Popover를 카드처럼 사용 가능하나 최적화 안됨

**권장 구현**:
```tsx
export const Card = {
  Root: CardRoot,
  Header: CardHeader,    // 아이콘 + 제목
  Content: CardContent,  // 본문
  Actions: CardActions,  // 최대 2개 버튼
};
```

#### 2. 캐러셀 컴포넌트 부재 (Critical)
**OpenAI 요구사항**:
- 3-8개 항목
- 이미지 + 제목 + 메타데이터 (3줄 max)
- 카드당 1개 CTA

**현재 상황**: 없음

**권장 구현**:
```tsx
export const Carousel = {
  Root: CarouselRoot,
  Item: CarouselItem,
  Image: CarouselImage,
  Title: CarouselTitle,
  Meta: CarouselMeta,      // 최대 3줄 제약
  Action: CarouselAction,  // 1개만
};
```

#### 3. 브랜드 색상 제약 없음
**OpenAI 요구사항**:
- 버튼/아이콘에만 브랜드 색상 허용
- 배경/텍스트는 시스템 색상 유지

**Lyra 현황**: 자유로운 색상 커스터마이징 허용

**권장 해결책**: ChatGPT 테마 프리셋
```css
/* chatgpt-theme.css */
:root {
  /* 브랜드는 primary에만 */
  --color-primary: var(--brand-accent);

  /* 배경/텍스트는 고정 */
  --color-bg-surface: oklch(1 0 0);
  --color-text-primary: var(--color-gray-900);
}
```

---

## 즉시 조치 권장사항

### 우선순위 1: 필수 컴포넌트 추가

#### Task 1: Card 컴포넌트
**예상 시간**: 4-6시간
**작업 항목**:
- [ ] CardRoot 컴포넌트
- [ ] CardHeader (아이콘 + 제목)
- [ ] CardContent (본문)
- [ ] CardActions (최대 2개 제약)
- [ ] CSS 모듈 (디자인 토큰 통합)
- [ ] 테스트 (20+ cases)
- [ ] Storybook 스토리 (5+ stories)
- [ ] 접근성 검증 (WCAG AA)

#### Task 2: Carousel 컴포넌트
**예상 시간**: 6-8시간
**작업 항목**:
- [ ] CarouselRoot (3-8개 제약)
- [ ] CarouselItem
- [ ] CarouselImage (aspect ratio 16:9)
- [ ] CarouselTitle
- [ ] CarouselMeta (3줄 제약)
- [ ] CarouselAction (1개만)
- [ ] 스크롤 스냅 로직
- [ ] CSS 모듈
- [ ] 테스트
- [ ] Storybook 스토리
- [ ] 접근성 검증

#### Task 3: ChatGPT 테마 프리셋
**예상 시간**: 2-3시간
**작업 항목**:
- [ ] chatgpt-theme.css 생성
- [ ] 제한적 브랜딩 규칙
- [ ] 배경/텍스트 고정
- [ ] 문서화

**총 예상 시간**: **12-17시간**

---

### 우선순위 2: 문서화 및 가이드

#### Task 4: 아이콘 가이드라인
**예상 시간**: 1시간
**내용**:
- Heroicons (outline) 권장
- 24x24px 표준
- Alt text 필수
- 브랜드 로고 금지

#### Task 5: ChatGPT 앱 개발 가이드
**예상 시간**: 2시간
**내용**:
- Lyra UI → OpenAI 패턴 매핑
- 컴포넌트 선택 가이드
- 제약사항 체크리스트

---

## 기술적 인사이트

### 1. 디자인 토큰의 힘
Lyra UI의 계층적 시멘틱 토큰 시스템은 OpenAI 가이드라인과 완벽 호환:
```css
/* 주요 색상만 변경하면 전체 UI 자동 업데이트 */
--color-primary: var(--brand-color);

/* 자동 전파 */
--color-text-link: var(--color-primary);
--color-bg-primary-default: var(--color-primary);
--color-border-focus: var(--color-primary);
```

### 2. system-ui의 마법
단일 CSS 규칙으로 모든 플랫폼 최적화:
```css
font-family: system-ui;
/* iOS: SF Pro */
/* Android: Roboto */
/* Windows: Segoe UI */
/* macOS: San Francisco */
```

### 3. CSS Modules의 장점
- 런타임 오버헤드 없음 (OpenAI Responsive 요구사항 충족)
- 번들 크기 ~50KB gzipped
- Tree-shakeable

---

## 전략적 방향

### 단기 (1-2주)
1. **Card 컴포넌트 구현**
   - OpenAI 인라인 모드 지원
   - 일치도 65% → 80%

2. **Carousel 컴포넌트 구현**
   - 다중 항목 표시 지원
   - 일치도 80% → 90%

### 중기 (1-2개월)
3. **ChatGPT 테마 프리셋**
   - 브랜드 제약 준수
   - 일치도 90% → 95%

4. **아이콘 가이드라인**
   - 일관된 시각적 언어

### 장기 (3-6개월)
5. **AI 통합 래퍼 패키지**
   - @lyra/ai-wrapper (별도)
   - 대화형 컨텍스트 지원

6. **PiP 컴포넌트**
   - 수요 확인 후 구현

---

## 시나리오별 사용 가능성

### 현재 (Lyra UI v0.0.0)
**가능**: Dialog, Popover, Form 컴포넌트
**제약**: 인라인 카드/캐러셀 불가
**평가**: ⚠️ 70% 사용 가능

### Card + Carousel 추가 후
**가능**: 모든 인라인 모드 지원
**제약**: AI 통합은 별도 구현
**평가**: ✅ 90% 사용 가능

### ChatGPT 테마 + 모든 컴포넌트
**가능**: OpenAI 가이드라인 완전 준수
**제약**: PiP만 커스텀 필요
**평가**: ✅ 95% 사용 가능

---

## 다음 단계

### 1. 결정 필요
- [ ] Card 컴포넌트 구현 승인
- [ ] Carousel 컴포넌트 구현 승인
- [ ] 우선순위 확정 (Card vs Carousel)

### 2. 구현 시작 (승인 시)
```bash
# Card 컴포넌트
cd packages/ui
mkdir -p src/components/card
touch src/components/card/card.tsx
touch src/components/card/card.module.css
touch src/components/card/card.test.tsx
touch src/components/card/card.stories.tsx
```

### 3. 검증 체크리스트
- [ ] OpenAI 가이드라인 준수
- [ ] 접근성 테스트 (WCAG AA)
- [ ] 성능 테스트 (번들 크기)
- [ ] 시각적 QA

---

## 참고 문서

### 생성된 문서
1. `claudedocs/openai-apps-sdk-design-guidelines.md`
   - OpenAI 가이드라인 한글 요약
   
2. `claudedocs/lyra-ui-vs-openai-apps-sdk-analysis.md`
   - 상세 비교 분석
   - 일치도 평가
   - 개선 권장사항
   - 구현 로드맵

### 기존 문서
- `docs/ui-component-expansion-plan.md`
- `session_2025_10_22_lyra_ui_completion`
- `lyra_ui_project_context`
- `lyra_ui_technical_patterns`

---

**세션 종료 시간**: 2025-10-22 21:50
**총 작업 시간**: ~1시간
**핵심 성과**: OpenAI 가이드라인 분석 및 Lyra UI 호환성 평가 완료
