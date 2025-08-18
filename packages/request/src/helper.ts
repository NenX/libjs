import { cache_fetch, expect_array, get, ICommonOption, isFunction, safe_async_call } from "@noah-libjs/utils"
import { request } from "./Request"
import { FormInstance } from "antd"

export type T_FETCH_OPTIONS = ((f?: FormInstance) => (Promise<ICommonOption[]> | ICommonOption[])) | { url: string, labelKey?: string, valueKey?: string, method?: 'get' | 'post' }

export async function safe_fetch_options(cb: T_FETCH_OPTIONS, f?: FormInstance) {
    if (isFunction(cb)) {
        let arr = await safe_async_call(cb, f)
        return expect_array(arr)
    } else {
        const { method = 'get', valueKey = 'value', labelKey = 'label', url } = cb
        return cache_fetch(url, () => request.ins({ method, url }))
            .then(res =>
                expect_array(res.data)
                    .map(_ => ({ label: get(_, labelKey), value: get(_, valueKey) }) as ICommonOption)
            )

    }
}