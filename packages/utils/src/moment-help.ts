import dayjs, { ConfigType, OpUnitType, QUnitType } from "dayjs"
import { isFunction, isString } from "./helper"


export type Dayjs = dayjs.Dayjs
export type DayjsConfigType = dayjs.ConfigType


function getFn<T extends string>(format: T,) {
    function f(s?: any): string | null {
        if (isFunction(s?.format)) {
            let res = s.format(format)
            if (isString(res))
                return res
        }
        const a = dayjs(s)
        return a.isValid() ? a.format(format) : null
    }
    return Object.assign(f, { format })
}

export function getMomentObj(s: DayjsConfigType): Dayjs {
    return dayjs(s)
}

export const formatDate = getFn('YYYY-MM-DD')

export const formatDateTime = getFn('YYYY-MM-DD HH:mm:ss')

export const formatDateTimeNoSecond = getFn('YYYY-MM-DD HH:mm')

export const formatTime = getFn('HH:mm:ss')


function start(m = dayjs) {
    return m().set('hour', 0).set('minute', 0).set('second', 0)
}
function end(m = dayjs) {
    return m().set('hour', 23).set('minute', 59).set('second', 59)
}

export function getMomentRange(m = dayjs) {
    type DT = [Dayjs, Dayjs]

    return {
        昨天: [start(m).add(-1, 'day'), end(m).add(-1, 'day')] as DT,
        今天: [start(m), end(m)] as DT,
        明天: [start(m).add(1, 'day'), end(m).add(1, 'day')] as DT,
        上周: [start(m).add(-1, 'week').startOf('week'), end(m).add(-1, 'week').endOf('week')] as DT,
        // 这周: [start(m).startOf('week'), end(m).endOf('week')] as DT,
        近一周: [start(m).add(-1, 'week').add(1, 'day'), end(m)] as DT,
        下周: [start(m).add(1, 'week').startOf('week'), end(m).add(1, 'week').endOf('week')] as DT,
        上月: [start(m).add(-1, 'month').startOf('month'), end(m).add(-1, 'month').endOf('month')] as DT,
        // 这月: [start(m).startOf('month'), end(m).endOf('month')] as DT,
        近一月: [start(m).add(-1, 'month').add(1, 'day'), end(m)] as DT,
        下月: [start(m).add(1, 'month').startOf('month'), end(m).add(1, 'month').endOf('month')] as DT,
        近一年: [start(m).add(-1, 'year').add(1, 'day'), end(m)] as DT,
        年初至今: [start(m).startOf('year'), end(m)] as DT,
    }
}
export function presets_date() {

    return [
        { label: '一月前', value: start().add(-1, 'month') },
        { label: '一周前', value: start().add(-1, 'week') },
        { label: '一天前', value: start().add(-1, 'day') },

        { label: '一天后', value: start().add(1, 'day') },
        { label: '两天后', value: start().add(2, 'day') },
        { label: '三天后', value: start().add(3, 'day') },

        { label: '一周后', value: start().add(1, 'week') },
        { label: '两周后', value: start().add(2, 'week') },

        { label: '一月后', value: start().add(1, 'month') },
        { label: '两月后', value: start().add(2, 'month') },
        { label: '半年后', value: start().add(6, 'month') },
    ]
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

export function diff_between(a: ConfigType, b: ConfigType, unit: QUnitType | OpUnitType, float = true): number {
    return dayjs(a).diff(dayjs(b), unit, float);
}
export function dayOf(unit: OpUnitType,): number {
    const today = dayjs()
    const first = dayjs().startOf(unit)
    return diff_between(today, first, 'day', false) + 1
}

export { dayjs }