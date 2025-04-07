import { CloseOutlined } from "@ant-design/icons";
import { isString } from "@noah-libjs/utils";
import { Button, Space } from "antd";
import React from "react";
import { ColorPicker_L } from "src/LazyAntd";
import { TCommonComponent } from "src/types";
import { IMySwitchProps } from "./types";

const MySwitch: TCommonComponent<IMySwitchProps, string> = function MySwitch(props) {
    const { value, onChange, size } = props
    return <Space.Compact>
        <ColorPicker_L size={size} value={isString(value) ? value : undefined} onChange={(value, css) => onChange?.(css)} />
        <Button size={size} icon={<CloseOutlined />} onClick={() => onChange?.(null)} />
    </Space.Compact>
}

MySwitch.DisplayFC = (props) => {
    return props.checked ? (props.checkedChildren ?? '是') : (props.unCheckedChildren ?? '否');
}

export { MySwitch };
