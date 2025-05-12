
import { ICommonOption, isNil, safe_json_parse_arr } from '@noah-libjs/utils';
import { TMode } from '../utils';




export function parseValue(value?: string | number | ICommonOption[], marshal?: number, type?: TMode): ICommonOption[] {
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








