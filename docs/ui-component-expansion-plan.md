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
- [x] Field - 폼 필드 구조 컴포넌트 (Label, Control, Error, Description)
- [x] Select - 드롭다운 선택 컴포넌트
- [x] Dialog - 모달 대화상자 컴포넌트
- [x] Tooltip - 호버 기반 툴팁 컴포넌트
- [x] Tabs - 탭 네비게이션 컴포넌트
- [x] Collapsible - 접기/펼치기 컴포넌트
- [x] Progress - 진행률 표시 컴포넌트
- [x] Avatar - 사용자 아바타 컴포넌트
- [x] Toast - 알림 토스트 컴포넌트 (Sonner 기반)

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
**상태**: ✅ 완료
**난이도**: ⭐⭐⭐ 어려움
**실제 시간**: ~6시간
**우선순위**: 4순위

**작업 항목**:
- [x] `src/select.tsx` 컴포넌트 구현
  - [x] Select.Root
  - [x] Select.Trigger
  - [x] Select.Value
  - [x] Select.Icon
  - [x] Select.Portal
  - [x] Select.Backdrop
  - [x] Select.Positioner
  - [x] Select.Popup
  - [x] Select.Arrow
  - [x] Select.Item
  - [x] Select.ItemText
  - [x] Select.ItemIndicator
  - [x] Select.Group
  - [x] Select.GroupLabel
- [x] `src/select.module.css` 스타일
  - [x] Trigger 스타일
  - [x] Dropdown 스타일
  - [x] Item 호버/선택 상태
  - [x] 애니메이션
  - [x] Backdrop 오버레이
  - [x] Arrow 포인터
- [x] `src/select.test.tsx` 테스트
- [x] Storybook 스토리 (10개)
  - [x] Default
  - [x] WithDefaultValue
  - [x] Controlled
  - [x] Disabled
  - [x] DisabledOptions
  - [x] WithGroups
  - [x] WithBackdrop
  - [x] WithArrow
  - [x] LongList
  - [x] CustomWidth
- [x] Export 추가

**테스트 결과**: 9개 테스트 모두 통과 ✅

