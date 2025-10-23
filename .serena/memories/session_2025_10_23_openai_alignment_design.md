# Lyra UI - OpenAI Apps SDK 정렬 설계 세션

> 작성일: 2025-10-23
> 목적: OpenAI Apps SDK 디자인 가이드라인에 맞춘 Lyra UI 개선 방향 설계

## 세션 개요

**작업 내용**: packages/ui를 OpenAI Apps SDK 디자인 가이드라인에 맞게 개선하는 종합 설계 수립

**주요 산출물**: `/claudedocs/lyra-ui-openai-alignment-design.md` (상세 설계 문서)

## 핵심 설계 결과

### 1. OpenAI 가이드라인 5대 원칙 정렬

**Conversational (대화형)**:
- ChatSheet 컴포넌트 추가 (Fullscreen 모드)
- Dialog 대화 컨텍스트 유지 기능 강화

**Intelligent (지능형)**:
- ContextualPrompt 컴포넌트 (사용자 의도 기반 제안)
- Menu 컨텍스트 기반 활성화/비활성화

**Simple (단순함)**:
- Card 최대 2개 액션 제한
- SimpleDialog 템플릿 추가

**Responsive (반응형)**:
- Progress 스트리밍 인디케이터
- Skeleton 로딩 상태 컴포넌트

**Accessible (접근성)**:
- WCAG AA 필수 준수
- Storybook A11y addon 통합
- 색상 대비율 검증 시스템

### 2. 디스플레이 모드별 컴포넌트 전략

**Inline Mode (인라인 모드)**:
- 신규: Card, Carousel, Icon
- 기존 활용: Button, Avatar, Progress

**Fullscreen Mode (풀스크린 모드)**:
- 신규: ChatSheet, Canvas
- 특징: ChatGPT composer 오버레이, 스트리밍 인디케이터

**Picture-in-Picture (PiP)**:
- 신규: FloatingWindow
- 특징: 대화 중 지속 표시, 동적 응답

### 3. 신규 컴포넌트 10개

#### 우선순위 🔴 HIGH
1. **Card**: Inline 카드 (최대 2개 액션, 동적 높이)
2. **Carousel**: 3-8개 항목 캐러셀
3. **Icon**: 시스템 아이콘 (단색/아웃라인)

#### 우선순위 🟡 MEDIUM
4. **ChatSheet**: Fullscreen 모드 (composer 오버레이)
5. **Image**: 표준화 (alt 필수, aspect ratio 강제)
6. **Skeleton**: 로딩 상태
7. **ScreenReaderOnly**: 접근성 유틸리티

#### 우선순위 🟢 LOW
8. **FloatingWindow**: PiP 모드
9. **Canvas**: 복잡한 인터랙션 (편집, 맵)
10. **ContextualPrompt**: 사용자 의도 기반 제안

### 4. 기존 컴포넌트 개선 방향

**Button**:
- 터치 타겟 최소 44x44px 보장 (모바일)
- Inline Card에서 최대 2개 제한 variant

**Dialog**:
- SimpleDialog 템플릿 (최대 2개 액션)
- ChatSheet 통합 옵션

**Toast**:
- 대화 흐름 통합 (ChatGPT 메시지 스타일)
- 컨텍스트 기반 알림 패턴

**Progress**:
- 스트리밍 인디케이터 추가
- 예상 완료 시간 표시

**Select**:
- 검색 기능 추가 (긴 리스트)
- 컨텍스트 기반 기본값

### 5. 비주얼 디자인 표준 정렬

#### Color System
- ✅ 이미 준수: 시스템 정의 팔레트, 계층적 시멘틱 토큰
- 🔄 개선: 커스텀 그라데이션/배경 오버라이드 제거
- 🔄 다크 모드 일관성 강화

#### Typography
- 🔄 플랫폼별 폰트 스택 구현:
  ```css
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui;
  ```
- ✅ 일관된 사이징 계층 유지

#### Spacing & Layout
- 🔄 Border Radius 표준화 (sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 9999px)
- ✅ 시스템 그리드 간격 유지

#### Iconography
- 신규: Icon 컴포넌트 (단색, 아웃라인 스타일)
- alt text 필수, aspect ratio 강제

#### Accessibility
- 🔴 WCAG AA 대비율 검증 시스템 구축
- 🔴 텍스트 크기 조정 지원 (레이아웃 깨짐 없이)
- Storybook A11y addon 통합
- CI/CD 접근성 검증 자동화

### 6. 아키텍처 개선안

#### 컴포넌트 분류 재구성
```
components/
├── core/          # 범용 (button, checkbox, switch)
├── inline/        # Inline 모드 (card, carousel, compact-dialog)
├── fullscreen/    # Fullscreen 모드 (chat-sheet, canvas)
├── pip/           # PiP 모드 (floating-window)
├── feedback/      # 피드백 (toast, progress, skeleton)
└── utilities/     # 유틸리티 (icon, image, screen-reader-only)
```

**장점**:
- 명확한 사용 목적
- OpenAI 가이드라인 직접 매핑
- 팀 협업 효율성 향상

#### 디자인 토큰 확장
```css
/* OpenAI Inline 모드 토큰 */
--inline-card-padding: var(--spacing-4);
--inline-card-max-actions: 2;
--inline-carousel-min-items: 3;
--inline-carousel-max-items: 8;

/* OpenAI Fullscreen 모드 토큰 */
--fullscreen-composer-height: 80px;

/* OpenAI 접근성 토큰 */
--a11y-min-contrast-ratio: 4.5;
--a11y-min-touch-target: 44px;
```

