# @comneed/lyra-ui

Lyra 디자인 시스템의 핵심 UI 컴포넌트 라이브러리입니다. **OpenAI Apps SDK 디자인 가이드라인을 준수**하며, Base UI Components를 기반으로 구축되었습니다. 접근성과 사용성을 최우선으로 하는 현대적인 React 컴포넌트를 제공합니다.

> **OpenAI 가이드라인 준수**: 모든 컴포넌트는 OpenAI Apps SDK의 디자인 원칙을 따릅니다 - 단색 배경, 명확한 계층 구조, 접근성 최우선, 최소한의 인터랙션 등.

## 특징

- 🤖 **OpenAI Apps SDK 준수**: OpenAI 디자인 가이드라인을 따른 일관된 사용자 경험
- 🎨 **디자인 토큰 통합**: `@comneed/lyra-design-tokens`와 완벽하게 통합되어 일관된 디자인 시스템 제공
- ♿️ **접근성 우선**: Base UI Components 기반으로 WCAG 2.1 AA 표준 준수
- 📦 **트리 셰이킹 지원**: ESM과 CJS 모듈 모두 지원하여 최적화된 번들 크기
- 🎭 **CSS Modules**: 스타일 충돌 없는 안전한 스코프 스타일링
- 🧪 **완전한 테스트**: Vitest를 통한 유닛 테스트 커버리지
- 📚 **Storybook 문서화**: 인터랙티브한 컴포넌트 문서 제공
- 🔧 **TypeScript**: 완벽한 타입 정의 제공

## 설치

```bash
# pnpm
pnpm add @comneed/lyra-ui

# npm
npm install @comneed/lyra-ui

# yarn
yarn add @comneed/lyra-ui
```

## 사용법

### 기본 사용

```tsx
import { Button, Checkbox, Field } from '@comneed/lyra-ui';
import '@comneed/lyra-ui/styles';

function App() {
  return (
    <>
      <Button variant="primary">클릭하세요</Button>
      
      <Field.Root>
        <Field.Label>이메일</Field.Label>
        <Field.Control type="email" placeholder="이메일을 입력하세요" />
        <Field.Description>로그인에 사용할 이메일입니다</Field.Description>
      </Field.Root>
      
      <Checkbox defaultChecked>약관에 동의합니다</Checkbox>
    </>
  );
}
```

### 스타일 임포트

CSS는 별도로 임포트해야 합니다:

```tsx
import '@comneed/lyra-ui/styles';
```

## 제공 컴포넌트

### Form Components

#### Button
기본적인 버튼 컴포넌트로 다양한 variant를 지원합니다.

```tsx
import { Button } from '@comneed/lyra-ui';

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
```

#### Checkbox
단일 체크박스와 체크박스 그룹을 제공합니다.

```tsx
import { Checkbox, CheckboxGroup } from '@comneed/lyra-ui';

<Checkbox defaultChecked>단일 체크박스</Checkbox>

<CheckboxGroup>
  <Checkbox value="option1">옵션 1</Checkbox>
  <Checkbox value="option2">옵션 2</Checkbox>
</CheckboxGroup>
```

#### Radio
라디오 버튼과 라디오 그룹을 제공합니다.

```tsx
import { Radio, RadioGroup } from '@comneed/lyra-ui';

<RadioGroup>
  <Radio value="option1">옵션 1</Radio>
  <Radio value="option2">옵션 2</Radio>
</RadioGroup>
```

#### Switch
토글 스위치 컴포넌트입니다.

```tsx
import { Switch } from '@comneed/lyra-ui';

<Switch defaultChecked>알림 활성화</Switch>
```

#### Field
폼 필드를 구성하는 컴포넌트 그룹입니다.

```tsx
import { Field } from '@comneed/lyra-ui';

<Field.Root>
  <Field.Label>이름</Field.Label>
  <Field.Control type="text" placeholder="이름을 입력하세요" />
  <Field.Description>사용자 표시 이름입니다</Field.Description>
  <Field.Error>이름은 필수 항목입니다</Field.Error>
</Field.Root>
```

#### Select
드롭다운 선택 컴포넌트입니다.

```tsx
import { Select } from '@comneed/lyra-ui';

<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="선택하세요" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="option1">
          <Select.ItemText>옵션 1</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
        <Select.Item value="option2">
          <Select.ItemText>옵션 2</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

### Overlay Components

#### Dialog
모달 다이얼로그 컴포넌트입니다.

```tsx
import { Dialog } from '@comneed/lyra-ui';

<Dialog.Root>
  <Dialog.Trigger>다이얼로그 열기</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>제목</Dialog.Title>
      <Dialog.Description>설명 내용</Dialog.Description>
      <Dialog.Close>닫기</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

#### Tooltip
툴팁 컴포넌트입니다.

