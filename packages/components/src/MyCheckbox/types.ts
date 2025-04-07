import { ICommonOption } from "@noah-libjs/utils";
import { AutoCompleteProps } from "antd";
import React from "react";
import { IArrayInputProps } from "src/ArrayInput";
import { IMyDatePickerProps } from "src/MyDatePicker/utils";
import { IMyInputProps } from "src/MyInput";

export interface IMyCheckboxProps {
    value?: string | ICommonOption[];
    options?: ICheckboxWithInputOption[] | string;
    onChange?(v?: any): void;
    type?: 'single' | 'multiple';
    disabled?: boolean;
    inputWidth?: number;
    optionKey?: string
    config?: { inputType?: string }
    uniqueKey?: string
    marshal?: number
    sp?: ICheckboxWithInputOption[]
    vertical?: boolean
    startIndex?: number
    onBlur?(e: any): void
    style?: React.CSSProperties
}


type INil = Exclude<ICommonOption, 'props' | 'inputType'>
interface IMyInput extends ICommonOption {
    inputType: 'MyInput';
    props?: IMyInputProps
}
interface IAutoComplete extends ICommonOption {
    inputType: 'AutoComplete';
    props?: AutoCompleteProps
}


interface ISelf extends ICommonOption {
    inputType: 'CheckboxWithInput' | 'MyCheckbox';
    props?: IMyCheckboxProps
}
interface IArrayInput extends ICommonOption {
    inputType: 'ArrayInput';
    props?: IArrayInputProps
}
interface ISingle_date_picker extends ICommonOption {
    inputType: 'DatePicker';
    props?: IMyDatePickerProps
}
export type ICheckboxWithInputOption = IAutoComplete | IMyInput | ISelf | ISingle_date_picker | IArrayInput | INil 