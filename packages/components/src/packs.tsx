import { ArrayInput } from './ArrayInput'
import { MyAutoComplete } from './MyAutoComplete'
import { MyCheckbox } from './MyCheckbox'
import { MyColor } from './MyColor'
import MyDatePicker from './MyDatePicker'
import { MyInput } from './MyInput'
import { MyInputNumber, } from './MyInputNumber'
import { MySelect } from './MySelect'
import { MySwitch } from './MySwitch'


export * from './MyInput'
export * from './MySelect'
export * from './MyCheckbox'
export * from './ArrayInput'
export * from './MyCheckbox'
export * from './MyDatePicker'
export * from './MyColor'

export const packs = {
    MI: MyInput,
    input: MyInput,
    Input: MyInput,
    MyInput,

    MyInputNumber,
    InputNumber: MyInputNumber,
    input_number: MyInputNumber,

    MyDatePicker,
    DatePicker: MyDatePicker,
    DP: MyDatePicker,
    single_date_picker: MyDatePicker,
    CusDatePicker: MyDatePicker,
    date: MyDatePicker,

    MyColor,
    MySwitch,
    switch: MySwitch,
    Switch: MySwitch,
    ArrayInput,
    MArr: ArrayInput,

    MySelect,
    MS: MySelect,
    Select: MySelect,
    select: MySelect,

    MyCheckbox,
    Checkbox: MyCheckbox,
    MC: MyCheckbox,
    checkbox: MyCheckbox,
    // CheckboxWithInput: MyCheckbox,

    MyAutoComplete,
    MA: MyAutoComplete,
    AutoComplete: MyAutoComplete,
    autocomplete: MyAutoComplete,
}
