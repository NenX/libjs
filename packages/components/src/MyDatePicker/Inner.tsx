import { Checkbox } from 'antd';
import dayjs from 'dayjs';
import React, { memo, useCallback } from 'react';
import { IMyDatePickerProps, UNKNOWN_TIME_SYMBOL, areEqual, formatDatePickerProps, getIsUnknown, getUnknown, handleChangeValue } from './utils';
import { DatePicker_L, MonthPicker_L, TimePicker_L } from 'src/LazyAntd';
import { getInputStyle } from 'src/utils';
import { TCommonComponent } from 'src/util-types';
import { presets_date, getMomentRange } from '@noah-libjs/utils';
export { IMyDatePickerProps as ICusDatePickerProps, UNKNOWN_TIME_SYMBOL } from './utils';
function CusDatePicker(_props: IMyDatePickerProps) {
  const props = formatDatePickerProps(_props)
  const {
    value = undefined,
    onChange,
    valueType,
    minDate,
    maxDate,
    validDate,
    getPopupContainer,
    time_only,
    format,
    style,
    ...rest
  } = props
  const isUnknown = getIsUnknown(props)
  const _style = getInputStyle(props)



  const transValue = useCallback(
    (date?: any) => {
      let result = undefined;
      if (!!date) {
        result = dayjs(date, format);
      }
      return result;
    },
    [],
  )


  const handleChange = (date?: any, dateString?: string | string[]) => {
    const newValue = handleChangeValue(props, date)
    onChange?.(newValue);
  }

  const disabledDate = useCallback(
    (current: any) => {
      const dateStr = dayjs(current).format('YYYY-MM-DD');
      if (validDate) {
        return dateStr.includes(validDate);
      }

      if (minDate) {
        if (minDate === 'now') {
          return current < dayjs().endOf('day');
        }
        return current < dayjs(minDate).endOf('day');
      }

      if (maxDate) {
        if (maxDate === 'now') {
          return current > dayjs().endOf('day');
        }
        return current > dayjs(maxDate).endOf('day');
      }
      return false;
    },
    [validDate, maxDate, minDate],
  )




  return (
    <span>
      {
        props.time_only
          ? <TimePicker_L
            getPopupContainer={getPopupContainer}
            value={isUnknown ? null : transValue(value)}
            onChange={handleChange}
            disabledDate={disabledDate}
            format={format}
            {...rest}
            style={_style}
            placeholder={'请选择'}
          />
          : <DatePicker_L
            getPopupContainer={getPopupContainer}
            value={isUnknown ? null : transValue(value)}
            onChange={handleChange}
            disabledDate={disabledDate}
            format={format}
            presets={presets_date()}
            {...rest}
            style={_style}
            placeholder={'请选择'}

          // disabled={isUnknown}

          />
      }
      {
        getUnknown(props) ? <span style={{ marginLeft: 6 }}>
          <Checkbox checked={isUnknown}
            skipGroup
            onChange={e => {
              const _value = e.target.checked ? UNKNOWN_TIME_SYMBOL : null

              const value = handleChangeValue(props, _value)

              onChange?.(value)

            }}
          />
          <span style={{ marginLeft: 6 }}>不详</span>
        </span> : null
      }
    </span>
  );
}
const df = memo<IMyDatePickerProps>(CusDatePicker, areEqual)
CusDatePicker.MonthPicker = MonthPicker_L;
const MyDatePickerInner: TCommonComponent<IMyDatePickerProps, string> = df

export default MyDatePickerInner