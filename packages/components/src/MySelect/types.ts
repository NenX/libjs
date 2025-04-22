import { ICommonOption, T_FETCH_OPTIONS } from '@noah-libjs/utils';
import { AutoCompleteProps, SelectProps } from 'antd';
import { IMyCheckboxProps } from 'src/MyCheckbox';
import { IMyDatePickerProps } from 'src/MyDatePicker/utils';
import { IMyInputProps } from 'src/MyInput';
import { IMyInputNumberProps } from 'src/MyInputNumber';
import { TMarshal, TMode } from 'src/utils';




interface IBase<T, P> {
    inputType: T
    props: P
    text: string
}


export type TOption =
    IBase<'AutoComplete', AutoCompleteProps> |
    IBase<'CusDatePicker', IMyDatePickerProps> |
    IBase<'DatePicker', IMyDatePickerProps> |
    IBase<'MyInput', IMyInputProps> |
    IBase<'InputNumber', IMyInputNumberProps> |
    IBase<'Checkbox', IMyCheckboxProps> |
    IBase<'MyCheckbox', IMyCheckboxProps> |
    IBase<'MC', IMyCheckboxProps>



export interface IMySelectProps extends Omit<SelectProps<any>, 'options'> {
    // options?: (Partial<TOption> & { prefix?: string, suffix?: string, label: string, value: any, warning?: boolean })[]
    type?: TMode;
    options?: ICommonOption[]
    optionKey?: string
    uniqueKey?: string
    value?: any;
    onChange?(v: any): void;
    marshal?: TMarshal
    startIndex?: number
    useString?: boolean
    fetch_options?: T_FETCH_OPTIONS
}