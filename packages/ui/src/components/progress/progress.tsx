import * as React from "react";
import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import styles from "./progress.module.css";

/**
 * Progress 컴포넌트
 *
 * 오래 걸리는 작업의 진행 상태를 시각적으로 표시하는 컴포넌트입니다.
 * 결정된(determinate) 및 불확정(indeterminate) 상태를 모두 지원합니다.
 *
 * @example
 * ```tsx
 * <Progress.Root value={50}>
 *   <Progress.Label>Loading...</Progress.Label>
 *   <Progress.Track>
 *     <Progress.Indicator />
 *   </Progress.Track>
 *   <Progress.Value />
 * </Progress.Root>
 * ```
 */

// Root
export type ProgressRootProps = React.ComponentProps<typeof BaseProgress.Root>;
const ProgressRoot = BaseProgress.Root;

// Label
export interface ProgressLabelProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Label> {
  className?: string;
}
const ProgressLabel = React.forwardRef<HTMLSpanElement, ProgressLabelProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseProgress.Label
        {...rest}
        ref={ref}
        className={className || styles.ProgressLabel}
      />
    );
  }
);
ProgressLabel.displayName = "Progress.Label";

// Track
export interface ProgressTrackProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Track> {
  className?: string;
}
const ProgressTrack = React.forwardRef<HTMLDivElement, ProgressTrackProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseProgress.Track
        {...rest}
        ref={ref}
        className={className || styles.ProgressTrack}
      />
    );
  }
);
ProgressTrack.displayName = "Progress.Track";

// Indicator
export interface ProgressIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator> {
  className?: string;
}
const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseProgress.Indicator
        {...rest}
        ref={ref}
        className={className || styles.ProgressIndicator}
      />
    );
  }
);
ProgressIndicator.displayName = "Progress.Indicator";

// Value
export interface ProgressValueProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Value> {
  className?: string;
}
const ProgressValue = React.forwardRef<HTMLSpanElement, ProgressValueProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseProgress.Value
        {...rest}
        ref={ref}
        className={className || styles.ProgressValue}
      />
    );
  }
);
ProgressValue.displayName = "Progress.Value";

// Export
export const Progress = {
  Root: ProgressRoot,
  Label: ProgressLabel,
  Track: ProgressTrack,
  Indicator: ProgressIndicator,
  Value: ProgressValue,
};
