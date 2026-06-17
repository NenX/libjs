import { presets_range } from '@noah-libjs/utils';
import { Radio, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { RangePicker_L } from '../LazyAntd';
import { getInputStyle } from '../utils';
import { IMyRangePickerProps, format_changed_value, format_range_props } from './utils';
export { IMyRangePickerProps } from './utils';

function MyRangePickerInner(_props: IMyRangePickerProps) {
  const safe_props = format_range_props(_props)
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
    quick_selector,
    size,
    ...rest
  } = safe_props

  const _style = getInputStyle(safe_props)



  const handleChange = (date: (any)[] | null, dateString?: [string, string]) => {
    console.log('range picker', date, dateString)
    if (!date) {
      onChange?.(date)
      return
    }
    date = date ?? []
    const _value = format_changed_value(safe_props, date, dateString)

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

  const presets = presets_range()
  const presets_filtered = quick_selector ? presets.filter(p => quick_selector.includes(p.label)) : null
  const node = <RangePicker_L
    style={_style}
    getPopupContainer={getPopupContainer}
    value={value as any}
    onChange={handleChange}
    disabledDate={disabledDate}
    format={format}
    size={size}
    {...rest}
    placeholder={['开始', '结束']}
  // disabled={isUnknown}

  />
  if (!presets_filtered) {
    return node
  }
  return (
    <Space.Compact size={size}>
      {node}
      <Radio.Group size={size}>
        {/* {presets_filtered.map(({ label, value }) => (
            <a key={label as string} onClick={() => {
              handleChange(value as any,)
            }} style={{ marginRight: 8 }}>{label}</a>
          ))} */}
        {presets_filtered.map(({ label, value }) => (
          <Radio.Button key={label as string} onClick={() => {
            handleChange(value as any,)
          }} >{label}</Radio.Button>
        ))}
      </Radio.Group>
    </Space.Compact>
  );
}
// const RangePicker_ = memo<IMyRangePickerProps>(MyRangePickerInner, areEqual)
const RangePicker_ = MyRangePickerInner

export default RangePicker_