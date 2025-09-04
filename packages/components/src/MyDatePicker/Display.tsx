import { EMPTY_PLACEHOLDER, getMomentObj } from '@noah-libjs/utils';
import React from 'react';
import { IMyDatePickerProps, formatDatePickerProps, getIsUnknown } from './utils';


export const DisplayFC = (_props: IMyDatePickerProps) => {
  const props = formatDatePickerProps(_props)

  const { value, format } = props
  if(!value) return null
  const isUnknown = getIsUnknown(props)

  const m = getMomentObj(value)
  return <span>
    {isUnknown ? '不详' : (m.isValid() ? m.format(format) : EMPTY_PLACEHOLDER)}
  </span>
}