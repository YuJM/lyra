# Lyra UI - OpenAI 정렬 작업 다음 단계

> 작성일: 2025-10-23
> 목적: 즉시 실행 가능한 작업 목록 제공

---

## 📋 문서 분석 완료

다음 문서들을 분석하여 체계적인 구현 로드맵을 작성했습니다:

1. **lyra-ui-openai-alignment-design.md** - OpenAI 정렬 설계 문서
2. **lyra-ui-vs-openai-apps-sdk-analysis.md** - 현재 일치도 분석 (65/100점)
3. **openai-apps-sdk-design-guidelines.md** - OpenAI 공식 가이드라인

### 핵심 발견 사항

**현재 강점**:
- ✅ 타이포그래피: 플랫폼 네이티브 폰트 자동 적용 (100% 준수)
- ✅ 간격/레이아웃: 일관된 토큰 시스템 (100% 준수)
- ✅ 접근성: WCAG AAA 수준 대비율 (OpenAI 요구 AA 초과)

**주요 갭**:
- ❌ Inline 모드 컴포넌트 부재 (Card, Carousel)
- ⚠️ 색상 시스템 제약 미적용 (커스텀 그라데이션 사용 가능)
- ⚠️ 아이콘 가이드라인 부재

---

## 🎯 전체 로드맵 개요

**총 작업 기간**: 12-16주 (3-4개월)
**총 예상 시간**: 164시간

| Phase | 내용 | 기간 | 우선순위 |
|-------|------|------|---------|
| Phase 1 | 기반 강화 (색상, 접근성) | 2-3주 | 🔴 HIGH |
| Phase 2 | Inline 컴포넌트 (Card, Carousel, Icon) | 3-4주 | 🔴 HIGH |
| Phase 3 | 기존 컴포넌트 개선 | 2-3주 | 🟡 MEDIUM |
| Phase 4 | Fullscreen/피드백 (Skeleton, ChatSheet) | 2-3주 | 🟡 MEDIUM |
| Phase 5 | 문서화 및 검증 | 1-2주 | 🔴 HIGH |

**최종 목표**: OpenAI 가이드라인 준수도 **65/100 → 95/100**

---

## 🚀 즉시 시작 가능한 작업 (이번 주)

### 1. 색상 사용 현황 감사 (3시간)

**목적**: 모든 컴포넌트에서 하드코딩된 색상 값 및 커스텀 그라데이션 식별

**실행 명령**:
```bash
cd /Users/yujongmyeong/Documents/dev/ome/lyra/packages/ui

# 직접 색상 값 검색
grep -r "background:" src --include="*.css" > /tmp/bg-colors.txt

# 그라데이션 사용 검색
grep -r "gradient" src --include="*.css" > /tmp/gradients.txt

# 결과 분석
cat /tmp/bg-colors.txt
cat /tmp/gradients.txt
```

**산출물**: `claudedocs/color-audit-report.md`

**체크리스트**:
- [ ] 모든 컴포넌트 CSS 파일 검토
- [ ] 직접 색상 값 사용 사례 목록 작성
- [ ] 그라데이션 사용 사례 목록 작성 (예: `design-tokens.css`의 그라데이션)
- [ ] 배경 색상 오버라이드 사례 목록 작성

---

### 2. ChatGPT 테마 프리셋 개발 (4시간)

**목적**: OpenAI 색상 제약을 준수하는 테마 파일 생성

**파일 생성**:
```bash
mkdir -p /Users/yujongmyeong/Documents/dev/ome/lyra/packages/ui/src/themes
touch /Users/yujongmyeong/Documents/dev/ome/lyra/packages/ui/src/themes/chatgpt.css
```

**파일 내용**: (`chatgpt.css`)
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

