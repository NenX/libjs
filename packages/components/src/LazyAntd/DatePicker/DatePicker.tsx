import * as React from 'react';
import { DatePickerInner, DatePickerProps } from './Base';
import { Dayjs } from 'dayjs'

const DatePicker_L = React.forwardRef<any, DatePickerProps>((props, ref) => {
  return <DatePickerInner {...props} ref={ref} />;
});

DatePicker_L.displayName = 'TimePicker';

export {
  Dayjs,
  DatePicker_L,
  DatePickerProps
};
