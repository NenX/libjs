import Checkbox from 'antd/es/checkbox';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import React from 'react';

export default function GroupInner(props: CheckboxGroupProps) {
    return <Checkbox.Group {...props} />
}