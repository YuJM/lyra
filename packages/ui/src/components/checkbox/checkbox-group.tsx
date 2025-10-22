// Base UI CheckboxGroup 공식 컴포넌트 re-export
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";

// Base UI 컴포넌트를 그대로 export
export const CheckboxGroup = BaseCheckboxGroup;

// 타입도 Base UI에서 가져오기
export type CheckboxGroupProps = React.ComponentProps<typeof BaseCheckboxGroup>;
