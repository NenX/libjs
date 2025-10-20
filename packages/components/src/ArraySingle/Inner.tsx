import { Button, Divider, InputProps } from 'antd';
import React, { FC, useEffect, useRef } from 'react';
// import FormSection, { IFormSectionProps } from '../../BaseModalForm/FormSection';
// import { RenderEditItemStandalone, formatFormConfig } from '../../BaseModalForm/utils';
import { get } from '@noah-libjs/utils';
import { TCommonComponent } from 'src/util-types';
import { MyIcon } from '../MyIconSelect';
import { packs } from '../packs';
import { use_array_marshal } from '../utils/use_array_marshal';
import { IArraySingleProps } from './types';

const ArraySingleInner: TCommonComponent<IArraySingleProps, string | any[]> = (props) => {
    const {
        inputType = 'input',
        linker,
        component_map = packs,
        tip,
        disabled,
        value,
        form,
        onChange,
        marshal = 1,
        addBtnStyle = {},
        on_row_value_change,
        genRowData,
        ...others
    } = props

    const defaultValue = useRef<any[]>([])

    const { safe_value = [], onChangeSafeValue } = use_array_marshal<any>(marshal, value ?? defaultValue.current, onChange, linker)
    useEffect(() => {


    }, [])
    function genDefaultData() {
        const userData = genRowData?.(safe_value) ?? ''

        return userData
    }
    function onDel(idx: number) {
        safe_value.splice(idx, 1)
        onChangeSafeValue?.([...safe_value])
    }

    function onChangeValue(idx: number, _value: any) {
        safe_value.splice(idx, 1, _value)
        const new_data = [...safe_value]
        onChangeSafeValue?.(new_data)
        on_row_value_change?.(new_data, idx, _value, form)
    }
    const C = (get(component_map, inputType) || (() => null)) as unknown as FC<InputProps>
    return <div>


        {
            safe_value.map((item, idx) => {
                return <div key={idx}>
                    {
                        tip
                            ? <Divider style={{ margin: '4px 0', fontSize: 12, color: '#ccc' }} > {tip}{idx + 1}</Divider>
                            : null
                    }
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: tip ? 0 : 2 }}>


                        <div style={{ flex: 1 }}>
                            <C disabled={disabled}
                                {...others}
                                value={item}
                                onChange={(v: any) => {
                                    onChangeValue(idx, v)
                                }}
                            />
                        </div>
                        <div style={{ width: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <MyIcon value='MinusCircleOutlined' style={{ color: 'red' }} onClick={() => onDel(idx)} />
                        </div>

                    </div>

                </div>
            })
        }
        <Button disabled={disabled} style={{ marginTop: 6 }} type="dashed" block icon={<MyIcon value='PlusOutlined' />} {...addBtnStyle} onClick={() => onChangeSafeValue([...safe_value, genDefaultData()])} >
            新增{tip}
        </Button>

    </div>
}
export default ArraySingleInner