import { isInt } from "@noah-libjs/utils"
import React from "react"

interface IBase { style?: React.CSSProperties, width?: any, inputWidth?: any, disabled?: boolean, popupMatchSelectWidth?: boolean | number }
interface IProps extends IBase {

}
export function getInputStyle(props: IProps = {}) {
    const { style = {}, width, inputWidth, popupMatchSelectWidth = 120 } = props
    if (width) {
        style.width = style.width || width
    }
    if (inputWidth) {
        style.width = style.width || inputWidth
    }

    // if (isInt(popupMatchSelectWidth))
    //     style.width = style.width || (popupMatchSelectWidth / 2)

    
    style.width = style.width ?? '100%'

    return {
        // background: disabled ? style.background : '#fff',
        // border: 0,
        // borderBottom: '2px solid #ddd',
        // borderRadius: 0,
        ...style
    } as React.CSSProperties

}
