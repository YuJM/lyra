import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../../../components/tooltip/tooltip";
import * as React from "react";

const meta: Meta<typeof Tooltip.Root> = {
  title: "Components/Tooltip",
  component: Tooltip.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip.Root>;

export const Default: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "help",
          }}
        >
          Hover me
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup>
              This is a tooltip with helpful information
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "help",
          }}
        >
          Hover for tooltip with arrow
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={8}>
            <Tooltip.Popup>
              Tooltip content with arrow indicator
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}
    >
      <Tooltip.Provider>
        {/* Top */}
        <Tooltip.Root>
          <Tooltip.Trigger style={{ padding: "8px 16px" }}>Top</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="top" sideOffset={8}>
              <Tooltip.Popup>
                Tooltip on top
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <div style={{ display: "flex", gap: "60px" }}>
          {/* Left */}
          <Tooltip.Root>
            <Tooltip.Trigger style={{ padding: "8px 16px" }}>Left</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner side="left" sideOffset={8}>
                <Tooltip.Popup>
                  Tooltip on left
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>

          {/* Right */}
          <Tooltip.Root>
            <Tooltip.Trigger style={{ padding: "8px 16px" }}>Right</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner side="right" sideOffset={8}>
                <Tooltip.Popup>
                  Tooltip on right
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>

        {/* Bottom */}
        <Tooltip.Root>
          <Tooltip.Trigger style={{ padding: "8px 16px" }}>Bottom</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="bottom" sideOffset={8}>
              <Tooltip.Popup>
                Tooltip on bottom
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Tooltip.Provider delay={0}>
        <Tooltip.Root>
          <Tooltip.Trigger style={{ padding: "8px 16px" }}>No Delay</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>Appears immediately</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Tooltip.Provider delay={500}>
        <Tooltip.Root>
          <Tooltip.Trigger style={{ padding: "8px 16px" }}>500ms Delay</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>Appears after 500ms</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Tooltip.Provider delay={1000}>
        <Tooltip.Root>
          <Tooltip.Trigger style={{ padding: "8px 16px" }}>1s Delay</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>Appears after 1 second</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setOpen(true)}>Show Tooltip</button>
          <button onClick={() => setOpen(false)}>Hide Tooltip</button>
        </div>

        <Tooltip.Provider>
          <Tooltip.Root open={open} onOpenChange={setOpen}>
            <Tooltip.Trigger style={{ padding: "8px 16px" }}>
              Controlled Tooltip Trigger
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup>
                  This tooltip is controlled externally
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <div style={{ fontSize: "14px", color: "#666" }}>
          Tooltip is: <strong>{open ? "Open" : "Closed"}</strong>
        </div>
      </div>
    );
  },
};

export const MultipleTooltips: Story = {
  render: () => (
    <Tooltip.Provider delay={0}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Tooltip.Root>
          <Tooltip.Trigger
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Button 1
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>
                Information about Button 1
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            style={{
              padding: "8px 16px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Button 2
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>
                Information about Button 2
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            style={{
              padding: "8px 16px",
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Button 3
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>
                Information about Button 3
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger style={{ padding: "8px 16px" }}>Hover for details</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup>
              <div style={{ maxWidth: "250px" }}>
                <strong>Important Information:</strong>
                <br />
                This tooltip contains longer content that wraps to multiple lines. It provides
                detailed information about the element you're hovering over.
              </div>
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{ display: "flex", gap: "1rem", fontSize: "24px" }}>
        <Tooltip.Root>
          <Tooltip.Trigger
            style={{
              background: "none",
              border: "none",
              cursor: "help",
              fontSize: "inherit",
            }}
          >
            ℹ️
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>
                Information icon tooltip
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            style={{
              background: "none",
              border: "none",
              cursor: "help",
              fontSize: "inherit",
            }}
          >
            ❓
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>
                Help icon tooltip
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            style={{
              background: "none",
              border: "none",
              cursor: "help",
              fontSize: "inherit",
            }}
          >
            ⚙️
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>
                Settings icon tooltip
                <Tooltip.Arrow />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "help",
          }}
        >
          Custom Styled
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup
              style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Custom styled tooltip with different colors
              <Tooltip.Arrow style={{ fill: "#8b5cf6" }} />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <Tooltip.Provider>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Tooltip.Root>
          <Tooltip.Trigger style={{ padding: "8px 16px" }}>Enabled</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>This tooltip is enabled</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root open={false}>
          <Tooltip.Trigger
            style={{
              padding: "8px 16px",
              opacity: 0.5,
              cursor: "not-allowed",
            }}
          >
            Disabled
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={8}>
              <Tooltip.Popup>This won't show</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};
