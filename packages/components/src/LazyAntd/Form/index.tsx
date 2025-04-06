
import { FormProps } from 'antd';

import React from 'react';
const Inner = React.lazy(() => import('./Inner'));
const FormItemInner = React.lazy(() => import('./FormItemInner'));

function Form_<T extends Object = any>(props: FormProps<T>) {
    return <Inner {...props} />
}

type TreeType = typeof Form_ & { Item: typeof FormItemInner, };
export const Form_L: TreeType = Object.assign(Form_, { Item: FormItemInner, }) 