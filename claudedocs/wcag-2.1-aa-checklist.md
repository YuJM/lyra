# WCAG 2.1 AA 체크리스트

> 생성일: 2025-10-23
> 목적: Lyra UI 컴포넌트 WCAG 2.1 Level AA 준수 검증

## 📋 개요

이 문서는 Web Content Accessibility Guidelines (WCAG) 2.1 Level AA 준수를 위한 체크리스트입니다.
모든 Lyra UI 컴포넌트는 이 체크리스트를 100% 만족해야 합니다.

### 검증 도구
- **자동 검증**: Storybook A11y addon (axe-core 기반)
- **수동 검증**: 키보드 네비게이션, 스크린 리더 (NVDA, JAWS, VoiceOver)
- **대비율 검증**: Chrome DevTools, WebAIM Contrast Checker

---

## 1. Perceivable (인지 가능)

### 1.1 Text Alternatives (텍스트 대안)

#### 1.1.1 Non-text Content (Level A)
- [ ] 모든 이미지에 적절한 `alt` 속성 제공
- [ ] 장식용 이미지는 `alt=""` 또는 `role="presentation"` 사용
- [ ] 아이콘 버튼에 `aria-label` 또는 시각적으로 숨겨진 텍스트 제공
- [ ] SVG 아이콘에 `<title>` 또는 `aria-labelledby` 제공

**자동 검증**: `image-alt`, `input-image-alt`, `button-name`

---

### 1.3 Adaptable (적응 가능)

#### 1.3.1 Info and Relationships (Level A)
- [ ] 의미 있는 HTML5 시맨틱 태그 사용 (`<button>`, `<nav>`, `<main>`, `<article>` 등)
- [ ] 폼 필드에 `<label>` 연결 (`for` 속성 또는 중첩)
- [ ] 리스트에 적절한 마크업 사용 (`<ul>`, `<ol>`, `<li>`)
- [ ] 테이블에 `<th>`, `<caption>`, `scope` 속성 사용

**자동 검증**: `label`, `list`, `listitem`, `form-field-multiple-labels`

#### 1.3.2 Meaningful Sequence (Level A)
- [ ] DOM 순서가 시각적 순서와 일치
- [ ] CSS로 순서 변경 시 키보드/스크린 리더 순서 검증

**수동 검증 필요**

#### 1.3.4 Orientation (Level AA)
- [ ] 컴포넌트가 가로/세로 방향 모두 지원
- [ ] 방향 고정이 필수적인 경우만 제한 (예: 피아노 앱)

**수동 검증 필요**

#### 1.3.5 Identify Input Purpose (Level AA)
- [ ] 폼 입력 필드에 `autocomplete` 속성 제공 (이름, 이메일, 주소 등)

**수동 검증 필요**

---

### 1.4 Distinguishable (구별 가능)

#### 1.4.1 Use of Color (Level A)
- [ ] 색상만으로 정보 전달하지 않음 (아이콘, 텍스트, 패턴 병행)
- [ ] 오류 표시 시 색상 + 아이콘 + 텍스트 제공

**수동 검증 필요**

#### 1.4.3 Contrast (Minimum) (Level AA) 🔴 **CRITICAL**
- [ ] 일반 텍스트: **최소 4.5:1** 대비율
- [ ] 대형 텍스트 (18pt 이상 또는 14pt bold): **최소 3:1** 대비율
- [ ] UI 컴포넌트 및 그래픽 객체: **최소 3:1** 대비율

**자동 검증**: `color-contrast`
**도구**: Chrome DevTools, WebAIM Contrast Checker

#### 1.4.4 Resize Text (Level AA)
- [ ] 텍스트 200% 확대 시 레이아웃 깨지지 않음
- [ ] 컨텐츠/기능 손실 없음
- [ ] 가로 스크롤 불필요

**수동 검증 필요**: 브라우저 확대/축소 (Cmd/Ctrl + +)

#### 1.4.5 Images of Text (Level AA)
- [ ] 텍스트 이미지 최소화, 실제 텍스트 사용
- [ ] 로고/브랜드는 예외

**수동 검증 필요**

#### 1.4.10 Reflow (Level AA)
- [ ] 320px 너비에서 세로 스크롤만 발생 (가로 스크롤 없음)
- [ ] 1280px 높이에서 가로 스크롤만 발생 (세로 스크롤 없음)

**수동 검증 필요**: 브라우저 400% 확대 (320px 뷰포트 시뮬레이션)

