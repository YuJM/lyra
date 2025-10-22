import type { Meta, StoryObj } from "@storybook/react";
import { Toast, toast } from "./toast";

const meta = {
  title: "Components/Toast",
  component: Toast.Provider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <Toast.Provider />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast.Provider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Toast 컴포넌트입니다.
 * 버튼을 클릭하면 간단한 알림 메시지가 표시됩니다.
 */
export const Default: Story = {
  render: () => (
    <button
      onClick={() => toast.show("기본 토스트 알림")}
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      토스트 표시
    </button>
  ),
};

/**
 * 타입별 Toast입니다.
 * Success, Error, Info, Warning 타입을 지원합니다.
 */
export const Types: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <button
        onClick={() => toast.success("성공적으로 저장되었습니다")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #10b981",
          backgroundColor: "#f0fdf4",
          color: "#10b981",
          cursor: "pointer",
        }}
      >
        Success
      </button>

      <button
        onClick={() => toast.error("오류가 발생했습니다")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #ef4444",
          backgroundColor: "#fef2f2",
          color: "#ef4444",
          cursor: "pointer",
        }}
      >
        Error
      </button>

      <button
        onClick={() => toast.info("새로운 정보가 있습니다")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #3b82f6",
          backgroundColor: "#eff6ff",
          color: "#3b82f6",
          cursor: "pointer",
        }}
      >
        Info
      </button>

      <button
        onClick={() => toast.warning("주의가 필요합니다")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #f59e0b",
          backgroundColor: "#fffbeb",
          color: "#f59e0b",
          cursor: "pointer",
        }}
      >
        Warning
      </button>
    </div>
  ),
};

/**
 * 제목과 설명이 있는 Toast입니다.
 */
export const WithDescription: Story = {
  render: () => (
    <button
      onClick={() =>
        toast.success("작업 완료", {
          description: "모든 변경 사항이 성공적으로 저장되었습니다.",
        })
      }
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      설명이 있는 토스트
    </button>
  ),
};

/**
 * 액션 버튼이 있는 Toast입니다.
 */
export const WithAction: Story = {
  render: () => (
    <button
      onClick={() =>
        toast.show("새로운 업데이트가 있습니다", {
          action: {
            label: "업데이트",
            onClick: () => console.log("업데이트 실행"),
          },
        })
      }
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      액션이 있는 토스트
    </button>
  ),
};

/**
 * 취소 버튼이 있는 Toast입니다.
 */
export const WithCancel: Story = {
  render: () => (
    <button
      onClick={() =>
        toast.show("파일을 삭제하시겠습니까?", {
          cancel: {
            label: "취소",
            onClick: () => console.log("취소됨"),
          },
          action: {
            label: "삭제",
            onClick: () => console.log("삭제됨"),
          },
        })
      }
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      취소 버튼이 있는 토스트
    </button>
  ),
};

/**
 * 로딩 Toast입니다.
 */
export const Loading: Story = {
  render: () => (
    <button
      onClick={() => toast.loading("데이터를 불러오는 중...")}
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      로딩 토스트
    </button>
  ),
};

/**
 * Promise Toast입니다.
 * Promise의 상태에 따라 자동으로 토스트가 업데이트됩니다.
 */
export const Promise: Story = {
  render: () => (
    <button
      onClick={() => {
        const promise = new Promise((resolve) => {
          setTimeout(() => resolve({ name: "데이터" }), 2000);
        });

        toast.promise(promise, {
          loading: "데이터 로딩 중...",
          success: (data: any) => `${data.name}가 로드되었습니다`,
          error: "데이터 로드에 실패했습니다",
        });
      }}
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      Promise 토스트
    </button>
  ),
};

/**
 * 커스텀 Duration을 가진 Toast입니다.
 */
export const CustomDuration: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <button
        onClick={() =>
          toast.show("3초 후 사라집니다", {
            duration: 3000,
          })
        }
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
      >
        3초
      </button>

      <button
        onClick={() =>
          toast.show("5초 후 사라집니다", {
            duration: 5000,
          })
        }
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
      >
        5초
      </button>

      <button
        onClick={() =>
          toast.show("자동으로 사라지지 않습니다", {
            duration: Infinity,
          })
        }
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
      >
        무한
      </button>
    </div>
  ),
};

/**
 * 위치를 설정할 수 있는 Toast입니다.
 */
export const Position: Story = {
  render: () => (
    <div>
      <div style={{ marginBottom: "16px", padding: "16px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
        <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#6b7280" }}>
          Provider의 position prop으로 위치를 설정할 수 있습니다.
        </p>
        <code style={{ fontSize: "12px", color: "#111827" }}>
          {'<Toast.Provider position="top-right" />'}
        </code>
      </div>

      <button
        onClick={() => toast.show("토스트가 표시됩니다")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
      >
        토스트 표시
      </button>
    </div>
  ),
};

/**
 * 커스텀 JSX를 렌더링하는 Toast입니다.
 */
export const Custom: Story = {
  render: () => (
    <button
      onClick={() =>
        toast.custom(() => (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#8b5cf6",
              color: "white",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "24px" }}>🎉</span>
            <div>
              <div style={{ fontWeight: "600" }}>축하합니다!</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                커스텀 토스트입니다
              </div>
            </div>
          </div>
        ))
      }
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
    >
      커스텀 토스트
    </button>
  ),
};

/**
 * 여러 Toast를 동시에 표시합니다.
 */
export const Multiple: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <button
        onClick={() => {
          toast.success("첫 번째 토스트");
          toast.info("두 번째 토스트");
          toast.warning("세 번째 토스트");
        }}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
      >
        여러 토스트 표시
      </button>

      <button
        onClick={() => toast.dismiss()}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #ef4444",
          backgroundColor: "#fef2f2",
          color: "#ef4444",
          cursor: "pointer",
        }}
      >
        모든 토스트 닫기
      </button>
    </div>
  ),
};

/**
 * Rich Colors 옵션을 활성화한 Toast입니다.
 */
export const RichColors: Story = {
  decorators: [
    (Story) => (
      <div>
        <Toast.Provider richColors />
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <button
        onClick={() => toast.success("Rich colors 성공")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #10b981",
          backgroundColor: "#f0fdf4",
          color: "#10b981",
          cursor: "pointer",
        }}
      >
        Success
      </button>

      <button
        onClick={() => toast.error("Rich colors 에러")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #ef4444",
          backgroundColor: "#fef2f2",
          color: "#ef4444",
          cursor: "pointer",
        }}
      >
        Error
      </button>

      <button
        onClick={() => toast.info("Rich colors 정보")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #3b82f6",
          backgroundColor: "#eff6ff",
          color: "#3b82f6",
          cursor: "pointer",
        }}
      >
        Info
      </button>

      <button
        onClick={() => toast.warning("Rich colors 경고")}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #f59e0b",
          backgroundColor: "#fffbeb",
          color: "#f59e0b",
          cursor: "pointer",
        }}
      >
        Warning
      </button>
    </div>
  ),
};
