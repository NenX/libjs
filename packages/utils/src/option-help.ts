import { expect_array, safe_async_call } from './small-fn';
import { AnyObject } from './type-utils';
import { ICommonOption } from './types';
const selectOptionMap: AnyObject<() => ICommonOption[]> = {}


interface ISpectialOption {
    sp?: ICommonOption[],
    start?: number,
    useString?: boolean,
    useDefault?: boolean
}
const REGE_AutoComplete = /\<(.*)\>a$/
const REGE_MyCheckbox = /\<(.*)\>c$/
const REGE_MySelect = /\<(.*)\>s$/
const REGE_EXCLUSIVE = /^(.*)\<(.*)\>(.*)#$/
export const optionKey其他 = 99
export const optionKey不详 = 100
export const optionKey否 = 0
const defalutSp: ICommonOption[] = [
    { label: '不详', value: optionKey不详, },
    { label: '其他', value: optionKey其他, inputType: 'MyInput' },
    { label: '其它', value: optionKey其他, inputType: 'MyInput' },
    { label: '无', value: optionKey否, exclusive: true },
    { label: '否', value: optionKey否, exclusive: true },
]
type TOptionKey = string[] | string
type TGetOptionKey = () => TOptionKey
type TOptions<T extends TOptionKey | TGetOptionKey> = T extends TOptionKey ? ICommonOption[] : () => ICommonOption[]

function _getSimpleOptions(_arr: TOptionKey, options: ISpectialOption = {}) {
    const arr = parseList(_arr)
    const {
        sp = [],
        start = 1,
        useDefault = true,
        useString
    } = options

    let index = start
    const opt = arr.map((_label, idx) => {
        const preset = presetInput(_label)
        const label = preset.label ?? _label
        const _defaultSpItem = useDefault ? defalutSp.find(s => label === s.label) : null
        const _spItem = sp.find(s => label === s.label)

        const spItem = _spItem ?? _defaultSpItem ?? {}
        if (spItem.value && useString) {
            spItem.value = spItem.value.toString()
        }
        const _value = _defaultSpItem ? index : index++
        return {
            label,
            value: useString ? _value.toString() : _value,
            inputType: preset.inputType,
            props: preset.props,
            exclusive: preset.exclusive,
            parentheses: preset.parentheses,
            prefix: preset.prefix,
            suffix: preset.suffix,
            ...spItem,
        }
    }) as ICommonOption[]
    return opt
}
export function getSimpleOptions<T extends TOptionKey | TGetOptionKey>(_arr: T, options: ISpectialOption = {}) {

    const ret: TOptions<T> = typeof _arr === 'function' ? () => _getSimpleOptions(_arr(), options) : _getSimpleOptions(_arr, options) as unknown as any
    return ret

}

function _getSameOptions(_arr: TOptionKey) {
    const arr = parseList(_arr)
    return arr.map(label => ({ label, value: label })) as ICommonOption[]
}
export function getSameOptions<T extends TOptionKey | TGetOptionKey>(_arr: T) {
    const ret: TOptions<T> = typeof _arr === 'function' ? () => _getSameOptions(_arr()) : _getSameOptions(_arr) as unknown as any
    return ret
}
export function getDualModeOptions<T extends TOptionKey | TGetOptionKey>(arr: T, options?: ISpectialOption) {


    return [getSimpleOptions(arr, options), getSameOptions(arr),] as const
}

function parseList(arr: string | string[]) {
    if (!arr) return []
    let _arr: string[] = []
    let split1: string[] = []
    if (Array.isArray(arr)) {
        _arr = arr
    } else if ((split1 = arr.split(',')) && split1.length > 1) {
        _arr = split1
    } else if ((split1 = arr.split('、')) && split1.length > 1) {
        _arr = split1
    }
    return _arr
}



function presetInput(_label?: string): Partial<ICommonOption> {
    if (!_label) return { label: _label, }

    const withInput = _label?.endsWith('|i') || _label?.endsWith('i')
    if (withInput) {
        return { inputType: 'Input', label: _label.slice(0, -1) }
    }
    const useAuto = REGE_AutoComplete.exec(_label)
    if (useAuto) {
        return { inputType: 'MA', label: _label.slice(0, useAuto.index), props: { options: useAuto[1] } }
    }

    const useCheckbox = REGE_MyCheckbox.exec(_label)
    if (useCheckbox) {
        const config = useCheckbox[1]
        const arr = config.split('|')
        const options = arr[0]
        const marshal = arr[1] ? Number(arr[1]) : undefined
        const type = arr[2] || undefined
        return { inputType: 'MC', label: _label.slice(0, useCheckbox.index), props: { options, marshal, type } }
    }

    const useSelect = REGE_MySelect.exec(_label)
    if (useSelect) {
        const config = useSelect[1]
        const arr = config.split('|')
        const options = arr[0]
        const marshal = arr[1] ? Number(arr[1]) : undefined
        const mode = arr[2] || undefined
        return { inputType: 'MS', label: _label.slice(0, useSelect.index), props: { options, marshal, mode } }
    }

    // 文字<exclusive|parentheses|prefix|suffix>MyInput#
    const useExclusive = REGE_EXCLUSIVE.exec(_label)
    if (useExclusive) {
        const label = useExclusive[1]
        const config = useExclusive[2]
        const arr = config.split('|')

        const inputType = useExclusive[3]


        const exclusive = arr[0] ? Boolean(arr[0]) : undefined
        const parentheses = arr[1] ? Boolean(arr[1]) : undefined
        const prefix = arr[2]
        const suffix = arr[3]
        // mchcLogger.log('useExclusive', { useExclusive, exclusive, parentheses, prefix, suffix, inputType, label, _label })

        return { exclusive, parentheses, prefix, suffix, inputType, label }
    }

    return { label: _label, }

}

export type T_FETCH_OPTIONS = () => (Promise<ICommonOption[]> | ICommonOption[])

export async function safe_fetch_options(cb: T_FETCH_OPTIONS) {
    let arr = await safe_async_call(cb)
    return expect_array(arr)
}



export function getPresetOptions(key: string, pure = false) {
    const options = selectOptionMap[key]?.() ?? []
    return pure ? options.map(_ => ({ ..._, inputType: undefined })) : options
}
export function getOptionLabel(k: string, value: any, defaultLabel = '') {
    const options = selectOptionMap[k]?.() ?? []
    return options.find(_ => _.value === value)?.label ?? defaultLabel
}
export function getOptionValue(k: string, label: any) {
    const options = selectOptionMap[k]?.() ?? []
    return options.find(_ => _.label === label)?.value
}
// merge options
export function merge_preset_options(ops: AnyObject<() => ICommonOption[]>) {
    Object.assign(selectOptionMap, ops)
}