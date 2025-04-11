import dayjs from "dayjs"
import { isFunction, isString } from "./helper"


export type Dayjs = dayjs.Dayjs
export type DayjsConfigType = dayjs.ConfigType


function getFn<T extends string>(format: T,) {
    return Object.assign((s?: any) => {
        if (isFunction(s?.format)) {
            let res = s.format(format)
            if (isString(res))
                return res
        }
        const a = dayjs(s)
        return a.isValid() ? a.format(format) : null
    }, { format })
}

export function getMomentObj(s: DayjsConfigType): Dayjs {
    return dayjs(s)
}

export const formatDate = getFn('YYYY-MM-DD')

export const formatDateTime = getFn('YYYY-MM-DD HH:mm:ss')

export const formatDateTimeNoSecond = getFn('YYYY-MM-DD HH:mm')

export const formatTime = getFn('HH:mm:ss')


function start() {
    return dayjs().set('hour', 0).set('minute', 0).set('second', 0)
}
function end() {
    return dayjs().set('hour', 23).set('minute', 59).set('second', 59)
}

export function getMomentRange(m = dayjs) {
    type DT = [Dayjs, Dayjs]

    return {
        昨天: [start().add(-1, 'day'), end().add(-1, 'day')] as DT,
        今天: [start(), end()] as DT,
        明天: [start().add(1, 'day'), end().add(1, 'day')] as DT,
        上周: [start().add(-1, 'week').startOf('week'), end().add(-1, 'week').endOf('week')] as DT,
        这周: [start().startOf('week'), end().endOf('week')] as DT,
        下周: [start().add(1, 'week').startOf('week'), end().add(1, 'week').endOf('week')] as DT,
        上月: [start().add(-1, 'month').startOf('month'), end().add(-1, 'month').endOf('month')] as DT,
        这月: [start().startOf('month'), end().endOf('month')] as DT,
        下月: [start().add(1, 'month').startOf('month'), end().add(1, 'month').endOf('month')] as DT,
        今年: [start().startOf('year'), end().endOf('year')] as DT,
    }
}

export function isMoment(m: any) {
    return isFunction(m.format)
}

/**
 * 获取若干天后的日期
 */
export function getFutureDate(num: number) {
    return dayjs().add(num, 'days').format('YYYY-MM-DD');
}

export function dayjs_quarter(input: Dayjs, which_quarter?: number): [Dayjs, number] {
    if (typeof which_quarter !== 'undefined') {
        // 设置季度：调整月份至目标季度的第一个月，并保持其他部分不变
        const targetMonth = (which_quarter - 1) * 3;
        const adjustedDate = input.month(targetMonth);
        return [adjustedDate, which_quarter];
    } else {
        // 获取当前季度：根据月份计算季度（1-4）
        const currentMonth = input.month(); // 0-11
        const currentQuarter = Math.floor(currentMonth / 3) + 1;
        return [input, currentQuarter];
    }
}

export { dayjs }