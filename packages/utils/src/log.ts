import { isFunction } from "./helper"
import { formatDateTime } from './moment-help'
const colorMap = {
    'log': '#1475b2',
    'warn': '#f89c1e',
    'error': '#ed7961'
}
interface ILL {
    log?(...optionalParams: any[]): void
    warn?(...optionalParams: any[]): void
    error?(...optionalParams: any[]): void
}
const big_txt_style = 'color:#1772F6;font-weight:bold;font-size:6em;padding:10px 20%;text-shadow:0.7px -1px 0 rgb(255 255 255 / 100%),1.4px -2px 0 rgb(255 255 255 / 96%),2px -3px 0 rgb(255 255 255 / 92%),2.8px -4px 0 rgb(255 255 255 / 88%),-1px 1px 2px rgb(0 0 0 / 70%),-2px 2px 4px rgb(0 0 0 / 70%),-3px 3px 6px rgb(0 0 0 / 70%);background: linear-gradient(to right top,oklab(58.2% -0.04 -0.21),oklab(58.2% -0.376 -0.21));'
export class MyLog {
    private _logMsg(type: keyof typeof colorMap = 'log', ...msg: any[]) {
        const fn = MyLog._handler?.[type]
        if (!fn || !isFunction(fn)) return
        fn(
            `%c ${this.env} %c ${formatDateTime()} `,
            `padding: 1px; border-radius:3px 0 0 3px; color: #fff; background: ${colorMap[type]};`,
            "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: #606060;",
            ...msg
        )
    }
    logBig(t: string) {
        const fn = MyLog._handler?.log
        if (!fn || !isFunction(fn)) return
        fn(
            `%c${t}`,
            big_txt_style,
        )
    }

    private env: string
    private static _handler: ILL = console
    public static set handler(v: ILL) {
        if (!v) return

        MyLog._handler = {
            ...MyLog._handler,
            ...v,
        }

    }



    constructor(e: string) {
        this.env = e
    }
    log(...msg: any[]) {
        this._logMsg('log', ...msg)
    }
    warn(...msg: any[]) {
        this._logMsg('warn', ...msg)
    }
    error(...msg: any[]) {
        this._logMsg('error', ...msg)
    }

}

MyLog.handler = console

