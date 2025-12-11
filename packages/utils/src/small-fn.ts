import { isFunction, isNumber, isObject, isString, keys, toInt, toFloat, cloneDeep, identity, isArray, } from "./helper";
import { safe_json_parse } from "./json-helper";
import { isBoolean, isNil, isNull, isObjectLike, toString } from "./helper";
import { AnyObject } from "./type-utils";
import { ICommonOption } from "./types";

export type TCommonFileType = 'application/vnd.ms-excel' | 'text/csv;charset=utf-8' | 'application/msword'
// export function sleep(sec: number) {
//     return new Promise<void>((resolve) => setTimeout(resolve, sec * 1000))
// }
export function get_global() {
    try {
        return globalThis ?? window ?? global
    } catch (error) {
        return {} as typeof globalThis
    }
}
export function getSearchParamsValue(key: string) {
    const url = new URL(location.toString())
    return url?.searchParams?.get(key) ?? null
}
export function getSearchParamsAll(url?: URL) {
    const _url = url ?? new URL(location.href);
    const searchParams = _url ?
        [..._url.searchParams.entries()]
            .reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        : {}
    return searchParams as AnyObject<string>
}
export function setSearchParamsValue(key: string, value: string | number) {
    const url = new URL(location.toString())
    url?.searchParams?.set(key, `${value}`)
    return url

}
export function setSearchParamsAll(data: AnyObject<string | number>) {
    const _url = new URL(location.href);
    Object.keys(data).forEach(k => {
        _url?.searchParams?.set(k, `${data[k]}`)
    })
    return _url
}





export function scrollIntoView(symbol: string, finder: (selectors: string) => Element | null = document.querySelector.bind(document)) {
    const dom = finder(symbol);
    const scrollIntoViewIfNeeded = (dom as any)?.scrollIntoViewIfNeeded as () => {} | null
    if (scrollIntoViewIfNeeded) {
        scrollIntoViewIfNeeded.call(dom)
    } else {
        dom?.scrollIntoView({ behavior: 'smooth' });
    }

}

export function base64ToBinary(data: string, type: TCommonFileType) {
    const raw = get_global().atob(data);
    const uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type });
}
export function downloadFile(content: string | Blob, filename = '问卷答题情况.xlsx', type: TCommonFileType = 'application/vnd.ms-excel', isBase64 = false) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    var blob = typeof content === 'string' ? (isBase64 ? base64ToBinary(content, type) : new Blob([content], { type })) : content;
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
};

export function uuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.slice(uuid.lastIndexOf("/") + 1);
}

export function randomHex() {
    const hex = ~~(Math.random() * 16)
    return hex
}

export function charToUTF8(char: string) {
    const encoder = new TextEncoder()
    const uint8Array = encoder.encode(char[0])
    return Array.from(uint8Array)
}

export function charToUnicode(char: string) {
    // ES6 之后可以用 String.prototype.codePointAt() 从字符返回对应的码点
    let u = char.charCodeAt(0)
    const u1 = char.charCodeAt(0)
    const u2 = char.charCodeAt(1)

    if (u1 >= 0xD800 && u1 <= 0xDBFF && u2 >= 0xDC00 && u2 <= 0xDFFF) {
        u = (((u1 - 0xD800) << 10) | (u2 - 0xDC00)) + 0x10000;
    }
    return u
}
// 先转 utf-8 再 decode
export function unicodeToChar(u: number) {

    let arr = unicode_to_UTF8(u)
    if (!arr) return null

    const decoder = new TextDecoder();
    const ui8 = new Uint8Array(arr)
    return decoder.decode(ui8)
}

export function unicode_to_UTF8(u: number) {

    let arr: number[] | null = null //utf8;

    if (u <= 0x7F) {
        arr = [u & 0xFF]
    }
    else if (u <= 0x07FF) {
        arr = [((u >> 6) & 0x1F) | 0xC0, (u & 0x3F) | 0x80]
    }
    else if (u <= 0xFFFF) {
        arr = [
            ((u >> 12) & 0x0F) | 0xE0,
            ((u >> 6) & 0x3F) | 0x80,
            (u & 0x3F) | 0x80
        ]

    }
    else if (u <= 0x10FFFF) {
        arr = [
            ((u >> 18) & 0x07) | 0xF0,
            ((u >> 12) & 0x3F) | 0x80,
            ((u >> 6) & 0x3F) | 0x80,
            (u & 0x3F) | 0x80
        ]
    }
    if (!arr) return null
    return arr
}



export function getFilledArray(n: number): any[] {
    return Array(n).fill(0);
}

export function copyText(text: string) {
    var textareaC = document.createElement('textarea');
    textareaC.setAttribute('readonly', 'readonly');
    textareaC.value = text;
    document.body.appendChild(textareaC);
    textareaC.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaC);
    return res;
}

