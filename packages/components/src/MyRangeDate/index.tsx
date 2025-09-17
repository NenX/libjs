import { lazy } from 'react';
import { TCommonComponent } from '../util-types';
import { DisplayFC } from './Display';
import { IMyRangePickerProps, MyValue } from './utils';
import React from 'react';
import dayjs from 'dayjs';
export { IMyRangePickerProps }
type TMyDatePicker = TCommonComponent<IMyRangePickerProps, MyValue>
export const MyRangePicker: TMyDatePicker = lazy(() => import('./Inner'))


export const MyRangeDate: TMyDatePicker = function (props) {
    const { placeholder, ...rest } = props
    return (
        <MyRangePicker
            // ranges={getMomentRange(dayjs) as any}
            format="YYYY-MM-DD"
            style={{ width: 230 }}

            {...rest}

        />
    );
}
export const MyRangeDateTime: TMyDatePicker = function (props: IMyRangePickerProps) {
    const { placeholder, ...rest } = props
    return (
        <MyRangePicker
            // ranges={getMomentRange(dayjs) as any}
            showTime={{
                defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('23:59', 'HH:mm')],
            }}
            format="YYYY-MM-DD HH:mm"
            style={{ width: 320 }}
            {...rest}

        />
    );
}


MyRangeDate.DisplayFC = DisplayFC
MyRangeDateTime.DisplayFC = DisplayFC
MyRangePicker.DisplayFC = DisplayFC