#### 1.4.11 Non-text Contrast (Level AA)
- [ ] UI 컴포넌트 경계: **최소 3:1** 대비율
- [ ] 버튼, 입력 필드, 포커스 인디케이터 등
- [ ] 그래픽 객체 (차트, 아이콘): **최소 3:1** 대비율

**수동 검증 필요**: Chrome DevTools Contrast Ratio

#### 1.4.12 Text Spacing (Level AA)
- [ ] 사용자가 다음 스타일 조정 시 컨텐츠 손실 없음:
  - `line-height`: 최소 1.5배
  - `letter-spacing`: 최소 0.12배
  - `word-spacing`: 최소 0.16배
  - `paragraph spacing`: 최소 2배

**수동 검증 필요**: 북마클릿 또는 브라우저 확장

#### 1.4.13 Content on Hover or Focus (Level AA)
- [ ] 호버/포커스로 나타난 컨텐츠 (툴팁, 드롭다운):
  - **Dismissable**: ESC 키로 닫을 수 있음
  - **Hoverable**: 마우스를 컨텐츠 위로 이동 가능
  - **Persistent**: 사용자가 제거하거나 더 이상 유효하지 않을 때까지 유지

**수동 검증 필요**

---

## 2. Operable (조작 가능)

### 2.1 Keyboard Accessible (키보드 접근)

#### 2.1.1 Keyboard (Level A)
- [ ] 모든 기능을 키보드로 조작 가능
- [ ] Tab, Enter, Space, Arrow 키 지원
- [ ] 마우스 전용 기능 없음

**수동 검증 필수**: Tab 키로 전체 순회

#### 2.1.2 No Keyboard Trap (Level A)
- [ ] 키보드 포커스가 특정 요소에 갇히지 않음
- [ ] 모달/다이얼로그에서 ESC 또는 닫기 버튼으로 탈출 가능

**수동 검증 필수**

#### 2.1.4 Character Key Shortcuts (Level A)
- [ ] 단일 문자 단축키 (예: `s` 검색) 비활성화 또는 재매핑 가능
- [ ] 포커스 컨텍스트에서만 활성화

**수동 검증 필요**

---

### 2.2 Enough Time (충분한 시간)

#### 2.2.1 Timing Adjustable (Level A)
- [ ] 시간 제한이 있는 경우:
  - 사용자가 끄거나, 조정하거나, 연장 가능 (최소 10배)
  - 또는 타임아웃 20시간 이상

**수동 검증 필요**

#### 2.2.2 Pause, Stop, Hide (Level A)
- [ ] 자동 재생 콘텐츠 (5초 이상):
  - 일시 정지, 중지, 숨기기 가능

**수동 검증 필요**

---

### 2.3 Seizures and Physical Reactions (발작 및 신체 반응)

#### 2.3.1 Three Flashes or Below Threshold (Level A)
- [ ] 초당 3회 이상 깜박임 없음
- [ ] 애니메이션/전환 효과 검토

**수동 검증 필요**

---

### 2.4 Navigable (탐색 가능)

#### 2.4.1 Bypass Blocks (Level A)
- [ ] 반복 콘텐츠 건너뛰기 링크 제공 (예: "Skip to main content")

**수동 검증 필요** (애플리케이션 레벨)

#### 2.4.2 Page Titled (Level A)
- [ ] 모든 페이지/뷰에 설명적인 `<title>` 제공

**자동 검증**: `frame-title` (iframe)

#### 2.4.3 Focus Order (Level A)
- [ ] 포커스 순서가 의미/조작 순서와 일치
- [ ] Tab 순서가 논리적

**수동 검증 필수**: Tab 키로 순회

#### 2.4.4 Link Purpose (In Context) (Level A)
- [ ] 링크 텍스트가 목적을 명확히 설명
- [ ] "여기를 클릭", "더 보기" 등 모호한 텍스트 지양

**자동 검증**: `link-name`

#### 2.4.5 Multiple Ways (Level AA)
- [ ] 여러 방법으로 콘텐츠 접근 가능 (검색, 사이트맵, 네비게이션 등)

**수동 검증 필요** (애플리케이션 레벨)

#### 2.4.6 Headings and Labels (Level AA)
- [ ] 설명적인 헤딩 및 레이블 제공
- [ ] 폼 레이블이 목적을 명확히 설명

**수동 검증 필요**

