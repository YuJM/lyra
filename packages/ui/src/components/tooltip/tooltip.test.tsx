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
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("Trigger에 hover하면 Tooltip이 표시되어야 한다", async () => {
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

    it("Arrow를 렌더링할 수 있어야 한다", async () => {
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
    it("Trigger에서 unhover하면 Tooltip이 숨겨져야 한다", async () => {
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

    it("Escape 키를 누르면 Tooltip이 숨겨져야 한다", async () => {
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
    it("제어 모드에서 open prop으로 Tooltip을 제어할 수 있어야 한다", async () => {
      function ControlledTooltip() {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <button onClick={() => setOpen(!open)}>Toggle</button>
            <Tooltip.Provider>
              <Tooltip.Root open={open} onOpenChange={setOpen}>
                <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Popup data-testid="controlled-tooltip">Controlled tooltip</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </>
        );
      }

      const user = userEvent.setup();
      render(<ControlledTooltip />);

      // 초기 상태: Tooltip이 렌더링되지 않음
      expect(screen.queryByTestId("controlled-tooltip")).not.toBeInTheDocument();

      // Toggle 버튼 클릭 시 Tooltip이 표시됨
      await user.click(screen.getByText("Toggle"));

      await waitFor(() => {
        const tooltipOpen = screen.getByTestId("controlled-tooltip");
        expect(tooltipOpen).toBeInTheDocument();
        expect(tooltipOpen).toHaveAttribute("data-open");
      });
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
              <Tooltip.Trigger>Hover me</Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>Test</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        );
      }

      const user = userEvent.setup();
      render(<TestTooltip />);

      const trigger = screen.getByText("Hover me");
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
    it("Tooltip에 data-open 속성이 있어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup data-testid="tooltip">Accessible tooltip</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        const tooltip = screen.getByTestId("tooltip");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveAttribute("data-open");
      });
    });

    it("Trigger에 data-popup-open 속성이 설정되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Description text</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-popup-open");
      });
    });
  });

  describe("Portal 렌더링", () => {
    it("Tooltip이 Portal을 통해 렌더링되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <div id="app-root">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger>Hover me</Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup data-testid="portaled-tooltip">Portaled tooltip</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      );

      const trigger = screen.getByText("Hover me");
      await user.hover(trigger);

      await waitFor(() => {
        const tooltip = screen.getByTestId("portaled-tooltip");
        // Portal은 기본적으로 document.body에 렌더링됨
        expect(tooltip).toBeInTheDocument();
        const portalContainer = tooltip.closest("[data-base-ui-portal]");
        expect(portalContainer?.parentElement).toBe(document.body);
      });
    });
  });
});
