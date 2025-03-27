import dayjs, { Dayjs, ConfigType } from "dayjs"
import { isFunction, isString } from "./helper"


type TOutput = dayjs.Dayjs


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

export function getMomentObj(s: ConfigType): TOutput {
    return dayjs(s)
}

export const formatDate = getFn('YYYY-MM-DD')

export const formatDateTime = getFn('YYYY-MM-DD HH:mm:ss')

export const formatDateTimeNoSecond = getFn('YYYY-MM-DD HH:mm')

export const formatTime = getFn('HH:mm:ss')


export function getMomentRange(m = dayjs) {
    type DT = [TOutput, TOutput]
    return {
        昨天: [m().add(-1, 'day'), m().add(-1, 'day')] as DT,
        今天: [m(), m()] as DT,
        明天: [m().add(1, 'day'), m().add(1, 'day')] as DT,
        上周: [m().add(-1, 'week').startOf('week'), m().add(-1, 'week').endOf('week')] as DT,
        这周: [m().startOf('week'), m().endOf('week')] as DT,
        下周:[m().add(1, 'week').startOf('week'), m().add(1, 'week').endOf('week')] as DT,
        上月: [m().add(-1, 'month').startOf('month'), m().add(-1, 'month').endOf('month')] as DT,
        这月: [m().startOf('month'), m().endOf('month')] as DT,
        下月: [m().add(1, 'month').startOf('month'), m().add(1, 'month').endOf('month')] as DT,
        今年: [m().startOf('year'), m().endOf('year')] as DT,
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

export { dayjs, Dayjs, }
export type Dayjs_ConfigType = ConfigType
