import * as React from 'react';
import { TimePickerInner, TimePickerProps } from './Base';
import { Dayjs } from 'dayjs'


const TimePicker_L = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <TimePickerInner {...props} ref={ref} />;
});

TimePicker_L.displayName = 'TimePicker';

export {
  TimePicker_L,
  TimePickerProps,
  Dayjs
};
