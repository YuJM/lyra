import * as React from "react";
import { clsx } from "clsx";
import styles from "./button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내용 */
  children: React.ReactNode;

  /** 버튼 변형 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';

  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';

  /** 로딩 상태 */
  loading?: boolean;

  /** 아이콘 (왼쪽) */
  iconLeft?: React.ReactNode;

  /** 아이콘 (오른쪽) */
  iconRight?: React.ReactNode;

  /** 전체 너비 */
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      ...other
    } = props;

    const classNames = clsx(
      styles.Button,
      styles[`Button--${variant}`],
      styles[`Button--${size}`],
      fullWidth && styles['Button--fullWidth'],
      loading && styles['Button--loading'],
      className
    );

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={classNames}
        type="button"
        disabled={isDisabled}
        aria-busy={loading}
        {...other}
      >
        {loading && (
          <span className={styles.ButtonSpinner} aria-hidden="true">
            <svg
              className={styles.ButtonSpinnerSvg}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={styles.ButtonSpinnerCircle}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )}
        {!loading && iconLeft && (
          <span className={styles.ButtonIconLeft} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <span className={styles.ButtonContent}>{children}</span>
        {!loading && iconRight && (
          <span className={styles.ButtonIconRight} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
