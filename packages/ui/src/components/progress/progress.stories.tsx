import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Progress 컴포넌트입니다.
 * 현재 진행 상태를 시각적으로 표시합니다.
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={50}>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </div>
  ),
};

/**
 * 레이블과 값을 포함한 완전한 Progress입니다.
 */
export const WithLabelAndValue: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={65}>
        <Progress.Label>Uploading file...</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
        <Progress.Value />
      </Progress.Root>
    </div>
  ),
};

/**
 * 불확정 상태의 Progress입니다.
 * value를 null로 설정하면 로딩 애니메이션이 표시됩니다.
 */
export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={null}>
        <Progress.Label>Loading...</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </div>
  ),
};

/**
 * 완료된 상태 (100%)의 Progress입니다.
 */
export const Complete: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={100}>
        <Progress.Label>Complete!</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
        <Progress.Value />
      </Progress.Root>
    </div>
  ),
};

/**
 * 사용자 정의 범위 (0-10)를 사용하는 Progress입니다.
 */
export const CustomRange: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={7} min={0} max={10}>
        <Progress.Label>Steps completed</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
        <Progress.Value />
      </Progress.Root>
    </div>
  ),
};

/**
 * 작은 크기의 Progress입니다.
 */
export const Small: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={40}>
        <Progress.Track data-size="sm">
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </div>
  ),
};

/**
 * 큰 크기의 Progress입니다.
 */
export const Large: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={40}>
        <Progress.Track data-size="lg">
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </div>
  ),
};

/**
 * 다양한 진행 단계를 보여주는 예제입니다.
 */
export const ProgressSteps: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <Progress.Root value={0}>
          <Progress.Label>Not started</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value />
        </Progress.Root>
      </div>

      <div>
        <Progress.Root value={25}>
          <Progress.Label>Getting started...</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value />
        </Progress.Root>
      </div>

      <div>
        <Progress.Root value={50}>
          <Progress.Label>Half way there</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value />
        </Progress.Root>
      </div>

      <div>
        <Progress.Root value={75}>
          <Progress.Label>Almost done</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value />
        </Progress.Root>
      </div>

      <div>
        <Progress.Root value={100}>
          <Progress.Label>Complete!</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value />
        </Progress.Root>
      </div>
    </div>
  ),
};

/**
 * 커스텀 스타일이 적용된 Progress입니다.
 */
export const CustomStyled: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={60}>
        <Progress.Label
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#8b5cf6",
          }}
        >
          Custom styled progress
        </Progress.Label>
        <Progress.Track
          style={{
            height: "16px",
            backgroundColor: "#f3e8ff",
            borderRadius: "8px",
          }}
        >
          <Progress.Indicator
            style={{
              backgroundColor: "#8b5cf6",
              borderRadius: "8px",
            }}
          />
        </Progress.Track>
        <Progress.Value
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#8b5cf6",
          }}
        />
      </Progress.Root>
    </div>
  ),
};

/**
 * 레이블 없이 간단하게 사용하는 Progress입니다.
 */
export const Minimal: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Progress.Root value={80}>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </div>
  ),
};