**구현 참고**:
```tsx
<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value>Select a fruit</Select.Value>
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="apple">
          <Select.ItemText>Apple</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

**설계 결정**: 복잡한 드롭다운 UI이므로 compose 패턴 사용. Portal, Positioner, Backdrop 등 고급 기능 포함

---

## 🎯 Phase 2: Dialog & Overlay 컴포넌트

### 5. Dialog
**상태**: ✅ 완료
**난이도**: ⭐⭐⭐ 어려움
**실제 시간**: ~3시간
**우선순위**: 5순위

**작업 항목**:
- [x] `src/dialog.tsx` 컴포넌트 구현
  - [x] Dialog.Root (open state management)
  - [x] Dialog.Trigger
  - [x] Dialog.Portal
  - [x] Dialog.Backdrop
  - [x] Dialog.Popup
  - [x] Dialog.Title
  - [x] Dialog.Description
  - [x] Dialog.Close
- [x] `src/dialog.module.css` 스타일
  - [x] Backdrop 오버레이
  - [x] Popup 중앙 정렬
  - [x] 페이드 인/아웃 애니메이션
  - [x] 반응형 디자인
  - [x] 스크롤바 커스터마이징
- [x] `src/dialog.test.tsx` 테스트
  - [x] 열기/닫기 동작
  - [x] ESC 키 닫기
  - [x] Backdrop 클릭 닫기
  - [x] 제어/비제어 모드
  - [x] 접근성 (role="dialog", aria-labelledby, aria-describedby)
  - [x] Portal 렌더링
- [x] Storybook 스토리 (8개)
  - [x] Default
  - [x] WithoutBackdrop
  - [x] Controlled
  - [x] WithForm
  - [x] ConfirmationDialog
  - [x] LongContent
  - [x] NestedDialogs
  - [x] CustomStyling
- [x] Export 추가

**테스트 결과**: 14개 테스트 모두 통과 ✅

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
**상태**: ✅ 완료
**난이도**: ⭐⭐ 중간
**실제 시간**: ~3시간
**우선순위**: 6순위

**작업 항목**:
- [x] `src/tooltip.tsx` 컴포넌트 구현
  - [x] Tooltip.Provider
  - [x] Tooltip.Root
  - [x] Tooltip.Trigger
  - [x] Tooltip.Portal
  - [x] Tooltip.Positioner
  - [x] Tooltip.Popup
  - [x] Tooltip.Arrow
- [x] `src/tooltip.module.css` 스타일
- [x] `src/tooltip.test.tsx` 테스트
- [x] Storybook 스토리
- [x] Export 추가

**테스트 결과**: 10개 테스트 모두 통과 ✅

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
**상태**: ✅ 완료
**난이도**: ⭐⭐⭐ 어려움
**실제 시간**: ~4시간
**우선순위**: 9순위

**작업 항목**:
- [x] `src/tabs.tsx` 컴포넌트 구현
  - [x] Tabs.Root
  - [x] Tabs.List
  - [x] Tabs.Tab
  - [x] Tabs.Indicator
  - [x] Tabs.Panel
- [x] `src/tabs.module.css` 스타일
  - [x] Tab 활성/비활성 상태
  - [x] Indicator 애니메이션
  - [x] Panel 전환 효과
- [x] `src/tabs.test.tsx` 테스트
  - [x] 탭 전환 동작
  - [x] 키보드 네비게이션
  - [x] 접근성
- [x] Storybook 스토리
- [x] Export 추가

**테스트 결과**: 19개 테스트 모두 통과 ✅

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
**상태**: ✅ 완료
**난이도**: ⭐⭐ 중간
**실제 시간**: ~2.5시간
**우선순위**: 10순위

**작업 항목**:
- [x] `src/collapsible.tsx` 컴포넌트 구현
  - [x] Collapsible.Root
  - [x] Collapsible.Trigger
  - [x] Collapsible.Panel
- [x] `src/collapsible.module.css` 스타일
- [x] `src/collapsible.test.tsx` 테스트
- [x] Storybook 스토리 (10개)
- [x] Export 추가

**테스트 결과**: 16개 테스트 모두 통과 ✅

---

## 🎯 Phase 4: Feedback/Display 컴포넌트

### 11. Progress
**상태**: ✅ 완료
**난이도**: ⭐⭐ 중간
**실제 시간**: ~2시간
**우선순위**: 11순위

**작업 항목**:
- [x] `src/progress.tsx` 컴포넌트 구현
  - [x] Progress.Root
  - [x] Progress.Label
  - [x] Progress.Track
  - [x] Progress.Indicator
  - [x] Progress.Value
- [x] `src/progress.module.css` 스타일
  - [x] 기본/진행/완료 상태
  - [x] Indeterminate 애니메이션
  - [x] 크기 변형 (sm, lg)
- [x] `src/progress.test.tsx` 테스트 (16개)
  - [x] 렌더링 테스트
  - [x] 진행률 상태 테스트
  - [x] min/max prop 테스트
  - [x] 접근성 테스트
  - [x] 커스터마이징 테스트
- [x] Storybook 스토리 (10개)
- [x] Export 추가

**테스트 결과**: 16개 테스트 모두 통과 ✅

**구현 참고**:
```tsx
<Progress.Root value={50}>
  <Progress.Label>Loading...</Progress.Label>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
  <Progress.Value />
</Progress.Root>
```

---

### 12. Avatar
**상태**: ✅ 완료
**난이도**: ⭐ 쉬움
**실제 시간**: ~2시간
**우선순위**: 12순위

**작업 항목**:
- [x] `src/avatar.tsx` 컴포넌트 구현
  - [x] Avatar.Root
  - [x] Avatar.Image
  - [x] Avatar.Fallback
- [x] `src/avatar.module.css` 스타일
  - [x] 원형 디자인
  - [x] 크기 변형 (sm, md, lg, xl)
  - [x] 색상 변형
  - [x] 그룹 스타일
- [x] `src/avatar.test.tsx` 테스트 (13개)
  - [x] 렌더링 테스트
  - [x] Image/Fallback 동작
  - [x] onLoadingStatusChange 콜백
  - [x] delay prop
  - [x] 접근성 테스트
  - [x] 커스터마이징
- [x] Storybook 스토리 (10개)
- [x] Export 추가

**테스트 결과**: 13개 테스트 모두 통과 ✅

**구현 참고**:
```tsx
<Avatar.Root>
  <Avatar.Image src="/user.jpg" alt="User" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>
