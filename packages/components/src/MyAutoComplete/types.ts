import { ICommonOption } from '@noah-libjs/utils';
import { AutoCompleteProps, FormInstance } from 'antd';
import { TOptions } from '../util-types';
import { T_FETCH_OPTIONS } from '@noah-libjs/request';

export interface IMemoriseItem {
    "id": 6591,
    "key": "vitaminSignature",
    "name": "vitamin签名",
    "value": "钟财玉谢谢",
    "sort": null
}

export type IMyAutoCompleteProps = Omit<AutoCompleteProps, 'options' | 'onChange'> & {
    onChange?(str?: string): void
    fetch_options?: T_FETCH_OPTIONS
    form?: FormInstance,
    optionKey?: string,
    uniqueKey?: string,
    memorieskey?: string,
    memoriesname?: string,
    memorable?: boolean,
    name?: string,
    formName?: string,
    searchKey?: string,
    width?: any,
    options?: TOptions | (() => TOptions)

}
