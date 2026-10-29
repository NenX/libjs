import { EventEmitter } from '@noah-libjs/utils';
import { FormInstance } from 'antd';
import { IMchc_FormDescriptions_Field_Nullable } from 'src/util-types';

export interface ICheckInvertButtonProps {
  [x: string]: any,
  form_event?: EventEmitter<any>
  form?: FormInstance,
  check_invert_values?: { [x: string]: [any, any] },
  config?: IMchc_FormDescriptions_Field_Nullable
}
