import { Card, InputRef, List } from 'antd';
import React, { forwardRef } from 'react';
import { Dropdown_L } from '../LazyAntd';
import { MyInput } from '../MyInput';
import { IMyIconSelectProps } from './types';
import { use_icon } from './utils';





export default forwardRef<InputRef, IMyIconSelectProps>((props, myRef) => {
    const { value, onChange, } = props


    const { all_keys, render_Icon } = use_icon(props)


    return <Dropdown_L
        arrow
        trigger={['click']}
        popupRender={
            (node) => {

                return <Card size='small' styles={{ body: { width: 580, height: 360, overflowY: 'auto', } }}>

                    <List
                        style={{}}
                        grid={{ column: 12 }}
                        dataSource={all_keys}
                        renderItem={(key) => (
                            <List.Item style={{ cursor: 'pointer', background: key === value ? '#aaa' : '', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={key} onClick={() => onChange?.(key)}>
                                {render_Icon(key, { style: { fontSize: 20 } })}{node}
                            </List.Item>
                        )}
                    />
                </Card>
            }
        }
    >
        <MyInput
            addonBefore={render_Icon(value)}
            placeholder={'请选择'}
            value={value}
            allowClear
            onChange={onChange}
            onClear={() => onChange?.('')}
        />
    </Dropdown_L >
})





