import { lazy } from 'react';
import { TCommonComponent } from '../util-types';
import { IArrayInputProps } from './types';
export const ArrayInput: TCommonComponent<IArrayInputProps, string> = lazy(() => import('./Inner'))

ArrayInput.DisplayFC = lazy(() => import('./DispalyInner'))
export * from './types';
