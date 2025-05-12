import { ICommonOption } from '@noah-libjs/utils';
import { TCommonComponentDisplay } from '../util-types';
import { use_options } from 'src/utils';
import { IMyCheckboxProps } from './types';
export * from './types';
const MyCheckbox_DisplayFC: TCommonComponentDisplay<IMyCheckboxProps, string | number | ICommonOption[]> = props => {
    const { value, type, uniqueKey } = props

    const { options, loading, data, setData, display_node } = use_options(props)






    return display_node
}
export default MyCheckbox_DisplayFC