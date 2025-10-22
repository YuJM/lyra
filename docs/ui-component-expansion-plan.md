# UI 컴포넌트 확장 계획

> Base UI 기반 Lyra UI 패키지 컴포넌트 확장 로드맵

## 📊 현재 상태

### ✅ 구현 완료
- [x] Button - 기본 버튼 컴포넌트
- [x] Checkbox - 단일 체크박스 (indeterminate 지원)
- [x] CheckboxGroup - 다중 선택 및 Parent/Nested Parent 패턴
- [x] Switch - 토글 스위치 (controlled/uncontrolled)
- [x] Radio - 라디오 버튼 (단일 컴포넌트)
- [x] RadioGroup - 단일 선택 그룹 (방향키 네비게이션)

### 🛠️ 인프라
- [x] Vitest + @testing-library/react 테스트 환경
- [x] Design Tokens (spacing, colors, typography)
- [x] CSS Modules 스타일링 시스템
- [x] Storybook 통합
- [x] 테스트 커버리지 98%+

---

## 🎯 Phase 1: Form 컴포넌트 (우선순위: 높음)

### 1. Switch
**상태**: ✅ 완료
**난이도**: ⭐ 쉬움
**실제 시간**: ~1시간
**우선순위**: 1순위

**작업 항목**:
- [x] `src/switch.tsx` 컴포넌트 구현
  - [x] Switch.Root (controlled/uncontrolled)
  - [x] Switch.Thumb (시각적 인디케이터)
- [x] `src/switch.module.css` 스타일 작성
  - [x] 기본 상태 (unchecked)
  - [x] 체크 상태 (checked)
  - [x] 비활성화 상태 (disabled)
  - [x] 호버/포커스 상태
  - [x] 트랜지션 애니메이션
- [x] `src/switch.test.tsx` 테스트 작성
  - [x] 렌더링 테스트
  - [x] 토글 인터랙션 테스트
  - [x] 제어/비제어 모드 테스트
  - [x] 접근성 테스트
  - [x] 키보드 네비게이션 테스트
- [x] `src/stories/LyraSwitch.stories.tsx` 스토리 작성
  - [x] Default
  - [x] Controlled
  - [x] Disabled
  - [x] With Label
  - [x] MultipleStates
- [x] `src/index.tsx`에 export 추가

**테스트 결과**: 17개 테스트 모두 통과 ✅

**구현 참고**:
```tsx
<Switch checked={isDark} onCheckedChange={setIsDark} />
```

**설계 결정**: 디자인 시스템의 완성품 컴포넌트이므로 compose 패턴 대신 단일 컴포넌트로 제공

---

### 2. Radio + RadioGroup
**상태**: ✅ 완료
**난이도**: ⭐⭐ 중간
**실제 시간**: ~2시간
**우선순위**: 2순위

**작업 항목**:
- [x] `src/radio.tsx` 컴포넌트 구현
  - [x] 단일 컴포넌트 패턴 (Radio.Root + Radio.Indicator 통합)
- [x] `src/radio-group.tsx` 컴포넌트 구현
  - [x] RadioGroup Base UI re-export
  - [x] 단일 선택 로직
  - [x] value/onValueChange props
- [x] `src/radio.module.css` 스타일 작성
  - [x] 원형 디자인 (border-radius-full)
  - [x] 기본/선택 상태
  - [x] 비활성화 상태
  - [x] 호버/포커스 상태
- [x] `src/radio.test.tsx` + `src/radio-group.test.tsx` 테스트
  - [x] 단일 선택 동작
  - [x] 제어/비제어 모드
  - [x] 키보드 네비게이션 (방향키)
  - [x] 접근성 (role="radio", role="radiogroup")
- [x] Storybook 스토리 (7개)
  - [x] Default
  - [x] WithDefaultValue
  - [x] Disabled
  - [x] DisabledOptions
  - [x] Controlled
  - [x] Horizontal
  - [x] WithDescriptions
- [x] Export 추가

**테스트 결과**:
- Radio: 11개 테스트 통과 ✅
- RadioGroup: 13개 테스트 통과 ✅

**구현 참고**:
```tsx
<RadioGroup value={selected} onValueChange={setSelected}>
  <Radio value="a" />
  <Radio value="b" />
</RadioGroup>
```

**설계 결정**: Switch와 동일하게 단일 컴포넌트 패턴 사용

---

### 3. Field
**상태**: ✅ 완료
**난이도**: ⭐⭐ 중간
**실제 시간**: ~2시간
**우선순위**: 3순위

**작업 항목**:
- [x] `src/field.tsx` 컴포넌트 구현
  - [x] Field.Root
  - [x] Field.Label
  - [x] Field.Control
  - [x] Field.Description
  - [x] Field.Error (match prop 지원)
  - [x] Field.Validity (validity state function)
