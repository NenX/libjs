import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { isNil } from "@noah-libjs/utils";
import React from "react";
import { Switch_L } from "../LazyAntd";
import { TCommonComponent } from "../util-types";
import { IMySwitchProps } from "./types";
import { MyCheckbox } from '../MyCheckbox';
const MySwitch: TCommonComponent<IMySwitchProps, boolean> = function MySwitch(props) {
    const { checked_value = true, unchecked_value = false, onChange, value } = props
    if (props.switch_type === 'checkbox')
        return <MyCheckbox {...props} options={[{ value: checked_value }]} marshal={0}

            value={value === checked_value ? checked_value : null}

            onChange={v => {
                console.log('switch', v)

                onChange?.(v === null ? unchecked_value : checked_value)
            }} />
    return <Switch_L
        {...props}

        value={value === checked_value}

        onChange={v => {
            onChange?.(v !== true ? unchecked_value : checked_value)
        }}
    />
}

MySwitch.DisplayFC = ({ value, checkedChildren, checked_text, unCheckedChildren, unchecked_text }) => {
    if (isNil(value))
        return ''
    return value ? (checkedChildren ?? checked_text ?? <CheckOutlined />) : (unCheckedChildren ?? unchecked_text ?? <CloseOutlined />);
}

export { MySwitch };

