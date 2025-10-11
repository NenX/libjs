import { isArray, isObjectLike, safe_json_parse_arr, safe_json_stringify } from "@noah-libjs/utils"
import { useEffect, useState } from "react"

export function use_array_marshal<T = any>(marshal?: 0 | 1 | 2, _value?: any, _onChange?: (v: any) => void, linker = '/') {
    const [safe_value, set_safe_value] = useState<T[]>([])
    useEffect(() => {
        const d = marshal ? safe_json_parse_arr(_value,) : _value
        set_safe_value(d)

    }, [_value, marshal])

    function onChangeSafeValue(_v: any[]) {
        if (!isArray(_v) || !_v.length) return _onChange?.([])

        switch (marshal) {
            case 0:
                const is_obj = isObjectLike(_v[0])
                const arr = is_obj ? _v.map(_ => safe_json_stringify(_)) : _v
                _onChange?.(arr.join(linker))
                break;
            case 1:
                _onChange?.(safe_json_stringify(_v))

                break;
            default:
                _onChange?.(_v)

                break;
        }

    }
    return { safe_value, set_safe_value, onChangeSafeValue }
}