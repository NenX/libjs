import { isArray, isObject, isString } from './helper'

export function safe_json_parse<T = any>(str?: any, retOnErr: T | null = null) {
    if (!str) return retOnErr
    if (isObject(str) || isArray(str)) return str as T
    if (!isString(str)) return retOnErr

    try {
        const v = JSON.parse(str) as T
        // return (isObject(v) || Array.isArray(v)) ? v : retOnErr
        return v

    } catch (error) {
        return retOnErr
    }
}
export function safe_json_stringify(obj?: any,) {
    if (isString(obj) && safe_json_parse(obj)) {
        return obj
    }
    return JSON.stringify(obj)
}

export function safe_json_parse_arr<T = any>(str?: any, retOnErr: T[] = []) {
    if (!str) return retOnErr
    if (Array.isArray(str)) return str as T[]
    if (!isString(str)) return retOnErr
    try {
        const v = JSON.parse(str) as T[]
        return Array.isArray(v) ? v : retOnErr

    } catch (error) {
        return retOnErr
    }
}