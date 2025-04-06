import Comp, { AutoCompleteProps } from 'antd/es/auto-complete';

import React from 'react';

export default function LazyInner(props: AutoCompleteProps) {
    return <Comp {...props} />
}