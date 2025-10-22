import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  describe("렌더링", () => {
    it("기본 Progress를 렌더링할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Label>Loading...</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value />
        </Progress.Root>
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("Label 없이 렌더링할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("Value 없이 렌더링할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("진행률 상태", () => {
    it("value prop에 따라 진행률을 표시해야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    });

    it("value가 null일 때 indeterminate 상태여야 한다", () => {
      render(
        <Progress.Root value={null}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).not.toHaveAttribute("aria-valuenow");
    });

    it("value가 100일 때 완료 상태여야 한다", () => {
      render(
        <Progress.Root value={100}>
          <Progress.Track data-testid="track">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const track = screen.getByTestId("track");
      expect(track).toHaveAttribute("data-complete");
    });

    it("value가 0과 100 사이일 때 진행 중 상태여야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track data-testid="track">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const track = screen.getByTestId("track");
      expect(track).toHaveAttribute("data-progressing");
    });
  });

  describe("min/max prop", () => {
    it("min과 max를 설정할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50} min={0} max={100}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemin", "0");
      expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    });

    it("사용자 정의 범위를 사용할 수 있어야 한다", () => {
      render(
        <Progress.Root value={5} min={0} max={10}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "5");
      expect(progressbar).toHaveAttribute("aria-valuemin", "0");
      expect(progressbar).toHaveAttribute("aria-valuemax", "10");
    });
  });

  describe("접근성", () => {
    it("progressbar role을 가져야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("aria-valuenow를 가져야 한다", () => {
      render(
        <Progress.Root value={75}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    });

    it("aria-valuemin과 aria-valuemax를 가져야 한다", () => {
      render(
        <Progress.Root value={50} min={0} max={100}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemin", "0");
      expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("커스터마이징", () => {
    it("Label에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Label className="custom-label">Loading...</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const label = screen.getByText("Loading...");
      expect(label).toHaveClass("custom-label");
    });

    it("Track에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track className="custom-track">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );

      const track = screen.getByRole("progressbar").querySelector(
        ".custom-track"
      );
      expect(track).toBeInTheDocument();
    });

    it("Indicator에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track>
            <Progress.Indicator className="custom-indicator" />
          </Progress.Track>
        </Progress.Root>
      );

      const indicator = screen
        .getByRole("progressbar")
        .querySelector(".custom-indicator");
      expect(indicator).toBeInTheDocument();
    });

    it("Value에 커스텀 className을 적용할 수 있어야 한다", () => {
      render(
        <Progress.Root value={50}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          <Progress.Value className="custom-value" />
        </Progress.Root>
      );

      const value = screen
        .getByRole("progressbar")
        .parentElement?.querySelector(".custom-value");
      expect(value).toBeInTheDocument();
    });
  });
});
