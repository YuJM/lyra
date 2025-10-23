# Lyra UI - Technical Patterns & Best Practices

## Component Implementation Patterns

### 1. Base UI Integration Pattern
```tsx
import * as BaseUI from "@base-ui-components/react/ComponentName";
import styles from "./component.module.css";

// Namespace composition
export const Component = {
  Root: React.forwardRef<HTMLElement, RootProps>((props, ref) => (
    <BaseUI.Root {...props} ref={ref} className={styles.Root} />
  )),
  
  Trigger: React.forwardRef<HTMLElement, TriggerProps>((props, ref) => (
    <BaseUI.Trigger {...props} ref={ref} className={styles.Trigger} />
  )),
};

// Type exports
export type {
  RootProps as ComponentRootProps,
  TriggerProps as ComponentTriggerProps,
};
```

### 2. Third-Party Library Wrapper Pattern (Toast/Sonner)
```tsx
import { Toaster, toast as externalToast } from "external-lib";
import styles from "./component.module.css";

// Wrap provider with Lyra styling
const Provider = React.forwardRef<HTMLElement, ProviderProps>(
  (props, ref) => (
    <Toaster
      {...props}
      ref={ref}
      toastOptions={{
        classNames: {
          toast: styles.Toast,
          title: styles.ToastTitle,
          // Map all Sonner classes to Lyra styles
        },
      }}
    />
  )
);

// Re-export imperative API
export const toast = {
  show: externalToast,
  success: externalToast.success,
  // ... other methods
};

export const Component = { Provider };
```

### 3. CSS Module Pattern with Design Tokens
```css
/* Component base styles */
.Component {
  /* Use design tokens */
  padding: var(--spacing-3, 12px);
  background-color: var(--color-background-default, #ffffff);
  border: 1px solid var(--color-border-default, #e5e7eb);
  border-radius: var(--border-radius-md, 8px);
  
  /* Typography tokens */
  font-family: var(--font-family-base, system-ui);
  font-size: var(--font-size-base, 16px);
  
  /* Transition tokens */
  transition: all var(--duration-fast, 150ms) var(--easing-ease-out, ease-out);
}

/* Variant patterns */
.ComponentPrimary {
  background-color: var(--color-primary-solid, #3b82f6);
  color: var(--color-text-on-primary, #ffffff);
}

/* State patterns */
.Component:hover {
  background-color: var(--color-primary-hover, #2563eb);
}

.Component[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dark mode pattern */
@media (prefers-color-scheme: dark) {
  .Component {
    background-color: var(--color-background-default-dark, #1f2937);
    color: var(--color-text-default-dark, #f9fafb);
  }
}

/* Accessibility patterns */
@media (prefers-reduced-motion: reduce) {
  .Component {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .Component {
    border-width: 2px;
  }
}
```

### 4. Test Pattern
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Component } from "./component";

