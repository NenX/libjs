import { safe_fetch_options, T_FETCH_OPTIONS } from "@noah-libjs/request";
import { getDictionariesEnumerations, getDualModeOptions, getPresetOptions, ICommonOption, identity, isArray, isBoolean, isEmpty, isFunction, isNil, isNull, isNumber, isPrimitive, isString, numberLikeCompare, safe_json_parse, safe_json_parse_arr } from "@noah-libjs/utils";
import React, { useEffect, useState } from "react";
import { IMchc_FormDescriptions_Field_Nullable, IMchc_FormDescriptions_InputProps, TOptions } from "../util-types";
import { FormInstance } from "antd";

export type TMarshal = IMchc_FormDescriptions_InputProps['marshal']
export type TMode = 'multiple' | 'tags'
interface ICompatibleProps {
  form?: FormInstance,
  value?: string | number | ICommonOption[]
  uniqueKey?: string,
  optionKey?: string,
  marshal?: TMarshal,
  mode?: TMode,
  type?: TMode,
  options?: TOptions | (() => TOptions)
  fetch_options?: T_FETCH_OPTIONS
  frugal?: boolean
  useString?: boolean,
  useDefault?: boolean,
  sp?: any[],
  config?: any,
  startIndex?: any,
  display_linker?: string
  linker?: string
  fetch_options_on_open?: boolean
}

export function get_check_invert_values(configs: IMchc_FormDescriptions_Field_Nullable[]) {
  if (!Array.isArray(configs)) return {}
  const children = configs.filter(_ => ['MC', 'MA', 'MS', 'MSW'].includes(_?.inputType!) || Array.isArray(_?.children))

  const check_invert_values = children
    .filter(_ => !_?.disabled_check)
    .reduce((a, item, idx) => {
      // const name = SMchc_FormDescriptions.get_form_item_name_raw(item)


      const cArr = item?.children
      if (Array.isArray(cArr)) {
        let cObj = {}
        cObj = get_check_invert_values(cArr)
        return { ...a, ...cObj }

      } else {

        const props = { ...(item?.inputProps! ?? {}), config: item } as IMchc_FormDescriptions_InputProps
        const name = item?.name ?? item?.key ?? item?.dataIndex
        const inputType = item?.inputType
        const opts = parse_MC_option(props as any)

        if (inputType === 'MSW') {
          return { ...a, [`${name}`]: [props.checked_value ?? true, props.unchecked_value ?? false] }
        }
        if (inputType === 'MA' && isEmpty(opts)) {
          return a
        }
        const firstOption = opts[0]
        return { ...a, [`${name}`]: [parse_MC_value(props as any, [firstOption]), null, { props, options: opts }], }
      }
    }, {} as { [x: string]: any[] })
  return check_invert_values
}

export function getMarshal(props?: ICompatibleProps) {
  if (!props) return 1
  const { marshal, value, uniqueKey } = props
  if (marshal === undefined && uniqueKey !== undefined) {
    return 0
  }
  const _marshal = marshal ?? 1
  if (typeof _marshal === 'number')
    return _marshal
  const m = typeof value !== 'number' && (_marshal ?? true)
  return Number(m)
}

export function parse_MC_value(props: ICompatibleProps, changedValue: ICommonOption[]) {
  const { linker = ',' } = props
  if (props.config?.inputType === 'MA') return changedValue?.[0]?.value;


  const marshal = getMarshal(props,)
  const type = get_mode(props)
  if (!changedValue.length)
    return null

  if (marshal) {
    if (marshal === 3) {
      return changedValue.map(_ => _.value)
    }

    const frugal_value = process_frugal_local(props, changedValue)
    return marshal === 2 ? frugal_value : JSON.stringify(frugal_value,)
  }

  if (type === 'multiple' || type === 'tags')
    return changedValue.map(_ => _.value).join(linker)
  return changedValue[0]?.value
}
export function check_multiple(props: ICompatibleProps,) {

  const type = get_mode(props)

  return ['tags', 'multiple'].includes(type!)
}
export function get_mode(props: ICompatibleProps,) {
  return props?.mode || props.type
}



