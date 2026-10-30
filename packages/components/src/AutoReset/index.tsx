import { InputNumberProps } from 'antd';
import React from 'react';
export { InputNumberProps }
export function AutoReset(props: InputNumberProps) {
  React.useEffect(function () {
    if (props.value === 1) {
      // 通知宿主刷新后复位，确保下一次点击仍可触发。
      setTimeout(() => {
        props.onChange?.(0);
      }, 60);
    }
  }, [props.value]);
  return null;
}