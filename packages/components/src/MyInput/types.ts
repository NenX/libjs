import { FormInstance, InputProps } from 'antd';




export interface IMyInputProps extends Omit<InputProps, 'value' | 'onChange' | 'form'> {
    value?: string
    onChange?(v: string): void
    form?: FormInstance
    warning?: boolean
}