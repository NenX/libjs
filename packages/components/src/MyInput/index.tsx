import { Input, InputRef } from 'antd';
import React, { forwardRef, useEffect, useState } from 'react';
import { getInputStyle, } from '../utils';
import { IMyInputProps } from './types';
import { TCommonComponent } from '../util-types';
import { MyInputNumber } from '../MyInputNumber';
export * from './types';
const MyInput: TCommonComponent<IMyInputProps, string> = forwardRef<InputRef, IMyInputProps>((props, myRef) => {
    const { width, style = {}, placeholder, name, warning, form, value, onChange, type, ...others } = props

    if (type === 'number') return <MyInputNumber {...(props as any)} />
    const [_value, set_value] = useState(value)

    useEffect(() => {
        set_value(value)
    }, [value])
    const _style = getInputStyle(props)


    return <Input title={JSON.stringify(_style)} ref={myRef} value={_value}
        onChange={e => {
            const v = e.target.value
            set_value(v)
            onChange?.(v)
        }}



        style={_style}
        {...others}
        // placeholder={placeholder ?? '请输入'}
        placeholder={'请输入'}
    />
})


MyInput.DisplayFC = (props) => {
    return props.value
}

export { MyInput }