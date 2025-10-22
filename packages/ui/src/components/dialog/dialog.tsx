import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import "./dialog.module.css";

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
export const Dialog = BaseDialog;

// Type exports
export type DialogRootProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Root>;
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>;
export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>;
export type DialogBackdropProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>;
export type DialogPopupProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>;
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Title>;
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Description>;
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Close>;
