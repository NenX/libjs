
import { TreeSelectProps } from 'antd';

import React from 'react';
const Inner = React.lazy(() => import('./Inner'));

export function TreeSelect_L<T extends Object = any>(props: TreeSelectProps<T>) {
    return <Inner {...props} />
}