import { Checkbox, InputNumber, InputNumberProps } from 'antd';
import React from 'react';
import { TCommonComponent } from 'src/util-types';
import { getInputStyle } from 'src/utils';
import { IMyInputNumberProps } from './types';
export * from './types';
// .ant-input-affix-wrapper-borderless
const UNKNOWN_NUMBER_SYMBOL = 2147483647
type IProps = InputNumberProps
const MyInputNumber: TCommonComponent<IMyInputNumberProps> = function MyInputNumber_(props) {
  const { unknown, value, onChange, placeholder, warning, disabled, ...others } = props
  console.log('xxd', props)
  const _style = getInputStyle(props)
  const isUnkown = !!unknown && value === UNKNOWN_NUMBER_SYMBOL
  if (unknown) {
    _style.flex = 1;
  }

  // const node = <Input disabled={disabled} {...others} placeholder={placeholder ?? '请输入数值'} allowClear style={_style} type='number' value={isUnkown ? undefined : value!} onChange={e => onChange?.(e.target.value)} />
  const node = <InputNumber {...others}
    disabled={disabled}
    placeholder={placeholder ?? '请输入'}
    style={{ width: '100%', ..._style, }}
    value={isUnkown ? undefined : value}
    onChange={onChange}
  />

  return unknown ? <span style={{ display: 'flex', alignItems: 'center' }}>
    {node}
    <span style={{ marginLeft: 6 }}>
      <Checkbox
        disabled={disabled}
        checked={isUnkown}
        skipGroup
        onChange={e => {
          const _value: any = e.target.checked ? UNKNOWN_NUMBER_SYMBOL : null
          onChange?.(_value)
        }}
      />
      <span style={{ marginLeft: 6 }}>不详</span>

    </span>
  </span> : node
}
function DisplayFC(props: Omit<IProps, 'onChange'> & { unknown?: boolean, warning?: boolean, onChange?: (v: any) => void }) {
  const { unknown, value, } = props
  const _style = getInputStyle(props)
  const isUnkown = !!unknown && value === UNKNOWN_NUMBER_SYMBOL
  if (isUnkown) {
    return <span>不详</span>
  }

  return <span title='DisplayFC' style={_style}>{value}</span>
}
MyInputNumber.DisplayFC = DisplayFC

export { MyInputNumber }

