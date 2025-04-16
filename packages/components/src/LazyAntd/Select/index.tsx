
import { SelectProps, } from 'antd';

import React from 'react';
import { SelectOption_L } from './OptionInner';
const Inner = React.lazy(() => import('./Inner'));

function Select_<T extends Object = any>(props: SelectProps<T>) {
    return <Inner {...props} />
}


type SelectType = typeof Select_ & { Option: typeof SelectOption_L };

const Select_L: SelectType = Object.assign(Select_, { Option: SelectOption_L })

export { Select_L, SelectOption_L };

