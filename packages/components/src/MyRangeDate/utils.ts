

import { safe_json_parse, safe_json_parse_arr } from '@noah-libjs/utils';
import { Dayjs } from 'dayjs';
import { RangePickerProps } from 'src/LazyAntd';
export const defaultGetPopupContainer = () => document.body

export function areEqual(prevProps: RangePickerProps, nextProps: RangePickerProps) {
    if (prevProps.value !== nextProps.value) {
        return false
    }
    if (prevProps.disabled !== nextProps.disabled) {
        return false
    }
    return true

}
type RangeValue<T> = [T, T]
type MyValue = RangeValue<string | null | undefined> | string | null
export type IMyRangePickerProps = {
    marshal?: number
    value?: MyValue
    onChange?: (value: MyValue) => void

    minDate?: any
    maxDate?: any
    validDate?: any
    getPopupContainer?: any
    format?: any
    showUnknown?: boolean
} & Omit<RangePickerProps, 'value' | 'disabled'>

export function formatProps(props: IMyRangePickerProps) {
    const data = { ...props }
    data.format = data.format ?? 'YYYY-MM-DD'
    data.marshal = data.marshal ?? 1
    const _value = props.value
    let safeValue = typeof _value === 'string' ? safe_json_parse_arr(_value) : _value
    safeValue = Array.isArray(safeValue) ? safeValue : []


    data.value = safeValue
    data.getPopupContainer = data.getPopupContainer ?? defaultGetPopupContainer
    return data
}

export function getIsUnknown(props: IMyRangePickerProps) {

    return false
}

export const handleChangeValue = ({ format }: IMyRangePickerProps, date?: (Dayjs | null)[],) => {
    let result = date ?? [];

    if (format && date) {
        return date.map(_ => _ ? _.format(format) : null)
    }
    return result

}