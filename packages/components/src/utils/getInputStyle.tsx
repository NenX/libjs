import { InputStatus } from "antd/es/_util/statusUtils";
import React from "react";
import theme from '../theme.less';
interface IBase { style?: React.CSSProperties, width?: any, inputWidth?: any, disabled?: boolean, status?: InputStatus; }
interface IProps extends IBase {

}
export function get_status_cls(status?: InputStatus) {
    if (status === 'error')
        return theme['error']
    if (status === 'warning')
        return theme['warning']

}
export function getInputStyle(props: IProps = {}) {
    const { style = {}, width, inputWidth, status } = props
    if (width) {
        style.width = style.width || width
    }
    if (inputWidth) {
        style.minWidth = style.minWidth || inputWidth
    }

    if (status === 'error') {
        style.color = 'red !important';
    }
    if (status === 'warning') {
        style.color = 'yellow !important';
    }
    // if (isInt(popupMatchSelectWidth))
    //     style.width = style.width || (popupMatchSelectWidth / 2)


    // style.width = style.width ?? '100%'

    return {
        // background: disabled ? style.background : '#fff',
        // border: 0,
        // borderBottom: '2px solid #ddd',
        // borderRadius: 0,
        ...style
    } as React.CSSProperties

}
