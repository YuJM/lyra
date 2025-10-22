# Base UI 라이브러리 문서

출처: https://base-ui.com/llms.txt

## 라이브러리 개요

Base UI는 React 사용자 인터페이스 구축을 위한 컴포넌트와 유틸리티 모음입니다. 이 라이브러리는 "composable and styling agnostic"한 설계 철학을 따릅니다.

## Checkbox 관련 컴포넌트

### Checkbox
"A high-quality, unstyled React checkbox component that is easy to customize."

- 스타일이 없는 고품질 React 체크박스 컴포넌트
- 쉬운 커스터마이징 지원

#### 주요 구성 요소
- `Checkbox.Root` - 메인 체크박스 컨테이너 (button + hidden input)
- `Checkbox.Indicator` - 체크 상태 시각적 표시

#### Checkbox.Root Props
| Props | 타입 | 설명 |
|-------|------|------|
| `checked` | `boolean` | 제어 컴포넌트 체크 상태 |
| `defaultChecked` | `boolean` | 비제어 컴포넌트 기본 체크 상태 |
| `onCheckedChange` | `(checked: boolean) => void` | 상태 변경 콜백 |
| `indeterminate` | `boolean` | 혼합 상태 (일부 선택) |
| `disabled` | `boolean` | 비활성화 여부 |
| `readOnly` | `boolean` | 읽기 전용 |
| `required` | `boolean` | 필수 입력 |
| `name` | `string` | 폼 제출 시 이름 |
| `value` | `string` | 폼 제출 시 값 |
| `inputRef` | `React.Ref<HTMLInputElement>` | hidden input ref |
| `parent` | `boolean` | parent 체크박스 여부 (CheckboxGroup용) |

### Checkbox Group
"A high-quality, unstyled React checkbox group component that provides a shared state for a series of checkboxes."

- 스타일이 없는 고품질 React 체크박스 그룹 컴포넌트
- 여러 체크박스를 하나의 공유 상태로 관리
- 시리즈 체크박스에 대한 공유 상태 제공

#### CheckboxGroup Props
| Props | 타입 | 설명 |
|-------|------|------|
| `defaultValue` | `string[]` | 초기 선택된 체크박스 value 배열 |
| `value` | `string[]` | 제어 컴포넌트로 사용할 선택된 항목 배열 |
| `onValueChange` | `(value: string[], event: Event) => void` | 선택 상태 변경 시 콜백 (value와 이벤트 정보 제공) |
| `allValues` | `string[]` | 부모 체크박스 생성 시 필요한 모든 자식 value 배열 |
| `disabled` | `boolean` | 전체 비활성화 여부 |
| `className` | `string \| (state) => string` | CSS 클래스 (상태 기반 함수 지원) |
| `render` | `(props, state) => ReactNode` | 커스텀 렌더링 함수 |

#### 부모 체크박스 (Parent Checkbox) 구현
3단계로 구현:
1. CheckboxGroup을 제어 컴포넌트로 변경 (`value`, `onValueChange` 사용)
2. `allValues` prop에 모든 자식 value 전달
3. 부모 Checkbox에 `parent` prop 추가

**부모 체크박스 상태:**
- ✓ (체크) - 모든 항목 선택됨
- − (중간) - 일부 항목 선택됨
- ☐ (빈칸) - 아무것도 선택 안됨

#### 중첩된 부모 체크박스 (Nested Parent)
복잡한 계층 구조 구현 가능:
- 다단계 CheckboxGroup 중첩
- 각 레벨의 parent가 하위 항목 제어
- 최상위 parent가 모든 하위 항목 제어
- 사용 사례: 권한 관리, 카테고리 선택 등

#### Form 통합
- `Field.Root`로 CheckboxGroup 감싸기
- `Field.Label`로 각 항목 레이블링
- `render` prop으로 `Fieldset.Root` 적용

## 주요 리소스 영역

- **Overview**: 빠른 시작, 접근성, 릴리즈 노트 포함
- **Handbook**: 스타일링, 애니메이션, 구성, 커스터마이징, TypeScript 가이드
- **Components**: 40개 이상의 UI 컴포넌트 제공
- **Utilities**: Direction Provider와 useRender 훅 포함

## 설계 원칙

- **Composable** (조합 가능) - 작은 컴포넌트 조합으로 복잡한 UI 구성
- **Styling Agnostic** (스타일 독립적) - 스타일 방식에 제약 없음
- **접근성 우선** - ARIA 속성 및 키보드 내비게이션 지원
- **TypeScript 지원** - 완전한 타입 정의 제공

## 버전 정보
- Base UI 버전: 1.0.0-beta.4
- React: catalog: (프로젝트 설정에 따름)

## 사용 예제

### 기본 CheckboxGroup
```tsx
<CheckboxGroup defaultValue={["option1"]}>
  <Checkbox.Root value="option1">
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Checkbox.Root value="option2">
    <Checkbox.Indicator />
  </Checkbox.Root>
</CheckboxGroup>
```

### Parent Checkbox
```tsx
const [values, setValues] = useState(["apple"]);
const allValues = ["apple", "banana", "orange"];

<CheckboxGroup value={values} onValueChange={setValues} allValues={allValues}>
  <Checkbox.Root parent>
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Checkbox.Root value="apple"><Checkbox.Indicator /></Checkbox.Root>
  <Checkbox.Root value="banana"><Checkbox.Indicator /></Checkbox.Root>
  <Checkbox.Root value="orange"><Checkbox.Indicator /></Checkbox.Root>
</CheckboxGroup>
```

전체 문서: https://base-ui.com
