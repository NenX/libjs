import * as React from 'react';
import { MonthPickerInner, MonthPickerProps } from './Base';


const MonthPicker_L = React.forwardRef<any, MonthPickerProps>((props, ref) => {
  return <MonthPickerInner {...props} ref={ref} />;
});

MonthPicker_L.displayName = 'TimePicker';


export {
  MonthPicker_L,
  MonthPickerProps
};