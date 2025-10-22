import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Popover } from "./popover";

describe("Popover", () => {
  describe("렌더링", () => {
    it("Trigger를 렌더링해야 한다", () => {
      render(
        <Popover.Root>
          <Popover.Trigger>Open Popover</Popover.Trigger>
        </Popover.Root>
      );

      expect(screen.getByRole("button", { name: "Open Popover" })).toBeInTheDocument();
    });

    it("Trigger를 클릭하면 Popover가 열려야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Test Popover</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      const trigger = screen.getByRole("button", { name: "Open Popover" });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Test Popover")).toBeInTheDocument();
      });
    });

    it("Title과 Description을 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Title</Popover.Title>
                <Popover.Description>Popover Description</Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByText("Popover Title")).toBeInTheDocument();
        expect(screen.getByText("Popover Description")).toBeInTheDocument();
      });
    });

    it("Arrow를 포함하여 렌더링할 수 있어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>With Arrow</Popover.Title>
                <Popover.Arrow data-testid="popover-arrow" />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByTestId("popover-arrow")).toBeInTheDocument();
      });
    });
  });

  describe("인터랙션", () => {
    it("Close 버튼을 클릭하면 Popover가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Test Popover</Popover.Title>
                <Popover.Close>Close</Popover.Close>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByText("Test Popover")).toBeInTheDocument();
      });

      const closeButton = screen.getByRole("button", { name: "Close" });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText("Test Popover")).not.toBeInTheDocument();
      });
    });

    it("Escape 키를 누르면 Popover가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Test Popover</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByText("Test Popover")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Test Popover")).not.toBeInTheDocument();
      });
    });

    it("Backdrop을 클릭하면 Popover가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Backdrop />
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Test Popover</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByText("Test Popover")).toBeInTheDocument();
      });

      const backdrop = document.querySelector(".PopoverBackdrop");
      if (backdrop) {
        await user.click(backdrop);

        await waitFor(() => {
          expect(screen.queryByText("Test Popover")).not.toBeInTheDocument();
        });
      }
    });
  });

  describe("제어 모드", () => {
    it("제어 모드에서 open prop으로 Popover를 열고 닫을 수 있어야 한다", async () => {
      function ControlledPopover() {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>External Open</button>
            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Portal>
                <Popover.Positioner>
                  <Popover.Popup>
                    <Popover.Title>Controlled Popover</Popover.Title>
                    <Popover.Close>Close</Popover.Close>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </>
        );
      }

      const user = userEvent.setup();
      render(<ControlledPopover />);

      await user.click(screen.getByRole("button", { name: "External Open" }));

      await waitFor(() => {
        expect(screen.getByText("Controlled Popover")).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: "Close" }));

      await waitFor(() => {
        expect(screen.queryByText("Controlled Popover")).not.toBeInTheDocument();
      });
    });

    it("onOpenChange 콜백이 호출되어야 한다", async () => {
      let callbackValue: boolean | undefined;

      function TestPopover() {
        const [open, setOpen] = React.useState(false);

        return (
          <Popover.Root
            open={open}
            onOpenChange={(newOpen) => {
              callbackValue = newOpen;
              setOpen(newOpen);
            }}
          >
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup>
                  <Popover.Title>Test</Popover.Title>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        );
      }

      const user = userEvent.setup();
      render(<TestPopover />);

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(callbackValue).toBe(true);
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(callbackValue).toBe(false);
      });
    });
  });

  describe("접근성", () => {
    it("Popover Popup이 적절한 data 속성을 가져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup data-testid="popover-popup">
                <Popover.Title>Accessible Popover</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const popup = screen.getByTestId("popover-popup");
        expect(popup).toHaveAttribute("data-open");
        expect(popup).toHaveAttribute("data-side");
      });
    });

    it("Title이 적절한 heading 역할을 해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Heading</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const title = screen.getByText("Popover Heading");
        expect(title.tagName).toBe("H2");
      });
    });
  });

  describe("비제어 모드", () => {
    it("비제어 모드에서 Trigger가 Popover를 열어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open Uncontrolled</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Uncontrolled Popover</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open Uncontrolled" }));

      await waitFor(() => {
        expect(screen.getByText("Uncontrolled Popover")).toBeInTheDocument();
      });
    });

    it("비제어 모드에서 Close가 Popover를 닫아야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Test</Popover.Title>
                <Popover.Close>Close Uncontrolled</Popover.Close>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByText("Test")).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: "Close Uncontrolled" }));

      await waitFor(() => {
        expect(screen.queryByText("Test")).not.toBeInTheDocument();
      });
    });
  });

  describe("Portal 렌더링", () => {
    it("Popover가 Portal을 통해 렌더링되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <div id="app-root">
          <Popover.Root>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup data-testid="popover-popup">
                  <Popover.Title>Portaled Popover</Popover.Title>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const popup = screen.getByTestId("popover-popup");
        // Portal 컨테이너가 body의 직계 자식인지 확인
        const portalContainer = document.querySelector("[data-base-ui-portal]");
        expect(portalContainer).toBeInTheDocument();
        expect(portalContainer?.parentElement).toBe(document.body);
      });
    });
  });
});
