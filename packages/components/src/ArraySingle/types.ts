import { ButtonProps, FormInstance } from "antd"
import { IMchc_FormDescriptions_InputType } from "../util-types/fd/InputType"
import { IMchc_FormDescriptions_InputProps } from "src/util-types"







export interface IArraySingleProps {
    linker?: string
    value?: string
    onChange?(v: string | any[]): void
    marshal?: IMchc_FormDescriptions_InputProps['marshal']
    form?: FormInstance
    tip?: string
    addBtnStyle?: ButtonProps

    inputType?: IMchc_FormDescriptions_InputType
    component_map?: IMchc_FormDescriptions_InputProps['component_map']
    genRowData?: (list: any[]) => any
    on_row_value_change(data: any[], index: number, changed?: any, form?: FormInstance): void
}