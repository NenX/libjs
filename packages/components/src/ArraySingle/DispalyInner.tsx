import { isPrimitive, isString, safe_json_parse_arr } from '@noah-libjs/utils';
import React from 'react';
import { TCommonComponentDisplay } from 'src/util-types';
import { IArraySingleProps } from './types';
// import FormSection, { IFormSectionProps } from '../../BaseModalForm/FormSection';
// import { RenderEditItemStandalone, formatFormConfig } from '../../BaseModalForm/utils';


const DisplayFC: TCommonComponentDisplay<IArraySingleProps, string> = (props) => {

    const { value, linker = ',' } = props


    const safe_value = safe_json_parse_arr(value)
    if (safe_value.length && isPrimitive(safe_value[0]))
        return safe_value.join(linker)

    if (isString(value))
        return value

    return <div>

        {safe_value.length}项
    </div>
}
export default DisplayFC