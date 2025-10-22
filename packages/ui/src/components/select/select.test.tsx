import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./select";

describe("Select", () => {
  describe("렌더링", () => {
    it("Select.Root를 렌더링한다", () => {
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value>Select an option</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="option1">
                  <Select.ItemText>Option 1</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("Select an option");
    });

    it("여러 아이템을 렌더링한다", () => {
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
                <Select.Item value="2">
                  <Select.ItemText>Item 2</Select.ItemText>
                </Select.Item>
                <Select.Item value="3">
                  <Select.ItemText>Item 3</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("Icon을 렌더링한다", () => {
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const trigger = screen.getByRole("combobox");
      const icon = trigger.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("인터랙션", () => {
    it("트리거가 초기에는 닫힌 상태이다", () => {
      render(
        <Select.Root>
          <Select.Trigger data-testid="trigger">
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("제어/비제어 모드", () => {
    it("비제어 모드 - defaultValue로 기본값을 설정한다", () => {
      const { container } = render(
        <Select.Root defaultValue="2">
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
                <Select.Item value="2">
                  <Select.ItemText>Item 2</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      // defaultValue가 설정되면 hidden input의 value가 "2"가 됨
      const hiddenInput = container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
      expect(hiddenInput).toHaveValue("2");
    });

    it("제어 모드 - value와 onValueChange를 사용한다", () => {
      let currentValue = "1";
      const handleChange = (newValue: string) => {
        currentValue = newValue;
      };

      const { container } = render(
        <Select.Root value={currentValue} onValueChange={handleChange}>
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
                <Select.Item value="2">
                  <Select.ItemText>Item 2</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      // value prop이 설정되면 hidden input의 value가 제어됨
      const hiddenInput = container.querySelector('input[aria-hidden="true"]') as HTMLInputElement;
      expect(hiddenInput).toHaveValue("1");
    });
  });

  describe("비활성화 상태", () => {
    it("disabled 상태를 렌더링한다", () => {
      render(
        <Select.Root disabled>
          <Select.Trigger data-testid="trigger">
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveAttribute("data-disabled");
      expect(trigger).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("그룹", () => {
    it("Group과 GroupLabel을 렌더링한다", async () => {
      const user = userEvent.setup();

      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Group>
                  <Select.GroupLabel>Fruits</Select.GroupLabel>
                  <Select.Item value="apple">
                    <Select.ItemText>Apple</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="banana">
                    <Select.ItemText>Banana</Select.ItemText>
                  </Select.Item>
                </Select.Group>
                <Select.Group>
                  <Select.GroupLabel>Vegetables</Select.GroupLabel>
                  <Select.Item value="carrot">
                    <Select.ItemText>Carrot</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      expect(screen.getByText("Fruits")).toBeInTheDocument();
      expect(screen.getByText("Vegetables")).toBeInTheDocument();
    });
  });

  describe("접근성", () => {
    it("combobox role을 가진다", () => {
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value>Select</Select.Value>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="1">
                  <Select.ItemText>Item 1</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const combobox = screen.getByRole("combobox");
      expect(combobox).toBeInTheDocument();
    });
  });
});
