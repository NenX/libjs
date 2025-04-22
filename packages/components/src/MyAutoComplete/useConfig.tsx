// import { ICommonOption, getPresetOptions, getSameOptions } from '@lm_fe/env';
import { getPresetOptions, getSameOptions, getSearchParamsValue, ICommonOption } from '@noah-libjs/utils';
import React, { useEffect, useState } from 'react';
import { IMemoriseItem, IMyAutoCompleteProps } from './types';
import { request } from '@noah-libjs/request';
import { parse_MC_dict_options } from 'src/utils';


const defaultOptions: ICommonOption[] = []

export function useConfig_MyAutoComplete(props: IMyAutoCompleteProps) {

    const {
        optionKey,
        options = defaultOptions,
        searchKey,
        value,
        memorable,
        memorieskey,
        memoriesname,
        formName = 'unsetFormName',
        name,
        uniqueKey,
        onChange,
        onBlur,
    } = props;

    const [__options, set__options] = useState<ICommonOption[]>([])
    const [init_value, setInit_value] = useState<string>()

    const _memorieskey = memorieskey ?? `${formName}.${name}`
    // const _memoriesname = memoriesname ?? SLocal_State.getUserData()?.login
    const _memoriesname = memoriesname ?? 'unset'

    const _memorable = memorable || !!memorieskey

    useEffect(() => {
        init()

        return () => { }
    }, [optionKey, options, searchKey])
    useEffect(() => {
        // if (!init_value && value) {
        //     setInit_value(value)
        // }
        setInit_value(value)

        return () => { }
    }, [value])

    function safeOnChange(str?: string) {
        setInit_value(str)
        onChange?.(str)
    }

    function init() {

        const preOptions = optionKey ? getPresetOptions(optionKey as any) : null
        const searchValue = searchKey ? getSearchParamsValue(searchKey) : null
        const dic_op = parse_MC_dict_options({ ...props, useString: true })
        const _options = preOptions ?? dic_op ?? (typeof options === 'string' ? getSameOptions(options) : options.map(o => typeof o === 'string' ? { value: o, label: o } : o))

        if (searchValue) {
            _options.push({ value: searchValue, label: searchValue })
        }
        if (_memorable) {

            request.get<IMemoriseItem[]>(`/api/text-memories`, {
                ignore_usr: true, params: {
                    'key.equals': _memorieskey,
                    size: 9999,
                }
            })
                .then(r => {
                    const arr = r.data ?? [];
                    _options.push(...arr.map(_ => ({ label: _.value, value: _.value, id: _.id })))
                    set__options(_options)

                })
        } else {
            set__options(_options)
        }
    }


    function _OnBlur(e: React.FocusEvent<HTMLElement>) {
        onBlur?.(e)
        setTimeout(() => {
            const thisValue = value
            if (!_memorable || !thisValue || __options.some(_ => _.value === thisValue)) return
            const data = { key: _memorieskey, name: _memoriesname, value: thisValue }
            console.log('blur', { data, props })

            request.post<IMemoriseItem>(`/api/text-memories`, data, { ignore_usr: true })
                .then(init)
        }, 10);
    };

    function remove(item: ICommonOption) {
        request.delete<IMemoriseItem>(`/api/text-memories/${item.id}`, { params: {}, ignore_usr: true })
            .then(r => {
                init()
                if (value === item.label) {
                    safeOnChange('')
                }
            })
    }
    return (
        {
            safeOnChange,
            onBlur: _OnBlur,
            init,
            options: __options,
            remove,
            init_value,
        }

    );
}
