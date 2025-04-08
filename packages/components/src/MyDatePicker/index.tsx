import { lazy } from 'react';
import { TCommonComponent } from 'src/util-types';
import { DisplayFC } from './Display';
import { IMyDatePickerProps } from './utils';
export { IMyDatePickerProps as ICusDatePickerProps, UNKNOWN_TIME_SYMBOL } from './utils';
export { TMyDatePicker };

type TMyDatePicker = TCommonComponent<IMyDatePickerProps, string>
const MyDatePicker: TMyDatePicker = lazy(() => import('./Inner'))

MyDatePicker.DisplayFC = DisplayFC

export default MyDatePicker