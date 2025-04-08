import React, { lazy } from 'react';
import { IMyAutoCompleteProps } from './types';
import { TCommonComponent } from 'src/util-types';
const MyAutoComplete: TCommonComponent<IMyAutoCompleteProps> = lazy(() => import('./Inner'))
export { IMyAutoCompleteProps as MyAutoCompleteProps } from './types';

MyAutoComplete.DisplayFC = props => <span>{props.value}</span>

export { MyAutoComplete }