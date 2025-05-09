import { SwitchProps } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";

export type IMySwitchProps = SwitchProps & { size?: SizeType, checkedText?: string, uncheckedText?: string, }