import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  describe("렌더링", () => {
    it("Trigger를 렌더링해야 한다", () => {
      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Tooltip content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("Trigger를 hover하면 Tooltip이 표시되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Tooltip content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText("Tooltip content")).toBeInTheDocument();
      });
    });

    it("Trigger에서 unhover하면 Tooltip이 사라져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Tooltip content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText("Tooltip content")).toBeInTheDocument();
      });

      await user.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
      });
    });

    it("Arrow를 포함하여 렌더링할 수 있어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>
                  Tooltip with arrow
                  <Tooltip.Arrow data-testid="tooltip-arrow" />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByTestId("tooltip-arrow")).toBeInTheDocument();
      });
    });
  });

  describe("인터랙션", () => {
    it("Focus 시 Tooltip이 표시되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Focus me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Focused tooltip</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Focus me");
      trigger.focus();

      await waitFor(() => {
        expect(screen.getByText("Focused tooltip")).toBeInTheDocument();
      });
    });

    it("Blur 시 Tooltip이 사라져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Focus me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Focused tooltip</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Focus me");
      trigger.focus();

      await waitFor(() => {
        expect(screen.getByText("Focused tooltip")).toBeInTheDocument();
      });

      trigger.blur();

      await waitFor(() => {
        expect(screen.queryByText("Focused tooltip")).not.toBeInTheDocument();
      });
    });

    it("Escape 키를 누르면 Tooltip이 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Tooltip content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText("Tooltip content")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
      });
    });
  });

  describe("제어 모드", () => {
    it.skip("제어 모드에서 open prop으로 Tooltip을 열고 닫을 수 있어야 한다", async () => {
      function ControlledTooltip() {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <button onClick={() => setOpen(!open)}>Toggle</button>
            <Tooltip.Provider>
              <Tooltip.Root open={open} onOpenChange={setOpen}>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Popup>Controlled tooltip</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </>
        );
      }

      const user = userEvent.setup();
      render(<ControlledTooltip />);

      await user.click(screen.getByRole("button", { name: "Toggle" }));

      await waitFor(() => {
        expect(screen.getByText("Controlled tooltip")).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: "Toggle" }));

      await waitFor(
        () => {
          expect(screen.queryByText("Controlled tooltip")).not.toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it("onOpenChange 콜백이 호출되어야 한다", async () => {
      let callbackValue: boolean | undefined;

      function TestTooltip() {
        const [open, setOpen] = React.useState(false);

        return (
          <Tooltip.Provider>
            <Tooltip.Root
              open={open}
              onOpenChange={(newOpen) => {
                callbackValue = newOpen;
                setOpen(newOpen);
              }}
            >
              <Tooltip.Trigger>Hover</Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>Callback test</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        );
      }

      const user = userEvent.setup();
      render(<TestTooltip />);

      const trigger = screen.getByText("Hover");
      await user.hover(trigger);

      await waitFor(() => {
        expect(callbackValue).toBe(true);
      });

      await user.unhover(trigger);

      await waitFor(() => {
        expect(callbackValue).toBe(false);
      });
    });
  });

  describe("접근성", () => {
    it("Tooltip이 hover 시 표시되고 포커스 가능해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Accessible trigger</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Tooltip text</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Accessible trigger");
      await user.hover(trigger);

      await waitFor(() => {
        const popup = screen.getByText("Tooltip text");
        expect(popup).toBeInTheDocument();
        expect(popup).toHaveAttribute("data-base-ui-focusable");
      });
    });

    it("Tooltip Popup이 적절한 data 속성을 가져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Tooltip with attributes</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover");
      await user.hover(trigger);

      await waitFor(() => {
        const tooltip = screen.getByText("Tooltip with attributes");
        expect(tooltip).toHaveAttribute("data-open");
        expect(tooltip).toHaveAttribute("data-side");
        expect(tooltip).toHaveAttribute("data-align");
      });
    });
  });

  describe("비제어 모드", () => {
    it("비제어 모드에서 hover로 Tooltip이 열려야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Uncontrolled hover</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Uncontrolled tooltip</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Uncontrolled hover");
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText("Uncontrolled tooltip")).toBeInTheDocument();
      });
    });

    it("비제어 모드에서 unhover로 Tooltip이 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover to close</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Close on unhover</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover to close");
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText("Close on unhover")).toBeInTheDocument();
      });

      await user.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByText("Close on unhover")).not.toBeInTheDocument();
      });
    });
  });

  describe("Provider 공유", () => {
    it("Provider 내에서 여러 Tooltip이 delay를 공유해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider delay={0}>
          <Tooltip.Root>
            <Tooltip.Trigger>First tooltip</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>First content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger>Second tooltip</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Second content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const firstTrigger = screen.getByText("First tooltip");
      await user.hover(firstTrigger);

      await waitFor(() => {
        expect(screen.getByText("First content")).toBeInTheDocument();
      });

      await user.unhover(firstTrigger);

      const secondTrigger = screen.getByText("Second tooltip");
      await user.hover(secondTrigger);

      await waitFor(() => {
        expect(screen.getByText("Second content")).toBeInTheDocument();
      });
    });
  });
});