export function dyn_cb<T>(cb: (ctx: T) => void, g_ctx: () => T,): boolean {
    try {
        cb(g_ctx())
        return false
    } catch (error: any) {
        console.error('dyn_cb', { error })
        return true
    }

}


export function safeExec<T extends (...args: any) => any>(fn?: T, ...args: Parameters<T>) {
    return isFunction(fn) ? fn(...args) : null
}

export function safeGetFromFuncOrData(fn: any, default_v: any = null) {
    try {
        return safeExec(fn) ?? fn
    } catch (error) {
        if (default_v)
            return default_v
        throw error
    }
}

export function numberLikeCompare(a: number | string | boolean | null, b: number | string | boolean | null) {
    if (a === b) return true
    if (isString(a) && isString(b)) {
        return a === b
    }
    if (isNil(a) || isNil(b)) return false
    if (isObject(a) || isObject(b)) return false
    if (isBoolean(a) && !isBoolean(b)) return false
    if (isBoolean(b) && !isBoolean(a)) return false
    if (toInt(a, NaN) === toInt(b, NaN)) return true
    if (toFloat(a, NaN) === toFloat(b, NaN)) return true
    if (toString(a) === toString(b)) return true
    return false
}

export function warpBase64Type(str: string, type: 'img' | 'pdf') {
    if (!str) return str
    if (type === 'img') {
        return str.startsWith('data:image/png;base64,') ? str : `data:image/png;base64,${str}`
    }
    if (type === 'pdf') {
        return str.startsWith('data:application/json;base64,') ? str : `data:application/json;base64,${str}`
    }
    return str
}

export function safe_number_parse(value: any, defaultValue = NaN) {
    if (isNumber(value) && !isNaN(value)) return value
    const rawParse = Number(value)
    return isNaN(rawParse) ? defaultValue : rawParse
}

export function expect_array<T>(value?: T[] | null, default_v: T[] = []) {
    if (!Array.isArray(value)) {
        if (Array.isArray(default_v))
            return default_v

        return []
    }
    return value
}

// 生成包含字符的 svg 转义字符串
export function gen_encoded_char_svg(props: { char: string, size?: number, color?: string }) {
    const { char, size = 12, color = 'cc0000' } = props
    const _color = color?.startsWith('#') ? color.slice(1) : color
    return `data:image/svg+xml,%3Csvg 
    width='${size + 2}' height='${size + 2}' 
    xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' 
    font-size='${size}' 
    fill='%23${_color}' 
    font-weight='bold'
    text-anchor='middle' 
    dominant-baseline='middle'%3E${char}%3C/text%3E%3C/svg%3E`
}

export function base64_to_image(base64img: string) {
    return new Promise<HTMLImageElement | null>((res, rej) => {
        if (!base64img) res(null)
        var img = new Image();
        img.onload = function () {
            res(img);
        };
        img.src = base64img;
    })

}
export function image_to_base64(img_el: HTMLImageElement) {
    if (!img_el) return null
    const c = document.createElement('canvas')
    c.width = img_el.width
    c.height = img_el.height
    const ctx = c.getContext('2d')
    ctx?.drawImage(img_el, 0, 0, img_el.width, img_el.height)
    const base64 = c.toDataURL('image/png')
    return base64

}

export function filter_obj_to_url_search(obj: Object | any[]) {
    if (!obj) return {}
    const clone_one: any = {}
    keys(obj).forEach(k => {
        const v = (obj as any)[k]
        if (isNumber(v) || isBoolean(v) || isString(v) || isNull(v)) {
            clone_one[k] = v
        }

    })

    return clone_one
}


export async function safe_async_call<T extends (...args: any) => any>(cb?: T, ...args: Parameters<T>) {
    if (!isFunction(cb)) return null
    return await Promise.resolve(cb(...args)) as ReturnType<typeof cb>
}


const global_cache_map: { [x: string]: { cache: any, cache_promise: Promise<any> } } = {}

export async function cache_fetch<T = any>(key: string, cb: () => Promise<T>, deep = false) {
    let raw = await cache_fetch_inner(key, cb)
    return deep ? cloneDeep(raw)! : raw
}
async function cache_fetch_inner<T = any>(key: string, cb: () => Promise<T>): Promise<T> {
    let conf = global_cache_map[key] = global_cache_map[key] ?? {}
    if (conf.cache) return conf.cache
    if (conf.cache_promise) return conf.cache_promise
    return conf.cache_promise = cb().then(r => conf.cache = r)
}
function join_option_value(value?: ICommonOption) {
    if (!isObjectLike(value)) return value
    const msg = value?.label || value?.value
    const text = value?.text
    if (!msg) return null
    return text ? `${msg}(${text})` : msg
}
export function speculate_on_display(value?: any): string {
    if (!value) return ''
    if (isNumber(value)) return value + ''
    if (Array.isArray(value)) {
        const arr = value
            .map(join_option_value)
            .filter(identity)
        return arr.join('/')
    }
    if (isObjectLike(value)) {
        return join_option_value(value)
    }
    if (isString(value)) {
        const obj = safe_json_parse(value)
        return speculate_on_display(obj) || value
    }
    return ''
}

