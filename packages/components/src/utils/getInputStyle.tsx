import { isInt } from "@noah-libjs/utils"
import React from "react"

interface IBase { style?: React.CSSProperties, width?: any, inputWidth?: any, disabled?: boolean, warning?: boolean, warn?: boolean }
interface IProps extends IBase {

}
export function getInputStyle(props: IProps = {}) {
    const { style = {}, width, inputWidth, warning, warn } = props
    if (width) {
        style.width = style.width || width
    }
    if (inputWidth) {
        style.minWidth = style.minWidth || inputWidth
    }
    if (warning || warn) {
        style.border = '1px solid red';
        style.color = 'red';
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
