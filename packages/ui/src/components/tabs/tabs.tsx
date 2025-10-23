import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import styles from "./tabs.module.css";

/**
 * Tabs 컴포넌트
 *
 * 탭 인터페이스를 제공하는 컴포넌트입니다.
 * Tab 전환, 키보드 네비게이션, Indicator 애니메이션을 지원합니다.
 *
 * @example
 * ```tsx
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
 *     <Tabs.Indicator />
 *   </Tabs.List>
 *   <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
 *   <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
 * </Tabs.Root>
 * ```
 */

// Root
export type TabsRootProps = React.ComponentProps<typeof BaseTabs.Root>;
const TabsRoot = BaseTabs.Root;

// List
export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
  className?: string;
}
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTabs.List
        {...rest}
        ref={ref}
        className={className || styles.TabsList}
      />
    );
  }
);
TabsList.displayName = "Tabs.List";

// Tab
export interface TabsTabProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
  className?: string;
}
const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTabs.Tab
        {...rest}
        ref={ref}
        className={className || styles.TabsTab}
      />
    );
  }
);
TabsTab.displayName = "Tabs.Tab";

// Indicator
export interface TabsIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator> {
  className?: string;
}
const TabsIndicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTabs.Indicator
        {...rest}
        ref={ref}
        className={className || styles.TabsIndicator}
      />
    );
  }
);
TabsIndicator.displayName = "Tabs.Indicator";

// Panel
export interface TabsPanelProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> {
  className?: string;
}
const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTabs.Panel
        {...rest}
        ref={ref}
        className={className || styles.TabsPanel}
      />
    );
  }
);
TabsPanel.displayName = "Tabs.Panel";

// Export
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
};
