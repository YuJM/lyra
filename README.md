# Lyra Design System

Lyra는 **OpenAI Apps SDK 디자인 가이드라인**을 준수하며, 접근성과 사용성을 최우선으로 하는 현대적인 React 기반 디자인 시스템입니다. Base UI Components를 기반으로 구축되었으며, 체계적인 디자인 토큰과 재사용 가능한 컴포넌트를 제공합니다.

> **OpenAI Apps SDK 준수**: Lyra는 OpenAI의 디자인 가이드라인을 따라 일관되고 접근 가능한 사용자 경험을 제공합니다. 단색 배경, gradient 미사용, 명확한 계층 구조, 최소한의 액션 제한 등 OpenAI의 디자인 철학을 반영하였습니다.

## ✨ 주요 특징

- 🤖 **OpenAI Apps SDK 준수**: OpenAI 디자인 가이드라인을 따른 일관된 UX
- 🎨 **체계적인 디자인 토큰**: Style Dictionary 기반 토큰 시스템으로 일관된 디자인 언어 제공
- ♿️ **접근성 우선**: Base UI Components 기반의 WCAG 2.1 AA 준수 컴포넌트
- 📱 **반응형 디자인**: Polaris 방식의 미디어 쿼리 시스템으로 모든 디바이스 지원
- 🎭 **CSS Modules**: 스타일 충돌 없는 안전한 스코프 스타일링
- 🧪 **완전한 테스트**: Vitest 기반 유닛 테스트 및 Storybook 인터랙션 테스트
- 📚 **풍부한 문서화**: Storybook으로 작성된 인터랙티브 컴포넌트 문서
- 🔧 **TypeScript**: 완벽한 타입 정의 제공
- 🚀 **모노레포 구조**: Turborepo 기반 고성능 빌드 시스템

## 🏗️ 모노레포 구조

```
lyra/
├── apps/
│   └── web/           # 웹 애플리케이션 (Vite)
├── packages/
│   ├── design-tokens/ # 디자인 토큰 시스템
│   ├── ui/            # UI 컴포넌트 라이브러리 (Storybook 포함)
│   ├── eslint-config/ # ESLint 공유 설정
│   └── typescript-config/ # TypeScript 공유 설정
└── docs/              # 프로젝트 문서
```

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18.x 이상
- pnpm 10.x 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/YuJM/lyra.git
cd lyra

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 모든 패키지를 watch 모드로 실행
pnpm dev

# Storybook 문서 서버 실행 (localhost:6006)
pnpm dev --filter=@lyra/ui
```

### 빌드

```bash
# 모든 패키지 빌드
pnpm build

# 특정 패키지만 빌드
pnpm build --filter=@lyra/ui
```

## 📦 패키지 상세

### @lyra/design-tokens

디자인 시스템의 핵심 토큰을 관리하는 패키지입니다.

**제공하는 토큰:**
- 색상 (Color primitives)
- 타이포그래피 (Font family, size, weight, line height)
- 간격 (Spacing scale)
- 브레이크포인트 (Responsive breakpoints)
- 그림자 (Shadow tokens)
- 테두리 (Border radius, width)
- 애니메이션 (Duration, easing)
- Z-index (Layering system)

**기술 스택:**
- Style Dictionary (토큰 변환)
- DTCG 포맷 지원
- CSS, JavaScript, JSON 형식 출력
- Polaris 방식 미디어 쿼리 자동 생성

**사용법:**
```tsx
import '@lyra/design-tokens/css';

// CSS 변수로 사용
.element {
  color: var(--color-blue-600);
  padding: var(--spacing-4);
  font-size: var(--font-size-base);
}
```

### @lyra/ui

Base UI Components 기반의 접근성 우선 React 컴포넌트 라이브러리입니다.

**제공 컴포넌트:**

#### Form Components
- **Button**: 다양한 variant를 지원하는 버튼
- **Checkbox**: 단일/그룹 체크박스
- **Radio**: 라디오 버튼 및 그룹
- **Switch**: 토글 스위치
- **Field**: 폼 필드 구성 요소 (Label, Control, Description, Error)
- **Select**: 드롭다운 선택 컴포넌트

#### Overlay Components
- **Dialog**: 모달 다이얼로그
- **Tooltip**: 툴팁

**기술 스택:**
- React 19
- Base UI Components
- CSS Modules + PostCSS
- Rollup (빌드 시스템)
- Vitest (테스팅)
- Storybook (문서화)

**사용법:**
```tsx
import { Button, Field, Select } from '@lyra/ui';
import '@lyra/ui/styles';

