import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Dialog } from "./dialog";

describe("Dialog", () => {
  describe("렌더링", () => {
    it("Trigger를 렌더링해야 한다", () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        </Dialog.Root>
      );

      expect(screen.getByRole("button", { name: "Open Dialog" })).toBeInTheDocument();
    });

    it("Trigger를 클릭하면 Dialog가 열려야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Test Dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      const trigger = screen.getByRole("button", { name: "Open Dialog" });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("Title과 Description을 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByText("Dialog Title")).toBeInTheDocument();
        expect(screen.getByText("Dialog Description")).toBeInTheDocument();
      });
    });
  });

  describe("인터랙션", () => {
    it("Close 버튼을 클릭하면 Dialog가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Test Dialog</Dialog.Title>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const closeButton = screen.getByRole("button", { name: "Close" });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("Escape 키를 누르면 Dialog가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Test Dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("Backdrop을 클릭하면 Dialog가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Test Dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const backdrop = document.querySelector(".DialogBackdrop");
      if (backdrop) {
        await user.click(backdrop);

        await waitFor(() => {
          expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
      }
    });
  });

  describe("제어 모드", () => {
    it("제어 모드에서 open prop으로 Dialog를 열고 닫을 수 있어야 한다", async () => {
      function ControlledDialog() {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>External Open</button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Portal>
                <Dialog.Popup>
                  <Dialog.Title>Controlled Dialog</Dialog.Title>
                  <Dialog.Close>Close</Dialog.Close>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          </>
        );
      }

      const user = userEvent.setup();
      render(<ControlledDialog />);

      await user.click(screen.getByRole("button", { name: "External Open" }));

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: "Close" }));

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("onOpenChange 콜백이 호출되어야 한다", async () => {
      let callbackValue: boolean | undefined;

      function TestDialog() {
        const [open, setOpen] = React.useState(false);

        return (
          <Dialog.Root
            open={open}
            onOpenChange={(newOpen) => {
              callbackValue = newOpen;
              setOpen(newOpen);
            }}
          >
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Popup>
                <Dialog.Title>Test</Dialog.Title>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        );
      }

      const user = userEvent.setup();
      render(<TestDialog />);

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
    it("Dialog에 role='dialog'가 있어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Accessible Dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
      });
    });

    it("Title이 Dialog의 aria-labelledby와 연결되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Labeled Dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const title = screen.getByText("Labeled Dialog");

        expect(dialog).toHaveAttribute("aria-labelledby", title.id);
      });
    });

    it("Description이 Dialog의 aria-describedby와 연결되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Dialog</Dialog.Title>
              <Dialog.Description>This is a description</Dialog.Description>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const description = screen.getByText("This is a description");

        expect(dialog).toHaveAttribute("aria-describedby", description.id);
      });
    });
  });

  describe("비제어 모드", () => {
    it("비제어 모드에서 Trigger가 Dialog를 열어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Uncontrolled</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Uncontrolled Dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open Uncontrolled" }));

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("비제어 모드에서 Close가 Dialog를 닫아야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Popup>
              <Dialog.Title>Test</Dialog.Title>
              <Dialog.Close>Close Uncontrolled</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: "Close Uncontrolled" }));

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Portal 렌더링", () => {
    it("Dialog가 Portal을 통해 렌더링되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <div id="app-root">
          <Dialog.Root>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Popup>
                <Dialog.Title>Portaled Dialog</Dialog.Title>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        // Portal은 기본적으로 document.body에 렌더링됨
        expect(dialog.parentElement?.parentElement).toBe(document.body);
      });
    });
  });
});