- [x] `src/field.module.css` 스타일
  - [x] Flexbox 레이아웃
  - [x] Input 스타일 (focus, hover, disabled, invalid)
  - [x] Error 메시지 스타일
  - [x] Description 스타일
- [x] `src/field.test.tsx` 테스트 작성
  - [x] 렌더링 테스트
  - [x] Label 연결 테스트
  - [x] Error 상태 표시
  - [x] Validation 통합 (required, type, pattern)
  - [x] Validity 상태
  - [x] 접근성 테스트
- [x] `src/stories/LyraField.stories.tsx` 스토리 (10개)
  - [x] Default
  - [x] Required
  - [x] WithError
  - [x] Disabled
  - [x] Password
  - [x] WithPattern
  - [x] MultipleFields
  - [x] WithValidity
  - [x] NumberInput
  - [x] TextArea
- [x] `src/index.tsx`에 export 추가

**테스트 결과**: 22개 테스트 모두 통과 ✅

**구현 참고**:
```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required />
  <Field.Error match="valueMissing">Email is required</Field.Error>
  <Field.Error match="typeMismatch">Invalid email</Field.Error>
  <Field.Description>We'll never share your email</Field.Description>
</Field.Root>
```

**설계 결정**: Form 구조 컴포넌트이므로 compose 패턴 사용 (Field.Root, Field.Label 등)

---

### 4. Select
**상태**: 🔲 미구현
**난이도**: ⭐⭐⭐ 어려움
**예상 시간**: 6-8시간
**우선순위**: 4순위

**작업 항목**:
- [ ] `src/select.tsx` 컴포넌트 구현
  - [ ] Select.Root
  - [ ] Select.Trigger
  - [ ] Select.Value
  - [ ] Select.Icon
  - [ ] Select.Portal
  - [ ] Select.Backdrop
  - [ ] Select.Positioner
  - [ ] Select.Popup
  - [ ] Select.List
  - [ ] Select.Item
  - [ ] Select.ItemText
  - [ ] Select.ItemIndicator
- [ ] `src/select.module.css` 스타일
  - [ ] Trigger 스타일
  - [ ] Dropdown 스타일
  - [ ] Item 호버/선택 상태
  - [ ] 애니메이션
- [ ] `src/select.test.tsx` 테스트
- [ ] Storybook 스토리
- [ ] Export 추가

---

## 🎯 Phase 2: Dialog & Overlay 컴포넌트

### 5. Dialog
**상태**: 🔲 미구현
**난이도**: ⭐⭐⭐ 어려움
**예상 시간**: 5-6시간
**우선순위**: 5순위

**작업 항목**:
- [ ] `src/dialog.tsx` 컴포넌트 구현
  - [ ] Dialog.Root (open state management)
  - [ ] Dialog.Trigger
  - [ ] Dialog.Portal
  - [ ] Dialog.Backdrop
  - [ ] Dialog.Popup
  - [ ] Dialog.Title
  - [ ] Dialog.Description
  - [ ] Dialog.Close
- [ ] `src/dialog.module.css` 스타일
  - [ ] Backdrop 오버레이
  - [ ] Popup 중앙 정렬
  - [ ] 페이드 인/아웃 애니메이션
  - [ ] 스크롤 락 처리
- [ ] `src/dialog.test.tsx` 테스트
  - [ ] 열기/닫기 동작
  - [ ] ESC 키 닫기
  - [ ] Backdrop 클릭 닫기
  - [ ] 포커스 트랩
  - [ ] 접근성 (role="dialog", aria-labelledby)
- [ ] Storybook 스토리
  - [ ] Basic Dialog
  - [ ] Controlled Dialog
  - [ ] Form Dialog
  - [ ] Alert Dialog variant
- [ ] Export 추가

