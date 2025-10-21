import * as React from "react";
import "./global.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps): React.ReactElement {
  return (
    <button type="button" {...other}>
      {children}
    </button>
  );
}

Button.displayName = "Button";
