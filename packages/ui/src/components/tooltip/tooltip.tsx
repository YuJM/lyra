import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import styles from "./tooltip.module.css";

/**
 * Tooltip 컴포넌트
 *
 * Hover 또는 Focus 시 추가 정보를 표시하는 툴팁 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Tooltip.Provider>
 *   <Tooltip.Root>
 *     <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *     <Tooltip.Portal>
 *       <Tooltip.Positioner>
 *         <Tooltip.Popup>
 *           Tooltip content
 *           <Tooltip.Arrow />
 *         </Tooltip.Popup>
 *       </Tooltip.Positioner>
 *     </Tooltip.Portal>
 *   </Tooltip.Root>
 * </Tooltip.Provider>
 * ```
 */

// Provider
export type TooltipProviderProps = React.ComponentProps<typeof BaseTooltip.Provider>;
const TooltipProvider = BaseTooltip.Provider;

// Root
export type TooltipRootProps = React.ComponentProps<typeof BaseTooltip.Root>;
const TooltipRoot = BaseTooltip.Root;

// Trigger
export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger> {
  className?: string;
}
const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTooltip.Trigger
        {...rest}
        ref={ref}
        className={className || styles.TooltipTrigger}
      />
    );
  }
);
TooltipTrigger.displayName = "Tooltip.Trigger";

// Portal
export type TooltipPortalProps = React.ComponentProps<typeof BaseTooltip.Portal>;
const TooltipPortal = BaseTooltip.Portal;

// Positioner
export interface TooltipPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner> {
  className?: string;
}
const TooltipPositioner = React.forwardRef<HTMLDivElement, TooltipPositionerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTooltip.Positioner
        {...rest}
        ref={ref}
        className={className || styles.TooltipPositioner}
      />
    );
  }
);
TooltipPositioner.displayName = "Tooltip.Positioner";

// Popup
export interface TooltipPopupProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> {
  className?: string;
}
const TooltipPopup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTooltip.Popup
        {...rest}
        ref={ref}
        className={className || styles.TooltipPopup}
      />
    );
  }
);
TooltipPopup.displayName = "Tooltip.Popup";

// Arrow
export interface TooltipArrowProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Arrow> {
  className?: string;
}
const TooltipArrow = React.forwardRef<HTMLDivElement, TooltipArrowProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseTooltip.Arrow
        {...rest}
        ref={ref}
        className={className || styles.TooltipArrow}
      />
    );
  }
);
TooltipArrow.displayName = "Tooltip.Arrow";

// Export
export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
};
