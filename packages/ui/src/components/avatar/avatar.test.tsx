import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  describe("렌더링", () => {
    it("기본 Avatar를 렌더링할 수 있어야 한다", () => {
      render(
        <Avatar.Root data-testid="avatar-root">
          <Avatar.Image src="/test.jpg" alt="Test User" />
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      expect(screen.getByTestId("avatar-root")).toBeInTheDocument();
    });

    it("Image와 Fallback을 함께 렌더링할 수 있어야 한다", () => {
      const { container } = render(
        <Avatar.Root data-testid="avatar-root">
          <Avatar.Image
            src="/test.jpg"
            alt="Test User"
          />
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      // Avatar Root가 렌더링되고 Fallback이 표시됨
      expect(screen.getByTestId("avatar-root")).toBeInTheDocument();
      expect(screen.getByText("TU")).toBeInTheDocument();
    });

    it("Fallback만 렌더링할 수 있어야 한다", () => {
      render(
        <Avatar.Root>
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      expect(screen.getByText("TU")).toBeInTheDocument();
    });
  });

  describe("Image 동작", () => {
    it("onLoadingStatusChange 콜백이 호출되어야 한다", async () => {
      const onLoadingStatusChange = vi.fn();

      render(
        <Avatar.Root>
          <Avatar.Image
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="Test"
            onLoadingStatusChange={onLoadingStatusChange}
          />
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      await waitFor(
        () => {
          expect(onLoadingStatusChange).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Fallback 동작", () => {
    it("이미지가 없을 때 Fallback이 표시되어야 한다", () => {
      render(
        <Avatar.Root>
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      expect(screen.getByText("TU")).toBeInTheDocument();
    });

    it("Fallback에 텍스트를 표시할 수 있어야 한다", () => {
      render(
        <Avatar.Root>
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar.Root>
      );

      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("Fallback에 아이콘을 표시할 수 있어야 한다", () => {
      render(
        <Avatar.Root>
          <Avatar.Fallback>
            <span data-testid="icon">👤</span>
          </Avatar.Fallback>
        </Avatar.Root>
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("delay prop을 사용할 수 있어야 한다", async () => {
      render(
        <Avatar.Root>
          <Avatar.Fallback delay={100}>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      // delay 후에 Fallback이 표시됨
      await waitFor(
        () => {
          expect(screen.getByText("TU")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("접근성", () => {
    it("Root는 올바른 구조를 가져야 한다", () => {
      const { container } = render(
        <Avatar.Root data-testid="avatar">
          <Avatar.Image
            src="/test.jpg"
            alt="Test User"
          />
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      const root = screen.getByTestId("avatar");
      expect(root).toBeInTheDocument();
      expect(root.tagName).toBe("SPAN");
    });
  });

  describe("커스터마이징", () => {
    it("Root에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(
        <Avatar.Root className="custom-root">
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      const root = screen.getByText("TU").parentElement;
      expect(root).toHaveClass("custom-root");
    });

    it("Image 컴포넌트를 사용할 수 있어야 한다", () => {
      const { container } = render(
        <Avatar.Root>
          <Avatar.Image
            src="/test.jpg"
            alt="Test"
            className="custom-image"
          />
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      // Avatar가 올바르게 렌더링됨
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText("TU")).toBeInTheDocument();
    });

    it("Fallback에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(
        <Avatar.Root>
          <Avatar.Fallback className="custom-fallback">TU</Avatar.Fallback>
        </Avatar.Root>
      );

      const fallback = screen.getByText("TU");
      expect(fallback).toHaveClass("custom-fallback");
    });

    it("Root에 data 속성을 적용할 수 있어야 한다", () => {
      render(
        <Avatar.Root data-size="lg">
          <Avatar.Fallback>TU</Avatar.Fallback>
        </Avatar.Root>
      );

      const root = screen.getByText("TU").parentElement;
      expect(root).toHaveAttribute("data-size", "lg");
    });
  });
});