describe("Component", () => {
  describe("렌더링", () => {
    it("기본 렌더링", () => {
      render(<Component.Root />);
      expect(screen.getByRole("...")).toBeInTheDocument();
    });
  });

  describe("인터랙션", () => {
    it("클릭 이벤트", async () => {
      const handleClick = vi.fn();
      render(<Component.Root onClick={handleClick} />);
      await userEvent.click(screen.getByRole("..."));
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe("접근성", () => {
    it("ARIA 속성", () => {
      render(<Component.Root aria-label="test" />);
      expect(screen.getByLabelText("test")).toBeInTheDocument();
    });
  });
});
```

### 5. Storybook Story Pattern
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./component";

const meta = {
  title: "Components/Component",
  component: Component.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Component.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Component
 */
export const Default: Story = {
  args: {
    children: "Example",
  },
};

/**
 * 변형 예시
 */
export const Variant: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};
```

## Design Token Usage Guidelines

### Spacing Scale
```
--spacing-1: 4px    # Minimal gaps
--spacing-2: 8px    # Small gaps
--spacing-3: 12px   # Default gaps
--spacing-4: 16px   # Medium padding
--spacing-5: 20px   # Large padding
--spacing-6: 24px   # Section spacing
```

### Color Token Hierarchy
```
# Background
--color-background-default       # Main surface
--color-background-secondary     # Subtle background
--color-background-tertiary      # Disabled states

# Text
--color-text-default            # Primary text
--color-text-secondary          # Secondary text
--color-text-tertiary           # Disabled text
--color-text-on-primary         # Text on colored backgrounds

# Semantic
--color-primary-solid           # Primary actions
--color-success-solid           # Success states
--color-danger-solid            # Error states
--color-warning-solid           # Warning states
--color-info-solid              # Info states

# States
--color-primary-hover           # Hover state
--color-primary-active          # Active/pressed state
```

### Typography Scale
```
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px

--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700

--line-height-tight: 1.25
--line-height-normal: 1.5
--line-height-relaxed: 1.75
```

## Common Pitfalls & Solutions

### Pitfall 1: Forgetting CSS Import in index.tsx
**Problem**: Component styles not applied in production build
```tsx
// ❌ Wrong - Missing CSS import
export { Button } from "./components/button/button";

// ✅ Correct - Import CSS first
import "./components/button/button.module.css";
export { Button } from "./components/button/button";
```

### Pitfall 2: Not Using Design Tokens
**Problem**: Inconsistent styling, hard to theme
```css
/* ❌ Wrong - Hardcoded values */
.Button {
  padding: 12px;
  background: #3b82f6;
}

/* ✅ Correct - Design tokens */
.Button {
  padding: var(--spacing-3, 12px);
  background: var(--color-primary-solid, #3b82f6);
}
```

### Pitfall 3: Missing Dark Mode Support
**Problem**: Components look broken in dark mode
```css
/* ❌ Wrong - Only light mode */
.Component {
  background: #ffffff;
  color: #000000;
}

/* ✅ Correct - Dark mode support */
.Component {
  background: var(--color-background-default, #ffffff);
  color: var(--color-text-default, #111827);
}

@media (prefers-color-scheme: dark) {
  .Component {
    background: var(--color-background-default-dark, #1f2937);
    color: var(--color-text-default-dark, #f9fafb);
  }
}
```

### Pitfall 4: Not Forwarding Refs
**Problem**: Parent components can't access DOM elements
```tsx
// ❌ Wrong - No ref forwarding
export const Component = (props: Props) => {
  return <div {...props} />;
};

// ✅ Correct - Ref forwarding
export const Component = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return <div {...props} ref={ref} />;
  }
);
```

### Pitfall 5: Incomplete Type Exports
**Problem**: TypeScript users can't access prop types
```tsx
// ❌ Wrong - Types not exported
export const Component = { Root, Trigger };

// ✅ Correct - Export all types
export const Component = { Root, Trigger };
export type {
  RootProps as ComponentRootProps,
  TriggerProps as ComponentTriggerProps,
};
```

## Performance Best Practices

### 1. Use React.memo for Expensive Components
```tsx
export const ExpensiveComponent = React.memo(
  React.forwardRef<HTMLElement, Props>((props, ref) => {
    // Expensive rendering logic
  })
);
```

### 2. Avoid Inline Styles (Use CSS Modules)
```tsx
// ❌ Wrong - Inline styles create new objects
<div style={{ padding: 12 }} />

// ✅ Correct - CSS modules (static)
<div className={styles.Component} />
```

### 3. Lazy Load Heavy Components
```tsx
// For components with heavy dependencies
const Dialog = React.lazy(() => import("./components/dialog/dialog"));
```

## Accessibility Checklist

- [ ] Keyboard navigation support (Tab, Enter, Space, Escape, Arrows)
- [ ] ARIA attributes (role, aria-label, aria-describedby, aria-expanded)
- [ ] Focus management (focus trap, focus return, visible focus indicators)
- [ ] Screen reader support (semantic HTML, ARIA live regions)
- [ ] Color contrast (WCAG AA minimum: 4.5:1 for text)
- [ ] Reduced motion support (@media prefers-reduced-motion)
- [ ] High contrast support (@media prefers-contrast)
- [ ] Touch target size (minimum 44x44px)

## Migration Guide: Base UI → Lyra UI

### Before (Base UI)
```tsx
import * as Dialog from "@base-ui-components/react/dialog";

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

### After (Lyra UI)
```tsx
import { Dialog } from "@lyra/ui";

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

**Differences**:
- ✅ Lyra design tokens automatically applied
- ✅ Dark mode support included
- ✅ Consistent styling across all components
- ✅ TypeScript types exported
