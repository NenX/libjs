import React, { FC, lazy } from 'react';
import { ICheckInvertButtonProps } from './types';
const Inner = lazy(() => import('./Inner'))
export * from './types'
const CheckInvertButton: FC<any> = function CheckInvertButton(props: ICheckInvertButtonProps) {
  return <Inner {...props} />
}
CheckInvertButton.displayName = 'CheckInvertButton'
export { CheckInvertButton }