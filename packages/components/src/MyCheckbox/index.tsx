import { lazy } from 'react';
import { TCommonComponent } from '../util-types';
import { IMyCheckboxProps } from './types';
export * from './types';

const MyCheckbox: TCommonComponent<IMyCheckboxProps> = lazy(() => import('./Inner'));

const MyCheckbox_Display = lazy(() => import('./Display'));

MyCheckbox.DisplayFC = MyCheckbox_Display

export { MyCheckbox_Display, MyCheckbox }