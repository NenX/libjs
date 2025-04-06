import Comp, { ColorPickerProps } from 'antd/es/color-picker';

import React from 'react';

export default function LazyInner(props: ColorPickerProps) {
    return <Comp {...props} />
}