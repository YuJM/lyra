import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "../../../components/collapsible/collapsible";
import * as React from "react";

const meta: Meta<typeof Collapsible.Root> = {
  title: "Components/Collapsible",
  component: Collapsible.Root,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible.Root>;

export const Default: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger>▶ Show more</Collapsible.Trigger>
      <Collapsible.Panel>
        <p>
          This is the collapsible content. It can contain any elements you want, including text,
          images, forms, or other components.
        </p>
        <p>Click the trigger button to collapse this content.</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger>▼ Hide details</Collapsible.Trigger>
      <Collapsible.Panel>
        <h4 style={{ marginTop: 0 }}>Additional Information</h4>
        <p>This collapsible starts in an open state by using the defaultOpen prop.</p>
        <p>Users can collapse it by clicking the trigger button.</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setOpen(true)}>Open</button>
          <button onClick={() => setOpen(false)}>Close</button>
          <button onClick={() => setOpen(!open)}>Toggle</button>
        </div>

        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger>
            {open ? "▼" : "▶"} Controlled Collapsible
          </Collapsible.Trigger>
          <Collapsible.Panel>
            <p>This collapsible is controlled by external state.</p>
            <p>Current state: {open ? "Open" : "Closed"}</p>
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible.Root disabled>
      <Collapsible.Trigger>▶ Disabled Collapsible</Collapsible.Trigger>
      <Collapsible.Panel>
        <p>This content cannot be revealed because the collapsible is disabled.</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger>▶ View code example</Collapsible.Trigger>
      <Collapsible.Panel>
        <pre
          style={{
            backgroundColor: "#f3f4f6",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a React component.</p>
    </div>
  );
}`}
        </pre>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const MultipleCollapsibles: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Collapsible.Root>
        <Collapsible.Trigger>▶ Section 1: Introduction</Collapsible.Trigger>
        <Collapsible.Panel>
          <h4 style={{ marginTop: 0 }}>Introduction</h4>
          <p>
            This is the first section of content. Multiple collapsibles can be used
            independently on the same page.
          </p>
        </Collapsible.Panel>
      </Collapsible.Root>

      <Collapsible.Root>
        <Collapsible.Trigger>▶ Section 2: Features</Collapsible.Trigger>
        <Collapsible.Panel>
          <h4 style={{ marginTop: 0 }}>Features</h4>
          <ul>
            <li>Smooth animations</li>
            <li>Keyboard accessible</li>
            <li>Fully customizable</li>
          </ul>
        </Collapsible.Panel>
      </Collapsible.Root>

      <Collapsible.Root>
        <Collapsible.Trigger>▶ Section 3: Usage</Collapsible.Trigger>
        <Collapsible.Panel>
          <h4 style={{ marginTop: 0 }}>Usage</h4>
          <p>Simply import the Collapsible component and use it in your application.</p>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h3>Frequently Asked Questions</h3>

      <Collapsible.Root>
        <Collapsible.Trigger>Q: What is a Collapsible component?</Collapsible.Trigger>
        <Collapsible.Panel>
          <p>
            <strong>A:</strong> A Collapsible component is a UI element that can be expanded to
            reveal hidden content and collapsed to hide it again.
          </p>
        </Collapsible.Panel>
      </Collapsible.Root>

      <Collapsible.Root>
        <Collapsible.Trigger>Q: How do I use it?</Collapsible.Trigger>
        <Collapsible.Panel>
          <p>
            <strong>A:</strong> Import the Collapsible component and wrap your content with
            Collapsible.Panel. Add a Collapsible.Trigger to control the visibility.
          </p>
        </Collapsible.Panel>
      </Collapsible.Root>

      <Collapsible.Root>
        <Collapsible.Trigger>Q: Can I customize the appearance?</Collapsible.Trigger>
        <Collapsible.Panel>
          <p>
            <strong>A:</strong> Yes! You can pass custom className props to both the Trigger and
            Panel components to apply your own styles.
          </p>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger
        style={{
          width: "100%",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "1rem",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ▼ Custom Styled Collapsible
      </Collapsible.Trigger>
      <Collapsible.Panel
        style={{
          backgroundColor: "#dbeafe",
          padding: "1.5rem",
          borderRadius: "0 0 8px 8px",
          border: "2px solid #3b82f6",
          borderTop: "none",
        }}
      >
        <h4 style={{ marginTop: 0, color: "#1e40af" }}>Custom Styling</h4>
        <p style={{ color: "#1e3a8a" }}>
          This collapsible demonstrates how you can apply custom styles using inline styles or
          className props.
        </p>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger>▶ Show advanced options</Collapsible.Trigger>
      <Collapsible.Panel>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
          <div>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "0.25rem" }}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
          <div>
            <label htmlFor="preferences" style={{ display: "block", marginBottom: "0.25rem" }}>
              <input id="preferences" type="checkbox" style={{ marginRight: "0.5rem" }} />
              Send me promotional emails
            </label>
          </div>
        </form>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};

export const NestedCollapsibles: Story = {
  render: () => (
    <Collapsible.Root>
      <Collapsible.Trigger>▶ Parent Collapsible</Collapsible.Trigger>
      <Collapsible.Panel>
        <p>This is the parent collapsible content.</p>

        <Collapsible.Root style={{ marginTop: "1rem" }}>
          <Collapsible.Trigger>▶ Nested Collapsible</Collapsible.Trigger>
          <Collapsible.Panel>
            <p>This is nested content inside the parent collapsible.</p>
            <p>You can nest collapsibles as deeply as needed.</p>
          </Collapsible.Panel>
        </Collapsible.Root>
      </Collapsible.Panel>
    </Collapsible.Root>
  ),
};