```tsx
import { Tooltip } from '@comneed/lyra-ui';

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>호버하세요</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>
          툴팁 내용
          <Tooltip.Arrow />
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

## 개발

### 스크립트

이 패키지는 **pnpm**을 사용합니다. 스크립트는 다음과 같이 실행하세요:

```bash
# 개발 모드 (watch mode)
pnpm dev

# 타입 개발 모드 (watch mode)
pnpm dev:types

# 빌드
pnpm build

# JavaScript 빌드만
pnpm build:js

# TypeScript 타입 정의만 빌드
pnpm build:types

# 린팅
pnpm lint

# 테스트
pnpm test

# 테스트 (watch mode)
pnpm test:watch

# 테스트 커버리지
pnpm test:coverage

# Storybook 실행
pnpm storybook

# Storybook 빌드
pnpm build-storybook

# Chromatic 배포 (시각적 회귀 테스트)
pnpm chromatic

# 빌드 결과물 삭제
pnpm clean
```

### 프로젝트 구조

```
packages/ui/
├── src/
│   ├── components/          # 컴포넌트 디렉토리
│   │   ├── button/
│   │   │   ├── button.tsx          # 컴포넌트 구현
│   │   │   ├── button.test.tsx     # 테스트
│   │   │   └── button.module.css   # 스타일
│   │   ├── checkbox/
│   │   ├── radio/
│   │   ├── switch/
│   │   ├── field/
│   │   ├── select/
│   │   ├── dialog/
│   │   └── tooltip/
│   ├── stories/             # Storybook 스토리
│   ├── global.css          # 글로벌 스타일
│   └── index.tsx           # 메인 진입점
├── config/
│   ├── postcss-plugins.js  # PostCSS 설정
│   └── rollup/            # Rollup 플러그인
├── postcss-mixins/         # PostCSS 믹스인
├── dist/                   # 빌드 결과물
│   ├── cjs/               # CommonJS 모듈
│   ├── esm/               # ES 모듈
│   └── types/             # TypeScript 타입 정의
├── package.json
├── rollup.config.mjs      # Rollup 설정
├── vitest.config.ts       # Vitest 설정
└── tsconfig.json          # TypeScript 설정
```

### 기술 스택

- **React**: UI 컴포넌트 라이브러리
- **Base UI Components**: 접근성 우선 헤드리스 컴포넌트
- **TypeScript**: 타입 안정성
- **CSS Modules**: 스코프 스타일링
- **PostCSS**: CSS 전처리
  - postcss-nesting: CSS 중첩
  - postcss-custom-media: 커스텀 미디어 쿼리
  - postcss-mixins: 재사용 가능한 스타일 믹스인
  - postcss-pxtorem: px to rem 변환
- **Rollup**: 모듈 번들러
- **Vitest**: 테스팅 프레임워크
- **Storybook**: 컴포넌트 문서화
- **class-variance-authority**: 타입 안전한 variant 관리

### 빌드 시스템

이 패키지는 Rollup을 사용하여 다음과 같이 빌드됩니다:

1. **CSS Modules 처리**: 컴포넌트별 CSS를 모듈화하고 스코프를 지정합니다
2. **PostCSS 변환**: 현대적인 CSS 기능을 브라우저 호환 코드로 변환합니다
3. **이중 모듈 출력**: 
   - `dist/cjs/`: CommonJS 모듈 (Node.js 환경)
   - `dist/esm/`: ES 모듈 (최신 번들러/브라우저)
4. **타입 정의 생성**: TypeScript 타입 정의를 별도로 생성합니다
5. **CSS 번들링**: 모든 스타일을 단일 `index.css` 파일로 번들링합니다

### 컴포넌트 작성 가이드

새 컴포넌트를 추가할 때는 다음 구조를 따르세요:

```tsx
// src/components/my-component/my-component.tsx
import * as BaseUI from '@base-ui-components/react/MyComponent';
import { clsx } from 'clsx';
import styles from './my-component.module.css';

export interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

export function MyComponent({ 
  variant = 'primary',
  children,
  ...props 
}: MyComponentProps) {
  return (
    <BaseUI.Root 
      {...props}
      className={clsx(styles.root, styles[variant])}
    >
      {children}
    </BaseUI.Root>
  );
}
```

```css
/* src/components/my-component/my-component.module.css */
@import '@comneed/lyra-design-tokens';

.root {
  /* 기본 스타일 */
}

.primary {
  /* primary variant */
}

.secondary {
  /* secondary variant */
}
```

```tsx
// src/components/my-component/my-component.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders children', () => {
    render(<MyComponent>Test</MyComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### 테스팅

Vitest를 사용하여 컴포넌트를 테스트합니다:

```bash
# 단일 실행
pnpm test

# Watch 모드
pnpm test:watch

# 커버리지 리포트
pnpm test:coverage
```

테스트는 `@testing-library/react`를 사용하여 작성되며, 사용자 중심의 테스트를 권장합니다.

## 라이선스

MIT

## 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

