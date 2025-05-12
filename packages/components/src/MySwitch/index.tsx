import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { isNil } from "@noah-libjs/utils";
import React from "react";
import { Switch_L } from "../LazyAntd";
import { TCommonComponent } from "../util-types";
import { IMySwitchProps } from "./types";
const MySwitch: TCommonComponent<IMySwitchProps, boolean> = function MySwitch(props) {
    return <Switch_L {...props} />
}

MySwitch.DisplayFC = ({ value, checkedChildren, checkedText, unCheckedChildren, uncheckedText }) => {
    if (isNil(value))
        return ''
    return value ? (checkedChildren ?? checkedText ?? <CheckOutlined />) : (unCheckedChildren ?? uncheckedText ?? <CloseOutlined />);
}

export { MySwitch };

