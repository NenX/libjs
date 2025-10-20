import { lazy } from 'react';
import { TCommonComponent } from '../util-types';
import { IMyIconSelectProps } from './types';
export * from './types';


const MyIcon = lazy(() => import('./MyIcon'))
const MyIconSelect: TCommonComponent<IMyIconSelectProps, string> = lazy(() => import('./MyIconSelect'))

MyIconSelect.DisplayFC = MyIcon

export { MyIcon, MyIconSelect };

