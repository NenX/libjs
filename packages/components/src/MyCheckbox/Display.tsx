import { ICommonOption } from '@noah-libjs/utils';
import React from 'react';
import { TCommonComponentDisplay } from 'src/util-types';
import { IMyCheckboxProps } from './types';
import { displayValue, getMarshal, parse_MC_option, parseValue } from './utils';
export * from './types';
const MyCheckbox_DisplayFC: TCommonComponentDisplay<IMyCheckboxProps, string | number | ICommonOption[]> = props => {
    const { value, type = 'single', uniqueKey } = props



    const _options = parse_MC_option(props)
    const _marshal = getMarshal(props)

    const _value = parseValue(value, _marshal, type)



    return <span>{displayValue(_options, _value)}</span>
}
export default MyCheckbox_DisplayFC