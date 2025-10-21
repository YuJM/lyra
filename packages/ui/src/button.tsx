import * as React from "react";
import { clsx } from "clsx";
import styles from "./button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  ...other
}: ButtonProps): React.ReactElement {
  return (
    <button type="button" className={clsx(styles.button, className)} {...other}>
      {children}
    </button>
  );
}

Button.displayName = "Button";
