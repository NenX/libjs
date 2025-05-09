import { presets_date } from '@noah-libjs/utils';
import { Checkbox } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { DatePicker_L, MonthPicker_L, TimePicker_L } from 'src/LazyAntd';
import { TCommonComponent } from 'src/util-types';
import { get_unknown_conf, getInputStyle } from 'src/utils';
import { formatDatePickerProps, getIsUnknown, handleChangeValue, IMyDatePickerProps, UNKNOWN_TIME_SYMBOL } from './utils';
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

  const node = props.time_only
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


    />


  return (

    get_unknown_conf(props)
      ? <span style={{ display: 'flex', alignItems: 'center' }}>
        {node}
        <span style={{ marginLeft: 6, flex: 1 }}>

          <Checkbox checked={isUnknown}
            skipGroup
            onChange={e => {
              const _value = e.target.checked ? UNKNOWN_TIME_SYMBOL : null

              const value = handleChangeValue(props, _value)

              onChange?.(value)

            }}
          />
          <span style={{ marginLeft: 6 }}>不详</span>
        </span>

      </span > : node
  );
}
const df = CusDatePicker
// const df = memo<IMyDatePickerProps>(CusDatePicker, areEqual)
CusDatePicker.MonthPicker = MonthPicker_L;
const MyDatePickerInner: TCommonComponent<IMyDatePickerProps, string> = df

export default MyDatePickerInner