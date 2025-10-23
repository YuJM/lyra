# Lyra UI 접근성 가이드라인

> **목표**: 모든 Lyra UI 컴포넌트는 WCAG 2.1 Level AA를 100% 준수합니다.

## 📚 목차

1. [개요](#개요)
2. [핵심 원칙](#핵심-원칙)
3. [컴포넌트 개발 체크리스트](#컴포넌트-개발-체크리스트)
4. [테스트 방법](#테스트-방법)
5. [일반적인 실수와 해결책](#일반적인-실수와-해결책)
6. [참고 자료](#참고-자료)

---

## 개요

접근성(Accessibility, a11y)은 모든 사용자가 웹 콘텐츠에 접근하고 사용할 수 있도록 보장하는 것입니다.
Lyra UI는 OpenAI Apps SDK 가이드라인과 WCAG 2.1 Level AA 준수를 필수로 요구합니다.

### 왜 접근성이 중요한가?

- **법적 요구사항**: 많은 국가에서 웹 접근성은 법적 의무입니다
- **더 많은 사용자**: 전 세계 인구의 15%가 장애를 가지고 있습니다
- **더 나은 UX**: 접근성은 모든 사용자에게 더 나은 경험을 제공합니다
- **SEO 개선**: 접근 가능한 콘텐츠는 검색 엔진에 더 잘 노출됩니다

---

## 핵심 원칙

### 1. Perceivable (인지 가능)

사용자가 정보를 인지할 수 있어야 합니다.

#### ✅ Do (올바른 예)
```tsx
// 이미지에 대체 텍스트 제공
<img src="logo.png" alt="Lyra UI 로고" />

// 아이콘 버튼에 접근 가능한 이름 제공
<Button aria-label="메뉴 열기">
  <MenuIcon />
</Button>

// 충분한 색상 대비 (최소 4.5:1)
<Text style={{ color: '#333', backgroundColor: '#fff' }}>
  읽기 쉬운 텍스트
</Text>
```

#### ❌ Don't (잘못된 예)
```tsx
// 대체 텍스트 없음
<img src="logo.png" />

// 아이콘만 있는 버튼 (접근 가능한 이름 없음)
<Button>
  <MenuIcon />
</Button>

// 낮은 색상 대비 (2:1)
<Text style={{ color: '#aaa', backgroundColor: '#fff' }}>
  읽기 어려운 텍스트
</Text>
```

---

### 2. Operable (조작 가능)

모든 기능을 키보드로 조작할 수 있어야 합니다.

#### ✅ Do
```tsx
// 모든 인터랙션을 키보드로 조작 가능
<Button onClick={handleClick}>클릭</Button>

// Tab 키로 포커스 이동, Enter/Space로 활성화
<Checkbox checked={checked} onChange={handleChange}>
  동의합니다
</Checkbox>

// 포커스 인디케이터 제공 (3:1 대비율)
<Input
  type="text"
  style={{ outline: '2px solid #0066cc' }}
/>
```

#### ❌ Don't
```tsx
// 마우스 전용 인터랙션 (키보드 조작 불가)
<div onClick={handleClick}>클릭</div>

// 포커스 인디케이터 제거
<Input style={{ outline: 'none' }} />

// 키보드 트랩 (ESC로 탈출 불가)
<Modal isOpen={true} onClose={undefined} />
```

---

### 3. Understandable (이해 가능)

콘텐츠와 동작이 이해하기 쉬워야 합니다.

#### ✅ Do
```tsx
// 명확한 레이블 제공
<Input
  id="email"
  type="email"
  aria-label="이메일 주소"
/>
<label htmlFor="email">이메일</label>

// 오류 메시지 명확히 설명
<Input
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && (
  <Text id="email-error" role="alert">
    유효한 이메일 주소를 입력하세요
  </Text>
)}
```

#### ❌ Don't
```tsx
// 레이블 없음
<Input type="email" />

// 모호한 오류 메시지
{hasError && <Text>오류</Text>}

// 색상만으로 정보 전달
<Text style={{ color: 'red' }}>중요</Text>
```

---

### 4. Robust (견고함)

다양한 보조 기술과 호환되어야 합니다.

#### ✅ Do
```tsx
// 시맨틱 HTML 사용
<button>클릭</button>
<nav>내비게이션</nav>
<main>메인 콘텐츠</main>

// 적절한 ARIA 속성
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">확인</h2>
  <p>정말 삭제하시겠습니까?</p>
</div>
```

#### ❌ Don't
```tsx
// div로 버튼 구현 (시맨틱하지 않음)
<div onClick={handleClick}>클릭</div>

// 잘못된 ARIA 사용
<div role="button" aria-checked="true">
  <!-- role="button"에는 aria-checked가 없음 -->
</div>
```

---

## 컴포넌트 개발 체크리스트

새로운 컴포넌트를 개발할 때 아래 체크리스트를 따르세요.

### 필수 항목 (Must Have)

- [ ] **시맨틱 HTML**: `<button>`, `<input>`, `<label>` 등 적절한 태그 사용
- [ ] **키보드 네비게이션**: Tab, Enter, Space, Arrow 키 지원
- [ ] **포커스 관리**: 명확한 포커스 인디케이터 (최소 3:1 대비율)
- [ ] **접근 가능한 이름**: 모든 인터랙티브 요소에 `aria-label` 또는 텍스트 제공
- [ ] **색상 대비**: 텍스트 4.5:1, UI 컴포넌트 3:1 이상
- [ ] **ARIA 속성**: `role`, `aria-*` 적절히 사용

### 권장 항목 (Should Have)

- [ ] **스크린 리더 테스트**: NVDA, JAWS, VoiceOver로 검증
- [ ] **반응형 디자인**: 모바일, 태블릿, 데스크톱에서 동작
- [ ] **텍스트 확대**: 200% 확대 시 레이아웃 유지
- [ ] **에러 처리**: 명확한 오류 메시지 및 복구 제안
- [ ] **상태 알림**: `role="status"`, `role="alert"` 사용

---

## 테스트 방법

### 1. 자동 테스트

#### Storybook A11y Addon
```bash
# Storybook 실행
pnpm storybook

# A11y 탭에서 위반 사항 확인
# 모든 위반을 0개로 만들어야 함
```

#### 접근성 자동 테스트 스크립트
```bash
# 모든 스토리 자동 테스트
pnpm test:a11y

# 결과 예시:
# ✅ 통과: 12개
# ❌ 실패: 2개
# 총 위반: 3개
```

---

### 2. 수동 테스트

#### 키보드 네비게이션
1. **Tab 키**: 모든 인터랙티브 요소 순회
2. **Enter/Space**: 버튼, 링크, 체크박스 활성화
3. **Arrow 키**: 라디오 버튼, 셀렉트, 탭 네비게이션
4. **ESC**: 모달, 드롭다운 닫기

```bash
# 테스트 체크리스트
[ ] Tab 키만으로 모든 기능 접근 가능
[ ] 포커스 순서가 논리적
[ ] 포커스 인디케이터가 명확히 보임
[ ] 키보드 트랩 없음 (ESC로 탈출 가능)
```

#### 스크린 리더 테스트

**Windows (NVDA - 무료)**
```bash
# NVDA 다운로드: https://www.nvaccess.org/
# 실행 후 웹페이지 탐색
# 모든 요소가 읽히는지 확인
```

**macOS (VoiceOver - 내장)**
```bash
# VoiceOver 활성화: Cmd + F5
# 웹 로터: Ctrl + Option + U
# 모든 헤딩, 링크, 폼 요소 확인
```

#### 색상 대비 검증

**Chrome DevTools**
1. 요소 검사 (Cmd/Ctrl + Shift + C)
2. Styles 탭에서 색상 옆 사각형 클릭
3. Contrast ratio 확인
4. ✅ AA: 4.5:1 (일반 텍스트), 3:1 (대형 텍스트, UI)

**WebAIM Contrast Checker**
```
https://webaim.org/resources/contrastchecker/

전경색: #333333
배경색: #ffffff
대비율: 12.63:1 ✅ AAA
```

---

## 일반적인 실수와 해결책

### 1. 아이콘 버튼에 접근 가능한 이름 없음

#### ❌ 문제
```tsx
<Button>
  <CloseIcon />
</Button>
```

#### ✅ 해결
```tsx
// 방법 1: aria-label
<Button aria-label="닫기">
  <CloseIcon />
</Button>

// 방법 2: 시각적으로 숨겨진 텍스트
<Button>
  <CloseIcon />
  <span className="sr-only">닫기</span>
</Button>

// sr-only CSS (Tailwind 스타일)
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

### 2. 낮은 색상 대비

#### ❌ 문제
```css
/* 대비율: 2.3:1 (AA 미달) */
color: #999999;
background: #ffffff;
```

#### ✅ 해결
```css
/* 대비율: 7.0:1 (AAA) */
color: #595959;
background: #ffffff;
```

**도구**: Chrome DevTools, WebAIM Contrast Checker

---

### 3. 포커스 인디케이터 제거

#### ❌ 문제
```css
button:focus {
  outline: none; /* 절대 금지! */
}
```

#### ✅ 해결
```css
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* 또는 커스텀 스타일 */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.5);
}
```

---

### 4. 키보드 트랩

#### ❌ 문제
```tsx
<Dialog isOpen={true}>
  <h2>제목</h2>
  <p>내용</p>
  {/* 닫기 버튼 없음, ESC 핸들러 없음 */}
</Dialog>
```

#### ✅ 해결
```tsx
<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)} // ESC 핸들러
>
  <h2>제목</h2>
  <p>내용</p>
  <Button onClick={() => setIsOpen(false)}>닫기</Button>
</Dialog>

// 포커스 트랩 구현 (Base UI는 자동 제공)
// Tab 키 순환: 첫 요소 ↔ 마지막 요소
```

---

### 5. 색상만으로 정보 전달

#### ❌ 문제
```tsx
<Text style={{ color: 'red' }}>
  필수 항목
</Text>
```

#### ✅ 해결
```tsx
<Text style={{ color: 'red' }}>
  <span aria-label="필수">*</span> 필수 항목
</Text>

// 또는 아이콘 추가
<Text>
  <AlertIcon /> 필수 항목
</Text>
```

---

### 6. 폼 필드 레이블 누락

#### ❌ 문제
```tsx
<Input type="email" placeholder="이메일" />
```

#### ✅ 해결
```tsx
// 방법 1: <label> 사용
<label htmlFor="email">이메일</label>
<Input id="email" type="email" />

// 방법 2: aria-label
<Input type="email" aria-label="이메일" />

// 방법 3: aria-labelledby
<h3 id="email-label">이메일</h3>
<Input type="email" aria-labelledby="email-label" />
```

---

## 참고 자료

### 공식 문서
- [WCAG 2.1 가이드라인](https://www.w3.org/TR/WCAG21/)
- [WCAG 2.1 한국어 번역](https://www.w3.org/TR/WCAG21-ko/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [OpenAI Apps SDK 디자인 가이드라인](../../../claudedocs/openai-apps-sdk-design-guidelines.md)

### 검증 도구
- [axe DevTools (Chrome Extension)](https://www.deque.com/axe/devtools/)
- [WAVE (Web Accessibility Evaluation Tool)](https://wave.webaim.org/extension/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse (Chrome DevTools)](https://developers.google.com/web/tools/lighthouse)

### 스크린 리더
- [NVDA (Windows, 무료)](https://www.nvaccess.org/)
- [JAWS (Windows, 유료)](https://www.freedomscientific.com/products/software/jaws/)
- VoiceOver (macOS/iOS, 내장)
- TalkBack (Android, 내장)

### 학습 자료
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [Smashing Magazine Accessibility](https://www.smashingmagazine.com/category/accessibility)

---

## 프로젝트 내부 문서

- [WCAG 2.1 AA 체크리스트](../../../claudedocs/wcag-2.1-aa-checklist.md)
- [접근성 테스트 스크립트](../scripts/test-a11y.mjs)
- [Storybook A11y 설정](../.storybook/preview.ts)

---

## 질문이나 제안사항

접근성 관련 질문이나 개선 제안은 GitHub Issues에 등록해주세요.

**작성자**: Lyra UI Team
**최종 업데이트**: 2025-10-23
