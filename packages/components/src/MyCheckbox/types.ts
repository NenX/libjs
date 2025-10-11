import { ICommonOption } from "@noah-libjs/utils";
import { AutoCompleteProps } from "antd";
import React from "react";
import { IArrayInputProps } from "../ArrayInput";
import { IMyDatePickerProps } from "../MyDatePicker/utils";
import { IMyInputProps } from "../MyInput";
import { TMarshal, TMode } from "../utils";
import { IMchc_FormDescriptions_InputProps, TOptions } from "../util-types";

export interface ICompatibleProps {
    marshal?: IMchc_FormDescriptions_InputProps['marshal'],
    optionKey?: string,
    useString?: boolean,
    useDefault?: boolean,
    options?: any,
    sp?: any[],
    config?: any,
    type?: any,
    startIndex?: any,
    value?: any,
    uniqueKey?: string
    display_linker?: string

}

export interface IMyCheckboxProps {
    value?: boolean | null | string | number | ICommonOption[];
    options?: TOptions | (() => TOptions)

    onChange?(v?: any): void;
    type?: TMode;
    disabled?: boolean;
    inputWidth?: number;
    optionKey?: string
    config?: { inputType?: string }
    uniqueKey?: string
    marshal?: TMarshal
    sp?: ICommonOption[]
    vertical?: boolean
    startIndex?: number
    onBlur?(e: any): void
    style?: React.CSSProperties
    display_linker?: string
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