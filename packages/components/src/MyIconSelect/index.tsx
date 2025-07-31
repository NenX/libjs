import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Card, Input, InputRef, List } from 'antd';
import React, { FC, forwardRef, useEffect, useState } from 'react';
import { Dropdown_L } from '../LazyAntd';
import { TCommonComponent } from '../util-types';
import { IIconMap, IMyIconSelectProps } from './types';
import { MyInput } from '../MyInput';
export * from './types';


function use_icon(props: IMyIconSelectProps) {
    const { icon_type = '', value, onChange, form, ...others } = props


    const [all_icons, set_all_icons] = useState<IIconMap & { default?: { render: FC<IconComponentProps> } }>({})
    const [all_keys, set_all_keys] = useState<string[]>([])

    const QuestionOutlined = all_icons['QuestionOutlined'] || (() => <span>?</span>)
    console.log('all_keys', { all_keys, all_icons })


    function render_Icon(t?: string, p: IconComponentProps = {}) {
        if (!all_icons.default?.render) return null
        const R = all_icons.default?.render
        if (!t) return null

        if (!all_keys.includes(t!)) return <R title={t} component={QuestionOutlined as any} {...p} {...others} />
        const C = all_icons[t!]
        return <R title={t} component={C as any} {...p} {...others} />
    }
    useEffect(() => {
        import('@ant-design/icons')
            .then((mod) => {
                <mod.default />
                set_all_icons(mod as any)

                const keys = Object.keys(mod).filter(_ =>
                    ['Outlined'].some(limit => _.includes(limit))
                )
                set_all_keys(keys)
            })
    }, [])

    return { all_keys, render_Icon }
}


const MyIconSelect: TCommonComponent<IMyIconSelectProps, string> = forwardRef<InputRef, IMyIconSelectProps>((props, myRef) => {
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

export function MyIcon(props: IMyIconSelectProps) {
    const { render_Icon } = use_icon(props)
    return render_Icon(props.value)
}

MyIconSelect.DisplayFC = MyIcon

export { MyIconSelect };