// 00:00 00:05 ... 23:55
export function getFuckTimeInterval(star_hour = 0, end_hour = 24, min_interval: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 15 | 20 | 30 = 5) {
    return Array(end_hour - star_hour).fill(0).map((_, hour) => {

        const hour_str = (hour + star_hour).toString().padStart(2, '0')
        const min_counts = 60 / min_interval
        return Array(min_counts).fill(0).map((_, min) => {
            const min_str = (min * min_interval).toString().padStart(2, '0')

            return `${hour_str}:${min_str}`
        })
    }).flat()
}

// export function getTimeSlice(hour = 24, isShowSecond = false) {
//     const hourArr = Array(hour).fill(0) as number[]
//     const minuteArr = Array(60).fill(0) as number[]
//     return hourArr.reduce((sum, h, hIdx) => {
//         return [...sum, ...minuteArr.map((m, mIdx) => `${hIdx}:${mIdx}`)]
//     }, [] as string[])
// }
const word = [
    ['abundant', ' 丰富的', '/əˈbʌndənt/'],
    ['eloquent', ' 雄辩的', '/ˈeləkwənt/'],
    ['meticulous', ' 细致的', '/məˈtɪkjʊləs/'],
    ['resilient', ' 有韧性的', '/rɪˈzɪliənt/'],
    ['versatile', ' 多才多艺的', '/ˈvɜːsətaɪl/'],
    ['pragmatic', ' 务实的', '/præɡˈmætɪk/'],
    ['inevitable', ' 不可避免的', '/ɪˈnevɪtəbl/'],
    ['ambiguous', ' 模棱两可的', '/æmˈbɪɡjuəs/'],
    ['spontaneous', ' 自发的', '/spɒnˈteɪniəs/'],
    ['conscientious', ' 认真的', '/ˌkɒnʃiˈenʃəs/'],
    ['impeccable', ' 无瑕疵的', '/ɪmˈpekəbl/'],
    ['tenacious', ' 顽强的', '/təˈneɪʃəs/'],
    ['prolific', ' 多产的', '/prəˈlɪfɪk/']
]
export function random_word() {
    return word[Math.random() * word.length | 0]
}
export function confirm_operation() {
    const word = random_word()
    return prompt(`请输入 ${word[0]}（${word[2]} adj.${word[1]}） 以确认你的操作`) === word[0]
}

// ES6 新增的方法
// '😎'.charCodeAt(0).toString(16) == 'd83d' // UTF-16 码元
// '😎'.charCodeAt(1).toString(16) == 'de0e'
// '😎'.codePointAt(0)?.toString(16) == '1f60e'// Unicode 码点

export function simple_encrypt(data: AnyObject | any[]) {
    if (!data) return null
    return JSON.stringify(data).split('').map((_, idx) => ~_.charCodeAt(0) + idx * 119)
}
export function simple_decrypt(code: number[]) {
    if (!code) return null
    const str = expect_array(code).map((_, idx) => String.fromCharCode(~(_ - idx * 119))).join('')
    return safe_json_parse(str) as AnyObject
}
const SP = '@@'
export function simple_encrypt_str(data: string, sp = SP) {
    if (!data || !isString(data)) return null
    return data.split('').map((_, idx) => ~_.charCodeAt(0) + idx * 119).join(sp)
}
export function simple_decrypt_str(code: string, sp = SP) {
    if (!code || !isString(code) || !code.includes(sp)) return null
    const str = code.split(sp).map((_, idx) => String.fromCharCode(~(+_ - idx * 119))).join('')
    return str
}
export function text_ellipsis(text: string, max: number) {
    if (!text || !isNumber(max)) return ''

    if (text.length <= max) return text

    return text.slice(0, max) + '...'

}
export function calc_number(data: AnyObject | any[] | number | string | boolean) {
    if (isNil(data))
        return 0
    let data_to_calc: number[] | null = null
    if (isArray(data))
        data_to_calc = data
    if (isObject(data))
        data_to_calc = Object.values(data)

    if (isString(data) || isBoolean(data) || isNumber(data)) {
        const v = Number(data)
        if (!isNaN(v))
            data_to_calc = [v]
    }
    if (data_to_calc)
        return data_to_calc.filter(_ => isNumber(_) && !isNaN(_)).reduce((sum, a) => sum + a, 0)
    return 0

}

Object.assign(get_global(), { safe_async_call, simple_decrypt_str, simple_encrypt_str })


function safe_check() {
    let g = get_global()
    if (!g?.document?.body) return

    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }


}

// safe_check()