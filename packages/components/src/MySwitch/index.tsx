import { isNil } from "@noah-libjs/utils";
import React, { useEffect, useState } from "react";
import { Switch_L } from "../LazyAntd";
import { TCommonComponent } from "../util-types";
import { IMySwitchProps } from "./types";
import { MyCheckbox } from '../MyCheckbox';
import { MyIcon } from '../MyIconSelect';
import { form_item_read } from "../utils";
const MySwitch: TCommonComponent<IMySwitchProps, boolean> = function MySwitch(props) {
    const { checked_value = true, unchecked_value = false, onChange, value } = props
    const [is_r, n] = form_item_read(props, <MySwitch.DisplayFC {...props} />)
    if (is_r)
        return n

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

MySwitch.DisplayFC = ({ value, checkedChildren, unCheckedChildren }) => {
    if (isNil(value))
        return ''
    return value ? (checkedChildren ?? <MyIcon value='CheckOutlined' />) : (unCheckedChildren ?? <MyIcon value='CloseOutlined' />);
}

export { MySwitch };

