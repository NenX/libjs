
import { ModalProps } from 'antd';

import React from 'react';
const Inner = React.lazy(() => import('./Inner'));

export function Modal_L(props: ModalProps) {
    return <Inner {...props}/>
}