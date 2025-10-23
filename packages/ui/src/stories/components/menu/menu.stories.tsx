import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "../../../components/menu/menu";
import * as React from "react";

const meta: Meta<typeof Menu.Root> = {
  title: "Components/Menu",
  component: Menu.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu.Root>;

export const Default: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Open Menu
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Item>New File</Menu.Item>
            <Menu.Item>New Window</Menu.Item>
            <Menu.Item>Open...</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Save</Menu.Item>
            <Menu.Item>Save As...</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger
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
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="top" sideOffset={8}>
          <Menu.Popup>
            <Menu.Item>Cut</Menu.Item>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Paste</Menu.Item>
            <Menu.Arrow />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#8b5cf6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Grouped Menu
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Group>
              <Menu.GroupLabel>Edit</Menu.GroupLabel>
              <Menu.Item>Undo</Menu.Item>
              <Menu.Item>Redo</Menu.Item>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Group>
              <Menu.GroupLabel>Transform</Menu.GroupLabel>
              <Menu.Item>Uppercase</Menu.Item>
              <Menu.Item>Lowercase</Menu.Item>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

export const WithRadioItems: Story = {
  render: function RadioExample() {
    const [textAlign, setTextAlign] = React.useState("left");

    return (
      <Menu.Root>
        <Menu.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Text Align: {textAlign}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup>
              <Menu.RadioGroup value={textAlign} onValueChange={setTextAlign}>
                <Menu.RadioItem value="left">
                  <Menu.RadioItemIndicator />
                  Align Left
                </Menu.RadioItem>
                <Menu.RadioItem value="center">
                  <Menu.RadioItemIndicator />
                  Align Center
                </Menu.RadioItem>
                <Menu.RadioItem value="right">
                  <Menu.RadioItemIndicator />
                  Align Right
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  },
};

export const WithCheckboxItems: Story = {
  render: function CheckboxExample() {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(true);

    return (
      <Menu.Root>
        <Menu.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#06b6d4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View Options
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup>
              <Menu.CheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                <Menu.CheckboxItemIndicator />
                Status Bar
              </Menu.CheckboxItem>
              <Menu.CheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
                <Menu.CheckboxItemIndicator />
                Activity Bar
              </Menu.CheckboxItem>
              <Menu.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                <Menu.CheckboxItemIndicator />
                Panel
              </Menu.CheckboxItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#ec4899",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        File Menu
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Item>New File</Menu.Item>
            <Menu.Item>Open File</Menu.Item>
            <Menu.Separator />
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger>Open Recent</Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner sideOffset={4} alignOffset={-4}>
                  <Menu.Popup>
                    <Menu.Item>project1.txt</Menu.Item>
                    <Menu.Item>project2.txt</Menu.Item>
                    <Menu.Item>project3.txt</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item>Clear History</Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>
            <Menu.Separator />
            <Menu.Item>Save</Menu.Item>
            <Menu.Item>Exit</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
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
      <Menu.Root>
        <Menu.Trigger style={{ padding: "8px 16px" }}>Top</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner side="top" sideOffset={8}>
            <Menu.Popup>
              <Menu.Item>Option 1</Menu.Item>
              <Menu.Item>Option 2</Menu.Item>
              <Menu.Arrow />
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <div style={{ display: "flex", gap: "60px" }}>
        {/* Left */}
        <Menu.Root>
          <Menu.Trigger style={{ padding: "8px 16px" }}>Left</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner side="left" sideOffset={8}>
              <Menu.Popup>
                <Menu.Item>Option 1</Menu.Item>
                <Menu.Item>Option 2</Menu.Item>
                <Menu.Arrow />
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        {/* Right */}
        <Menu.Root>
          <Menu.Trigger style={{ padding: "8px 16px" }}>Right</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner side="right" sideOffset={8}>
              <Menu.Popup>
                <Menu.Item>Option 1</Menu.Item>
                <Menu.Item>Option 2</Menu.Item>
                <Menu.Arrow />
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>

      {/* Bottom */}
      <Menu.Root>
        <Menu.Trigger style={{ padding: "8px 16px" }}>Bottom</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner side="bottom" sideOffset={8}>
            <Menu.Popup>
              <Menu.Item>Option 1</Menu.Item>
              <Menu.Item>Option 2</Menu.Item>
              <Menu.Arrow />
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  ),
};

export const WithBackdrop: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        With Backdrop
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Backdrop />
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Item>Action 1</Menu.Item>
            <Menu.Item>Action 2</Menu.Item>
            <Menu.Item>Action 3</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setOpen(true)}>Show Menu</button>
          <button onClick={() => setOpen(false)}>Hide Menu</button>
        </div>

        <Menu.Root open={open} onOpenChange={setOpen}>
          <Menu.Trigger style={{ padding: "8px 16px" }}>Controlled Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={8}>
              <Menu.Popup>
                <Menu.Item>Option 1</Menu.Item>
                <Menu.Item>Option 2</Menu.Item>
                <Menu.Item>Option 3</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        <div style={{ fontSize: "14px", color: "#666" }}>
          Menu is: <strong>{open ? "Open" : "Closed"}</strong>
        </div>
      </div>
    );
  },
};

