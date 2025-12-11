import { isNil } from "@noah-libjs/utils";
import React, { useEffect, useState } from "react";
import { Switch_L } from "../LazyAntd";
import { TCommonComponent } from "../util-types";
import { IMySwitchProps } from "./types";
import { MyCheckbox } from '../MyCheckbox';
import { MyIcon } from '../MyIconSelect';
const MySwitch: TCommonComponent<IMySwitchProps, boolean> = function MySwitch(props) {
    const { checked_value = true, unchecked_value = false, onChange, value } = props

    const [local_value, setLocal_value] = useState<boolean>()
    useEffect(() => {

        setLocal_value(value)
        return () => {

        }
    }, [value])
    function local_change(v: boolean) {
        onChange?.(v)
        setLocal_value(v)

    }
    if (props.switch_type === 'checkbox')
        return <MyCheckbox {...props} options={[{ value: checked_value }]} marshal={0}

            value={local_value === checked_value ? checked_value : null}

            onChange={v => {
                console.log('switch', v)

                local_change(v === null ? unchecked_value : checked_value)
            }} />
    return <Switch_L
        {...props}

        value={local_value === checked_value}

        onChange={v => {
            local_change(v !== true ? unchecked_value : checked_value)
        }}
    />
}

MySwitch.DisplayFC = ({ value, checkedChildren, checked_text, unCheckedChildren, unchecked_text }) => {
    if (isNil(value))
        return ''
    return value ? (checkedChildren ?? checked_text ?? <MyIcon value='CheckOutlined' />) : (unCheckedChildren ?? unchecked_text ?? <MyIcon value='CloseOutlined' />);
}

export { MySwitch };