#### 2.4.7 Focus Visible (Level AA) 🔴 **CRITICAL**
- [ ] 포커스 인디케이터가 명확히 보임
- [ ] `outline: none` 제거 시 대체 스타일 제공
- [ ] 최소 3:1 대비율 (1.4.11 준수)

**수동 검증 필수**: Tab 키로 확인

---

### 2.5 Input Modalities (입력 방식)

#### 2.5.1 Pointer Gestures (Level A)
- [ ] 다중 포인터 제스처 (예: 핀치 줌)에 대한 단일 포인터 대안 제공

**수동 검증 필요**

#### 2.5.2 Pointer Cancellation (Level A)
- [ ] 클릭 완료 시점: `mouseup` (취소 가능)
- [ ] `mousedown`으로 액션 트리거하지 않음

**수동 검증 필요**

#### 2.5.3 Label in Name (Level A)
- [ ] 시각적 레이블이 접근 가능한 이름 (accessible name)에 포함
- [ ] 음성 제어 사용자 지원

**자동 검증**: `label-content-name-mismatch` (axe-core 옵션)

#### 2.5.4 Motion Actuation (Level A)
- [ ] 기기 모션으로 트리거되는 기능에 대한 대안 UI 제공

**수동 검증 필요**

---

## 3. Understandable (이해 가능)

### 3.1 Readable (읽기 가능)

#### 3.1.1 Language of Page (Level A)
- [ ] `<html lang="ko">` 또는 적절한 언어 코드 지정

**자동 검증**: `html-has-lang`, `html-lang-valid`

#### 3.1.2 Language of Parts (Level AA)
- [ ] 언어가 변경되는 부분에 `lang` 속성 지정

**자동 검증**: `valid-lang`

---

### 3.2 Predictable (예측 가능)

#### 3.2.1 On Focus (Level A)
- [ ] 포커스만으로 컨텍스트가 변경되지 않음 (예: 자동 제출)

**수동 검증 필요**

#### 3.2.2 On Input (Level A)
- [ ] 입력만으로 컨텍스트가 변경되지 않음 (예: 자동 페이지 이동)
- [ ] 변경 시 사전 경고 제공

**수동 검증 필요**

#### 3.2.3 Consistent Navigation (Level AA)
- [ ] 반복 네비게이션 요소가 일관된 순서로 표시

**수동 검증 필요** (애플리케이션 레벨)

#### 3.2.4 Consistent Identification (Level AA)
- [ ] 동일한 기능을 가진 컴포넌트가 일관된 방식으로 식별

**수동 검증 필요**

---

### 3.3 Input Assistance (입력 지원)

#### 3.3.1 Error Identification (Level A)
- [ ] 입력 오류가 자동 감지되면 텍스트로 설명
- [ ] 오류 메시지가 명확하고 구체적

**수동 검증 필요**

#### 3.3.2 Labels or Instructions (Level A)
- [ ] 사용자 입력이 필요한 경우 레이블 또는 설명 제공

**자동 검증**: `label`

#### 3.3.3 Error Suggestion (Level AA)
- [ ] 입력 오류 감지 시 수정 제안 제공 (보안 관련 제외)

**수동 검증 필요**

#### 3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)
- [ ] 법적/금융 거래, 데이터 수정/삭제 시:
  - 되돌릴 수 있거나
  - 데이터를 확인하고 수정할 수 있거나
  - 제출 전 확인 메커니즘 제공

**수동 검증 필요** (애플리케이션 레벨)

---

## 4. Robust (견고함)

### 4.1 Compatible (호환 가능)

#### 4.1.1 Parsing (Level A) - **DEPRECATED in WCAG 2.2**
- [ ] HTML 문법 검증 (중복 ID 없음, 닫는 태그 등)

**자동 검증**: `duplicate-id`

#### 4.1.2 Name, Role, Value (Level A)
- [ ] 모든 UI 컴포넌트에 적절한 `name`, `role`, `value` 제공
- [ ] ARIA 속성 올바르게 사용

**자동 검증**: `aria-*` 규칙들

#### 4.1.3 Status Messages (Level AA)
- [ ] 상태 메시지 (성공, 오류, 진행 상황)에 `role="status"`, `role="alert"` 등 사용
- [ ] 포커스 이동 없이 스크린 리더에 알림

**수동 검증 필요**

---

## 📊 컴포넌트별 체크리스트

