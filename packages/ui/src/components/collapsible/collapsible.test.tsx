import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Collapsible } from "./collapsible";

describe("Collapsible", () => {
  describe("렌더링", () => {
    it("기본 Collapsible을 렌더링할 수 있어야 한다", () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("초기에 닫힌 상태로 렌더링되어야 한다", () => {
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("defaultOpen으로 초기에 열린 상태로 렌더링할 수 있어야 한다", () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("여러 개의 Collapsible을 독립적으로 렌더링할 수 있어야 한다", () => {
      render(
        <>
          <Collapsible.Root>
            <Collapsible.Trigger>First Toggle</Collapsible.Trigger>
            <Collapsible.Panel>First Content</Collapsible.Panel>
          </Collapsible.Root>
          <Collapsible.Root>
            <Collapsible.Trigger>Second Toggle</Collapsible.Trigger>
            <Collapsible.Panel>Second Content</Collapsible.Panel>
          </Collapsible.Root>
        </>
      );

      expect(screen.getByRole("button", { name: "First Toggle" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Second Toggle" })).toBeInTheDocument();
    });
  });

  describe("인터랙션", () => {
    it("Trigger를 클릭하면 Panel이 열려야 한다", async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("열린 상태에서 Trigger를 다시 클릭하면 Panel이 닫혀야 한다", async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("비활성화된 Trigger는 클릭할 수 없어야 한다", async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root disabled>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toBeDisabled();

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("키보드 네비게이션", () => {
    it("Enter 키로 Collapsible을 토글할 수 있어야 한다", async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      trigger.focus();

      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("Space 키로 Collapsible을 토글할 수 있어야 한다", async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      trigger.focus();

      await user.keyboard(" ");

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });
  });

  describe("제어 모드", () => {
    it("open prop으로 제어할 수 있어야 한다", () => {
      const { rerender } = render(
        <Collapsible.Root open={false}>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      rerender(
        <Collapsible.Root open={true}>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("onOpenChange 콜백이 호출되어야 한다", async () => {
      const user = userEvent.setup();
      let isOpen = false;
      const handleOpenChange = (open: boolean) => {
        isOpen = open;
      };

      render(
        <Collapsible.Root onOpenChange={handleOpenChange}>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      await user.click(trigger);

      await waitFor(() => {
        expect(isOpen).toBe(true);
      });
    });
  });

  describe("접근성", () => {
    it("Trigger는 적절한 role을 가져야 한다", () => {
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toBeInTheDocument();
    });

    it("Trigger는 aria-expanded 속성을 가져야 한다", () => {
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded");
    });

    it("열린 상태에서 Trigger는 aria-controls 속성을 가져야 한다", () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-controls");
    });

    it("비활성화된 Trigger는 data-disabled 속성을 가져야 한다", () => {
      render(
        <Collapsible.Root disabled>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("data-disabled");
    });
  });

  describe("비제어 모드", () => {
    it("비제어 모드에서 클릭으로 토글할 수 있어야 한다", async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const trigger = screen.getByRole("button", { name: "Toggle" });

      await user.click(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });

      await user.click(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      });
    });
  });
});
