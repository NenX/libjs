import { GetProps } from 'antd';
import { lazy } from 'react';
export { Dayjs} from 'dayjs'

export const DatePickerInner = lazy(() => import('./DatePicker').then(r => {
    return { "default": r.DatePicker }
}));
export type DatePickerProps = GetProps<typeof DatePickerInner>

export const RangePickerInner = lazy(() => import('./DatePicker').then(r => {
    return { "default": r.DatePicker.RangePicker }
}));
export type RangePickerProps = GetProps<typeof RangePickerInner>


export const MonthPickerInner = lazy(() => import('./DatePicker').then(r => {
    return { "default": r.DatePicker.MonthPicker }
}));
export type MonthPickerProps = GetProps<typeof MonthPickerInner>

export const TimePickerInner = lazy(() => import('./DatePicker').then(r => {
    return { "default": r.DatePicker.TimePicker }
}));
export type TimePickerProps = GetProps<typeof TimePickerInner>

export const CalendarInner = lazy(() => import('./Calendar'));

export type CalendarProps = GetProps<typeof CalendarInner>