**구현 참고**:
```tsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

---

### 6. Tooltip
**상태**: 🔲 미구현
**난이도**: ⭐⭐ 중간
**예상 시간**: 3-4시간
**우선순위**: 6순위

**작업 항목**:
- [ ] `src/tooltip.tsx` 컴포넌트 구현
  - [ ] Tooltip.Provider
  - [ ] Tooltip.Root
  - [ ] Tooltip.Trigger
  - [ ] Tooltip.Portal
  - [ ] Tooltip.Positioner
  - [ ] Tooltip.Popup
  - [ ] Tooltip.Arrow
- [ ] `src/tooltip.module.css` 스타일
- [ ] `src/tooltip.test.tsx` 테스트
- [ ] Storybook 스토리
- [ ] Export 추가

---

### 7. Popover
**상태**: 🔲 미구현
**난이도**: ⭐⭐⭐ 어려움
**예상 시간**: 4-5시간
**우선순위**: 7순위

**작업 항목**:
- [ ] `src/popover.tsx` 컴포넌트 구현
- [ ] `src/popover.module.css` 스타일
- [ ] `src/popover.test.tsx` 테스트
- [ ] Storybook 스토리
- [ ] Export 추가

---

### 8. Menu
**상태**: 🔲 미구현
**난이도**: ⭐⭐⭐⭐ 매우 어려움
**예상 시간**: 8-10시간
**우선순위**: 8순위

**작업 항목**:
- [ ] `src/menu.tsx` 컴포넌트 구현
  - [ ] Menu.Root
  - [ ] Menu.Trigger
  - [ ] Menu.Portal
  - [ ] Menu.Backdrop
  - [ ] Menu.Positioner
  - [ ] Menu.Popup
  - [ ] Menu.Arrow
  - [ ] Menu.Item
  - [ ] Menu.Separator
  - [ ] Menu.Group
  - [ ] Menu.GroupLabel
  - [ ] Menu.RadioGroup
  - [ ] Menu.RadioItem
  - [ ] Menu.CheckboxItem
  - [ ] Menu.SubmenuRoot
  - [ ] Menu.SubmenuTrigger
- [ ] `src/menu.module.css` 스타일
- [ ] `src/menu.test.tsx` 테스트
- [ ] Storybook 스토리
- [ ] Export 추가

---

## 🎯 Phase 3: Navigation 컴포넌트

### 9. Tabs
**상태**: 🔲 미구현
**난이도**: ⭐⭐⭐ 어려움
**예상 시간**: 4-5시간
**우선순위**: 9순위

**작업 항목**:
- [ ] `src/tabs.tsx` 컴포넌트 구현
  - [ ] Tabs.Root
  - [ ] Tabs.List
  - [ ] Tabs.Tab
  - [ ] Tabs.Indicator
  - [ ] Tabs.Panel
- [ ] `src/tabs.module.css` 스타일
  - [ ] Tab 활성/비활성 상태
  - [ ] Indicator 애니메이션
  - [ ] Panel 전환 효과
- [ ] `src/tabs.test.tsx` 테스트
  - [ ] 탭 전환 동작
  - [ ] 키보드 네비게이션
  - [ ] 접근성
- [ ] Storybook 스토리
- [ ] Export 추가

**구현 참고**:
```tsx
<Tabs.Root>
  <Tabs.List>
    <Tabs.Tab />
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel />
</Tabs.Root>
```

---

### 10. Collapsible
**상태**: 🔲 미구현
**난이도**: ⭐⭐ 중간
**예상 시간**: 2-3시간
**우선순위**: 10순위

**작업 항목**:
- [ ] `src/collapsible.tsx` 컴포넌트 구현
  - [ ] Collapsible.Root
  - [ ] Collapsible.Trigger
  - [ ] Collapsible.Panel
- [ ] `src/collapsible.module.css` 스타일
- [ ] `src/collapsible.test.tsx` 테스트
- [ ] Storybook 스토리
- [ ] Export 추가

---

## 🎯 Phase 4: Feedback/Display 컴포넌트

### 11. Progress
**상태**: 🔲 미구현
**난이도**: ⭐⭐ 중간
**예상 시간**: 3-4시간
**우선순위**: 11순위

---

### 12. Avatar
**상태**: 🔲 미구현
**난이도**: ⭐ 쉬움
**예상 시간**: 2-3시간
**우선순위**: 12순위

---

### 13. Toast
**상태**: 🔲 미구현
**난이도**: ⭐⭐⭐ 어려움
**예상 시간**: 5-6시간
**우선순위**: 13순위

---

## 📋 작업 프로세스

각 컴포넌트 구현 시 다음 순서를 따릅니다:

1. **Context7 문서 조회** - Base UI 공식 문서 확인
2. **컴포넌트 구현** - TypeScript + Base UI 패턴
3. **CSS 모듈 작성** - Design Tokens 활용
4. **테스트 작성** - Vitest + Testing Library
5. **Storybook 스토리** - 다양한 사용 사례
6. **Export & 통합** - index.tsx에 추가
7. **문서화** - 사용 예제 및 Props 문서

---

## 📊 진행 상황 추적

### 전체 진행률
- **Phase 1 (Form)**: 3/4 (75%) ✅ Switch, Radio+RadioGroup, Field 완료
- **Phase 2 (Dialog/Overlay)**: 0/4 (0%)
- **Phase 3 (Navigation)**: 0/2 (0%)
- **Phase 4 (Feedback)**: 0/3 (0%)

**총 진행률**: 3/13 (23.1%)

---

## 🎯 다음 작업

**NEXT**: Select 컴포넌트 구현 (Priority 4)
- Context7에서 Base UI Select 문서 조회
- 드롭다운 UI 및 아이템 선택 로직 구현
- 키보드 네비게이션 (방향키, Enter, Escape) 지원
- 예상 시간: 6-8시간

---

*최종 업데이트: 2025-10-22*
