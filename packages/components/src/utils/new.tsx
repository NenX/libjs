import { get, isEmpty } from "@noah-libjs/utils"
import { FormInstance } from "antd"

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