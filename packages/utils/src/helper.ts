import { isFunction, isNumber, isObject, isString, keys, toInt, toFloat, isArray, isSymbol, get, set, clone, map, mapValues, mapEntries, omit, pick, unique, isEqual, } from "radash";
export { isFunction, isNumber, isObject, isString, keys, toInt, toFloat, isArray, isSymbol, get, set, clone, map, mapValues, mapEntries, omit, pick, unique, isEqual }

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