import { safe_json_parse_arr } from '@noah-libjs/utils';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { componentMap } from './components';
import { IArrayInputProps } from './types';
import { getOption } from './utils';
function ArrayInputInner(props: IArrayInputProps) {
    const { value, onChange, separator = ',', inputWidth = 64, marshal = 1, autoFocus, onBlur, disabled } = props
    const nMarshal = Number(marshal)
    const _options = getOption(props)
    const [_value, set_value] = useState<any[]>([])
    const _value_ref = useRef<any[]>([])

    const forcusInfo = useRef<{ index?: number, type?: 'self' | 'friend' }>(autoFocus ? { index: 0, type: 'self' } : {})

    useEffect(() => {
        const arr = nMarshal === 0 ? value?.split(',') : (nMarshal === 1 ? safe_json_parse_arr(value) : value)
        console.log('ArrayInput', nMarshal, value, arr, props)

        const v = Array.isArray(arr) ? arr : []
        set_value(v)
        _value_ref.current = v
        return () => {

        }
    }, [value])



    function handleChange(v: any, idx: number) {
        _value_ref.current[idx] = v
        onChange?.(nMarshal === 0 ? _value_ref.current.join(',') : (nMarshal === 1 ? JSON.stringify(_value_ref.current) : _value_ref.current))
    }
    return <div style={{ display: 'inline-block' }}> <span style={{ display: 'flex', alignItems: 'center', }}>
        {
            _options.map((opt, index) => {
                const C = componentMap[opt.inputType as keyof typeof componentMap]
                const props = opt.props ?? {}

                let style: CSSProperties = props.style ?? {}
                if (['MyInput', 'Input', 'MA', 'MyAutoComplete'].includes(opt.inputType!)) {
                    style = { width: inputWidth, ...style }
                }
                if (['Select', 'MS', 'MySelect'].includes(opt.inputType!)) {
                    style = { minWidth: inputWidth, ...style }
                }

                return <span key={opt.value} style={{ display: 'flex', alignItems: 'center', }}>
                    {opt.prefix ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{opt.prefix}</span> : null}
                    {opt.label ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{opt.label}:</span> : null}
                    {C ? <C disabled={disabled} autoFocus={index === 0 ? autoFocus : undefined} size="small" {...props}
                        onFocus={(e) => {
                            forcusInfo.current = { index, }





                        }}
                        onBlur={(e) => {

                            setTimeout(() => {
                                if (forcusInfo.current.index !== index) {
                                    return
                                }
                                forcusInfo.current = { index: undefined, type: undefined }
                                onBlur?.(e)
                            }, 100);
                        }}

                        style={style} value={_value[index]} onChange={(e: any) => handleChange(e, index)} /> : '未知组件'}
                    {opt.suffix ? <span style={{ margin: '0 2px', whiteSpace: 'nowrap' }}>{opt.suffix}</span> : null}


                    {index === _options.length - 1 ? null : <span style={{ margin: '0 2px' }}>{separator}</span>}
                </span>

            })
        }
    </span></div>
}

export default ArrayInputInner