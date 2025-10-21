import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@lyra/ui";
import { useState } from "react";

const meta: Meta<typeof Checkbox.Root> = {
  component: Checkbox.Root,
  title: "Components/Checkbox",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox.Root>;

/**
 * 기본 Checkbox - Composable 방식
 */
export const Default: Story = {
  render: () => (
    <Checkbox.Root>
      <Checkbox.Indicator />
    </Checkbox.Root>
  ),
};

/**
 * 라벨이 있는 Checkbox
 */
export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span className="text-sm text-gray-700">이용약관에 동의합니다</span>
    </label>
  ),
};

/**
 * 제어 컴포넌트 (Controlled)
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span className="text-sm text-gray-700">알림 받기</span>
          </label>
          <p className="text-xs text-gray-500">
            상태: {checked ? "선택됨" : "선택 안됨"}
          </p>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
        <Checkbox.Root disabled>
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span className="text-sm text-gray-500">비활성화됨 (선택 안됨)</span>
      </label>

      <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
        <Checkbox.Root disabled defaultChecked>
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span className="text-sm text-gray-500">비활성화됨 (선택됨)</span>
      </label>
    </div>
  ),
};

/**
 * Indeterminate 상태
 */
export const Indeterminate: Story = {
  render: () => {
    const IndeterminateExample = () => {
      const [checked, setChecked] = useState<boolean | "indeterminate">(
        "indeterminate",
      );

      return (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
              <Checkbox.Indicator>
                {checked === "indeterminate" ? (
                  <Checkbox.IndeterminateIcon />
                ) : (
                  <Checkbox.CheckIcon />
                )}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm text-gray-700">전체 선택</span>
          </label>
          <p className="text-xs text-gray-500">
            상태:{" "}
            {checked === "indeterminate"
              ? "일부 선택"
              : checked
                ? "전체 선택"
                : "선택 안됨"}
          </p>
        </div>
      );
    };
    return <IndeterminateExample />;
  },
};

/**
 * 다양한 크기
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox.Root size="sm">
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span className="text-xs text-gray-700">작은 크기</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox.Root size="md">
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span className="text-sm text-gray-700">보통 크기</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox.Root size="lg">
          <Checkbox.Indicator />
        </Checkbox.Root>
        <span className="text-base text-gray-700">큰 크기</span>
      </label>
    </div>
  ),
};

/**
 * 다양한 변형 (Variants)
 */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-gray-600">Default</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox.Root variant="default" defaultChecked>
            <Checkbox.Indicator variant="default" />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">기본 스타일</span>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-gray-600">Outline</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox.Root variant="outline" defaultChecked>
            <Checkbox.Indicator variant="outline" />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">아웃라인 스타일</span>
        </label>
      </div>
    </div>
  ),
};

/**
 * 편의 컴포넌트 - Label, Description, Error 포함
 */
export const WithLabelDescriptionError: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Checkbox label="기본 라벨" />

      <Checkbox
        label="설명이 있는 체크박스"
        description="이것은 체크박스에 대한 추가 설명입니다."
      />

      <Checkbox
        label="에러가 있는 체크박스"
        error="이 필드는 필수입니다."
      />

      <Checkbox
        label="비활성화된 체크박스"
        description="이 체크박스는 선택할 수 없습니다."
        disabled
      />
    </div>
  ),
};

/**
 * 폼 통합 예제
 */
export const FormIntegration: Story = {
  render: () => {
    const FormExample = () => {
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <Checkbox
              label="이용약관 동의 (필수)"
              name="terms"
              value="accepted"
              required
            />
            <Checkbox label="뉴스레터 구독" name="newsletter" value="subscribed" />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              제출
            </button>
          </div>
        </form>
      );
    };
    return <FormExample />;
  },
};
