import { InputNumberProps } from 'antd';
export type { InputNumberProps as RcInputNumberProps, ValueType } from 'rc-input-number';
export type * from '@rc-component/mini-decimal/es/interface'
export type IMyInputNumberProps = Omit<InputNumberProps, 'onChange' | 'value'> & {
    unknown?: boolean,
    warning?: boolean,
    value?: any,
    onChange?: (v: any) => void
}
