import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup, Checkbox } from "@lyra/ui";
import { useState } from "react";

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  title: "CheckboxGroup",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

/**
 * 기본 CheckboxGroup - Composable 방식
 */
export const Default: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["option1"]}>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox.Root name="option1" value="option1">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">옵션 1</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox.Root name="option2" value="option2">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">옵션 2</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox.Root name="option3" value="option3">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">옵션 3</span>
        </label>
      </div>
    </CheckboxGroup>
  ),
};

/**
 * 제어 컴포넌트
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [values, setValues] = useState<string[]>(["option2"]);

      return (
        <div>
          <CheckboxGroup value={values} onValueChange={setValues}>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox.Root name="option1" value="option1">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span className="text-sm text-gray-700">옵션 1</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox.Root name="option2" value="option2">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span className="text-sm text-gray-700">옵션 2</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox.Root name="option3" value="option3">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span className="text-sm text-gray-700">옵션 3</span>
              </label>
            </div>
          </CheckboxGroup>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p className="font-semibold">선택된 값:</p>
            <p className="text-gray-600">
              {values.length > 0 ? values.join(", ") : "없음"}
            </p>
          </div>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

/**
 * Parent Checkbox (전체 선택/해제)
 */
export const WithParent: Story = {
  render: () => {
    const ParentExample = () => {
      const allValues = ["apple", "banana", "orange", "grape"];
      const [values, setValues] = useState<string[]>(["apple"]);

      return (
        <div>
          <CheckboxGroup
            value={values}
            onValueChange={setValues}
            allValues={allValues}
          >
            <div className="flex flex-col gap-3">
              {/* Parent Checkbox - 간소화된 버전 */}
              <label className="flex items-center gap-2 cursor-pointer border-b pb-2">
                <Checkbox parent />
                <span className="text-sm font-semibold text-gray-700">
                  전체 과일
                </span>
              </label>

              {/* Child Checkboxes - 간소화된 버전 */}
              <div className="pl-6 flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox name="apple" value="apple" />
                  <span className="text-sm text-gray-700">사과 🍎</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox name="banana" value="banana" />
                  <span className="text-sm text-gray-700">바나나 🍌</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox name="orange" value="orange" />
                  <span className="text-sm text-gray-700">오렌지 🍊</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox name="grape" value="grape" />
                  <span className="text-sm text-gray-700">포도 🍇</span>
                </label>
              </div>
            </div>
          </CheckboxGroup>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p className="font-semibold">선택된 과일:</p>
            <p className="text-gray-600">
              {values.length > 0 ? values.join(", ") : "없음"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {values.length}/{allValues.length} 선택됨
            </p>
          </div>
        </div>
      );
    };
    return <ParentExample />;
  },
};

/**
 * 중첩된 Parent Checkbox
 */
export const NestedParent: Story = {
  render: () => {
    const NestedExample = () => {
      const allFruits = ["apple", "banana"];
      const allVegetables = ["carrot", "tomato"];
      const allFoods = [...allFruits, ...allVegetables];

      const [selectedFoods, setSelectedFoods] = useState<string[]>(["apple"]);

      return (
        <div>
          {/* Level 1: 최상위 그룹 */}
          <CheckboxGroup
            value={selectedFoods}
            onValueChange={setSelectedFoods}
            allValues={allFoods}
          >
            <div className="flex flex-col gap-4">
              {/* Level 1 Parent */}
              <label className="flex items-center gap-2 cursor-pointer border-b-2 pb-2">
                <Checkbox.Root parent>
                  <Checkbox.Indicator>
                    <Checkbox.CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-base font-bold text-gray-700">
                  모든 음식
                </span>
              </label>

              <div className="pl-6 flex flex-col gap-4">
                {/* Level 2-1: 과일 그룹 */}
                <CheckboxGroup
                  value={selectedFoods}
                  onValueChange={setSelectedFoods}
                  allValues={allFruits}
                >
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer border-b pb-1">
                      <Checkbox.Root parent>
                        <Checkbox.Indicator>
                          <Checkbox.CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-sm font-semibold text-gray-700">
                        과일
                      </span>
                    </label>
                    <div className="pl-6 flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root name="apple" value="apple">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span className="text-sm text-gray-700">사과 🍎</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root name="banana" value="banana">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span className="text-sm text-gray-700">바나나 🍌</span>
                      </label>
                    </div>
                  </div>
                </CheckboxGroup>

                {/* Level 2-2: 채소 그룹 */}
                <CheckboxGroup
                  value={selectedFoods}
                  onValueChange={setSelectedFoods}
                  allValues={allVegetables}
                >
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer border-b pb-1">
                      <Checkbox.Root parent>
                        <Checkbox.Indicator>
                          <Checkbox.CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-sm font-semibold text-gray-700">
                        채소
                      </span>
                    </label>
                    <div className="pl-6 flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root name="carrot" value="carrot">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span className="text-sm text-gray-700">당근 🥕</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox.Root name="tomato" value="tomato">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span className="text-sm text-gray-700">토마토 🍅</span>
                      </label>
                    </div>
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          </CheckboxGroup>

          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p className="font-semibold">선택된 음식:</p>
            <p className="text-gray-600">
              {selectedFoods.length > 0 ? selectedFoods.join(", ") : "없음"}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              <p>
                과일: {allFruits.filter((f) => selectedFoods.includes(f)).length}
                /{allFruits.length}
              </p>
              <p>
                채소:{" "}
                {allVegetables.filter((v) => selectedFoods.includes(v)).length}/
                {allVegetables.length}
              </p>
              <p className="font-semibold mt-1">
                전체: {selectedFoods.length}/{allFoods.length}
              </p>
            </div>
          </div>
        </div>
      );
    };
    return <NestedExample />;
  },
};

/**
 * 비활성화된 CheckboxGroup
 */
export const Disabled: Story = {
  render: () => (
    <CheckboxGroup disabled defaultValue={["option1", "option2"]}>
      <div className="flex flex-col gap-3 opacity-50">
        <label className="flex items-center gap-2 cursor-not-allowed">
          <Checkbox.Root name="option1" value="option1">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">옵션 1</span>
        </label>
        <label className="flex items-center gap-2 cursor-not-allowed">
          <Checkbox.Root name="option2" value="option2">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">옵션 2</span>
        </label>
        <label className="flex items-center gap-2 cursor-not-allowed">
          <Checkbox.Root name="option3" value="option3">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span className="text-sm text-gray-700">옵션 3</span>
        </label>
      </div>
    </CheckboxGroup>
  ),
};
