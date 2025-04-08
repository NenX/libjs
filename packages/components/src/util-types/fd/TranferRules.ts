interface ISpecialConfig_Single {
    type: "key_and_keyNote"
    path: "partnerInfo.smoke"
}



interface ISpecialConfig_Number {
    type: "dayjs()"
}



export type IMchc_FormDescriptions_TranferRules = ISpecialConfig_Single
    | ISpecialConfig_Number



