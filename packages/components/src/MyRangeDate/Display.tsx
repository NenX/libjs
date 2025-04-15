import { EMPTY_PLACEHOLDER, getMomentObj, isArray, isString, safe_json_parse, safe_json_parse_arr } from '@noah-libjs/utils';
import React from 'react';
import { IMyRangePickerProps, getIsUnknown } from './utils';
import { formatDatePickerProps } from 'src/MyDatePicker';


export const DisplayFC = (_props: IMyRangePickerProps) => {
  const props = formatDatePickerProps(_props)

  const { value } = props

  if (!value) return EMPTY_PLACEHOLDER

  if (isString(value)) return safe_json_parse<any[]>(value, null)?.join(' ~ ') ?? EMPTY_PLACEHOLDER

  if (isArray(value)) return value.join(' ~ ')

  return EMPTY_PLACEHOLDER
}