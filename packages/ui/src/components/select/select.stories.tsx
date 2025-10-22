import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Select } from "./select";

const meta = {
  title: "Design System/Select",
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
        <Select.Value placeholder="Select an option" />
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
 * 비활성화된 Select입니다.
 */
export const Disabled: Story = {
  render: () => (
    <Select.Root disabled>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
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
 * 제어 모드 Select입니다.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>(undefined);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p>Selected value: {value || "none"}</p>
        <button onClick={() => setValue(undefined)}>Clear selection</button>

        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
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
      </div>
    );
  },
};

/**
 * 화살표가 있는 Select입니다.
 */
export const WithArrow: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
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
export const ManyOptions: Story = {
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
              "Afghanistan",
              "Albania",
              "Algeria",
              "Andorra",
              "Angola",
              "Argentina",
              "Armenia",
              "Australia",
              "Austria",
              "Azerbaijan",
              "Bahamas",
              "Bahrain",
              "Bangladesh",
              "Barbados",
              "Belarus",
              "Belgium",
              "Belize",
              "Benin",
              "Bhutan",
              "Bolivia",
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
