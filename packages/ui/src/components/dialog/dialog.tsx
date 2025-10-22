import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import styles from "./dialog.module.css";

/**
 * Dialog 컴포넌트
 *
 * 모달 대화상자를 표시하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger>Open Dialog</Dialog.Trigger>
 *   <Dialog.Portal>
 *     <Dialog.Backdrop />
 *     <Dialog.Popup>
 *       <Dialog.Title>Dialog Title</Dialog.Title>
 *       <Dialog.Description>This is a dialog description.</Dialog.Description>
 *       <Dialog.Close>Close</Dialog.Close>
 *     </Dialog.Popup>
 *   </Dialog.Portal>
 * </Dialog.Root>
 * ```
 */

// Root
export type DialogRootProps = React.ComponentProps<typeof BaseDialog.Root>;
const DialogRoot = BaseDialog.Root;

// Trigger
export interface DialogTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger> {
  className?: string;
}
const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseDialog.Trigger
        {...rest}
        ref={ref}
        className={className || styles.DialogTrigger}
      />
    );
  }
);
DialogTrigger.displayName = "Dialog.Trigger";

// Portal
export type DialogPortalProps = React.ComponentProps<typeof BaseDialog.Portal>;
const DialogPortal = BaseDialog.Portal;

// Backdrop
export interface DialogBackdropProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop> {
  className?: string;
}
const DialogBackdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseDialog.Backdrop
        {...rest}
        ref={ref}
        className={className || styles.DialogBackdrop}
      />
    );
  }
);
DialogBackdrop.displayName = "Dialog.Backdrop";

// Popup
export interface DialogPopupProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
  className?: string;
}
const DialogPopup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseDialog.Popup
        {...rest}
        ref={ref}
        className={className || styles.DialogPopup}
      />
    );
  }
);
DialogPopup.displayName = "Dialog.Popup";

// Title
export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Title> {
  className?: string;
}
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseDialog.Title
        {...rest}
        ref={ref}
        className={className || styles.DialogTitle}
      />
    );
  }
);
DialogTitle.displayName = "Dialog.Title";

// Description
export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Description> {
  className?: string;
}
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <BaseDialog.Description
      {...rest}
      ref={ref}
      className={className || styles.DialogDescription}
    />
  );
});
DialogDescription.displayName = "Dialog.Description";

// Close
export interface DialogCloseProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Close> {
  className?: string;
}
const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseDialog.Close
        {...rest}
        ref={ref}
        className={className || styles.DialogClose}
      />
    );
  }
);
DialogClose.displayName = "Dialog.Close";

// Export
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};
