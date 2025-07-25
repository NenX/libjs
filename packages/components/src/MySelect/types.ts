
import { AutoCompleteProps, SelectProps } from 'antd';
import { IMyCheckboxProps } from '../MyCheckbox';
import { IMyDatePickerProps } from '../MyDatePicker/utils';
import { IMyInputProps } from '../MyInput';
import { IMyInputNumberProps } from '../MyInputNumber';
import { TMarshal, TMode } from '../utils';
import { TOptions } from '../util-types';
import { T_FETCH_OPTIONS } from '@noah-libjs/request';




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
    options?: TOptions | (() => TOptions)

    optionKey?: string
    uniqueKey?: string
    value?: any;
    onChange?(v: any): void;
    marshal?: TMarshal
    startIndex?: number
    useString?: boolean
    fetch_options?: T_FETCH_OPTIONS
}