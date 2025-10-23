import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Tabs } from "./tabs";

describe("Tabs", () => {
  describe("렌더링", () => {
    it("Tabs와 Panels를 렌더링해야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("defaultValue로 초기 탭이 선택되어야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab2">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("data-selected");
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("Indicator를 렌더링해야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Indicator data-testid="tabs-indicator" />
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      expect(screen.getByTestId("tabs-indicator")).toBeInTheDocument();
    });

    it("disabled 탭을 렌더링해야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>
              Tab 2 (Disabled)
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2 (Disabled)" });
      expect(tab2).toHaveAttribute("data-disabled");
    });
  });

  describe("인터랙션", () => {
    it("Tab을 클릭하면 선택되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      await waitFor(() => {
        expect(tab2).toHaveAttribute("data-selected");
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      });
    });

    it("Tab을 클릭하면 Panel 콘텐츠가 변경되어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
        </Tabs.Root>
      );

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));
      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      });

      await user.click(screen.getByRole("tab", { name: "Tab 3" }));
      await waitFor(() => {
        expect(screen.getByText("Content 3")).toBeInTheDocument();
        expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
      });
    });

    it("disabled 탭은 클릭할 수 없어야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>
              Tab 2 (Disabled)
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2 (Disabled)" });

      expect(tab1).toHaveAttribute("data-selected");

      await user.click(tab2);

      // disabled 탭이므로 선택되지 않아야 함
      await waitFor(() => {
        expect(tab1).toHaveAttribute("data-selected");
        expect(tab2).not.toHaveAttribute("data-selected");
        expect(screen.getByText("Content 1")).toBeInTheDocument();
      });
    });
  });

  describe("키보드 네비게이션", () => {
    it("ArrowRight로 다음 탭으로 이동해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
        </Tabs.Root>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      await waitFor(() => {
        const tab2 = screen.getByRole("tab", { name: "Tab 2" });
        expect(tab2).toHaveFocus();
        expect(tab2).toHaveAttribute("data-selected");
      });
    });

    it("ArrowLeft로 이전 탭으로 이동해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab2">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      tab2.focus();

      await user.keyboard("{ArrowLeft}");

      await waitFor(() => {
        const tab1 = screen.getByRole("tab", { name: "Tab 1" });
        expect(tab1).toHaveFocus();
        expect(tab1).toHaveAttribute("data-selected");
      });
    });

    it("Home 키로 첫 번째 탭으로 이동해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab3">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
        </Tabs.Root>
      );

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      tab3.focus();

      await user.keyboard("{Home}");

      await waitFor(() => {
        const tab1 = screen.getByRole("tab", { name: "Tab 1" });
        expect(tab1).toHaveFocus();
        expect(tab1).toHaveAttribute("data-selected");
      });
    });

    it("End 키로 마지막 탭으로 이동해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
        </Tabs.Root>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{End}");

      await waitFor(() => {
        const tab3 = screen.getByRole("tab", { name: "Tab 3" });
        expect(tab3).toHaveFocus();
        expect(tab3).toHaveAttribute("data-selected");
      });
    });
  });

  describe("제어 모드", () => {
    it("제어 모드에서 value prop으로 탭을 제어할 수 있어야 한다", async () => {
      function ControlledTabs() {
        const [value, setValue] = React.useState("tab1");

        return (
          <>
            <button onClick={() => setValue("tab2")}>Switch to Tab 2</button>
            <Tabs.Root value={value} onValueChange={setValue}>
              <Tabs.List>
                <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
              <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            </Tabs.Root>
          </>
        );
      }

      const user = userEvent.setup();
      render(<ControlledTabs />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Switch to Tab 2" }));

      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      });
    });

    it("onValueChange 콜백이 호출되어야 한다", async () => {
      let callbackValue: string | undefined;

      function TestTabs() {
        const [value, setValue] = React.useState("tab1");

        return (
          <Tabs.Root
            value={value}
            onValueChange={(newValue) => {
              callbackValue = newValue as string;
              setValue(newValue as string);
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
              <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Root>
        );
      }

      const user = userEvent.setup();
      render(<TestTabs />);

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));

      await waitFor(() => {
        expect(callbackValue).toBe("tab2");
      });
    });
  });

  describe("접근성", () => {
    it("TabsList이 적절한 role을 가져야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
    });

    it("Tab이 적절한 role과 속성을 가져야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("data-selected");
    });

    it("Panel이 적절한 role을 가져야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
        </Tabs.Root>
      );

      const panel = screen.getByRole("tabpanel");
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveTextContent("Content 1");
    });
  });

  describe("비제어 모드", () => {
    it("비제어 모드에서 Tab 클릭이 작동해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));

      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      });
    });
  });

  describe("세로 방향", () => {
    it("세로 방향 탭을 렌더링해야 한다", () => {
      render(
        <Tabs.Root defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toHaveAttribute("data-orientation", "vertical");
    });

    it("세로 방향에서 ArrowDown/ArrowUp으로 네비게이션해야 한다", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
        </Tabs.Root>
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        const tab2 = screen.getByRole("tab", { name: "Tab 2" });
        expect(tab2).toHaveFocus();
        expect(tab2).toHaveAttribute("data-selected");
      });
    });
  });
});
