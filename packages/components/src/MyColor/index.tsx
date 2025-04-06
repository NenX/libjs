import { CloseOutlined } from "@ant-design/icons";
import { isString } from "@noah-libjs/utils";
import { Button, Space } from "antd";
import React from "react";
import { ColorPicker_L, ColorPickerProps } from "src/LazyAntd";

export function MyColor(props: Omit<ColorPickerProps, 'value' | 'onChange'> & { value?: string | null, onChange?(v: string | null): void }) {
    const { value, onChange, size } = props
    return <Space.Compact>
        <ColorPicker_L size={size} value={isString(value) ? value : undefined} onChange={(value, css) => onChange?.(css)} />
        <Button size={size} icon={<CloseOutlined />} onClick={() => onChange?.(null)} />
    </Space.Compact>
}