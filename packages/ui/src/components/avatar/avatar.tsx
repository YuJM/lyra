import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import styles from "./avatar.module.css";

/**
 * Avatar 컴포넌트
 *
 * 사용자의 프로필 사진, 이니셜 또는 대체 아이콘을 표시하는 컴포넌트입니다.
 * 이미지 로딩 실패 시 폴백 콘텐츠를 표시합니다.
 *
 * @example
 * ```tsx
 * <Avatar.Root>
 *   <Avatar.Image src="/user.jpg" alt="User" />
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 * </Avatar.Root>
 * ```
 */

// Root
export interface AvatarRootProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
  className?: string;
}
const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseAvatar.Root
        {...rest}
        ref={ref}
        className={className || styles.AvatarRoot}
      />
    );
  }
);
AvatarRoot.displayName = "Avatar.Root";

// Image
export interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Image> {
  className?: string;
}
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseAvatar.Image
        {...rest}
        ref={ref}
        className={className || styles.AvatarImage}
      />
    );
  }
);
AvatarImage.displayName = "Avatar.Image";

// Fallback
export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback> {
  className?: string;
}
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <BaseAvatar.Fallback
        {...rest}
        ref={ref}
        className={className || styles.AvatarFallback}
      />
    );
  }
);
AvatarFallback.displayName = "Avatar.Fallback";

// Export
export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
};