export const ComplexMenu: Story = {
  render: function ComplexExample() {
    const [fontSize, setFontSize] = React.useState("medium");
    const [showLineNumbers, setShowLineNumbers] = React.useState(true);
    const [showMinimap, setShowMinimap] = React.useState(false);
    const [wordWrap, setWordWrap] = React.useState(true);

    return (
      <Menu.Root>
        <Menu.Trigger
          style={{
            padding: "8px 16px",
            backgroundColor: "#14b8a6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Editor Settings
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup>
              <Menu.Group>
                <Menu.GroupLabel>Appearance</Menu.GroupLabel>
                <Menu.RadioGroup value={fontSize} onValueChange={setFontSize}>
                  <Menu.RadioItem value="small">
                    <Menu.RadioItemIndicator />
                    Small
                  </Menu.RadioItem>
                  <Menu.RadioItem value="medium">
                    <Menu.RadioItemIndicator />
                    Medium
                  </Menu.RadioItem>
                  <Menu.RadioItem value="large">
                    <Menu.RadioItemIndicator />
                    Large
                  </Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Group>

              <Menu.Separator />

              <Menu.Group>
                <Menu.GroupLabel>View</Menu.GroupLabel>
                <Menu.CheckboxItem checked={showLineNumbers} onCheckedChange={setShowLineNumbers}>
                  <Menu.CheckboxItemIndicator />
                  Show Line Numbers
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
                  <Menu.CheckboxItemIndicator />
                  Show Minimap
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
                  <Menu.CheckboxItemIndicator />
                  Word Wrap
                </Menu.CheckboxItem>
              </Menu.Group>

              <Menu.Separator />

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger>Advanced</Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner sideOffset={4} alignOffset={-4}>
                    <Menu.Popup>
                      <Menu.Item>Auto Save</Menu.Item>
                      <Menu.Item>Format on Save</Menu.Item>
                      <Menu.Item>Trim Whitespace</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator />

              <Menu.Item>Reset to Defaults</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger
        style={{
          padding: "8px 16px",
          backgroundColor: "#64748b",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Actions
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Item>New</Menu.Item>
            <Menu.Item>Open</Menu.Item>
            <Menu.Separator />
            <Menu.Item disabled>Save (unavailable)</Menu.Item>
            <Menu.Item disabled>Export (unavailable)</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Close</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

export const ContextMenuStyle: Story = {
  render: function ContextMenuExample() {
    const [contextMenuOpen, setContextMenuOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setContextMenuOpen(true);
    };

    return (
      <div
        style={{
          width: "400px",
          height: "300px",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          border: "2px dashed #9ca3af",
          cursor: "context-menu",
        }}
        onContextMenu={handleContextMenu}
      >
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Right-click here</p>

        <Menu.Root open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
          <Menu.Portal>
            <Menu.Backdrop />
            <Menu.Positioner
              side="bottom"
              align="start"
              style={{
                position: "fixed",
                left: position.x,
                top: position.y,
              }}
            >
              <Menu.Popup>
                <Menu.Item>Cut</Menu.Item>
                <Menu.Item>Copy</Menu.Item>
                <Menu.Item>Paste</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Delete</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Properties</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    );
  },
};
