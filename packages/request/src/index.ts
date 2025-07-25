
import { Axios, AxiosInstance } from 'axios';

import { Request, request } from './Request';
//@ts-ignore
import bind from 'axios/lib/helpers/bind';
//@ts-ignore

import utils from 'axios/lib/utils';

export * from './types';
export * from './helper';
export { codeMessage } from './constant'


function createInstance(defaultConfig = {}) {
    var instance = bind(Axios.prototype.request, request.ins);
    utils.extend(instance, Axios.prototype, request.ins);
    utils.extend(instance, request.ins);
    return instance as AxiosInstance;
}






export { Request, createInstance, request }





