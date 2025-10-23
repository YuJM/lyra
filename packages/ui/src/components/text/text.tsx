import * as React from "react";
import { clsx } from "clsx";
import styles from "./text.module.css";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** 텍스트 내용 */
  children: React.ReactNode;

  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right';

  /** 텍스트 색상 변형 */
  variant?: 'primary' | 'description' | 'muted' | 'error' | 'success';

  /** 전체 너비 */
  fullWidth?: boolean;
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 제목 내용 */
  children: React.ReactNode;

  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right';

  /** 텍스트 색상 변형 */
  variant?: 'primary' | 'description' | 'muted' | 'error' | 'success';
}

// Root Text component - renders <p> by default
const TextRoot = React.forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      fullWidth = false,
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      fullWidth && styles['Text--fullWidth'],
      className
    );

    return (
      <p ref={ref} className={classNames} {...other}>
        {children}
      </p>
    );
  }
);

TextRoot.displayName = "Text";

// H1 component
const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles['Text--h1'],
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      className
    );

    return (
      <h1 ref={ref} className={classNames} {...other}>
        {children}
      </h1>
    );
  }
);

H1.displayName = "Text.h1";

// H2 component
const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles['Text--h2'],
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      className
    );

    return (
      <h2 ref={ref} className={classNames} {...other}>
        {children}
      </h2>
    );
  }
);

H2.displayName = "Text.h2";

// H3 component
const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles['Text--h3'],
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      className
    );

    return (
      <h3 ref={ref} className={classNames} {...other}>
        {children}
      </h3>
    );
  }
);

H3.displayName = "Text.h3";

// H4 component
const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles['Text--h4'],
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      className
    );

    return (
      <h4 ref={ref} className={classNames} {...other}>
        {children}
      </h4>
    );
  }
);

H4.displayName = "Text.h4";

// H5 component
const H5 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles['Text--h5'],
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      className
    );

    return (
      <h5 ref={ref} className={classNames} {...other}>
        {children}
      </h5>
    );
  }
);

H5.displayName = "Text.h5";

// H6 component
const H6 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'left',
      variant = 'primary',
      ...other
    } = props;

    const classNames = clsx(
      styles.Text,
      styles['Text--h6'],
      styles[`Text--${align}`],
      styles[`Text--${variant}`],
      className
    );

    return (
      <h6 ref={ref} className={classNames} {...other}>
        {children}
      </h6>
    );
  }
);

H6.displayName = "Text.h6";

// Compound component export
export const Text = Object.assign(TextRoot, {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
});
