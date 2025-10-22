import * as React from "react";
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { clsx } from "clsx";
import styles from "./radio.module.css";

export type RadioProps = React.ComponentProps<typeof BaseRadio.Root>;

const RadioComponent = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseRadio.Root
        className={clsx(styles.Radio, className)}
        ref={ref}
        {...props}
      >
        <BaseRadio.Indicator className={styles.Indicator} />
      </BaseRadio.Root>
    );
  }
);

RadioComponent.displayName = "Radio";

export const Radio = RadioComponent;
