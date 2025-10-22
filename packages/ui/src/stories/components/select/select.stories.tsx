import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Select } from "../../../components/select/select";

const meta = {
  title: "Components/Select",
  component: Select.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Select 예시입니다.
 */
export const Default: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemIndicator />
              <Select.ItemText>Banana</Select.ItemText>
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemIndicator />
              <Select.ItemText>Orange</Select.ItemText>
            </Select.Item>
            <Select.Item value="grape">
              <Select.ItemIndicator />
              <Select.ItemText>Grape</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 기본값이 있는 Select입니다.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select.Root defaultValue="banana">
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemIndicator />
              <Select.ItemText>Banana</Select.ItemText>
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemIndicator />
              <Select.ItemText>Orange</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 제어 모드 Select입니다. 외부 상태로 값을 제어할 수 있습니다.
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState<string | undefined>("apple");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value placeholder="Select a fruit" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Backdrop />
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="apple">
                  <Select.ItemIndicator />
                  <Select.ItemText>Apple</Select.ItemText>
                </Select.Item>
                <Select.Item value="banana">
                  <Select.ItemIndicator />
                  <Select.ItemText>Banana</Select.ItemText>
                </Select.Item>
                <Select.Item value="orange">
                  <Select.ItemIndicator />
                  <Select.ItemText>Orange</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Selected: <strong>{value || "none"}</strong>
        </div>
        <button onClick={() => setValue(undefined)}>Clear selection</button>
      </div>
    );
  },
};

/**
 * 비활성화된 Select입니다.
 */
export const Disabled: Story = {
  render: () => (
    <Select.Root disabled>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemIndicator />
              <Select.ItemText>Banana</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 일부 옵션이 비활성화된 Select입니다.
 */
export const DisabledOptions: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value="banana" disabled>
              <Select.ItemIndicator />
              <Select.ItemText>Banana (Out of stock)</Select.ItemText>
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemIndicator />
              <Select.ItemText>Orange</Select.ItemText>
            </Select.Item>
            <Select.Item value="grape" disabled>
              <Select.ItemIndicator />
              <Select.ItemText>Grape (Out of stock)</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 그룹화된 Select 옵션입니다.
 */
export const WithGroups: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a food" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Group>
              <Select.GroupLabel>Fruits</Select.GroupLabel>
              <Select.Item value="apple">
                <Select.ItemIndicator />
                <Select.ItemText>Apple</Select.ItemText>
              </Select.Item>
              <Select.Item value="banana">
                <Select.ItemIndicator />
                <Select.ItemText>Banana</Select.ItemText>
              </Select.Item>
              <Select.Item value="orange">
                <Select.ItemIndicator />
                <Select.ItemText>Orange</Select.ItemText>
              </Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Vegetables</Select.GroupLabel>
              <Select.Item value="carrot">
                <Select.ItemIndicator />
                <Select.ItemText>Carrot</Select.ItemText>
              </Select.Item>
              <Select.Item value="broccoli">
                <Select.ItemIndicator />
                <Select.ItemText>Broccoli</Select.ItemText>
              </Select.Item>
              <Select.Item value="spinach">
                <Select.ItemIndicator />
                <Select.ItemText>Spinach</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 화살표가 있는 Select입니다.
 */
export const WithArrow: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup>
            <Select.Arrow />
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemIndicator />
              <Select.ItemText>Banana</Select.ItemText>
            </Select.Item>
            <Select.Item value="orange">
              <Select.ItemIndicator />
              <Select.ItemText>Orange</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 많은 옵션이 있는 Select입니다.
 */
export const LongList: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a country" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
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
                <Select.ItemIndicator />
                <Select.ItemText>{country}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

/**
 * 커스텀 너비를 가진 Select입니다.
 */
export const CustomWidth: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger style={{ width: "300px" }}>
        <Select.Value placeholder="Select a programming language" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Backdrop />
        <Select.Positioner>
          <Select.Popup style={{ width: "300px" }}>
            <Select.Item value="typescript">
              <Select.ItemIndicator />
              <Select.ItemText>TypeScript</Select.ItemText>
            </Select.Item>
            <Select.Item value="javascript">
              <Select.ItemIndicator />
              <Select.ItemText>JavaScript</Select.ItemText>
            </Select.Item>
            <Select.Item value="python">
              <Select.ItemIndicator />
              <Select.ItemText>Python</Select.ItemText>
            </Select.Item>
            <Select.Item value="rust">
              <Select.ItemIndicator />
              <Select.ItemText>Rust</Select.ItemText>
            </Select.Item>
            <Select.Item value="go">
              <Select.ItemIndicator />
              <Select.ItemText>Go</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};
