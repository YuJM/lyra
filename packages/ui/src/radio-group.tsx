// Base UI RadioGroup 공식 컴포넌트 re-export
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";

// Base UI 컴포넌트를 그대로 export
export const RadioGroup = BaseRadioGroup;

// 타입도 Base UI에서 가져오기
export type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup>;
