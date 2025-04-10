import React from "react";
import { Switch_L } from "src/LazyAntd";
import { TCommonComponent } from "src/util-types";
import { IMySwitchProps } from "./types";

const MySwitch: TCommonComponent<IMySwitchProps, boolean> = function MySwitch(props) {
    return <Switch_L {...props} />
}

MySwitch.DisplayFC = (props) => {
    return props.checked ? (props.checkedChildren ?? '是') : (props.unCheckedChildren ?? '否');
}

export { MySwitch };
