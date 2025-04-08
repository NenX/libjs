import { AnyObject } from "@noah-libjs/utils"
import { IMchc_FormDescriptions_InputType } from "./InputType"

interface ISpecialConfig_Single {
    type: "single"
    options: { value: any, label: string, withInput: boolean, span: number }[]
}


interface ISpecialConfig_FetalpositionMapping {
    type: "fetalpositionMapping"
}

interface ISpecialConfig_Number {
    type: "number"
    options: { labelBefore: string, labelAfter: string, }[]
}

interface ISpecialConfig_TableColumns {
    "tableColumns": {
        dataIndex: "object",
        editable: boolean
        align: "center"
        inputType: IMchc_FormDescriptions_InputType
        inputProps: AnyObject
        title: string
    }[]
}


export type IMchc_FormDescriptions_SpecialConfig = ISpecialConfig_Single
    | ISpecialConfig_FetalpositionMapping
    | ISpecialConfig_Number
    | ISpecialConfig_TableColumns



