
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';


export interface IRequest_AxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    logger?: boolean,
    unboxing?: boolean,
    showMsg?: boolean,
    successText?: string,
    errText?: string,
    ignore_usr?: boolean
    ignore_env?: boolean
}
export interface IRequest_ResponseError<D = any> { msg: string; data?: D; status?: number; url?: string; error?: AxiosError<any, any>; }
export interface IRequest_SpawnConfig { config?: IRequest_AxiosRequestConfig, onRequest?(value: IRequest_AxiosRequestConfig): IRequest_AxiosRequestConfig, onResponse?(value: AxiosResponse): any, onRejected?(err: IRequest_ResponseError): Promise<any> }
export type TRequest_SimpleReq = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: IRequest_AxiosRequestConfig<D>) => Promise<R>
export type TRequest_PreReq = <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: IRequest_AxiosRequestConfig<D>) => Promise<R>;