```

---

### 13. Toast
**상태**: ✅ 완료 (Sonner 기반)
**난이도**: ⭐⭐⭐ 어려움
**실제 시간**: ~3시간
**우선순위**: 13순위

**작업 항목**:
- [x] Sonner 라이브러리 설치 (v2.0.7)
- [x] `src/toast.tsx` 컴포넌트 구현
  - [x] Toast.Provider (Toaster 래핑)
  - [x] toast.show() - 기본 토스트
  - [x] toast.success() - 성공 토스트
  - [x] toast.error() - 에러 토스트
  - [x] toast.info() - 정보 토스트
  - [x] toast.warning() - 경고 토스트
  - [x] toast.loading() - 로딩 토스트
  - [x] toast.promise() - Promise 기반 토스트
  - [x] toast.custom() - 커스텀 JSX 토스트
  - [x] toast.dismiss() - 토스트 닫기
- [x] `src/toast.module.css` 스타일
  - [x] Lyra UI 디자인 토큰 통합
  - [x] 타입별 색상 변형
  - [x] 다크 모드 지원
  - [x] 애니메이션 및 트랜지션
- [x] `src/toast.test.tsx` 테스트 (20개)
  - [x] Provider 렌더링
  - [x] 타입별 toast 함수
  - [x] description/action 옵션
  - [x] Promise 토스트
  - [x] 커스텀 토스트
  - [x] dismiss 기능
  - [x] 접근성
- [x] Storybook 스토리 (12개)
  - [x] Default, Types, WithDescription
  - [x] WithAction, WithCancel
  - [x] Loading, Promise
  - [x] CustomDuration, Position
  - [x] Custom, Multiple
  - [x] RichColors
- [x] Export 추가

**테스트 결과**: 20개 테스트 모두 통과 ✅

**구현 참고**:
```tsx
// Provider를 루트에 한 번 렌더링
<Toast.Provider position="top-right" richColors />

// 명령형 API로 토스트 호출
toast.success("저장되었습니다");
toast.error("오류가 발생했습니다");
toast.promise(promise, {
  loading: "로딩 중...",
  success: "완료!",
  error: "실패!"
});
```

**설계 결정**: Base UI Toast 대신 Sonner 라이브러리 사용
- 사용자 명시적 요청에 따라 Sonner 선택
- 명령형 API로 더 간편한 사용성
- 풍부한 기능 (promise, action, custom 등)
- Lyra UI 디자인 토큰과 완벽히 통합

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
- **Phase 1 (Form)**: 4/4 (100%) ✅ Switch, Radio+RadioGroup, Field, Select 완료
- **Phase 2 (Dialog/Overlay)**: 2/4 (50%) ✅ Dialog, Tooltip 완료
- **Phase 3 (Navigation)**: 2/2 (100%) ✅ Tabs, Collapsible 완료
- **Phase 4 (Feedback)**: 3/3 (100%) ✅ Progress, Avatar, Toast 완료

**총 진행률**: 11/13 (84.6%)

---

## 🎯 다음 작업

**NEXT**: Popover 컴포넌트 구현 (Priority 7) 또는 Menu 컴포넌트 구현 (Priority 8)
- Phase 2 (Dialog/Overlay) 계속 진행
- Context7에서 Base UI Popover/Menu 문서 조회
- 복잡한 오버레이 UI 구현
- 예상 시간: 4-5시간 (Popover) / 8-10시간 (Menu)

**참고**: Phase 1 (Form 컴포넌트) 100% 완료! 🎉
**참고**: Phase 3 (Navigation 컴포넌트) 100% 완료! 🎉
**참고**: Phase 4 (Feedback 컴포넌트) 100% 완료! 🎉

---

*최종 업데이트: 2025-10-22*
