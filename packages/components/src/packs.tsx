import { ArrayInput } from './ArrayInput'
import { MyAutoComplete } from './MyAutoComplete'
import { MyCheckbox } from './MyCheckbox'
import { MyColor } from './MyColor'
import MyDatePicker from './MyDatePicker'
import { MyRangeDate, MyRangeDateTime, MyRangePicker } from './MyRangeDate'
import { MyInput } from './MyInput'
import { MyInputNumber, } from './MyInputNumber'
import { MySelect } from './MySelect'
import { MySwitch } from './MySwitch'
import { MyIconSelect } from './MyIconSelect'
import { MyButton } from './MyButton'


export * from './MyInput'
export * from './MySelect'
export * from './MyCheckbox'
export * from './ArrayInput'
export * from './MyCheckbox'
export * from './MyDatePicker'
export * from './MyRangeDate'
export * from './MyColor'
export * from './MyIconSelect'
export * from './MyAutoComplete'
export * from './MyButton'

export const packs = {
    MyIconSelect,
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



    MyRangePicker,
    RangePicker: MyRangePicker,
    rangePicker: MyRangePicker,
    range_picker: MyRangePicker,

    MyRangeDate,
    RangeDate: MyRangeDate,
    rangeDate: MyRangeDate,
    range_date: MyRangeDate,

    MyRangeDateTime,
    RangeDateTime: MyRangeDateTime,
    rangeDateTime: MyRangeDateTime,
    range_date_time: MyRangeDateTime,


    MyColor,
    MySwitch,
    switch: MySwitch,
    Switch: MySwitch,
    MSW: MySwitch,
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
    MyButton,
    MyAutoComplete,
    MA: MyAutoComplete,
    AutoComplete: MyAutoComplete,
    autocomplete: MyAutoComplete,
}
