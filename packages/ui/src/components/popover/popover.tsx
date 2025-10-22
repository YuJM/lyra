import * as React from "react";
import { Popover as BasePopover } from "@base-ui-components/react/popover";
import styles from "./popover.module.css";

/**
 * Popover 컴포넌트
 *
 * 클릭 시 추가 콘텐츠를 표시하는 팝오버 컴포넌트입니다.
 * Dialog보다 가볍고, Tooltip보다 많은 컨텐츠를 담을 수 있습니다.
 *
 * @example
 * ```tsx
 * <Popover.Root>
 *   <Popover.Trigger>Open Popover</Popover.Trigger>
 *   <Popover.Portal>
 *     <Popover.Positioner>
 *       <Popover.Popup>
 *         <Popover.Title>Title</Popover.Title>
 *         <Popover.Description>Description text</Popover.Description>
 *         <Popover.Close>Close</Popover.Close>
 *         <Popover.Arrow />
 *       </Popover.Popup>
 *     </Popover.Positioner>
 *   </Popover.Portal>
 * </Popover.Root>
 * ```
 */

// Root
export type PopoverRootProps = React.ComponentProps<typeof BasePopover.Root>;
const PopoverRoot = BasePopover.Root;

// Trigger
export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Trigger> {
  className?: string;
}
const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Trigger
        {...rest}
        ref={ref}
        className={className || styles.PopoverTrigger}
      />
    );
  }
);
PopoverTrigger.displayName = "Popover.Trigger";

// Portal
export type PopoverPortalProps = React.ComponentProps<typeof BasePopover.Portal>;
const PopoverPortal = BasePopover.Portal;

// Backdrop
export interface PopoverBackdropProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop> {
  className?: string;
}
const PopoverBackdrop = React.forwardRef<HTMLDivElement, PopoverBackdropProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Backdrop
        {...rest}
        ref={ref}
        className={className || styles.PopoverBackdrop}
      />
    );
  }
);
PopoverBackdrop.displayName = "Popover.Backdrop";

// Positioner
export interface PopoverPositionerProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Positioner> {
  className?: string;
}
const PopoverPositioner = React.forwardRef<HTMLDivElement, PopoverPositionerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Positioner
        {...rest}
        ref={ref}
        className={className || styles.PopoverPositioner}
      />
    );
  }
);
PopoverPositioner.displayName = "Popover.Positioner";

// Popup
export interface PopoverPopupProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Popup> {
  className?: string;
}
const PopoverPopup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Popup
        {...rest}
        ref={ref}
        className={className || styles.PopoverPopup}
      />
    );
  }
);
PopoverPopup.displayName = "Popover.Popup";

// Arrow
export interface PopoverArrowProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Arrow> {
  className?: string;
}
const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Arrow
        {...rest}
        ref={ref}
        className={className || styles.PopoverArrow}
      />
    );
  }
);
PopoverArrow.displayName = "Popover.Arrow";

// Title
export interface PopoverTitleProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Title> {
  className?: string;
}
const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Title
        {...rest}
        ref={ref}
        className={className || styles.PopoverTitle}
      />
    );
  }
);
PopoverTitle.displayName = "Popover.Title";

// Description
export interface PopoverDescriptionProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Description> {
  className?: string;
}
const PopoverDescription = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Description
        {...rest}
        ref={ref}
        className={className || styles.PopoverDescription}
      />
    );
  }
);
PopoverDescription.displayName = "Popover.Description";

// Close
export interface PopoverCloseProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Close> {
  className?: string;
}
const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BasePopover.Close
        {...rest}
        ref={ref}
        className={className || styles.PopoverClose}
      />
    );
  }
);
PopoverClose.displayName = "Popover.Close";

// Export
export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Backdrop: PopoverBackdrop,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
  Arrow: PopoverArrow,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
};
