import { AnyObject } from "./type-utils"

const dic_map: AnyObject<IDictionary> = {}

interface IDictionary {
    id: number
    module: string
    type: number
    key: string
    name: string
    note: string
    enumerations: Partial<IEnumeration>[]
}
interface IEnumeration {
    id: number
    label: string
    note: string
    value: number
}


export function getDictionaries() {
    return dic_map
};

/**
 *
 * @param value 枚举值value
 * @param type string 字典类型
 */
export function getDictionariesEnumerations(type: string) {
    const dictionaries = getDictionaries()

    const object = dictionaries?.[type];
    if (!object) {
        console.warn(`字典 ${type} 不存在!`);
        return []
    }
    const enumerations = object?.enumerations ?? [];
    return enumerations;
};

/**
 *
 * @param value 枚举值value
 * @param type string 字典类型
 */
export function getDictionaryLabel(type: string, value: string | number,) {
    const enumerations = getDictionariesEnumerations(type)

    const item = enumerations.find((_) => _.value === +value);
    if (!item) {
        return null;
    }
    return item.label;
};
/**
 *
 * @param label 枚举值value
 * @param type string 字典类型
 */
export function getDictionaryValue(type: string, label: string,) {
    const enumerations = getDictionariesEnumerations(type)

    const item = enumerations.find((_) => _.label === label);
    if (!item) {
        return null;
    }
    return item.value;
};
// merge dic
export function merge_dict(ops: AnyObject<IDictionary>) {
    Object.assign(dic_map, ops)
}