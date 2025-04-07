import { InputNumberProps } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { MyAutoCompleteProps } from '../MyAutoComplete';

import { ICommonOption } from '@noah-libjs/utils';
import { FocusEventHandler } from 'react';
import { IMyDatePickerProps } from 'src/MyDatePicker/utils';
import { IMyInputProps } from 'src/MyInput';
import { IMySelectProps } from '../MySelect';
import { IMyCheckboxProps } from 'src/MyCheckbox';





export type TOption =
    { inputType: 'MyAutoComplete', props?: MyAutoCompleteProps } |
    { inputType: 'MA', props?: MyAutoCompleteProps } |
    { inputType: 'MySelect', props?: IMySelectProps } |
    { inputType: 'MS', props?: IMySelectProps } |
    { inputType: 'CusDatePicker', props?: IMyDatePickerProps } |
    { inputType: 'DatePicker', props?: IMyDatePickerProps } |
    { inputType: 'MyInput', props?: IMyInputProps } |
    { inputType: 'Input', props?: IMyInputProps } |
    { inputType: 'input', props?: IMyInputProps } |
    { inputType: 'CheckboxGroup', props?: CheckboxGroupProps } |
    { inputType: 'InputNumber', props?: InputNumberProps } |
    { inputType: 'input_number', props?: InputNumberProps } |
    { inputType: 'MyInputNumber', props?: InputNumberProps } |
    { inputType: 'CheckboxWithInput', props?: IMyCheckboxProps } |
    { inputType: 'MyCheckbox', props?: IMyCheckboxProps } |
    { inputType: 'MC', props?: IMyCheckboxProps } |
    { inputType: 'Checkbox', props?: IMyCheckboxProps }

export interface IArrayInputProps {
    autoFocus?: boolean
    disabled?: boolean
    inputWidth?: number,
    value?: string
    optionKey?: string
    onChange?(v: string | any[]): void
    separator?: string
    marshal?: number
    onBlur?: FocusEventHandler<any>,
    options?: (TOption & ICommonOption)[]
    sp?: (TOption & ICommonOption)[]
}