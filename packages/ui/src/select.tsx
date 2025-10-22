import * as React from "react";
import { Select as BaseSelect } from "@base-ui-components/react/select";
import { clsx } from "clsx";
import styles from "./select.module.css";

// Select.Root
export type SelectRootProps = React.ComponentProps<typeof BaseSelect.Root>;
const SelectRoot = BaseSelect.Root;

// Select.Trigger
export type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger> & {
  className?: string;
};
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Trigger
        className={clsx(styles.Trigger, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectTrigger.displayName = "Select.Trigger";

// Select.Value
export type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value> & {
  className?: string;
};
const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Value
        className={clsx(styles.Value, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectValue.displayName = "Select.Value";

// Select.Icon
export type SelectIconProps = React.ComponentProps<typeof BaseSelect.Icon> & {
  className?: string;
};
const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseSelect.Icon
        className={clsx(styles.Icon, className)}
        ref={ref}
        {...props}
      >
        {children || (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </BaseSelect.Icon>
    );
  }
);
SelectIcon.displayName = "Select.Icon";

// Select.Portal
const SelectPortal = BaseSelect.Portal;

// Select.Backdrop
export type SelectBackdropProps = React.ComponentProps<typeof BaseSelect.Backdrop> & {
  className?: string;
};
const SelectBackdrop = React.forwardRef<HTMLDivElement, SelectBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Backdrop
        className={clsx(styles.Backdrop, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectBackdrop.displayName = "Select.Backdrop";

// Select.Positioner
export type SelectPositionerProps = React.ComponentProps<typeof BaseSelect.Positioner> & {
  className?: string;
};
const SelectPositioner = React.forwardRef<HTMLDivElement, SelectPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Positioner
        className={clsx(styles.Positioner, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectPositioner.displayName = "Select.Positioner";

// Select.Popup
export type SelectPopupProps = React.ComponentProps<typeof BaseSelect.Popup> & {
  className?: string;
};
const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Popup
        className={clsx(styles.Popup, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectPopup.displayName = "Select.Popup";

// Select.Arrow
export type SelectArrowProps = React.ComponentProps<typeof BaseSelect.Arrow> & {
  className?: string;
};
const SelectArrow = React.forwardRef<HTMLDivElement, SelectArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Arrow
        className={clsx(styles.Arrow, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectArrow.displayName = "Select.Arrow";

// Select.Item
export type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item> & {
  className?: string;
};
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Item
        className={clsx(styles.Item, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectItem.displayName = "Select.Item";

// Select.ItemText
export type SelectItemTextProps = React.ComponentProps<typeof BaseSelect.ItemText> & {
  className?: string;
};
const SelectItemText = React.forwardRef<HTMLDivElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.ItemText
        className={clsx(styles.ItemText, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectItemText.displayName = "Select.ItemText";

// Select.ItemIndicator
export type SelectItemIndicatorProps = React.ComponentProps<typeof BaseSelect.ItemIndicator> & {
  className?: string;
};
const SelectItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseSelect.ItemIndicator
        className={clsx(styles.ItemIndicator, className)}
        ref={ref}
        {...props}
      >
        {children || (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 4L6 11L3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </BaseSelect.ItemIndicator>
    );
  }
);
SelectItemIndicator.displayName = "Select.ItemIndicator";

// Select.Group
const SelectGroup = BaseSelect.Group;

// Select.GroupLabel
export type SelectGroupLabelProps = React.ComponentProps<typeof BaseSelect.GroupLabel> & {
  className?: string;
};
const SelectGroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.GroupLabel
        className={clsx(styles.GroupLabel, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SelectGroupLabel.displayName = "Select.GroupLabel";

// Export as namespace
export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPortal,
  Backdrop: SelectBackdrop,
  Positioner: SelectPositioner,
  Popup: SelectPopup,
  Arrow: SelectArrow,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
};
