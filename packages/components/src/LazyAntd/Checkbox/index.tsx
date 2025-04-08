
import { SelectProps, } from 'antd';

import React from 'react';
const Inner = React.lazy(() => import('./Inner'));
const GroupInner = React.lazy(() => import('./GroupInner'));

function Checkbox_<T extends Object = any>(props: SelectProps<T>) {
    return <Inner {...props} />
}

type CheckboxType = typeof Checkbox_ & { Group: typeof GroupInner };

export const Checkbox_L: CheckboxType = Object.assign(Checkbox_, { Group: GroupInner })
