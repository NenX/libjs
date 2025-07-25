import { expect_array, get, ICommonOption, isFunction, safe_async_call } from "@noah-libjs/utils"
import { request } from "./Request"

export type T_FETCH_OPTIONS = (() => (Promise<ICommonOption[]> | ICommonOption[])) | { url: string, labelKey?: string, valueKey?: string, method?: 'get' | 'post' }

export async function safe_fetch_options(cb: T_FETCH_OPTIONS) {
    if (isFunction(cb)) {
        let arr = await safe_async_call(cb)
        return expect_array(arr)
    } else {
        const { method = 'get', valueKey = 'value', labelKey = 'label', url } = cb
        return request.ins({ method, url })
            .then(res =>
                expect_array(res.data)
                    .map(_ => ({ label: get(_, labelKey), value: get(_, valueKey) }) as ICommonOption)
            )

    }
}