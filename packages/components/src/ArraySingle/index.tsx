import { lazy } from 'react';
import { TCommonComponent } from '../util-types';
import { IArraySingleProps } from './types';
export const ArraySingle: TCommonComponent<IArraySingleProps, string> = lazy(() => import('./Inner'))

ArraySingle.DisplayFC = lazy(() => import('./DispalyInner'))
export * from './types';
