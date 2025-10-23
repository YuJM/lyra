# Lyra UI Themes

Lyra UI는 다양한 디자인 가이드라인을 준수하는 테마 프리셋을 제공합니다.

---

## 📦 설치

테마는 Lyra UI 패키지에 포함되어 있습니다:

```bash
npm install @lyra/ui
# 또는
pnpm add @lyra/ui
```

---

## 🎨 사용 가능한 테마

### ChatGPT Theme

**OpenAI Apps SDK 디자인 가이드라인**을 준수하는 테마입니다.

#### 특징

- ✅ 배경/텍스트 색상 고정 (브랜드 액센트 제외)
- ✅ 브랜드 액센트는 버튼/아이콘에만 사용
- ✅ Gradient 사용 금지
- ✅ 시스템 다크모드 지원
- ✅ WCAG 2.1 AA 준수
- ✅ OKLCH 색상 공간 사용 (지각적 균일성)

#### 사용 방법

**방법 1: CSS 파일 직접 import**

```tsx
import '@lyra/ui/themes/chatgpt.css';

function App() {
  return <YourComponents />;
}
```

**방법 2: JS/TS로 import (Vite/Webpack)**

```tsx
import { chatgptTheme } from '@lyra/ui/themes';

function App() {
  return (
    <>
      <style>{chatgptTheme}</style>
      <YourComponents />
    </>
  );
}
```

**방법 3: 런타임 적용**

```tsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/node_modules/@lyra/ui/themes/chatgpt.css';
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  return <YourComponents />;
}
```

---

## 🎨 브랜드 색상 커스터마이징

ChatGPT 테마는 브랜드 액센트 색상을 커스터마이징할 수 있습니다:

```css
/* app.css */
:root {
  --brand-accent: #10a37f; /* ChatGPT 녹색 */
}
```

또는 OKLCH로:

```css
:root {
  --brand-accent: oklch(0.55 0.15 160);
}
```

### 추천 브랜드 색상

| 브랜드 | HEX | OKLCH |
|--------|-----|-------|
| ChatGPT | `#10a37f` | `oklch(0.55 0.15 160)` |
| Claude | `#D97757` | `oklch(0.65 0.12 40)` |
| GitHub | `#2dba4e` | `oklch(0.6 0.18 145)` |
| Twitter | `#1da1f2` | `oklch(0.6 0.15 230)` |

---

## 🌓 다크모드

ChatGPT 테마는 시스템 다크모드를 자동 지원합니다:

```css
@media (prefers-color-scheme: dark) {
  /* 자동으로 다크 색상 적용 */
}
```

수동으로 토글하려면:

```tsx
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
      <YourComponents />
    </div>
  );
}
```

```css
/* app.css */
[data-theme='dark'] {
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    /* 다크모드 변수 */
  }
}
```

---

## 📏 OpenAI 가이드라인 준수

ChatGPT 테마가 준수하는 OpenAI Apps SDK 디자인 원칙:

### ✅ 색상 제약

- **배경/텍스트**: 흑백 스펙트럼만 사용
- **브랜드 액센트**: 버튼/아이콘에만 제한적 사용
- **Gradient**: 절대 사용 금지

### ✅ 타이포그래피

- 시스템 폰트 우선
- 명확한 계층 구조
- WCAG AA 이상 대비율

### ✅ 레이아웃

- Inline 모드 지원
- 깊은 네비게이션 방지
- 단순하고 직관적인 구조

### ✅ 접근성

- 키보드 네비게이션 완벽 지원
- 스크린 리더 최적화
- Focus indicator 명확

---

## 🎯 사용 예제

### 기본 사용

```tsx
import '@lyra/ui/themes/chatgpt.css';
import { Button, Dialog } from '@lyra/ui';

function MyApp() {
  return (
    <div>
      <Button variant="primary">Action</Button>
      <Dialog>
        <Dialog.Content>
          <Dialog.Title>Hello</Dialog.Title>
          <Dialog.Description>
            ChatGPT 테마가 적용된 다이얼로그
          </Dialog.Description>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
```

### 브랜드 커스터마이징

```tsx
import '@lyra/ui/themes/chatgpt.css';
import './brand.css'; // 브랜드 색상 오버라이드

function BrandedApp() {
  return <YourComponents />;
}
```

```css
/* brand.css */
:root {
  --brand-accent: #your-brand-color;
}
```

---

## 🔧 고급 사용

### 다중 테마 지원

```tsx
import { useState } from 'react';
import { chatgptTheme } from '@lyra/ui/themes';

function MultiThemeApp() {
  const [theme, setTheme] = useState('chatgpt');

  return (
    <div data-theme={theme}>
      {theme === 'chatgpt' && <style>{chatgptTheme}</style>}

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="chatgpt">ChatGPT</option>
        <option value="default">Default</option>
      </select>

      <YourComponents />
    </div>
  );
}
```

### CSS-in-JS 통합 (Styled Components)

```tsx
import { createGlobalStyle } from 'styled-components';
import { chatgptTheme } from '@lyra/ui/themes';

const GlobalStyle = createGlobalStyle`
  ${chatgptTheme}

  /* 추가 글로벌 스타일 */
  body {
    font-family: var(--font-family-sans);
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <YourComponents />
    </>
  );
}
```

---

## 📊 성능

ChatGPT 테마는 **CSS 변수 기반**이므로 런타임 성능 오버헤드가 없습니다:

- ✅ 빌드 타임에 포함
- ✅ Tree-shaking 지원
- ✅ 추가 JavaScript 번들 없음
- ✅ 브라우저 네이티브 CSS

---

## 🆚 테마 비교

| 특징 | Default | ChatGPT |
|------|---------|---------|
| OpenAI 준수 | ❌ | ✅ |
| 브랜드 커스터마이징 | 제한적 | 완전 지원 |
| Gradient 사용 | ✅ | ❌ |
| OKLCH 색상 | ❌ | ✅ |
| 다크모드 | ✅ | ✅ |

---

## 🐛 트러블슈팅

### 테마가 적용되지 않아요

1. CSS 파일이 올바르게 import되었는지 확인:
   ```tsx
   import '@lyra/ui/themes/chatgpt.css';
   ```

2. CSS 변수가 오버라이드되지 않았는지 확인:
   ```css
   /* ⚠️ 이렇게 하면 테마가 무시됩니다 */
   * {
     background: white !important;
   }
   ```

### 브랜드 색상이 바뀌지 않아요

`--brand-accent` 변수를 **테마 로드 후**에 설정하세요:

```tsx
// ❌ 잘못된 순서
import './brand.css';
import '@lyra/ui/themes/chatgpt.css';

// ✅ 올바른 순서
import '@lyra/ui/themes/chatgpt.css';
import './brand.css';
```

### 다크모드가 작동하지 않아요

시스템 다크모드 설정을 확인하거나, 수동 토글을 구현하세요:

```tsx
<html data-theme="dark">
  {/* 수동 다크모드 */}
</html>
```

---

## 📚 참고 자료

- [OpenAI Apps SDK Design Guidelines](https://platform.openai.com/docs/guides/apps-design-guidelines)
- [OKLCH Color Space](https://oklch.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lyra UI Documentation](../README.md)

---

## 🤝 기여

새로운 테마 프리셋을 제안하거나 기존 테마를 개선하고 싶으신가요?

1. Issue를 열어 제안 사항을 공유하세요
2. PR을 생성하여 새로운 테마를 추가하세요
3. 디자인 가이드라인 준수 여부를 확인하세요

---

**다음 테마 예정**: Enterprise Theme, Minimal Theme
