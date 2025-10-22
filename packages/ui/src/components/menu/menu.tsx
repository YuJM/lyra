import * as React from "react";
import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import styles from "./menu.module.css";

/**
 * Menu 컴포넌트
 *
 * 드롭다운 메뉴를 표시하는 컴포넌트입니다.
 * Submenu, RadioItem, CheckboxItem 등 다양한 메뉴 아이템을 지원합니다.
 *
 * @example
 * ```tsx
 * <Menu.Root>
 *   <Menu.Trigger>Options</Menu.Trigger>
 *   <Menu.Portal>
 *     <Menu.Positioner>
 *       <Menu.Popup>
 *         <Menu.Item>Edit</Menu.Item>
 *         <Menu.Item>Delete</Menu.Item>
 *         <Menu.Separator />
 *         <Menu.CheckboxItem>Show details</Menu.CheckboxItem>
 *       </Menu.Popup>
 *     </Menu.Positioner>
 *   </Menu.Portal>
 * </Menu.Root>
 * ```
 */

// Root
export type MenuRootProps = React.ComponentProps<typeof BaseMenu.Root>;
const MenuRoot = BaseMenu.Root;

// Trigger
export interface MenuTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger> {
  className?: string;
}
const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Trigger
        {...rest}
        ref={ref}
        className={className || styles.MenuTrigger}
      />
    );
  }
);
MenuTrigger.displayName = "Menu.Trigger";

// Portal
export type MenuPortalProps = React.ComponentProps<typeof BaseMenu.Portal>;
const MenuPortal = BaseMenu.Portal;

// Backdrop
export interface MenuBackdropProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Backdrop> {
  className?: string;
}
const MenuBackdrop = React.forwardRef<HTMLDivElement, MenuBackdropProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Backdrop
        {...rest}
        ref={ref}
        className={className || styles.MenuBackdrop}
      />
    );
  }
);
MenuBackdrop.displayName = "Menu.Backdrop";

// Positioner
export interface MenuPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner> {
  className?: string;
}
const MenuPositioner = React.forwardRef<HTMLDivElement, MenuPositionerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Positioner
        {...rest}
        ref={ref}
        className={className || styles.MenuPositioner}
      />
    );
  }
);
MenuPositioner.displayName = "Menu.Positioner";

// Popup
export interface MenuPopupProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Popup> {
  className?: string;
}
const MenuPopup = React.forwardRef<HTMLDivElement, MenuPopupProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Popup
        {...rest}
        ref={ref}
        className={className || styles.MenuPopup}
      />
    );
  }
);
MenuPopup.displayName = "Menu.Popup";

// Arrow
export interface MenuArrowProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Arrow> {
  className?: string;
}
const MenuArrow = React.forwardRef<HTMLDivElement, MenuArrowProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Arrow
        {...rest}
        ref={ref}
        className={className || styles.MenuArrow}
      />
    );
  }
);
MenuArrow.displayName = "Menu.Arrow";

// Item
export interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Item> {
  className?: string;
}
const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Item
        {...rest}
        ref={ref}
        className={className || styles.MenuItem}
      />
    );
  }
);
MenuItem.displayName = "Menu.Item";

// Separator
export interface MenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Separator> {
  className?: string;
}
const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Separator
        {...rest}
        ref={ref}
        className={className || styles.MenuSeparator}
      />
    );
  }
);
MenuSeparator.displayName = "Menu.Separator";

// Group
export interface MenuGroupProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Group> {
  className?: string;
}
const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.Group
        {...rest}
        ref={ref}
        className={className || styles.MenuGroup}
      />
    );
  }
);
MenuGroup.displayName = "Menu.Group";

// GroupLabel
export interface MenuGroupLabelProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel> {
  className?: string;
}
const MenuGroupLabel = React.forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.GroupLabel
        {...rest}
        ref={ref}
        className={className || styles.MenuGroupLabel}
      />
    );
  }
);
MenuGroupLabel.displayName = "Menu.GroupLabel";

// RadioGroup
export interface MenuRadioGroupProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.RadioGroup> {
  className?: string;
}
const MenuRadioGroup = React.forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.RadioGroup
        {...rest}
        ref={ref}
        className={className || styles.MenuRadioGroup}
      />
    );
  }
);
MenuRadioGroup.displayName = "Menu.RadioGroup";

// RadioItem
export interface MenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem> {
  className?: string;
}
const MenuRadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.RadioItem
        {...rest}
        ref={ref}
        className={className || styles.MenuRadioItem}
      />
    );
  }
);
MenuRadioItem.displayName = "Menu.RadioItem";

// RadioItemIndicator
export interface MenuRadioItemIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItemIndicator> {
  className?: string;
}
const MenuRadioItemIndicator = React.forwardRef<HTMLSpanElement, MenuRadioItemIndicatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.RadioItemIndicator
        {...rest}
        ref={ref}
        className={className || styles.MenuRadioItemIndicator}
      />
    );
  }
);
MenuRadioItemIndicator.displayName = "Menu.RadioItemIndicator";

// CheckboxItem
export interface MenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem> {
  className?: string;
}
const MenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.CheckboxItem
        {...rest}
        ref={ref}
        className={className || styles.MenuCheckboxItem}
      />
    );
  }
);
MenuCheckboxItem.displayName = "Menu.CheckboxItem";

// CheckboxItemIndicator
export interface MenuCheckboxItemIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItemIndicator> {
  className?: string;
}
const MenuCheckboxItemIndicator = React.forwardRef<HTMLSpanElement, MenuCheckboxItemIndicatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.CheckboxItemIndicator
        {...rest}
        ref={ref}
        className={className || styles.MenuCheckboxItemIndicator}
      />
    );
  }
);
MenuCheckboxItemIndicator.displayName = "Menu.CheckboxItemIndicator";

// SubmenuRoot
export interface MenuSubmenuRootProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuRoot> {
  className?: string;
}
const MenuSubmenuRoot = BaseMenu.SubmenuRoot;

// SubmenuTrigger
export interface MenuSubmenuTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger> {
  className?: string;
}
const MenuSubmenuTrigger = React.forwardRef<HTMLDivElement, MenuSubmenuTriggerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseMenu.SubmenuTrigger
        {...rest}
        ref={ref}
        className={className || styles.MenuSubmenuTrigger}
      />
    );
  }
);
MenuSubmenuTrigger.displayName = "Menu.SubmenuTrigger";

// Export
export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Backdrop: MenuBackdrop,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Arrow: MenuArrow,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  RadioItemIndicator: MenuRadioItemIndicator,
  CheckboxItem: MenuCheckboxItem,
  CheckboxItemIndicator: MenuCheckboxItemIndicator,
  SubmenuRoot: MenuSubmenuRoot,
  SubmenuTrigger: MenuSubmenuTrigger,
};
