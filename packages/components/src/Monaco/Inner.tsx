import Editor from '@monaco-editor/react/dist/index';
import React, { useEffect, useRef, useState } from 'react';
import { IMonacoProps } from './types';
// loader.config({ paths: { vs: getMonacoLoaderPath() } });

function MonacoInner(props: IMonacoProps) {
    const { value, onChange, language, defaultValue, height = '400px', theme = "vs-dark" } = props
    console.log('MyMonaco', props)
    const [inner_value, set_inner_value] = useState(value)
    const inited = useRef(false)
    useEffect(() => {
        if (value) {
            if (inited.current) return
            inited.current = true;
            set_inner_value(value)
        }

        return () => {

        }
    }, [value])

    return <Editor theme={theme} onChange={onChange} height={height} defaultLanguage={language} defaultValue={defaultValue} value={inner_value} ></Editor>
}


export default MonacoInner