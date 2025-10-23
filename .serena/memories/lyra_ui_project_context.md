# Lyra UI - Project Context

## Project Overview
**Name**: Lyra UI Component Library  
**Type**: React component library with Base UI integration  
**Status**: Production-ready (13/13 components complete)  
**Location**: `/Users/yujongmyeong/Documents/dev/ome/lyra/packages/ui`

## Architecture

### Technology Stack
- **Framework**: React 19.2.0
- **Component Base**: @base-ui-components/react v0.0.46
- **Styling**: CSS Modules with design tokens
- **Build**: Rollup (ESM + CJS)
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook
- **Language**: TypeScript 5.8.3

### Design System
**Token System** (CSS Variables):
```css
/* Spacing */
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px

/* Colors (Semantic Hierarchy) */
--color-background-default
--color-text-default
--color-primary-solid
--color-success-bg
--color-danger-solid

/* Typography */
--font-family-base
--font-size-sm, base, lg
--font-weight-medium, semibold

/* Effects */
--border-radius-md, lg
--shadow-sm, md, lg
--duration-fast, normal
```

### Component Pattern
**Compose Pattern** with namespace-based exports:
```tsx
export const Component = {
  Root: ComponentRoot,
  Trigger: ComponentTrigger,
  Content: ComponentContent,
};

// Usage
<Component.Root>
  <Component.Trigger />
  <Component.Content />
</Component.Root>
```

## Component Catalog (13/13)

### Phase 1: Form Components
1. **Button** - Primary interaction element
2. **Checkbox** + CheckboxGroup - Multi-selection
3. **Switch** - Binary toggle
4. **Radio** + RadioGroup - Single selection

### Phase 2: Dialog/Overlay
5. **Field** - Form field wrapper with label/description/error
6. **Select** - Dropdown selection (Base UI)
7. **Dialog** - Modal dialogs (Base UI)
8. **Tooltip** - Contextual hints (Base UI)
9. **Popover** - Floating content panels (Base UI)
10. **Menu** - Dropdown menus with items/groups (Base UI)

### Phase 3: Navigation
11. **Tabs** - Tabbed interface (Base UI)
12. **Collapsible** - Expandable content (Base UI)

### Phase 4: Feedback
13. **Progress** - Progress indicators (Base UI)
14. **Avatar** - User avatars (Base UI)
15. **Toast** - Notifications (Sonner v2.0.7, NOT Base UI)

## File Structure
```
packages/ui/
├── src/
│   ├── index.tsx                    # Main exports
│   ├── global.css                   # Design tokens
│   └── components/
│       ├── {component}/
│       │   ├── {component}.tsx      # Implementation
│       │   ├── {component}.module.css
│       │   ├── {component}.test.tsx
│       │   └── {component}.stories.tsx
│       └── ...
├── dist/
│   ├── esm/                        # ES Modules
│   ├── cjs/                        # CommonJS
│   └── types/                      # TypeScript definitions
├── package.json
├── tsconfig.json
├── rollup.config.mjs
└── vitest.config.ts
```

## Development Workflow

### Adding New Components
1. Create component directory: `src/components/{name}/`
2. Implement files: `{name}.tsx`, `{name}.module.css`
3. Add tests: `{name}.test.tsx`
4. Add stories: `{name}.stories.tsx`
5. Export in `src/index.tsx`:
   ```tsx
   import "./{name}/{name}.module.css";
   export { Component, type Props } from "./{name}/{name}";
   ```

### Testing
```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:ui           # UI mode
```

### Building
```bash
pnpm build             # Production build
pnpm build:js          # JavaScript only
pnpm build:types       # TypeScript declarations
```

### Storybook
```bash
pnpm storybook         # Development server
pnpm build-storybook   # Static build
```

## Quality Standards

### Test Requirements
- ✅ Rendering tests
- ✅ Interaction tests (user-event)
- ✅ Accessibility tests
- ✅ Controlled/uncontrolled modes
- ✅ Edge cases

### CSS Module Requirements
- Use design tokens (CSS variables)
- Include dark mode support
- Add accessibility features (high contrast, reduced motion)
- Provide responsive behavior

### TypeScript Requirements
- Export all prop types
- Use Base UI types where applicable
- Provide JSDoc comments for complex props

## Special Cases

### Toast Component Exception
- **Why Different**: Better UX than Base UI Toast
- **Library**: Sonner v2.0.7
- **Integration**: CSS modules via `toastOptions.classNames`
- **API**: Imperative (toast.show(), toast.success(), etc.)

### JSDOM Limitations
- Sonner's `setPointerCapture` causes test warnings
- **Not a bug**: Works perfectly in real browsers
- **Action**: Ignore the warning, tests pass

## Git Workflow
- **Main Branch**: main (production releases)
- **Dev Branch**: dev (development integration)
- **Feature Branches**: feat/{component}-component
- **Current Status**: All features merged to dev, ready for main

## Documentation
- **Expansion Plan**: `docs/ui-component-expansion-plan.md`
- **Component Docs**: Storybook stories with JSDoc
- **Usage Examples**: Story files serve as documentation

## Package Publishing (Future)
```json
{
  "name": "@lyra/ui",
  "version": "0.0.0",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    }
  }
}
```

## Key Dependencies
```json
{
  "@base-ui-components/react": "^0.0.46",
  "sonner": "^2.0.7",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

## Performance Considerations
- Tree-shakeable exports (named exports)
- CSS modules (scoped styles, no runtime overhead)
- Build size: ~50KB gzipped (all components)
- No runtime dependencies except React

## Maintenance Notes
- Keep Base UI updated for bug fixes
- Monitor Sonner releases for Toast improvements
- Maintain design token consistency
- Update tests when Base UI behavior changes
