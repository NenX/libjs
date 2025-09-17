

import { isArray, isString, safe_json_parse, safe_json_parse_arr, safe_json_stringify } from '@noah-libjs/utils';
import dayjs, { Dayjs } from 'dayjs';
import { RangePickerProps } from 'src/LazyAntd';
export const defaultGetPopupContainer = () => document.body

export function areEqual(prevProps: IMyRangePickerProps, nextProps: IMyRangePickerProps) {
    if (prevProps.value !== nextProps.value) {
        return false
    }

    return true

}
// type RangeValue<T> = [T, T]
type RangeValue<T> = any[]
export type MyValue = RangeValue<Dayjs | string | null | undefined> | string | null | undefined
export type IMyRangePickerProps = {
    marshal?: number
    value?: MyValue
    onChange?: (value: MyValue) => void
    linker?: string
    minDate?: any
    maxDate?: any
    validDate?: any
    getPopupContainer?: any
    format?: any
    showUnknown?: boolean
} & Omit<RangePickerProps, 'value' | 'disabled'>

export function process_value_remote(value: MyValue, marshal: number, linker: string) {
    const _value = value
    let safeValue: any[] = []
    if (isArray(_value)) return _value
    switch (marshal) {
        case 0:
            if (isString(_value))
                safeValue = _value.split(linker)
            break;
        case 1:
            if (isString(_value))
                safeValue = safe_json_parse_arr(_value)
            break;
        default:
            if (isArray(_value))
                safeValue = _value
            break;
    }



    return Array.isArray(safeValue) ? safeValue : []


}
export function format_range_props(props: IMyRangePickerProps) {
    const data = { ...props }
    data.format = data.format ?? 'YYYY-MM-DD'
    data.marshal = data.marshal ?? 1
    data.linker = data.linker ?? ','
    const _value = props.value
    let safeValue = process_value_remote(_value, data.marshal, data.linker)


    data.value = safeValue.map(_ => dayjs(_, data.format))
    data.display_value = safeValue
    data.getPopupContainer = data.getPopupContainer ?? defaultGetPopupContainer
    return data
}


export const handleChangeValue = ({ format, marshal, linker }: IMyRangePickerProps, date?: (Dayjs | null)[],) => {
    if (!date) return null
    const format_date = date.map(_ => _?.format(format) ?? null)
    console.log('format change', { marshal, format_date })
    switch (marshal) {
        case 0:
            return format_date.join(linker)
        case 1:
            return safe_json_stringify(format_date)

        default:
            return format_date

    }

}