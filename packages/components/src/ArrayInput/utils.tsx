import { getPresetOptions, getSimpleOptions, ICommonOption } from '@noah-libjs/utils';

import { IArrayInputProps } from "./types";

export function getOption(props: IArrayInputProps) {
    const _options = props.options
    const optionKey: any = props.optionKey
    const preOptions = optionKey ? getPresetOptions(optionKey) : null
    const sp = props.sp ?? []
    const options = preOptions ?? (typeof _options === 'string' ? getSimpleOptions(_options, { sp }) : _options) ?? []
    return options as ICommonOption[]
}