
import React, { FC, useEffect, useState } from 'react';

export default function LazyInner(props: any) {
    const [C, setC] = useState<FC<any>>()
    useEffect(() => {
        import('antd/es/pagination').then(res => {
            setC(res.default)
        })

        return () => {

        }
    }, [])

    return C ? <C {...props} /> : 'loading Pagination ...'
}