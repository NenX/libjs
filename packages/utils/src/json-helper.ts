import { isObject, isString } from './helper'

export function safe_json_parse<T = any>(str?: any, retOnErr: T | null = null) {
    if (!str) return retOnErr
    if (typeof str === 'object') return str as T
    if (!isString(str)) return retOnErr

    try {
        const v = JSON.parse(str) as T
        return (isObject(v) || Array.isArray(v)) ? v : retOnErr

    } catch (error) {
        return retOnErr
    }
}
export function safe_json_stringify(obj?: any,) {
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