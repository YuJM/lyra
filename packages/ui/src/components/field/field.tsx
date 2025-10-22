import * as React from "react";
import { Field as BaseField } from "@base-ui-components/react/field";
import { clsx } from "clsx";
import styles from "./field.module.css";

// Field.Root
export type FieldRootProps = React.ComponentProps<typeof BaseField.Root>;

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseField.Root
        className={clsx(styles.FieldRoot, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

FieldRoot.displayName = "Field.Root";

// Field.Label
export type FieldLabelProps = React.ComponentProps<typeof BaseField.Label>;

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseField.Label
        className={clsx(styles.FieldLabel, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

FieldLabel.displayName = "Field.Label";

// Field.Control
export type FieldControlProps = React.ComponentProps<typeof BaseField.Control>;

const FieldControl = React.forwardRef<HTMLInputElement, FieldControlProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseField.Control
        className={clsx(styles.FieldControl, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

FieldControl.displayName = "Field.Control";

// Field.Description
export type FieldDescriptionProps = React.ComponentProps<
  typeof BaseField.Description
>;

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Description
      className={clsx(styles.FieldDescription, className)}
      ref={ref}
      {...props}
    />
  );
});

FieldDescription.displayName = "Field.Description";

// Field.Error
export type FieldErrorProps = React.ComponentProps<typeof BaseField.Error>;

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseField.Error
        className={clsx(styles.FieldError, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

FieldError.displayName = "Field.Error";

// Field.Validity
export type FieldValidityProps = React.ComponentProps<
  typeof BaseField.Validity
>;

const FieldValidity = BaseField.Validity;

FieldValidity.displayName = "Field.Validity";

// Field composite component
export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Validity: FieldValidity,
};
