import { cache_fetch, expect_array, get, ICommonOption, isFunction, isString, safe_async_call } from "@noah-libjs/utils"
import { request } from "./Request"
import { FormInstance } from "antd"

export type T_FETCH_OPTIONS = ((f?: FormInstance) => (Promise<ICommonOption[]> | ICommonOption[])) | { url: string | (() => string), labelKey?: string, valueKey?: string, method?: 'get' | 'post' }

export async function safe_fetch_options(cb: T_FETCH_OPTIONS, f?: FormInstance) {
    if (isFunction(cb)) {
        let arr = await safe_async_call(cb, f)
        return expect_array(arr)
    } else {
        const { method = 'get', valueKey = 'value', labelKey = 'label', url } = cb
        const _url = isString(url) ? url : url()
        return cache_fetch(_url, () => request.ins({ method, url: _url }))
            .then(res =>
                expect_array(res.data)
                    .map(_ => ({ label: get(_, labelKey), value: get(_, valueKey) }) as ICommonOption)
            )

    }
}