export function use_options(props: ICompatibleProps) {
  const { fetch_options, optionKey, options: _options, uniqueKey, form, linker = ',', frugal, display_linker, fetch_options_on_open } = props
  const [options, set_options] = useState<ICommonOption[]>([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ICommonOption[]>([]);

  const { value, } = props
  const marshal = getMarshal(props)


  const type = get_mode(props)


  useEffect(() => {
    const safeData = getData(value, options, marshal, type, linker, frugal)

    setData(safeData)
  }, [value, options]);


  // useEffect(() => {
  //   process_options()

  // }, []);
  useEffect(() => {
    process_options()
  }, [optionKey, _options, uniqueKey]);
  function process_options() {
    if (fetch_options) {
      setLoading(true)
      safe_fetch_options(fetch_options, form)
        .then(set_options)
        .finally(() => setLoading(false))
    } else {
      set_options(parse_MC_option(props))

    }
  }
  const is_multiple = check_multiple(props)

  // mchcLogger.log('MySelect', { data, options, props })

  const label = is_multiple ? data.map(_ => _.label).join(display_linker ?? linker) : data[0]?.label
  const safe_node = label ?? ''
  const display_node = (
    <span title={safe_node}>
      {
        loading ? '数据加载中...' : safe_node
      }
    </span>
  );

  return { loading, options, data, setData, display_node, process_options }
}
function process_frugal_local(props: ICompatibleProps, changedValue: ICommonOption[]) {
  const { frugal } = props
  if (!frugal)
    return changedValue
  console.log('frugal_value local', changedValue[0])

  return changedValue[0]

}
function process_frugal_remote(value: any, frugal: boolean) {
  if (!frugal)
    return safe_json_parse_arr<ICommonOption>(value, value)
  const frugal_value = safe_json_parse<ICommonOption>(value)
  console.log('frugal_value remote', frugal_value)
  if (isNil(frugal_value?.value)) return []
  return [frugal_value]
}

function process_primary_array_value(value: any[], options: ICommonOption[],) {
  if (isArray(value) && value.every(isPrimitive)) {
    return value.map(v => options.find(opt => numberLikeCompare(v, opt.value)) ?? ({ value: v, label: v }))
  }
  return []
}
function getData(value: any, options: ICommonOption[], marshal: number, type?: TMode, l = ',', frugal = false) {

  if (marshal === 3) {
    return process_primary_array_value(value, options)
  }

  const unMarshalData = process_frugal_remote(value, frugal)
  const splitValue = () => isString(value) ? value.split(l).filter(_ => _) : []
  const v =
    [1, 2].includes(marshal)
      ? unMarshalData :
      (
        (type === 'multiple' || type === 'tags') && isString(value)

          ? process_primary_array_value(splitValue(), options)
          : value
      )
  const safeData = (Array.isArray(v))
    ? v
    : ((isNumber(v) || isString(v) || isBoolean(v) || isNull(v))
      // ? options.filter(_ => _.value === v)
      ? options.filter(opt => numberLikeCompare(opt.value, v))
      : [])

  // mchcLogger.log('MySelect', { numberLikeCompare, v, options })
  return safeData
}

export function parse_MC_option(props: ICompatibleProps) {
  if (!props) return []
  const type = props.type
  const marshal = props.marshal ?? 1
  const optionKey: any = props.optionKey
  const preOptions = optionKey ? getPresetOptions(optionKey, marshal === 0) : null
  const dicOptions = parse_MC_dict_options(props)
  const opts = dicOptions ?? preOptions ?? parse_MC_string_options(props) ?? defaultOptions
  return opts as ICommonOption[]
}

export function parse_MC_dict_options(props?: ICompatibleProps): ICommonOption[] | undefined {
  if (!props?.uniqueKey) return

  const { uniqueKey, useString } = props
  const fixed_uniqueKey = uniqueKey.includes('.') ? uniqueKey : `uniqueKey.${uniqueKey}`
  const enums = getDictionariesEnumerations(fixed_uniqueKey)
  if (!enums.length) return

  const options = enums
    .sort((a, b) => a.id! - b.id!)
    .map(e => {
      const dict_value = e.value ?? e.note
      const value = useString ? (e.note ?? e.label) : dict_value
      return { label: e.label, value: value }
    })
  return options

}
function parse_MC_string_options(props?: ICompatibleProps): ICommonOption[] {
  if (!props) return []
  const { useString, useDefault = true, type, config, startIndex, sp } = props
  const _opt = isFunction(props.options) ? props.options() : props.options
  if (!isString(_opt)) return isArray(_opt) ? _opt.map(_ => isString(_) ? { value: _, label: _ } : _).filter(identity) : []

  const input_type = config?.inputType ?? 'MC'
  const multi = type === 'multiple'
  const marshal = getMarshal(props)

  const opts = getDualModeOptions(_opt, { sp, useString: (multi && !marshal) || useString, start: startIndex, useDefault })

  return input_type === 'MA' ? opts[1] : opts[0]

}

export function displayValue(_opt: ICommonOption[], value: ICommonOption[], l = ',') {
  const _value = _opt.filter(o => value.find(v => v.value == o.value))
  return _value.map(_ => _.label).join(l)

}
export function get_unknown_conf(props: { showUnknown?: boolean, unknown?: boolean }) {

  const { showUnknown, unknown } = props

  return (showUnknown || unknown)
}
const defaultOptions: ICommonOption[] = []