/* 커스텀 브랜드 색상 변수 (선택적) */
:root {
  --brand-accent: var(--color-blue-600);
  --brand-accent-hover: var(--color-blue-700);
}
```

**Storybook 통합**: (`.storybook/preview.ts`)
```typescript
// ChatGPT 테마 import 예시 추가
export const decorators = [
  (Story) => (
    <div className="chatgpt-theme">
      <Story />
    </div>
  ),
];
```

**체크리스트**:
- [ ] `themes/chatgpt.css` 파일 생성
- [ ] 브랜드 색상 변수 정의
- [ ] 시스템 색상 고정 (`!important` 사용)
- [ ] 다크모드 지원 추가
- [ ] Storybook에 테마 적용 예시 추가

---

### 3. Card 컴포넌트 아키텍처 설계 (3시간)

**목적**: OpenAI Inline 모드의 핵심 컴포넌트 API 설계

**문서 작성**: `claudedocs/card-component-spec.md`

**API 명세**:
```typescript
// API 설계
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

export interface CardMetadataProps {
  children: React.ReactNode;
  /** 최대 줄 수 (OpenAI: 3줄) */
  lines?: number;
}

// 컴포넌트 구조
export const Card = {
  Root: CardRoot,        // 카드 컨테이너
  Media: CardMedia,      // 이미지/비디오
  Header: CardHeader,    // 제목 + 메타데이터 그룹
  Title: CardTitle,      // 제목
  Metadata: CardMetadata, // 메타데이터 (최대 3줄)
  Content: CardContent,  // 본문
  Actions: CardActions,  // 액션 버튼 (최대 2개)
};
```

**사용 예시**:
```tsx
// 기본 사용
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

// 이미지가 있는 카드
<Card.Root>
  <Card.Media src="/hotel.jpg" alt="호텔 전경" />
  <Card.Header>
    <Card.Title>럭셔리 호텔 A</Card.Title>
    <Card.Metadata lines={3}>
      서울 강남구<br />
      ₩150,000 / 박<br />
      ⭐ 4.8 (123)
    </Card.Metadata>
  </Card.Header>
  <Card.Actions>
    <Button>예약하기</Button>
  </Card.Actions>
</Card.Root>
```

**제약사항**:
- ✅ 최대 2개 주요 액션
- ✅ 깊은 네비게이션/중첩 스크롤 금지
- ✅ 동적 높이 (콘텐츠 따라 조정)
- ✅ 메타데이터 최대 3줄

**체크리스트**:
- [ ] API 명세 작성
- [ ] 컴포넌트 구조 설계
- [ ] Props 인터페이스 정의
- [ ] 사용 예시 작성 (최소 5개)
- [ ] 제약사항 명시

---

## 📅 1주차 전체 목표

### 완료 예정 작업
1. ✅ 색상 사용 현황 감사 완료
2. ✅ ChatGPT 테마 프리셋 개발 완료
3. ✅ Card 컴포넌트 API 설계 완료

### 시작 예정 작업
4. 🔄 색상 토큰 마이그레이션 시작 (Phase 1.1.2)
5. 🔄 Card 컴포넌트 구현 시작 (Phase 2.1.2)

**총 예상 시간**: 10시간 (1.25일)

---

## 🎯 1개월 목표 (MVP Phase 1-2 일부)

### Phase 1 완료 (기반 강화)
- ✅ 색상 시스템 OpenAI 표준 정렬
- ✅ 색상 대비율 검증 자동화 (Storybook A11y)
- ✅ ScreenReaderOnly 유틸리티 컴포넌트
- ✅ ChatGPT 테마 프리셋

### Phase 2 일부 완료 (핵심 컴포넌트)
- ✅ Card 컴포넌트 (Inline 모드의 핵심)
- ✅ Icon 컴포넌트 (아이콘 표준화)

**예상 누적 시간**: 70시간 (약 9일)

---

## 📊 진행 상황 추적

### 주간 체크인 (매주 금요일)
1. 완료된 작업 리스트
2. 다음 주 계획
3. 블로커 및 리스크 식별
4. OpenAI 가이드라인 준수도 업데이트

### 마일스톤
- **Week 4**: Phase 1 완료 (기반 강화)
- **Week 8**: Phase 2 완료 (Inline 컴포넌트)
- **Week 12**: Phase 3-4 완료 (개선 및 Fullscreen)
- **Week 16**: Phase 5 완료 (문서화 및 검증)

---

## 🔗 주요 문서 링크

### 로드맵 및 계획
- **구현 로드맵**: `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/openai-alignment-implementation-roadmap.md`
- **다음 단계**: `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/NEXT_STEPS.md` (이 문서)

### 분석 문서
- **정렬 설계**: `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/lyra-ui-openai-alignment-design.md`
- **일치도 분석**: `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/lyra-ui-vs-openai-apps-sdk-analysis.md`
- **OpenAI 가이드라인**: `/Users/yujongmyeong/Documents/dev/ome/lyra/claudedocs/openai-apps-sdk-design-guidelines.md`

### 프로젝트 파일
- **프로젝트 루트**: `/Users/yujongmyeong/Documents/dev/ome/lyra`
- **UI 패키지**: `/Users/yujongmyeong/Documents/dev/ome/lyra/packages/ui`
- **컴포넌트**: `/Users/yujongmyeong/Documents/dev/ome/lyra/packages/ui/src/components`

---

## 💡 주요 의사결정 사항

### 1. Breaking Changes 없음
기존 컴포넌트는 모두 유지하며, OpenAI 특화 기능만 추가합니다.

**근거**:
- 기존 사용자 경험 보호
- 점진적 마이그레이션 가능
- 범용 라이브러리 특성 유지

### 2. 네임스페이스 분리
ChatGPT 특화 컴포넌트는 별도 네임스페이스에 배치합니다.

**구조**:
```
components/
├── core/              # 기존 범용 컴포넌트
│   ├── button/
│   ├── dialog/
│   └── ...
├── chatgpt/           # OpenAI 특화 컴포넌트 (신규)
│   ├── card/
│   ├── carousel/
│   └── chat-sheet/
└── utilities/         # 유틸리티
    ├── icon/
    └── screen-reader-only/
