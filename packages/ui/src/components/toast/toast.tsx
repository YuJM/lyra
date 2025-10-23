import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import type { ToasterProps as SonnerToasterProps, ExternalToast } from "sonner";
import styles from "./toast.module.css";

/**
 * Toast Provider Component
 *
 * 애플리케이션의 루트에 한 번 렌더링하여 모든 토스트를 관리합니다.
 *
 * @example
 * ```tsx
 * <Toast.Provider position="top-right" richColors />
 * ```
 */
export interface ToastProviderProps extends SonnerToasterProps {
  className?: string;
}

const ToastProvider = React.forwardRef<HTMLElement, ToastProviderProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <SonnerToaster
        {...rest}
        ref={ref}
        className={className}
        toastOptions={{
          classNames: {
            toast: styles.Toast,
            title: styles.ToastTitle,
            description: styles.ToastDescription,
            actionButton: styles.ToastActionButton,
            cancelButton: styles.ToastCancelButton,
            closeButton: styles.ToastCloseButton,
            error: styles.ToastError,
            success: styles.ToastSuccess,
            warning: styles.ToastWarning,
            info: styles.ToastInfo,
          },
          ...rest.toastOptions,
        }}
      />
    );
  }
);
ToastProvider.displayName = "Toast.Provider";

/**
 * Toast Functions
 *
 * 토스트를 트리거하는 함수들입니다.
 */

/**
 * 기본 토스트 표시
 * @param message - 표시할 메시지
 * @param options - 토스트 옵션
 */
function show(message: string | React.ReactNode, options?: ExternalToast) {
  return sonnerToast(message, options);
}

/**
 * 성공 토스트 표시
 * @param message - 표시할 메시지
 * @param options - 토스트 옵션
 */
function success(message: string | React.ReactNode, options?: ExternalToast) {
  return sonnerToast.success(message, options);
}

/**
 * 에러 토스트 표시
 * @param message - 표시할 메시지
 * @param options - 토스트 옵션
 */
function error(message: string | React.ReactNode, options?: ExternalToast) {
  return sonnerToast.error(message, options);
}

/**
 * 정보 토스트 표시
 * @param message - 표시할 메시지
 * @param options - 토스트 옵션
 */
function info(message: string | React.ReactNode, options?: ExternalToast) {
  return sonnerToast.info(message, options);
}

/**
 * 경고 토스트 표시
 * @param message - 표시할 메시지
 * @param options - 토스트 옵션
 */
function warning(message: string | React.ReactNode, options?: ExternalToast) {
  return sonnerToast.warning(message, options);
}

/**
 * 로딩 토스트 표시
 * @param message - 표시할 메시지
 * @param options - 토스트 옵션
 */
function loading(message: string | React.ReactNode, options?: ExternalToast) {
  return sonnerToast.loading(message, options);
}

/**
 * Promise 토스트 표시
 * Promise의 상태에 따라 자동으로 토스트를 업데이트합니다.
 *
 * @param promise - 추적할 Promise
 * @param options - 각 상태별 메시지
 *
 * @example
 * ```tsx
 * toast.promise(fetchData(), {
 *   loading: '데이터 로딩 중...',
 *   success: '데이터 로드 완료',
 *   error: '데이터 로드 실패'
 * });
 * ```
 */
function promise<T>(
  promise: Promise<T>,
  options: {
    loading: string | React.ReactNode;
    success: string | React.ReactNode | ((data: T) => string | React.ReactNode);
    error: string | React.ReactNode | ((error: Error) => string | React.ReactNode);
  }
) {
  return sonnerToast.promise(promise, options);
}

/**
 * 커스텀 토스트 표시
 * @param jsx - 렌더링할 커스텀 컴포넌트
 * @param options - 토스트 옵션
 */
function custom(jsx: (id: number | string) => React.ReactElement, options?: ExternalToast) {
  return sonnerToast.custom(jsx, options);
}

/**
 * 토스트 닫기
 * @param toastId - 닫을 토스트의 ID (생략 시 모든 토스트 닫기)
 */
function dismiss(toastId?: number | string) {
  return sonnerToast.dismiss(toastId);
}

/**
 * Toast 컴포넌트 및 함수
 */
export const Toast = {
  Provider: ToastProvider,
  show,
  success,
  error,
  info,
  warning,
  loading,
  promise,
  custom,
  dismiss,
};

/**
 * 편의를 위한 개별 export
 */
export const toast = {
  show,
  success,
  error,
  info,
  warning,
  loading,
  promise,
  custom,
  dismiss,
};

/**
 * Type exports
 */
export type { ExternalToast as ToastOptions };
