
export type PropertyKey = string | number | symbol;

export type PartialAll<T> = {
    [P in keyof T]?: T[P] extends Array<any>
    ? Partial<T[P][number]>[]
    : Partial<T[P]>
};

export type PartialSome<T, K extends keyof T> = {
    [P in K]?: T[P]

} & Pick<T, Exclude<keyof T, K>>
export type AnyObject<T = any> = { [x: string]: T }
