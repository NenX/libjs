import { formitem_format_itemName_str, isBoolean, isNil, isObject, set_dirty } from '@noah-libjs/utils';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { get_check_invert_values } from 'src/utils/msmc';
import { ICheckInvertButtonProps } from './types';


export default function CheckInvertButtonInner(props: ICheckInvertButtonProps) {
  const {
    name,
    type = 'primary',
    check_invert_values,
    form,
    size = 'middle',
    value,
    onChange,
    onClick,
    config,
    form_event,
    ...input_props
  } = props
  const [isCheck, setIsCheck] = useState(isBoolean(value) ? value : false);
  console.log('isCheck', { isCheck, value, form, config })
  const handleClick = () => {
    const inverted_value = !isCheck
    setIsCheck(inverted_value);
    const k = formitem_format_itemName_str(config!)
    console.log('isCheck click', { isCheck, value, form, config, k })

    if (k) {
      onChange?.(inverted_value)
    }


    onClick?.(name, inverted_value);
    form_event?.emit('CheckInvertButton', `${name}`, inverted_value)
    if (!form) {
      message.warning('请设置 form !')
      return
    }
    const s = config?.siblings
    if (!s) return
    const checkValues = isObject(check_invert_values)
      ? check_invert_values
      : get_check_invert_values(s)
    if (checkValues) {
      const keys = Object.keys(checkValues)
      const old = form.getFieldsValue()

      keys.forEach((k, idx) => {
        const v = checkValues[k]
        const checkValue = inverted_value ? v?.[0] : v?.[1]
        set_dirty(old, k, checkValue)
      })
      console.log('isCheck set 123', { inverted_value, check_invert_values, old })
      form.setFieldsValue(old)
    }

  };

  return (
    <Button type={isCheck ? undefined : 'primary'} size={size} onClick={handleClick} {...input_props} >
      {isCheck ? '一键取消' : '一键勾选'}
    </Button>
  );
}