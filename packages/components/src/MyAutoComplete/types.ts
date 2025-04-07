import { ICommonOption } from '@noah-libjs/utils';
import { AutoCompleteProps } from 'antd';

export interface IMemoriseItem {
    "id": 6591,
    "key": "vitaminSignature",
    "name": "vitamin签名",
    "value": "钟财玉谢谢",
    "sort": null
}

export type IMyAutoCompleteProps = Omit<AutoCompleteProps, 'options' | 'onChange'> & {
    onChange?(str?: string): void
    memories_ops?: {
        get(key: string): Promise<IMemoriseItem[]>
        post(key: string, name: string, value: string): Promise<IMemoriseItem>
        delete(id: number): Promise<IMemoriseItem>
    },
    optionKey?: string,
    memorieskey?: string,
    memoriesname?: string,
    memorable?: boolean,
    name?: string,
    formName?: string,
    searchKey?: string,
    width?: any,
    options?: string | (string | ICommonOption)[]
}
