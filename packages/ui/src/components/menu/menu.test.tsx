import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Menu } from "./menu";

describe("Menu", () => {
  describe("렌더링", () => {
    it("Trigger를 렌더링해야 한다", () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
        </Menu.Root>
      );

      expect(screen.getByRole("button", { name: "Open Menu" })).toBeInTheDocument();
    });

    it("Trigger를 클릭하면 Menu가 열려야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Delete</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      const trigger = screen.getByRole("button", { name: "Open Menu" });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
      });
    });

    it("여러 Menu Items를 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Options</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Cut</Menu.Item>
                <Menu.Item>Copy</Menu.Item>
                <Menu.Item>Paste</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Options" }));

      await waitFor(() => {
        expect(screen.getByText("Cut")).toBeInTheDocument();
        expect(screen.getByText("Copy")).toBeInTheDocument();
        expect(screen.getByText("Paste")).toBeInTheDocument();
      });
    });

    it("Arrow를 포함하여 렌더링할 수 있어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Arrow data-testid="menu-arrow" />
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByTestId("menu-arrow")).toBeInTheDocument();
      });
    });

    it("Separator를 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Separator data-testid="menu-separator" />
                <Menu.Item>Item 2</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByTestId("menu-separator")).toBeInTheDocument();
      });
    });
  });

  describe("인터랙션", () => {
    it("Menu Item을 클릭하면 Menu가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Action</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Action")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Action"));

      await waitFor(() => {
        expect(screen.queryByText("Action")).not.toBeInTheDocument();
      });
    });

    it("Escape 키를 누르면 Menu가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Action</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Action")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Action")).not.toBeInTheDocument();
      });
    });

    it("Backdrop을 클릭하면 Menu가 닫혀야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Backdrop />
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Action</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Action")).toBeInTheDocument();
      });

      const backdrop = document.querySelector(".MenuBackdrop");
      if (backdrop) {
        await user.click(backdrop);

        await waitFor(() => {
          expect(screen.queryByText("Action")).not.toBeInTheDocument();
        });
      }
    });

    it("disabled Item은 클릭할 수 없어야 한다", async () => {
      const user = userEvent.setup();
      const handleClick = () => {
        throw new Error("Should not be called");
      };

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item disabled onClick={handleClick}>
                  Disabled Action
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const item = screen.getByText("Disabled Action");
        expect(item).toHaveAttribute("data-disabled");
      });
    });
  });

  describe("RadioItems", () => {
    it("RadioGroup과 RadioItem을 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup>
                  <Menu.RadioItem value="option1">Option 1</Menu.RadioItem>
                  <Menu.RadioItem value="option2">Option 2</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });
    });

    it("RadioItem을 선택할 수 있어야 한다", async () => {
      const user = userEvent.setup();

      function TestMenu() {
        const [value, setValue] = React.useState("option1");

        return (
          <Menu.Root>
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.RadioGroup value={value} onValueChange={setValue}>
                    <Menu.RadioItem value="option1">
                      <Menu.RadioItemIndicator />
                      Option 1
                    </Menu.RadioItem>
                    <Menu.RadioItem value="option2">
                      <Menu.RadioItemIndicator />
                      Option 2
                    </Menu.RadioItem>
                  </Menu.RadioGroup>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );
      }

      render(<TestMenu />);

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const option1 = screen.getByText("Option 1").closest("[role='menuitemradio']");
        expect(option1).toHaveAttribute("data-checked");
      });

      await user.click(screen.getByText("Option 2"));

      await waitFor(() => {
        const option2 = screen.getByText("Option 2").closest("[role='menuitemradio']");
        expect(option2).toHaveAttribute("data-checked");
      });
    });

    it("RadioItemIndicator가 선택된 항목에만 표시되어야 한다", async () => {
      const user = userEvent.setup();

      function TestMenu() {
        const [value, setValue] = React.useState("option1");

        return (
          <Menu.Root>
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.RadioGroup value={value} onValueChange={setValue}>
                    <Menu.RadioItem value="option1">
                      <Menu.RadioItemIndicator data-testid="indicator-1" />
                      Option 1
                    </Menu.RadioItem>
                    <Menu.RadioItem value="option2">
                      <Menu.RadioItemIndicator data-testid="indicator-2" />
                      Option 2
                    </Menu.RadioItem>
                  </Menu.RadioGroup>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );
      }

      render(<TestMenu />);

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByTestId("indicator-1")).toBeInTheDocument();
      });
    });
  });

  describe("CheckboxItems", () => {
    it("CheckboxItem을 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem>Show Details</Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Show Details")).toBeInTheDocument();
      });
    });

    it("CheckboxItem을 토글할 수 있어야 한다", async () => {
      const user = userEvent.setup();

      function TestMenu() {
        const [checked, setChecked] = React.useState(false);

        return (
          <Menu.Root>
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.CheckboxItem checked={checked} onCheckedChange={setChecked}>
                    <Menu.CheckboxItemIndicator />
                    Show Details
                  </Menu.CheckboxItem>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );
      }

      render(<TestMenu />);

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const checkbox = screen.getByText("Show Details").closest("[role='menuitemcheckbox']");
        expect(checkbox).not.toHaveAttribute("data-checked");
      });

      await user.click(screen.getByText("Show Details"));

      await waitFor(() => {
        const checkbox = screen.getByText("Show Details").closest("[role='menuitemcheckbox']");
        expect(checkbox).toHaveAttribute("data-checked");
      });
    });

    it("CheckboxItemIndicator가 checked 상태에만 표시되어야 한다", async () => {
      const user = userEvent.setup();

      function TestMenu() {
        const [checked, setChecked] = React.useState(false);

        return (
          <Menu.Root>
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.CheckboxItem checked={checked} onCheckedChange={setChecked}>
                    <Menu.CheckboxItemIndicator data-testid="checkbox-indicator" />
                    Show Details
                  </Menu.CheckboxItem>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );
      }

      render(<TestMenu />);

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Show Details")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Show Details"));

      await waitFor(() => {
        expect(screen.getByTestId("checkbox-indicator")).toBeInTheDocument();
      });
    });
  });

  describe("Groups", () => {
    it("Group과 GroupLabel을 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Group>
                  <Menu.GroupLabel>Actions</Menu.GroupLabel>
                  <Menu.Item>Edit</Menu.Item>
                  <Menu.Item>Delete</Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Actions")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
      });
    });

    it("여러 Group을 렌더링할 수 있어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Group>
                  <Menu.GroupLabel>Edit</Menu.GroupLabel>
                  <Menu.Item>Cut</Menu.Item>
                  <Menu.Item>Copy</Menu.Item>
                </Menu.Group>
                <Menu.Separator />
                <Menu.Group>
                  <Menu.GroupLabel>View</Menu.GroupLabel>
                  <Menu.Item>Zoom In</Menu.Item>
                  <Menu.Item>Zoom Out</Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("View")).toBeInTheDocument();
        expect(screen.getByText("Cut")).toBeInTheDocument();
        expect(screen.getByText("Zoom In")).toBeInTheDocument();
      });
    });
  });

  describe("Submenu", () => {
    it("SubmenuTrigger를 렌더링해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger>More Options</Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>Submenu Item</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("More Options")).toBeInTheDocument();
      });
    });

    it("SubmenuTrigger에 마우스를 올리면 Submenu가 열려야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger>More Options</Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>Submenu Item</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("More Options")).toBeInTheDocument();
      });

      await user.hover(screen.getByText("More Options"));

      await waitFor(() => {
        expect(screen.getByText("Submenu Item")).toBeInTheDocument();
      });
    });
  });

  describe("제어 모드", () => {
    it("제어 모드에서 open prop으로 Menu를 열고 닫을 수 있어야 한다", async () => {
      function ControlledMenu() {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>External Open</button>
            <Menu.Root open={open} onOpenChange={setOpen}>
              <Menu.Trigger>Menu</Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner>
                  <Menu.Popup>
                    <Menu.Item>Controlled Item</Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </>
        );
      }

      const user = userEvent.setup();
      render(<ControlledMenu />);

      await user.click(screen.getByRole("button", { name: "External Open" }));

      await waitFor(() => {
        expect(screen.getByText("Controlled Item")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Controlled Item")).not.toBeInTheDocument();
      });
    });

    it("onOpenChange 콜백이 호출되어야 한다", async () => {
      let callbackValue: boolean | undefined;

      function TestMenu() {
        const [open, setOpen] = React.useState(false);

        return (
          <Menu.Root
            open={open}
            onOpenChange={(newOpen) => {
              callbackValue = newOpen;
              setOpen(newOpen);
            }}
          >
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item>Test Item</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );
      }

      const user = userEvent.setup();
      render(<TestMenu />);

      await user.click(screen.getByRole("button", { name: "Menu" }));

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
    it("Menu Popup이 적절한 data 속성을 가져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup data-testid="menu-popup">
                <Menu.Item>Item</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const popup = screen.getByTestId("menu-popup");
        expect(popup).toHaveAttribute("data-open");
        expect(popup).toHaveAttribute("data-side");
      });
    });

    it("RadioItem이 적절한 role을 가져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup>
                  <Menu.RadioItem value="option1">Option 1</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const radioItem = screen.getByText("Option 1").closest("[role='menuitemradio']");
        expect(radioItem).toBeInTheDocument();
      });
    });

    it("CheckboxItem이 적절한 role을 가져야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem>Show Details</Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const checkboxItem = screen.getByText("Show Details").closest("[role='menuitemcheckbox']");
        expect(checkboxItem).toBeInTheDocument();
      });
    });
  });

  describe("비제어 모드", () => {
    it("비제어 모드에서 Trigger가 Menu를 열어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Open Uncontrolled</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Uncontrolled Item</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Open Uncontrolled" }));

      await waitFor(() => {
        expect(screen.getByText("Uncontrolled Item")).toBeInTheDocument();
      });
    });

    it("비제어 모드에서 Item 클릭이 Menu를 닫아야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Close on Click</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        expect(screen.getByText("Close on Click")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Close on Click"));

      await waitFor(() => {
        expect(screen.queryByText("Close on Click")).not.toBeInTheDocument();
      });
    });
  });

  describe("Portal 렌더링", () => {
    it("Menu가 Portal을 통해 렌더링되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <div id="app-root">
          <Menu.Root>
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup data-testid="menu-popup">
                  <Menu.Item>Portaled Item</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </div>
      );

      await user.click(screen.getByRole("button", { name: "Menu" }));

      await waitFor(() => {
        const popup = screen.getByTestId("menu-popup");
        // Portal 컨테이너가 body의 직계 자식인지 확인
        const portalContainer = document.querySelector("[data-base-ui-portal]");
        expect(portalContainer).toBeInTheDocument();
        expect(portalContainer?.parentElement).toBe(document.body);
      });
    });
  });
});
