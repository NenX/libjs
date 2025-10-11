import { isArray, isNil, isObjectLike, safe_json_parse, safe_json_parse_arr, safe_json_stringify } from "@noah-libjs/utils"
import { isString } from "antd/es/button"
import { useEffect, useState } from "react"

export function use_array_marshal<T = any>(marshal?: 0 | 1 | 2, _value?: any, _onChange?: (v: any) => void, linker = '/') {
    const [safe_value, set_safe_value] = useState<T[]>([])
    useEffect(() => {
        if (isNil(_value)) return set_safe_value?.([])
        if (isArray(_value)) return set_safe_value?.(_value)

        switch (marshal) {
            case 0:
                if (!isString(_value)) return set_safe_value?.([])

                const arr = _value.split(linker)

                set_safe_value?.(arr.map(_ => safe_json_parse<any>(_, _)))

                break;
            case 1:

                set_safe_value?.(safe_json_parse_arr(_value))

                break;
            default:
                set_safe_value?.(isArray(_value) ? _value : [])

                break;
        }



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