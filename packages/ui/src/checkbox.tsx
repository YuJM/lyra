import * as React from "react";
import { Checkbox as BaseCheckbox ,} from "@base-ui-components/react/checkbox";
import { clsx } from "clsx";
import styles from "./checkbox.module.css";

export type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root>;

function CheckIcon(props: React.ComponentProps<'svg'>): React.ReactElement {
  return (
    <svg fill="currentcolor" height="10" viewBox="0 0 10 10" width="10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

function HorizontalRuleIcon(props: React.ComponentProps<'svg'>): React.ReactElement {
  return (
    <svg
      fill="currentcolor"
      height="10"
      viewBox="0 0 24 24"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={3}
        x1="3"
        x2="21"
        y1="12"
        y2="12"
      />
    </svg>
  );
}

const CheckboxComponent = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCheckbox.Root 
        className={clsx(styles.Checkbox, className)}
        ref={ref} 
        {...props}
      >
        <BaseCheckbox.Indicator
          className={styles.Indicator}
          render={(renderProps, state) => (
            <span {...renderProps}>
              {state.indeterminate ? (
                <HorizontalRuleIcon className={styles.Icon} />
              ) : (
                <CheckIcon className={styles.Icon} />
              )}
            </span>
          )}
        />
      </BaseCheckbox.Root>
    );
  }
);

CheckboxComponent.displayName = "Checkbox";

export const Checkbox = CheckboxComponent;