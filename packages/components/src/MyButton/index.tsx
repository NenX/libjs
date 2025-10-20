import { safe_async_call, sleep } from '@noah-libjs/utils';
import { Button, ButtonProps, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';
import { MyIcon } from '../MyIconSelect';
export interface IMyButtonProps extends Omit<ButtonProps, 'form'> {
    btn_text?: string,
    form?: FormInstance
    on_btn_click?: (e: React.MouseEvent<HTMLElement, MouseEvent>, form?: FormInstance) => any
    defaultIcon?: React.ReactNode,
    primary?: boolean
}
export function MyButton(props: IMyButtonProps) {
    const { btn_text, defaultIcon, onClick, form, children, icon, loading, primary, hidden, on_btn_click, title, ...others } = props
    if (hidden) return null
    let type = props.type
    const [visible, setVisible] = useState(false)
    const _icon = visible ? (defaultIcon ?? <MyIcon value='LoadingOutlined' />) : icon
    if (primary) {
        type = 'primary'
    }
    useEffect(() => {
        if (loading)
            setVisible(false)
    }, [loading])
    async function on_click_call(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        await safe_async_call(onClick, e)
        await safe_async_call(on_btn_click, e, form)

    }
    function on_click(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (visible) return
        setVisible(true)

        safe_async_call(on_click_call, e)
            .finally(async () => {
                await sleep(200)
                setVisible(false)
            })

    }
    // const node = (visible) ? tip : (text ?? children)
    return (
        <Button  {...others} title={title || btn_text} icon={_icon} type={type}
            onClick={on_click}>
            {btn_text ?? children}
        </Button>
    );
}
