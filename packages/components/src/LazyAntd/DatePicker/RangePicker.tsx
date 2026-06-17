

import React from 'react';

import { RangePickerInner, RangePickerProps } from './Base';
import { presets_range } from '@noah-libjs/utils'


const RangePicker_L = React.forwardRef<any, RangePickerProps>((props, ref) => {
  return <RangePickerInner presets={presets_range()}  {...props} ref={ref} />;
});

RangePicker_L.displayName = 'RangePicker';

export {
  RangePicker_L,
  RangePickerProps,
};

