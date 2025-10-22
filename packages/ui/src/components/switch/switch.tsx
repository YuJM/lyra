import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import { clsx } from "clsx";
import styles from "./switch.module.css";

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root>;

const SwitchComponent = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSwitch.Root
        className={clsx(styles.Switch, className)}
        ref={ref}
        {...props}
      >
        <BaseSwitch.Thumb className={styles.Thumb} />
      </BaseSwitch.Root>
    );
  }
);

SwitchComponent.displayName = "Switch";

export const Switch = SwitchComponent;
