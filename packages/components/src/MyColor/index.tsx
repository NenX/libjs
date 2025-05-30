import { CloseOutlined } from "@ant-design/icons";
import { isString } from "@noah-libjs/utils";
import { Button, Space } from "antd";
import React from "react";
import { ColorPicker_L } from "src/LazyAntd";
import { TCommonComponent } from "../util-types";
import { IMyColorProps } from "./types";

const MyColor: TCommonComponent<IMyColorProps> = function MyColor(props) {
    const { value, onChange, size, allowClear = true } = props
    return <Space.Compact>
        <ColorPicker_L size={size} value={isString(value) ? value : undefined} onChange={(value, css) => onChange?.(css)} />
        {
            allowClear ? <Button size={size} icon={<CloseOutlined />} onClick={() => onChange?.(null)} /> : null
        }
    </Space.Compact>
}

MyColor.DisplayFC = (props) => {
    return <div style={{ display: 'inline-block', width: 24, height: 24, background: props.value }}></div>
}

export { MyColor };
