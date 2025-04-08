
import { ICheckboxWithInputOption, IMyCheckboxProps } from './types';
import { isNil, isString, safe_json_parse_arr, ICommonOption, getDualModeOptions, getPresetOptions, getDictionariesEnumerations, } from '@noah-libjs/utils';
export function parseValue(value?: string | number | ICommonOption[], marshal?: number, type?: 'single' | 'multiple'): ICommonOption[] {
  if (isNil(value))
    return []

  const isString = typeof value === 'string'
  const isArr = Array.isArray(value)
  if (marshal) {
    const arr = (isString || isArr) ? safe_json_parse_arr(value) : []
    // return arr.map(_ => isObject(_) ? _ : { value: _ })
    return arr
  } else {
    if (type === 'multiple') {
      return isString
        ? (
          value?.split?.(',')
            ?.filter?.(_ => !isNil(_))
            ?.map?.(value => {
              // const nValue = isNaN(Number(value)) ? value : Number(value)
              return ({ value: value })
            })
          ?? []
        )
        : []
    } else {


      return [{ value }]

    }

  }
}

interface ICompatibleProps {
  marshal?: any,
  optionKey?: string,
  useString?: boolean,
  options?: any,
  sp?: any[],
  config?: any,
  type?: any,
  startIndex?: any,
  value?: any,
  uniqueKey?: string
}
function parse_MC_string_options(props?: ICompatibleProps): ICommonOption[] {
  if (!props) return []
  const { useString, type, config, startIndex, sp } = props
  const _options = props.options
  if (!isString(_options)) return _options

  const input_type = config?.inputType ?? 'MC'
  const multiple = type === 'multiple'
  const marshal = getMarshal(props)

  const options = getDualModeOptions(_options, { sp, useString: (multiple && !marshal) || useString, start: startIndex })

  return input_type === 'MA' ? options[1] : options[0]

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
const defaultOptions: ICommonOption[] = []

export function parse_MC_option(props: ICompatibleProps) {
  if (!props) return []
  const marshal = props.marshal ?? 1
  const optionKey: any = props.optionKey
  const preOptions = optionKey ? getPresetOptions(optionKey, marshal === 0) : null
  const dicOptions = parse_MC_dict_options(props)
  const options = dicOptions ?? preOptions ?? parse_MC_string_options(props) ?? defaultOptions
  return options as ICheckboxWithInputOption[]
}
export function displayValue(_options: ICheckboxWithInputOption[], value: ICommonOption[]) {
  const _value = _options.filter(o => value.find(v => v.value == o.value))
  return _value.map(_ => _.label).join(',')

}
export function getMarshal(props?: ICompatibleProps) {
  if (!props) return 1
  const { marshal, value, uniqueKey } = props
  if (uniqueKey !== undefined) {
    return 0
  }
  const _marshal = marshal ?? 1
  if (typeof _marshal === 'number')
    return _marshal
  const m = typeof value !== 'number' && (_marshal ?? true)
  return Number(m)
}
export function parse_MC_value(props: IMyCheckboxProps, changedValue: ICommonOption[]) {
  if (props.config?.inputType === 'MA') return changedValue?.[0]?.value;
  const marshal = getMarshal(props)
  const type = props.type
  if (!changedValue.length)
    return null

  if (marshal)
    return marshal === 2 ? changedValue : JSON.stringify(changedValue,)

  if (type === 'multiple')
    return changedValue.map(_ => _.value).join(',')
  return changedValue[0]?.value
}


export function get_check_invert_values(configs: any[]) {
  if (!Array.isArray(configs)) return {}
  const children = configs.filter(_ => ['MC', 'MA'].includes(_?.inputType!) || Array.isArray(_?.children))

  const check_invert_values = children
    .filter(_ => !_?.disabled_check)
    .reduce((a, item, idx) => {
      // const name = SMchc_FormDescriptions.get_form_item_name_raw(item)

      const name = item?.name ?? item?.key ?? item?.dataIndex
      const props = { ...(item?.inputProps! ?? {}), config: item } as any
      const options = parse_MC_option(props)
      const firstOption = options[0]
      const cArr = item?.children
      let cObj = {}
      if (Array.isArray(cArr)) {
        cObj = get_check_invert_values(cArr)
        return { ...a, ...cObj }
      } else {
        return { ...a, [`${name}`]: [parse_MC_value(props, [firstOption]), null, { props, options }], }
      }
    }, {} as { [x: string]: any[] })
  return check_invert_values
}