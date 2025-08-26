import { safe_fetch_options, T_FETCH_OPTIONS } from "@noah-libjs/request";
import { getDictionariesEnumerations, getDualModeOptions, getPresetOptions, ICommonOption, isArray, isBoolean, isEmpty, isFunction, isNull, isNumber, isString, numberLikeCompare, safe_json_parse_arr } from "@noah-libjs/utils";
import React, { useEffect, useState } from "react";
import { IMchc_FormDescriptions_Field_Nullable, IMchc_FormDescriptions_InputProps, TOptions } from "../util-types";
import { FormInstance } from "antd";

export type TMarshal = 0 | 1 | 2
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

  useString?: boolean,
  sp?: any[],
  config?: any,
  startIndex?: any,
  display_linker?: string
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
        const options = parse_MC_option(props as any)

        if (inputType === 'MSW') {
          return { ...a, [`${name}`]: [props.checked_value ?? true, props.unchecked_value ?? false] }
        }
        if (inputType === 'MA' && isEmpty(options)) {
          return a
        }
        const firstOption = options[0]
        return { ...a, [`${name}`]: [parse_MC_value(props as any, [firstOption]), null, { props, options }], }
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

  if (props.config?.inputType === 'MA') return changedValue?.[0]?.value;


  const marshal = getMarshal(props,)
  const type = get_mode(props)
  if (!changedValue.length)
    return null

  if (marshal)
    return marshal === 2 ? changedValue : JSON.stringify(changedValue,)

  if (type === 'multiple' || type === 'tags')
    return changedValue.map(_ => _.value).join(',')
  return changedValue[0]?.value
}
export function check_multiple(props: ICompatibleProps,) {

  const type = get_mode(props)

  return ['tags', 'multiple'].includes(type!)
}
export function get_mode(props: ICompatibleProps,) {
  return props?.mode ?? props.type
}



export function use_options(props: ICompatibleProps) {
  const { fetch_options, optionKey, options: _options, uniqueKey, form, display_linker = ',' } = props
  const [options, set_options] = useState<ICommonOption[]>([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ICommonOption[]>([]);

  const { value, } = props
  const marshal = getMarshal(props)


  const type = get_mode(props)


  useEffect(() => {
    const safeData = getData(value, options, marshal, type)

    setData(safeData)
  }, [value, options]);


  useEffect(() => {
    if (fetch_options) {
      setLoading(true)
      safe_fetch_options(fetch_options, form)
        .then(set_options)
        .finally(() => setLoading(false))
    }
  }, []);
  useEffect(() => {
    if (!fetch_options) {
      set_options(parse_MC_option(props))
    }
  }, [optionKey, _options, uniqueKey]);

  const is_multiple = check_multiple(props)

  // mchcLogger.log('MySelect', { data, options, props })

  const label = is_multiple ? data.map(_ => _.label).join(display_linker) : data[0]?.label
  const safe_node = label ?? ''
  const display_node = (
    <span title={safe_node}>
      {
        loading ? '数据加载中...' : safe_node
      }
    </span>
  );

  return { loading, options, data, setData, display_node }
}

function getData(value: any, options: ICommonOption[], marshal: number, type?: TMode) {
  const unMarshalData = safe_json_parse_arr(value, value)
  const splitValue = () => isString(value) ? value.split(',').filter(_ => _) : []
  const v =
    [1, 2].includes(marshal)
      ? unMarshalData :
      (
        (type === 'multiple' || type === 'tags') && isString(value)

          ? (
            splitValue().map(value => options.find(_ => numberLikeCompare(value, _.value)) ?? ({ value, label: value }))
          )

          : value
      )
  const safeData = (Array.isArray(v))
    ? v
    : ((isNumber(v) || isString(v) || isBoolean(v) || isNull(v))
      // ? options.filter(_ => _.value === v)
      ? options.filter(_ => numberLikeCompare(_.value, v))
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
  const options = dicOptions ?? preOptions ?? parse_MC_string_options(props) ?? defaultOptions
  // const multiple_compatible_options = options.map(_ => ({ value:}))
  return options as ICommonOption[]
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
  const { useString, type, config, startIndex, sp } = props
  const _options = isFunction(props.options) ? props.options() : props.options
  if (!isString(_options)) return isArray(_options) ? _options.map(_ => isString(_) ? { value: _, label: _ } : _) : []

  const input_type = config?.inputType ?? 'MC'
  const multiple = type === 'multiple'
  const marshal = getMarshal(props)

  const options = getDualModeOptions(_options, { sp, useString: (multiple && !marshal) || useString, start: startIndex })

  return input_type === 'MA' ? options[1] : options[0]

}

export function displayValue(_options: ICommonOption[], value: ICommonOption[], isMul: boolean) {
  const _value = _options.filter(o => value.find(v => v.value == o.value))
  return _value.map(_ => _.label).join(',')

}
export function get_unknown_conf(props: { showUnknown?: boolean, unknown?: boolean }) {

  const { showUnknown, unknown } = props

  return (showUnknown || unknown)
}
const defaultOptions: ICommonOption[] = []
