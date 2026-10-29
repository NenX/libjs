import { isArray, isNumber, isString } from "radash";
import { AnyObject } from "./type-utils"
function format_itemName_arr_by_name(name?: number | string | string[]) {
    if (isArray(name)) return name as string[]
    if (isNumber(name)) return [name.toString()]

    if (!isString(name)) return []

    let __name = name?.includes('.') ? name.split('.') : name;

    return Array.isArray(__name) ? __name : [__name]
}


export function formitem_set_name(item: AnyObject, name?: number | string | string[]) {
    if (!item) return

    const arr = format_itemName_arr_by_name(name)
    const str = arr.join('.')
    item.name = str
    item.key = str
    return str
}
export function formitem_format_name_and_label(item: AnyObject) {
    if (!item) return null
    const arr = formitem_format_itemName_arr(item).filter(_ => _)
    const str = arr.join('.')
    item.name = str
    item.key = str
    // item.dataIndex = str

    const title = formitem_get_the_fucking_itemLabel(item)
    item.label = title
    item.title = title
    return str

}

export function formitem_get_the_fucking_itemLabel(item: AnyObject, Compatible = false) {
    return item?.label || item?.title || (Compatible ? formitem_format_itemName_str(item) : '')
}
export function formitem_get_the_fucking_itemName(item: AnyObject) {
    return item?.name || item?.key || item?.dataIndex
}
export function formitem_format_itemName_str(item: AnyObject, separator = '.') {
    const arr = formitem_format_itemName_arr(item).filter(_ => _)
    const str = arr.join(separator)
    return str
}

export function formitem_format_itemName_arr(item: AnyObject) {
    const key = formitem_get_the_fucking_itemName(item)
    return format_itemName_arr_by_name(key)
}
