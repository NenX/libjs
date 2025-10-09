import dayjs from 'dayjs';
import React, { memo, useCallback } from 'react';
import { RangePicker_L } from '../LazyAntd';
import { getInputStyle } from '../utils';
import { IMyRangePickerProps, areEqual, format_range_props, handleChangeValue } from './utils';
export { IMyRangePickerProps } from './utils';

function MyRangePickerInner(_props: IMyRangePickerProps) {
  const props = format_range_props(_props)
  const {
    value = undefined,
    onChange,
    marshal,
    minDate,
    maxDate,
    validDate,
    getPopupContainer,
    showUnknown,
    format,
    style,
    ...rest
  } = props

  const _style = getInputStyle(props)



  const handleChange = (date: (any)[] | null, dateString?: string[]) => {
    date = date ?? []
    const _value = handleChangeValue(props, date)

    onChange?.(_value);
  }

  const disabledDate = useCallback(
    (current: dayjs.Dayjs) => {
      const dateStr = dayjs(current).format(format);
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
    [validDate, maxDate, minDate, format],
  )




  return (
    <span>
      <RangePicker_L
        style={_style}
        getPopupContainer={getPopupContainer}
        value={value as any}
        onChange={handleChange}
        disabledDate={disabledDate}
        format={format}
        {...rest}
        placeholder={['开始', '结束']}
      // disabled={isUnknown}

      />

    </span>
  );
}
// const RangePicker_ = memo<IMyRangePickerProps>(MyRangePickerInner, areEqual)
const RangePicker_ = MyRangePickerInner

export default RangePicker_