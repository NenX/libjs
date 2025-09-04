import { AnyObject, get, isEmpty } from "@noah-libjs/utils"
import { FormInstance } from "antd"
import { useRef } from "react"

export function handle_form_error(error: any, form?: FormInstance) {
    const err_filed: { errors: string[], name: string[] } = get(error, 'errorFields[0]')
    if (err_filed) {

        const { name, errors } = err_filed

        if (name) {
            form?.scrollToField(name, { behavior: 'smooth', block: 'center' })
        }

        return { ...err_filed, text: isEmpty(errors) ? null : errors.join(',') }

    }
    return null
}

export function form_validate<T = AnyObject>(form?: FormInstance | null) {
    return new Promise<T>((res, rej) => {
        if (!form) {
            rej({ text: 'form 不存在' })
            return
        }
        form
            .validateFields()
            .then(() => {
                const formData = form.getFieldsValue();
                res(formData)

            })
            .catch((error) => {
                const first_err = handle_form_error(error, form)
                rej(first_err)
            })
    })

}

type EFocus = React.FocusEvent<HTMLDivElement, Element>
export function fuck_focus(props: { onBlur?(e: EFocus): void }) {
    const { onBlur } = props
    const forcusInfo = useRef<{ index?: number, type?: 'child' | 'parent' }>({})



    function child_focus(index = 0) {
        forcusInfo.current = { index, type: 'child' }
    }
    function child_blur(index = 0) {
        forcusInfo.current = { index: undefined, type: undefined }
    }
    function parent_blur(e: EFocus, index = 0) {

        setTimeout(() => {
            if (forcusInfo.current.index === index && forcusInfo.current.type === 'child')
                return
            forcusInfo.current = { index: undefined, type: undefined }
            onBlur?.(e)
        }, 10);
    }

    function parent_focus(index = 0) {

        // setTimeout(() => {
        //     forcusInfo.current = { index, type: 'parent' }
        // }, 10);
    }
    return { child_blur, child_focus, parent_blur, parent_focus }
}