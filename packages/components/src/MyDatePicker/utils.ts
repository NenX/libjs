

import { formatDate, formatDateTimeNoSecond } from '@noah-libjs/utils';
import dayjs from 'dayjs';
import { DatePickerProps } from 'src/LazyAntd';
import { get_unknown_conf } from 'src/utils';
export const defaultGetPopupContainer = () => document.body

export function areEqual(prevProps: any, nextProps: any) {
    if (prevProps.value !== nextProps.value) {
        return false
    }
    if (prevProps.disabled !== nextProps.disabled) {
        return false
    }
    return true

}
export const UNKNOWN_TIME_SYMBOL = '1970-01-01 00:00:00'
export type IMyDatePickerProps = {
    time_only?: boolean,
    value?: any
    onChange?: any
    valueType?: any
    minDate?: any
    maxDate?: any
    validDate?: any
    getPopupContainer?: any
    format?: any
    showUnknown?: boolean
    unknown?: boolean
} & Omit<DatePickerProps, 'value'>


export type ICommonProps = { format?: any, time_only?: boolean, showTime?: any, getPopupContainer?: any }
export function formatDatePickerProps<T extends ICommonProps>(props: T) {



    const data = { ...props }
    if (!data.format) {

        if (props.time_only) {
            data.format = 'HH:mm'
        } else {
            data.format = data.showTime ? formatDateTimeNoSecond.format : formatDate.format

        }
    }

    data.getPopupContainer = data.getPopupContainer ?? defaultGetPopupContainer
    return data
}

export function getIsUnknown(props: IMyDatePickerProps) {
    const { value, } = props
    const symbolValue = handleChangeValue(props, UNKNOWN_TIME_SYMBOL)
    const _value = handleChangeValue(props, value)
    const isUnknown = _value === symbolValue && get_unknown_conf(props)
    return isUnknown
}

export const handleChangeValue = ({ valueType, format }: IMyDatePickerProps, date?: any,) => {
    let result = date;
    if (valueType && date) {
        result = dayjs(date).format(valueType);
    }
    if (format && date) {
        result = dayjs(date).format(format);
    }
    return result

}