function App() {
  return (
    <>
      <Button variant="primary">제출</Button>

      <Field.Root>
        <Field.Label>이메일</Field.Label>
        <Field.Control type="email" />
        <Field.Description>로그인에 사용할 이메일입니다</Field.Description>
      </Field.Root>

      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="선택하세요" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Popup>
            <Select.Item value="1">옵션 1</Select.Item>
            <Select.Item value="2">옵션 2</Select.Item>
          </Select.Popup>
        </Select.Portal>
      </Select.Root>
    </>
  );
}
```

## 🛠️ 개발 가이드

### 명령어

#### 개발
```bash
pnpm dev                    # 모든 패키지를 watch 모드로 실행
pnpm dev --filter=@lyra/ui  # 특정 패키지만 실행
```

#### 빌드
```bash
pnpm build                     # 모든 패키지 빌드
pnpm build --filter=@lyra/ui   # UI 패키지 및 Storybook 빌드
```

#### 테스트
```bash
pnpm test                   # 모든 테스트 실행
pnpm test --filter=@lyra/ui # UI 패키지 테스트만 실행
pnpm test:watch             # Watch 모드로 테스트
```

#### 린팅
```bash
pnpm lint                   # 모든 패키지 린팅
pnpm lint:fix               # 린트 에러 자동 수정
```

#### 클린업
```bash
pnpm clean                  # node_modules 및 빌드 결과물 삭제
```

### 새 컴포넌트 추가

1. **컴포넌트 파일 생성**
```tsx
// packages/ui/src/components/my-component/my-component.tsx
import * as BaseUI from '@base-ui-components/react/MyComponent';
import styles from './my-component.module.css';

export function MyComponent({ children, ...props }) {
  return (
    <BaseUI.Root {...props} className={styles.root}>
      {children}
    </BaseUI.Root>
  );
}
```

2. **스타일 작성**
```css
/* packages/ui/src/components/my-component/my-component.module.css */
.root {
  padding: var(--spacing-4);
  background: var(--color-bg-surface-default);
}
```

3. **테스트 작성**
```tsx
// packages/ui/src/components/my-component/my-component.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders children', () => {
    render(<MyComponent>Test</MyComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

4. **Storybook 스토리 추가**
```tsx
// packages/ui/src/stories/components/my-component/my-component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../../../components/my-component/my-component';

const meta = {
  title: "MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hello World",
  },
};
```

5. **export 추가**
```tsx
// packages/ui/src/index.tsx
export { MyComponent } from './components/my-component/my-component';
```

## 🎨 디자인 토큰 사용 가이드

### CSS에서 사용

```css
.button {
  /* 색상 토큰 */
  color: var(--color-text-primary);
  background: var(--color-bg-primary-default);
  border-color: var(--color-border-default);

  /* 간격 토큰 */
  padding: var(--spacing-2) var(--spacing-4);
  margin: var(--spacing-4);

  /* 타이포그래피 토큰 */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);

  /* 테두리 토큰 */
  border-radius: var(--border-radius-md);

  /* 애니메이션 토큰 */
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--easing-ease-in-out);
}
```

### 반응형 미디어 쿼리

```css
.container {
  width: 100%;
}

/* 640px 이하 (모바일) */
@media (--sm-down) {
  .container {
    padding: var(--spacing-2);
  }
}

/* 640px 이상 (태블릿+) */
@media (--sm-up) {
  .container {
    padding: var(--spacing-4);
  }
}

/* 640px ~ 768px (태블릿만) */
@media (--sm-only) {
  .container {
    padding: var(--spacing-3);
  }
}
```

## 🧪 테스팅

### 유닛 테스트 (Vitest)

```bash
# 모든 테스트 실행
pnpm test

# Watch 모드
pnpm test:watch

# 커버리지 리포트
pnpm test:coverage
```

### Storybook 인터랙션 테스트

```tsx
import { expect, userEvent, within } from '@storybook/test';

export const InteractionTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
};
```

## 📖 문서화

### Storybook 실행

```bash
# 개발 모드
pnpm dev --filter=@lyra/ui

# 빌드
pnpm build --filter=@lyra/ui

# Storybook만 실행
cd packages/ui && pnpm storybook
```

Storybook은 http://localhost:6006 에서 실행됩니다.

## 🔧 기술 스택

### 코어
- **React 19**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **Base UI Components**: 접근성 우선 헤드리스 컴포넌트

### 빌드 도구
- **Turborepo**: 모노레포 빌드 시스템
- **pnpm**: 패키지 매니저
- **Rollup**: UI 패키지 번들러
- **Vite**: 개발 서버 및 빌드 도구

### 스타일링
- **CSS Modules**: 스코프 스타일링
- **PostCSS**: CSS 변환
  - postcss-nesting
  - postcss-custom-media
  - postcss-mixins
  - postcss-global-data
- **Style Dictionary**: 디자인 토큰 변환

### 테스팅 & 문서화
- **Vitest**: 유닛 테스트 프레임워크
- **Testing Library**: React 컴포넌트 테스팅
- **Storybook**: 컴포넌트 문서화 및 인터랙션 테스트
- **Chromatic**: 시각적 회귀 테스트

### 코드 품질
- **ESLint**: 코드 린팅
- **TypeScript**: 정적 타입 검사
- **Changesets**: 버전 관리 및 체인지로그

## 📝 버전 관리

이 프로젝트는 [Changesets](https://github.com/changesets/changesets)를 사용하여 버전을 관리합니다.

### 체인지셋 생성

```bash
pnpm changeset
```

1. 변경된 패키지 선택
2. 버전 범프 타입 선택 (major/minor/patch)
3. 변경 사항 요약 작성

### 버전 업데이트

```bash
pnpm changeset version
```

### 퍼블리시

```bash
pnpm release
```

## 🤝 기여하기

이슈와 풀 리퀘스트는 언제나 환영합니다!

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

MIT

## 🔗 링크

- [Repository](https://github.com/YuJM/lyra)
- [Storybook](https://lyra-storybook.vercel.app) (배포 예정)
- [Documentation](./docs) (프로젝트 문서)
