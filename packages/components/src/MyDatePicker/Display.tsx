import { EMPTY_PLACEHOLDER, getMomentObj } from '@noah-libjs/utils';
import React from 'react';
import { IMyDatePickerProps, formatDatePickerProps, getIsUnknown } from './utils';


export const DisplayFC = (_props: IMyDatePickerProps) => {
  const props = formatDatePickerProps(_props)

  const { value, format } = props
  if (!value) return EMPTY_PLACEHOLDER

  if (getIsUnknown(props))
    return <span>不详</span>

  if (props.time_only)
    return <span>{value}</span>

  const m = getMomentObj(value)
  return <span>
    {m.isValid() ? m.format(format) : EMPTY_PLACEHOLDER}
  </span>
}