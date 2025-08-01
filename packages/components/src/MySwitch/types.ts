import { SwitchProps } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";

export type IMySwitchProps = SwitchProps & {
    size?: SizeType,
    checked_value?: any,
    unchecked_value?: any,
    checked_text?: string,
    unchecked_text?: string,
    switch_type?: 'switch' | 'checkbox'
}