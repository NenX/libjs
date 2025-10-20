import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React, { FC, useEffect, useState } from 'react';
import { IIconMap, IMyIconSelectProps } from './types';


export function use_icon(props: IMyIconSelectProps) {
    const { icon_type = '', value, onChange, form, ...others } = props


    const [all_icons, set_all_icons] = useState<IIconMap & { default?: { render: FC<IconComponentProps> } }>({})
    const [all_keys, set_all_keys] = useState<string[]>([])

    const QuestionOutlined = all_icons['QuestionOutlined'] || (() => <span>?</span>)


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




