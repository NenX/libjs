import { ColorPickerProps } from 'antd';
import * as React from 'react';
export type { ColorPickerProps as RcColorPickerProps } from '@rc-component/color-picker';


const Inner = React.lazy(() => import('./Inner'));



const ColorPicker_L = React.forwardRef<any, ColorPickerProps>((props, ref) => {
    return <Inner {...props} />;
});

ColorPicker_L.displayName = 'ColorPicker';


export {
    ColorPicker_L,
    ColorPickerProps
};