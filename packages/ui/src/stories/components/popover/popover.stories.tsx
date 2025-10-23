import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "../../../components/popover/popover";
import * as React from "react";

const meta: Meta<typeof Popover.Root> = {
  title: "Components/Popover",
  component: Popover.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Open Popover
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              This is a popover with a title and description. Click outside or press Escape to
              close.
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        With Arrow
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" sideOffset={8}>
          <Popover.Popup>
            <Popover.Title>Popover with Arrow</Popover.Title>
            <Popover.Description>
              This popover includes an arrow pointing to the trigger button.
            </Popover.Description>
            <Popover.Arrow />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
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
      {/* Top */}
      <Popover.Root>
        <Popover.Trigger style={{ padding: "8px 16px" }}>Top</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner side="top" sideOffset={8}>
            <Popover.Popup>
              <Popover.Title>Top Position</Popover.Title>
              <Popover.Description>Popover positioned on top</Popover.Description>
              <Popover.Arrow />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      <div style={{ display: "flex", gap: "60px" }}>
        {/* Left */}
        <Popover.Root>
          <Popover.Trigger style={{ padding: "8px 16px" }}>Left</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner side="left" sideOffset={8}>
              <Popover.Popup>
                <Popover.Title>Left Position</Popover.Title>
                <Popover.Description>Popover positioned on left</Popover.Description>
                <Popover.Arrow />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>

        {/* Right */}
        <Popover.Root>
          <Popover.Trigger style={{ padding: "8px 16px" }}>Right</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner side="right" sideOffset={8}>
              <Popover.Popup>
                <Popover.Title>Right Position</Popover.Title>
                <Popover.Description>Popover positioned on right</Popover.Description>
                <Popover.Arrow />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* Bottom */}
      <Popover.Root>
        <Popover.Trigger style={{ padding: "8px 16px" }}>Bottom</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner side="bottom" sideOffset={8}>
            <Popover.Popup>
              <Popover.Title>Bottom Position</Popover.Title>
              <Popover.Description>Popover positioned on bottom</Popover.Description>
              <Popover.Arrow />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  ),
};

export const WithBackdrop: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#8b5cf6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        With Backdrop
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Backdrop />
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup>
            <Popover.Title>Popover with Backdrop</Popover.Title>
            <Popover.Description>
              Click the backdrop to close this popover.
            </Popover.Description>
            <Popover.Close
              style={{
                marginTop: "12px",
                padding: "6px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setOpen(true)}>Show Popover</button>
          <button onClick={() => setOpen(false)}>Hide Popover</button>
        </div>

        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger style={{ padding: "8px 16px" }}>
            Controlled Trigger
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup>
                <Popover.Title>Controlled Popover</Popover.Title>
                <Popover.Description>
                  This popover's state is controlled externally.
                </Popover.Description>
                <Popover.Arrow />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>

        <div style={{ fontSize: "14px", color: "#666" }}>
          Popover is: <strong>{open ? "Open" : "Closed"}</strong>
        </div>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: function FormExample() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Email submitted:", email);
      setOpen(false);
      setEmail("");
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#0ea5e9",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Subscribe
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup>
              <Popover.Title>Subscribe to Newsletter</Popover.Title>
              <Popover.Description>
                Enter your email to receive updates.
              </Popover.Description>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  },
};

export const InfoPopover: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", fontSize: "16px", alignItems: "center" }}>
      <span>Need help?</span>
      <Popover.Root>
        <Popover.Trigger
          style={{
            background: "none",
            border: "none",
            cursor: "help",
            fontSize: "20px",
            padding: "4px",
          }}
        >
          ℹ️
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup style={{ maxWidth: "250px" }}>
              <Popover.Title>Information</Popover.Title>
              <Popover.Description>
                Click here to learn more about this feature and how to use it effectively.
              </Popover.Description>
              <Popover.Arrow />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  ),
};

export const ConfirmationPopover: Story = {
  render: function ConfirmationExample() {
    const [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
      console.log("Action confirmed!");
      setOpen(false);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete Item
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Backdrop />
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup>
              <Popover.Title>Confirm Deletion</Popover.Title>
              <Popover.Description>
                Are you sure you want to delete this item? This action cannot be undone.
              </Popover.Description>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Custom Styled
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup
            style={{
              backgroundColor: "#f59e0b",
              color: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "none",
            }}
          >
            <Popover.Title style={{ color: "white", marginBottom: "0.5rem" }}>
              Custom Popover
            </Popover.Title>
            <Popover.Description style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              This popover has custom styling applied to match your design system.
            </Popover.Description>
            <Popover.Arrow style={{ fill: "#f59e0b" }} />
            <Popover.Close
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "white",
                color: "#f59e0b",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Got it
            </Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        View Details
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup style={{ maxWidth: "350px" }}>
            <Popover.Title>Product Information</Popover.Title>
            <Popover.Description>
              Detailed description of the product features and specifications.
            </Popover.Description>
            <div style={{ marginTop: "1rem", maxHeight: "200px", overflowY: "auto" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.5rem" }}>
                Features:
              </h4>
              <ul style={{ paddingLeft: "1.5rem", margin: "0.5rem 0" }}>
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Easy to use interface</li>
                <li>Compatible with all devices</li>
                <li>1-year warranty included</li>
              </ul>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Specifications:
              </h4>
              <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                Dimensions: 10 x 5 x 3 inches
                <br />
                Weight: 2.5 lbs
                <br />
                Color: Multiple options available
                <br />
                Material: Premium grade aluminum
              </p>
            </div>
            <Popover.Close
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                width: "100%",
                backgroundColor: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  ),
};
