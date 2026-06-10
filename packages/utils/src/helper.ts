import { isArray, isFunction, isObject, isString, isSymbol, get as r_get } from "radash";
import { AnyObject } from "./type-utils";

export * from "radash";

export function get<T = any>(value: any, path: string, defaultValue?: T | undefined): T {
    //@ts-ignore
    let direct_value = value?.[path]
    if (direct_value) return direct_value
    return r_get(value, path, defaultValue)
}

export function identity<T>(value: T) {
    return value;
}
const symbolProto = Symbol ? Symbol.prototype : undefined
const symbolToString = symbolProto ? symbolProto.toString : undefined;
var INFINITY = 1 / 0;

export function isBoolean(value: any): value is boolean {
    return value === true || value === false
}
export function isObjectLike(value: any) {
    return value != null && typeof value == 'object';
}
export function isNull(value: any): value is null {
    return value === null;
}
export function size(value: any) {
    if (isString(value) || isArray(value)) return value.length
    if (isObject(value)) return Object.keys(value).length
    return 0
}
export function isNil(value: any): value is null | undefined {
    return value == null;
}
export function toString(value: any): string {
    return value == null ? '' : baseToString(value);
}

function baseToString(value: any): string {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
        return value;
    }
    if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

function arrayMap<T = any, D = any>(array: T[], iteratee: (item: T, index: number, arr: T[]) => D): D[] {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
export function cloneDeep<T>(value: T): T | null {
    try {
        return JSON.parse(JSON.stringify(value))
    } catch (error) {
        return null
    }
}
export function hasOwn(obj: AnyObject, key: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};

export function object_to_formData(obj: AnyObject, formData = new FormData(), parentKey = '') {
    for (const key in obj) {
        const value = obj[key]
        const dataKey = parentKey ? `${parentKey}.${key}` : key

        if (value === null || value === undefined) {
            formData.append(dataKey, '')
        } else if (value instanceof File) {
            formData.append(dataKey, value)
        } else if (typeof value === 'object') {
            // 递归处理对象/数组
            object_to_formData(value, formData, dataKey)
        } else {
            formData.append(dataKey, value)
        }
    }
    return formData
}

export function object_to_searchparams(obj: AnyObject) {
    const params = new URLSearchParams();

    for (const key in obj) {
        let value = obj[key];

        // 过滤 undefined，null 转空字符串
        if (value === undefined) continue;
        if (value === null) value = "";

        // 数组处理：如 ids: [1,2,3] → ids=1&ids=2&ids=3
        if (Array.isArray(value)) {
            value.forEach(item => {
                params.append(key, item);
            });
        }
        // 普通值直接添加
        else {
            params.append(key, value);
        }
    }

    return params;
}