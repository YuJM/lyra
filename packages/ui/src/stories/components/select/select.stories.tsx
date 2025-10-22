import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../../../components/select/select";
import * as React from "react";

const meta: Meta<typeof Select.Root> = {
  title: "Components/Select",
  component: Select.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

export const Default: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value>Select a fruit</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemText>Orange</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="grape">
              <Select.ItemText>Grape</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select.Root defaultValue="banana">
      <Select.Trigger>
        <Select.Value>Select a fruit</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemText>Orange</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState("apple");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value>Select a fruit</Select.Value>
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="apple">
                  <Select.ItemText>Apple</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
                <Select.Item value="banana">
                  <Select.ItemText>Banana</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
                <Select.Item value="orange">
                  <Select.ItemText>Orange</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Selected: <strong>{value}</strong>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select.Root disabled>
      <Select.Trigger>
        <Select.Value>Select a fruit</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const DisabledOptions: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value>Select a fruit</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana" disabled>
              <Select.ItemText>Banana (Out of stock)</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemText>Orange</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="grape" disabled>
              <Select.ItemText>Grape (Out of stock)</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value>Select a food</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Group>
              <Select.GroupLabel>Fruits</Select.GroupLabel>
              <Select.Item value="apple">
                <Select.ItemText>Apple</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="banana">
                <Select.ItemText>Banana</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="orange">
                <Select.ItemText>Orange</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Vegetables</Select.GroupLabel>
              <Select.Item value="carrot">
                <Select.ItemText>Carrot</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="broccoli">
                <Select.ItemText>Broccoli</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="spinach">
                <Select.ItemText>Spinach</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithBackdrop: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value>Select a fruit</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemText>Orange</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value>Select a fruit</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Arrow />
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemText>Orange</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const LongList: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value>Select a country</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            {[
              "United States",
              "Canada",
              "Mexico",
              "United Kingdom",
              "France",
              "Germany",
              "Italy",
              "Spain",
              "Japan",
              "China",
              "South Korea",
              "Australia",
              "Brazil",
              "Argentina",
              "India",
            ].map((country) => (
              <Select.Item key={country} value={country.toLowerCase()}>
                <Select.ItemText>{country}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger style={{ width: "300px" }}>
        <Select.Value>Select a programming language</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup style={{ width: "300px" }}>
            <Select.Item value="typescript">
              <Select.ItemText>TypeScript</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="javascript">
              <Select.ItemText>JavaScript</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="python">
              <Select.ItemText>Python</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="rust">
              <Select.ItemText>Rust</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="go">
              <Select.ItemText>Go</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};
