import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import styles from "./collapsible.module.css";

/**
 * Collapsible 컴포넌트
 *
 * 접기/펼치기 가능한 콘텐츠 영역을 제공하는 컴포넌트입니다.
 * 애니메이션, 키보드 접근성, 제어/비제어 모드를 지원합니다.
 *
 * @example
 * ```tsx
 * <Collapsible.Root>
 *   <Collapsible.Trigger>Toggle</Collapsible.Trigger>
 *   <Collapsible.Panel>
 *     Collapsible content
 *   </Collapsible.Panel>
 * </Collapsible.Root>
 * ```
 */

// Root
export type CollapsibleRootProps = React.ComponentProps<typeof BaseCollapsible.Root>;
const CollapsibleRoot = BaseCollapsible.Root;

// Trigger
export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> {
  className?: string;
}
const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseCollapsible.Trigger
        {...rest}
        ref={ref}
        className={className || styles.CollapsibleTrigger}
      />
    );
  }
);
CollapsibleTrigger.displayName = "Collapsible.Trigger";

// Panel
export interface CollapsiblePanelProps extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel> {
  className?: string;
}
const CollapsiblePanel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseCollapsible.Panel
        {...rest}
        ref={ref}
        className={className || styles.CollapsiblePanel}
      />
    );
  }
);
CollapsiblePanel.displayName = "Collapsible.Panel";

// Export
export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Panel: CollapsiblePanel,
};
