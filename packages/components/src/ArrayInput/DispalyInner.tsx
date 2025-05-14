import { safe_json_parse_arr } from '@noah-libjs/utils';
import React, { useEffect, useState } from 'react';
import { TCommonComponentDisplay } from '../util-types';
import { componentMap } from './components';
import { IArrayInputProps } from './types';
import { getOption } from './utils';
import { parse_MC_option, use_options } from '../utils';

const DisplayFC: TCommonComponentDisplay<IArrayInputProps, string> = (props) => {

    const { value, separator = ',', marshal = 1 } = props
    const nMarshal = Number(marshal)

    //     const _options = parse_MC_option(props)
    // const [_value, set_value] = useState<any[]>([])
    const { options: _options, loading, data: _value, setData } = use_options(props)


    useEffect(() => {
        // const arr = nMarshal == 0 ? value?.split(',') : (nMarshal === 1 ? safe_json_parse_arr(value) : value)
        // const v = Array.isArray(arr) ? arr : []
        // set_value(v)

        return () => {

        }
    }, [value])

    const isEmpty = _value.every(_ => !_)

    return <div style={{ display: 'inline-block' }}>
        <span style={{ display: 'flex', alignItems: 'center', }}>
            {
                isEmpty ? '--' : _options.map((o, idx) => {
                    const C = componentMap[o.inputType as keyof typeof componentMap]
                    const _DisplayFC = componentMap[o.inputType as keyof typeof componentMap]?.DisplayFC
                    const props = o.props ?? {}
                    const DisplayFC = _DisplayFC ?? C?.DisplayFC ?? (({ value }: { value: any }) => { return <span>{value ?? '--'}</span> });
                    return <span key={o.value} style={{ display: 'flex', alignItems: 'center', }}>
                        {o.prefix ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{o.prefix}</span> : null}
                        {<DisplayFC value={_value[idx]} {...props} />}
                        {o.suffix ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{o.suffix}</span> : null}
                        {idx === _options.length - 1 ? null : <span style={{ margin: '0 2px' }}>{separator}</span>}
                    </span>

                })
            }
        </span>
    </div>
}
export default DisplayFC