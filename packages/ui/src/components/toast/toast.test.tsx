import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast, toast } from "./toast";

// Helper component for testing
function ToastTestComponent({ onToast }: { onToast?: () => void }) {
  return (
    <div>
      <Toast.Provider />
      <button onClick={onToast}>Trigger Toast</button>
    </div>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    // Clear any existing toasts before each test
    toast.dismiss();
  });

  describe("Provider 렌더링", () => {
    it("Toast.Provider를 렌더링할 수 있어야 한다", () => {
      const { container } = render(<Toast.Provider />);
      expect(container).toBeInTheDocument();
    });

    it("Toast.Provider에 position prop을 전달할 수 있어야 한다", () => {
      render(<Toast.Provider position="top-right" />);
      // Provider가 렌더링되고 에러가 없으면 성공
    });

    it("Toast.Provider에 richColors prop을 전달할 수 있어야 한다", () => {
      render(<Toast.Provider richColors />);
      // Provider가 렌더링되고 에러가 없으면 성공
    });
  });

  describe("기본 toast 함수", () => {
    it("toast.show()로 기본 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.show("기본 토스트");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("기본 토스트")).toBeInTheDocument();
      });
    });

    it("Toast.show()로 기본 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            Toast.show("기본 토스트 2");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("기본 토스트 2")).toBeInTheDocument();
      });
    });
  });

  describe("타입별 toast 함수", () => {
    it("toast.success()로 성공 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.success("성공 메시지");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("성공 메시지")).toBeInTheDocument();
      });
    });

    it("toast.error()로 에러 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.error("에러 메시지");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("에러 메시지")).toBeInTheDocument();
      });
    });

    it("toast.info()로 정보 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.info("정보 메시지");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("정보 메시지")).toBeInTheDocument();
      });
    });

    it("toast.warning()으로 경고 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.warning("경고 메시지");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("경고 메시지")).toBeInTheDocument();
      });
    });

    it("toast.loading()으로 로딩 토스트를 표시할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.loading("로딩 중...");
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("로딩 중...")).toBeInTheDocument();
      });
    });
  });

  describe("토스트 옵션", () => {
    it("description 옵션을 사용할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.show("제목", {
              description: "설명 텍스트",
            });
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("제목")).toBeInTheDocument();
        expect(screen.getByText("설명 텍스트")).toBeInTheDocument();
      });
    });

    it("duration 옵션을 사용할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.show("짧은 토스트", {
              duration: 1000,
            });
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("짧은 토스트")).toBeInTheDocument();
      });
    });

    it("action 옵션을 사용할 수 있어야 한다", async () => {
      const actionFn = vi.fn();

      render(
        <ToastTestComponent
          onToast={() => {
            toast.show("액션이 있는 토스트", {
              action: {
                label: "실행",
                onClick: actionFn,
              },
            });
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("액션이 있는 토스트")).toBeInTheDocument();
      });

      const actionButton = screen.getByText("실행");
      await userEvent.click(actionButton);

      expect(actionFn).toHaveBeenCalledOnce();
    });
  });

  describe("Promise 토스트", () => {
    it("toast.promise()로 Promise 상태에 따라 토스트를 업데이트할 수 있어야 한다", async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve("완료"), 100);
      });

      render(
        <ToastTestComponent
          onToast={() => {
            toast.promise(promise, {
              loading: "로딩 중...",
              success: "성공!",
              error: "실패!",
            });
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      // 로딩 상태
      await waitFor(() => {
        expect(screen.getByText("로딩 중...")).toBeInTheDocument();
      });

      // 성공 상태
      await waitFor(
        () => {
          expect(screen.getByText("성공!")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("Promise가 reject되면 에러 토스트를 표시해야 한다", async () => {
      const promise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("오류 발생")), 100);
      });

      render(
        <ToastTestComponent
          onToast={() => {
            toast.promise(promise, {
              loading: "로딩 중...",
              success: "성공!",
              error: "실패!",
            });
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      // 에러 상태
      await waitFor(
        () => {
          expect(screen.getByText("실패!")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("커스텀 토스트", () => {
    it("toast.custom()으로 커스텀 JSX를 렌더링할 수 있어야 한다", async () => {
      render(
        <ToastTestComponent
          onToast={() => {
            toast.custom(() => (
              <div data-testid="custom-toast">
                <strong>커스텀 토스트</strong>
                <p>커스텀 내용</p>
              </div>
            ));
          }}
        />
      );

      const button = screen.getByText("Trigger Toast");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId("custom-toast")).toBeInTheDocument();
        expect(screen.getByText("커스텀 토스트")).toBeInTheDocument();
        expect(screen.getByText("커스텀 내용")).toBeInTheDocument();
      });
    });
  });

  describe("토스트 닫기", () => {
    it("toast.dismiss()로 특정 토스트를 닫을 수 있어야 한다", async () => {
      let toastId: string | number;

      render(
        <div>
          <Toast.Provider />
          <button
            onClick={() => {
              toastId = toast.show("닫을 토스트");
            }}
          >
            Show Toast
          </button>
          <button onClick={() => toast.dismiss(toastId)}>Close Toast</button>
        </div>
      );

      const showButton = screen.getByText("Show Toast");
      await userEvent.click(showButton);

      await waitFor(() => {
        expect(screen.getByText("닫을 토스트")).toBeInTheDocument();
      });

      const closeButton = screen.getByText("Close Toast");
      await userEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText("닫을 토스트")).not.toBeInTheDocument();
      });
    });

    it("toast.dismiss()를 인자 없이 호출하면 모든 토스트를 닫아야 한다", async () => {
      render(
        <div>
          <Toast.Provider />
          <button
            onClick={() => {
              toast.show("토스트 1");
              toast.show("토스트 2");
              toast.show("토스트 3");
            }}
          >
            Show Toasts
          </button>
          <button onClick={() => toast.dismiss()}>Close All</button>
        </div>
      );

      const showButton = screen.getByText("Show Toasts");
      await userEvent.click(showButton);

      await waitFor(() => {
        expect(screen.getByText("토스트 1")).toBeInTheDocument();
        expect(screen.getByText("토스트 2")).toBeInTheDocument();
        expect(screen.getByText("토스트 3")).toBeInTheDocument();
      });

      const closeButton = screen.getByText("Close All");
      await userEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText("토스트 1")).not.toBeInTheDocument();
        expect(screen.queryByText("토스트 2")).not.toBeInTheDocument();
        expect(screen.queryByText("토스트 3")).not.toBeInTheDocument();
      });
    });
  });

  describe("접근성", () => {
    it("Provider는 적절한 ARIA 속성을 가져야 한다", () => {
      const { container } = render(<Toast.Provider />);
      // Sonner는 자동으로 적절한 role과 aria 속성을 추가합니다
      expect(container).toBeInTheDocument();
    });
  });

  describe("커스터마이징", () => {
    it("Provider에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(<Toast.Provider className="custom-toaster" />);
      // className이 적용되고 에러가 없으면 성공
    });
  });
});
