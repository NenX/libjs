import { AutoCompleteProps } from 'antd/es/auto-complete';
import * as React from 'react';
import { SelectOption_L } from '../Select';


const Inner = React.lazy(() => import('antd/es/auto-complete'));



const AutoComplete_ = React.forwardRef<any, AutoCompleteProps>((props, ref) => {
    return <Inner {...props} ref={ref}/>;
});

AutoComplete_.displayName = 'AutoComplete';

type AutoCompleteType = typeof AutoComplete_ & { Option: typeof SelectOption_L };
const AutoComplete_L: AutoCompleteType = Object.assign(AutoComplete_, { Option: SelectOption_L })


export {
    AutoComplete_L,
    AutoCompleteProps
};