```

### 3. 점진적 접근
MVP (Phase 1-2)를 먼저 완료하고, Phase 3-4는 선택적으로 진행합니다.

**MVP 범위**:
- Phase 1: 기반 강화 (색상, 접근성)
- Phase 2: Card, Carousel, Icon 컴포넌트

**선택적 범위**:
- Phase 3: 기존 컴포넌트 개선
- Phase 4: Fullscreen 및 피드백 컴포넌트

---

## ⚠️ 리스크 및 고려사항

### 리스크 1: 일정 지연
**예상**: 12-16주 → 실제 20주 이상 가능

**완화 전략**:
- MVP 우선 (Phase 1-2만 먼저 완료)
- 주간 진행 상황 체크인
- 블로커 조기 식별 및 해결

### 리스크 2: 번들 크기 증가
**예상**: 50KB → 60KB (신규 컴포넌트 10KB 추가)

**완화 전략**:
- Tree-shaking 최적화
- 코드 스플리팅 (React.lazy)
- 중복 제거 (공통 유틸리티 추출)

### 리스크 3: 기존 사용자 혼란
**예상**: 새로운 컴포넌트 및 가이드라인 학습 비용

**완화 전략**:
- 상세한 마이그레이션 가이드 제공
- Storybook 예시 확장
- FAQ 섹션 추가

---

## 🎓 학습 자료

### OpenAI Apps SDK
- [공식 가이드라인](https://developers.openai.com/apps-sdk/concepts/design-guidelines)
- Figma 컴포넌트 라이브러리

### 접근성
- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Storybook A11y Addon](https://storybook.js.org/addons/@storybook/addon-a11y)

### React 컴포넌트 패턴
- [Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Headless UI Patterns](https://www.merrickchristensen.com/articles/headless-user-interface-components/)

---

## 📞 문의 및 지원

### 기술적 질문
- GitHub Issues
- 팀 슬랙 채널

### 디자인 검토
- 디자이너와 주간 동기화
- Figma 파일 참조

### OpenAI 가이드라인 해석
- 공식 문서 참조
- 커뮤니티 포럼

---

**작성일**: 2025-10-23
**최종 업데이트**: 2025-10-23
**다음 업데이트**: 2025-10-30 (1주일 후)