### Button 컴포넌트
- [x] `<button>` 시맨틱 태그 사용
- [x] 접근 가능한 이름 (`children` 또는 `aria-label`)
- [x] 포커스 인디케이터 (3:1 대비율)
- [x] 키보드 조작 (Enter, Space)
- [ ] 색상 대비율 4.5:1 (배경-텍스트) 검증 필요
- [ ] 아이콘 전용 버튼 `aria-label` 검증

### Checkbox 컴포넌트
- [x] `<input type="checkbox">` 기반
- [x] `<label>` 연결
- [x] 포커스 인디케이터
- [x] 키보드 조작 (Space)
- [ ] 색상 대비율 검증

### Dialog 컴포넌트
- [x] `role="dialog"` 또는 `<dialog>`
- [x] `aria-labelledby` (제목)
- [x] `aria-describedby` (설명)
- [x] 포커스 트랩 (Tab 순환)
- [x] ESC 키로 닫기
- [x] 열릴 때 포커스 이동
- [x] 닫힐 때 원래 요소로 포커스 복귀
- [ ] 배경 비활성화 (inert)

### Switch 컴포넌트
- [x] `role="switch"` 또는 `<input type="checkbox" role="switch">`
- [x] `aria-checked="true|false"`
- [x] `<label>` 연결
- [x] 포커스 인디케이터
- [x] 키보드 조작 (Space)
- [ ] 색상 대비율 검증

### Popover 컴포넌트
- [x] `role="tooltip"` 또는 `role="dialog"` (컨텍스트에 따라)
- [ ] `aria-describedby` 또는 `aria-labelledby`
- [x] ESC 키로 닫기
- [ ] 호버 가능 (Hoverable) 검증
- [ ] 지속성 (Persistent) 검증

### Avatar 컴포넌트
- [x] `<img>` 또는 배경 이미지
- [ ] `alt` 속성 (사용자 이름) 검증
- [ ] 대체 텍스트가 없는 경우 `role="presentation"` 또는 `aria-hidden="true"`

### Progress 컴포넌트
- [x] `role="progressbar"`
- [x] `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] `aria-label` 또는 `aria-labelledby` (진행 상황 설명)

### Toast (Notification) 컴포넌트
- [ ] `role="status"` (일반 알림) 또는 `role="alert"` (긴급 알림)
- [ ] `aria-live="polite"` 또는 `"assertive"`
- [ ] 자동 닫기 시간 충분 (최소 5초)
- [ ] 일시 정지/닫기 버튼 제공

---

## 🛠️ 검증 프로세스

### 1. 개발 단계
1. 컴포넌트 구현 시 이 체크리스트 참조
2. Storybook A11y addon으로 실시간 검증
3. Chrome DevTools로 대비율 확인

### 2. 코드 리뷰 단계
1. 자동 검증 도구 결과 확인
2. 수동 항목 검토 (키보드 네비게이션, 스크린 리더)

### 3. QA/테스트 단계
1. 전체 사용자 흐름 키보드로 테스트
2. 스크린 리더로 주요 기능 테스트 (NVDA, JAWS, VoiceOver)
3. 브라우저 확대/축소 테스트 (200%, 400%)
4. 모바일 접근성 테스트 (TalkBack, VoiceOver)

### 4. CI/CD 단계 (향후)
1. axe-core CLI 자동 실행
2. Lighthouse CI 접근성 점수 검증 (목표: 100점)
3. Pa11y CI로 전체 페이지 스캔

---

## 📚 참고 자료

### 공식 문서
- [WCAG 2.1 공식 문서](https://www.w3.org/TR/WCAG21/)
- [WCAG 2.1 한국어 번역](https://www.w3.org/TR/WCAG21-ko/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

### 검증 도구
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### 스크린 리더
- [NVDA](https://www.nvaccess.org/) (Windows, 무료)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows, 유료)
- VoiceOver (macOS/iOS, 내장)
- TalkBack (Android, 내장)

---

## ✅ 다음 단계

1. **자동화 스크립트 추가**: `pnpm test:a11y` 명령어로 전체 컴포넌트 검증
2. **CI/CD 통합**: PR 시 자동 접근성 검사
3. **월간 감사**: 수동 항목 정기 검증
4. **개발자 교육**: 접근성 가이드라인 공유 세션

---

**작성자**: Claude (Lyra UI OpenAI Alignment Project)
**검토 필요**: Frontend Team, QA Team
**업데이트 주기**: 분기별 또는 WCAG 업데이트 시