#### 컴포넌트 템플릿 생성기
- Plop 템플릿 도입
- OpenAI 제약사항 자동 주석 포함
- 접근성 테스트 기본 포함

### 7. 구현 로드맵 (13주)

**Phase 1: 기반 강화 (2-3주)**
- 색상 오버라이드 검증 및 제거
- WCAG AA 대비율 검증 시스템
- Storybook A11y addon 통합
- 플랫폼별 폰트 스택
- Border Radius 표준화

**Phase 2: Inline 모드 컴포넌트 (3-4주)**
- Card 컴포넌트 (Media, Header, Actions)
- Icon 컴포넌트 (시스템 아이콘 세트)
- Carousel 컴포넌트 (3-8개 항목)
- Image 컴포넌트 개선

**Phase 3: 기존 컴포넌트 개선 (2-3주)**
- Button: 터치 타겟 44x44px
- Dialog: SimpleDialog 템플릿
- Toast: 컨텍스트 기반 알림
- Progress: 스트리밍 인디케이터
- Select: 검색 기능

**Phase 4: Fullscreen & 피드백 (2-3주)**
- ChatSheet 컴포넌트 (Composer, StreamingIndicator)
- Skeleton 컴포넌트 (Avatar, Text, Button)

**Phase 5: 문서화 & 검증 (1-2주)**
- Storybook 문서 업데이트
- OpenAI 가이드라인 체크리스트
- 접근성 감사
- 성능 벤치마크
- 마이그레이션 가이드

### 8. 성공 지표

**기술적 지표**:
- 접근성: WCAG AA 100% 준수
- 색상 대비율: 4.5:1 이상 100%
- 터치 타겟: 44x44px 이상 100%
- 번들 크기: ≤55KB gzipped (+10% 이내)

**OpenAI 가이드라인 준수**:
- Inline Card: 최대 2개 액션, 깊은 네비게이션 없음
- Carousel: 3-8개 항목 제한
- 시스템 스타일: 커스텀 오버라이드 0건
- 플랫폼 폰트: iOS/Android 네이티브 사용

**개발자 경험**:
- 컴포넌트 생성: Plop으로 5분 내
- 문서화: 모든 컴포넌트 Storybook + OpenAI 참조
- 타입 안전성: TypeScript strict 100%

### 9. 리스크 & 완화 전략

**리스크 1: 기존 컴포넌트 호환성**
- 완화: 별도 네임스페이스 (`Card.Inline` vs `Card.Standard`)
- 점진적 마이그레이션, Deprecation 경고

**리스크 2: 번들 크기 증가**
- 완화: Tree-shaking, 코드 스플리팅, 중복 제거

**리스크 3: 접근성 검증 복잡도**
- 완화: Storybook A11y addon, CI/CD 통합, 월간 감사

## 핵심 의사결정

### 1. 컴포넌트 분류 체계 변경
**결정**: OpenAI 디스플레이 모드별 디렉토리 구조 도입
**이유**: 사용 목적 명확화, 가이드라인 직접 매핑
**영향**: 기존 컴포넌트 재배치 필요 (하위 호환성 유지)

### 2. 접근성 우선순위 상향
**결정**: WCAG AA 필수 준수, 자동화 검증 시스템 구축
**이유**: OpenAI 가이드라인 필수 요구사항
**영향**: Phase 1에서 모든 컴포넌트 검증 필요

### 3. 신규 컴포넌트 10개 추가
**결정**: Card, Carousel 등 OpenAI 특화 컴포넌트 개발
**이유**: ChatGPT 통합 경험 최적화
**영향**: 개발 리소스 13주 소요

### 4. 디자인 토큰 확장
**결정**: OpenAI 모드별 전용 토큰 추가
**이유**: 가이드라인 제약사항 명시적 표현
**영향**: global.css 확장, 문서화 업데이트

## 다음 단계 (Action Items)

### 즉시 실행
1. 팀 리뷰: 설계 문서 검토 및 우선순위 조정
2. 리소스 할당: Phase별 담당자 배정
3. 킥오프 준비: Phase 1 색상 & 접근성 작업 계획

### 1주 내
1. Phase 1 시작: 색상 오버라이드 검증
2. Storybook A11y addon 설정
3. 플랫폼별 폰트 스택 구현

### 1개월 내
1. Phase 1 완료: 기반 강화 마무리
2. Phase 2 시작: Card 컴포넌트 개발
3. 주간 체크인: 진행 상황 공유

## 참고 문서

**설계 문서**: `/claudedocs/lyra-ui-openai-alignment-design.md`
**OpenAI 가이드라인**: `/claudedocs/openai-apps-sdk-design-guidelines.md`
**기술 패턴**: `.serena/memories/lyra_ui_technical_patterns`
**프로젝트 컨텍스트**: `.serena/memories/lyra_ui_project_context`

## 설계 품질 평가

**완성도**: ✅ 종합 설계 완료
**실행 가능성**: ✅ 13주 로드맵 제시
**OpenAI 정렬**: ✅ 5대 원칙 모두 반영
**위험 관리**: ✅ 리스크 식별 및 완화 전략
**성공 지표**: ✅ 정량적 지표 정의

## 메모

- 이 설계는 기존 Lyra UI 아키텍처를 유지하면서 OpenAI 가이드라인을 최대한 준수하는 방향
- Base UI 기반 구조는 변경하지 않고, 추가/개선 방식으로 접근
- 점진적 마이그레이션을 통해 기존 사용자 영향 최소화
- 접근성과 성능을 절대 타협하지 않는 것이 핵심
