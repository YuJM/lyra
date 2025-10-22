import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Tooltip",
  component: Tooltip.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 툴팁 예시입니다.
 * 텍스트 위에 마우스를 올리면 툴팁이 표시됩니다.
 */
export const Default: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>This is a tooltip</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

/**
 * 화살표가 있는 툴팁입니다.
 */
export const WithArrow: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>Hover for tooltip with arrow</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              This tooltip has an arrow
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

/**
 * 긴 내용이 있는 툴팁입니다.
 * 툴팁은 자동으로 줄바꿈되며 최대 너비가 제한됩니다.
 */
export const LongContent: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>Hover for long content</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              This is a tooltip with much longer content that will wrap to
              multiple lines. The tooltip has a maximum width and will
              automatically break long words if needed.
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

/**
 * 다양한 위치에 표시되는 툴팁입니다.
 */
export const Positioning: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Top (default)</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="top">
              <Tooltip.Popup>
                Tooltip on top
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Bottom</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="bottom">
              <Tooltip.Popup>
                Tooltip on bottom
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Left</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="left">
              <Tooltip.Popup>
                Tooltip on left
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Right</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="right">
              <Tooltip.Popup>
                Tooltip on right
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  ),
};

/**
 * 제어 모드 툴팁입니다.
 * open 상태를 직접 제어할 수 있습니다.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button onClick={() => setOpen(!open)}>
          Toggle Tooltip (Currently: {open ? "Open" : "Closed"})
        </button>

        <Tooltip.Provider>
          <Tooltip.Root open={open} onOpenChange={setOpen}>
            <Tooltip.Trigger>Controlled tooltip trigger</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>
                  This tooltip is controlled by external state
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    );
  },
};

/**
 * 딜레이가 설정된 툴팁입니다.
 */
export const WithDelay: Story = {
  render: () => (
    <Tooltip.Provider delay={500}>
      <Tooltip.Root>
        <Tooltip.Trigger>Hover me (500ms delay)</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              This tooltip appears after 500ms
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

/**
 * 커스텀 스타일이 적용된 툴팁입니다.
 */
export const CustomStyle: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Custom styled trigger
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup
              style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              Custom styled tooltip
              <Tooltip.Arrow
                style={{
                  backgroundColor: "#8b5cf6",
                }}
              />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

/**
 * 여러 개의 툴팁이 있는 예시입니다.
 */
export const Multiple: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <Tooltip.Root>
          <Tooltip.Trigger>First tooltip</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>
                This is the first tooltip
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>Second tooltip</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>
                This is the second tooltip
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>Third tooltip</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>
                This is the third tooltip
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};
