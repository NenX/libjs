import { AnyObject, EMPTY_PLACEHOLDER, get } from "@noah-libjs/utils"
import { InputStatus } from "antd/es/_util/statusUtils"
import React from "react"

export function isUrl(string: string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof string !== 'string') return false
  return protocolRE.test(string)
}

export const getArray = (arr: any[], defaultValue = []) => {
  if (Array.isArray(arr)) return arr
  return defaultValue
}
export function form_item_read(props: AnyObject, value: any): [boolean, any] {
  const id = get(props, 'id')
  const status: InputStatus | undefined = get(props, 'status')
  const v = value || EMPTY_PLACEHOLDER
  if (get(props, 'is_read')) {
    switch (status) {
      case 'error':
        return [true, <span id={id} style={{ color: 'red' }}>{v}</span>]
      case 'warning':
        return [true, <span id={id} style={{ color: 'yellow' }}>{v}</span>]
      default:
        return [true, <span id={id}>{v}</span>]
    }
  }
  return [false, null]
}

export function getFormat(format: string) {
  let dateFormat
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD'
      break
    case 'time':
      dateFormat = 'HH:mm:ss'
      break
    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss'
      break
    case 'week':
      dateFormat = 'YYYY-w'
      break
    case 'year':
      dateFormat = 'YYYY'
      break
    case 'quarter':
      dateFormat = 'YYYY-Q'
      break
    case 'month':
      dateFormat = 'YYYY-MM'
      break
    default:
      // dateTime
      if (typeof format === 'string') {
        dateFormat = format
      } else {
        dateFormat = 'YYYY-MM-DD'
      }
  }
  return dateFormat
}

export function getParamByName(name: string, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
